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

const PARTICLE_COUNT = 90;
const MAX_LINK_DISTANCE = 165;
const COLORS = [
  { r: 16, g: 185, b: 129 }, // emerald
  { r: 59, g: 130, b: 246 }, // blue
  { r: 168, g: 85, b: 247 }, // violet accent
];

function requestIdle(callback: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 1000 });
  } else {
    window.setTimeout(callback, 200);
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let animationFrameId = 0;
    let isVisible = true;
    let pointer = { x: 0, y: 0, active: false };
    let time = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.width = canvas!.offsetWidth * dpr;
      height = canvas!.height = canvas!.offsetHeight * dpr;
    }

    function createParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
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
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const linkDistance = MAX_LINK_DISTANCE * dpr;
      time += 1;

      const parallaxX = pointer.active ? (pointer.x - 0.5) * 24 * dpr : 0;
      const parallaxY = pointer.active ? (pointer.y - 0.5) * 24 * dpr : 0;

      ctx!.save();
      ctx!.translate(parallaxX, parallaxY);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        p.radius =
          p.baseRadius + Math.sin(time * 0.02 + p.twinkleSeed) * p.baseRadius * 0.4;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);

          if (dist < linkDistance) {
            const opacity = 0.22 * (1 - dist / linkDistance);
            ctx!.strokeStyle = `rgba(${p.color}, ${opacity})`;
            ctx!.lineWidth = dpr * 0.7;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${p.color}, 0.9)`;
        ctx!.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx!.shadowBlur = 6 * dpr;
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      ctx!.restore();
    }

    function loop() {
      if (isVisible) draw();
      animationFrameId = requestAnimationFrame(loop);
    }

    function handleResize() {
      resize();
      createParticles();
    }

    function handlePointerMove(event: PointerEvent) {
      pointer = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
        active: true,
      };
    }

    function handleVisibilityChange() {
      isVisible = document.visibilityState === "visible";
    }

    resize();
    createParticles();

    if (prefersReducedMotion) {
      draw();
    } else {
      requestIdle(() => {
        animationFrameId = requestAnimationFrame(loop);
      });
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black"
    >
      {/* Yavaşça hareket eden ışık lekeleri (aurora efekti) */}
      <div
        className="motion-safe:[animation:aurora-drift-1_22s_ease-in-out_infinite] absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div
        className="motion-safe:[animation:aurora-drift-2_26s_ease-in-out_infinite] absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-blue-500/15 blur-3xl"
      />
      <div
        className="motion-safe:[animation:aurora-drift-3_30s_ease-in-out_infinite] absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl"
      />

      {/* İnce nokta ızgarası — devre kartı / blueprint hissi */}
      <div
        className="motion-safe:[animation:grid-pan_14s_linear_infinite] absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Canlı bağlantı ağı */}
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />

      {/* Kenarlarda hafif vinyet, içerik okunabilirliğini artırır */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}
