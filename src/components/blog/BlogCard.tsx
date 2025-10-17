import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Calendar, User, Eye, ArrowRight } from "lucide-react";

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    tags: string[];
    readingTime: number;
    author: {
      name: string;
      avatar: string;
      role: string;
    };
    date: string;
    views: number;
  };
  index: number;
}

export function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${blog.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col">
          {/* Featured Image */}
          <div className="relative overflow-hidden h-56">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {blog.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors">
              {blog.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
              {blog.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

            {/* Author & Meta Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-10 h-10 rounded-full ring-2 ring-blue-100 dark:ring-blue-900"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {blog.author.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Meta */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readingTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{blog.views.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-blue-500 group-hover:gap-2 transition-all">
                <span className="text-sm font-medium">Read more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
