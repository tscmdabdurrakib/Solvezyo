import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Topic } from "../data/htmlTopics";
import { TopicContent } from "./TopicContent";
import { motion } from "framer-motion";
import { ChevronLeft, Menu, X } from "lucide-react";

interface CourseLayoutProps {
  topics: Topic[];
  title: string;
  children?: React.ReactNode;
}

export function CourseLayout({ topics, title }: CourseLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Extract current topic from URL
  const pathParts = location.split("/");
  const currentTopicId = pathParts[pathParts.length - 1] || topics[0]?.id;
  const currentTopic = topics.find(topic => topic.id === currentTopicId) || topics[0];
  
  // Close sidebar when topic changes (for mobile)
  const handleTopicClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link 
              to="/learn" 
              className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Courses</span>
            </Link>
          </div>
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile when closed */}
        <motion.aside
          className={`bg-card border-r w-64 flex-shrink-0 fixed md:relative md:translate-x-0 h-[calc(100vh-4rem)] z-10 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:block`}
          initial={false}
        >
          <div className="h-full overflow-y-auto p-4">
            <nav>
              <ul className="space-y-1">
                {topics.map((topic) => (
                  <li key={topic.id}>
                    <Link
                      to={`/learn/${title.toLowerCase().replace(" ", "")}/${topic.id}`}
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        currentTopicId === topic.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                      onClick={handleTopicClick}
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {currentTopic ? (
            <TopicContent topic={currentTopic} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Topic not found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}