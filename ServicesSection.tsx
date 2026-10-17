import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AppearingText } from './AppearingText.tsx';
import { Code2 } from 'lucide-react';

export interface ServiceItem {
  id: number;
  number: string;
  tag: string;
  name: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    number: '01',
    tag: 'Web Development & UI',
    name: 'Creare un Front End / Pagina Web',
    description:
      "Progettazione e sviluppo di pagine web e interfacce front-end moderne, altamente performanti e completamente responsive. Focus su animazioni fluide, estetica visiva contemporanea e massima cura dell'esperienza utente.",
  },
  {
    id: 2,
    number: '02',
    tag: 'Video & Creatività',
    name: 'Video Editing',
    description:
      'Montaggio video creativo e curato nei dettagli: ritmo, transizioni e animazioni per trasformare le idee in contenuti visivi che restano impressi.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.05 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#E50914] -mt-10 sm:-mt-12 md:-mt-14 z-0 relative"
    >
      <section
        id="services"
        className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      >
        <div className="max-w-5xl mx-auto">
          {/* Heading with Canva Rise animation */}
          <FadeIn delay={0} y={60} className="w-full mb-16 sm:mb-20 md:mb-24">
            <h2
              className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight select-none"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              <AppearingText text="Services" delay={0.1} />
            </h2>
          </FadeIn>

          {/* List of Static Services */}
          <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
            {SERVICES_DATA.map((service, index) => (
              <FadeIn
                key={service.id}
                delay={0.1 * (index + 1)}
                y={60}
                className="border-b border-[rgba(12,12,12,0.15)]"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 py-10 sm:py-12 md:py-14">
                  {/* Service Number */}
                  <div className="shrink-0 flex items-center pt-2">
                    <span
                      className="font-black text-[#0C0C0C] leading-none select-none tracking-tighter w-28 sm:w-36"
                      style={{ fontSize: 'clamp(3.5rem, 8vw, 120px)' }}
                    >
                      {service.number}
                    </span>
                  </div>

                  {/* Service Details: Tag, Name, Description */}
                  <div className="flex flex-col gap-3 flex-1 md:pl-4">
                    {/* Tag / Category */}
                    <div className="flex items-center gap-2 text-red-600 font-semibold text-xs uppercase tracking-widest">
                      <Code2 className="w-4 h-4 shrink-0" />
                      <span>{service.tag}</span>
                    </div>

                    {/* Service Name */}
                    <h3
                      className="font-black uppercase text-[#0C0C0C] tracking-tight leading-snug"
                      style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.5rem)' }}
                    >
                      {service.name}
                    </h3>

                    {/* Service Description */}
                    <p className="text-[#0C0C0C] font-normal leading-relaxed text-base sm:text-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
