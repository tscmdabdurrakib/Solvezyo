import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Search, Filter, ChevronDown, TrendingUp, Star, Copy, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PromptCard } from '@/components/prompt/PromptCard';

const PromptsPage = () => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [location] = useLocation();

  // Mock data for prompts
  useEffect(() => {
    const mockPrompts = [
      {
        id: 1,
        title: "Creative Story Generator",
        description: "Generate unique and creative story ideas with unexpected plot twists.",
        category: "Writing",
        tags: ["ChatGPT", "Storytelling", "Creative"],
        likes: 124,
        copied: 42,
        model: "ChatGPT"
      },
      {
        id: 2,
        title: "Code Explainer",
        description: "Explains complex code in simple terms for beginners.",
        category: "Coding",
        tags: ["Programming", "Education", "Beginner"],
        likes: 89,
        copied: 37,
        model: "Codex"
      },
      {
        id: 3,
        title: "Marketing Copywriter",
        description: "Create compelling marketing copy that converts visitors into customers.",
        category: "Marketing",
        tags: ["Copywriting", "Sales", "Advertising"],
        likes: 210,
        copied: 98,
        model: "ChatGPT"
      },
      {
        id: 4,
        title: "Image Prompt Creator",
        description: "Generate detailed prompts for creating stunning images with AI.",
        category: "Design",
        tags: ["Midjourney", "DALL-E", "Visual"],
        likes: 156,
        copied: 72,
        model: "Midjourney"
      },
      {
        id: 5,
        title: "Business Strategy Advisor",
        description: "Provides strategic business advice and competitive analysis.",
        category: "Business",
        tags: ["Strategy", "Consulting", "Analysis"],
        likes: 187,
        copied: 65,
        model: "ChatGPT"
      },
      {
        id: 6,
        title: "Language Translator",
        description: "Accurate translation between multiple languages with cultural context.",
        category: "Language",
        tags: ["Translation", "Multilingual", "Culture"],
        likes: 142,
        copied: 88,
        model: "ChatGPT"
      },
      {
        id: 7,
        title: "Academic Research Assistant",
        description: "Help structure research papers and find relevant sources.",
        category: "Education",
        tags: ["Research", "Academic", "Writing"],
        likes: 92,
        copied: 41,
        model: "ChatGPT"
      },
      {
        id: 8,
        title: "Social Media Content Creator",
        description: "Generate engaging social media posts for various platforms.",
        category: "Marketing",
        tags: ["Social Media", "Content", "Engagement"],
        likes: 178,
        copied: 120,
        model: "ChatGPT"
      },
      {
        id: 9,
        title: "Python Code Generator",
        description: "Generate Python code snippets for common programming tasks.",
        category: "Coding",
        tags: ["Python", "Programming", "Automation"],
        likes: 205,
        copied: 150,
        model: "Codex"
      },
      {
        id: 10,
        title: "Email Newsletter Writer",
        description: "Craft professional email newsletters with compelling content.",
        category: "Writing",
        tags: ["Email", "Newsletter", "Marketing"],
        likes: 134,
        copied: 89,
        model: "ChatGPT"
      }
    ];
    setPrompts(mockPrompts);
    setFilteredPrompts(mockPrompts);
  }, []);

  // Filter and sort prompts
  useEffect(() => {
    let result = [...prompts];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(prompt => 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(prompt => selectedCategories.includes(prompt.category));
    }
    
    // Apply sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    // Apply filter based on query parameter
    const urlParams = new URLSearchParams(location.split('?')[1]);
    const filterParam = urlParams.get('filter');
    
    if (filterParam === 'featured') {
      // For featured, we'll show the first 3 prompts
      result = result.slice(0, 3);
    } else if (filterParam === 'trending') {
      // For trending, we'll sort by copied count and show top prompts
      result.sort((a, b) => b.copied - a.copied);
    }
    
    setFilteredPrompts(result);
  }, [searchTerm, selectedCategories, sortBy, prompts, location]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const categories = ["Writing", "Coding", "Marketing", "Design", "Business", "Education"];
  const models = ["ChatGPT", "Midjourney", "DALL-E", "Claude", "Gemini"];

  // Get filter title based on query parameter
  const getFilterTitle = () => {
    const urlParams = new URLSearchParams(location.split('?')[1]);
    const filterParam = urlParams.get('filter');
    
    if (filterParam === 'featured') {
      return 'Featured Prompts';
    } else if (filterParam === 'trending') {
      return 'Trending This Week';
    }
    return 'All Prompts';
  };

  // Get filter description based on query parameter
  const getFilterDescription = () => {
    const urlParams = new URLSearchParams(location.split('?')[1]);
    const filterParam = urlParams.get('filter');
    
    if (filterParam === 'featured') {
      return 'Handpicked prompts by our team';
    } else if (filterParam === 'trending') {
      return 'Most copied prompts this week';
    }
    return 'Browse all AI prompts';
  };

  // Get trending stats
  const getTrendingStats = () => {
    if (!location.includes('filter=trending')) return null;
    
    const totalCopies = filteredPrompts.reduce((sum, prompt) => sum + prompt.copied, 0);
    const totalLikes = filteredPrompts.reduce((sum, prompt) => sum + prompt.likes, 0);
    const avgCopies = filteredPrompts.length > 0 ? Math.round(totalCopies / filteredPrompts.length) : 0;
    
    return { totalCopies, totalLikes, avgCopies };
  };

  const trendingStats = getTrendingStats();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 sm:py-8">
        <div className="mb-5 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{getFilterTitle()}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {getFilterDescription()}
          </p>
        </div>
        
        {/* Trending Stats Banner */}
        {location.includes('filter=trending') && trendingStats && (
          <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center mb-3 sm:mb-0">
                  <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2 sm:mr-3" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">This Week's Trends</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Top performing prompts in the community</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-primary mr-1" />
                      <span className="text-lg sm:text-2xl font-bold">{trendingStats.totalCopies}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Copies</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-primary mr-1" />
                      <span className="text-lg sm:text-2xl font-bold">{trendingStats.totalLikes}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Likes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary mr-1" />
                      <span className="text-lg sm:text-2xl font-bold">{trendingStats.avgCopies}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Avg. Copies</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 sm:space-y-6">
                <div>
                  <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label
                          htmlFor={category}
                          className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">AI Models</h3>
                  <div className="space-y-2">
                    {models.map(model => (
                      <div key={model} className="flex items-center space-x-2">
                        <Checkbox id={model} />
                        <label
                          htmlFor={model}
                          className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {model}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search prompts..." 
                  className="pl-10 py-5 sm:py-6 text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base whitespace-nowrap">
                    <span className="hidden xs:inline">Sort by:</span> {sortBy === 'popular' ? 'Popular' : sortBy === 'newest' ? 'Newest' : 'A-Z'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setSortBy('popular')}>
                    Most Popular
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSortBy('newest')}>
                    Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSortBy('alphabetical')}>
                    Alphabetical
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="mb-3 sm:mb-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                Showing {filteredPrompts.length} prompts
              </p>
            </div>
            
            {/* Prompts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPrompts.map((prompt, index) => (
                <div key={prompt.id} className={location.includes('filter=trending') ? "relative" : ""}>
                  {location.includes('filter=trending') && (
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  )}
                  <PromptCard
                    id={prompt.id}
                    title={prompt.title}
                    description={prompt.description}
                    category={prompt.category}
                    tags={prompt.tags}
                    likes={prompt.likes}
                    copied={prompt.copied}
                    model={prompt.model}
                  />
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="mt-8 sm:mt-10 text-center">
              <Button variant="outline" size="default" className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                Load More Prompts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptsPage;