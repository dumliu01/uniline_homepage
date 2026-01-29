
import React from 'react';
import { Lang, translations } from '../translations';

interface NavbarProps {
  onNav: (section: 'hero' | 'works' | 'about' | 'contact') => void;
  activeSection: string;
  lang: Lang;
  onToggleLang: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNav, activeSection, lang, onToggleLang }) => {
  const t = translations[lang].nav;
  
  const links = [
    { label: t.hero, value: 'hero' },
    { label: t.works, value: 'works' },
    { label: t.about, value: 'about' },
    { label: t.contact, value: 'contact' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
      <div className="glass rounded-full px-6 py-2.5 flex items-center gap-8 pointer-events-auto shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        <div className="flex gap-8">
          {links.map((link) => (
            <button
              key={link.value}
              onClick={() => onNav(link.value as any)}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-1 ${
                activeSection === link.value 
                  ? 'text-white' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {link.label}
              {activeSection === link.value && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full animate-in fade-in zoom-in duration-300"></span>
              )}
            </button>
          ))}
        </div>
        
        <div className="h-4 w-[1px] bg-white/10"></div>

        <button 
          onClick={onToggleLang}
          className="text-[10px] font-bold text-slate-400 hover:text-accent transition-colors uppercase tracking-widest"
        >
          {lang === 'en' ? 'EN / 中' : '中 / EN'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
