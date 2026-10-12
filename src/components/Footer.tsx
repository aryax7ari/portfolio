import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Twitter, Linkedin, Youtube, Globe, Palette } from 'lucide-react';
import { AstancaiRobertLogo } from './AstancaiRobertLogo.tsx';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
    { name: 'Twitter / X', href: 'https://twitter.com', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
    { name: 'ArtStation', href: 'https://artstation.com', icon: Palette },
    { name: 'Behance', href: 'https://behance.net', icon: Globe },
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
            Social:
          </span>
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
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
          <span>&copy; {new Date().getFullYear()} Robert. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Creative Portfolio</span>
        </div>
      </div>
    </motion.footer>
  );
};
