import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code, BrainCircuit, BarChart, Smartphone, Megaphone, ShieldCheck, Palette, PenTool, Bitcoin, Briefcase, GraduationCap, Heart } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categoryIcons: { [key: string]: React.ElementType } = {
  Tech: Code,
  Business: Briefcase,
  Design: Palette,
  Science: BrainCircuit,
  Marketing: Megaphone,
  Lifestyle: Heart,
  Education: GraduationCap,
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => onSelectCategory(null)}
          className="flex items-center gap-2"
        >
          All
        </Button>
      </motion.div>
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        return (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => onSelectCategory(category)}
              className="flex items-center gap-2"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {category}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CategoryFilter;