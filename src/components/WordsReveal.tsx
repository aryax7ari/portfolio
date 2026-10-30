import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { effectVariants, fadeOnlyVariants, type TextEffect } from './textEffects.ts';

interface WordsRevealProps {
  text: string;
  className?: string;
  /** Ritardo iniziale in secondi */
  delay?: number;
  /** Secondi tra una parola e la successiva */
  stagger?: number;
  as?: 'p' | 'span';
  /** 'descend' (Discesa, predefinito) oppure 'bounce' (Rimbalzo) */
  effect?: TextEffect;
}

/**
 * Paragrafo animato parola per parola, con l'effetto Discesa o Rimbalzo in stile Canva.
 * Parte quando il testo entra nello schermo.
 * Con "riduci movimento" attivo nel sistema le parole si dissolvono senza spostarsi.
 */
export const WordsReveal: React.FC<WordsRevealProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  as = 'p',
  effect = 'descend',
}) => {
  const reduce = useReducedMotion();
  const Tag = as === 'p' ? motion.p : motion.span;

  const container: Variants = { hidden: {}, visible: {} };
  const word = reduce
    ? fadeOnlyVariants({ delay, stagger })
    : effectVariants(effect, { delay, stagger, distance: 24 });

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
