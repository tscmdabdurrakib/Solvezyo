import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Smartphone,
  Star,
  Share2,
  Bookmark,
  Calendar,
  User,
  Eye,
  ThumbsUp,
  Play,
  Download,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { roadmapDetails } from '@/data/roadmapDetails';

const AppDevelopmentRoadmap: React.FC = () => {
  const { toast } = useToast();
  const [bookmarked, setBookmarked] = React.useState(false);
  
  // Get the specific roadmap data
  const roadmapDetail = roadmapDetails['app-development'];
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: `App Development Roadmap ${bookmarked ? "removed from" : "added to"} your bookmarks.`,
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The roadmap link has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb and Navigation */}
      <div className="mb-6">
        <Link to="/roadmaps">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Roadmaps
          </Button>
        </Link>
      </div>
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center mb-4">
              <Smartphone className="h-10 w-10 text-primary mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold">{roadmapDetail.title}</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
              {roadmapDetail.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">Tech</Badge>
              <Badge variant="default">Intermediate</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {roadmapDetail.stats.duration}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {roadmapDetail.stats.modules} modules
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button onClick={handleBookmark} variant={bookmarked ? "default" : "outline"} className="flex items-center gap-2">
              <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>
      
      <Separator className="my-8" />
      
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Card>
          <CardContent className="flex items-center p-4">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-2xl font-bold">{roadmapDetail.stats.modules}</p>
              <p className="text-sm text-muted-foreground">Modules</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-4">
            <Clock className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-2xl font-bold">{roadmapDetail.stats.duration}</p>
              <p className="text-sm text-muted-foreground">Duration</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-4">
            <Users className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-2xl font-bold">{roadmapDetail.stats.learners}</p>
              <p className="text-sm text-muted-foreground">Learners</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-4">
            <TrendingUp className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-2xl font-bold">{roadmapDetail.stats.completion}</p>
              <p className="text-sm text-muted-foreground">Completion</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Roadmap Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Learning Path</h2>
        <div className="space-y-6">
          {roadmapDetail.steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center mr-4 ${step.completed ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"}`}>
                      {step.completed ? (
                        <span className="text-lg">✓</span>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {step.duration}
                          </Badge>
                          <Badge 
                            variant={
                              step.difficulty === "Beginner" ? "outline" : 
                              step.difficulty === "Intermediate" ? "default" : 
                              "destructive"
                            }
                          >
                            {step.difficulty}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {step.resources} resources
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  
                  {step.topics && step.topics.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Key Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {step.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="secondary">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Start Module
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Separator className="my-8" />
      
      {/* Resources Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recommended Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmapDetail.resources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <Badge variant="secondary">{resource.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {resource.description}
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    Visit Resource
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Tools Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Essential Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmapDetail.tools.map((tool) => (
            <Card key={tool.id}>
              <CardHeader>
                <CardTitle className="text-lg">{tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {tool.description}
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <a href={tool.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Community Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Community</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Learners & Discussions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs"
                    >
                      U{i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{roadmapDetail.stats.learners} learners are following this roadmap</p>
              </div>
              <Button size="sm">
                <User className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">Alex Johnson</p>
                    <Badge variant="secondary">Expert</Badge>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Just completed the advanced section! The projects really helped solidify my understanding.
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                      <ThumbsUp className="h-3 w-3" />
                      24
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-primary">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  S
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">Sam Wilson</p>
                    <Badge variant="outline">Beginner</Badge>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Starting this roadmap today. Excited to learn!
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                      <ThumbsUp className="h-3 w-3" />
                      5
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-primary">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppDevelopmentRoadmap;