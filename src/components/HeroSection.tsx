import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AstancaiRobertLogo } from './AstancaiRobertLogo.tsx';
import { AppearingText } from './AppearingText.tsx';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Subtle scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.2]);

  // Very gentle mouse drift
  const mouseMotionY = useSpring(0, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const relativeY = (e.clientY / window.innerHeight - 0.5) * 6;
      mouseMotionY.set(relativeY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseMotionY]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. Navbar: logo rosso in alto, menu ravvicinato al logo */}
      <FadeIn delay={0} y={-20} as="header" className="w-full relative z-30">
        <nav
          className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-12 px-6 md:px-10 pt-6 md:pt-8"
          aria-label="Main Navigation"
        >
          {/* Logo sopra: ROSSO pulito senza bagliore */}
          <div className="shrink-0">
            <AstancaiRobertLogo size="md" color="red" />
          </div>

          {/* Navigation Links closer to the logo */}
          <div className="flex items-center gap-5 sm:gap-7 md:gap-8 flex-wrap justify-center">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('about');
              }}
              className="text-white hover:text-red-600 font-medium uppercase tracking-wider text-sm md:text-base lg:text-[1.15rem] transition-colors duration-200 cursor-pointer"
            >
              About
            </a>
            <a
              href="#passion"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('passion');
              }}
              className="text-white hover:text-red-600 font-medium uppercase tracking-wider text-sm md:text-base lg:text-[1.15rem] transition-colors duration-200 cursor-pointer"
            >
              Passion & Goals
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('services');
              }}
              className="text-white hover:text-red-600 font-medium uppercase tracking-wider text-sm md:text-base lg:text-[1.15rem] transition-colors duration-200 cursor-pointer"
            >
              Price
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('projects');
              }}
              className="text-white hover:text-red-600 font-medium uppercase tracking-wider text-sm md:text-base lg:text-[1.15rem] transition-colors duration-200 cursor-pointer"
            >
              Projects
            </a>
            <button
              type="button"
              onClick={onContactClick}
              className="text-white hover:text-red-600 font-medium uppercase tracking-wider text-sm md:text-base lg:text-[1.15rem] transition-colors duration-200 cursor-pointer"
            >
              Contact
            </button>
          </div>
        </nav>
      </FadeIn>

      {/* 2. Hero Centerpiece:
          - Scritta "i'm robert" fa da background
          - Logo "Astancai Robert" GIALLO (senza bagliore/illuminazione)
            posizionato SOPRA alla scritta, in diagonale (-8deg),
            e che si muove in modo continuo e autonomo anche senza fare nulla */}
      <div className="w-full my-auto text-center px-4 overflow-hidden relative z-10 select-none">
        <motion.div
          style={{
            y: scrollY,
            scale: scrollScale,
            opacity: scrollOpacity,
            translateY: mouseMotionY,
          }}
          className="will-change-transform relative inline-block"
        >
          {/* Background Text: massive red "i'm robert" */}
          <h1 className="font-black uppercase tracking-tight leading-none whitespace-nowrap text-red-600 text-[13vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] opacity-90">
            <AppearingText text="i'm robert" delay={0.15} hoverRed={false} className="text-red-600" />
          </h1>

          {/* Foreground Overlay: Logo GIALLO sopra alla scritta, FERMO come i'm robert, in diagonale (-8deg) */}
          <div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto cursor-pointer"
            style={{ transform: 'rotate(-8deg)' }}
          >
            {/* Entrata: il logo sale e si ingrandisce un attimo dopo la scritta */}
            <motion.span
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 30 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.6 : 1.1,
                delay: reduceMotion ? 0 : 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              className="inline-block"
            >
              {/* Dopo l'entrata il logo galleggia piano, in loop */}
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                transition={{ duration: 6, delay: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block font-['Caveat',_'Marck_Script',_cursive] font-bold tracking-wide leading-none text-[#FACC15] hover:text-[#FDE047] text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] select-none transition-colors duration-200"
                style={{
                  fontFamily: "'Caveat', 'Marck Script', cursive",
                }}
              >
                Astancai Robert
              </motion.span>
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* 3. Spazio in fondo */}
      <div className="w-full pb-8 pointer-events-none" />
    </section>
  );
};
