'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Stethoscope, Users, Home } from 'lucide-react';

// ── Particle data generated once, stable across renders ──────────────────────
const PARTICLES = [
  { id: 0,  Icon: ShieldCheck,   x: 8,  y: 12, size: 14, dur: 22, delay: 0,    opacity: 0.06 },
  { id: 1,  Icon: HeartHandshake,x: 25, y: 60, size: 12, dur: 28, delay: 3.5,  opacity: 0.05 },
  { id: 2,  Icon: Stethoscope,   x: 55, y: 22, size: 13, dur: 25, delay: 7,    opacity: 0.07 },
  { id: 3,  Icon: Users,         x: 78, y: 75, size: 11, dur: 30, delay: 1.5,  opacity: 0.05 },
  { id: 4,  Icon: Home,          x: 42, y: 88, size: 12, dur: 24, delay: 5,    opacity: 0.06 },
  { id: 5,  Icon: ShieldCheck,   x: 88, y: 35, size: 10, dur: 27, delay: 9,    opacity: 0.04 },
  { id: 6,  Icon: HeartHandshake,x: 15, y: 82, size: 13, dur: 32, delay: 2,    opacity: 0.05 },
  { id: 7,  Icon: Stethoscope,   x: 68, y: 50, size: 11, dur: 20, delay: 12,   opacity: 0.06 },
];

// ── Floating Orb ─────────────────────────────────────────────────────────────
function AmbientOrb({ style, animate }: { style: React.CSSProperties; animate: Record<string, unknown> }) {
  return (
    <motion.div
      animate={animate}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' } as any}
      style={{
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'none',
        willChange: 'transform',
        ...style,
      }}
    />
  );
}

// ── Icon Particle ────────────────────────────────────────────────────────────
function IconParticle({ Icon, x, y, size, dur, delay, opacity }: typeof PARTICLES[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, opacity, opacity * 0.6, 0], y: [-20, -90] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut', repeatDelay: delay * 0.4 }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        pointerEvents: 'none',
        color: '#6AB04C',
        width: size,
        height: size,
      }}
    >
      <Icon size={size} strokeWidth={1.2} />
    </motion.div>
  );
}

// ── SVG Wave Lines ────────────────────────────────────────────────────────────
function WaveLines() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top flowing curve */}
      <motion.path
        d="M -100 180 C 150 80, 350 280, 600 160 S 900 40, 1200 160 S 1500 280, 1800 160"
        fill="none"
        stroke="url(#waveGreen)"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.5, ease: 'easeOut', delay: 0.5 }}
      />
      {/* Mid wave */}
      <motion.path
        d="M -100 420 C 200 320, 400 520, 700 400 S 1000 280, 1300 400 S 1600 520, 1900 400"
        fill="none"
        stroke="url(#waveBrown)"
        strokeWidth="0.8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4, ease: 'easeOut', delay: 1.2 }}
      />
      {/* Bottom accent */}
      <motion.path
        d="M -100 680 C 300 580, 500 780, 800 660 S 1100 540, 1400 660 S 1700 780, 2000 660"
        fill="none"
        stroke="url(#waveGreen)"
        strokeWidth="0.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4.5, ease: 'easeOut', delay: 2 }}
      />
      <defs>
        <linearGradient id="waveGreen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#6AB04C" stopOpacity="0" />
          <stop offset="25%"  stopColor="#6AB04C" stopOpacity="0.12" />
          <stop offset="50%"  stopColor="#4A8A30" stopOpacity="0.08" />
          <stop offset="75%"  stopColor="#6AB04C" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#6AB04C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="waveBrown" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#3D1A0A" stopOpacity="0" />
          <stop offset="40%"  stopColor="#6B3020" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#3D1A0A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ServicesBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef });

  // Parallax for orbs
  const orbY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const orbY3 = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* ── 1. Ambient Light: Top-Left Warm Glow ── */}
      <motion.div
        animate={{ opacity: [0.55, 0.75, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106,176,76,0.09) 0%, rgba(106,176,76,0.04) 40%, transparent 70%)',
          filter: 'blur(8px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* ── 2. Large Orbs — Parallax ── */}
      <motion.div style={{ y: orbY1, position: 'absolute', top: '5%', right: '8%', width: '520px', height: '520px' }}>
        <AmbientOrb
          style={{ inset: 0, background: 'radial-gradient(circle, rgba(106,176,76,0.07) 0%, transparent 65%)', filter: 'blur(6px)' }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.04, 1] }}
        />
      </motion.div>

      <motion.div style={{ y: orbY2, position: 'absolute', bottom: '10%', left: '5%', width: '440px', height: '440px' }}>
        <AmbientOrb
          style={{ inset: 0, background: 'radial-gradient(circle, rgba(61,26,10,0.06) 0%, transparent 65%)', filter: 'blur(6px)' }}
          animate={{ x: [0, -35, 0], y: [0, 25, 0], scale: [1, 1.06, 1] }}
        />
      </motion.div>

      <motion.div style={{ y: orbY3, position: 'absolute', top: '40%', left: '40%', width: '360px', height: '360px' }}>
        <AmbientOrb
          style={{ inset: 0, background: 'radial-gradient(circle, rgba(244,167,32,0.04) 0%, transparent 65%)', filter: 'blur(5px)' }}
          animate={{ x: [0, 20, -15, 0], y: [0, -20, 10, 0], scale: [1, 1.03, 0.97, 1] }}
        />
      </motion.div>

      {/* Small green accent orb — mid-right */}
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 30, 0], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', top: '25%', right: '2%', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(106,176,76,0.10) 0%, transparent 70%)', filter: 'blur(4px)' }}
      />

      {/* ── 3. SVG Wave Lines ── */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.9 }}>
        <WaveLines />
      </div>

      {/* ── 4. Healthcare Symbol Particles ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {PARTICLES.map(p => (
          <IconParticle key={p.id} {...p} />
        ))}
      </div>

      {/* ── 5. Soft Dot-Grid Texture ── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(106,176,76,0.055) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 1,
        }}
      />

      {/* ── 6. Bottom Warm Vignette ── */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '260px',
          background: 'linear-gradient(to top, rgba(244,241,237,0.35) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
