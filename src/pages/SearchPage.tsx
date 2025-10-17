import { useLocation } from "wouter";
import { useTools } from "@/context/ToolsContext";
import { ToolCard } from "@/components/ToolCard";
import { CategoryCard } from "@/components/CategoryCard";
import { useEffect, useState } from "react";
import { Tool } from "@/data/tools";
import { CategoryWithIcon } from "@/data/categories";

export default function SearchPage() {
  // Parse query from URL - using window.location since wouter doesn't pass query params
  const [location] = useLocation();
  console.log("Wouter location:", location);
  
  // Use window.location.search to get the query string
  const searchParams = new URLSearchParams(window.location.search);
  console.log("Window location search:", window.location.search);
  
  // Extract search query from URL
  const [query, setQuery] = useState(searchParams.get("q") || "");
  console.log("Initial query:", query);
  
  // Listen for URL changes
  useEffect(() => {
    // Update query when URL changes
    const handleUrlChange = () => {
      const newParams = new URLSearchParams(window.location.search);
      const newQuery = newParams.get("q") || "";
      console.log("URL changed, new query:", newQuery);
      setQuery(newQuery);
    };
    
    // Add event listener for URL changes
    window.addEventListener("popstate", handleUrlChange);
    
    // Cleanup
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);
  
  const { tools = [], categories = [] } = useTools() || { tools: [], categories: [] };
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<CategoryWithIcon[]>([]);
  
  // Perform search whenever query changes
  useEffect(() => {
    console.log("Search page effect running, query:", query);
    console.log("Tools available:", tools.length);
    console.log("Categories available:", categories.length);
    
    if (!query.trim()) {
      setFilteredTools([]);
      setFilteredCategories([]);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    // Search in tools
    const matchedTools = tools.filter(tool => 
      tool.name.toLowerCase().includes(lowerQuery) || 
      tool.description.toLowerCase().includes(lowerQuery)
    );
    console.log("Matched tools:", matchedTools.length);
    
    // Search in categories
    const matchedCategories = categories.filter(cat => 
      cat.name.toLowerCase().includes(lowerQuery) || 
      cat.description.toLowerCase().includes(lowerQuery)
    );
    console.log("Matched categories:", matchedCategories.length);
    
    setFilteredTools(matchedTools);
    setFilteredCategories(matchedCategories);
  }, [query, tools, categories]);
  
  const hasResults = filteredTools.length > 0 || filteredCategories.length > 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Search header */}
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-bold">Search results for "{query}"</h1>
          <p className="text-muted-foreground">
            Found {filteredTools.length} tools and {filteredCategories.length} categories
          </p>
        </div>
        
        {/* Categories section */}
        {filteredCategories.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}
        
        {/* Tools section */}
        {filteredTools.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}
        
        {/* No results */}
        {!hasResults && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any tools or categories matching your search.
              Try using different keywords or browse our categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
