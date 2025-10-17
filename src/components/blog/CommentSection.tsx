import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

// Sample comments data
const sampleComments: Comment[] = [
  {
    id: 1,
    author: "John Doe",
    avatar: "https://i.pravatar.cc/150?u=johndoe",
    content: "Great article! This really helped me understand the concept better.",
    date: "2 days ago",
    likes: 12,
    replies: [
      {
        id: 2,
        author: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?u=janesmith",
        content: "I agree! Very well explained.",
        date: "1 day ago",
        likes: 3,
      },
    ],
  },
  {
    id: 3,
    author: "Bob Wilson",
    avatar: "https://i.pravatar.cc/150?u=bobwilson",
    content: "Could you elaborate more on the implementation details?",
    date: "3 days ago",
    likes: 8,
  },
];

export function CommentSection() {
  const [comments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setNewComment("");
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-blue-500" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="mb-4 min-h-[100px]"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
            <div className="flex gap-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {comment.author}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {comment.date}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {comment.content}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <Reply className="w-4 h-4" />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-8 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-4">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {reply.author}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {reply.date}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">
                            {reply.content}
                          </p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{reply.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                              <Reply className="w-4 h-4" />
                              <span className="text-sm">Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
