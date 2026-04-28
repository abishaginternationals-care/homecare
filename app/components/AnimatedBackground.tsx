'use client';

import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let W = window.innerWidth;
    let H = document.documentElement.scrollHeight;

    const resize = () => {
      W = window.innerWidth;
      H = document.documentElement.scrollHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    // Brand orbs
    const orbColors = [
      'rgba(106,176,76,VAL)',   // green
      'rgba(61,26,10,VAL)',     // brown
      'rgba(74,138,48,VAL)',    // dark green
      'rgba(106,176,76,VAL)',   // green again for density
      'rgba(217,160,102,VAL)',  // amber
    ];

    const orbs: Orb[] = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 280 + Math.random() * 220,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: orbColors[i % orbColors.length],
      alpha: 0.07 + Math.random() * 0.06,
    }));

    // Floating dots
    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.5 + Math.random() * 2.5,
      vy: -(0.15 + Math.random() * 0.3),
      vx: (Math.random() - 0.5) * 0.2,
      alpha: 0.15 + Math.random() * 0.25,
      color: Math.random() > 0.5 ? '106,176,76' : '61,26,10',
    }));

    // Diagonal light beams
    const beams = Array.from({ length: 3 }, (_, i) => ({
      x: (W / 4) * (i + 1),
      width: 60 + Math.random() * 80,
      alpha: 0.03 + Math.random() * 0.02,
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    }));

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Base warm gradient
      const base = ctx.createLinearGradient(0, 0, W, H);
      base.addColorStop(0, '#F6F3EF');
      base.addColorStop(0.4, '#F0EBE4');
      base.addColorStop(0.7, '#EDE8E0');
      base.addColorStop(1, '#F4F1ED');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      // Moving mesh overlay
      const mesh = ctx.createRadialGradient(
        W * 0.3 + Math.sin(tick * 0.003) * W * 0.15,
        H * 0.3 + Math.cos(tick * 0.002) * H * 0.1,
        0,
        W * 0.3,
        H * 0.3,
        W * 0.7
      );
      mesh.addColorStop(0, 'rgba(106,176,76,0.07)');
      mesh.addColorStop(0.5, 'rgba(74,138,48,0.03)');
      mesh.addColorStop(1, 'transparent');
      ctx.fillStyle = mesh;
      ctx.fillRect(0, 0, W, H);

      const mesh2 = ctx.createRadialGradient(
        W * 0.8 + Math.cos(tick * 0.002) * W * 0.1,
        H * 0.7 + Math.sin(tick * 0.003) * H * 0.1,
        0,
        W * 0.8,
        H * 0.7,
        W * 0.5
      );
      mesh2.addColorStop(0, 'rgba(61,26,10,0.06)');
      mesh2.addColorStop(1, 'transparent');
      ctx.fillStyle = mesh2;
      ctx.fillRect(0, 0, W, H);

      // Animated floating orbs
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r) orb.x = W + orb.r;
        if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = H + orb.r;
        if (orb.y > H + orb.r) orb.y = -orb.r;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, orb.color.replace('VAL', String(orb.alpha)));
        grad.addColorStop(0.5, orb.color.replace('VAL', String(orb.alpha * 0.5)));
        grad.addColorStop(1, orb.color.replace('VAL', '0'));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Diagonal light beams
      for (const beam of beams) {
        const pulse = Math.sin(tick * 0.008 + beam.offset) * 0.5 + 0.5;
        const grad = ctx.createLinearGradient(beam.x, 0, beam.x + beam.width, H);
        grad.addColorStop(0, `rgba(106,176,76,0)`);
        grad.addColorStop(0.3, `rgba(106,176,76,${beam.alpha * pulse})`);
        grad.addColorStop(0.7, `rgba(255,255,255,${beam.alpha * 0.5 * pulse})`);
        grad.addColorStop(1, `rgba(106,176,76,0)`);
        ctx.save();
        ctx.transform(1, 0, -0.3, 1, 0, 0); // skew
        ctx.fillStyle = grad;
        ctx.fillRect(beam.x, 0, beam.width, H);
        ctx.restore();
      }

      // Floating dots
      for (const d of dots) {
        d.y += d.vy;
        d.x += d.vx;
        if (d.y < -10) { d.y = H + 10; d.x = Math.random() * W; }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color},${d.alpha})`;
        ctx.fill();
      }

      // Subtle grid pattern
      ctx.save();
      ctx.strokeStyle = 'rgba(106,176,76,0.04)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();

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
