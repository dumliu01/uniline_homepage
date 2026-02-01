
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center group ${className}`}>
      {/* 核心能量场 - 增强背景氛围 */}
      <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full animate-pulse-slow"></div>
      
      <svg 
        viewBox="0 0 100 100" 
        className="w-[90%] h-[90%] z-10 overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 核心发光渐变 */}
          <radialGradient id="core-light" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* 玻璃感描边渐变 */}
          <linearGradient id="glass-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.1)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.4)" />
          </linearGradient>

          {/* 发光滤镜 */}
          <filter id="hyper-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. 背景几何网格 - 体现精密性 */}
        <g className="opacity-20">
          <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="0.1" strokeDasharray="1 3" />
          <path d="M50 2V98M2 50H98" stroke="white" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="0.1" strokeDasharray="4 2" />
        </g>

        {/* 2. 外部主旋转轨道 - 分段式设计，更具工业感 */}
        <g className="animate-spin-slow" style={{ transformOrigin: '50% 50%' }}>
          <path 
            d="M50 10A40 40 0 0 1 90 50" 
            stroke="url(#glass-stroke)" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          <path 
            d="M50 90A40 40 0 0 1 10 50" 
            stroke="url(#glass-stroke)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            className="opacity-60"
          />
          {/* 轨道上的数据节点 */}
          <circle cx="90" cy="50" r="1.5" fill="white" filter="url(#hyper-glow)" />
          <circle cx="10" cy="50" r="1.5" fill="white" filter="url(#hyper-glow)" />
        </g>

        {/* 3. 中层反向轨道 - 动态流光 */}
        <g className="animate-spin-reverse" style={{ transformOrigin: '50% 50%' }}>
          <circle 
            cx="50" cy="50" r="30" 
            stroke="#3B82F6" 
            strokeWidth="0.5" 
            strokeDasharray="40 148" 
            className="opacity-80"
          />
          <circle 
            cx="50" cy="50" r="30" 
            stroke="white" 
            strokeWidth="1" 
            strokeDasharray="1 187" 
            filter="url(#hyper-glow)"
          />
        </g>

        {/* 4. 核心几何体 - 抽象的 "U" 形负空间 */}
        <g filter="url(#hyper-glow)">
          {/* 使用几何块拼合出一种“向上流动的单线”感，而非直接写字 */}
          <path 
            d="M40 35V60C40 65.5 44.5 70 50 70C55.5 70 60 65.5 60 60V35" 
            stroke="white" 
            strokeWidth="6" 
            strokeLinecap="round" 
            className="opacity-20"
          />
          <path 
            d="M40 35V60C40 65.5 44.5 70 50 70C55.5 70 60 65.5 60 60V35" 
            stroke="#3B82F6" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            className="animate-pulse"
          />
          
          {/* 奇点核心 - 视觉中心点 */}
          <circle cx="50" cy="60" r="4" fill="url(#core-light)" className="animate-ping-slow" />
          <circle cx="50" cy="60" r="2.5" fill="white" />
        </g>

        {/* 5. 装饰性扫描弧线 */}
        <path 
          d="M30 30L35 35M65 30L60 35M30 70L35 65M65 70L60 65" 
          stroke="white" 
          strokeWidth="0.5" 
          className="opacity-40"
        />
      </svg>

      {/* 顶部高光玻璃罩效果 */}
      <div className="absolute inset-0 z-20 rounded-full border border-white/5 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; filter: blur(60px); }
          50% { opacity: 0.5; filter: blur(40px); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 8s linear infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          transform-origin: 50px 60px;
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default Logo;
