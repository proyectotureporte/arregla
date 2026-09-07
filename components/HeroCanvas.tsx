'use client';

import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  p: number;
}

/** Tres manchas de luz (verde protector, dorado) moviéndose despacio — el único
 * lugar de la página donde canvas se justifica; todo lo demás es CSS/SVG. */
const BLOBS: Blob[] = [
  { x: 0.72, y: 0.28, r: 0.34, color: '31,136,119', vx: 0.00012, vy: 0.00009, p: 0 },
  { x: 0.85, y: 0.62, r: 0.24, color: '201,134,47', vx: -0.0001, vy: 0.00013, p: 2.1 },
  { x: 0.55, y: 0.15, r: 0.2, color: '238,174,84', vx: 0.00009, vy: -0.00011, p: 4.2 },
];

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest('section');
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frameId = 0;

    function resize() {
      if (!canvas || !section || !ctx) return;
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function isDark() {
      const attr = document.documentElement.getAttribute('data-theme');
      if (attr === 'dark') return true;
      if (attr === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const alpha = isDark() ? 0.32 : 0.24;
      for (const b of BLOBS) {
        const bx = (b.x + Math.sin(t * b.vx + b.p) * 0.06) * width;
        const by = (b.y + Math.cos(t * b.vy + b.p) * 0.06) * height;
        const r = b.r * Math.max(width, height);
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        grad.addColorStop(0, `rgba(${b.color},${alpha})`);
        grad.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) frameId = requestAnimationFrame(draw);
    }
    frameId = requestAnimationFrame(draw);
    if (reduced) draw(0);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}
