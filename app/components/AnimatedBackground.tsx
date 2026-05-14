'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const CUBE_W = 80;
    const CUBE_H = 46;
    const DEPTH  = 38;

    // Base subtle grey/white colors (with slightly improved 3D contrast)
    const baseTop   = [248, 249, 250];
    const baseLeft  = [222, 226, 230];
    const baseRight = [233, 236, 239];

    // Abishag brand green colors for the wave peak
    const greenTop   = [106, 176, 76]; // #6AB04C (Brand primary)
    const greenLeft  = [74,  138, 48]; // Darker shade for left face
    const greenRight = [92,  160, 62]; // Medium shade for right face

    function lerpColor(c1: number[], c2: number[], t: number) {
      // Smooth interpolation
      const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
      const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
      const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }

    function drawCube(x: number, y: number, lift: number, intensity: number) {
      const cy = y - lift;

      // Enhance intensity curve and reduce max intensity to 40% for a softer, more transparent green
      const colorIntensity = Math.pow(intensity, 3) * 0.4;

      // Top face
      ctx.beginPath();
      ctx.moveTo(x,              cy - CUBE_H);
      ctx.lineTo(x + CUBE_W / 2, cy);
      ctx.lineTo(x,              cy + CUBE_H);
      ctx.lineTo(x - CUBE_W / 2, cy);
      ctx.closePath();
      ctx.fillStyle = lerpColor(baseTop, greenTop, colorIntensity);
      ctx.fill();

      // Left face
      ctx.beginPath();
      ctx.moveTo(x - CUBE_W / 2, cy);
      ctx.lineTo(x,              cy + CUBE_H);
      ctx.lineTo(x,              cy + CUBE_H + DEPTH);
      ctx.lineTo(x - CUBE_W / 2, cy + DEPTH);
      ctx.closePath();
      ctx.fillStyle = lerpColor(baseLeft, greenLeft, colorIntensity);
      ctx.fill();

      // Right face
      ctx.beginPath();
      ctx.moveTo(x + CUBE_W / 2, cy);
      ctx.lineTo(x,              cy + CUBE_H);
      ctx.lineTo(x,              cy + CUBE_H + DEPTH);
      ctx.lineTo(x + CUBE_W / 2, cy + DEPTH);
      ctx.closePath();
      ctx.fillStyle = lerpColor(baseRight, greenRight, colorIntensity);
      ctx.fill();

      // Edge strokes
      // Transition from subtle grey to semi-transparent dark green
      const strokeR = Math.round(206 + (74 - 206) * colorIntensity);
      const strokeG = Math.round(212 + (138 - 212) * colorIntensity);
      const strokeB = Math.round(218 + (48 - 218) * colorIntensity);
      const strokeA = 0.4 + (0.4 * colorIntensity);
      
      ctx.strokeStyle = `rgba(${strokeR}, ${strokeG}, ${strokeB}, ${strokeA})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x,              cy - CUBE_H);
      ctx.lineTo(x + CUBE_W / 2, cy);
      ctx.lineTo(x,              cy + CUBE_H);
      ctx.lineTo(x - CUBE_W / 2, cy);
      ctx.closePath();
      ctx.stroke();
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawRibbons(t: number) {
      ctx.save();
      // Translate to center and rotate to match the isometric grid angle (down-right)
      const angle = Math.atan2(CUBE_H, CUBE_W / 2);
      ctx.translate(W / 2, H / 2);
      ctx.rotate(angle);
      
      ctx.globalCompositeOperation = 'screen';
      ctx.shadowColor = '#6AB04C';
      
      // Draw 3 interwoven glowing ribbons
      for(let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.shadowBlur = i === 0 ? 25 : 10;
        ctx.lineWidth = i === 0 ? 10 : 4;
        // Reduced opacity for a more transparent, softer look
        ctx.strokeStyle = `rgba(106, 176, 76, ${0.12 + i * 0.12})`;
        
        // Draw across the rotated canvas, exceeding the bounds so it doesn't clip
        const span = Math.max(W, H) * 1.5;
        for(let x = -span; x <= span; x += 20) {
          // Calculate wave phase — moving left to right along the rotated axis
          // Speed and frequency are tuned to match the traversing cube waves
          const phase = (x * 0.008) - (t * 0.0015) + (i * 0.9);
          
          // Ribbons intertwine and pulse up and down
          const yOffset = Math.sin(phase) * (140 + i * 30);
          
          if (x === -span) ctx.moveTo(x, yOffset);
          else ctx.lineTo(x, yOffset);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    function render(t: number) {
      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / CUBE_W) + 4;
      const rows = Math.ceil(H / CUBE_H) + 6;

      for (let row = -2; row < rows; row++) {
        for (let col = -2; col < cols; col++) {
          const x = col * CUBE_W + (row % 2 === 0 ? 0 : CUBE_W / 2);
          const y = row * CUBE_H + CUBE_H;
          
          // -1 to 1
          const wave = Math.sin((col * 0.25 + row * 0.45 - t * 0.001) * 1.5);
          const lift = wave * 10 + 10;
          
          // normalize wave from [-1, 1] to [0, 1] for color intensity
          const intensity = (wave + 1) / 2;
          
          drawCube(x, y, lift, intensity);
        }
      }
      
      // Render the glowing green wave ribbons over the cubes
      drawRibbons(t);
      
      animId = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(render);
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
        width: '100%',
        height: '100%',
        zIndex: -1, // Keep behind all content
        pointerEvents: 'none',
      }}
    />
  );
}
