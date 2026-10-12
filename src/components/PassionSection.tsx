import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AppearingText } from './AppearingText.tsx';
import { Upload, Edit3 } from 'lucide-react';

interface PassionItem {
  id: number;
  title: string;
  text: string;
  defaultImage: string;
  imageAlt: string;
}

const INITIAL_PASSION_ITEMS: PassionItem[] = [
  {
    id: 1,
    title: '01 · Creative Passion',
    text: 'My passion for 3D stems from an endless quest for novel forms and immersive visual worlds. Every geometric detail is sculpted to evoke tangible emotion and push past conventional design boundaries.',
    defaultImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    imageAlt: '3D Abstract Flow Shape 1',
  },
  {
    id: 2,
    title: '02 · Cinematic Realism',
    text: 'My core objective is transforming abstract concepts into cinematic tridimensional experiences. Volumetric lighting and obsessive material studies define the unique identity of each visual narrative.',
    defaultImage:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
    imageAlt: '3D Geometry Render 2',
  },
  {
    id: 3,
    title: '03 · Dynamic Motion',
    text: 'Continuous experimentation with physical simulations, procedural shaders, and motion design breathes vibrant energy into static geometry, delivering memorable brand impact.',
    defaultImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    imageAlt: '3D Abstract Liquid Dynamics 3',
  },
  {
    id: 4,
    title: '04 · Brand Precision',
    text: 'Merging architectural rigor with conceptual vision empowers forward-thinking companies to command an unforgettable presence across international digital stages.',
    defaultImage:
      'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1000&q=80',
    imageAlt: '3D Spatial Structure 4',
  },
  {
    id: 5,
    title: '05 · Spatial Future',
    text: "The future of interactive media is spatial. My enduring goal is pushing the frontiers of photorealistic rendering and real-time graphics to define tomorrow's visual standard.",
    defaultImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    imageAlt: '3D Futuristic Vision 5',
  },
];

const STORAGE_PASSION_ITEMS_KEY = 'robert_passion_items';

export const PassionSection: React.FC = () => {
  const [items, setItems] = useState<PassionItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_PASSION_ITEMS_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore corrupted data
        }
      }
    }
    return INITIAL_PASSION_ITEMS;
  });
  const [customImages, setCustomImages] = useState<Record<number, string>>({});

  const handleTitleChange = (id: number, newTitle: string) => {
    setItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, title: newTitle } : item));
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_PASSION_ITEMS_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleTextChange = (id: number, newText: string) => {
    setItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, text: newText } : item));
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_PASSION_ITEMS_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImages((prev) => ({ ...prev, [id]: url }));
    }
  };

  return (
    <motion.section
      id="passion"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.05 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[#E50914] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading with Canva Rise animation */}
        <FadeIn delay={0} y={60} className="w-full">
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            <AppearingText text="Passion & Goals" delay={0.1} />
          </h2>
        </FadeIn>

        {/* 5 Points with equal image sizes and customizable text */}
        <div className="flex flex-col border-t border-black/20">
          {items.map((item, index) => {
            const isTextLeft = index % 2 === 0;
            const currentImg = customImages[item.id] || item.defaultImage;

            // Text block with Canva Salita (Rise) and direct editable inputs
            const textBlock = (
              <motion.div
                initial={{ opacity: 0, y: 55 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.85,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full md:w-1/2 flex flex-col justify-center px-2 sm:px-4"
              >
                {/* Editable Title */}
                <div className="relative group/title mb-4 sm:mb-6">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTitleChange(item.id, e.target.value)}
                    className="font-black uppercase text-[#0C0C0C] tracking-tight leading-snug bg-transparent border-b-2 border-transparent hover:border-black/30 focus:border-black focus:outline-none w-full transition-colors cursor-text"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
                    title="Clicca per modificare il titolo"
                  />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/title:opacity-40 transition-opacity pointer-events-none text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" /> Modifica
                  </span>
                </div>

                {/* Editable Description */}
                <div className="text-left relative group/desc">
                  <textarea
                    rows={4}
                    value={item.text}
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    className="w-full bg-black/5 hover:bg-black/10 focus:bg-white/20 border border-black/15 focus:border-black rounded-2xl p-4 text-[#0C0C0C] font-medium leading-relaxed text-base sm:text-lg md:text-xl focus:outline-none transition-colors resize-none cursor-text"
                    title="Clicca per modificare il testo"
                  />
                  <span className="text-[11px] uppercase tracking-wider text-black/50 font-semibold block mt-1">
                    Testo modificabile a tuo piacimento
                  </span>
                </div>
              </motion.div>
            );

            // Image card block with identical dimensions on both left and right
            const imageBlock = (
              <motion.div
                initial={{ opacity: 0, y: 65 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full md:w-1/2 flex flex-col items-center justify-center"
              >
                <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-[30px] sm:rounded-[40px] overflow-hidden border-2 border-black/20 bg-black/10 shadow-xl group">
                  <img
                    src={currentImg}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Manual photo upload/replace trigger */}
                  <label className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-black text-white text-xs uppercase tracking-wider font-medium cursor-pointer shadow-lg transition-all duration-200">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Replace Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(item.id, e)}
                    />
                  </label>

                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 text-white text-[11px] font-mono tracking-widest uppercase">
                    Photo Slot {item.id}
                  </div>
                </div>
              </motion.div>
            );

            return (
              <div
                key={item.id}
                className="border-b border-black/20 py-12 sm:py-16 md:py-20"
              >
                {/* Both left and right layouts now have identical 50% flex width without double nesting */}
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
