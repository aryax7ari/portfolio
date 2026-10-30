import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const GIF_URLS: string[] = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const ROW_1_RAW = GIF_URLS.slice(0, 11);
const ROW_2_RAW = GIF_URLS.slice(11, 21);

// Tripled for seamless scrolling
const ROW_1_IMAGES = [...ROW_1_RAW, ...ROW_1_RAW, ...ROW_1_RAW];
const ROW_2_IMAGES = [...ROW_2_RAW, ...ROW_2_RAW, ...ROW_2_RAW];

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

  const renderTile = (src: string, key: string, n: number) => (
    <div
      key={key}
      className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/5 shadow-lg group relative"
    >
      <img
        src={src}
        alt={`Anteprima ${n}`}
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
          {ROW_1_IMAGES.map((src, idx) => renderTile(src, `r1-${idx}`, idx + 1))}
        </div>

        {/* Riga 2: scorre verso sinistra */}
        <div ref={row2Ref} className="flex gap-3 whitespace-nowrap" style={{ willChange: 'transform' }}>
          {ROW_2_IMAGES.map((src, idx) => renderTile(src, `r2-${idx}`, idx + 12))}
        </div>
      </div>
    </motion.section>
  );
};
