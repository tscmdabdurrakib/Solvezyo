import React, { useState, useEffect, lazy, Suspense } from "react";
import { useRoute, Link } from "wouter";
import { useTools } from "@/context/ToolsContext";
import { Button } from "@/components/ui/button";
import {  
  Code,
  Wand2,
  Search,
  RefreshCw,
  Type,
  AlignLeft,
  Lock,
  Grid3x3
} from "lucide-react";

const ToolCard = lazy(() => import('@/components/ToolCard').then(module => ({ default: module.ToolCard })));

interface SubCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  toolIds: string[];
}

const textStringSubCategories: SubCategory[] = [
  {
    id: "all",
    name: "All Tools",
    icon: <Grid3x3 className="w-4 h-4" />,
    toolIds: []
  },
  {
    id: "encoding",
    name: "Encoding & Decoding",
    icon: <Code className="w-4 h-4" />,
    toolIds: [
      "url-encode", "url-decode", "html-encode", "html-decode",
      "base64-encode", "base64-decode", "string-to-netstring",
      "netstring-to-string", "slash-escape", "slash-unescape"
    ]
  },
  {
    id: "generators",
    name: "Generators",
    icon: <Wand2 className="w-4 h-4" />,
    toolIds: [
      "generate-random-string", "generate-string-from-regex"
    ]
  },
  {
    id: "regex",
    name: "Regex & Pattern",
    icon: <Search className="w-4 h-4" />,
    toolIds: [
      "extract-regex-matches", "test-string-with-regex", "extract-substring"
    ]
  },
  {
    id: "converters",
    name: "Converters",
    icon: <RefreshCw className="w-4 h-4" />,
    toolIds: [
      "convert-string-to-image", "printf-string"
    ]
  },
  {
    id: "manipulation",
    name: "Manipulation",
    icon: <Type className="w-4 h-4" />,
    toolIds: [
      "split-string", "join-strings", "filter-string-lines",
      "repeat-string", "reverse-string", "find-replace-string",
      "truncate-string", "trim-string"
    ]
  },
  {
    id: "formatting",
    name: "Formatting",
    icon: <AlignLeft className="w-4 h-4" />,
    toolIds: [
      "left-pad-string", "right-pad-string", "right-align-string",
      "center-string", "sort-strings"
    ]
  },
  {
    id: "ciphers",
    name: "Ciphers & Transform",
    icon: <Lock className="w-4 h-4" />,
    toolIds: [
      "rotate-string", "rot13-string", "rot47-string",
      "transpose-string", "slice-string"
    ]
  }
];

export default function CategoryPage({ params }: { params?: { id?: string } }) {
  const [, routeParams] = useRoute("/category/:id");
  const effectiveParams = params || routeParams;
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");

  const { categories = [], tools = [], isLoading: contextLoading } =
    useTools() || { categories: [], tools: [], isLoading: true };

  const categoryId = effectiveParams?.id;
  const category = categories.find((c: any) => c.id === categoryId);
  const allCategoryTools = tools.filter((tool: any) => tool.category.id === categoryId);
  
  const isTextStringCategory = categoryId === "text-string";

  const categoryTools = isTextStringCategory && activeSubCategory !== "all"
    ? allCategoryTools.filter((tool: any) => {
        const subCat = textStringSubCategories.find(sc => sc.id === activeSubCategory);
        return subCat?.toolIds.includes(tool.id);
      })
    : allCategoryTools;

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The category you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="p-0 h-auto mb-4" asChild>
            <div className="text-muted-foreground hover:text-primary transition flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to Home
            </div>
          </Button>
        </Link>

        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-lg ${category.color.bg} ${category.color.text}`}
          >
            {category.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>

        {isTextStringCategory && (
          <div className="mt-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30">
              <h2 className="text-xl font-semibold mb-4 text-center">Our Most Popular Tools</h2>
              <p className="text-sm text-center text-muted-foreground mb-6">
                We present the best of the best. All free, no catch
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {textStringSubCategories.map((subCat) => (
                  <button
                    key={subCat.id}
                    onClick={() => setActiveSubCategory(subCat.id)}
                    data-testid={`subcategory-${subCat.id}`}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
                      transition-all duration-200
                      ${activeSubCategory === subCat.id
                        ? 'bg-primary text-primary-foreground shadow-md scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }
                    `}
                  >
                    {subCat.icon}
                    <span>{subCat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center">
        {categoryTools.length > 0 ? (
          categoryTools.map((tool: any) => (
            <Suspense
              key={tool.id}
              fallback={<div className="w-full h-32 bg-muted animate-pulse rounded-lg" />}
            >
              <div className="w-full">
                <ToolCard tool={tool} />
              </div>
            </Suspense>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-4">
              No tools found in this category yet.
            </p>
            <Link href="/">
              <Button>Explore Other Categories</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
