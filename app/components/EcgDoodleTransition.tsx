'use client';

/**
 * EcgDoodleTransition
 *
 * ACCURATE edge detection using the Sobel operator applied to each actual slide
 * image at runtime via the HTML5 Canvas API.
 *
 * Animation sequence (per slide change):
 *   Phase 1 (0 – 1.0s)  ECG heartbeat sweeps across a scan-line canvas
 *   Phase 2 (1.0 – 2.8s) Left-to-right wipe reveals the Sobel edge-detected
 *                         version of the *actual* slide image, glowing green
 *   Phase 3 (2.8 – 3.4s) Fade out → slide photo fully visible
 *
 * All pixel work happens on an offscreen canvas; the result is composited on a
 * visible <canvas> so the main thread paint is a single drawImage call per frame.
 */

import { useEffect, useRef } from 'react';

const SLIDE_IMAGES = [
  '/scene1.png',
  '/scene2.png',
  '/scene3.png',
  '/scene5.png',
  '/scene6.png',
  '/scene7.png',
];

// ── Sobel edge detection ─────────────────────────────────────────────────────
function runSobel(
  src: HTMLImageElement,
  width: number,
  height: number,
  threshold = 28,
): ImageData {
  // Downsample for performance — run Sobel on a smaller scale
  const scale = 0.5;
  const sw = Math.floor(width * scale);
  const sh = Math.floor(height * scale);
  
  const tmp = document.createElement('canvas');
  tmp.width  = sw;
  tmp.height = sh;
  const tc = tmp.getContext('2d', { alpha: false })!;
  tc.drawImage(src, 0, 0, sw, sh);
  const { data } = tc.getImageData(0, 0, sw, sh);

  // Convert to grayscale buffer
  const gray = new Float32Array(sw * sh);
  for (let i = 0; i < gray.length; i++) {
    const p = i * 4;
    gray[i] = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
  }

  // Sobel kernels applied per pixel
  const output = new ImageData(sw, sh);
  const od = output.data;

  const g = (x: number, y: number) =>
    x < 0 || x >= sw || y < 0 || y >= sh
      ? 0
      : gray[y * sw + x];

  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const gx =
        -1 * g(x - 1, y - 1) + 1 * g(x + 1, y - 1) +
        -2 * g(x - 1, y)     + 2 * g(x + 1, y)     +
        -1 * g(x - 1, y + 1) + 1 * g(x + 1, y + 1);

      const gy =
        -1 * g(x - 1, y - 1) - 2 * g(x, y - 1) - 1 * g(x + 1, y - 1) +
         1 * g(x - 1, y + 1) + 2 * g(x, y + 1) + 1 * g(x + 1, y + 1);

      const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy));
      const idx = (y * width + x) * 4;

      if (mag > threshold) {
        // Glow: primary green channel (brand #6AB04C) + cyan highlight
        const t   = mag / 255;
        od[idx]     = Math.round(lerp(60,  106, t));   // R
        od[idx + 1] = Math.round(lerp(190, 255, t));   // G  — teal→bright
        od[idx + 2] = Math.round(lerp(80,  180, t));   // B  — cyan shift
        od[idx + 3] = Math.min(255, Math.round(mag * 1.8));
      } else {
        od[idx + 3] = 0; // transparent
      }
    }
  }

  return output;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ── ECG path drawing (canvas 2D) ─────────────────────────────────────────────
function drawEcg(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number,   // 0 → 1
) {
  const midY = h * 0.5;
  const peaks = [
    { x: 0.08, y: midY },
    { x: 0.14, y: midY - h * 0.04 },
    { x: 0.18, y: midY + h * 0.07 },
    { x: 0.23, y: midY - h * 0.22 },
    { x: 0.28, y: midY + h * 0.13 },
    { x: 0.33, y: midY },
    { x: 0.40, y: midY },
    { x: 0.46, y: midY - h * 0.04 },
    { x: 0.50, y: midY + h * 0.07 },
    { x: 0.55, y: midY - h * 0.20 },
    { x: 0.60, y: midY + h * 0.12 },
    { x: 0.65, y: midY },
    { x: 1.02, y: midY },
  ].map(p => ({ x: p.x * w, y: p.y }));

  const totalLen = peaks.reduce((acc, p, i) => {
    if (i === 0) return 0;
    const prev = peaks[i - 1];
    return acc + Math.hypot(p.x - prev.x, p.y - prev.y);
  }, 0);

  const targetLen = progress * totalLen;
  let drawn = 0;

  ctx.save();
  ctx.strokeStyle = '#6AB04C';
  ctx.lineWidth   = 3;
  ctx.lineJoin    = 'round';
  ctx.lineCap     = 'round';
  /* shadowBlur removed for performance */
  ctx.beginPath();
  ctx.moveTo(peaks[0].x, peaks[0].y);

  for (let i = 1; i < peaks.length; i++) {
    const prev = peaks[i - 1];
    const cur  = peaks[i];
    const segLen = Math.hypot(cur.x - prev.x, cur.y - prev.y);

    if (drawn + segLen <= targetLen) {
      ctx.lineTo(cur.x, cur.y);
      drawn += segLen;
    } else {
      const t = (targetLen - drawn) / segLen;
      ctx.lineTo(
        prev.x + (cur.x - prev.x) * t,
        prev.y + (cur.y - prev.y) * t,
      );
      break;
    }
  }

  ctx.stroke();

  // Pulsing dot at the leading edge
  const dotProgress = Math.min(progress, 0.99);
  let dotDrawn = 0;
  let dotX = peaks[0].x, dotY = peaks[0].y;
  const targetDot = dotProgress * totalLen;

  for (let i = 1; i < peaks.length; i++) {
    const prev = peaks[i - 1];
    const cur  = peaks[i];
    const segLen = Math.hypot(cur.x - prev.x, cur.y - prev.y);
    if (dotDrawn + segLen <= targetDot) {
      dotDrawn += segLen;
      dotX = cur.x; dotY = cur.y;
    } else {
      const t = (targetDot - dotDrawn) / segLen;
      dotX = prev.x + (cur.x - prev.x) * t;
      dotY = prev.y + (cur.y - prev.y) * t;
      break;
    }
  }

  ctx.beginPath();
  ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#6AB04C';
  /* shadowBlur removed for performance */
  ctx.fill();

  ctx.restore();
}

// ── Component ────────────────────────────────────────────────────────────────
interface Props {
  slideIndex: number;
  onComplete?: () => void;
}

export default function EcgDoodleTransition({ slideIndex, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let alive = true;

    // ── Fit canvas to viewport ──────────────────────────────────────────────
    const W = canvas.offsetWidth  || window.innerWidth;
    const H = canvas.offsetHeight || window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // ── Pre-load & process the slide image ─────────────────────────────────
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = SLIDE_IMAGES[slideIndex] ?? SLIDE_IMAGES[0];

    let edgeImageData: ImageData | null = null;
    let edgeCanvas: HTMLCanvasElement | null = null;

    img.onload = () => {
      if (!alive) return;
      edgeImageData = runSobel(img, W, H);
      edgeCanvas = document.createElement('canvas');
      edgeCanvas.width  = W;
      edgeCanvas.height = H;
      edgeCanvas.getContext('2d')!.putImageData(edgeImageData, 0, 0);
    };

    // ── Animation loop ──────────────────────────────────────────────────────
    const PHASE1_END = 1000;  // ECG draw completes
    const PHASE2_END = 2800;  // edge sweep completes
    const PHASE3_END = 3400;  // fade out completes

    const tick = (now: number) => {
      if (!alive) return;
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;

      ctx.clearRect(0, 0, W, H);

      // ── Phase 1: draw ECG ─────────────────────────────────────────────
      if (elapsed < PHASE1_END) {
        const progress = elapsed / PHASE1_END;
        drawEcg(ctx, W, H, progress);
      }

      // ── Phase 2: left-to-right wipe of Sobel edges ───────────────────
      else if (elapsed < PHASE2_END) {
        if (edgeCanvas) {
          const sweepX = Math.round(
            W * ((elapsed - PHASE1_END) / (PHASE2_END - PHASE1_END)),
          );

          // Clip to swept region
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, 0, sweepX, H);
          ctx.clip();
          ctx.drawImage(edgeCanvas, 0, 0);
          ctx.restore();

          // Leading sweep glow bar
          const grad = ctx.createLinearGradient(sweepX - 30, 0, sweepX + 8, 0);
          grad.addColorStop(0, 'rgba(106,176,76,0)');
          grad.addColorStop(0.6, 'rgba(106,176,76,0.45)');
          grad.addColorStop(1, 'rgba(74,190,214,0.85)');
          ctx.fillStyle = grad;
          ctx.fillRect(sweepX - 30, 0, 38, H);
        } else {
          // Image still loading — hold ECG at 100%
          drawEcg(ctx, W, H, 1);
        }
      }

      // ── Phase 3: fade out ─────────────────────────────────────────────
      else if (elapsed < PHASE3_END) {
        const fadeProgress = (elapsed - PHASE2_END) / (PHASE3_END - PHASE2_END);
        if (edgeCanvas) {
          ctx.save();
          ctx.globalAlpha = 1 - fadeProgress;
          ctx.drawImage(edgeCanvas, 0, 0);
          ctx.restore();
        }

        // Fade the whole canvas element too for smooth handoff
        canvas.style.opacity = String(1 - fadeProgress);
      }

      // ── Done ──────────────────────────────────────────────────────────
      else {
        canvas.style.opacity = '0';
        onComplete?.();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    // Small delay so canvas size is settled
    const start = setTimeout(() => {
      startRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }, 30);

    return () => {
      alive = false;
      clearTimeout(start);
      cancelAnimationFrame(rafRef.current);
    };
  }, [slideIndex, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 30,
        pointerEvents: 'none',
      }}
    />
  );
}
