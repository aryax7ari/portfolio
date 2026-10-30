import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Secondi tra una parola e la successiva */
  stagger?: number;
}

/**
 * Titolo che si rivela parola per parola: ogni parola sale da dietro una "maschera" invisibile.
 * Effetto pulito in stile Apple, più leggero dell'animazione lettera per lettera.
 */
export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.07,
}) => {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <span className={className}>{text}</span>;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: '115%', rotate: 4 },
    visible: {
      y: '0%',
      rotate: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span variants={word} className="inline-block origin-bottom-left will-change-transform">
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </motion.span>
  );
};
