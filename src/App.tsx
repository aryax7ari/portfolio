/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScrollProgress } from './components/ScrollProgress.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { MarqueeSection } from './components/MarqueeSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { PassionSection } from './components/PassionSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ContactModal } from './components/ContactModal.tsx';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  return (
    <div
      className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] selection:bg-red-600 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* Scroll Progress Bar at very top */}
      <ScrollProgress />

      {/* 1. HERO SECTION */}
      <HeroSection onContactClick={() => setIsContactOpen(true)} />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onContactClick={() => setIsContactOpen(true)} />

      {/* 4. PASSION & GOALS SECTION (RED BACKGROUND, BLACK TEXT) */}
      <PassionSection />

      {/* 5. SERVICES SECTION */}
      <ServicesSection />

      {/* 6. PROJECTS SECTION (CUSTOMIZABLE BOX) */}
      <ProjectsSection onContactClick={() => setIsContactOpen(true)} />

      {/* FOOTER WITH SOCIALS */}
      <Footer onContactClick={() => setIsContactOpen(true)} />

      {/* Interactive Contact / Proposal Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
