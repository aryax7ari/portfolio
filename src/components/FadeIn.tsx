import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

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
 * Preset "Salita" (Rise): il contenuto sale con un leggero zoom e una dissolvenza,
 * con una curva di decelerazione morbida in stile Apple. Con "riduci movimento"
 * attivo nel sistema resta solo la dissolvenza.
 */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 1,
  x = 0,
  y = 60,
  className = '',
  as = 'div',
}) => {
  const reduce = useReducedMotion();
  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <MotionComponent
      initial={reduce ? { opacity: 0 } : { opacity: 0, x, y, scale: 0.97 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px', amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};
