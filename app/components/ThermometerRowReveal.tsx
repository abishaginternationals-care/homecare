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
        <div style={{ width: '100%', height: 100, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer Glass Housing */}
          <div style={{ 
            position: 'relative', width: '100%', maxWidth: '800px',
            background: 'rgba(255, 255, 255, 0.45)', 
            backdropFilter: 'blur(12px)',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 12px 36px rgba(61,26,10,0.08), inset 0 4px 8px rgba(255,255,255,0.7)',
            borderRadius: '50px',
            padding: '10px 14px',
            display: 'flex', alignItems: 'center', 
            flexDirection: rtl ? 'row-reverse' : 'row',
            transform: 'scale(1.05)'
          }}>
            {/* Bulb */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1)'] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ 
                width: '56px', height: '56px', borderRadius: '50%', 
                background: 'radial-gradient(circle at 35% 35%, #EAF5E0, #6AB04C 50%, #3D1A0A)', 
                boxShadow: '0 6px 16px rgba(106, 176, 76, 0.5), inset 0 6px 8px rgba(255,255,255,0.9), inset 0 -4px 10px rgba(0,0,0,0.3)',
                zIndex: 10,
                flexShrink: 0,
                position: 'relative',
                marginLeft: rtl ? 0 : '-4px',
                marginRight: rtl ? '-4px' : 0,
              }}
            >
              {/* Bulb Reflection */}
              <div style={{ position: 'absolute', top: '8px', left: '12px', width: '20px', height: '12px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', transform: 'rotate(-40deg)', filter: 'blur(1px)' }} />
            </motion.div>
            
            {/* Tube Track */}
            <div style={{ 
              flexGrow: 1, height: '28px', 
              background: 'rgba(240,240,240,0.6)', 
              borderTop: '1px solid rgba(0,0,0,0.12)',
              borderBottom: '1px solid rgba(255,255,255,0.9)',
              boxShadow: 'inset 0 6px 10px rgba(0,0,0,0.08)',
              borderRadius: rtl ? '14px 0 0 14px' : '0 14px 14px 0',
              marginLeft: rtl ? '4px' : '-16px', 
              marginRight: rtl ? '-16px' : '4px',
              position: 'relative', overflow: 'hidden',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
            }}>
              {/* Measurement Scale Ticks */}
              <div style={{ position: 'absolute', top: '0', left: rtl ? '5%' : '15%', right: rtl ? '15%' : '5%', height: '100%', display: 'flex', justifyContent: 'space-between', zIndex: 2, opacity: 0.35, pointerEvents: 'none' }}>
                {[...Array(15)].map((_, idx) => (
                  <div key={idx} style={{ height: idx % 5 === 0 ? '10px' : '6px', width: '2px', background: '#3D1A0A', alignSelf: 'flex-start' }} />
                ))}
              </div>

              {/* Glass Glare Line */}
              <div style={{ position: 'absolute', top: '2px', left: '0', right: '0', height: '8px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0))', zIndex: 3, borderRadius: '14px' }} />

              {/* Mercury Fill */}
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ 
                  position: 'absolute', top: 0, height: '100%',
                  left: rtl ? 'auto' : 0, right: rtl ? 0 : 'auto',
                  background: rtl ? 'linear-gradient(to left, #6AB04C, #4A8A30)' : 'linear-gradient(to right, #6AB04C, #4A8A30)',
                  boxShadow: '0 0 24px rgba(106, 176, 76, 0.8), inset 0 -6px 8px rgba(0,0,0,0.25), inset 0 6px 8px rgba(255,255,255,0.5)',
                  zIndex: 0,
                  borderRadius: rtl ? '14px 0 0 14px' : '0 14px 14px 0',
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
