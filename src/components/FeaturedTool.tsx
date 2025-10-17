import { Link } from "wouter";
import { Tool } from "@/data/tools";

interface FeaturedToolProps {
  tool: Tool;
}

export function FeaturedTool({ tool }: FeaturedToolProps) {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <span className={`inline-block px-3 py-1 ${tool.category.color.badge.bg} ${tool.category.color.badge.text} text-xs font-medium rounded-full mb-4`}>
            {tool.category.name}
          </span>
          <h2 className="text-3xl font-bold mb-4">{tool.name}</h2>
          <p className="text-muted-foreground mb-6">{tool.description}</p>
          
          {tool.features && tool.features.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-8">
              {tool.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.location.href = `/tool/${tool.id}`}
              className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              Try Tool Now
            </button>
            <button 
              onClick={() => window.location.href = `/docs/tool/${tool.id}`}
              className="px-6 py-3 rounded-lg bg-gray-100 dark:bg-secondary hover:bg-gray-200 dark:hover:bg-secondary/80 text-foreground transition"
            >
              View Documentation
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-2 bg-secondary/30 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <div className="text-xs text-muted-foreground">{tool.name}</div>
          </div>
          <div className="font-mono text-sm bg-gray-900 rounded-lg p-4 h-52 overflow-auto text-gray-200">
            {tool.codePreview || 'No code preview available'}
          </div>
        </div>
      </div>
    </div>
  );
}
