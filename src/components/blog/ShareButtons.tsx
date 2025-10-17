import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  vertical?: boolean;
}

export function ShareButtons({
  url,
  title,
  description,
  vertical = false,
}: ShareButtonsProps) {
  const { toast } = useToast();
  const fullUrl = typeof window !== "undefined" 
    ? `${window.location.origin}${url}` 
    : url;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      color: "hover:bg-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
      color: "hover:bg-sky-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      color: "hover:bg-blue-700",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + fullUrl)}`,
      color: "hover:bg-green-600",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + fullUrl)}`,
      color: "hover:bg-gray-600",
    },
  ];

  const containerClass = vertical
    ? "flex flex-col gap-2"
    : "flex flex-wrap gap-2";

  return (
    <div className={containerClass}>
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${link.color} hover:text-white transition-all ${
              vertical ? "w-full" : ""
            }`}
            aria-label={`Share on ${link.name}`}
          >
            <Icon className="w-5 h-5" />
            {vertical && <span className="text-sm font-medium">{link.name}</span>}
          </a>
        );
      })}
      <button
        onClick={handleCopyLink}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-600 hover:text-white transition-all ${
          vertical ? "w-full" : ""
        }`}
        aria-label="Copy link"
      >
        <LinkIcon className="w-5 h-5" />
        {vertical && <span className="text-sm font-medium">Copy Link</span>}
      </button>
    </div>
  );
}
