'use client';

/**
 * EcgHeartbeatWidget
 *
 * A continuously looping, live ECG heartbeat animation rendered on a Canvas,
 * with a HeartHandshake icon centred between two pulse spikes.
 *
 * The line scrolls indefinitely — when it reaches the edge it wraps
 * seamlessly so the animation never pauses.
 *
 * direction='ltr' (default) — wave scrolls left, lead dot on the RIGHT edge
 * direction='rtl'            — wave scrolls right, lead dot on the LEFT edge
 */

import { useEffect, useRef, ReactNode } from 'react';
import { HeartHandshake } from 'lucide-react';

interface Props {
  /** Icon rendered in the centre circle. Defaults to HeartHandshake. */
  icon?: ReactNode;
  /** Small caption below the icon. Defaults to 'Care · Compassion · Trust'. */
  label?: string;
  /** Scroll direction of the ECG wave. 'ltr' = left-to-right leading dot (default). 'rtl' = right-to-left leading dot. */
  direction?: 'ltr' | 'rtl';
}

// ── ECG waveform template (one "heartbeat unit") ───────────────────────────
// Defined as fractions of canvas width (x) and canvas height (y).
// Values repeat every PERIOD_PX pixels.
const PERIOD_PX = 320; // pixels per full ECG cycle

function buildCyclePoints(period: number, h: number) {
  const mid = h / 2;
  const s = period / 320; // scale factor
  return [
    { x: 0,          y: mid },
    { x: 60  * s,    y: mid },
    { x: 80  * s,    y: mid - h * 0.07 },
    { x: 100 * s,    y: mid + h * 0.15 },
    { x: 120 * s,    y: mid - h * 0.55 }, // main peak
    { x: 140 * s,    y: mid + h * 0.28 },
    { x: 165 * s,    y: mid },
    { x: period,     y: mid },
  ];
}

/** Interpolate y along a polyline of {x,y} points at a given x value */
function yAtX(pts: { x: number; y: number }[], x: number): number {
  for (let i = 1; i < pts.length; i++) {
    if (x <= pts[i].x) {
      const t = (x - pts[i - 1].x) / (pts[i].x - pts[i - 1].x);
      return pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t;
    }
  }
  return pts[pts.length - 1].y;
}

export default function EcgHeartbeatWidget({
  icon,
  label = 'Care · Compassion · Trust',
  direction = 'ltr',
}: Props) {
  // default icon — HeartHandshake from lucide
  const renderedIcon = icon ?? (
    <HeartHandshake
      size={46}
      color="#6AB04C"
      strokeWidth={1.4}
      style={{ filter: 'drop-shadow(0 0 8px rgba(106,176,76,0.7))' }}
    />
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef(0);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const SPEED = 1.4; // px per frame
    const isRtl = direction === 'rtl';

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cycle = buildCyclePoints(PERIOD_PX, H);

      // ── Faint dashed baseline ──────────────────────────────────────────
      ctx.save();
      ctx.strokeStyle = 'rgba(106,176,76,0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 14]);
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
      ctx.restore();

      // ── Apply horizontal flip for RTL ──────────────────────────────────
      ctx.save();
      if (isRtl) {
        ctx.translate(W, 0);
        ctx.scale(-1, 1);
      }

      // ── Scrolling ECG line ─────────────────────────────────────────────
      ctx.save();
      ctx.shadowColor = 'rgba(106,176,76,0.80)';
      ctx.shadowBlur  = 10;
      ctx.strokeStyle = '#6AB04C';
      ctx.lineWidth   = 2.5;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';

      ctx.beginPath();
      for (let px = 0; px <= W; px++) {
        // position within a cycle, accounting for scroll offset
        const cycleX = ((px + offsetRef.current) % PERIOD_PX + PERIOD_PX) % PERIOD_PX;
        const y = yAtX(cycle, cycleX);
        if (px === 0) ctx.moveTo(px, y);
        else          ctx.lineTo(px, y);
      }
      ctx.stroke();
      ctx.restore();

      // ── Glowing dot at the leading edge ───────────────────────────────
      // In the (possibly flipped) coordinate space, lead dot is always at
      // the RIGHT side (x = W-1). After the flip transform this appears at
      // the correct visual edge regardless of LTR / RTL.
      const leadX = W - 1;
      const leadCycleX = ((leadX + offsetRef.current) % PERIOD_PX + PERIOD_PX) % PERIOD_PX;
      const leadY = yAtX(cycle, leadCycleX);

      ctx.save();
      ctx.beginPath();
      ctx.arc(leadX, leadY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#6AB04C';
      ctx.shadowColor = 'rgba(106,176,76,0.9)';
      ctx.shadowBlur  = 20;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(leadX, leadY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.restore();

      ctx.restore(); // outer restore (flip transform)

      // Advance offset — same direction either way; flip handles the visual
      offsetRef.current += SPEED;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [direction]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
      }}
    >
      {/* Canvas fills the container */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* HeartHandshake icon centred on the midpoint — sits on top of canvas */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Glowing icon backdrop */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(106,176,76,0.22) 0%, rgba(106,176,76,0.06) 60%, transparent 80%)',
            border: '1.5px solid rgba(106,176,76,0.35)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'glowPulseGreen 2.8s ease-in-out infinite',
          }}
        >
          {renderedIcon}
        </div>

        {/* Label */}
        <span
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(106,176,76,0.85)',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
