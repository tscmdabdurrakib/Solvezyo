import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Monitor, 
  Smartphone, 
  Tablet,
  Download,
  Star,
  CheckCircle,
  ArrowRight,
  Sun,
  Moon,
  Laptop,
  Code,
  Zap,
  Eye,
  Heart
} from 'lucide-react';
import { useTheme } from '@/lib/ThemeProvider';

// Theme interface
interface Theme {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  features: string[];
  price: string;
  rating: number;
  downloads: string;
  isFeatured: boolean;
  isPopular: boolean;
  isNew: boolean;
  previewImage: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Mock theme data
const mockThemes: Theme[] = [
  {
    id: 'dark-pro',
    name: 'Dark Pro',
    description: 'A sleek, modern dark theme with vibrant accents and professional aesthetics.',
    category: 'Dark',
    tags: ['dark', 'professional', 'minimal'],
    features: ['Fully responsive', 'Dark mode', 'Custom components'],
    price: 'Free',
    rating: 4.9,
    downloads: '15K+',
    isFeatured: true,
    isPopular: true,
    isNew: false,
    previewImage: '/placeholder-theme-1.jpg',
    colorScheme: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899'
    }
  },
  {
    id: 'light-essence',
    name: 'Light Essence',
    description: 'Clean and minimal light theme with focus on readability and user experience.',
    category: 'Light',
    tags: ['light', 'minimal', 'clean'],
    features: ['Lightweight', 'Accessibility focused', 'Customizable'],
    price: 'Free',
    rating: 4.7,
    downloads: '12K+',
    isFeatured: true,
    isPopular: true,
    isNew: false,
    previewImage: '/placeholder-theme-2.jpg',
    colorScheme: {
      primary: '#3b82f6',
      secondary: '#10b981',
      accent: '#f59e0b'
    }
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    description: 'Futuristic theme with vibrant neon accents and glass-morphism effects.',
    category: 'Futuristic',
    tags: ['neon', 'futuristic', 'glass'],
    features: ['Neon effects', 'Glass cards', 'Animated transitions'],
    price: '$29',
    rating: 4.8,
    downloads: '8K+',
    isFeatured: true,
    isPopular: false,
    isNew: true,
    previewImage: '/placeholder-theme-3.jpg',
    colorScheme: {
      primary: '#00f2fe',
      secondary: '#4facfe',
      accent: '#00cdac'
    }
  },
  {
    id: 'corporate-suite',
    name: 'Corporate Suite',
    description: 'Professional theme designed for business and enterprise applications.',
    category: 'Business',
    tags: ['business', 'corporate', 'professional'],
    features: ['Dashboard layouts', 'Data visualization', 'Report templates'],
    price: '$49',
    rating: 4.6,
    downloads: '6K+',
    isFeatured: false,
    isPopular: true,
    isNew: false,
    previewImage: '/placeholder-theme-4.jpg',
    colorScheme: {
      primary: '#2563eb',
      secondary: '#0f172a',
      accent: '#dc2626'
    }
  },
  {
    id: 'pastel-dreams',
    name: 'Pastel Dreams',
    description: 'Soft pastel color scheme with rounded elements and playful interactions.',
    category: 'Pastel',
    tags: ['pastel', 'playful', 'soft'],
    features: ['Pastel colors', 'Rounded corners', 'Playful animations'],
    price: '$19',
    rating: 4.5,
    downloads: '9K+',
    isFeatured: false,
    isPopular: false,
    isNew: true,
    previewImage: '/placeholder-theme-5.jpg',
    colorScheme: {
      primary: '#a78bfa',
      secondary: '#f472b6',
      accent: '#fb7185'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Edgy theme with cyberpunk aesthetics and glitch effects.',
    category: 'Gaming',
    tags: ['cyberpunk', 'gaming', 'edgy'],
    features: ['Glitch effects', 'Neon typography', 'Animated backgrounds'],
    price: '$39',
    rating: 4.7,
    downloads: '7K+',
    isFeatured: false,
    isPopular: true,
    isNew: false,
    previewImage: '/placeholder-theme-6.jpg',
    colorScheme: {
      primary: '#ff00ff',
      secondary: '#00ffff',
      accent: '#ffff00'
    }
  }
];

// Category filter options
const categories = [
  'All',
  'Dark',
  'Light',
  'Business',
  'Futuristic',
  'Pastel',
  'Gaming'
];

// Feature showcase component
const FeatureShowcase = () => {
  const features = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: 'Customizable Themes',
      description: 'Easily customize colors, fonts, and layouts to match your brand identity.'
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: 'Fully Responsive',
      description: 'Looks great on all devices from mobile to desktop with adaptive layouts.'
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Clean Code',
      description: 'Well-structured, commented code that follows best practices and standards.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Performance Optimized',
      description: 'Lightweight and fast-loading themes that enhance user experience.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-primary mb-4">{feature.icon}</div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// Theme card component
const ThemeCard = ({ theme }: { theme: Theme }) => {
  const { theme: currentTheme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="relative">
          <img 
            src={theme.previewImage} 
            alt={theme.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {theme.isNew && (
              <Badge variant="default" className="bg-green-500">New</Badge>
            )}
            {theme.isPopular && (
              <Badge variant="default" className="bg-red-500">Popular</Badge>
            )}
            {theme.isFeatured && (
              <Badge variant="default" className="bg-blue-500">Featured</Badge>
            )}
          </div>
          <div className="absolute bottom-3 left-3 flex gap-2">
            <div 
              className="w-4 h-4 rounded-full border" 
              style={{ backgroundColor: theme.colorScheme.primary }}
            />
            <div 
              className="w-4 h-4 rounded-full border" 
              style={{ backgroundColor: theme.colorScheme.secondary }}
            />
            <div 
              className="w-4 h-4 rounded-full border" 
              style={{ backgroundColor: theme.colorScheme.accent }}
            />
          </div>
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{theme.name}</CardTitle>
            <Badge variant="outline">{theme.price}</Badge>
          </div>
          <CardDescription>{theme.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {theme.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(theme.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {theme.rating}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Download className="w-4 h-4 mr-1" />
              {theme.downloads}
            </div>
          </div>
          <Button className="w-full group">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Theme showcase page component
const ThemeShowcasePage = () => {
  const { theme: currentTheme, setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter themes based on category and search query
  const filteredThemes = mockThemes.filter(theme => {
    const matchesCategory = selectedCategory === 'All' || theme.category === selectedCategory;
    const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          theme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          theme.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Premium Themes Collection - LaunchPad
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover our curated collection of beautiful, responsive themes designed to elevate your projects.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button size="lg" className="px-8 py-6 text-lg">
                Browse Themes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg"
                onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
              >
                {currentTheme === 'light' ? (
                  <>
                    <Moon className="mr-2 h-5 w-5" />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun className="mr-2 h-5 w-5" />
                    Light Mode
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-primary/20 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-2xl"></div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Themes</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Downloads</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Themes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional, responsive, and easy-to-customize themes for all your projects.
            </p>
          </div>
          <FeatureShowcase />
        </div>
      </div>

      {/* Themes Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Themes</h2>
              <p className="text-muted-foreground">
                Browse our collection of professionally designed themes
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search themes..."
                  className="w-full md:w-80 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Themes Grid */}
          {filteredThemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredThemes.map((theme) => (
                <ThemeCard key={theme.id} theme={theme} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No themes found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Project?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Join thousands of developers who have elevated their projects with our themes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg bg-white/10 text-white border-white/20 hover:bg-white/20">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeShowcasePage;