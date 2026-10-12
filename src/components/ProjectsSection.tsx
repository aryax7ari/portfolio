import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AppearingText } from './AppearingText.tsx';
import { Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ProjectsSectionProps {
  onContactClick?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onContactClick }) => {
  const [projectTitle, setProjectTitle] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('robert_project_title') || '[ Nome Progetto ]';
    }
    return '[ Nome Progetto ]';
  });
  const [projectCategory, setProjectCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('robert_project_category') || 'Client / 3D Render';
    }
    return 'Client / 3D Render';
  });
  const [projectDescription, setProjectDescription] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('robert_project_desc') ||
        'Descrizione del progetto 3D. Puoi personalizzare questo spazio con dettagli sulla modellazione, render pipeline, illuminazione e software utilizzati.'
      );
    }
    return 'Descrizione del progetto 3D. Puoi personalizzare questo spazio con dettagli sulla modellazione, render pipeline, illuminazione e software utilizzati.';
  });

  const [imgSlot1, setImgSlot1] = useState<string | null>(null);
  const [imgSlot2, setImgSlot2] = useState<string | null>(null);
  const [imgSlot3, setImgSlot3] = useState<string | null>(null);

  const handleFileUpload = (
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

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
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            <AppearingText text="Project" delay={0.1} />
          </h2>
        </FadeIn>

        {/* Customizable Project Box for Robert with Canva Salita / Rise */}
        <FadeIn delay={0.15} y={60}>
          <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl relative">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                {/* Number */}
                <span
                  className="font-black text-white hover:text-red-600 transition-colors duration-200 leading-none select-none tracking-tighter"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 90px)' }}
                >
                  01
                </span>

                {/* Category & Project Title */}
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    value={projectCategory}
                    onChange={(e) => {
                      const val = e.target.value;
                      setProjectCategory(val);
                      if (typeof window !== 'undefined') localStorage.setItem('robert_project_category', val);
                    }}
                    placeholder="Categoria (es. Client / 3D Art)"
                    className="bg-transparent text-[#D7E2EA]/70 hover:text-red-500 focus:text-white font-medium uppercase tracking-widest text-xs sm:text-sm border-b border-transparent focus:border-red-500 focus:outline-none transition-colors w-full max-w-xs"
                  />
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => {
                      const val = e.target.value;
                      setProjectTitle(val);
                      if (typeof window !== 'undefined') localStorage.setItem('robert_project_title', val);
                    }}
                    placeholder="Inserisci Titolo Progetto"
                    className="bg-transparent text-white hover:text-red-600 focus:text-white font-black uppercase tracking-tight leading-snug border-b border-transparent focus:border-red-500 focus:outline-none transition-colors w-full"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.4rem)' }}
                  />
                </div>
              </div>

              {/* Live Project button with red hover */}
              <div className="self-end sm:self-center">
                <button
                  type="button"
                  onClick={onContactClick}
                  className="inline-flex items-center justify-center rounded-full border-2 border-white text-white hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base cursor-pointer select-none transition-all duration-200"
                >
                  Live Project
                </button>
              </div>
            </div>

            {/* Editable Project Description */}
            <div className="mb-6 px-1">
              <textarea
                rows={2}
                value={projectDescription}
                onChange={(e) => {
                  const val = e.target.value;
                  setProjectDescription(val);
                  if (typeof window !== 'undefined') localStorage.setItem('robert_project_desc', val);
                }}
                placeholder="Inserisci la descrizione o le specifiche del progetto..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-[#D7E2EA] placeholder-white/30 focus:outline-none focus:border-red-500 transition-colors resize-none font-light leading-relaxed"
              />
            </div>

            {/* Bottom row: Two-column image grid (Left 40% stacked, Right 60% tall) */}
            <div className="flex flex-col md:flex-row gap-4 sm:gap-5 w-full">
              {/* Left column (40% width) with 2 stacked images */}
              <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-5">
                {/* Slot 1 */}
                <div
                  className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] border-2 border-dashed border-white/20 hover:border-red-500 relative group transition-colors"
                  style={{ height: 'clamp(150px, 18vw, 240px)' }}
                >
                  {imgSlot1 ? (
                    <img
                      src={imgSlot1}
                      alt="Progetto Foto 1"
                      className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-[#D7E2EA]/60">
                      <ImageIcon className="w-8 h-8 mb-2 text-white/40 group-hover:text-red-500 transition-colors" />
                      <span className="text-xs uppercase font-medium tracking-wider">
                        Slot Foto 1 (40% Top)
                      </span>
                      <span className="text-[11px] text-white/40 mt-1">Clicca per inserire</span>
                    </div>
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-xs uppercase font-medium tracking-wider shadow-lg">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{imgSlot1 ? 'Cambia Foto' : 'Carica Foto 1'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(setImgSlot1, e)}
                    />
                  </label>
                </div>

                {/* Slot 2 */}
                <div
                  className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] border-2 border-dashed border-white/20 hover:border-red-500 relative group transition-colors"
                  style={{ height: 'clamp(180px, 24vw, 340px)' }}
                >
                  {imgSlot2 ? (
                    <img
                      src={imgSlot2}
                      alt="Progetto Foto 2"
                      className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-[#D7E2EA]/60">
                      <ImageIcon className="w-8 h-8 mb-2 text-white/40 group-hover:text-red-500 transition-colors" />
                      <span className="text-xs uppercase font-medium tracking-wider">
                        Slot Foto 2 (40% Bottom)
                      </span>
                      <span className="text-[11px] text-white/40 mt-1">Clicca per inserire</span>
                    </div>
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-xs uppercase font-medium tracking-wider shadow-lg">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{imgSlot2 ? 'Cambia Foto' : 'Carica Foto 2'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(setImgSlot2, e)}
                    />
                  </label>
                </div>
              </div>

              {/* Right column (60% width) with 1 tall image */}
              <div
                className="w-full md:w-[60%] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] border-2 border-dashed border-white/20 hover:border-red-500 relative group transition-colors"
                style={{
                  minHeight: 'clamp(340px, 42vw, 600px)',
                }}
              >
                {imgSlot3 ? (
                  <img
                    src={imgSlot3}
                    alt="Progetto Foto 3 Hero"
                    className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#D7E2EA]/60">
                    <Sparkles className="w-12 h-12 mb-3 text-white/40 group-hover:text-red-500 transition-colors" />
                    <span className="text-sm uppercase font-bold tracking-wider text-white">
                      Slot Foto Principale 3D (60%)
                    </span>
                    <span className="text-xs text-white/50 max-w-xs mt-1 leading-relaxed">
                      Carica qui il tuo render 3D principale o immagine hero
                    </span>
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
                  <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white text-sm uppercase font-medium tracking-wider shadow-lg">
                    <Upload className="w-4 h-4" />
                    <span>{imgSlot3 ? 'Cambia Foto Principale' : 'Carica Foto Principale'}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(setImgSlot3, e)}
                  />
                </label>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </motion.section>
  );
};
