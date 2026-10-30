import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AppearingText } from './AppearingText.tsx';
import { RevealText } from './RevealText.tsx';
import { ParallaxImage } from './ParallaxImage.tsx';
import imgFormula1 from '../assets/images/formula1_ferrari_storica.jpg';
import imgFerrovia from '../assets/images/ferrovia_e403.jpg';
import imgObiettivi from '../assets/images/obiettivi_crociera.jpg';
import imgTecnologia from '../assets/illustrations/tecnologia.svg';
import imgVideo from '../assets/illustrations/video-frontend.svg';

interface PassionItem {
  id: number;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  /** object-position: tiene a fuoco il soggetto quando la foto viene ritagliata */
  position?: string;
}

const PASSION_ITEMS: PassionItem[] = [
  {
    id: 1,
    title: 'Formula 1',
    paragraphs: [
      "La Formula 1 è una passione nata quando ero bambino e cresciuta insieme a me. Amo il racing, la tecnologia, l'adrenalina della guida e ogni dettaglio di questo mondo.",
      'Non voglio solo guardarla da fuori. Il mio sogno è viverla da dentro, respirare quell\'ambiente e farne parte un giorno.',
    ],
    image: imgFormula1,
    imageAlt: 'Io che osservo da vicino una monoposto Ferrari storica esposta in un cortile a Milano',
    position: '50% 62%',
  },
  {
    id: 2,
    title: 'Ferrovia',
    paragraphs: [
      'Fin da bambino, il mondo ferroviario ha sempre suscitato in me una grande curiosità. Mi affascinano i treni, i binari, i segnali, i convogli merci e tutto ciò che rende possibile questo universo fatto di tecnologia, ingegneria e movimento.',
      'Non sono semplici treni che passano, ma un mondo che non ho mai smesso di voler scoprire.',
    ],
    image: imgFerrovia,
    imageAlt: 'Locomotiva elettrica E403 di Trenitalia con il suo convoglio in stazione',
    position: '26% 50%',
  },
  {
    id: 3,
    title: 'TECNOLOGIA',
    paragraphs: [
      "La tecnologia mi affascina per le infinite possibilità che offre. Dall'informatica alla programmazione, fino all'intelligenza artificiale, mi piace scoprire come funzionano le cose e come l'innovazione possa trasformare le idee in realtà.",
      "Per me, la tecnologia non è solo ciò che esiste oggi, ma tutto ciò che possiamo ancora creare domani.",
    ],
    image: imgTecnologia,
    imageAlt: 'Illustrazione: scudo di cybersecurity con lucchetto, rete neurale e finestra di codice',
  },
  {
    id: 4,
    title: 'Video Edit & Front-End',
    paragraphs: [
      "Mi piace unire creatività e tecnologia attraverso il video editing e lo sviluppo front-end. Amo curare i dettagli, sperimentare con il design e trasformare le idee in contenuti visivi e interfacce digitali. Dalle animazioni al codice, ogni progetto è un'opportunità per imparare e migliorarmi.",
      "Creatività nell'idea, precisione nel codice, identità in ogni progetto.",
    ],
    image: imgVideo,
    imageAlt: 'Illustrazione: pagina web con codice e timeline di montaggio video',
  },
  {
    id: 5,
    title: 'I Miei Obbiettivi',
    paragraphs: [
      "Il mio sogno è entrare un giorno nel mondo della Formula 1, magari in un team come Ferrari o Racing Bulls. Per avvicinarmi a questo ambiente, sto studiando cybersecurity, con l'obiettivo di unire la mia passione per il motorsport alle opportunità offerte dalla tecnologia e dall'informatica.",
      'Allo stesso tempo, coltivo un altro grande obiettivo: diventare macchinista ferroviario, trasformando la mia passione per i treni in una professione. Due mondi diversi, due grandi ambizioni. Il mio obiettivo è trovare la mia strada senza smettere di inseguire ciò che amo.',
    ],
    image: imgObiettivi,
    imageAlt: 'Io che guardo verso l’alto sotto la copertura luminosa di una nave, con il porto alle spalle',
    position: '60% 68%',
  },
];

/** Linea divisoria che si "disegna" da sinistra a destra quando entra nello schermo */
const DrawLine: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
      whileInView={reduce ? { opacity: 1 } : { scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="h-px w-full bg-black/25 origin-left"
    />
  );
};

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
        <FadeIn delay={0} y={60} className="w-full mb-16 sm:mb-20 md:mb-28">
          <h2
            className="text-black font-black uppercase text-center leading-none tracking-tight select-none font-['Kanit',sans-serif]"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            <AppearingText text="Passion & Goals" delay={0.1} />
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          <DrawLine />
          {PASSION_ITEMS.map((item, index) => {
            const isTextLeft = index % 2 === 0;
            // il testo entra dal lato opposto alla foto, così i due blocchi "si incontrano"
            const textFrom = isTextLeft ? -50 : 50;

            const textBlock = (
              <FadeIn
                delay={0.1}
                y={40}
                x={textFrom}
                className="w-full md:w-1/2 flex flex-col justify-center px-2 sm:px-4"
              >
                <h3
                  className="font-black uppercase text-black tracking-tight leading-snug mb-4 sm:mb-6 font-['Kanit',sans-serif] select-none"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
                >
                  <RevealText text={item.title} />
                </h3>

                <div className="space-y-4 text-left">
                  {item.paragraphs.map((p, pIndex) => (
                    <FadeIn key={pIndex} delay={0.25 + pIndex * 0.15} y={24}>
                      <p className="text-black font-normal leading-relaxed text-base sm:text-lg md:text-xl font-['Kanit',sans-serif]">
                        {p}
                      </p>
                    </FadeIn>
                  ))}
                </div>
              </FadeIn>
            );

            const imageBlock = (
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                <ParallaxImage
                  src={item.image}
                  alt={item.imageAlt}
                  label={item.title}
                  position={item.position}
                />
              </div>
            );

            return (
              <div key={item.id}>
                <div className="py-12 sm:py-16 md:py-20">
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
                <DrawLine />
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
