import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface PromptDetailProps {
  prompt: {
    id: number;
    title: string;
    description: string;
    prompt: string;
    category: string;
    tags: string[];
    likes: number;
    copied: number;
    model: string;
    author: {
      name: string;
      avatar: string;
    };
    createdAt: string;
  };
  onCopy: () => void;
  onLike: () => void;
  onShare: (platform: string) => void;
  liked: boolean;
  likes: number;
}

export function PromptDetail({
  prompt,
  onCopy,
  onLike,
  onShare,
  liked,
  likes
}: PromptDetailProps) {
  return (
    <div className="space-y-8">
      {/* Prompt Header */}
      <div>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Badge variant="outline">{prompt.category}</Badge>
          <Badge variant="secondary">{prompt.model}</Badge>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{prompt.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{prompt.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {prompt.tags.map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={prompt.author.avatar} alt={prompt.author.name} />
            <AvatarFallback>{prompt.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{prompt.author.name}</p>
            <p className="text-sm text-muted-foreground">Posted on {prompt.createdAt}</p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Prompt Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Prompt</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onCopy}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLike}
                className={liked ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                {likes}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-6 rounded-lg whitespace-pre-wrap font-sans text-sm">
            {prompt.prompt}
          </pre>
        </CardContent>
      </Card>
      
      {/* Share Buttons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Share this prompt</h3>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onShare("Facebook")}
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onShare("Twitter")}
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onShare("LinkedIn")}
          >
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              // In a real app, you would trigger a toast notification here
            }}
          >
            <Link className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
}