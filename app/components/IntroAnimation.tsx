'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Props {
  onComplete: () => void;
}

// ── ECG Heartbeat Path (scaled to 800×100 viewBox) ──────────────────────────
// Flat → P-wave bump → QRS spike → T-wave bump → flat
const ECG = `
  M -10,50
  L 180,50
  Q 193,38 206,50
  L 228,50
  L 238,62
  L 256,4
  L 273,72
  L 290,50
  Q 310,30 330,50
  L 810,50
`.trim();

function IntroSequence({ onDismiss }: { onDismiss: () => void }) {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Logo appears after the ECG line finishes drawing
    const t = setTimeout(() => setShowLogo(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      onClick={onDismiss}
      exit={{ opacity: 0, transition: { duration: 0.65, ease: 'easeInOut' } }}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >

      {/* ── ECG Line — full width, centered vertically ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <svg
          viewBox="0 0 800 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100vw', height: 'auto', overflow: 'visible' }}
        >
          <defs>
            <filter id="ecg-glow-intro" x="-50%" y="-200%" width="200%" height="500%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main ECG trace — draws from left to right */}
          <motion.path
            d={ECG}
            fill="none"
            stroke="#6AB04C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ecg-glow-intro)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.2, ease: 'easeInOut' },
              opacity:     { duration: 0.2 },
            }}
          />

          {/* Subtle dimmer secondary trace for depth */}
          <motion.path
            d={ECG}
            fill="none"
            stroke="rgba(106,176,76,0.2)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.2, ease: 'easeInOut' },
              opacity:     { duration: 0.2 },
            }}
          />
        </svg>
      </div>

      {/* ── Logo + Brand — appears after ECG completes ── */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {/* Logo circle */}
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: '#ffffff',
              padding: '14px',
              boxShadow: '0 0 60px rgba(106,176,76,0.55), 0 0 120px rgba(106,176,76,0.2), 0 8px 32px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                src="/logo-transparent.webp"
                alt="Abishag"
                width={140}
                height={140}
                priority
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 400,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textShadow: '0 0 40px rgba(106,176,76,0.45)',
                margin: 0,
              }}
            >
              Abishag
            </motion.h1>

            {/* Green divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '180px' }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '1.5px',
                background: 'linear-gradient(to right, transparent, #6AB04C, transparent)',
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#6AB04C',
                margin: 0,
              }}
            >
              Home Health Services
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          right: '36px',
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.22)',
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
    setTimeout(onComplete, 700);
  };

  // Auto-dismiss after 2.4 s
  useEffect(() => {
    const t = setTimeout(dismiss, 2400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(160deg, #0D0704 0%, #0A0503 50%, #0C0803 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        {!done && <IntroSequence key="intro" onDismiss={dismiss} />}
      </AnimatePresence>
    </div>
  );
}
