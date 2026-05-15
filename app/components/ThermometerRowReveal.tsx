'use client';

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
  2: 'grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10',
  3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10',
  4: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8',
};

export default function ThermometerRowReveal({ children, rowIndex, cols = 3 }: Props) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'thermo' | 'cards'>('idle');

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
          setPhase('thermo');
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Timer for thermometer fill duration
  useEffect(() => {
    if (phase === 'thermo') {
      const timer = setTimeout(() => {
        setPhase('cards');
      }, 1300); // 1.3s for the mercury to run through
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={wrapRef} className="w-full mb-8 md:mb-10">

      {/* Thermometer — shown only during thermo phase */}
      {phase === 'thermo' && (
        <div style={{ width: '100%', height: 100, marginBottom: 12, display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            position: 'relative', width: '100%', height: '24px', 
            display: 'flex', alignItems: 'center', 
            flexDirection: rtl ? 'row-reverse' : 'row' 
          }}>
            {/* Bulb */}
            <div style={{ 
              width: '42px', height: '42px', borderRadius: '50%', 
              background: 'radial-gradient(circle at 30% 30%, #EAF5E0, #6AB04C)', 
              boxShadow: '0 4px 10px rgba(106, 176, 76, 0.4), inset 0 2px 4px rgba(255,255,255,0.6)',
              zIndex: 10,
              border: '2px solid rgba(255,255,255,0.8)',
              flexShrink: 0
            }} />
            
            {/* Tube Track */}
            <div style={{ 
              flexGrow: 1, height: '18px', 
              background: 'rgba(255,255,255,0.6)', 
              border: '1px solid rgba(0,0,0,0.08)', 
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
              borderRadius: rtl ? '12px 0 0 12px' : '0 12px 12px 0',
              marginLeft: rtl ? 0 : '-12px', 
              marginRight: rtl ? '-12px' : 0,
              position: 'relative', overflow: 'hidden',
              zIndex: 1
            }}>
              {/* Mercury Fill */}
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ 
                  position: 'absolute', top: 0, height: '100%',
                  left: rtl ? 'auto' : 0, right: rtl ? 0 : 'auto',
                  background: rtl ? 'linear-gradient(to left, #6AB04C, #4A8A30)' : 'linear-gradient(to right, #6AB04C, #4A8A30)',
                  boxShadow: '0 0 15px rgba(106, 176, 76, 0.6)'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Invisible placeholders */}
      {phase === 'idle' && (
        <div className={GRID[cols]}>
          {items.map((_, i) => (
            <div key={i} style={{ minHeight: 'clamp(280px, 40vw, 480px)', opacity: 0, pointerEvents: 'none' }} aria-hidden="true" />
          ))}
        </div>
      )}

      {/* Cards */}
      {phase !== 'idle' && (
        <div className={GRID[cols]}>
          {items.map((child, i) => {
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
