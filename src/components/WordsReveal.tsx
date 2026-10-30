import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface WordsRevealProps {
  text: string;
  className?: string;
  /** Ritardo iniziale in secondi */
  delay?: number;
  /** Secondi tra una parola e la successiva */
  stagger?: number;
  as?: 'p' | 'span';
}

/**
 * Paragrafo che compare parola per parola: ogni parola sale di poco e si mette a fuoco.
 * Parte quando il testo entra nello schermo. Con "riduci movimento" attivo il testo è subito visibile.
 */
export const WordsReveal: React.FC<WordsRevealProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.025,
  as = 'p',
}) => {
  const reduce = useReducedMotion();
  const Tag = as === 'p' ? motion.p : motion.span;

  if (reduce) {
    return as === 'p' ? <p className={className}>{text}</p> : <span className={className}>{text}</span>;
  }

  const container: Variants = { hidden: {}, visible: {} };
  const word: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        delay: delay + i * stagger,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const words = text.split(' ');

  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <motion.span custom={i} variants={word} className="inline-block will-change-transform" aria-hidden="true">
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
};
