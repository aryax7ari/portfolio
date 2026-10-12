import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Box, Sparkles, Layers, Eye } from 'lucide-react';
import { LiveProjectButton } from './LiveProjectButton.tsx';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  year: string;
  description: string;
  tools: string[];
  deliverables: string[];
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  link?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

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

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] p-6 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA]"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-black text-3xl sm:text-4xl text-[#D7E2EA]">
                  {project.number}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold px-2.5 py-0.5 rounded-full border border-white/10">
                  {project.category} · {project.year}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#D7E2EA]">
                {project.name}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 text-sm">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-[#D7E2EA]/70 mb-1">
                <Box className="w-4 h-4 text-purple-400" />
                <span className="uppercase text-xs font-semibold tracking-wider">3D Pipeline</span>
              </div>
              <p className="font-medium text-white">{project.tools.join(', ')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-[#D7E2EA]/70 mb-1">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span className="uppercase text-xs font-semibold tracking-wider">Deliverables</span>
              </div>
              <p className="font-medium text-white">{project.deliverables.join(', ')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-[#D7E2EA]/70 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="uppercase text-xs font-semibold tracking-wider">Status</span>
              </div>
              <p className="font-medium text-white">Production Shipped · 4K 60fps</p>
            </div>
          </div>

          <p className="text-base text-[#D7E2EA]/80 font-light leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Render Imagery Showcase */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#D7E2EA]/60">
              Key Render Sequences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={project.col1Img1}
                  alt={`${project.name} Frame 1`}
                  className="w-full h-56 sm:h-64 object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={project.col1Img2}
                  alt={`${project.name} Frame 2`}
                  className="w-full h-56 sm:h-64 object-cover"
                />
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src={project.col2Img}
                alt={`${project.name} Hero render`}
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
            <span className="text-xs text-[#D7E2EA]/60 font-light">
              Designed & Rendered by Jack
            </span>
            <div className="flex items-center gap-3">
              <LiveProjectButton
                onClick={() => {
                  window.open(project.col2Img, '_blank', 'noopener,noreferrer');
                }}
                label="View 4K Render"
              />
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full text-xs uppercase font-medium tracking-widest border border-white/20 hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
