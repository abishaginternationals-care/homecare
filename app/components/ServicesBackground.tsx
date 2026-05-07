'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Stethoscope, Users, Home } from 'lucide-react';

// ── Icon Particles — positioned in the left/right margins ────────────────────
const PARTICLES = [
  { id: 0,  Icon: ShieldCheck,    x: 2,   y: 10,  size: 18, dur: 26, delay: 0,   opacity: 0.12 },
  { id: 1,  Icon: HeartHandshake, x: 95,  y: 18,  size: 16, dur: 32, delay: 5,   opacity: 0.10 },
  { id: 2,  Icon: Stethoscope,    x: 3,   y: 32,  size: 17, dur: 28, delay: 9,   opacity: 0.11 },
  { id: 3,  Icon: Users,          x: 94,  y: 45,  size: 15, dur: 24, delay: 2,   opacity: 0.10 },
  { id: 4,  Icon: Home,           x: 2,   y: 55,  size: 16, dur: 30, delay: 7,   opacity: 0.11 },
  { id: 5,  Icon: ShieldCheck,    x: 96,  y: 62,  size: 14, dur: 27, delay: 11,  opacity: 0.09 },
  { id: 6,  Icon: HeartHandshake, x: 3,   y: 74,  size: 15, dur: 34, delay: 3,   opacity: 0.10 },
  { id: 7,  Icon: Stethoscope,    x: 93,  y: 82,  size: 16, dur: 25, delay: 8,   opacity: 0.11 },
  { id: 8,  Icon: Home,           x: 2,   y: 90,  size: 14, dur: 31, delay: 13,  opacity: 0.09 },
  { id: 9,  Icon: Users,          x: 95,  y: 27,  size: 13, dur: 29, delay: 6,   opacity: 0.10 },
];

function IconParticle({ Icon, x, y, size, dur, delay, opacity }: typeof PARTICLES[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, opacity, opacity * 0.8, opacity * 0.5, 0],
        y: [-10, -60, -110, -150],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut', repeatDelay: delay * 0.2 }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        pointerEvents: 'none',
        color: '#6AB04C',
      }}
    >
      <Icon size={size} strokeWidth={1.2} />
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ServicesBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax — each orb moves at different rate while scrolling
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0,  140]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0,  200]);

  return (
    /* IMPORTANT: position: absolute so it fills the entire page (not just viewport).
       The parent in page.tsx has position: relative, so this covers full page height. */
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        width: '100%', height: '100%',
        minHeight: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* ── LAYER 1: Warm base tint (overrides the pure-white default) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 100% 50% at 10% 10%, rgba(106,176,76,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 80%  60% at 90% 80%, rgba(106,176,76,0.10) 0%, transparent 50%),
          radial-gradient(ellipse 70%  50% at 50% 40%, rgba(61,26,10,0.04)  0%, transparent 55%),
          radial-gradient(ellipse 50%  35% at 85% 20%, rgba(244,167,32,0.06) 0%, transparent 45%),
          linear-gradient(160deg, #F0EDE8 0%, #EBF5E0 35%, #F4F1ED 65%, #EAF3E1 100%)
        `,
      }} />

      {/* ── LAYER 2: Large visible orbs — top-left warm glow ── */}
      <motion.div
        style={{ y: y1 }}
        animate={{ x: [0, 60, -20, 0], scale: [1, 1.10, 0.95, 1], opacity: [1, 1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute"
        aria-hidden
        // position top-left
        data-pos=""
      >
        <div style={{
          position: 'absolute',
          top: '-80px', left: '-80px',
          width: '700px', height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106,176,76,0.28) 0%, rgba(106,176,76,0.10) 40%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }} />
      </motion.div>

      {/* Orb 2 — bottom-right green */}
      <motion.div
        style={{ y: y2, position: 'absolute', bottom: '-60px', right: '-60px', width: '650px', height: '650px' }}
        animate={{ x: [0, -50, 20, 0], scale: [1, 1.08, 0.97, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      >
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,138,48,0.24) 0%, rgba(106,176,76,0.08) 45%, transparent 70%)',
          filter: 'blur(36px)',
        }} />
      </motion.div>

      {/* Orb 3 — mid-left brown-warm */}
      <motion.div
        style={{ y: y3, position: 'absolute', top: '22%', left: '-40px', width: '520px', height: '520px' }}
        animate={{ x: [0, 40, -15, 0], scale: [1, 1.06, 0.98, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
      >
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(61,26,10,0.10) 0%, rgba(107,48,32,0.05) 45%, transparent 68%)',
          filter: 'blur(32px)',
        }} />
      </motion.div>

      {/* Orb 4 — mid-right amber glow */}
      <motion.div
        style={{ y: y4, position: 'absolute', top: '38%', right: '-30px', width: '480px', height: '480px' }}
        animate={{ x: [0, -40, 15, 0], scale: [1, 1.07, 0.96, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
      >
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,167,32,0.12) 0%, rgba(200,140,60,0.05) 45%, transparent 68%)',
          filter: 'blur(30px)',
        }} />
      </motion.div>

      {/* Orb 5 — center-low green */}
      <motion.div
        style={{ position: 'absolute', top: '58%', left: '30%', width: '560px', height: '560px' }}
        animate={{ x: [0, 30, -25, 0], y: [0, -30, 20, 0], scale: [1, 1.05, 0.97, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      >
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106,176,76,0.15) 0%, transparent 65%)',
          filter: 'blur(28px)',
        }} />
      </motion.div>

      {/* Orb 6 — top-right amber accent */}
      <motion.div
        style={{ position: 'absolute', top: '5%', right: '8%', width: '400px', height: '400px' }}
        animate={{ x: [0, -30, 10, 0], y: [0, 20, -15, 0], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106,176,76,0.18) 0%, transparent 60%)',
          filter: 'blur(24px)',
        }} />
      </motion.div>

      {/* Orb 7 — lower-left beige */}
      <motion.div
        style={{ position: 'absolute', top: '70%', left: '2%', width: '380px', height: '380px' }}
        animate={{ x: [0, 25, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 33, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
      >
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,170,130,0.14) 0%, transparent 60%)',
          filter: 'blur(22px)',
        }} />
      </motion.div>

      {/* ── LAYER 3: SVG Wave Lines ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
        preserveAspectRatio="none"
      >
        <motion.path
          d="M -100 250 C 200 130, 450 370, 750 230 S 1050 90, 1350 250 S 1650 410, 1950 250"
          fill="none" stroke="url(#waveG1)" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, ease: 'easeOut', delay: 0.5 }}
        />
        <motion.path
          d="M -100 550 C 300 430, 550 650, 850 530 S 1150 410, 1450 550 S 1750 690, 2050 550"
          fill="none" stroke="url(#waveB1)" strokeWidth="1" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4.5, ease: 'easeOut', delay: 1.5 }}
        />
        <motion.path
          d="M -100 850 C 350 720, 650 960, 950 830 S 1250 700, 1550 850 S 1850 1000, 2150 850"
          fill="none" stroke="url(#waveG2)" strokeWidth="0.8" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5.5, ease: 'easeOut', delay: 2.5 }}
        />
        <defs>
          <linearGradient id="waveG1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6AB04C" stopOpacity="0" />
            <stop offset="25%"  stopColor="#6AB04C" stopOpacity="0.22" />
            <stop offset="50%"  stopColor="#4A8A30" stopOpacity="0.16" />
            <stop offset="75%"  stopColor="#6AB04C" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#6AB04C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveB1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#3D1A0A" stopOpacity="0" />
            <stop offset="40%"  stopColor="#6B3020" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#3D1A0A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveG2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6AB04C" stopOpacity="0" />
            <stop offset="30%"  stopColor="#6AB04C" stopOpacity="0.14" />
            <stop offset="70%"  stopColor="#4A8A30" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#6AB04C" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── LAYER 4: Premium grid texture ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(106,176,76,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(106,176,76,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
      }} />

      {/* Fine dot sub-grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(61,26,10,0.04) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }} />

      {/* ── LAYER 5: Healthcare Icon Particles (left & right margins only) ── */}
      {PARTICLES.map(p => <IconParticle key={p.id} {...p} />)}

      {/* ── LAYER 6: Soft Light Beam sweep ── */}
      <motion.div
        animate={{ x: ['-130%', '230%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear', repeatDelay: 10 }}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '25%', height: '100%',
          background: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.06) 45%, rgba(106,176,76,0.04) 50%, rgba(255,255,255,0.06) 55%, transparent 80%)',
          transform: 'skewX(-18deg)',
          pointerEvents: 'none',
        }}
      />

      {/* ── LAYER 7: Edge vignette framing ── */}
      {/* Top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to bottom, rgba(240,237,232,0.6) 0%, transparent 100%)' }} />
      {/* Bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, rgba(240,237,232,0.6) 0%, transparent 100%)' }} />
      {/* Left */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, rgba(234,245,224,0.35) 0%, transparent 100%)' }} />
      {/* Right */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, rgba(234,245,224,0.35) 0%, transparent 100%)' }} />

      <style>{`
        @media (max-width: 768px) {
          .svc-particle { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
