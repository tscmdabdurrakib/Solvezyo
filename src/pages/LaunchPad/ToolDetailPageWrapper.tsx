import React from 'react';
import { useParams } from 'wouter';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ExternalLink, 
  Star, 
  Download, 
  Calendar, 
  User, 
  Tag,
  Code,
  Palette,
  Smartphone,
  Laptop
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for tools - in a real app, this would come from an API or context
const mockTools = [
  {
    id: 'theme-showcase',
    name: 'Theme Showcase',
    description: 'A collection of premium, responsive themes for your projects',
    longDescription: 'Explore our curated collection of beautiful, responsive themes designed to elevate your projects. Each theme is carefully crafted with attention to detail, performance, and user experience.',
    category: 'Frontend',
    tags: ['themes', 'ui', 'design', 'frontend'],
    author: 'Design Team',
    version: '1.2.0',
    releaseDate: '2023-10-15',
    downloads: '15,000+',
    rating: 4.9,
    features: [
      'Fully responsive design',
      'Dark and light modes',
      'Customizable color schemes',
      'Performance optimized',
      'Easy integration'
    ],
    screenshots: [
      '/placeholder-theme-1.jpg',
      '/placeholder-theme-2.jpg',
      '/placeholder-theme-3.jpg'
    ],
    documentation: '/docs/theme-showcase',
    demo: '/themes',
    installation: 'npm install theme-showcase',
    dependencies: ['react', 'tailwindcss', 'framer-motion'],
    compatibleWith: ['React', 'Next.js', 'Vite']
  },
  {
    id: 'component-library',
    name: 'Component Library',
    description: 'A comprehensive library of reusable UI components',
    longDescription: 'A comprehensive library of reusable UI components built with accessibility and customization in mind. Includes buttons, forms, cards, navigation, and more.',
    category: 'Frontend',
    tags: ['components', 'ui', 'library', 'frontend'],
    author: 'UI Team',
    version: '2.1.3',
    releaseDate: '2023-11-20',
    downloads: '22,500+',
    rating: 4.8,
    features: [
      '50+ reusable components',
      'Fully accessible',
      'Dark mode support',
      'Customizable styling',
      'Comprehensive documentation'
    ],
    screenshots: [
      '/placeholder-component-1.jpg',
      '/placeholder-component-2.jpg',
      '/placeholder-component-3.jpg'
    ],
    documentation: '/docs/component-library',
    demo: '/components',
    installation: 'npm install component-library',
    dependencies: ['react', 'tailwindcss'],
    compatibleWith: ['React', 'Next.js', 'Vite']
  }
];

const ToolDetailPageWrapper = () => {
  const params = useParams();
  const [, setLocation] = useLocation();
  
  // In a real app, you would fetch the tool data based on the ID
  const toolId = params.id || 'theme-showcase';
  const tool = mockTools.find(t => t.id === toolId) || mockTools[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={() => setLocation('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Tool Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary">{tool.category}</Badge>
                {tool.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{tool.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{tool.description}</p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(tool.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{tool.rating}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Download className="mr-1 h-4 w-4" />
                  {tool.downloads}
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(tool.releaseDate).toLocaleDateString()}
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <User className="mr-1 h-4 w-4" />
                  {tool.author}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button className="w-full md:w-auto">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Demo
              </Button>
              <Button variant="outline" className="w-full md:w-auto">
                Documentation
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Screenshots */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tool.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`${tool.name} screenshot ${index + 1}`}
                      className="rounded-lg border"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tool.longDescription}</p>
              </CardContent>
            </Card>
            
            {/* Features */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-1 mr-2 h-2 w-2 rounded-full bg-primary"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Installation */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Installation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
                  {tool.installation}
                </div>
                <Button className="w-full">Copy Command</Button>
              </CardContent>
            </Card>
            
            {/* Dependencies */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.dependencies.map((dep, index) => (
                    <Badge key={index} variant="secondary">{dep}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Compatibility */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Compatible With</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.compatibleWith.map((platform, index) => (
                    <Badge key={index} variant="outline">{platform}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Version Info */}
            <Card>
              <CardHeader>
                <CardTitle>Version Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span>{tool.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Release Date</span>
                    <span>{new Date(tool.releaseDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailPageWrapper;