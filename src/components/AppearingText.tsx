import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface AppearingTextProps {
  text: string;
  className?: string;
  delay?: number;
  hoverRed?: boolean;
  /** 'center' per i titoli centrati, 'start' per i titoli allineati a sinistra */
  align?: 'center' | 'start';
}

/**
 * Titolo animato lettera per lettera: ogni lettera sale, si raddrizza e perde la sfocatura.
 * Le parole restano intere (vanno a capo tra una parola e l'altra, mai a metà).
 */
export const AppearingText: React.FC<AppearingTextProps> = ({
  text,
  className = '',
  delay = 0,
  hoverRed = false,
  align = 'center',
}) => {
  const reduce = useReducedMotion();
  const alignClass = align === 'start' ? 'text-left' : 'text-center';

  if (reduce) {
    return <span className={`inline-block ${alignClass} ${className}`}>{text}</span>;
  }

  const containerVariants: Variants = { hidden: {}, visible: {} };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -50,
      filter: 'blur(8px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        delay: delay + i * 0.04,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const words = text.split(' ');
  let letterIndex = 0;

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`inline-block ${alignClass} ${className} ${
        hoverRed ? 'hover:text-red-600 transition-colors duration-300' : ''
      }`}
      style={{ perspective: 600 }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <React.Fragment key={`${word}-${wi}`}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {Array.from(word).map((char, ci) => {
              const i = letterIndex++;
              return (
                <motion.span
                  key={`${char}-${ci}`}
                  custom={i}
                  variants={letterVariants}
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </motion.span>
  );
};
