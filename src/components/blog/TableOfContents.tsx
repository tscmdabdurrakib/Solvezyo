import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const h2Elements = tempDiv.querySelectorAll("h2, h3");
    
    const extractedHeadings: Heading[] = Array.from(h2Elements).map((heading, index) => {
      const text = heading.textContent || "";
      const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
      
      // Add id to actual heading in the page
      setTimeout(() => {
        const actualHeading = document.querySelector(`h2:nth-of-type(${index + 1}), h3:nth-of-type(${index + 1})`);
        if (actualHeading && text === actualHeading.textContent) {
          actualHeading.id = id;
        }
      }, 100);

      return {
        id,
        text,
        level: heading.tagName === "H2" ? 2 : 3,
      };
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Track active heading on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="sticky top-24"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-gray-900 dark:text-white">
            Table of Contents
          </h3>
        </div>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left text-sm transition-all ${
                heading.level === 3 ? "pl-4" : ""
              } ${
                activeId === heading.id
                  ? "text-blue-500 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              }`}
            >
              <span className="line-clamp-2">{heading.text}</span>
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
