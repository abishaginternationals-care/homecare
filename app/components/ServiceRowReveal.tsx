'use client';

/**
 * ServiceRowReveal — alternating ECG direction
 *
 * Each row of service cards triggers:
 *   Phase 1 (0 – 1.3s)  Lively ECG heartbeat draws across the full row width
 *                        — even rows: LEFT → RIGHT
 *                        — odd rows:  RIGHT → LEFT (canvas-flipped)
 *   Phase 2 (1.3s → )   Each card floats up with a hovering-raise entrance,
 *                        staggered to match the ECG sweep direction:
 *                        — even rows: left → centre → right
 *                        — odd rows:  right → centre → left
 *
 * Key fix: outer wrapper is a real block div (NOT display:contents) so that
 * IntersectionObserver can detect when the row enters the viewport.
 * The component owns its own inner 3-column grid.
 */

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

// ── ECG polyline — number of spikes matches number of columns ──────────────
function buildPoints(w: number, h: number, cols: number) {
  const mid = h / 2;

  const spike = (cx: number) => [
    { x: cx - 90, y: mid },
    { x: cx - 55, y: mid - h * 0.07 },
    { x: cx - 30, y: mid + h * 0.15 },
    { x: cx,      y: mid - h * 0.44 },   // main peak
    { x: cx + 24, y: mid + h * 0.24 },
    { x: cx + 50, y: mid },
  ];

  // Evenly space spike centres across the width
  const centres = Array.from({ length: cols }, (_, i) =>
    (w * (i + 0.5)) / cols,
  );

  const pts: { x: number; y: number }[] = [{ x: 0, y: mid }];
  centres.forEach((cx, ci) => {
    pts.push(...spike(cx));
    if (ci < centres.length - 1) {
      pts.push({ x: cx + 100, y: mid });
      pts.push({ x: centres[ci + 1] - 90, y: mid });
    }
  });
  pts.push({ x: w, y: mid });
  return pts;
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number,
  pts: { x: number; y: number }[],
  rtl: boolean,
) {
  const segs: number[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    segs.push(d);
    total += d;
  }

  const target = progress * total;
  let drawn = 0;
  let dotX = pts[0].x;
  let dotY = pts[0].y;

  ctx.clearRect(0, 0, w, h);

  // ── Apply horizontal flip for RTL rows ─────────────────────────────────
  ctx.save();
  if (rtl) {
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
  }

  // Faint dashed mid-line
  ctx.save();
  ctx.strokeStyle = 'rgba(106,176,76,0.10)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 14]);
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();
  ctx.restore();

  // ECG line
  ctx.save();
  ctx.shadowColor = 'rgba(106,176,76,0.85)';
  ctx.shadowBlur = 14;
  ctx.strokeStyle = '#6AB04C';
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);

  for (let i = 1; i < pts.length; i++) {
    const seg = segs[i - 1];
    if (drawn + seg <= target) {
      ctx.lineTo(pts[i].x, pts[i].y);
      drawn += seg;
      dotX = pts[i].x;
      dotY = pts[i].y;
    } else {
      const t = (target - drawn) / seg;
      const ex = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t;
      const ey = pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t;
      ctx.lineTo(ex, ey);
      dotX = ex;
      dotY = ey;
      break;
    }
  }
  ctx.stroke();

  // Outer glow dot
  ctx.beginPath();
  ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#6AB04C';
  ctx.shadowBlur = 28;
  ctx.fill();
  // Bright core
  ctx.beginPath();
  ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.shadowBlur = 0;
  ctx.fill();

  ctx.restore(); // inner restore (shadow/stroke state)
  ctx.restore(); // outer restore (flip transform)
}

// ── Card animation variants ─────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: i * 0.13,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

// ── Component ───────────────────────────────────────────────────────────────
interface Props {
  children: ReactNode | ReactNode[];
  rowIndex: number;
  cols?: 2 | 3 | 4;   // number of columns — drives ECG spike count and grid class
}

const GRID: Record<number, string> = {
  2: 'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10',
  3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10',
  4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
};

export default function ServiceRowReveal({ children, rowIndex, cols = 3 }: Props) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);
  const [phase, setPhase] = useState<'idle' | 'ecg' | 'cards'>('idle');

  // Odd rows flow right-to-left
  const rtl = rowIndex % 2 === 1;

  // Observe when the row wrapper enters the viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          setPhase('ecg');
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Canvas ECG animation
  useEffect(() => {
    if (phase !== 'ecg') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.clientWidth  || 900;
    const H = canvas.clientHeight || 100;
    canvas.width  = W;
    canvas.height = H;

    const pts = buildPoints(W, H, cols);
    const DURATION = 1300;
    startRef.current = 0;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const p = Math.min((now - startRef.current) / DURATION, 1);
      drawFrame(ctx, W, H, p, pts, rtl);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase('cards'), 100);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  const items = Array.isArray(children) ? children : [children];

  return (
    // Real block wrapper — IntersectionObserver needs this to have layout
    <div ref={wrapRef} className="w-full mb-8 md:mb-10">

      {/* ECG strip — shown only during ecg phase */}
      {phase === 'ecg' && (
        <div style={{ width: '100%', height: 100, marginBottom: 12 }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
      )}

      {/* Invisible placeholders in idle phase — preserve row height so
          IntersectionObserver fires at the correct scroll position */}
      {phase === 'idle' && (
        <div className={GRID[cols]}>
          {items.map((_, i) => (
            <div key={i} style={{ minHeight: 480, opacity: 0, pointerEvents: 'none' }} aria-hidden="true" />
          ))}
        </div>
      )}

      {/* Real cards — hidden in idle, animated in cards/ecg phase.
          For RTL rows, card stagger is reversed so rightmost card enters first. */}
      {phase !== 'idle' && (
        <div className={GRID[cols]}>
          {items.map((child, i) => {
            // For RTL rows, reverse the stagger index so the last card (right)
            // animates first, matching the right-to-left ECG sweep direction
            const staggerIndex = rtl ? (items.length - 1 - i) : i;
            return (
              <motion.div
                key={i}
                custom={staggerIndex}
                variants={cardVariants}
                initial="hidden"
                animate={phase === 'cards' ? 'visible' : 'hidden'}
              >
                {child}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
