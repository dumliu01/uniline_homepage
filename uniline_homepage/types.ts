
export type ProjectCategory = 'Web' | 'App' | 'Cloud' | 'Design';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  imageUrl: string; 
  images?: string[]; 
  techStack: string[];
  // Technical Specifications
  languages: string[];
  tools: string[];
  platforms: string[];
  codeUrl?: string;
  demoUrl?: string;
}
