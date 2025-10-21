import { LucideIcon } from 'lucide-react';
import { Code, BrainCircuit, BarChart, Smartphone, Megaphone, ShieldCheck, Palette, PenTool, Bitcoin, Briefcase } from 'lucide-react';

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  category: 'Tech' | 'Business' | 'Design' | 'Science' | 'Marketing' | 'Education' | 'Finance' | 'Career' | 'Lifestyle';
  icon: LucideIcon;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  thumbnail?: string;
  isComingSoon?: boolean;
}

export const roadmaps: Roadmap[] = [
  {
    id: 'web-development',
    title: 'Web Development Roadmap',
    description: 'A complete guide to becoming a modern web developer, covering frontend and backend technologies.',
    category: 'Tech',
    icon: Code,
    difficulty: 'Intermediate',
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning Roadmap',
    description: 'Explore the world of AI and ML, from basic concepts to advanced neural networks.',
    category: 'Science',
    icon: BrainCircuit,
    difficulty: 'Advanced',
  },
  {
    id: 'data-science',
    title: 'Data Science Roadmap',
    description: 'Learn how to extract insights from data using statistical analysis, and visualization.',
    category: 'Science',
    icon: BarChart,
    difficulty: 'Intermediate',
  },
  {
    id: 'app-development',
    title: 'App Development Roadmap',
    description: 'Master the skills to build beautiful and functional mobile apps for iOS and Android.',
    category: 'Tech',
    icon: Smartphone,
    difficulty: 'Intermediate',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Roadmap',
    description: 'Your guide to SEO, content marketing, social media, and other essential digital marketing skills.',
    category: 'Marketing',
    icon: Megaphone,
    difficulty: 'Beginner',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Roadmap',
    description: 'Understand the principles of cybersecurity and learn how to protect systems from digital attacks.',
    category: 'Tech',
    icon: ShieldCheck,
    difficulty: 'Advanced',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design Roadmap',
    description: 'A step-by-step guide to visual communication, branding, and design principles.',
    category: 'Design',
    icon: Palette,
    difficulty: 'Beginner',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Roadmap',
    description: 'Learn to create intuitive and user-friendly digital experiences with this comprehensive guide.',
    category: 'Design',
    icon: PenTool,
    difficulty: 'Intermediate',
  },
  {
    id: 'blockchain-crypto',
    title: 'Blockchain & Crypto Roadmap',
    description: 'Dive into the world of decentralized technology, cryptocurrencies, and smart contracts.',
    category: 'Finance',
    icon: Bitcoin,
    difficulty: 'Advanced',
    isComingSoon: true,
  },
  {
    id: 'freelancing-remote-career',
    title: 'Freelancing & Remote Career Roadmap',
    description: 'Your path to a successful freelance or remote career, from finding clients to managing finances.',
    category: 'Career',
    icon: Briefcase,
    difficulty: 'Beginner',
    isComingSoon: true,
  },
  {
    id: 'healthy-lifestyle',
    title: 'Healthy Lifestyle Roadmap',
    description: 'A guide to improving your physical and mental well-being through diet, exercise, and mindfulness.',
    category: 'Lifestyle',
    icon: Briefcase, // Placeholder icon, replace with a more suitable one if available
    difficulty: 'Beginner',
  },
  {
    id: 'modern-education',
    title: 'Modern Education Roadmap',
    description: 'Explore innovative learning strategies, online resources, and skill development for the future.',
    category: 'Education',
    icon: Briefcase, // Placeholder icon, replace with a more suitable one if available
    difficulty: 'Beginner',
  },
];