import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { AppearingText } from './AppearingText.tsx';
import { Code2, Edit3, Plus, Trash2, RotateCcw, Check, Sparkles } from 'lucide-react';

export interface ServiceItem {
  id: number;
  number: string;
  tag: string;
  name: string;
  description: string;
}

const DEFAULT_SERVICES: ServiceItem[] = [
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
    tag: '3D Art & Interactive',
    name: '3D Modeling & Motion Design',
    description:
      'Modellazione tridimensionale, animazioni procedurali e rendering fotorealistico per brand identity memorabili ed esperienze interattive avanzate.',
  },
];

const STORAGE_SERVICES_KEY = 'robert_services_items';
const STORAGE_SERVICES_HEADING_KEY = 'robert_services_heading';

export const ServicesSection: React.FC = () => {
  const [heading, setHeading] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_SERVICES_HEADING_KEY) || 'Services';
    }
    return 'Services';
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_SERVICES_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return DEFAULT_SERVICES;
  });

  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const saveServicesToStorage = (updated: ServiceItem[]) => {
    setServices(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(updated));
    }
    triggerToast();
  };

  const handleHeadingChange = (newHeading: string) => {
    setHeading(newHeading);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_SERVICES_HEADING_KEY, newHeading);
    }
    triggerToast();
  };

  const handleServiceChange = (id: number, field: keyof ServiceItem, value: string) => {
    const updated = services.map((s) => (s.id === id ? { ...s, [field]: value } : s));
    saveServicesToStorage(updated);
  };

  const handleAddService = () => {
    const nextNum = String(services.length + 1).padStart(2, '0');
    const newService: ServiceItem = {
      id: Date.now(),
      number: nextNum,
      tag: 'Nuovo Servizio',
      name: 'Nome del Servizio',
      description: 'Descrizione personalizzata per questo servizio.',
    };
    saveServicesToStorage([...services, newService]);
  };

  const handleDeleteService = (id: number) => {
    if (services.length <= 1) return;
    const updated = services.filter((s) => s.id !== id);
    saveServicesToStorage(updated);
  };

  const handleReset = () => {
    setHeading('Services');
    saveServicesToStorage(DEFAULT_SERVICES);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_SERVICES_HEADING_KEY);
      localStorage.removeItem(STORAGE_SERVICES_KEY);
    }
  };

  const triggerToast = () => {
    setShowSavedToast(true);
  };

  useEffect(() => {
    if (!showSavedToast) return;
    const timer = setTimeout(() => setShowSavedToast(false), 2000);
    return () => clearTimeout(timer);
  }, [showSavedToast]);

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
          {/* Heading with Canva Rise animation and click-to-edit */}
          <FadeIn delay={0} y={60} className="w-full mb-16 sm:mb-20 md:mb-24">
            <div className="flex flex-col items-center justify-center">
              {isEditingHeading ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    autoFocus
                    value={heading}
                    onChange={(e) => handleHeadingChange(e.target.value)}
                    onBlur={() => setIsEditingHeading(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setIsEditingHeading(false);
                    }}
                    className="text-[#0C0C0C] font-black uppercase text-center border-b-2 border-black focus:outline-none bg-transparent"
                    style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditingHeading(false)}
                    className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingHeading(true)}
                  className="cursor-pointer group flex flex-col items-center select-none"
                  title="Clicca per modificare il titolo della sezione"
                >
                  <h2
                    className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight group-hover:text-red-600 transition-colors duration-200"
                    style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
                  >
                    <AppearingText text={heading} delay={0.1} />
                  </h2>
                  <span className="opacity-0 group-hover:opacity-60 transition-opacity text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 text-black mt-2">
                    <Edit3 className="w-3.5 h-3.5" /> Clicca per modificare titolo
                  </span>
                </div>
              )}

              {/* Status bar */}
              <div className="flex items-center justify-center gap-4 mt-3">
                {showSavedToast && (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1 text-xs uppercase tracking-wider animate-pulse">
                    <Check className="w-3.5 h-3.5" /> Modifiche salvate
                  </span>
                )}
              </div>
            </div>
          </FadeIn>

          {/* List of Editable Services */}
          <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
            {services.map((service, index) => (
              <FadeIn
                key={service.id}
                delay={0.1 * (index + 1)}
                y={60}
                className="border-b border-[rgba(12,12,12,0.15)]"
              >
                <div className="group flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 py-10 sm:py-12 md:py-14 transition-colors duration-300">
                  {/* Service Number */}
                  <div className="shrink-0 flex items-center pt-2">
                    <input
                      type="text"
                      value={service.number}
                      onChange={(e) => handleServiceChange(service.id, 'number', e.target.value)}
                      className="font-black text-[#0C0C0C] leading-none select-none tracking-tighter w-28 sm:w-36 bg-transparent border-b border-transparent hover:border-black/30 focus:border-black focus:outline-none transition-colors cursor-text"
                      style={{ fontSize: 'clamp(3.5rem, 8vw, 120px)' }}
                      title="Modifica numero servizio"
                    />
                  </div>

                  {/* Service Details: Tag, Name, Description */}
                  <div className="flex flex-col gap-3 flex-1 md:pl-4">
                    {/* Tag / Category */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-red-600 font-semibold text-xs uppercase tracking-widest flex-1">
                        <Code2 className="w-4 h-4 shrink-0" />
                        <input
                          type="text"
                          value={service.tag}
                          onChange={(e) => handleServiceChange(service.id, 'tag', e.target.value)}
                          className="bg-transparent text-red-600 font-semibold text-xs uppercase tracking-widest border-b border-transparent hover:border-red-600/30 focus:border-red-600 focus:outline-none w-full max-w-sm transition-colors cursor-text"
                          title="Modifica categoria servizio"
                        />
                      </div>

                      {/* Delete button if more than 1 service */}
                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteService(service.id)}
                          className="text-black/30 hover:text-red-600 p-1.5 transition-colors cursor-pointer rounded-full hover:bg-black/5"
                          title="Rimuovi questo servizio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Service Name */}
                    <div className="relative group/name">
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                        className="font-black uppercase text-[#0C0C0C] tracking-tight leading-snug bg-transparent border-b-2 border-transparent hover:border-black/30 focus:border-black focus:outline-none w-full transition-colors cursor-text"
                        style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.5rem)' }}
                        title="Modifica titolo del servizio"
                      />
                    </div>

                    {/* Service Description */}
                    <div className="relative group/desc">
                      <textarea
                        rows={3}
                        value={service.description}
                        onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                        className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.09] border border-black/15 focus:border-black rounded-2xl p-3.5 text-[#0C0C0C] font-normal leading-relaxed text-base sm:text-lg focus:outline-none transition-colors resize-none cursor-text"
                        title="Modifica descrizione del servizio"
                      />
                      <span className="text-[11px] uppercase tracking-wider text-black/50 font-semibold block mt-1">
                        Testo del servizio modificabile a tuo piacimento (salvato automaticamente)
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* Action Bar: Add new service & Reset */}
            <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(12,12,12,0.15)]">
              <button
                type="button"
                onClick={handleAddService}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white hover:bg-red-600 font-medium uppercase tracking-wider text-xs transition-colors duration-200 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Aggiungi Servizio</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-black/50 hover:text-red-600 transition-colors cursor-pointer"
                title="Ripristina i servizi predefiniti"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ripristina Servizi Originali</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
