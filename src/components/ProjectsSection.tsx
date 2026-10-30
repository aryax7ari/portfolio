import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AppearingText } from './AppearingText.tsx';

interface ProjectsSectionProps {
  onContactClick?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onContactClick }) => {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.05 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-32"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading: "Project" */}
        <FadeIn delay={0} y={30} className="w-full mb-16 sm:mb-20 md:mb-28">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            <AppearingText text="Project" delay={0.1} />
          </h2>
        </FadeIn>

        {/* Clean Static Project Showcase Frame with Canva Salita / Rise */}
        <FadeIn delay={0.15} y={60}>
          <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 shadow-2xl relative">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                {/* Number */}
                <span
                  className="font-black text-white leading-none select-none tracking-tighter"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 90px)' }}
                >
                  01
                </span>

                {/* Category & Project Title */}
                <div className="flex flex-col gap-1">
                  <span className="text-[#D7E2EA]/60 font-medium uppercase tracking-widest text-xs sm:text-sm">
                    In Lavorazione · Prossima Uscita
                  </span>
                  <h3
                    className="text-white font-black uppercase tracking-tight leading-snug"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)' }}
                  >
                    Progetto in Arrivo
                  </h3>
                </div>
              </div>

              {/* Live Project button */}
              <div className="self-start sm:self-center">
                <button
                  type="button"
                  onClick={onContactClick}
                  className="inline-flex items-center justify-center rounded-full border-2 border-white text-white hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm cursor-pointer select-none transition-all duration-200"
                >
                  Contattami
                </button>
              </div>
            </div>

            {/* Project Showcase Frames: Clean minimalist spaces left blank as requested */}
            <div className="flex flex-col md:flex-row gap-4 sm:gap-5 w-full">
              {/* Left column (40% width) with 2 stacked frames */}
              <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-5">
                <div
                  className="w-full rounded-[30px] sm:rounded-[40px] frame-shimmer relative overflow-hidden bg-white/[0.02] border border-white/10 flex items-center justify-center"
                  style={{ height: 'clamp(150px, 18vw, 240px)' }}
                >
                  <span className="text-white/20 text-xs font-mono uppercase tracking-widest">
                    Spazio 01
                  </span>
                </div>

                <div
                  className="w-full rounded-[30px] sm:rounded-[40px] frame-shimmer relative overflow-hidden bg-white/[0.02] border border-white/10 flex items-center justify-center"
                  style={{ height: 'clamp(180px, 24vw, 340px)' }}
                >
                  <span className="text-white/20 text-xs font-mono uppercase tracking-widest">
                    Spazio 02
                  </span>
                </div>
              </div>

              {/* Right column (60% width) with 1 tall frame */}
              <div
                className="w-full md:w-[60%] rounded-[30px] sm:rounded-[40px] frame-shimmer relative overflow-hidden bg-white/[0.02] border border-white/10 flex items-center justify-center"
                style={{
                  minHeight: 'clamp(340px, 42vw, 600px)',
                }}
              >
                <span className="text-white/20 text-xs font-mono uppercase tracking-widest">
                  Spazio Principale
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </motion.section>
  );
};
