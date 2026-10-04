
import { Project } from './types';

export interface LocalizedProject extends Omit<Project, 'title' | 'description' | 'longDescription'> {
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  longDescription: { en: string; zh: string };
}

/**
 * PROJECT CONFIGURATION
 * Add or edit your studio projects here.
 */
export const PROJECTS: LocalizedProject[] = [
  {
    id: '1',
    title: { en: 'Termcat-AI Terminal', zh: 'Termcat-AI 终端' },
    description: { 
      en: 'A terminal for AI agents.',
      zh: '一个自带 AI 智能体的终端。'
    },
    longDescription: {
      en: 'Termcat-AI is a terminal that comes with AI agents. It allows you to interact with AI agents in a terminal environment.',
      zh: 'Termcat-AI 是一个自带 AI 智能体的终端。它允许你与 AI 智能体在终端环境中交互。'
    },
    category: 'Cloud',
    imageUrl: '/images/termcat_screen_1.png',
    images: [
      '/images/termcat_screen_1.png',
      '/images/termcat_screen_2.png',
    ],
    techStack: ['React', 'LangChain', 'ai', 'golang'],
    languages: ['TypeScript', 'Python', 'GLSL'],
    tools: ['curos', 'claude code','gemini'],
    platforms: ['macos', 'windows'],
    codeUrl: 'https://github.com/uniline/termcat',
    demoUrl: 'https://termcat.uniline.site'
  },
  {
    id: '2',
    title: { en: 'Valbum: Your Photo Library', zh: 'Valbum：你的照片图库' },
    description: { 
      en: 'A home for your photos, across devices and your own storage.',
      zh: '让不同设备和自有存储中的照片汇聚一处。'
    },
    longDescription: {
      en: 'Valbum brings local and backed-up photos into one timeline. Browse by date, keep favorites close, and automatically back up new photos to your own NAS or supported cloud storage.',
      zh: 'Valbum 将本地与已备份的照片汇入同一条时间线。按日期浏览、收藏喜爱的照片，并将新照片自动备份到自己的 NAS 或支持的云端存储。'
    },
    category: 'App',
    imageUrl: '/images/valbum_browse_photos.png',
    images: [
      '/images/valbum_browse_photos.png'
    ],
    techStack: ['Flutter', 'Go', 'NAS'],
    languages: ['Dart', 'Go'],
    tools: ['Provider', 'Dio', 'PostgreSQL'],
    platforms: ['iOS', 'Android', 'macOS', 'Windows'],
    demoUrl: 'https://valbum.uniline.site/'
  },
  {
    id: '3',
    title: { en: 'TANK WARFARE', zh: 'TANK WARFARE 坦克大战' },
    description: {
      en: 'Classic tank battles in a 3D ruined city.',
      zh: '在 3D 废墟城市中重温经典坦克大战。'
    },
    longDescription: {
      en: 'Defend your base, break through walls, collect power-ups, and clear waves of enemy tanks across handcrafted levels in a browser-playable 3D battlefield.',
      zh: '守卫基地、击穿砖墙、收集道具，在可直接通过浏览器游玩的 3D 战场中逐关击退敌方坦克。'
    },
    category: 'Web',
    imageUrl: '/images/tank_warfare.png',
    images: ['/images/tank_warfare.png'],
    techStack: ['Three.js', 'WebGL', 'Vite'],
    languages: ['JavaScript'],
    tools: ['Web Audio API', 'Vite'],
    platforms: ['Desktop Browser', 'Mobile Browser'],
    demoUrl: 'https://tank.uniline.site/'
  }
];
