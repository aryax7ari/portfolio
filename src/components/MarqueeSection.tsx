import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import tileCode from '../assets/illustrations/tile-code.svg';
import tileRails from '../assets/illustrations/tile-rails.svg';
import tileTimeline from '../assets/illustrations/tile-timeline.svg';
import tileF1 from '../assets/illustrations/tile-f1.svg';
import tileShield from '../assets/illustrations/tile-shield.svg';
import tileBrowser from '../assets/illustrations/tile-browser.svg';
import tileCircuit from '../assets/illustrations/tile-circuit.svg';
import tileNet from '../assets/illustrations/tile-net.svg';

interface Tile {
  src: string;
  alt: string;
}

// Tessere originali, una per ogni ambito del portfolio (codice, ferrovia, montaggio, F1, sicurezza, web, hardware, IA)
const ROW_1: Tile[] = [
  { src: tileCode, alt: 'Parentesi di codice' },
  { src: tileRails, alt: 'Binari e segnale ferroviario' },
  { src: tileTimeline, alt: 'Timeline di montaggio video' },
  { src: tileF1, alt: 'Monoposto di Formula 1 stilizzata' },
];
const ROW_2: Tile[] = [
  { src: tileShield, alt: 'Scudo di sicurezza' },
  { src: tileBrowser, alt: 'Finestra del browser' },
  { src: tileCircuit, alt: 'Microchip e circuiti' },
  { src: tileNet, alt: 'Rete neurale' },
];

const TILE_W = 420;
const GAP = 12;
const CYCLE = ROW_1.length * (TILE_W + GAP);
const TRAVEL = 350;

// Ripetute 3 volte: lo scorrimento resta sempre dentro il tratto centrale, senza salti
const triple = (row: Tile[]) => [...row, ...row, ...row];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // La molla addolcisce lo scroll: le righe "inseguono" il dito/rotellina invece di scattare
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });

  const x1 = useTransform(progress, [0, 1], [-CYCLE - TRAVEL, -CYCLE + TRAVEL]);
  const x2 = useTransform(progress, [0, 1], [-CYCLE + TRAVEL, -CYCLE - TRAVEL]);

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
        draggable={false}
        className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
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
        <motion.div
          className="flex gap-3 whitespace-nowrap will-change-transform"
          style={{ x: reduce ? -CYCLE : x1 }}
        >
          {triple(ROW_1).map((t, i) => renderTile(t, `r1-${i}`))}
        </motion.div>

        {/* Riga 2: scorre verso sinistra */}
        <motion.div
          className="flex gap-3 whitespace-nowrap will-change-transform"
          style={{ x: reduce ? -CYCLE : x2 }}
        >
          {triple(ROW_2).map((t, i) => renderTile(t, `r2-${i}`))}
        </motion.div>
      </div>
    </motion.section>
  );
};
