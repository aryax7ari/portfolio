import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'p' | 'h1' | 'h2' | 'span' | 'section' | 'nav' | 'header';
}

/**
 * Canva "Salita" (Rise) animation preset:
 * Rises smoothly from below (y: 60) up to position with clean opacity fade
 * and Canva's signature fluid deceleration curve [0.16, 1, 0.3, 1].
 */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.85,
  x = 0,
  y = 60, // Canva Salita / Rise default vertical offset
  className = '',
  as = 'div',
}) => {
  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-30px', amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Canva Rise signature easing
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};
