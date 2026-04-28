'use client';

import React, { useRef, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
}

export default function MagneticButton({ children, className, style, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    // Only move upward — clamp y to negative values only, ignore X axis
    const liftY = Math.min(y, 0);
    ref.current.style.transform = `translateY(${liftY}px) scale(1.04)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translateY(0) scale(1)';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        display: 'inline-block',
        transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
