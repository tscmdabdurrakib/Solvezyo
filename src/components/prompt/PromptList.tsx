import { PromptCard } from './PromptCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Prompt {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  likes: number;
  copied: number;
  model?: string;
  author?: {
    name: string;
    avatar: string;
  };
  createdAt?: string;
}

interface PromptListProps {
  prompts: Prompt[];
  onCopy: (id: number, text: string) => void;
  showAuthor?: boolean;
  showActions?: boolean;
  showDescription?: boolean;
  compact?: boolean;
  columns?: 1 | 2 | 3 | 4;
}

export function PromptList({
  prompts,
  onCopy,
  showAuthor = false,
  showActions = true,
  showDescription = true,
  compact = false,
  columns = 3
}: PromptListProps) {
  const getColumnClass = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className="space-y-6">
      <div className={`grid ${getColumnClass()} gap-6`}>
        {prompts.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PromptCard
              id={prompt.id}
              title={prompt.title}
              description={prompt.description}
              category={prompt.category}
              tags={prompt.tags}
              likes={prompt.likes}
              copied={prompt.copied}
              model={prompt.model}
              author={prompt.author}
              createdAt={prompt.createdAt}
              showAuthor={showAuthor}
              showActions={showActions}
              showDescription={showDescription}
              compact={compact}
            />
          </motion.div>
        ))}
      </div>
      
      {prompts.length > 0 && (
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            Load More Prompts
          </Button>
        </div>
      )}
    </div>
  );
}