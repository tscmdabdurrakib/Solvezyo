import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ThumbsUp, 
  Flag,
  MessageCircle
} from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  createdAt: string;
}

interface PromptCommentProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  onLikeComment: (id: number) => void;
  onFlagComment: (id: number) => void;
}

export function PromptComment({
  comments,
  onAddComment,
  onLikeComment,
  onFlagComment
}: PromptCommentProps) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        Comments ({comments.length})
      </h2>
      
      {/* Add Comment */}
      <Card>
        <CardContent className="pt-6">
          <Textarea
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-end">
            <Button onClick={handleAddComment}>Post Comment</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{comment.author}</h4>
                    <span className="text-sm text-muted-foreground">{comment.createdAt}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={() => onLikeComment(comment.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      {comment.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onFlagComment(comment.id)}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}