"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const PARTICLE_COUNT = 70;
const MAX_LINK_DISTANCE = 140;
const COLORS = [
  { r: 16, g: 185, b: 129 }, // emerald
  { r: 59, g: 130, b: 246 }, // blue
];

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

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.width = canvas!.offsetWidth * dpr;
      height = canvas!.height = canvas!.offsetHeight * dpr;
    }

    function createParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25 * dpr,
          vy: (Math.random() - 0.5) * 0.25 * dpr,
          radius: (Math.random() * 1.2 + 0.8) * dpr,
          color: `${color.r}, ${color.g}, ${color.b}`,
        };
      });
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);
      const linkDistance = MAX_LINK_DISTANCE * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);

          if (dist < linkDistance) {
            const opacity = 0.12 * (1 - dist / linkDistance);
            ctx!.strokeStyle = `rgba(${p.color}, ${opacity})`;
            ctx!.lineWidth = dpr * 0.6;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }

        ctx!.fillStyle = `rgba(${p.color}, 0.55)`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      animationFrameId = requestAnimationFrame(step);
    }

    resize();
    createParticles();
    step();

    if (prefersReducedMotion) {
      cancelAnimationFrame(animationFrameId);
    }

    function handleResize() {
      resize();
      createParticles();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  );
}
