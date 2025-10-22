import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, 
  Heart, 
  Share2, 
  MessageCircle, 
  ThumbsUp, 
  Flag,
  Facebook,
  Twitter,
  Linkedin,
  Link
} from 'lucide-react';

const PromptDetailPage = () => {
  const params = useParams();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState<any>(null);
  const [relatedPrompts, setRelatedPrompts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  // Mock data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockPrompt = {
      id: 1,
      title: "Creative Story Generator",
      description: "Generate unique and creative story ideas with unexpected plot twists.",
      prompt: "You are a creative writer specializing in unique story concepts. Generate 5 different story ideas that include:\n\n1. An unexpected plot twist\n2. A compelling protagonist with a flaw\n3. A distinctive setting\n4. A central conflict\n5. An intriguing hook\n\nFormat each story idea as:\n\nTitle: [Story Title]\nSetting: [Where and when it takes place]\nProtagonist: [Main character description]\nConflict: [Central problem]\nTwist: [Unexpected plot development]\nHook: [What makes it intriguing]",
      category: "Writing",
      tags: ["ChatGPT", "Storytelling", "Creative", "Writing"],
      likes: 124,
      copied: 42,
      model: "ChatGPT",
      author: {
        name: "Alex Writer",
        avatar: "https://github.com/shadcn.png"
      },
      createdAt: "2023-06-15"
    };
    
    const mockRelatedPrompts = [
      {
        id: 2,
        title: "Character Development Assistant",
        category: "Writing",
        likes: 89
      },
      {
        id: 3,
        title: "Plot Hole Detector",
        category: "Writing",
        likes: 76
      },
      {
        id: 4,
        title: "Dialogue Generator",
        category: "Writing",
        likes: 102
      }
    ];
    
    const mockComments = [
      {
        id: 1,
        author: "Sarah M.",
        avatar: "https://github.com/shadcn.png",
        content: "This prompt helped me break through my writer's block! The story ideas were truly unique.",
        likes: 12,
        createdAt: "2023-06-18"
      },
      {
        id: 2,
        author: "Mike T.",
        avatar: "https://github.com/shadcn.png",
        content: "I used this for my sci-fi novel and it generated some amazing concepts. Highly recommended!",
        likes: 8,
        createdAt: "2023-06-20"
      }
    ];
    
    setPrompt(mockPrompt);
    setRelatedPrompts(mockRelatedPrompts);
    setComments(mockComments);
    setLikes(mockPrompt.likes);
  }, []);

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt.prompt);
      toast({
        title: "Prompt Copied!",
        description: "The prompt has been copied to your clipboard.",
      });
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleShare = (platform: string) => {
    // In a real app, this would trigger sharing functionality
    toast({
      title: `Shared on ${platform}!`,
      description: "The prompt has been shared successfully.",
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        avatar: "https://github.com/shadcn.png",
        content: newComment,
        likes: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      
      toast({
        title: "Comment Added!",
        description: "Your comment has been posted successfully.",
      });
    }
  };

  if (!prompt) {
    return <div className="container py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 sm:py-10">
        <div className="max-w-4xl mx-auto">
          {/* Prompt Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
              <Badge variant="outline" className="text-xs sm:text-sm">{prompt.category}</Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm">{prompt.model}</Badge>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{prompt.title}</h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">{prompt.description}</p>
            
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
              {prompt.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs sm:text-sm">{tag}</Badge>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage src={prompt.author.avatar} alt={prompt.author.name} />
                <AvatarFallback className="text-sm sm:text-base">{prompt.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm sm:text-base">{prompt.author.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Posted on {prompt.createdAt}</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-6 sm:my-8" />
          
          {/* Prompt Content */}
          <Card className="mb-6 sm:mb-8">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className="text-lg sm:text-xl">Prompt</span>
                <div className="flex gap-1 sm:gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCopy}
                    className="text-xs sm:text-sm"
                  >
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">Copy</span>
                    <span className="xs:hidden">Copy</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLike}
                    className={`text-xs sm:text-sm ${liked ? "text-red-500" : ""}`}
                  >
                    <Heart className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${liked ? "fill-current" : ""}`} />
                    {likes}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 sm:p-6 rounded-lg whitespace-pre-wrap font-sans text-xs sm:text-sm md:text-base overflow-x-auto">
                {prompt.prompt}
              </pre>
            </CardContent>
          </Card>
          
          {/* Share Buttons */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Share this prompt</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShare("Facebook")}
                className="text-xs sm:text-sm"
              >
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Facebook</span>
                <span className="xs:hidden">FB</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShare("Twitter")}
                className="text-xs sm:text-sm"
              >
                <Twitter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Twitter</span>
                <span className="xs:hidden">TW</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShare("LinkedIn")}
                className="text-xs sm:text-sm"
              >
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">LinkedIn</span>
                <span className="xs:hidden">LI</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link Copied!",
                    description: "The link to this prompt has been copied to your clipboard.",
                  });
                }}
                className="text-xs sm:text-sm"
              >
                <Link className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Copy Link</span>
                <span className="xs:hidden">Link</span>
              </Button>
            </div>
          </div>
          
          <Separator className="my-6 sm:my-8" />
          
          {/* Comments Section */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Comments ({comments.length})
            </h2>
            
            {/* Add Comment */}
            <Card className="mb-5 sm:mb-6">
              <CardContent className="pt-4 sm:pt-6">
                <Textarea
                  placeholder="Add your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3 sm:mb-4 text-sm"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddComment} className="text-sm sm:text-base">Post Comment</Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Comments List */}
            <div className="space-y-4 sm:space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                        <AvatarImage src={comment.avatar} alt={comment.author} />
                        <AvatarFallback className="text-xs sm:text-sm">{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                          <h4 className="font-semibold text-sm sm:text-base">{comment.author}</h4>
                          <span className="text-xs sm:text-sm text-muted-foreground">{comment.createdAt}</span>
                        </div>
                        <p className="mt-2 text-sm sm:text-base text-muted-foreground">{comment.content}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-1 sm:p-2">
                            <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs sm:text-sm p-1 sm:p-2">
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                            <Flag className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <Separator className="my-6 sm:my-8" />
          
          {/* Related Prompts */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Related Prompts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedPrompts.map((relatedPrompt) => (
                <Card key={relatedPrompt.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg">{relatedPrompt.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs sm:text-sm">{relatedPrompt.category}</Badge>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                        {relatedPrompt.likes}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailPage;