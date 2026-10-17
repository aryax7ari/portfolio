import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AppearingText } from './AppearingText.tsx';

// ============================================================================
// CERTIFICAZIONI & ATTESTATI (MODIFICA DIRETTAMENTE QUI NEL CODICE)
// Inserisci qui le tue 2 foto e i testi delle certificazioni:
// ============================================================================
export interface CertificationItem {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  image: string; // Inserisci il percorso della foto (es: '/src/assets/images/nome_foto.jpg' o URL)
  imageAlt: string;
}

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'cert-1',
    category: 'Cybersecurity & Reti',
    title: 'Cybersecurity Fundamentals',
    description: 'Certificazione e competenze di sicurezza delle reti, analisi delle minacce e protezione dei sistemi.',
    date: '2024',
    // Inserisci qui il percorso della tua prima foto:
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Certificazione Cybersecurity Fundamentals',
  },
  {
    id: 'cert-2',
    category: 'Sviluppo & Design',
    title: 'Front-End Development & UI',
    description: 'Progettazione e sviluppo di interfacce web moderne, responsive design e codice strutturato.',
    date: '2024',
    // Inserisci qui il percorso della tua seconda foto:
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Certificazione Front-End Web Development',
  },
];

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  // Stato per ingrandire la foto selezionata a schermo intero (lightbox pulita)
  const [activePhoto, setActivePhoto] = useState<CertificationItem | null>(null);

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.08 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-24 overflow-hidden bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Center content container */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full">
        {/* Heading with Canva Rise animation */}
        <FadeIn delay={0} y={50} className="w-full flex justify-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            <AppearingText text="About me" delay={0.1} />
          </h2>
        </FadeIn>

        {/* Gap between heading and text */}
        <div className="h-8 sm:h-12 md:h-14" />

        {/* Clean Static Paragraph with Canva Rise signature easing curve */}
        <div className="w-full max-w-[760px] px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1], // Canva Rise signature easing curve
            }}
            className="w-full space-y-5"
          >
            <p className="text-[#D7E2EA] font-normal text-center leading-relaxed text-base sm:text-lg md:text-xl">
              Sono una persona curiosa e determinata, sempre alla ricerca di nuove idee e cose da imparare. Mi appassionano la tecnologia, la Formula 1 e il mondo ferroviario, ma amo anche esprimere la mia creatività attraverso il video editing, il design e l&apos;intelligenza artificiale.
            </p>
            <p className="text-[#D7E2EA]/90 font-normal text-center leading-relaxed text-base sm:text-lg md:text-xl">
              Mi piace esplorare nuovi ambiti, sperimentare e trasformare le idee.
            </p>
          </motion.div>
        </div>

        {/* Gap between text block and button */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Minimal red Contact button */}
        <FadeIn delay={0.2} y={30}>
          <motion.button
            type="button"
            onClick={onContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium uppercase tracking-widest text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-red-600/30 cursor-pointer"
          >
            Contact Me
          </motion.button>
        </FadeIn>

        {/* ------------------------------------------------------------------ */}
        {/* BOX CERTIFICAZIONI: SENZA 01, SENZA NUMERO, FOTO PIÙ GRANDI       */}
        {/* Un tutt'uno con la pagina, zero cornici invadenti, animazioni Canva */}
        {/* ------------------------------------------------------------------ */}
        <div className="w-full mt-24 sm:mt-28 md:mt-32 text-left">
          <FadeIn delay={0.2} y={50}>
            {/* Box contenitore senza cornice, integrato fluidamente con la pagina */}
            <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#0C0C0C] p-2 sm:p-6 md:p-8 relative">
              {/* Header pulito senza 01 e senza contatore numero certificazioni */}
              <div className="mb-8 sm:mb-12 border-b border-white/10 pb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[#D7E2EA]/60 font-medium uppercase tracking-widest text-xs sm:text-sm">
                    Formazione · Attestati Ufficiali
                  </span>
                  <h3
                    className="text-white font-black uppercase tracking-tight leading-snug"
                    style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)' }}
                  >
                    Certificazioni
                  </h3>
                </div>
              </div>

              {/* Showcase delle 2 foto: foto ingrandite ed estese con massima visibilità */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
                {CERTIFICATIONS_DATA.slice(0, 2).map((cert) => (
                  <motion.div
                    key={cert.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActivePhoto(cert)}
                    className="group relative rounded-[32px] sm:rounded-[44px] bg-white/[0.03] border border-white/10 overflow-hidden cursor-pointer flex flex-col justify-between hover:border-white/20 transition-all duration-300"
                  >
                    {/* Immagine ingrandita (altezza aumentata notevolmente per risaltare la certificazione) */}
                    <div className="relative w-full h-[320px] sm:h-[380px] md:h-[440px] lg:h-[480px] overflow-hidden bg-black/50">
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={cert.imageAlt}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/20 text-sm font-mono uppercase tracking-widest">
                            Foto Certificazione
                          </span>
                        </div>
                      )}

                      {/* Gradiente sfumato in basso */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-black/10 to-transparent" />

                      {/* Tag categoria foto in alto a sinistra */}
                      <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-wider">
                        {cert.category}
                      </span>

                      {/* Icona ingrandimento in alto a destra */}
                      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Dettagli testo della certificazione (senza la dicitura Certificato 01) */}
                    <div className="p-6 sm:p-7 md:p-8 flex flex-col justify-between flex-1 bg-[#0C0C0C]">
                      <div>
                        {/* Data pulita (senza "Certificato 01") */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-red-500 font-mono text-xs uppercase tracking-wider font-semibold">
                            {cert.date}
                          </span>
                        </div>
                        <h4 className="text-white font-bold uppercase tracking-tight text-xl sm:text-2xl group-hover:text-red-400 transition-colors duration-200">
                          {cert.title}
                        </h4>
                        <p className="mt-2.5 text-[#88929A] text-sm sm:text-base font-normal leading-relaxed">
                          {cert.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-[#88929A]">
                        <span className="font-mono text-xs">Foto Certificazione</span>
                        <span className="text-red-500 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                          Ingrandisci foto &rarr;
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MODALE DI VISUALIZZAZIONE FULLSCREEN DELLA FOTO (INGRANDITA)        */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0C0C0C] border border-white/15 rounded-[28px] sm:rounded-[36px] max-w-6xl w-full max-h-[96vh] overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#0C0C0C]">
                <div>
                  <span className="text-xs font-mono text-red-500 uppercase tracking-widest font-semibold">
                    {activePhoto.category} &bull; {activePhoto.date}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-white uppercase tracking-tight mt-0.5">
                    {activePhoto.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Chiudi"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Foto a schermo intero molto più grande e ad alta definizione */}
              <div className="flex-1 bg-black/80 p-2 sm:p-6 flex items-center justify-center overflow-auto max-h-[78vh]">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.imageAlt}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl"
                />
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-5 bg-[#0C0C0C] border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#88929A] font-mono">
                  Visualizzazione certificato
                </span>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Chiudi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
