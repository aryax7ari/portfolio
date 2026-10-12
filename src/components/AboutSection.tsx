import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AppearingText } from './AppearingText.tsx';
import { Edit3, Check, RotateCcw } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

const DEFAULT_ABOUT_TITLE = 'About me';
const DEFAULT_ABOUT_TEXT =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

const STORAGE_TITLE_KEY = 'robert_about_title';
const STORAGE_TEXT_KEY = 'robert_about_text';

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const [aboutTitle, setAboutTitle] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_TITLE_KEY);
      if (saved) return saved;
    }
    return DEFAULT_ABOUT_TITLE;
  });

  const [aboutText, setAboutText] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_TEXT_KEY);
      if (saved) return saved;
    }
    return DEFAULT_ABOUT_TEXT;
  });

  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);

  const handleTitleChange = (newTitle: string) => {
    setAboutTitle(newTitle);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_TITLE_KEY, newTitle);
    }
    triggerSavedToast();
  };

  const handleTextChange = (newText: string) => {
    setAboutText(newText);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_TEXT_KEY, newText);
    }
    triggerSavedToast();
  };

  const handleReset = () => {
    setAboutTitle(DEFAULT_ABOUT_TITLE);
    setAboutText(DEFAULT_ABOUT_TEXT);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_TITLE_KEY);
      localStorage.removeItem(STORAGE_TEXT_KEY);
    }
    setIsEditingTitle(false);
  };

  const triggerSavedToast = () => {
    setShowSavedToast(true);
  };

  useEffect(() => {
    if (!showSavedToast) return;
    const timer = setTimeout(() => {
      setShowSavedToast(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showSavedToast]);

  const isCustomized =
    aboutTitle !== DEFAULT_ABOUT_TITLE || aboutText !== DEFAULT_ABOUT_TEXT;

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.08 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Center content container */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full">
        {/* Heading with Canva Rise animation and editable title */}
        <FadeIn delay={0} y={50} className="w-full flex justify-center">
          <div className="relative group/title inline-flex flex-col items-center max-w-full">
            {isEditingTitle ? (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  autoFocus
                  value={aboutTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setIsEditingTitle(false);
                  }}
                  className="font-black uppercase leading-none tracking-tight text-center bg-black/80 text-white border-2 border-red-600 rounded-2xl px-6 py-3 focus:outline-none w-full max-w-xl"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 90px)' }}
                  placeholder="Inserisci titolo..."
                />
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(false)}
                  className="px-5 py-3 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider cursor-pointer shadow-lg shadow-red-600/30"
                >
                  <Check className="w-4 h-4" /> Fatto
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                className="cursor-pointer group flex flex-col items-center select-none"
                title="Clicca per modificare il titolo"
              >
                <h2
                  className="hero-heading font-black uppercase leading-none tracking-tight text-center transition-opacity hover:opacity-90"
                  style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
                >
                  <AppearingText text={aboutTitle} delay={0.1} />
                </h2>
                <span className="opacity-0 group-hover:opacity-60 transition-opacity text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 text-red-500 mt-2">
                  <Edit3 className="w-3.5 h-3.5" /> Clicca per modificare titolo
                </span>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Gap between heading and text */}
        <div className="h-8 sm:h-12 md:h-14" />

        {/* Paragraph with direct editable textarea that persists modifications in localStorage */}
        <div className="w-full max-w-[640px] px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1], // Canva Rise signature easing curve
            }}
            className="w-full relative group/desc"
          >
            <textarea
              rows={5}
              value={aboutText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.1] border border-white/15 focus:border-red-600 rounded-2xl p-4 sm:p-5 text-[#D7E2EA] font-medium text-center leading-relaxed text-base sm:text-lg md:text-xl focus:outline-none transition-all resize-none cursor-text shadow-inner selection:bg-red-600 selection:text-white"
              title="Clicca per modificare il testo di About Me (le modifiche vengono salvate automaticamente)"
              placeholder="Scrivi la tua descrizione About Me..."
            />

            {/* Helper bar & status */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-2 px-1 text-xs">
              <div className="flex items-center gap-2 text-white/50">
                <span className="flex items-center gap-1 font-semibold text-[11px] uppercase tracking-wider">
                  <Edit3 className="w-3.5 h-3.5 text-red-500" />
                  Testo modificabile
                </span>
                {showSavedToast && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px] uppercase tracking-wider animate-pulse">
                    <Check className="w-3 h-3" /> Salvato
                  </span>
                )}
              </div>

              {isCustomized && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-red-500 hover:text-red-400 flex items-center gap-1 text-[11px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
                  title="Ripristina testo e titolo originali"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ripristina originale</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Gap between text block and button */}
        <div className="h-12 sm:h-16 md:h-20" />

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
      </div>
    </motion.section>
  );
};
