"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  twinkleSeed: number;
  color: string;
};

const MIN_PARTICLES = 30;
const MAX_PARTICLES = 90;
const MAX_LINK_DISTANCE = 165;
const COLORS = [
  { r: 16, g: 185, b: 129 }, // emerald
  { r: 59, g: 130, b: 246 }, // blue
  { r: 168, g: 85, b: 247 }, // violet accent
];

// Sprite: çekirdek yarıçapının kaç katına kadar halo uzanır.
const SPRITE_GLOW_SCALE = 4;
const SPRITE_CORE_RADIUS = 8;

/**
 * Izgarada bir hücre işlenirken yalnızca "ileri" komşulara bakılır; böylece her
 * parçacık çifti tam olarak bir kez değerlendirilir. Satırlar yukarıdan aşağıya,
 * sütunlar soldan sağa tarandığı için geri komşular zaten işlenmiştir.
 */
const FORWARD_NEIGHBORS = [
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
] as const;

/**
 * Parçacık başına canvas shadowBlur çok pahalı olduğundan, ışıltılı nokta her
 * renk için bir kez offscreen canvas'a çizilir ve karede drawImage ile kopyalanır.
 */
function createParticleSprite(color: string): HTMLCanvasElement {
  const size = SPRITE_CORE_RADIUS * SPRITE_GLOW_SCALE * 2;
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = size;
  const ctx = sprite.getContext("2d")!;
  const center = size / 2;

  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, `rgba(${color}, 0.9)`);
  gradient.addColorStop(0.25, `rgba(${color}, 0.85)`); // çekirdek
  gradient.addColorStop(0.5, `rgba(${color}, 0.22)`); // halo
  gradient.addColorStop(1, `rgba(${color}, 0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return sprite;
}

/** Küçük ekranlarda (mobil) parçacık sayısını alanla orantılı azaltır. */
function particleCountFor(width: number, height: number, dpr: number): number {
  const cssArea = (width / dpr) * (height / dpr);
  return Math.round(Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, cssArea / 18000)));
}

function requestIdle(callback: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 1000 });
  } else {
    window.setTimeout(callback, 200);
  }
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let linkDistance = MAX_LINK_DISTANCE;
    let particles: Particle[] = [];
    let animationFrameId = 0;
    let running = false;
    let pointer = { x: 0, y: 0, active: false };
    let time = 0;

    // Uzamsal hash ızgarası. Bağlantı araması, tüm çiftleri gezmek yerine (O(n²))
    // yalnızca komşu hücrelere bakar. Tamponlar resize'da bir kez ayrılır.
    let cols = 0;
    let rows = 0;
    let cellCounts = new Int32Array(0);
    let cellStart = new Int32Array(0);
    let cellCursor = new Int32Array(0);
    let cellOf = new Int32Array(0);
    let order = new Int32Array(0);

    const sprites = new Map<string, HTMLCanvasElement>();
    for (const color of COLORS) {
      const key = `${color.r}, ${color.g}, ${color.b}`;
      sprites.set(key, createParticleSprite(key));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.width = canvas!.offsetWidth * dpr;
      height = canvas!.height = canvas!.offsetHeight * dpr;
      linkDistance = MAX_LINK_DISTANCE * dpr;

      // Hücre kenarı = bağlantı mesafesi ⇒ menzildeki her çift komşu hücrelerdedir.
      cols = Math.max(1, Math.ceil(width / linkDistance));
      rows = Math.max(1, Math.ceil(height / linkDistance));
      const cellCount = cols * rows;
      cellCounts = new Int32Array(cellCount);
      cellStart = new Int32Array(cellCount + 1);
      cellCursor = new Int32Array(cellCount);
    }

    function createParticles() {
      particles = Array.from({ length: particleCountFor(width, height, dpr) }, () => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]!;
        const baseRadius = Math.random() * 1.4 + 1;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3 * dpr,
          vy: (Math.random() - 0.5) * 0.3 * dpr,
          radius: baseRadius * dpr,
          baseRadius: baseRadius * dpr,
          twinkleSeed: Math.random() * Math.PI * 2,
          color: `${color.r}, ${color.g}, ${color.b}`,
        };
      });
      cellOf = new Int32Array(particles.length);
      order = new Int32Array(particles.length);
    }

    /** Parçacıkları hücrelere sayarak sıralar (counting sort); `order` hücre hücre gruplanır. */
    function buildGrid() {
      cellCounts.fill(0);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(p.x / linkDistance)));
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(p.y / linkDistance)));
        const cell = cy * cols + cx;
        cellOf[i] = cell;
        cellCounts[cell]!++;
      }

      cellStart[0] = 0;
      for (let c = 0; c < cellCounts.length; c++) {
        cellStart[c + 1] = cellStart[c]! + cellCounts[c]!;
        cellCursor[c] = cellStart[c]!;
      }

      for (let i = 0; i < particles.length; i++) {
        order[cellCursor[cellOf[i]!]!++] = i;
      }
    }

    function strokeLink(p: Particle, q: Particle) {
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);
      if (dist >= linkDistance) return;

      const opacity = 0.22 * (1 - dist / linkDistance);
      ctx!.strokeStyle = `rgba(${p.color}, ${opacity})`;
      ctx!.lineWidth = dpr * 0.7;
      ctx!.beginPath();
      ctx!.moveTo(p.x, p.y);
      ctx!.lineTo(q.x, q.y);
      ctx!.stroke();
    }

    function drawLinks() {
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const cell = cy * cols + cx;
          const from = cellStart[cell]!;
          const to = cellStart[cell + 1]!;

          for (let k = from; k < to; k++) {
            const p = particles[order[k]!]!;

            // Aynı hücredeki sonraki parçacıklar
            for (let k2 = k + 1; k2 < to; k2++) {
              strokeLink(p, particles[order[k2]!]!);
            }

            // İleri komşu hücrelerin tamamı
            for (const [ox, oy] of FORWARD_NEIGHBORS) {
              const nx = cx + ox;
              const ny = cy + oy;
              if (nx < 0 || nx >= cols || ny >= rows) continue;

              const neighbor = ny * cols + nx;
              const nFrom = cellStart[neighbor]!;
              const nTo = cellStart[neighbor + 1]!;
              for (let k2 = nFrom; k2 < nTo; k2++) {
                strokeLink(p, particles[order[k2]!]!);
              }
            }
          }
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      time += 1;

      // İmleç konumuna göre parallax
      const normX = pointer.active ? pointer.x / width : 0.5;
      const normY = pointer.active ? pointer.y / height : 0.5;
      const parallaxX = pointer.active ? (normX - 0.5) * 16 * dpr : 0;
      const parallaxY = pointer.active ? (normY - 0.5) * 16 * dpr : 0;

      const cursorX = pointer.x - parallaxX;
      const cursorY = pointer.y - parallaxY;

      ctx!.save();
      ctx!.translate(parallaxX, parallaxY);

      // 1. İmlecin altındaki ışıma
      if (pointer.active) {
        const glowGrad = ctx!.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, 150 * dpr);
        glowGrad.addColorStop(0, "rgba(16, 185, 129, 0.18)");
        glowGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.06)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx!.fillStyle = glowGrad;
        ctx!.beginPath();
        ctx!.arc(cursorX, cursorY, 150 * dpr, 0, Math.PI * 2);
        ctx!.fill();
      }

      // 2. Konum güncellemesi, imleç itmesi, kenar sekmesi, titreşim
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (pointer.active) {
          const dx = p.x - cursorX;
          const dy = p.y - cursorY;
          const dist = Math.hypot(dx, dy);
          const activeRadius = 140 * dpr;
          if (dist > 0 && dist < activeRadius) {
            const force = (activeRadius - dist) / activeRadius;
            p.x += (dx / dist) * force * 1.6 * dpr;
            p.y += (dy / dist) * force * 1.6 * dpr;
          }
        }

        if (p.x <= 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x >= width) {
          p.x = width;
          p.vx *= -1;
        }
        if (p.y <= 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y >= height) {
          p.y = height;
          p.vy *= -1;
        }

        p.radius = p.baseRadius + Math.sin(time * 0.02 + p.twinkleSeed) * p.baseRadius * 0.4;
      }

      // 3. Parçacıklar arası bağlantılar (uzamsal ızgara üzerinden)
      buildGrid();
      drawLinks();

      // 4. İmleçten yakın parçacıklara bağlantılar
      if (pointer.active) {
        const cursorLinkDistance = linkDistance * 1.1;
        for (const p of particles) {
          const dx = p.x - cursorX;
          const dy = p.y - cursorY;
          const dist = Math.hypot(dx, dy);

          if (dist < cursorLinkDistance) {
            const opacity = 0.35 * (1 - dist / cursorLinkDistance);
            ctx!.strokeStyle = `rgba(${p.color}, ${opacity})`;
            ctx!.lineWidth = dpr;
            ctx!.beginPath();
            ctx!.moveTo(cursorX, cursorY);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
        }
      }

      // 5. Parçacıklar (sprite kopyalama; shadowBlur'a göre kat kat ucuz)
      for (const p of particles) {
        const sprite = sprites.get(p.color)!;
        const drawSize = p.radius * SPRITE_GLOW_SCALE * 2;
        ctx!.drawImage(sprite, p.x - drawSize / 2, p.y - drawSize / 2, drawSize, drawSize);
      }

      ctx!.restore();
    }

    function loop() {
      draw();
      animationFrameId = requestAnimationFrame(loop);
    }

    /** Döngü yalnızca sekme görünürken ve hareket tercih edildiğinde çalışır. */
    function start() {
      if (running || document.hidden || motionQuery.matches) return;
      running = true;
      animationFrameId = requestAnimationFrame(loop);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animationFrameId);
    }

    function handleResize() {
      resize();
      createParticles();
      if (!running) draw(); // duraklatılmışken de yeni boyuta göre tek kare çiz
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer = {
        x: (event.clientX - rect.left) * dpr,
        y: (event.clientY - rect.top) * dpr,
        active: true,
      };
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function handleVisibilityChange() {
      if (document.hidden) stop();
      else start();
    }

    function handleMotionChange() {
      if (motionQuery.matches) {
        stop();
        draw();
      } else {
        start();
      }
    }

    resize();
    createParticles();

    if (motionQuery.matches) {
      draw();
    } else {
      requestIdle(start);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full opacity-60 transition-opacity duration-300 dark:opacity-90"
    />
  );
}
