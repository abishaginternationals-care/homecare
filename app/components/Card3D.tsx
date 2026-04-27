'use client';

import React, { useState, useRef, useCallback } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}

export default function Card3D({ children, className, style, glowColor = 'rgba(106,176,76,0.3)' }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = (-y * 12).toFixed(2);
    const rotY = (x * 12).toFixed(2);
    setTransform(`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03) translateZ(12px)`);
    setShimmerPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)');
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isHovered
          ? `inset 0 0 0 1.5px ${glowColor}, 0 24px 52px rgba(61,26,10,0.18), 0 0 30px ${glowColor}`
          : '0 4px 20px rgba(61,26,10,0.08)',
        transition: 'transform 0.15s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
        ...style
      }}
      className={className}
    >
      {/* Shimmer light reflection */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: 'inherit',
          }}
        />
      )}
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
