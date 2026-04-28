'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

function IntroSequence({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      onClick={onDismiss}
      exit={{
        scale: 1.06,
        opacity: 0,
        filter: 'blur(16px)',
        transition: { duration: 0.85, ease: 'easeInOut' },
      }}
      className="relative flex flex-col items-center justify-center cursor-pointer select-none"
      style={{ minHeight: '100vh', width: '100%' }}
    >
      {/* Layered green ambient glows */}
      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
        {/* Central bright green glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '70vw',
            height: '70vw',
            background: 'radial-gradient(circle, rgba(106,176,76,0.35) 0%, rgba(74,138,48,0.15) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Top-left warm accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute top-[-10%] left-[-5%] rounded-full"
          style={{
            width: '50vw',
            height: '50vw',
            background: 'radial-gradient(circle, rgba(106,176,76,0.2) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Bottom-right brown warmth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2.5, delay: 0.6 }}
          className="absolute bottom-[-5%] right-[-5%] rounded-full"
          style={{
            width: '45vw',
            height: '45vw',
            background: 'radial-gradient(circle, rgba(61,26,10,0.15) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Floating leaf-like particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100, x: (i % 2 === 0 ? -1 : 1) * (30 + i * 20) }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [100, -200],
            x: (i % 2 === 0 ? -1 : 1) * (30 + i * 20 + 40),
          }}
          transition={{ duration: 4 + i * 0.5, delay: 0.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#6AB04C' : i % 3 === 1 ? 'rgba(106,176,76,0.5)' : 'rgba(255,255,255,0.6)',
            filter: 'blur(1px)',
            zIndex: -10,
          }}
        />
      ))}

      {/* Decorative concentric rings — green tinted */}
      {[600, 420, 260].map((r, i) => (
        <motion.div
          key={r}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            position: 'absolute',
            width: `${r}px`,
            height: `${r}px`,
            borderRadius: '50%',
            border: `1.5px solid rgba(106,176,76,${0.12 + i * 0.06})`,
          }}
        />
      ))}

      {/* ── Central Logo Container ── */}
      <div className="relative mb-12" style={{ width: '180px', height: '180px' }}>

        {/* SVG Path-Trace ring around logo */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 0 16px rgba(106,176,76,0.5))' }}
          fill="none"
        >
          {/* Outer circle trace */}
          <motion.circle
            cx="50" cy="50" r="46"
            stroke="#6AB04C"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 1.8, ease: 'easeInOut' }, opacity: { duration: 0.4 } }}
          />
          {/* Inner dashed ring */}
          <motion.circle
            cx="50" cy="50" r="38"
            stroke="rgba(106,176,76,0.4)"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 1.4, ease: 'easeInOut', delay: 0.9 }, opacity: { duration: 0.4, delay: 0.9 } }}
          />
          {/* Cross-hair accents */}
          <motion.path
            d="M50 4 L50 14 M50 86 L50 96 M4 50 L14 50 M86 50 L96 50"
            stroke="#6AB04C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={0.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 1.0, ease: 'easeInOut', delay: 1.1 }, opacity: { duration: 0.3, delay: 1.1 } }}
          />
        </svg>

        {/* Ripple rings behind logo */}
        {[1, 2, 3].map(n => (
          <motion.div
            key={n}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 + n * 0.1, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: 'absolute',
              inset: `${-n * 14}px`,
              borderRadius: '50%',
              border: `1.5px solid rgba(106,176,76,${0.2 - n * 0.04})`,
              animation: `ripplePing ${2.2 + n * 0.7}s cubic-bezier(0,0,0.2,1) infinite ${n * 0.5}s`,
            }}
          />
        ))}

        {/* Green glow behind logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ delay: 1.0, duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(106,176,76,0.25) 0%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />

        {/* Logo image — assembles in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            position: 'absolute',
            inset: '18px',
            borderRadius: '50%',
            background: '#ffffff',
            padding: '10px',
            boxShadow: '0 0 50px rgba(106,176,76,0.3), 0 8px 32px rgba(61,26,10,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/logo-transparent.png"
            alt="Abishag"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </motion.div>

        {/* Green shine sweep over logo */}
        <motion.div
          initial={{ x: '-150%', skewX: -20 }}
          animate={{ x: '150%', skewX: -20 }}
          transition={{ delay: 2.2, duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: '18px',
            borderRadius: '50%',
            background: 'linear-gradient(to right, transparent, rgba(106,176,76,0.35), rgba(255,255,255,0.3), transparent)',
            zIndex: 10,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        />
      </div>

      {/* ── Brand Text — Staggered Reveal ── */}
      <div className="text-center overflow-hidden">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Brand name */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 400,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#3D1A0A',
              textShadow: '0 0 30px rgba(106,176,76,0.2)',
              marginBottom: '8px',
            }}
          >
            Abishag
          </h2>

          {/* Expanding horizontal divider — green gradient */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 2.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: '2px',
              background: 'linear-gradient(to right, transparent, #6AB04C, #4A8A30, transparent)',
              marginBottom: '16px',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.05em' }}
            animate={{ opacity: 1, letterSpacing: '0.45em' }}
            transition={{ delay: 2.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#4A8A30',
              textShadow: '0 0 12px rgba(106,176,76,0.3)',
            }}
          >
            Home Health Services
          </motion.p>
        </motion.div>
      </div>

      {/* Skip hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          right: '36px',
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.68rem',
          color: 'rgba(61,26,10,0.3)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        Click to skip
      </motion.p>
    </motion.div>
  );
}

export default function IntroAnimation({ onComplete }: Props) {
  const [done, setDone] = useState(false);

  const dismiss = () => {
    if (done) return;
    setDone(true);
    setTimeout(onComplete, 900);
  };

  // Auto-dismiss after 4.8s
  useEffect(() => {
    const t = setTimeout(dismiss, 4800);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(160deg, #E8F5E0 0%, #D5EDCA 30%, #EAF5E0 60%, #F4F1ED 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Curtain exit split — green tinted */}
      {done && (
        <>
          <div style={{ position: 'absolute', inset: '0 50% 0 0', zIndex: 10000, background: 'linear-gradient(to left, #D5EDCA, #E8F5E0)', animation: 'curtainLeft 0.85s cubic-bezier(0.85,0,0.15,1) forwards' }} />
          <div style={{ position: 'absolute', inset: '0 0 0 50%', zIndex: 10000, background: 'linear-gradient(to right, #D5EDCA, #E8F5E0)', animation: 'curtainRight 0.85s cubic-bezier(0.85,0,0.15,1) forwards' }} />
        </>
      )}

      <AnimatePresence mode="wait">
        {!done && (
          <IntroSequence key="intro" onDismiss={dismiss} />
        )}
      </AnimatePresence>
    </div>
  );
}
