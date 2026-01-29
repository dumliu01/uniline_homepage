
import React, { useState } from 'react';
import { SITE_CONFIG } from '../config';
import { Lang, translations } from '../translations';

interface ContactProps {
  lang: Lang;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const t = translations[lang].contact;

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center">
      <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">[CONNECT]</span>
      <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-8 tracking-tight">{t.title}</h2>
      <p className="text-slate-400 font-light text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
        {t.desc}
      </p>

      <div className="inline-flex flex-col items-center">
        <div className="group relative">
          <a 
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="text-2xl md:text-4xl font-outfit font-medium text-white hover:text-accent transition-colors duration-300 flex items-center gap-4 mb-4"
          >
            {SITE_CONFIG.contact.email}
            <svg className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        
        <button 
          onClick={copyEmail}
          className={`px-8 py-3 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest transition-all ${
            copied ? 'bg-accent text-white border-accent' : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          {copied ? t.copied : t.copy}
        </button>
      </div>

      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
        {SITE_CONFIG.socials.map((social) => (
          <a 
            key={social.label} 
            href={social.url} 
            target="_blank" 
            rel="noreferrer"
            className="glass p-6 rounded-2xl hover:border-accent/30 transition-all group"
          >
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 group-hover:text-accent">{social.label}</span>
            <span className="text-white text-sm font-medium">Follow</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
