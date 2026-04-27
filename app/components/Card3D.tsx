'use client';

import React, { useState, useRef, useCallback } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}

export default function Card3D({ children, className, style, glowColor = 'rgba(106,176,76,0.4)' }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, scale: 1 });
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rotX: -y * 14, rotY: x * 14, scale: 1.04 });
      setShimmerPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    setTilt({ rotX: 0, rotY: 0, scale: 1 });
    setHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => setHovered(true), []);

  const transform = `perspective(900px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale(${tilt.scale})`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={className}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: hovered
          ? 'transform 0.05s linear, box-shadow 0.3s ease'
          : 'transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'inherit',
        boxShadow: hovered
          ? `0 30px 60px rgba(61,26,10,0.20), 0 0 0 2px ${glowColor}, 0 0 40px ${glowColor}`
          : '0 4px 20px rgba(61,26,10,0.08)',
        ...style,
      }}
    >
      {/* Shimmer highlight that follows cursor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 10,
          borderRadius: 'inherit',
        }}
      />
      {/* Depth layer */}
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
