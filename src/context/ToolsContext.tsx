import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import { apiRequest } from '@/lib/queryClient';

// Make categories and tools available directly
export { categories, tools };

interface ToolsContextType {
  categories: typeof categories;
  tools: typeof tools;
  popularTools: typeof tools;
  recentTools: typeof tools;
  isLoading: boolean;
  error: Error | null;
}

export const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [popularTools, setPopularTools] = useState(tools.slice(0, 4));
  const [recentTools, setRecentTools] = useState(tools.slice(4, 7));

  useEffect(() => {
    async function fetchToolData() {
      try {
        setIsLoading(true);
        
        // Fetch data from the server if needed
        /*
        const response = await apiRequest('GET', '/api/tools', undefined);
        const data = await response.json();
        setTools(data);
        */
        
        // For now, we'll just simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching tool data:', err);
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setIsLoading(false);
      }
    }

    fetchToolData();
  }, []);

  // Log for debugging
  console.log("ToolsProvider rendering with categories:", categories.length);
  
  const contextValue: ToolsContextType = {
    categories: categories || [],
    tools: tools || [],
    popularTools: popularTools || [],
    recentTools: recentTools || [],
    isLoading: isLoading,
    error: error
  };
  
  return (
    <ToolsContext.Provider value={contextValue}>
      {children}
    </ToolsContext.Provider>
  );
}

export function useTools() {
  const context = useContext(ToolsContext);
  // Instead of throwing an error, return a safe default
  if (context === undefined) {
    console.warn('useTools must be used within a ToolsProvider');
    return {
      categories: [],
      tools: [],
      popularTools: [],
      recentTools: [],
      isLoading: false,
      error: null
    };
  }
  return context;
}