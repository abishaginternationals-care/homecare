'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

const CHARS = ['A', 'b', 'i', 's', 'h', 'a', 'g'];

// --- canvas particle system ---
type Particle = {
  x: number; y: number;
  size: number; color: string;
  vx: number; vy: number;
  alpha: number;
  rotation: number; rotSpeed: number;
  type: 0 | 1 | 2;
};

function initCanvas(canvas: HTMLCanvasElement) {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const palette = ['#6AB04C', '#4ABED6', 'rgba(106,176,76,0.5)', 'rgba(74,190,214,0.4)', '#ffffff', 'rgba(255,255,255,0.3)'];
  const ps: Particle[] = Array.from({ length: 100 }, () => ({
    x:         Math.random() * canvas.width,
    y:         canvas.height + Math.random() * canvas.height,
    size:      Math.random() * 4.5 + 1,
    color:     palette[Math.floor(Math.random() * palette.length)],
    vx:        (Math.random() - 0.5) * 0.7,
    vy:        -(Math.random() * 1.1 + 0.2),
    alpha:     Math.random() * 0.55 + 0.1,
    rotation:  Math.random() * Math.PI * 2,
    rotSpeed:  (Math.random() - 0.5) * 0.03,
    type:      [0, 1, 2][Math.floor(Math.random() * 3)] as 0 | 1 | 2,
  }));

  const ctx = canvas.getContext('2d')!;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of ps) {
      p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed;
      if (p.y < -20) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.color;
      ctx.strokeStyle = p.color;

      if (p.type === 0) {
        ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill();
      } else if (p.type === 1) {
        ctx.beginPath(); ctx.ellipse(0, 0, p.size * 0.5, p.size * 1.8, 0, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-p.size, 0); ctx.lineTo(p.size, 0);
        ctx.moveTo(0, -p.size); ctx.lineTo(0, p.size); ctx.stroke();
      }
      ctx.restore();
    }
    return requestAnimationFrame(draw);
  };

  return draw();
}

export default function IntroAnimation({ onComplete }: Props) {
  const [step, setStep]       = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [charOn, setCharOn]   = useState<boolean[]>(Array(7).fill(false));
  const canvasRef             = useRef<HTMLCanvasElement>(null);
  const rafRef                = useRef<number>(0);

  const dismiss = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onComplete, 900);
  }, [leaving, onComplete]);

  // Canvas particles
  useEffect(() => {
    if (!canvasRef.current) return;
    rafRef.current = initCanvas(canvasRef.current);
    const onResize = () => { if (canvasRef.current) initCanvas(canvasRef.current); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', onResize); };
  }, []);

  // Char-by-char reveal
  useEffect(() => {
    if (step < 3) return;
    CHARS.forEach((_, i) =>
      setTimeout(() =>
        setCharOn(p => { const n = [...p]; n[i] = true; return n; }),
        i * 110
      )
    );
  }, [step]);

  // Master timeline
  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 150),
      setTimeout(() => setStep(2), 550),
      setTimeout(() => setStep(3), 1350),
      setTimeout(() => setStep(4), 2700),
      setTimeout(() => setStep(5), 3450),
      setTimeout(() => setStep(6), 4100),
      setTimeout(() => setStep(7), 4700),
      setTimeout(dismiss, 6400),
    ];
    return () => t.forEach(clearTimeout);
  }, [dismiss]);

  const ECG_PATH =
    'M 0,30 L 35,30 L 48,10 L 58,52 L 72,30 L 108,30 L 118,18 L 128,44 L 138,30 L 180,30 L 190,14 L 200,46 L 210,30 L 300,30';

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(ellipse at 50% 58%, #1A0803 0%, #050101 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', userSelect: 'none', overflow: 'hidden',
        opacity: leaving ? 0 : 1,
        transition: leaving ? 'opacity 0.9s ease' : 'none',
      }}
    >
      {/* ── Canvas particle field ── */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.9 }} />

      {/* ── Liquid morphing blobs ── */}
      <div style={{
        position: 'absolute',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(106,176,76,0.12) 0%, transparent 70%)',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        animation: 'morphBlob 9s ease-in-out infinite',
        top: '10%', left: '-10%',
        opacity: step >= 1 ? 0.8 : 0,
        transition: 'opacity 1.5s ease',
        filter: 'blur(30px)',
      }} />
      <div style={{
        position: 'absolute',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(74,190,214,0.1) 0%, transparent 70%)',
        borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
        animation: 'morphBlob 12s ease-in-out infinite reverse',
        bottom: '5%', right: '-8%',
        opacity: step >= 1 ? 0.7 : 0,
        transition: 'opacity 1.5s ease 0.3s',
        filter: 'blur(40px)',
      }} />

      {/* ── Warm ambient glow ── */}
      <div style={{
        position: 'absolute', width: '800px', height: '800px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(106,176,76,0.07) 0%, rgba(61,26,10,0.12) 40%, transparent 70%)',
        opacity: step >= 1 ? 1 : 0,
        transform: step >= 1 ? 'scale(1)' : 'scale(0.3)',
        transition: 'opacity 1.4s ease, transform 1.4s ease',
      }} />

      {/* ── Cinematic scan line ── */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(106,176,76,0.4), transparent)',
        top: '0%',
        opacity: step >= 2 ? 1 : 0,
        animation: step >= 2 ? 'none' : 'none',
        transition: 'opacity 0.4s ease',
        transform: step >= 2 ? 'translateY(100vh)' : 'translateY(0)',
        transitionDuration: step >= 2 ? '1.8s' : '0s',
        transitionTimingFunction: 'ease-in-out',
      }} />

      {/* ── Outer decorative rings ── */}
      {[700, 500, 320].map((r, i) => (
        <div
          key={r}
          className="intro-pulse-ring"
          style={{
            position: 'absolute', width: `${r}px`, height: `${r}px`,
            borderRadius: '50%',
            border: `1px solid rgba(106,176,76,${0.05 + i * 0.04})`,
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'scale(1)' : 'scale(0.2)',
            transition: `opacity 1s ease ${i * 0.14}s, transform 1.1s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.14}s`,
          }}
        />
      ))}

      {/* ── Starburst rays ── */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '1.5px',
            height: step >= 2 ? '160px' : '0px',
            background: `linear-gradient(to top, rgba(106,176,76,${0.18 - i * 0.005}), transparent)`,
            transformOrigin: 'bottom center',
            transform: `rotate(${i * 30}deg) translateX(-0.75px)`,
            opacity: step >= 2 ? 0.8 : 0,
            transition: `height 0.8s ease ${0.04 * i}s, opacity 0.6s ease ${0.04 * i}s`,
            borderRadius: '2px',
          }}
        />
      ))}

      {/* ══ Main content ══ */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Logo with burst rings */}
        <div style={{ position: 'relative', width: '118px', height: '118px', marginBottom: '34px' }}>
          {/* ripple rings */}
          {[1, 2, 3].map(n => (
            <div
              key={n}
              style={{
                position: 'absolute',
                inset: `${-n * 16}px`,
                borderRadius: '50%',
                border: `1px solid rgba(106,176,76,${0.2 - n * 0.04})`,
                opacity: step >= 2 ? 1 : 0,
                transform: step >= 2 ? 'scale(1)' : 'scale(0)',
                transition: `all 0.9s cubic-bezier(0.34,1.56,0.64,1) ${n * 0.08}s`,
                animation: step >= 2 ? `ripplePing ${2.2 + n * 0.7}s cubic-bezier(0,0,0.2,1) infinite ${n * 0.5}s` : 'none',
              }}
            />
          ))}

          {/* logo */}
          <div
            className={step >= 2 ? 'intro-logo-glow' : ''}
            style={{
              width: '118px', height: '118px',
              background: '#ffffff',
              borderRadius: '50%',
              padding: '8px',
              boxShadow: step >= 2 ? '0 0 0px 0px rgba(106,176,76,0.3), 0 0 60px rgba(106,176,76,0.15)' : 'none',
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2
                ? 'scale(1) translateY(0) rotate(0deg)'
                : 'scale(0.15) translateY(30px) rotate(-20deg)',
              transition: 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.8s ease',
            }}
          >
            <img src="/logo-transparent.png" alt="Abishag" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>

        {/* Character-by-character "Abishag" with 3-D flip + glow */}
        <div style={{ display: 'flex', gap: '2px', marginBottom: '6px', perspective: '600px' }}>
          {CHARS.map((ch, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 300,
                color: charOn[i] ? '#ffffff' : 'transparent',
                textShadow: charOn[i]
                  ? '0 0 30px rgba(106,176,76,0.65), 0 2px 40px rgba(0,0,0,0.6)'
                  : 'none',
                letterSpacing: '0.04em',
                opacity: charOn[i] ? 1 : 0,
                transform: charOn[i]
                  ? 'translateY(0) rotateY(0deg) scale(1)'
                  : 'translateY(28px) rotateY(90deg) scale(0.5)',
                transition: `opacity 0.45s ease ${i * 0.04}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.04}s, text-shadow 0.45s ease`,
                display: 'inline-block',
                willChange: 'transform, opacity',
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* ECG / Heartbeat line — SVG stroke-dashoffset draw */}
        <div style={{
          width: '300px', marginBottom: '14px',
          opacity: step >= 4 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          <svg viewBox="0 0 300 60" style={{ width: '100%', height: '38px', overflow: 'visible' }}>
            {/* glow duplicate */}
            <path
              d={ECG_PATH}
              fill="none"
              stroke="rgba(106,176,76,0.3)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                strokeDasharray: 700,
                strokeDashoffset: step >= 4 ? 0 : 700,
                transition: 'stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)',
                filter: 'blur(4px)',
              }}
            />
            {/* sharp line */}
            <path
              d={ECG_PATH}
              fill="none"
              stroke="#6AB04C"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                strokeDasharray: 700,
                strokeDashoffset: step >= 4 ? 0 : 700,
                transition: 'stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            {/* moving bright dot at tip */}
            {step >= 4 && (
              <circle r="4" fill="#6AB04C" style={{ filter: 'drop-shadow(0 0 6px #6AB04C)' }}>
                <animateMotion dur="1.3s" begin="0s" fill="freeze" path={ECG_PATH} />
              </circle>
            )}
          </svg>
        </div>

        {/* "HOME HEALTH SERVICES" with letter spacing animation */}
        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.64rem',
          fontWeight: 800,
          letterSpacing: step >= 5 ? '0.42em' : '0.05em',
          textTransform: 'uppercase',
          color: '#6AB04C',
          margin: '0 0 22px 0',
          opacity: step >= 5 ? 1 : 0,
          transform: step >= 5 ? 'translateY(0) scaleX(1)' : 'translateY(10px) scaleX(0.8)',
          transition: 'opacity 0.7s ease, transform 0.7s ease, letter-spacing 1.2s cubic-bezier(0.22,1,0.36,1)',
          textShadow: '0 0 20px rgba(106,176,76,0.4)',
        }}>
          Home Health Services
        </p>

        {/* Horizontal divider line */}
        <div style={{
          width: step >= 6 ? '200px' : '0px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(106,176,76,0.5), transparent)',
          marginBottom: '28px',
          transition: 'width 0.9s cubic-bezier(0.22,1,0.36,1)',
        }} />

        {/* Brand-color glowing dots */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {[
            { c: '#6AB04C', shadow: 'rgba(106,176,76,0.8)', size: 10 },
            { c: '#4ABED6', shadow: 'rgba(74,190,214,0.8)',  size: 8  },
            { c: '#2D2873', shadow: 'rgba(45,40,115,0.9)',   size: 10 },
          ].map(({ c, shadow, size }, i) => (
            <div key={i} style={{
              position: 'relative',
              width: `${size}px`, height: `${size}px`, borderRadius: '50%',
              background: c,
              boxShadow: `0 0 12px ${shadow}, 0 0 28px ${shadow}`,
              opacity: step >= 7 ? 1 : 0,
              transform: step >= 7 ? 'scale(1)' : 'scale(0)',
              transition: `opacity 0.5s ease ${i * 0.18}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.18}s`,
            }}>
              {/* outer ripple */}
              {step >= 7 && (
                <div style={{
                  position: 'absolute', inset: '-4px', borderRadius: '50%',
                  border: `2px solid ${c}`,
                  animation: `ripplePing 2s cubic-bezier(0,0,0.2,1) infinite ${i * 0.4}s`,
                  opacity: 0.5,
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skip hint */}
      <div style={{
        position: 'absolute', bottom: '28px', right: '38px',
        fontFamily: "'Nunito', sans-serif",
        fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.22)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        opacity: step >= 5 ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none',
      }}>
        Click to skip
      </div>
    </div>
  );
}
