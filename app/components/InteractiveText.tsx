'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function InteractiveText({ children, className, style }: InteractiveTextProps) {
  return (
    <motion.span
      whileHover={{ 
        y: -5,
        textShadow: "0 10px 20px rgba(61,26,10,0.2)",
        scale: 1.02
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={className}
      style={{ 
        display: 'inline-block',
        ...style 
      }}
    >
      {children}
    </motion.span>
  );
}
