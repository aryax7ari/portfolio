import React from 'react';
import { motion, type Variants } from 'framer-motion';

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
  const characters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`inline-flex flex-wrap justify-center ${className} ${
        hoverRed ? 'hover:text-red-600 transition-colors duration-300' : ''
      }`}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
