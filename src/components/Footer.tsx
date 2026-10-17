import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { AstancaiRobertLogo } from './AstancaiRobertLogo.tsx';

interface FooterProps {
  onContactClick: () => void;
}

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'GitHub', href: 'https://github.com/aryax7ari', icon: GithubIcon, external: true },
    { name: 'Email', href: 'mailto:astancaiionrobert@gmail.com', icon: Mail, external: false },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-10 py-14 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Top row: Red Logo & Quick links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-3 sm:gap-6 text-center sm:text-left">
            <AstancaiRobertLogo size="lg" color="yellow" />
          </div>

          <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-medium">
            <button
              type="button"
              onClick={onContactClick}
              className="text-white hover:text-red-600 transition-colors duration-200 cursor-pointer"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-red-600 transition-colors duration-200 cursor-pointer group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Social Media Links Bar */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 pt-6 border-t border-white/10">
          <span className="text-xs uppercase font-bold tracking-widest text-white/40 mr-2">
            Contatti:
          </span>
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                {...(social.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-white hover:text-red-600 hover:border-red-600 hover:bg-red-600/10 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="uppercase font-medium tracking-wider">{social.name}</span>
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D7E2EA]/40 pt-4 border-t border-white/5 uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} Robert Astancai. Tutti i diritti riservati.</span>
          <span className="mt-2 sm:mt-0">Creative Portfolio</span>
        </div>
      </div>
    </motion.footer>
  );
};
