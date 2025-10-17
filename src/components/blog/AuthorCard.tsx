import { motion } from "framer-motion";
import { Mail, Globe } from "lucide-react";

interface AuthorCardProps {
  author: {
    name: string;
    avatar: string;
    bio: string;
    role: string;
    url?: string;
  };
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-6">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-24 h-24 rounded-full ring-4 ring-blue-200 dark:ring-blue-900 shadow-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            About the Author
          </h3>
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
            {author.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {author.role}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {author.bio}
          </p>
          {author.url && (
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Visit Website</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
