'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const orbs = [
      { x: 0.2, y: 0.3, r: 0.45, vx: 0.00015, vy: 0.0001,  color: '106,176,76',  alpha: 0.22 },
      { x: 0.8, y: 0.7, r: 0.40, vx: -0.0001, vy: -0.00015, color: '61,26,10',    alpha: 0.12 },
      { x: 0.5, y: 0.1, r: 0.35, vx: 0.00012, vy: 0.00018,  color: '74,138,48',   alpha: 0.18 },
      { x: 0.9, y: 0.2, r: 0.30, vx: -0.00018, vy: 0.0001,  color: '106,176,76',  alpha: 0.15 },
      { x: 0.1, y: 0.8, r: 0.38, vx: 0.00010, vy: -0.00012, color: '217,160,102', alpha: 0.10 },
    ];

    let tick = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Base cream gradient
      const base = ctx.createLinearGradient(0, 0, W, H);
      base.addColorStop(0,   '#F0EDE8');
      base.addColorStop(0.5, '#EDEAE3');
      base.addColorStop(1,   '#F4F1ED');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      // Moving orbs
      for (const o of orbs) {
        o.x += o.vx;
        o.y += o.vy;
        // Bounce at edges
        if (o.x < 0 || o.x > 1) o.vx *= -1;
        if (o.y < 0 || o.y > 1) o.vy *= -1;

        const cx = o.x * W;
        const cy = o.y * H;
        const r  = o.r * Math.min(W, H);
        const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   `rgba(${o.color},${o.alpha})`);
        g.addColorStop(0.5, `rgba(${o.color},${o.alpha * 0.4})`);
        g.addColorStop(1,   `rgba(${o.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // Pulsing diagonal beam — top-left to bottom-right
      const pulse = Math.sin(tick * 0.012) * 0.5 + 0.5;
      const beam  = ctx.createLinearGradient(0, 0, W, H);
      beam.addColorStop(0,    `rgba(106,176,76,0)`);
      beam.addColorStop(0.35, `rgba(106,176,76,${0.07 * pulse})`);
      beam.addColorStop(0.5,  `rgba(255,255,255,${0.05 * pulse})`);
      beam.addColorStop(0.65, `rgba(106,176,76,${0.07 * pulse})`);
      beam.addColorStop(1,    `rgba(106,176,76,0)`);
      ctx.fillStyle = beam;
      ctx.fillRect(0, 0, W, H);

      // Second beam — top-right pulse
      const pulse2 = Math.sin(tick * 0.008 + 2) * 0.5 + 0.5;
      const beam2  = ctx.createLinearGradient(W, 0, 0, H);
      beam2.addColorStop(0,   `rgba(74,138,48,0)`);
      beam2.addColorStop(0.4, `rgba(74,138,48,${0.05 * pulse2})`);
      beam2.addColorStop(1,   `rgba(74,138,48,0)`);
      ctx.fillStyle = beam2;
      ctx.fillRect(0, 0, W, H);

      tick++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
