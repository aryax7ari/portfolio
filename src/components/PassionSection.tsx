import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AppearingText } from './AppearingText.tsx';

interface PassionItem {
  id: number;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

const PASSION_ITEMS: PassionItem[] = [
  {
    id: 1,
    title: 'Formula 1',
    paragraphs: [
      'La Formula 1 è una passione nata quando ero bambino e cresciuta insieme a me. Amo il racing, la tecnologia, l\'adrenalina della guida e ogni dettaglio di questo mondo.',
      'Non voglio solo guardarla da fuori. Il mio sogno è viverla da dentro, respirare quell\'ambiente e farne parte un giorno.',
    ],
    image: '/src/assets/images/formula1_ferrari_1791847301445.jpg',
    imageAlt: 'Formula 1 passione e vettura Ferrari da corsa',
  },
  {
    id: 2,
    title: 'Ferrovia',
    paragraphs: [
      'Fin da bambino, il mondo ferroviario ha sempre suscitato in me una grande curiosità. Mi affascinano i treni, i binari, i segnali, i convogli merci e tutto ciò che rende possibile questo universo fatto di tecnologia, ingegneria e movimento.',
      'Non sono semplici treni che passano, ma un mondo che non ho mai smesso di voler scoprire.',
    ],
    image: '/src/assets/images/ferrovia_treno_1791847302187.jpg',
    imageAlt: 'Mondo ferroviario e locomotiva treno passeggeri',
  },
  {
    id: 3,
    title: 'TECNOLOGIA',
    paragraphs: [
      'La tecnologia mi affascina per le infinite possibilità che offre. Dall\'informatica alla programmazione, fino all\'intelligenza artificiale, mi piace scoprire come funzionano le cose e come l\'innovazione possa trasformare le idee in realtà.',
      'Per me, la tecnologia non è solo ciò che esiste oggi, ma tutto ciò che possiamo ancora creare domani.',
    ],
    image: '/src/assets/images/tecnologia_code_1791847302475.jpg',
    imageAlt: 'Tecnologia, programmazione e intelligenza artificiale',
  },
  {
    id: 4,
    title: 'Video Edit & Front-End',
    paragraphs: [
      'Mi piace unire creatività e tecnologia attraverso il video editing e lo sviluppo front-end. Amo curare i dettagli, sperimentare con il design e trasformare le idee in contenuti visivi e interfacce digitali. Dalle animazioni al codice, ogni progetto è un\'opportunità per imparare e migliorarmi.',
      'Creatività nell\'idea, precisione nel codice, identità in ogni progetto.',
    ],
    image: '/src/assets/images/video_editing_suite_1791847303714.jpg',
    imageAlt: 'Video editing suite e sviluppo front-end',
  },
  {
    id: 5,
    title: 'I Miei Obbiettivi',
    paragraphs: [
      'Il mio sogno è entrare un giorno nel mondo della Formula 1, magari in un team come Ferrari o Racing Bulls. Per avvicinarmi a questo ambiente, sto studiando cybersecurity, con l\'obiettivo di unire la mia passione per il motorsport alle opportunità offerte dalla tecnologia e dall\'informatica.',
      'Allo stesso tempo, coltivo un altro grande obiettivo: diventare macchinista ferroviario, trasformando la mia passione per i treni in una professione. Due mondi diversi, due grandi ambizioni. Il mio obiettivo è trovare la mia strada senza smettere di inseguire ciò che amo.',
    ],
    image: '/src/assets/images/obbiettivi_vision_1791847303253.jpg',
    imageAlt: 'I miei obbiettivi, visione e ambizione',
  },
];

export const PassionSection: React.FC = () => {
  return (
    <motion.section
      id="passion"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.05 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[#E50914] text-black rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0 font-['Kanit',sans-serif]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading with Canva Rise animation identical to Services */}
        <FadeIn delay={0} y={60} className="w-full mb-16 sm:mb-20 md:mb-28">
          <h2
            className="text-black font-black uppercase text-center leading-none tracking-tight select-none font-['Kanit',sans-serif]"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            <AppearingText text="Passion & Goals" delay={0.1} />
          </h2>
        </FadeIn>

        {/* 5 Points with exact same scroll-triggered rise animation as Services section */}
        <div className="flex flex-col border-t border-black/20">
          {PASSION_ITEMS.map((item, index) => {
            const isTextLeft = index % 2 === 0;

            // Text block with exact same FadeIn animation as ServicesSection
            const textBlock = (
              <FadeIn
                delay={0.1}
                y={60}
                className="w-full md:w-1/2 flex flex-col justify-center px-2 sm:px-4"
              >
                {/* Title (Only title, no numbers, matching font and solid black) */}
                <h3
                  className="font-black uppercase text-black tracking-tight leading-snug mb-4 sm:mb-6 font-['Kanit',sans-serif] select-none"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
                >
                  {item.title}
                </h3>

                {/* Paragraphs with identical font as About Me, pure black */}
                <div className="space-y-4 text-left">
                  {item.paragraphs.map((p, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-black font-normal leading-relaxed text-base sm:text-lg md:text-xl font-['Kanit',sans-serif]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            );

            // Image card block with identical FadeIn animation as ServicesSection
            const imageBlock = (
              <FadeIn
                delay={0.18}
                y={60}
                className="w-full md:w-1/2 flex flex-col items-center justify-center"
              >
                <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-[30px] sm:rounded-[40px] overflow-hidden border-2 border-black/20 bg-black/10 shadow-xl group">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/80 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-['Kanit',sans-serif]">
                    {item.title}
                  </div>
                </div>
              </FadeIn>
            );

            return (
              <div
                key={item.id}
                className="border-b border-black/20 py-12 sm:py-16 md:py-20"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
                  {isTextLeft ? (
                    <>
                      {textBlock}
                      {imageBlock}
                    </>
                  ) : (
                    <>
                      {imageBlock}
                      {textBlock}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
