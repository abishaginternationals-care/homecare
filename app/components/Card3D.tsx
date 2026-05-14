'use client';

import React from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}

export default function Card3D({ children, className, style, glowColor = 'rgba(106,176,76,0.25)' }: Card3DProps) {
  return (
    <div
      className={className}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(-10px)';
        el.style.boxShadow = `0 24px 56px rgba(61,26,10,0.16), 0 0 0 1.5px ${glowColor}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(0px)';
        el.style.boxShadow = '0 4px 20px rgba(61,26,10,0.08)';
      }}
      style={{
        transform: 'translateY(0px)',
        willChange: 'transform',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'inherit',
        boxShadow: '0 4px 20px rgba(61,26,10,0.08)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
