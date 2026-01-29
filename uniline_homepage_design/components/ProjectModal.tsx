
import React, { useState, useEffect } from 'react';
import { LocalizedProject } from '../constants';
import { Lang, translations } from '../translations';

interface ProjectModalProps {
  project: LocalizedProject | null;
  lang: Lang;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, lang, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setCurrentIdx(0);
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [project]);

  if (!project) return null;
  const t = translations[lang].works;
  const gallery = project.images || [project.imageUrl];

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <div className="fixed inset-0 bg-dark-900/95 backdrop-blur-2xl animate-in fade-in duration-500" onClick={onClose} />
      
      <div className="relative bg-dark-800 w-full max-w-6xl rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col lg:flex-row max-h-[90vh] border border-white/10">
        
        {/* Visual Showcase (Gallery) */}
        <div className="w-full lg:w-[60%] relative bg-black border-r border-white/10 overflow-hidden group">
          <div className="absolute inset-0 flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
            {gallery.map((img, idx) => (
              <img key={idx} src={img} className="w-full h-full object-cover opacity-100 flex-shrink-0 transition-opacity duration-500" alt={`${project.title[lang]} slide ${idx + 1}`} />
            ))}
          </div>

          {/* Navigation Arrows */}
          {gallery.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/10 active:scale-90"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/10 active:scale-90"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          {/* Indicators */}
          {gallery.length > 1 && (
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
              {gallery.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIdx ? 'w-10 bg-accent shadow-[0_0_10px_#3B82F6]' : 'w-3 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-30 lg:hidden w-10 h-10 glass rounded-full flex items-center justify-center text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Technical Specification Panel */}
        <div className="w-full lg:w-[40%] p-8 lg:p-12 overflow-y-auto bg-dark-800 flex flex-col">
          <div className="hidden lg:flex justify-end mb-8">
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              {t.close}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="mb-10">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
              {project.category}
            </span>
            <h2 className="text-4xl font-outfit font-extrabold text-white mb-6 leading-tight">
              {project.title[lang]}
            </h2>
            <p className="text-slate-300 font-light leading-relaxed mb-6">{project.longDescription[lang]}</p>
          </div>

          {/* Technical Grid */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div>
              <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-3">{t.languages}</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.languages.map(l => <span key={l} className="text-white text-xs font-medium bg-white/10 px-2 py-1 rounded border border-white/5">{l}</span>)}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-3">{t.platforms}</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.platforms.map(p => <span key={p} className="text-white text-xs font-medium bg-white/10 px-2 py-1 rounded border border-white/5">{p}</span>)}
              </div>
            </div>
            <div className="col-span-2">
              <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-3">{t.tools}</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map(tool => <span key={tool} className="text-slate-200 text-xs font-medium border border-white/10 bg-white/5 px-2 py-1 rounded">{tool}</span>)}
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4 pt-8">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" className="w-full bg-accent text-white font-bold py-4 rounded-2xl hover:bg-accent/80 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-xl shadow-accent/20">
                {t.demo}
              </a>
            )}
            {project.codeUrl && (
              <a href={project.codeUrl} target="_blank" className="w-full bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest border border-white/10">
                {t.code}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
