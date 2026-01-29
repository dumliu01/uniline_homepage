
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
    title: { en: 'Aura Intelligence OS', zh: 'Aura 智能系统' },
    description: { 
      en: 'A multi-agent operating layer for autonomous business workflows.',
      zh: '用于自主业务工作流的多智能体运行层。'
    },
    longDescription: {
      en: 'Aura is UNILINE\'s flagship AI orchestration platform. It allows enterprises to deploy "swarms" of specialized agents that collaborate to solve complex data analysis and customer service tasks using RAG and cognitive reasoning.',
      zh: 'Aura 是 UNILINE 的旗舰 AI 编排平台。它允许企业部署“智能体集群”，通过 RAG 和认知推理协作解决复杂的数据分析和客户服务任务。'
    },
    category: 'Cloud',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1684369175833-000c6f620e29?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200'
    ],
    techStack: ['Python', 'LangChain', 'Next.js', 'VectorDB'],
    languages: ['TypeScript', 'Python', 'Rust'],
    tools: ['Gemini API', 'PyTorch', 'Docker'],
    platforms: ['Web', 'Enterprise Cloud'],
    codeUrl: 'https://github.com/uniline',
    demoUrl: 'https://example.com'
  },
  {
    id: '2',
    title: { en: 'GenV: Creative Engine', zh: 'GenV: 创意引擎' },
    description: { 
      en: 'Real-time multi-modal generation for brand storytelling.',
      zh: '用于品牌叙事的实时多模态生成引擎。'
    },
    longDescription: {
      en: 'GenV is a creative suite that bridges text-to-visual workflows. Our studio developed proprietary fine-tuning pipelines to ensure consistent brand aesthetics across generated images, videos, and UI components.',
      zh: 'GenV 是一个连接文本到视觉工作流的创意套件。我们工作室开发了专有的微调流水线，以确保生成的图像、视频和 UI 组件具有一致的品牌美感。'
    },
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200'
    ],
    techStack: ['React', 'Stable Diffusion', 'FastAPI', 'Three.js'],
    languages: ['TypeScript', 'Python', 'GLSL'],
    tools: ['Figma', 'TensorFlow', 'CUDA'],
    platforms: ['SaaS', 'Web'],
    codeUrl: 'https://github.com/uniline',
    demoUrl: 'https://example.com'
  }
];
