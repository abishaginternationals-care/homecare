'use client';

/**
 * ServiceRowReveal — Premium Edition
 *
 * Each row of service cards:
 *   1. Reveals with cinematic float-up + stagger when scrolled into view
 *   2. Includes a subtle ambient glow separator after each row
 *
 * No heartbeat/ECG animations. Pure clean motion.
 */

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

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
  cols?: 2 | 3 | 4;
}

const GRID: Record<number, string> = {
  2: 'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10',
  3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10',
  4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
};

export default function ServiceRowReveal({ children, rowIndex, cols = 3 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'cards'>('idle');

  // Observe when the row wrapper enters the viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          setPhase('cards');
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={wrapRef} className="w-full mb-8 md:mb-10 relative">
      {/* Cards grid */}
      <div className={GRID[cols]}>
        {items.map((child, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={phase === 'cards' ? 'visible' : 'hidden'}
            style={phase === 'idle' ? { minHeight: 480, opacity: 0, pointerEvents: 'none' } : {}}
          >
            {child}
          </motion.div>
        ))}
      </div>

      {/* Inter-row ambient glow separator */}
      <div style={{
        position: 'relative',
        height: '48px',
        marginTop: '16px',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === 'cards' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          style={{
            position: 'absolute',
            left: '15%',
            top: '-20px',
            width: '70%',
            height: '80px',
            borderRadius: '50%',
            background: `radial-gradient(ellipse, rgba(106,176,76,${0.06 + (rowIndex % 3) * 0.02}) 0%, transparent 70%)`,
          }}
        />
        {/* Thin center line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={phase === 'cards' ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: '25%',
            top: '50%',
            width: '50%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(106,176,76,0.12) 30%, rgba(106,176,76,0.15) 50%, rgba(106,176,76,0.12) 70%, transparent 100%)',
            transformOrigin: 'center',
          }}
        />
      </div>
    </div>
  );
}
