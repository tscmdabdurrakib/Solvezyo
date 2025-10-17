import React from "react";
import { Link } from "wouter";
import { Tool } from "@/data/tools";
import { motion } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

// Diverse color palette for tool cards
const toolColors = [
  { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", badge: { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-700 dark:text-blue-300" } },
  { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400", badge: { bg: "bg-purple-100 dark:bg-purple-900/50", text: "text-purple-700 dark:text-purple-300" } },
  { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-600 dark:text-pink-400", badge: { bg: "bg-pink-100 dark:bg-pink-900/50", text: "text-pink-700 dark:text-pink-300" } },
  { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-400", badge: { bg: "bg-rose-100 dark:bg-rose-900/50", text: "text-rose-700 dark:text-rose-300" } },
  { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400", badge: { bg: "bg-orange-100 dark:bg-orange-900/50", text: "text-orange-700 dark:text-orange-300" } },
  { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", badge: { bg: "bg-amber-100 dark:bg-amber-900/50", text: "text-amber-700 dark:text-amber-300" } },
  { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-600 dark:text-yellow-400", badge: { bg: "bg-yellow-100 dark:bg-yellow-900/50", text: "text-yellow-700 dark:text-yellow-300" } },
  { bg: "bg-lime-100 dark:bg-lime-900/30", text: "text-lime-600 dark:text-lime-400", badge: { bg: "bg-lime-100 dark:bg-lime-900/50", text: "text-lime-700 dark:text-lime-300" } },
  { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400", badge: { bg: "bg-green-100 dark:bg-green-900/50", text: "text-green-700 dark:text-green-300" } },
  { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", badge: { bg: "bg-emerald-100 dark:bg-emerald-900/50", text: "text-emerald-700 dark:text-emerald-300" } },
  { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-600 dark:text-teal-400", badge: { bg: "bg-teal-100 dark:bg-teal-900/50", text: "text-teal-700 dark:text-teal-300" } },
  { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600 dark:text-cyan-400", badge: { bg: "bg-cyan-100 dark:bg-cyan-900/50", text: "text-cyan-700 dark:text-cyan-300" } },
  { bg: "bg-sky-100 dark:bg-sky-900/30", text: "text-sky-600 dark:text-sky-400", badge: { bg: "bg-sky-100 dark:bg-sky-900/50", text: "text-sky-700 dark:text-sky-300" } },
  { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400", badge: { bg: "bg-indigo-100 dark:bg-indigo-900/50", text: "text-indigo-700 dark:text-indigo-300" } },
  { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400", badge: { bg: "bg-violet-100 dark:bg-violet-900/50", text: "text-violet-700 dark:text-violet-300" } },
  { bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30", text: "text-fuchsia-600 dark:text-fuchsia-400", badge: { bg: "bg-fuchsia-100 dark:bg-fuchsia-900/50", text: "text-fuchsia-700 dark:text-fuchsia-300" } },
];

// Hash function to get consistent color index from tool ID
const getColorIndexFromId = (id: string): number => {
  if (!id) return 0;
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % toolColors.length;
};

const ToolCardComponent = ({ tool }: ToolCardProps) => {
  // Add safety checks for required properties
  const { id, name, description, category, icon } = tool;
  
  // Ensure we have valid data
  const toolId = id || `tool-${Math.random()}`;
  const toolName = name || "Unnamed Tool";
  const toolDescription = description || "No description available";
  const toolCategory = category || { name: "Uncategorized", color: toolColors[0] };
  const toolIcon = icon || <div className="w-6 h-6" />; // Fallback icon
  
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isToolFavorite = isFavorite(toolId);

  // Get unique color for this tool based on its ID
  const toolColor = toolColors[getColorIndexFromId(toolId)];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isToolFavorite) {
      removeFavorite(toolId);
    } else {
      addFavorite(tool);
    }
  };
  
  return (
    <Link to={`/tools/${toolId}`} className="block h-full w-full">
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col relative cursor-pointer"
      >
        {/* Favorite Heart Icon - Top Right */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-200"
          aria-label={isToolFavorite ? "Remove from favorites" : "Add to favorites"}
          data-testid={`favorite-${toolId}`}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              isToolFavorite ? "text-red-500 fill-current" : "text-gray-400 dark:text-gray-500"
            }`}
          />
        </button>

        <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
          {/* Icon and Title with unique color */}
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-5">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg ${toolColor.bg} ${toolColor.text} flex-shrink-0`}
            >
              {toolIcon}
            </div>
            <h3 className="text-base sm:text-lg font-semibold line-clamp-2 flex-1 pr-6">{toolName}</h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-xs sm:text-sm mb-4 flex-1 line-clamp-3">{toolDescription}</p>

          {/* Category Badge and Arrow */}
          <div className="flex justify-between items-center mt-auto">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${toolCategory.color?.badge?.bg || 'bg-gray-100'} ${toolCategory.color?.badge?.text || 'text-gray-700'}`}
            >
              {toolCategory.name || "Category"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
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
      </motion.div>
    </Link>
  );
};

export const ToolCard = React.memo(ToolCardComponent);