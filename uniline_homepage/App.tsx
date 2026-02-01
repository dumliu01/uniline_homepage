
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import Contact from './components/Contact';
import Logo from './components/Logo';
import { PROJECTS, LocalizedProject } from './constants';
import { SITE_CONFIG } from './config';
import { Lang, translations } from './translations';

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  tx: number; // 爆炸目标 X 偏移
  ty: number; // 爆炸目标 Y 偏移
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [activeSection, setActiveSection] = useState<'hero' | 'works' | 'about' | 'contact'>('hero');
  const [greeting, setGreeting] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProject, setSelectedProject] = useState<LocalizedProject | null>(null);
  const [clickParticles, setClickParticles] = useState<ClickParticle[]>([]);
  
  // 默认关闭点击特效 (Default to Off)
  const [clickEffectsEnabled, setClickEffectsEnabled] = useState(false);

  const t = translations[lang];

  const heroRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const scrollToSection = (section: 'hero' | 'works' | 'about' | 'contact') => {
    setActiveSection(section);
    const refs = { hero: heroRef, works: worksRef, about: aboutRef, contact: contactRef };
    refs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 点击产生“爆炸-上升”粒子 - 仅当 clickEffectsEnabled 为 true 时生效
  const handleGlobalClick = useCallback((e: MouseEvent) => {
    if (!clickEffectsEnabled) return;

    const newParticles: ClickParticle[] = [];
    const count = 10 + Math.floor(Math.random() * 5); 
    
    for (let i = 0; i < count; i++) {
      const id = Date.now() + Math.random();
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 100;
      
      newParticles.push({
        id,
        x: e.clientX,
        y: e.clientY,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 3 + Math.random() * 6,
        duration: 2 + Math.random() * 1.5,
        delay: Math.random() * 0.05,
        color: Math.random() > 0.4 ? (Math.random() > 0.5 ? '#3B82F6' : '#60A5FA') : '#FFFFFF'
      });

      setTimeout(() => {
        setClickParticles(prev => prev.filter(p => p.id !== id));
      }, 3500);
    }
    
    setClickParticles(prev => [...prev, ...newParticles]);
  }, [clickEffectsEnabled]);

  useEffect(() => {
    window.addEventListener('mousedown', handleGlobalClick);
    return () => window.removeEventListener('mousedown', handleGlobalClick);
  }, [handleGlobalClick]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 网格遮罩始终跟随，保持界面交互深度
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let active = true;
    // Default deterministic greeting first
    setGreeting(t.hero.defaultGreeting);
    
    // const fetchGreeting = async () => {
    //   setIsTyping(true);
    //   try {
    //     const msg = await getAIGreeting(SITE_CONFIG.identity.name, lang);
    //     if (active) setGreeting(msg);
    //   } finally {
    //     if (active) setIsTyping(false);
    //   }
    // };
    
    //fetchGreeting();
    return () => { active = false; };
  }, [lang]);

  // const staticParticles = useMemo(() => {
  //   // Increased particle count from 40 to 120
  //   return Array.from({ length: 120 }).map((_, i) => ({
  //     id: i,
  //     left: `${Math.random() * 100}%`,
  //     top: `${Math.random() * 100 + 100}%`,
  //     delay: `${Math.random() * 15}s`,
  //     duration: `${Math.random() * 20 + 10}s`,
  //     size: `${Math.random() * 1.5 + 0.3}px`,
  //   }));
  // }, []);

  const staticParticles = useMemo(() => {
    // Increased particle count to 280 for a more dense, rich atmosphere.
    // Using negative animation-delay ensures they are already "in motion" across the screen on load.
    return Array.from({ length: 280 }).map((_, i) => {
      const duration = Math.random() * 20 + 15;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        // Start from bottom, but allow negative delay to pre-populate the screen
        top: '105%', 
        delay: `-${Math.random() * duration}s`, // Negative delay makes them appear immediately at different stages of the animation
        duration: `${duration}s`,
        size: `${Math.random() * 1.8 + 0.4}px`,
        opacity: Math.random() * 0.2 + 0.05,
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 selection:bg-accent selection:text-white relative overflow-x-hidden">
      
      {/* --- BACKGROUND SYSTEM --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        
        {/* Ambient Static Particles - Always On */}
        <div className="absolute inset-0">
          {staticParticles.map((p) => (
            <div 
              key={p.id}
              className="particle opacity-15"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>

        {/* Interactive Click Particles (Conditional) */}
        <div className="absolute inset-0 overflow-hidden">
          {clickParticles.map((p) => (
            <div 
              key={p.id}
              className="click-particle shadow-[0_0_15px_rgba(59,130,246,0.6)]"
              style={{
                left: p.x,
                top: p.y,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                // @ts-ignore
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                mixBlendMode: 'screen',
                filter: 'blur(0.3px)'
              } as any}
            />
          ))}
        </div>

        {/* Interactive Grid - Always active for modern look */}
        <div className="bg-grid absolute inset-0 opacity-40"></div>
        
        {/* Ambient Auras - Always active for visual depth */}
        <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-accent/15 rounded-full blur-[160px] animate-drift mix-blend-screen"></div>
        <div className="absolute top-[20%] left-[-15%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[130px] animate-drift-slow mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[60vw] h-[60vw] bg-cyan-500/10 rounded-full blur-[140px] animate-drift mix-blend-screen"></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-dark-900 to-transparent"></div>
      </div>

      {/* --- UI OVERLAYS --- */}

      {/* FX Toggle (Subtle Top-Right) */}
      <div className="fixed top-10 right-10 z-[60] flex items-center justify-end">
        <button 
          onClick={() => setClickEffectsEnabled(!clickEffectsEnabled)}
          className={`p-2 rounded-full glass border-white/5 transition-all duration-500 hover:border-accent/30 group ${clickEffectsEnabled ? 'opacity-80 text-accent' : 'opacity-15 hover:opacity-50'}`}
          title={clickEffectsEnabled ? "Disable Click Particles" : "Enable Click Particles"}
        >
          {clickEffectsEnabled ? (
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Brackets */}
      <div className="fixed top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/5 z-40 pointer-events-none"></div>
      <div className="fixed top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/5 z-40 pointer-events-none"></div>
      <div className="fixed bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-white/5 z-40 pointer-events-none"></div>
      <div className="fixed bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/5 z-40 pointer-events-none"></div>

      <Navbar onNav={scrollToSection} activeSection={activeSection} lang={lang} onToggleLang={toggleLang} />
      <ProjectModal project={selectedProject} lang={lang} onClose={() => setSelectedProject(null)} />

      {/* Main Content */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 text-center px-6 relative z-10">
        {/* Black Hole Avatar Wrapper */}
        <div className="bh-wrapper mb-6 md:mb-10 scale-[0.85] md:scale-100 transition-all duration-1000">
          <div className="bh-disk-horizontal-glow"></div>
          <div className="bh-arc-top"></div>
          <div className="bh-arc-bottom"></div>
          <div className="bh-ring-inner"></div>
          <div className="bh-disk-horizontal"></div>
          <div className="bh-lens-flare left"></div>
          <div className="bh-lens-flare right"></div>
          <div className="bh-core flex items-center justify-center border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] group overflow-visible">
            {/* 智能奇点 Logo */}
            <Logo className="w-[120%] h-[120%]" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-outfit font-extrabold text-white tracking-tighter mb-4 leading-tight text-gradient">
          {SITE_CONFIG.identity.name.toUpperCase()}
        </h1>
        <p className="text-xl md:text-2xl font-light text-slate-500 mb-6 tracking-[0.4em] uppercase">
          {SITE_CONFIG.identity.role[lang]}
        </p>
        
        <div className="max-w-2xl mx-auto mb-10 h-12 flex items-center justify-center">
          <p className={`font-mono text-xs md:text-sm text-accent uppercase tracking-[0.25em] transition-opacity duration-1000 ${isTyping ? 'opacity-40' : 'opacity-100'}`}>
            <span className="opacity-40 mr-2">TERMINAL:</span> {greeting}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8">
          <button onClick={() => scrollToSection('works')} className="group relative px-12 py-4 rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-accent/20">
            <div className="absolute inset-0 bg-white transition-transform group-hover:scale-110" />
            <span className="relative text-dark-900 text-[11px] uppercase tracking-widest z-10">{t.hero.explore}</span>
          </button>
          <button onClick={() => scrollToSection('contact')} className="glass text-white px-12 py-4 rounded-full font-bold hover:bg-white/10 transition-all text-[11px] uppercase tracking-widest border-white/10">
            {t.hero.hello}
          </button>
        </div>
        
        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <section ref={worksRef} className="py-40 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-28 text-center">
            <span className="text-accent font-bold uppercase tracking-[0.6em] text-[10px] mb-6 block">[{t.works.tag}]</span>
            <h2 className="text-5xl md:text-7xl font-outfit font-bold text-white mb-8 leading-none tracking-tight">{t.works.title}</h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-8 rounded-full shadow-[0_0_15px_#3B82F6]"></div>
            <p className="text-slate-500 max-w-xl mx-auto font-light text-lg">{t.works.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} onOpenDetail={(p) => setSelectedProject(p)} />
            ))}
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="py-40 px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-12 bg-accent/5 rounded-[4rem] blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-dark-800">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" className="w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" />
            </div>
          </div>
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.6em] text-[10px] mb-8 block">[{t.about.tag}]</span>
            <h2 className="text-5xl font-outfit font-bold text-white mb-10 leading-tight tracking-tight">
              {SITE_CONFIG.bio.title[lang]}
            </h2>
            <div className="space-y-10 text-slate-400 font-light text-xl leading-relaxed">
              <p>{SITE_CONFIG.bio.p1[lang]}</p>
              <p>{SITE_CONFIG.bio.p2[lang]}</p>
            </div>
            
            <div className="mt-20 grid grid-cols-2 gap-x-12 gap-y-16">
              {SITE_CONFIG.bio.focus.map(item => (
                <div key={item.title} className="group/item">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-4 group-hover/item:text-accent transition-colors">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed border-l border-white/5 pl-4 group-hover/item:border-accent transition-colors">{item.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={contactRef} className="py-40 px-6 relative z-10">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-accent/10 to-purple-500/10 rounded-[4rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative glass rounded-[4rem] p-12 md:p-24 shadow-2xl border-white/10 overflow-hidden">
            <Contact lang={lang} />
          </div>
        </div>
      </section>

      <footer className="py-32 px-6 border-t border-white/5 bg-dark-900/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="text-2xl font-outfit font-bold text-white mb-10 tracking-[0.5em] uppercase">
            {SITE_CONFIG.identity.name}_<span className="text-accent">DEV</span>
          </div>
          <div className="flex flex-wrap justify-center gap-12 mb-16">
            {SITE_CONFIG.socials.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white font-bold text-[10px] uppercase tracking-[0.5em] transition-all hover:-translate-y-1">{s.label}</a>
            ))}
          </div>
          <p className="text-slate-800 text-[9px] font-bold uppercase tracking-[0.6em]">{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

