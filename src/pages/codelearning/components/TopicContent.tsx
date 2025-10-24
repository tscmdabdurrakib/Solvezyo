import { Topic } from "../data/htmlTopics";
import { CodeBlock } from "./CodeBlock";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface TopicContentProps {
  topic: Topic;
}

export function TopicContent({ topic }: TopicContentProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    if (topic.codeExample) {
      navigator.clipboard.writeText(topic.codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-foreground">{topic.title}</h1>
      
      <div 
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary hover:prose-a:text-primary/90"
        dangerouslySetInnerHTML={{ __html: topic.content }}
      />
      
      {topic.codeExample && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Example</h2>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <CodeBlock code={topic.codeExample} />
        </div>
      )}
    </motion.div>
  );
}