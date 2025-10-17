import { Link } from "wouter";
import { Tool } from "@/data/tools";
import { motion } from "framer-motion";

interface RecentToolCardProps {
  tool: Tool;
  daysAgo: number;
}

export function RecentToolCard({ tool, daysAgo }: RecentToolCardProps) {
  return (
    <Link to={`/tools/${tool.id}`}>
      <motion.div 
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="block w-full h-full"
      >
        <div className="flex flex-col sm:flex-row bg-card rounded-xl overflow-hidden border border-border hover:border-primary shadow-sm hover:shadow-lg transition-all duration-300 group h-full">
          <div className={`w-full sm:w-20 h-20 sm:h-auto ${tool.gradient} flex items-center justify-center flex-shrink-0`}>
            <div className="text-white">
              {tool.icon}
            </div>
          </div>
          <div className="p-3 sm:p-4 flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-2 flex-1 pr-2">{tool.name}</h3>
              <span className={`text-xs ${tool.category.color.badge.bg} ${tool.category.color.badge.text} px-2 py-0.5 rounded-full font-medium flex-shrink-0`}>
                New
              </span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm mb-3 flex-1 line-clamp-2 sm:line-clamp-3">{tool.description}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Added {daysAgo} {daysAgo === 1 ? 'day' : 'days'} ago
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
