import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Copy, Heart, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PromptCard } from '@/components/prompt/PromptCard';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

const PromptHomePage = () => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrompts, setFilteredPrompts] = useState<any[]>([]);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

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

  // Filter prompts based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredPrompts(prompts);
    } else {
      const filtered = prompts.filter(prompt => 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPrompts(filtered);
    }
  }, [searchTerm, prompts]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Prompt copied!",
      description: "The prompt has been copied to your clipboard.",
    });
  };

  // Function to get featured prompts (first 3)
  const getFeaturedPrompts = () => {
    return filteredPrompts.slice(0, 3);
  };

  // Function to get trending prompts (sorted by copied count, first 4)
  const getTrendingPrompts = () => {
    return [...filteredPrompts]
      .sort((a, b) => b.copied - a.copied)
      .slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm">
                New Collection
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Discover, Copy & Create <span className="text-primary">Powerful Prompts</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-10 max-w-2xl mx-auto">
                Explore thousands of community-created AI prompts to enhance your productivity and creativity.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search prompts..." 
                  className="pl-10 py-5 sm:py-6 text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button size="default" className="sm:px-8 sm:py-6 text-sm sm:text-base">
                <Filter className="mr-2 h-4 w-4" />
                <span className="hidden xs:inline">Filters</span>
                <span className="xs:hidden">Filter</span>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-primary/20 blur-xl sm:blur-2xl"></div>
        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-secondary/20 blur-xl sm:blur-2xl"></div>
      </div>

      {/* Stats Section */}
      <div className="py-8 sm:py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">10K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Prompts</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">500K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Copies</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">98%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Community</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Why Use Our Prompts</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional, effective, and easy-to-use prompts for all your AI needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="p-4 sm:p-6 rounded-xl border bg-card text-card-foreground shadow">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Copy className="h-6 sm:h-8 w-6 sm:w-8 text-primary mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-semibold">Easy to Copy</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  One-click copy functionality for instant use in your favorite AI tools.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-4 sm:p-6 rounded-xl border bg-card text-card-foreground shadow">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Heart className="h-6 sm:h-8 w-6 sm:w-8 text-primary mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-semibold">Community Curated</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Prompts created and voted on by a community of AI enthusiasts and professionals.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="p-4 sm:p-6 rounded-xl border bg-card text-card-foreground shadow">
                <div className="flex items-center mb-3 sm:mb-4">
                  <TrendingUp className="h-6 sm:h-8 w-6 sm:w-8 text-primary mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-semibold">Trending & Popular</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Discover the most popular and trending prompts in the AI community.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Prompts */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                <h2 className="text-2xl sm:text-3xl font-bold">Featured Prompts</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">Handpicked prompts by our team</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setLocation('/prompt/browse?filter=featured')} 
              className="group text-sm sm:text-base w-full sm:w-auto"
            >
              View All
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {getFeaturedPrompts().map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Prompts Carousel */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                <h2 className="text-2xl sm:text-3xl font-bold">Trending This Week</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">Most copied prompts this week</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setLocation('/prompt/browse?filter=trending')} 
              className="group text-sm sm:text-base w-full sm:w-auto"
            >
              View All
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {getTrendingPrompts().map((prompt, index) => (
              <motion.div
                key={`trending-${prompt.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <Badge variant="secondary" className="absolute top-2 left-2 z-10 text-xs">
                    #{index + 1}
                  </Badge>
                  <PromptCard
                    id={prompt.id}
                    title={prompt.title}
                    description=""
                    category={prompt.category}
                    tags={prompt.tags}
                    likes={prompt.likes}
                    copied={prompt.copied}
                    model={prompt.model}
                    showDescription={false}
                    compact={true}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="py-12 sm:py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Supercharge Your AI Workflow?
            </h2>
            <p className="text-base sm:text-lg text-primary-foreground/90 mb-6 sm:mb-8">
              Join thousands of users who have enhanced their productivity with our prompts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button size="default" variant="secondary" className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg">
                Submit Your Prompt
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                size="default" 
                variant="outline" 
                className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg bg-white/10 text-white border-white/20 hover:bg-white/20"
                onClick={() => window.location.href = '/prompt/browse'}
              >
                Browse All Prompts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptHomePage;