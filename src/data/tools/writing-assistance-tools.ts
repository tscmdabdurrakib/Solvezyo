import React from "react";
import { categories } from "../categories";
import { Tool } from "./types";

function getCategoryById(id: string) {
  return categories.find((cat) => cat.id === id) || categories[0];
}

// Helper function to create SVG icons
function createIcon(pathD: string) {
  return React.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      className: "h-6 w-6",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: pathD,
    }),
  );
}

export const writingAssistanceTools: Tool[] = [
{
    id: "proofreading-tools-ai-powered",
    name: "Proofreading Tools (AI-powered)",
    description: "AI-powered proofreading tools to check for grammar, spelling, punctuation, and style.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 14000,
    gradient: "from-indigo-500 to-blue-500",
    features: [
      "AI-driven grammar and spelling correction",
      "Punctuation and sentence structure enhancement",
      "Writing style improvement"
    ]
  },
{
    id: "writing-tone-analyzer",
    name: "Writing Tone Analyzer",
    description: "Analyze the tone of your writing and ensure it matches the intended mood or style.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 14500,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Identify tone (formal, casual, professional, etc.)",
      "Match writing tone with target audience",
      "Improve tone consistency throughout content"
    ]
  },
{
    id: "academic-writing-assistant",
    name: "Academic Writing Assistant",
    description: "Support for academic writing, including structure, citations, and style.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 11800,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Guidelines for academic writing structure",
      "Proper citation suggestions (APA, MLA, Chicago)",
      "Assist with academic tone and style"
    ]
  },
{
    id: "citation-generator",
    name: "Citation Generator (APA, MLA, Chicago, etc.)",
    description: "Automatically generate citations in multiple styles (APA, MLA, Chicago, etc.).",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12400,
    gradient: "from-blue-400 to-indigo-400",
    features: [
      "Generate citations in APA, MLA, Chicago, and more",
      "Support for books, articles, and online resources",
      "Easy integration with academic writing tools"
    ]
  },
{
    id: "bibliography-generator",
    name: "Bibliography Generator",
    description: "Generate comprehensive bibliographies for your research papers.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12700,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Create detailed bibliographies for research papers",
      "Multiple citation styles supported",
      "Organize references by source type"
    ]
  },
{
    id: "citation-checker",
    name: "Citation Checker",
    description: "Check the accuracy of your citations and ensure proper formatting.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 11500,
    gradient: "from-green-600 to-blue-600",
    features: [
      "Validate citation formatting",
      "Ensure citation accuracy in academic work",
      "Support for various citation styles"
    ]
  },
{
    id: "reference-checker",
    name: "Reference Checker",
    description: "Verify the references and sources used in your work to ensure they are accurate and reliable.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 11300,
    gradient: "from-cyan-400 to-blue-400",
    features: [
      "Ensure references are credible and properly cited",
      "Cross-check references with trusted databases",
      "Support for academic research and citations"
    ]
  },
{
    id: "bibliography-formatter",
    name: "Bibliography Formatter",
    description: "Format your bibliography according to the required citation style.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12100,
    gradient: "from-teal-600 to-green-600",
    features: [
      "Format your bibliography in various citation styles",
      "Create consistent formatting across all references",
      "Save time with automatic bibliography formatting"
    ]
  },
{
    id: "plagiarism-free-content-generator-ai",
    name: "Plagiarism-Free Content Generator (AI)",
    description: "Generate unique, plagiarism-free content using AI technology.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 13800,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Generate unique, original content",
      "Ensure plagiarism-free text for any use case",
      "AI-driven content creation with SEO optimization"
    ]
  },
{
    id: "writing-style-improver",
    name: "Writing Style Improver",
    description: "Enhance your writing style for better readability and engagement.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 13000,
    gradient: "from-pink-400 to-red-400",
    features: [
      "Improve readability and flow",
      "Enhance writing style for different audiences",
      "Suggestions for sentence structure and word choice"
    ]
  },
{
    id: "translation-checker-writing",
    name: "Translation Checker (for Writing)",
    description: "Check translations for accuracy, fluency, and grammar in written content.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12200,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Verify translation accuracy in written content",
      "Ensure fluency and grammar consistency",
      "Cross-check multiple language pairs"
    ]
  },
{
    id: "copyediting-tools",
    name: "Copyediting Tools",
    description: "Tools for professional copyediting, including grammar, clarity, and consistency checks.",
    category: getCategoryById("writing-assistance"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 13500,
    gradient: "from-purple-700 to-indigo-700",
    features: [
      "Ensure clarity, grammar, and consistency",
      "Check for common writing mistakes",
      "Improve readability and precision"
    ]
  },
];
