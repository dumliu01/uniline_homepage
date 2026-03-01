
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
    title: { en: 'TyperDog: Typing Game', zh: 'TyperDog: 打字狗' },
    description: { 
      en: 'A typing game that helps you improve your typing speed and accuracy.',
      zh: '一个打字游戏，帮助你提高打字速度和准确性。'
    },
    longDescription: {
      en: 'TyperDog is a typing game that helps you improve your typing speed and accuracy. It is a simple game that you can play to improve your typing speed and accuracy.',
      zh: '打字狗是一个打字游戏，帮助你提高打字速度和准确性。它是一个简单的游戏，你可以通过它来提高你的打字速度和准确性。'
    },
    category: 'Design',
    imageUrl: '/images/typerdog_screen_1.jpg',
    images: [
      '/images/typerdog_screen_2.jpg'
    ],
    techStack: ['React', 'Stable Diffusion', 'FastAPI', 'Three.js'],
    languages: ['TypeScript', 'Python', 'GLSL'],
    tools: ['Figma', 'TensorFlow', 'CUDA'],
    platforms: ['SaaS', 'Web'],
    codeUrl: 'https://github.com/dumliu/typerdog',
    demoUrl: 'https://www.uniline.site/typerdog'
  }
];
