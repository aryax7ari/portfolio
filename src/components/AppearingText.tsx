import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface AppearingTextProps {
  text: string;
  className?: string;
  delay?: number;
  hoverRed?: boolean;
}

export const AppearingText: React.FC<AppearingTextProps> = ({
  text,
  className = '',
  delay = 0,
  hoverRed = false,
}) => {
  const reduce = useReducedMotion();
  const characters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -50,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  if (reduce) {
    return <span className={`inline-flex flex-wrap justify-center ${className}`}>{text}</span>;
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`inline-flex flex-wrap justify-center ${className} ${
        hoverRed ? 'hover:text-red-600 transition-colors duration-300' : ''
      }`}
      style={{ perspective: 600 }}
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          className="inline-block will-change-transform"
          aria-hidden="true"
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
