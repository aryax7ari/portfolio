import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import imgFormula1 from '../assets/images/formula1_ferrari_1791847301445.jpg';
import imgFerrovia from '../assets/images/ferrovia_treno_1791847302187.jpg';
import imgTecnologia from '../assets/images/tecnologia_code_1791847302475.jpg';
import imgVideo from '../assets/images/video_editing_suite_1791847303714.jpg';
import imgObiettivi from '../assets/images/obbiettivi_vision_1791847303253.jpg';

interface Tile {
  src: string;
  alt: string;
}

const ROW_1_BASE: Tile[] = [
  { src: imgFormula1, alt: 'Formula 1' },
  { src: imgTecnologia, alt: 'Tecnologia e programmazione' },
  { src: imgFerrovia, alt: 'Mondo ferroviario' },
];
const ROW_2_BASE: Tile[] = [
  { src: imgObiettivi, alt: 'I miei obiettivi' },
  { src: imgVideo, alt: 'Video editing e front-end' },
];

// Ripetute quanto basta per coprire lo schermo durante lo scroll
const repeat = (tiles: Tile[], times: number): Tile[] =>
  Array.from({ length: times }, () => tiles).flat();

const ROW_1_IMAGES = repeat(ROW_1_BASE, 6);
const ROW_2_IMAGES = repeat(ROW_2_BASE, 7);

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let ticking = false;

    // Aggiorna direttamente il DOM: niente re-render di React a ogni scroll
    const update = () => {
      ticking = false;
      if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.3;
      row1Ref.current.style.transform = `translate3d(${-2800 + offset - 200}px, 0, 0)`;
      row2Ref.current.style.transform = `translate3d(${-1000 - (offset - 200)}px, 0, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const renderTile = (tile: Tile, key: string) => (
    <div
      key={key}
      className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/5 shadow-lg group relative"
    >
      <img
        src={tile.src}
        alt={tile.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );

  return (
    <motion.section
      ref={sectionRef}
      id="marquee"
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px 0px', amount: 0.05 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ overflowX: 'clip' }}
    >
      <div className="flex flex-col gap-3">
        {/* Riga 1: scorre verso destra */}
        <div ref={row1Ref} className="flex gap-3 whitespace-nowrap" style={{ willChange: 'transform' }}>
          {ROW_1_IMAGES.map((tile, idx) => renderTile(tile, `r1-${idx}`))}
        </div>

        {/* Riga 2: scorre verso sinistra */}
        <div ref={row2Ref} className="flex gap-3 whitespace-nowrap" style={{ willChange: 'transform' }}>
          {ROW_2_IMAGES.map((tile, idx) => renderTile(tile, `r2-${idx}`))}
        </div>
      </div>
    </motion.section>
  );
};
