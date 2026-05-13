'use client';

import { motion } from 'framer-motion';

interface Props {
  delay?: number;
  height?: number;
  gradient?: string;
}

/**
 * AnimatedUnderline – renders a gradient bar that grows from the centre
 * outward when it enters the viewport.  Wrap the heading + this component
 * inside a div with `style={{ margin: '0 auto', width: 'fit-content' }}`
 * so the bar spans exactly the heading's text width.
 */
export default function AnimatedUnderline({
  delay = 0.35,
  height = 3,
  gradient = 'linear-gradient(90deg, #6AB04C, #4ABED6)',
}: Props) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        height: `${height}px`,
        background: gradient,
        borderRadius: '99px',
        transformOrigin: 'center',
        marginTop: '10px',
        width: '100%',
      }}
    />
  );
}
