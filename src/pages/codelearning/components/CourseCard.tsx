import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Code, Server, Palette, Cpu } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  link: string;
  icon: "html" | "css" | "js" | "react" | "nodejs";
}

const iconMap = {
  html: BookOpen,
  css: Palette,
  js: Code,
  react: Cpu,
  nodejs: Server,
};

export function CourseCard({ title, description, link, icon }: CourseCardProps) {
  const IconComponent = iconMap[icon];
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <Link to={link} className="block h-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <IconComponent className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <button className="text-primary hover:text-primary/80 font-medium flex items-center">
            Start Learning
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </Link>
    </motion.div>
  );
}