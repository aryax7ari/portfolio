import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle2, Clock, ExternalLink, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARGET_EMAIL = 'astancaiionrobert@gmail.com';

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [detailsCopied, setDetailsCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Richiesta Servizio: ${formData.service || 'Generale'}`);
    const bodyText = `Ciao Robert,\n\nHai ricevuto una nuova richiesta dal form di contatto del tuo portfolio:\n\n• Servizio Richiesto: ${formData.service}\n• Email del mittente: ${formData.email}\n\n• Dettagli del Progetto / Messaggio:\n${formData.message}\n\n------------------------------------\nInviato dal sito web di Astancai Robert`;
    const body = encodeURIComponent(bodyText);
    return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  const generateGmailWebUrl = () => {
    const subject = encodeURIComponent(`Richiesta Servizio: ${formData.service || 'Generale'}`);
    const bodyText = `Ciao Robert,\n\nHai ricevuto una nuova richiesta dal form di contatto del tuo portfolio:\n\n• Servizio Richiesto: ${formData.service}\n• Email del mittente: ${formData.email}\n\n• Dettagli del Progetto / Messaggio:\n${formData.message}\n\n------------------------------------\nInviato dal sito web di Astancai Robert`;
    const body = encodeURIComponent(bodyText);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.service.trim() || !formData.message.trim()) {
      return;
    }

    // Launch default email client directly with all pre-filled info addressed to astancaiionrobert@gmail.com
    const mailtoLink = generateMailtoUrl();
    window.location.href = mailtoLink;

    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(TARGET_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyDetails = () => {
    const textToCopy = `A: ${TARGET_EMAIL}\nOggetto: Richiesta Servizio - ${formData.service}\nMittente: ${formData.email}\n\nMessaggio:\n${formData.message}`;
    navigator.clipboard.writeText(textToCopy);
    setDetailsCopied(true);
    setTimeout(() => setDetailsCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-xl bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] p-6 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA] max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-semibold">
                  Disponibile per nuovi progetti
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#D7E2EA]">
                Contatta Robert
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white cursor-pointer"
              aria-label="Chiudi finestra"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase text-white mb-2">
                Email Preparata per Robert!
              </h3>
              <p className="text-sm text-[#D7E2EA]/85 max-w-md mb-4 leading-relaxed">
                La richiesta è indirizzata direttamente a:
              </p>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-red-500/40 text-red-400 font-mono text-sm mb-6 select-all">
                {TARGET_EMAIL}
              </div>

              {/* Summary Box */}
              <div className="w-full text-left bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 mb-6 text-xs sm:text-sm space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/10 gap-1">
                  <span className="text-white/50 uppercase tracking-wider font-semibold text-[11px]">
                    Servizio Richiesto:
                  </span>
                  <span className="text-white font-medium">{formData.service}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/10 gap-1">
                  <span className="text-white/50 uppercase tracking-wider font-semibold text-[11px]">
                    La Tua Email:
                  </span>
                  <span className="text-white font-medium">{formData.email}</span>
                </div>
                <div className="pt-1">
                  <span className="block text-white/50 uppercase tracking-wider font-semibold text-[11px] mb-1">
                    Messaggio:
                  </span>
                  <p className="text-white/80 whitespace-pre-wrap text-xs bg-black/40 p-3 rounded-xl border border-white/5 font-sans">
                    {formData.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <a
                  href={generateGmailWebUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs uppercase font-medium tracking-wider transition-colors shadow-lg shadow-red-600/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Invia con Gmail Web</span>
                </a>
                <a
                  href={generateMailtoUrl()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase font-medium tracking-wider border border-white/15 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Riapri Mail Client</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs uppercase font-medium tracking-wider border border-white/10 transition-colors cursor-pointer"
                >
                  {detailsCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{detailsCopied ? 'Copiato!' : 'Copia Testo'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ email: '', service: '', message: '' });
                  onClose();
                }}
                className="px-8 py-2.5 rounded-full text-xs uppercase font-medium tracking-widest border border-white/20 hover:bg-white/10 transition-colors cursor-pointer text-white/70 hover:text-white"
              >
                Chiudi
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-5">
              {/* Email Address */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                  La Tua Email *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="iltuonome@azienda.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {/* Service Requested - Box in cui scrivere liberamente */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 font-medium">
                    Servizio Richiesto *
                  </label>
                  <span className="text-[11px] text-white/40">Scrivi liberamente</span>
                </div>
                <input
                  required
                  type="text"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  placeholder="Es. Sito web, Front-end, Video editing..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                  Messaggio / Dettagli Progetto *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Scrivi i dettagli del tuo progetto, idee, tempistiche o obiettivi..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-red-600 transition-colors resize-none"
                />
              </div>

              {/* Bottom Actions: Copy email on left, Invia button on right styled exactly like "Contatta" */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 text-xs text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer group"
                >
                  <Mail className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  <span>{copied ? 'Copiata: astancaiionrobert@gmail.com' : 'Copia email: astancaiionrobert@gmail.com'}</span>
                </button>

                {/* Bottone Invia rosso senza contorno bianco */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative inline-flex items-center justify-center rounded-full bg-[#E50914] hover:bg-red-600 text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer select-none transition-all duration-200 shadow-lg shadow-red-600/30 border-0 outline-none w-full sm:w-auto"
                >
                  <span>Invia</span>
                </motion.button>
              </div>
            </form>
          )}

          {/* Direct Social Links */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#D7E2EA]/60">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              <span>Destinatario: {TARGET_EMAIL}</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/aryax7ari"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
