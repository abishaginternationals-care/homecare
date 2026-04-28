'use client';

import React, { useRef, useCallback } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}

export default function Card3D({ children, className, style, glowColor = 'rgba(106,176,76,0.3)' }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Shimmer position
      const shimmerX = ((e.clientX - rect.left) / rect.width) * 100;
      const shimmerY = ((e.clientY - rect.top) / rect.height) * 100;

      ref.current.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.03)`;
      ref.current.style.boxShadow = `0 30px 60px rgba(61,26,10,0.18), 0 0 0 1.5px ${glowColor}, 0 0 40px ${glowColor}`;

      // Update shimmer
      const shimmer = ref.current.querySelector<HTMLElement>('[data-shimmer]');
      if (shimmer) {
        shimmer.style.background = `radial-gradient(circle at ${shimmerX}% ${shimmerY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, transparent 65%)`;
        shimmer.style.opacity = '1';
      }
    });
  }, [glowColor]);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    ref.current.style.boxShadow = '0 4px 20px rgba(61,26,10,0.08)';
    const shimmer = ref.current.querySelector<HTMLElement>('[data-shimmer]');
    if (shimmer) shimmer.style.opacity = '0';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'inherit',
        boxShadow: '0 4px 20px rgba(61,26,10,0.08)',
        ...style,
      }}
    >
      {/* Shimmer highlight that follows cursor */}
      <div
        data-shimmer
        style={{
          position: 'absolute',
          inset: 0,
          background: 'transparent',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 10,
          borderRadius: 'inherit',
        }}
      />
      {/* Content */}
      <div style={{ transformStyle: 'preserve-3d', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
