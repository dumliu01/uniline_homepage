
import React from 'react';
import { LocalizedProject } from '../constants';
import { Lang, translations } from '../translations';

interface ProjectCardProps {
  project: LocalizedProject;
  lang: Lang;
  onOpenDetail: (project: LocalizedProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, lang, onOpenDetail }) => {
  const t = translations[lang].works;
  
  return (
    <div 
      className="group relative bg-dark-800 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/10 hover:border-accent/50 shadow-2xl" 
      onClick={() => onOpenDetail(project)}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-dark-700">
        <img 
          src={project.imageUrl} 
          alt={project.title[lang]} 
          className="object-cover w-full h-full opacity-100 transition-all duration-700 group-hover:scale-105"
        />
        {/* Very subtle overlay for text legibility at the bottom, kept minimal to keep image bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-100" />
        
        <div className="absolute top-4 left-4">
           <span className="text-white text-[9px] font-bold uppercase tracking-widest bg-accent/90 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-xl font-outfit font-bold text-white mb-3 tracking-tight group-hover:text-accent transition-colors">
          {project.title[lang]}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
          {project.description[lang]}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-[10px] uppercase font-bold text-slate-300 bg-white/10 px-2.5 py-1 rounded-md border border-white/5">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center text-xs font-bold text-accent uppercase tracking-[0.15em] group-hover:gap-3 transition-all">
          <span className="border-b border-accent/0 group-hover:border-accent/100 transition-all">
            {t.viewCase}
          </span>
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

