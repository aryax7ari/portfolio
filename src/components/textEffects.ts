import type { Easing, Variants } from 'framer-motion';

/**
 * Due animazioni di ingresso per i testi, ispirate a quelle di Canva:
 * - 'descend' (Discesa): il testo cala dall'alto con una dissolvenza morbida
 * - 'bounce' (Rimbalzo): il testo cade dall'alto, tocca terra e rimbalza due volte, sempre più piano
 */
export type TextEffect = 'descend' | 'bounce';

const SMOOTH_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Rimbalzo: caduta (ease-in), risalita (ease-out), caduta, mini risalita, assestamento
const BOUNCE_TIMES = [0, 0.38, 0.58, 0.74, 0.88, 1];
const BOUNCE_EASE: Easing[] = ['easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'];

/**
 * Versione per chi ha "riduci movimento" attivo nel sistema: nessuno spostamento,
 * solo una dissolvenza morbida, un elemento dopo l'altro.
 */
export const fadeOnlyVariants = ({ delay, stagger }: { delay: number; stagger: number }): Variants => ({
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: delay + i * stagger * 0.5, ease: 'easeOut' },
  }),
});

interface EffectOptions {
  /** Ritardo iniziale in secondi */
  delay: number;
  /** Secondi tra un elemento (lettera o parola) e il successivo */
  stagger: number;
  /** Di quanti pixel parte sopra la posizione finale */
  distance: number;
}

/**
 * Restituisce le varianti per un singolo elemento (lettera o parola).
 * L'indice dell'elemento arriva dal prop `custom` e serve a sfalsare le partenze.
 */
export const effectVariants = (effect: TextEffect, { delay, stagger, distance }: EffectOptions): Variants => {
  if (effect === 'bounce') {
    const start = -distance * 1.6;
    return {
      hidden: { opacity: 0, y: start },
      visible: (i: number) => {
        const d = delay + i * stagger;
        return {
          opacity: 1,
          y: [start, 0, start * 0.28, 0, start * 0.1, 0],
          transition: {
            opacity: { duration: 0.2, delay: d },
            y: { duration: 1.1, delay: d, times: BOUNCE_TIMES, ease: BOUNCE_EASE },
          },
        };
      },
    };
  }

  return {
    hidden: { opacity: 0, y: -distance },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: delay + i * stagger, ease: SMOOTH_OUT },
    }),
  };
};
