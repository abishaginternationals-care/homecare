'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Stethoscope, Users, Home } from 'lucide-react';

// ── Healthcare icon particles — sparse, atmospheric, barely visible ──────────
const PARTICLES = [
  { id: 0,  Icon: ShieldCheck,    x: 3,  y: 8,   size: 16, dur: 28, delay: 0,    opacity: 0.055 },
  { id: 1,  Icon: HeartHandshake, x: 92, y: 15,  size: 13, dur: 34, delay: 4,    opacity: 0.04  },
  { id: 2,  Icon: Stethoscope,    x: 7,  y: 35,  size: 14, dur: 30, delay: 8,    opacity: 0.05  },
  { id: 3,  Icon: Users,          x: 90, y: 42,  size: 12, dur: 26, delay: 2,    opacity: 0.045 },
  { id: 4,  Icon: Home,           x: 5,  y: 58,  size: 15, dur: 32, delay: 6,    opacity: 0.05  },
  { id: 5,  Icon: ShieldCheck,    x: 94, y: 65,  size: 11, dur: 29, delay: 10,   opacity: 0.04  },
  { id: 6,  Icon: HeartHandshake, x: 4,  y: 78,  size: 13, dur: 35, delay: 3,    opacity: 0.045 },
  { id: 7,  Icon: Stethoscope,    x: 91, y: 85,  size: 14, dur: 27, delay: 7,    opacity: 0.05  },
  { id: 8,  Icon: Home,           x: 6,  y: 92,  size: 12, dur: 33, delay: 11,   opacity: 0.04  },
  { id: 9,  Icon: Users,          x: 93, y: 25,  size: 11, dur: 31, delay: 5,    opacity: 0.045 },
];

// ── Icon Particle ────────────────────────────────────────────────────────────
function IconParticle({ Icon, x, y, size, dur, delay, opacity }: typeof PARTICLES[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, opacity, opacity * 0.7, opacity * 0.4, 0],
        y: [0, -40, -80, -120, -160],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut', repeatDelay: delay * 0.3 }}
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
      <Icon size={size} strokeWidth={1} />
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ServicesBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax transforms for different depths
  const orbY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const orbY3 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const orbY4 = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const orbY5 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const lightBeamX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

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
      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 1: BASE WARM GRADIENT — replaces flat white
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 15% 20%, rgba(106,176,76,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 85% 75%, rgba(106,176,76,0.05) 0%, transparent 55%),
          radial-gradient(ellipse 90% 70% at 50% 50%, rgba(61,26,10,0.03) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 15%, rgba(244,167,32,0.03) 0%, transparent 50%),
          linear-gradient(175deg, #F7F4F0 0%, #F0EDE8 30%, #F4F1ED 60%, #EDF5E6 100%)
        `,
      }} />

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 2: CINEMATIC AMBIENT LIGHTING — warm directional glows
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* Top-left warm spotlight */}
      <motion.div
        animate={{ opacity: [0.6, 0.85, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-15%', left: '-10%',
          width: '800px', height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106,176,76,0.08) 0%, rgba(106,176,76,0.03) 35%, transparent 65%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Bottom-right green ambient */}
      <motion.div
        animate={{ opacity: [0.5, 0.75, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{
          position: 'absolute', bottom: '-10%', right: '-8%',
          width: '700px', height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106,176,76,0.07) 0%, rgba(74,138,48,0.03) 40%, transparent 65%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Center warm undertone */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        style={{
          position: 'absolute', top: '30%', left: '30%',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,241,237,0.5) 0%, rgba(61,26,10,0.02) 40%, transparent 60%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 3: LARGE FLOATING AMBIENT ORBS — parallax depth
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* Orb 1: Large green — top-right quadrant */}
      <motion.div style={{ y: orbY1, position: 'absolute', top: '2%', right: '5%', width: '580px', height: '580px' }}>
        <motion.div
          animate={{ x: [0, 50, -10, 0], y: [0, -35, 15, 0], scale: [1, 1.06, 0.98, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(106,176,76,0.07) 0%, rgba(106,176,76,0.02) 45%, transparent 65%)', pointerEvents: 'none' }}
        />
      </motion.div>

      {/* Orb 2: Warm brown — bottom-left */}
      <motion.div style={{ y: orbY2, position: 'absolute', bottom: '8%', left: '3%', width: '500px', height: '500px' }}>
        <motion.div
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0], scale: [1, 1.04, 0.97, 1] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(61,26,10,0.05) 0%, rgba(61,26,10,0.02) 45%, transparent 65%)', pointerEvents: 'none' }}
        />
      </motion.div>

      {/* Orb 3: Green accent — mid-left */}
      <motion.div style={{ y: orbY3, position: 'absolute', top: '25%', left: '0%', width: '420px', height: '420px' }}>
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.05, 0.96, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(106,176,76,0.06) 0%, transparent 60%)', pointerEvents: 'none' }}
        />
      </motion.div>

      {/* Orb 4: Cream-amber — center-right */}
      <motion.div style={{ y: orbY4, position: 'absolute', top: '45%', right: '2%', width: '380px', height: '380px' }}>
        <motion.div
          animate={{ x: [0, -30, 15, 0], y: [0, 20, -15, 0], opacity: [0.06, 0.10, 0.06] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
          style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,167,32,0.05) 0%, transparent 55%)', pointerEvents: 'none' }}
        />
      </motion.div>

      {/* Orb 5: Large subtle — bottom-center */}
      <motion.div style={{ y: orbY5, position: 'absolute', bottom: '5%', left: '35%', width: '550px', height: '550px' }}>
        <motion.div
          animate={{ x: [0, 25, -30, 0], y: [0, -20, 25, 0], scale: [1, 1.03, 0.98, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(106,176,76,0.04) 0%, transparent 55%)', pointerEvents: 'none' }}
        />
      </motion.div>

      {/* Orb 6: Tiny floating green — top-center */}
      <motion.div
        animate={{ x: [0, -20, 10, 0], y: [0, 15, -10, 0], opacity: [0.05, 0.09, 0.05] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', top: '12%', left: '45%', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(106,176,76,0.08) 0%, transparent 65%)', pointerEvents: 'none' }}
      />

      {/* Orb 7: Warm beige glow — mid-left edge */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -30, 0], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
        style={{ position: 'absolute', top: '55%', left: '-3%', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,170,130,0.06) 0%, transparent 60%)', pointerEvents: 'none' }}
      />

      {/* Orb 8: Green shimmer — bottom-right corner */}
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 20, 0], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        style={{ position: 'absolute', bottom: '15%', right: '0%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,138,48,0.06) 0%, transparent 60%)', pointerEvents: 'none' }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 4: MOVING LIGHT BEAMS — cinematic sweeps
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* Diagonal light beam — sweeps slowly */}
      <motion.div
        style={{ x: lightBeamX }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', repeatDelay: 8 }}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '30%', height: '100%',
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.03) 45%, rgba(106,176,76,0.02) 50%, rgba(255,255,255,0.03) 55%, transparent 80%)',
            transform: 'skewX(-15deg)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Secondary soft beam */}
      <motion.div
        animate={{ x: ['220%', '-120%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 12, repeatDelay: 5 }}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '20%', height: '100%',
          background: 'linear-gradient(95deg, transparent 20%, rgba(244,241,237,0.04) 45%, rgba(200,170,130,0.02) 55%, transparent 80%)',
          transform: 'skewX(-10deg)',
          pointerEvents: 'none',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 5: SVG WAVE LINES — care, continuity, flow
      ═══════════════════════════════════════════════════════════════════════ */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper flowing curve */}
        <motion.path
          d="M -100 200 C 200 100, 400 300, 700 180 S 1000 60, 1300 200 S 1600 340, 1900 200"
          fill="none" stroke="url(#svcWaveGreen)" strokeWidth="1" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, ease: 'easeOut', delay: 0.5 }}
        />
        {/* Mid curve */}
        <motion.path
          d="M -100 480 C 250 380, 500 580, 800 460 S 1100 340, 1400 480 S 1700 620, 2000 480"
          fill="none" stroke="url(#svcWaveBrown)" strokeWidth="0.7" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, ease: 'easeOut', delay: 1.5 }}
        />
        {/* Lower accent */}
        <motion.path
          d="M -100 750 C 300 650, 600 850, 900 730 S 1200 610, 1500 750 S 1800 890, 2100 750"
          fill="none" stroke="url(#svcWaveGreen)" strokeWidth="0.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5.5, ease: 'easeOut', delay: 2.5 }}
        />
        <defs>
          <linearGradient id="svcWaveGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6AB04C" stopOpacity="0" />
            <stop offset="20%"  stopColor="#6AB04C" stopOpacity="0.10" />
            <stop offset="50%"  stopColor="#4A8A30" stopOpacity="0.07" />
            <stop offset="80%"  stopColor="#6AB04C" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#6AB04C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="svcWaveBrown" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#3D1A0A" stopOpacity="0" />
            <stop offset="35%"  stopColor="#6B3020" stopOpacity="0.05" />
            <stop offset="65%"  stopColor="#3D1A0A" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#3D1A0A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 6: HEALTHCARE ICON PARTICLES — left and right margins
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {PARTICLES.map(p => (
          <IconParticle key={p.id} {...p} />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 7: PREMIUM GRID TEXTURE — medical-dashboard feel
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(106,176,76,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(106,176,76,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Finer dot sub-grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(61,26,10,0.025) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 8: EDGE VIGNETTES — premium depth framing
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* Top vignette */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(to bottom, rgba(244,241,237,0.4) 0%, transparent 100%)',
      }} />

      {/* Bottom vignette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '280px',
        background: 'linear-gradient(to top, rgba(244,241,237,0.5) 0%, transparent 100%)',
      }} />

      {/* Left edge glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(to right, rgba(244,241,237,0.25) 0%, transparent 100%)',
      }} />

      {/* Right edge glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(to left, rgba(244,241,237,0.25) 0%, transparent 100%)',
      }} />

      {/* ═══════════════════════════════════════════════════════════════════════
          RESPONSIVE: reduce on mobile
      ═══════════════════════════════════════════════════════════════════════ */}
      <style>{`
        @media (max-width: 768px) {
          /* Hide icon particles on mobile */
          .svc-bg-particles { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-bg-root * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
