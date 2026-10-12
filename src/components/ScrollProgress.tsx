import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth fluid spring interpolation for responsive scrolling
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
      }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 z-50 pointer-events-none shadow-[0_0_10px_rgba(220,38,38,0.7)]"
      aria-hidden="true"
    />
  );
};
