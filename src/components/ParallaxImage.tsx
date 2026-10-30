import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Etichetta in alto a sinistra sopra la foto */
  label?: string;
  /** object-position CSS, per tenere a fuoco il soggetto quando la foto viene ritagliata */
  position?: string;
  className?: string;
}

/**
 * Card immagine con:
 * - rivelazione "a finestra" quando entra nello schermo (clip-path + leggero zoom-out)
 * - parallasse: la foto scorre un po' più lentamente della card durante lo scroll
 * - inclinazione 3D morbida che segue il mouse (solo con puntatore, disattivata se si preferisce meno movimento)
 */
export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  label,
  position = 'center',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.4 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), spring);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, clipPath: 'inset(14% 10% 14% 10%)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative w-full aspect-[4/5] rounded-[30px] sm:rounded-[40px] overflow-hidden border-2 border-black/20 bg-black/10 shadow-xl will-change-transform ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ y: imgY, objectPosition: position, scale: reduce ? 1 : 1.18 }}
        className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700 group-hover:brightness-110"
      />

      {/* velo morbido in basso per staccare l'etichetta dalla foto */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />

      {label && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/80 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-['Kanit',sans-serif]"
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  );
};
