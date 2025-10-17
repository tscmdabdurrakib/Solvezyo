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

export const grammarPlagiarismTools: Tool[] = [
{
    id: "grammar-checker",
    name: "Grammar Checker",
    description: "Check for grammatical errors and improve your writing's accuracy.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 13400,
    gradient: "from-blue-500 to-indigo-500",
    features: [
      "Identify and correct grammar mistakes",
      "Improve sentence clarity and flow",
      "Supports multiple languages and dialects"
    ]
  },
{
    id: "spell-checker",
    name: "Spell Checker",
    description: "Find and correct spelling mistakes in your writing.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12800,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Identify misspelled words",
      "Suggest correct spellings",
      "Easy-to-use tool for writers and editors"
    ]
  },
{
    id: "punctuation-corrector",
    name: "Punctuation Corrector",
    description: "Ensure proper punctuation use throughout your content.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 13000,
    gradient: "from-purple-500 to-indigo-500",
    features: [
      "Correct common punctuation mistakes",
      "Ensure proper punctuation placement",
      "Improve sentence readability"
    ]
  },
{
    id: "sentence-structure-analyzer",
    name: "Sentence Structure Analyzer",
    description: "Analyze sentence structures and enhance writing flow.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12500,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Analyze sentence construction and syntax",
      "Identify awkward or incomplete sentences",
      "Improve writing style and coherence"
    ]
  },
{
    id: "word-choice-enhancer",
    name: "Word Choice Enhancer",
    description: "Refine your word choice to make your writing more precise and engaging.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 11900,
    gradient: "from-pink-500 to-red-500",
    features: [
      "Suggest more fitting words and phrases",
      "Improve writing clarity and impact",
      "Tailored recommendations for various writing styles"
    ]
  },
{
    id: "style-checker",
    name: "Style Checker",
    description: "Ensure your writing adheres to the desired style and tone.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12700,
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Analyze writing style and tone",
      "Ensure consistency in voice and style",
      "Suggestions for improving readability"
    ]
  },
{
    id: "active-vs-passive-voice-checker",
    name: "Active vs. Passive Voice Checker",
    description: "Analyze the use of active and passive voice in your content.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12000,
    gradient: "from-teal-600 to-green-600",
    features: [
      "Detect and highlight passive voice usage",
      "Suggest improvements for clarity and conciseness",
      "Make your writing more engaging"
    ]
  },
{
    id: "tense-checker",
    name: "Tense Checker",
    description: "Ensure consistent and correct use of tenses throughout your content.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12600,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Detect tense inconsistencies",
      "Provide suggestions for tense corrections",
      "Improve writing clarity and flow"
    ]
  },
{
    id: "redundancy-finder",
    name: "Redundancy Finder",
    description: "Identify and eliminate redundant phrases or words in your writing.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 11800,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Detect redundant words and phrases",
      "Ensure concise and clear writing",
      "Improve writing quality and readability"
    ]
  },
{
    id: "sentence-length-checker",
    name: "Sentence Length Checker",
    description: "Analyze sentence length to improve readability and flow.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12200,
    gradient: "from-red-500 to-pink-500",
    features: [
      "Highlight excessively long or short sentences",
      "Ensure varied sentence structure",
      "Improve content flow and engagement"
    ]
  },
{
    id: "word-count-tool",
    name: "Word Count Tool",
    description: "Keep track of the number of words in your document.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 11100,
    gradient: "from-teal-500 to-blue-500",
    features: [
      "Track word count as you write",
      "Ensure content length meets requirements",
      "Simple and easy-to-use tool"
    ]
  },
{
    id: "readability-checker-flesch-kincaid",
    name: "Readability Checker (Flesch-Kincaid)",
    description: "Analyze your writing for readability using the Flesch-Kincaid scale.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 11000,
    gradient: "from-blue-400 to-cyan-400",
    features: [
      "Calculate Flesch-Kincaid readability score",
      "Ensure your content is easily understandable",
      "Improve content engagement by optimizing readability"
    ]
  },
{
    id: "plagiarism-checker-with-grammar-check",
    name: "Plagiarism Checker with Grammar Check",
    description: "Check for plagiarism while simultaneously analyzing grammar issues.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12900,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Detect plagiarism in content",
      "Analyze and correct grammar mistakes",
      "Ensure originality and accuracy in your writing"
    ]
  },
{
    id: "plagiarism-checker-text-based",
    name: "Plagiarism Checker (Text-based)",
    description: "Analyze your text for potential plagiarism issues.",
    category: getCategoryById("grammar-plagiarism"),
    icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
    views: 12300,
    gradient: "from-green-600 to-blue-600",
    features: [
      "Scan for text duplication and plagiarism",
      "Compare with online sources",
      "Maintain academic and content integrity"
    ]
  },
{
      id: "plagiarism-checker-image-based",
      name: "Plagiarism Checker (Image-based)",
      description: "Detect plagiarism in images and visual content.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 13400,
      gradient: "from-blue-500 to-indigo-500",
      features: [
        "Detect image-based plagiarism",
        "Compare visual content with online sources",
        "Ensure originality in images and graphics"
      ]
    },
{
      id: "plagiarism-checker-academic-writing",
      name: "Plagiarism Checker for Academic Writing",
      description: "Check academic papers for plagiarism and proper citation.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 14500,
      gradient: "from-green-500 to-teal-500",
      features: [
        "Ensure proper citation in academic papers",
        "Detect instances of academic dishonesty",
        "Support for different citation styles (APA, MLA, Chicago)"
      ]
    },
{
      id: "plagiarism-checker-code",
      name: "Plagiarism Checker for Code (Programming)",
      description: "Check programming code for plagiarism and originality.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 12300,
      gradient: "from-orange-500 to-yellow-500",
      features: [
        "Detect copied code in programming projects",
        "Identify similarity with online code repositories",
        "Ensure code originality and compliance"
      ]
    },
{
      id: "cross-reference-plagiarism-checker",
      name: "Cross-Reference Plagiarism Checker",
      description: "Cross-reference content against multiple sources to detect plagiarism.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 11000,
      gradient: "from-cyan-500 to-blue-500",
      features: [
        "Cross-check content with multiple databases",
        "Ensure thorough plagiarism detection",
        "Compare across various online platforms"
      ]
    },
{
      id: "plagiarism-checker-websites-blogs",
      name: "Plagiarism Checker for Websites & Blogs",
      description: "Detect duplicate content across websites and blogs.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 11800,
      gradient: "from-red-500 to-pink-500",
      features: [
        "Check for content duplication in websites and blogs",
        "Compare content across multiple web sources",
        "Ensure unique and original online content"
      ]
    },
{
      id: "duplicate-content-finder",
      name: "Duplicate Content Finder",
      description: "Find and eliminate duplicate content from your documents.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 11300,
      gradient: "from-yellow-600 to-orange-600",
      features: [
        "Identify duplicate content within a document",
        "Scan for repeated phrases and paragraphs",
        "Ensure content uniqueness"
      ]
    },
{
      id: "turnitin-alternative-free-online",
      name: "Turnitin Alternative (Free/Online)",
      description: "Find plagiarism for free, as an alternative to Turnitin.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 12400,
      gradient: "from-teal-400 to-cyan-400",
      features: [
        "Free plagiarism detection tool",
        "Alternative to paid services like Turnitin",
        "Quick and easy content scanning"
      ]
    },
{
      id: "sentence-rewriter",
      name: "Sentence Rewriter",
      description: "Re-write sentences to improve clarity, style, and readability.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 10900,
      gradient: "from-indigo-600 to-purple-600",
      features: [
        "Rewrite sentences for improved clarity",
        "Enhance sentence flow and readability",
        "Support for different writing tones"
      ]
    },
{
      id: "paraphrasing-tool",
      name: "Paraphrasing Tool",
      description: "Paraphrase sentences and paragraphs to create unique content.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 13000,
      gradient: "from-blue-400 to-indigo-400",
      features: [
        "Generate alternative wordings for sentences",
        "Create unique versions of existing content",
        "Ensure plagiarism-free content"
      ]
    },
{
      id: "content-spinner",
      name: "Content Spinner",
      description: "Generate variations of your content with a content spinner tool.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 12600,
      gradient: "from-purple-500 to-indigo-500",
      features: [
        "Spin existing content into new versions",
        "Create unique articles from original text",
        "Ideal for content marketing and SEO"
      ]
    },
{
      id: "text-summarizer",
      name: "Text Summarizer",
      description: "Summarize long content into concise, clear summaries.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 13200,
      gradient: "from-teal-500 to-green-500",
      features: [
        "Generate short summaries from long texts",
        "Improve content efficiency",
        "Ideal for quick content consumption"
      ]
    },
{
      id: "word-replacer-tool",
      name: "Word Replacer Tool",
      description: "Replace specific words or phrases in your content.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 12900,
      gradient: "from-green-600 to-blue-600",
      features: [
        "Find and replace words or phrases",
        "Customize content by changing terms",
        "Enhance content for SEO optimization"
      ]
    },
{
      id: "content-style-guide",
      name: "Content Style Guide",
      description: "Create and follow a consistent content style guide for your writing.",
      category: getCategoryById("grammar-plagiarism"),
      icon: createIcon("M12 2v8m0 0v8m0-8h-6m6 0h6"),
      views: 11400,
      gradient: "from-pink-500 to-red-500",
      features: [
        "Generate consistent style guides for your content",
        "Maintain uniformity in tone, voice, and style",
        "Customize style rules for different writing needs"
      ]
    },
];
