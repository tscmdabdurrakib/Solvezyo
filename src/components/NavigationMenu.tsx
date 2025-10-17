import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  NavigationMenuViewport 
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import { ChevronUp, ChevronRight, Info, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart } from 'lucide-react';

export function MainNavigationMenu() {
  const [_location, setLocation] = useLocation();
  const { favorites } = useFavorites();

  // Group tools by category ID
  const toolsByCategory: Record<string, typeof tools> = {};
  tools.forEach(tool => {
    const categoryId = tool.category.id;
    if (!toolsByCategory[categoryId]) {
      toolsByCategory[categoryId] = [];
    }
    toolsByCategory[categoryId].push(tool);
  });

  return (
    <>
      {/* Desktop and Tablet Navigation - Redesigned Modern Menu */}
      <div className="hidden md:block">
        {/* <div className="flex items-center space-x-4"> */}
        <div className="flex items-center justify-center space-x-4">
          {/* About Us Link */}
          <a 
            href="/about"
            className="flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary/60"
          >
            <Info className="w-4 h-4 mr-1.5 text-primary" />
            About Us
          </a>
        

          {/* Dropdown menu with smooth animation */}
          <div className="relative">
            <button className="nav-dropdown-trigger nav-btn flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary/60">
              <LayoutGrid className="w-4 h-4 mr-1.5 text-primary" />
              Categories
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            {/* Animated dropdown content */}
            <div className="nav-dropdown absolute left-0 z-50 w-[800px] p-4 mt-1 -translate-x-1/4 bg-popover shadow-lg rounded-xl border border-border">
              <div className="grid grid-cols-3 gap-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => setLocation(`/category/${category.id}`)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg cursor-pointer",
                      "bg-card hover:bg-secondary/70 transition-colors hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center">
                      <span className={cn("mr-2 text-lg", category.color.text)}>{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    {/* <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/50 text-foreground/80">
                      {toolsByCategory[category.id]?.length || 0} tools
                    </span> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Enhanced regular menu items */}
          {/* <button
            onClick={() => setLocation("/popular")}
            className="nav-btn px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary/60"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              Popular Tools
            </span>
          </button> */}
          
          <button
            onClick={() => setLocation("/blog")}
            className="nav-btn px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary/60"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Blog
           </span>
         </button>

         <button
           onClick={() => setLocation("/favorite-tools")}
           className="nav-btn px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary/60 relative"
         >
           <span className="flex items-center">
             <Heart className="w-4 h-4 mr-1.5 text-primary" />
             Favorites
             {favorites.length > 0 && (
               <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                 {favorites.length}
               </span>
             )}
           </span>
         </button>
       </div>
     </div>

     {/* Mobile Navigation - Simplified dropdown list with scrolling */}
      <div className="md:hidden">
        <div className="px-4 pb-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <MobileNav categories={categories} toolsByCategory={toolsByCategory} />
          
          {/* Show "View All Categories" button at the bottom */}
          <div className="mt-4 mb-2">
            <button
              className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90"
              onClick={() => setLocation("/categories")}
            >
              View All Categories
            </button>
          </div>
        </div>
      </div>


    </>
  );
}

// Mobile navigation component with accordion style dropdowns and category grouping
function MobileNav({ 
  categories, 
  toolsByCategory 
}: { 
  categories: typeof import('@/data/categories').categories, 
  toolsByCategory: Record<string, typeof import('@/data/tools').tools> 
}) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [_location, setLocation] = useLocation();
  const [activeGroup, setActiveGroup] = useState<string>("popular");
  
  // Group categories for easier mobile navigation
  const categoryGroups = {
    popular: categories.slice(0, 8),
    media: categories.filter(c => 
      c.name.toLowerCase().includes("image") || 
      c.name.toLowerCase().includes("video") || 
      c.name.toLowerCase().includes("audio") ||
      c.name.toLowerCase().includes("media")
    ),
    data: categories.filter(c => 
      c.name.toLowerCase().includes("data") || 
      c.name.toLowerCase().includes("file") || 
      c.name.toLowerCase().includes("convert")
    ),
    dev: categories.filter(c => 
      c.name.toLowerCase().includes("code") || 
      c.name.toLowerCase().includes("developer") || 
      c.name.toLowerCase().includes("programming")
    ),
    other: categories
  };
  
  // Get the currently active categories based on selected group
  const activeCategoriesList = activeGroup === "all" 
    ? categories 
    : categoryGroups[activeGroup as keyof typeof categoryGroups] || categories.slice(0, 8);
  
  return (
    <div className="space-y-4">
      {/* Category group selector */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-secondary/30 rounded-lg mb-3">
        {["popular", "media", "data", "dev", "all"].map(group => (
          <button
            key={group}
            className={cn(
              "py-1.5 px-1 text-xs font-medium rounded-md text-center capitalize",
              activeGroup === group ? "bg-primary text-white" : "bg-card/80 hover:bg-card"
            )}
            onClick={() => setActiveGroup(group)}
          >
            {group}
          </button>
        ))}
      </div>
    
      {/* Categories list */}
      <div className="space-y-2">
        {activeCategoriesList.map((category: import('@/data/categories').CategoryWithIcon) => (
          <div key={category.id} className="border rounded-lg overflow-hidden">
            <button
              className={cn(
                "flex items-center justify-between w-full p-3 text-left",
                openCategory === category.id ? `${category.color.bg} ${category.color.text}` : "bg-card"
              )}
              onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
            >
              <div className="flex items-center">
                <span className="mr-2">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs px-2 py-0.5 mr-2 rounded-full bg-secondary/50 text-foreground/80">
                  {toolsByCategory[category.id]?.length || 0}
                </span>
                <ChevronUp
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    openCategory === category.id ? "rotate-0" : "rotate-180"
                  )}
                />
              </div>
            </button>
            
            <AnimatePresence>
              {openCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-2 space-y-1.5 bg-card/50">
                    <div className="max-h-[35vh] overflow-y-auto custom-scrollbar pr-1">
                      <div className="grid grid-cols-1 gap-1.5">
                        {toolsByCategory[category.id]?.slice(0, 8)?.map((tool) => (
                          <button
                            key={tool.id}
                            className="flex items-center w-full p-2 rounded-md hover:bg-secondary/50 text-left"
                            onClick={() => {
                              setLocation(`/tool/${tool.id}`);
                              setOpenCategory(null);
                            }}
                          >
                            <span className="mr-2 text-primary flex-shrink-0">{tool.icon}</span>
                            <span className="text-sm truncate">{tool.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <button
                        className="w-full rounded-md bg-primary/10 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                        onClick={() => {
                          setLocation(`/category/${category.id}`);
                          setOpenCategory(null);
                        }}
                      >
                        View All {category.name} Tools ({toolsByCategory[category.id]?.length || 0})
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
