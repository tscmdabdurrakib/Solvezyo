import React from "react";
import { Link } from "wouter";
import { CategoryWithIcon } from "@/data/categories";
import { motion } from "framer-motion";
import { tools } from "@/data/tools";

interface CategoryCardProps {
  category: CategoryWithIcon & { toolCount: number };
}

const CategoryCardComponent = ({ category }: CategoryCardProps) => {
  const { id, name, description, icon, color } = category;
  
  // Count the number of tools in this category dynamically
  const toolCount = tools.filter(tool => tool.category.id === id).length;


  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="block h-full w-full"
      onClick={() => {
        window.location.href = `/category/${id}`;
      }}
    >
      <div className={`category-card h-full w-full rounded-xl overflow-hidden bg-card border border-border transition-all duration-300 flex flex-col relative ${toolCount === 0 ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:shadow-xl hover:border-primary cursor-pointer'}`}>
        {toolCount === 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              Coming Soon
            </span>
          </div>
        )}
        <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-5">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg ${color.bg} ${color.text} flex-shrink-0`}
            >
              {icon}
            </div>
            <h3 className="text-base sm:text-lg font-semibold line-clamp-2 flex-1">{name}</h3>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mb-4 flex-1 line-clamp-3">{description}</p>
          <div className="flex justify-between items-center mt-auto">
            {toolCount > 0 && (
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${color.badge.bg} ${color.badge.text}`}
              >
                {toolCount} Tools
              </span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 sm:h-5 sm:w-5 ${toolCount === 0 ? 'text-muted-foreground' : 'text-primary'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CategoryCard = React.memo(CategoryCardComponent);
