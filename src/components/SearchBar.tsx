import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, X as XIcon } from "lucide-react";
import { useTools } from "@/context/ToolsContext";
import { useLocation } from "wouter";
// Import directly from data files for fallback
import { tools, Tool } from "@/data/tools";
import { categories, CategoryWithIcon } from "@/data/categories";

interface Suggestion {
  text: string;
  type: "tool" | "category" | "general";
  id?: string;
}

interface SearchBarProps {
  onSearchSubmit?: () => void;
  className?: string;
  variant?: 'button' | 'input';
}

export function SearchBar({ onSearchSubmit, className, variant = 'button' }: SearchBarProps = {}) {
  // Try to get data from context, or use the imported data as fallback
  const contextData = useTools() || { tools: tools, categories: categories };
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();

  // Generate dynamic suggestions based on user input
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const newSuggestions: Suggestion[] = [];
    
    // Find matching tools
    const matchedTools = (contextData?.tools || []).filter(tool => 
      tool.name.toLowerCase().includes(lowerQuery) || 
      tool.description.toLowerCase().includes(lowerQuery)
    );
    
    // Add top 2 tool matches
    matchedTools.slice(0, 100).forEach(tool => {
      newSuggestions.push({
        text: tool.name,
        type: "tool",
        id: tool.id
      });
    });
    
    // Find matching categories
    const matchedCategories = (contextData?.categories || []).filter(cat => 
      cat.name.toLowerCase().includes(lowerQuery) || 
      cat.description.toLowerCase().includes(lowerQuery)
    );
    
    // Add top 2 category matches
    matchedCategories.slice(0, 5).forEach(category => {
      newSuggestions.push({
        text: category.name,
        type: "category",
        id: category.id
      });
    });
    
    // Add contextual suggestions
    if (matchedTools.length === 0 && matchedCategories.length === 0) {
      // Only add these if we don't have direct matches
      if (lowerQuery.includes("convert")) {
        const category = (contextData?.categories || []).find(c => c.name.toLowerCase().includes("conversion"));
        newSuggestions.push({
          text: "Unit Conversion Tools",
          type: "general",
          id: category?.id
        });
      }
      
      if (lowerQuery.includes("text") || lowerQuery.includes("string")) {
        const category = (contextData?.categories || []).find(c => c.name.toLowerCase().includes("text"));
        newSuggestions.push({
          text: "Text & String Tools",
          type: "general",
          id: category?.id
        });
      }
      
      if (lowerQuery.includes("image") || lowerQuery.includes("picture")) {
        const category = (contextData?.categories || []).find(c => c.name.toLowerCase().includes("image"));
        newSuggestions.push({
          text: "Image & Media Tools",
          type: "general",
          id: category?.id
        });
      }
    }
    
    // Always add a general search suggestion
    newSuggestions.push({
      text: `Search for "${query}"`,
      type: "general"
    });
    
    setSuggestions(newSuggestions);
  }, [query]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleSearch() {
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      
      // Call the optional callback if provided (to close mobile menu)
      if (onSearchSubmit) {
        onSearchSubmit();
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleSuggestionClick(suggestion: Suggestion) {
    if (suggestion.type === "tool" && suggestion.id) {
      // Navigate directly to the tool
      setLocation(`/tools/${suggestion.id}`);
    } else if (suggestion.type === "category" && suggestion.id) {
      // Navigate directly to the category
      setLocation(`/category/${suggestion.id}`);
    } else {
      // General search - show all results
      const searchQuery = suggestion.text === `Search for "${query}"` ? query : suggestion.text;
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    setIsOpen(false);
    
    // Call the callback to hide mobile menu if provided
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  }

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {variant === 'button' ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center text-muted-foreground hover:text-foreground p-2 transition-colors"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      ) : (
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for tools and categories..."
            className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"
            onClick={() => setIsOpen(true)}
            onFocus={() => setIsOpen(true)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}

      {isOpen && (
        <div className={`absolute top-full mt-2 right-0 w-full max-w-full min-w-max bg-card shadow-xl rounded-lg border border-border z-50 overflow-hidden ${variant === 'input' ? 'sm:w-full' : 'sm:w-72'}`}>
          <div className="flex items-center p-3 border-b border-border bg-muted/30">
            <SearchIcon className="h-4 w-4 mr-2 text-primary" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search for tools and categories..."
              className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground/70"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground mr-1"
                title="Clear search"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            )}
            {/* <button */}
              {/* onClick={() => setIsOpen(false)} */}
              {/* className="text-muted-foreground hover:text-foreground" */}
              {/* title="Close search" */}
            {/* > */}
              {/* <XIcon className="h-4 w-4" /> */}
            {/* </button> */}
          </div>

          {suggestions.length > 0 && (
            <div className="p-2 search-suggestions-container">
              <div className="text-xs text-muted-foreground px-2 py-1">Suggestions</div>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded-md text-sm transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.type === "tool" && (
                        <>
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <span>{suggestion.text}</span>
                            <span className="ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">Tool</span>
                          </span>
                        </>
                      )}
                      {suggestion.type === "category" && (
                        <>
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span>{suggestion.text}</span>
                            <span className="ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">Category</span>
                          </span>
                        </>
                      )}
                      {suggestion.type === "general" && (
                        <>
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.3-4.3" />
                            </svg>
                            <span>{suggestion.text}</span>
                          </span>
                        </>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {query && suggestions.length === 0 && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No results found for "{query}"
            </div>
          )}
          
          {!query && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              Type to search for tools and categories
            </div>
          )}
        </div>
      )}
    </div>
  );
}
