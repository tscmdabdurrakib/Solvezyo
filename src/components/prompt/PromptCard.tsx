import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, 
  Heart, 
  Share2,
  MessageCircle
} from 'lucide-react';

interface PromptCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  likes: number;
  copied: number;
  model?: string;
  author?: {
    name: string;
    avatar: string;
  };
  createdAt?: string;
  showAuthor?: boolean;
  showActions?: boolean;
  showDescription?: boolean;
  compact?: boolean;
}

export function PromptCard({
  id,
  title,
  description,
  category,
  tags,
  likes,
  copied,
  model,
  author,
  createdAt,
  showAuthor = false,
  showActions = true,
  showDescription = true,
  compact = false
}: PromptCardProps) {
  const [_location, setLocation] = useLocation();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);

  const handleCopy = () => {
    // In a real app, this would copy the actual prompt content
    navigator.clipboard.writeText(title);
    toast({
      title: "Prompt Copied!",
      description: "The prompt has been copied to your clipboard.",
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
  };

  const handleViewDetails = () => {
    setLocation(`/prompt/${id}`);
  };

  return (
    <Card 
      className={`h-full flex flex-col hover:shadow-lg transition-shadow duration-300 ${
        compact ? 'cursor-pointer' : ''
      }`}
      onClick={compact ? handleViewDetails : undefined}
    >
      <CardHeader className={compact ? "pb-3" : ""}>
        <div className="flex justify-between items-start">
          <CardTitle 
            className={`${compact ? "text-base" : "text-xl"} ${compact ? "line-clamp-2" : ""}`}
            onClick={!compact ? handleViewDetails : undefined}
          >
            {title}
          </CardTitle>
          <div className="flex gap-1">
            <Badge variant="outline">{category}</Badge>
            {model && <Badge variant="secondary">{model}</Badge>}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        {showDescription && (
          <p className={`text-muted-foreground mb-4 ${compact ? "text-sm line-clamp-2" : ""}`}>
            {description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, compact ? 2 : tags.length).map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {compact && tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
        
        {showAuthor && author && (
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
              {author.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-medium">{author.name}</p>
              {createdAt && <p className="text-xs text-muted-foreground">{createdAt}</p>}
            </div>
          </div>
        )}
        
        {showActions && (
          <div className="flex justify-between items-center">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current text-red-500" : ""}`} />
                {localLikes}
              </button>
              <span className="flex items-center gap-1">
                <Copy className="h-4 w-4" />
                {copied}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle comments
                }}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                0
              </button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle share
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}