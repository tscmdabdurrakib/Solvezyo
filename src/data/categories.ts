import React from "react";

export interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}

export interface CategoryColor {
  bg: string;
  text: string;
  badge: {
    bg: string;
    text: string;
  };
}

export interface CategoryWithIcon extends Category {
  icon: React.ReactNode;
  color: CategoryColor;
}

// Helper function to create SVG icons
function createIcon(pathD: string): React.ReactNode {
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

// Color palette for categories
const colorPalette = [
  {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
    badge: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-300",
    },
  },
  {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    badge: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-300",
    },
  },
  {
    bg: "bg-pink-100 dark:bg-pink-900/20",
    text: "text-pink-600 dark:text-pink-400",
    badge: {
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-700 dark:text-pink-300",
    },
  },
  {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    text: "text-yellow-600 dark:text-yellow-400",
    badge: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-700 dark:text-yellow-300",
    },
  },
  {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    badge: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-300",
    },
  },
  {
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
    badge: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-300",
    },
  },
  {
    bg: "bg-indigo-100 dark:bg-indigo-900/20",
    text: "text-indigo-600 dark:text-indigo-400",
    badge: {
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      text: "text-indigo-700 dark:text-indigo-300",
    },
  },
  {
    bg: "bg-orange-100 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
    badge: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-700 dark:text-orange-300",
    },
  },
  {
    bg: "bg-teal-100 dark:bg-teal-900/20",
    text: "text-teal-600 dark:text-teal-400",
    badge: {
      bg: "bg-teal-100 dark:bg-teal-900/30",
      text: "text-teal-700 dark:text-teal-300",
    },
  },
  {
    bg: "bg-cyan-100 dark:bg-cyan-900/20",
    text: "text-cyan-600 dark:text-cyan-400",
    badge: {
      bg: "bg-cyan-100 dark:bg-cyan-900/30",
      text: "text-cyan-700 dark:text-cyan-300",
    },
  },
  {
    bg: "bg-emerald-100 dark:bg-emerald-900/20",
    text: "text-emerald-600 dark:text-emerald-400",
    badge: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-300",
    },
  },
  {
    bg: "bg-lime-100 dark:bg-lime-900/20",
    text: "text-lime-600 dark:text-lime-400",
    badge: {
      bg: "bg-lime-100 dark:bg-lime-900/30",
      text: "text-lime-700 dark:text-lime-300",
    },
  },
  {
    bg: "bg-sky-100 dark:bg-sky-900/20",
    text: "text-sky-600 dark:text-sky-400",
    badge: {
      bg: "bg-sky-100 dark:bg-sky-900/30",
      text: "text-sky-700 dark:text-sky-300",
    },
  },
 {
  bg: "bg-red-100 dark:bg-red-900/20",
  text: "text-red-600 dark:text-red-400",
  badge: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
  },
},
{
  // Email & Communication Tools
  bg: "bg-blue-100 dark:bg-blue-900/20",
  text: "text-blue-600 dark:text-blue-400",
  badge: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
  },
},
{
  // Data Analysis & Visualization Tools
  bg: "bg-emerald-100 dark:bg-emerald-900/20",
  text: "text-emerald-600 dark:text-emerald-400",
  badge: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
  },
},
{
  // Website & Domain Tools
  bg: "bg-indigo-100 dark:bg-indigo-900/20",
  text: "text-indigo-600 dark:text-indigo-400",
  badge: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-700 dark:text-indigo-300",
  },
},
{
  // Network & IP Tools
  bg: "bg-cyan-100 dark:bg-cyan-900/20",
  text: "text-cyan-600 dark:text-cyan-400",
  badge: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-700 dark:text-cyan-300",
  },
},
{
  // Timer & Scheduling Tools
  bg: "bg-orange-100 dark:bg-orange-900/20",
  text: "text-orange-600 dark:text-orange-400",
  badge: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
  },
},
{
  // Randomization Tools
  bg: "bg-pink-100 dark:bg-pink-900/20",
  text: "text-pink-600 dark:text-pink-400",
  badge: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-700 dark:text-pink-300",
  },
},
{
  // Fake Data & Identity Tools
  bg: "bg-red-100 dark:bg-red-900/20",
  text: "text-red-600 dark:text-red-400",
  badge: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
  },
},
{
  // QR Code & Barcode Tools
  bg: "bg-gray-100 dark:bg-gray-900/20",
  text: "text-gray-600 dark:text-gray-400",
  badge: {
    bg: "bg-gray-100 dark:bg-gray-900/30",
    text: "text-gray-700 dark:text-gray-300",
  },
},
{
  // Education & Learning Tools
  bg: "bg-yellow-100 dark:bg-yellow-900/20",
  text: "text-yellow-600 dark:text-yellow-400",
  badge: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-300",
  },
},
{
  // Audio & Music Tools
  bg: "bg-rose-100 dark:bg-rose-900/20",
  text: "text-rose-600 dark:text-rose-400",
  badge: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-700 dark:text-rose-300",
  },
},
{
  // Video Tools
  bg: "bg-fuchsia-100 dark:bg-fuchsia-900/20",
  text: "text-fuchsia-600 dark:text-fuchsia-400",
  badge: {
    bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
    text: "text-fuchsia-700 dark:text-fuchsia-300",
  },
},
{
  // Screen & Webcam Tools
  bg: "bg-teal-100 dark:bg-teal-900/20",
  text: "text-teal-600 dark:text-teal-400",
  badge: {
    bg: "bg-teal-100 dark:bg-teal-900/30",
    text: "text-teal-700 dark:text-teal-300",
  },
},
// Language & Translation Tools
{
  bg: "bg-indigo-100 dark:bg-indigo-900/20",
  text: "text-indigo-600 dark:text-indigo-400",
  badge: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-700 dark:text-indigo-300",
  },
},

// Measurement Tools
{
  bg: "bg-green-100 dark:bg-green-900/20",
  text: "text-green-600 dark:text-green-400",
  badge: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
  },
},

// Health & Fitness Tools
{
  bg: "bg-red-100 dark:bg-red-900/20",
  text: "text-red-600 dark:text-red-400",
  badge: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
  },
},

// Finance & Budget Tools
{
  bg: "bg-emerald-100 dark:bg-emerald-900/20",
  text: "text-emerald-600 dark:text-emerald-400",
  badge: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
  },
},

// Legal & Policy Tools
{
  bg: "bg-gray-100 dark:bg-gray-900/20",
  text: "text-gray-600 dark:text-gray-400",
  badge: {
    bg: "bg-gray-100 dark:bg-gray-900/30",
    text: "text-gray-700 dark:text-gray-300",
  },
},

// E-commerce & Product Tools
{
  bg: "bg-orange-100 dark:bg-orange-900/20",
  text: "text-orange-600 dark:text-orange-400",
  badge: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
  },
},

// Blogging & Publishing Tools
{
  bg: "bg-pink-100 dark:bg-pink-900/20",
  text: "text-pink-600 dark:text-pink-400",
  badge: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-700 dark:text-pink-300",
  },
},

// Game & Entertainment Tools
{
  bg: "bg-yellow-100 dark:bg-yellow-900/20",
  text: "text-yellow-600 dark:text-yellow-400",
  badge: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-300",
  },
},

// Resume & Career Tools
{
  bg: "bg-teal-100 dark:bg-teal-900/20",
  text: "text-teal-600 dark:text-teal-400",
  badge: {
    bg: "bg-teal-100 dark:bg-teal-900/30",
    text: "text-teal-700 dark:text-teal-300",
  },
},

// Productivity & Organization Tools
{
  bg: "bg-purple-100 dark:bg-purple-900/20",
  text: "text-purple-600 dark:text-purple-400",
  badge: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-300",
  },
},

// Collaboration & Teamwork Tools
{
  bg: "bg-blue-100 dark:bg-blue-900/20",
  text: "text-blue-600 dark:text-blue-400",
  badge: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
  },
},

// Testing & QA Tools
{
  bg: "bg-fuchsia-100 dark:bg-fuchsia-900/20",
  text: "text-fuchsia-600 dark:text-fuchsia-400",
  badge: {
    bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
    text: "text-fuchsia-700 dark:text-fuchsia-300",
  },
},

// Cryptocurrency & Blockchain Tools
{
  bg: "bg-amber-100 dark:bg-amber-900/20",
  text: "text-amber-600 dark:text-amber-400",
  badge: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
  },
},

// Weather & Environment Tools
{
  bg: "bg-sky-100 dark:bg-sky-900/20",
  text: "text-sky-600 dark:text-sky-400",
  badge: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    text: "text-sky-700 dark:text-sky-300",
  },
},

// Proxy & VPN Tools
{
  bg: "bg-zinc-100 dark:bg-zinc-900/20",
  text: "text-zinc-600 dark:text-zinc-400",
  badge: {
    bg: "bg-zinc-100 dark:bg-zinc-900/30",
    text: "text-zinc-700 dark:text-zinc-300",
  },
},

// News & RSS Tools
{
  bg: "bg-rose-100 dark:bg-rose-900/20",
  text: "text-rose-600 dark:text-rose-400",
  badge: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-700 dark:text-rose-300",
  },
},

// File Compression & Archive Tools
{
  bg: "bg-stone-100 dark:bg-stone-900/20",
  text: "text-stone-600 dark:text-stone-400",
  badge: {
    bg: "bg-stone-100 dark:bg-stone-900/30",
    text: "text-stone-700 dark:text-stone-300",
  },
},

// Database & SQL Tools
{
  bg: "bg-lime-100 dark:bg-lime-900/20",
  text: "text-lime-600 dark:text-lime-400",
  badge: {
    bg: "bg-lime-100 dark:bg-lime-900/30",
    text: "text-lime-700 dark:text-lime-300",
  },
},

// Art & Illustration Tools
{
  bg: "bg-cyan-100 dark:bg-cyan-900/20",
  text: "text-cyan-600 dark:text-cyan-400",
  badge: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-700 dark:text-cyan-300",
  },
},

// Survey & Form Builder Tools
{
  bg: "bg-violet-100 dark:bg-violet-900/20",
  text: "text-violet-600 dark:text-violet-400",
  badge: {
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-700 dark:text-violet-300",
  },
},

// Font & Typography Tools
{
  bg: "bg-yellow-100 dark:bg-yellow-900/20",
  text: "text-yellow-600 dark:text-yellow-400",
  badge: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-300",
  },
},

// Invoice & Billing Tools
{
  bg: "bg-emerald-100 dark:bg-emerald-900/20",
  text: "text-emerald-600 dark:text-emerald-400",
  badge: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
  },
},

// Mind Mapping & Diagramming Tools
{
  bg: "bg-indigo-100 dark:bg-indigo-900/20",
  text: "text-indigo-600 dark:text-indigo-400",
  badge: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-700 dark:text-indigo-300",
  },
},

// API & Integration Tools
{
  bg: "bg-sky-100 dark:bg-sky-900/20",
  text: "text-sky-600 dark:text-sky-400",
  badge: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    text: "text-sky-700 dark:text-sky-300",
  },
},

// Event & Calendar Tools
{
  bg: "bg-pink-100 dark:bg-pink-900/20",
  text: "text-pink-600 dark:text-pink-400",
  badge: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-700 dark:text-pink-300",
  },
},

// Mapping & Location Tools
{
  bg: "bg-green-100 dark:bg-green-900/20",
  text: "text-green-600 dark:text-green-400",
  badge: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
  },
},

// Password & Credential Tools
{
  bg: "bg-red-100 dark:bg-red-900/20",
  text: "text-red-600 dark:text-red-400",
  badge: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
  },
},

// Backup & Sync Tools
{
  bg: "bg-blue-100 dark:bg-blue-900/20",
  text: "text-blue-600 dark:text-blue-400",
  badge: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
  },
},

// Animation & GIF Tools
{
  bg: "bg-fuchsia-100 dark:bg-fuchsia-900/20",
  text: "text-fuchsia-600 dark:text-fuchsia-400",
  badge: {
    bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
    text: "text-fuchsia-700 dark:text-fuchsia-300",
  },
},

];

// Category data
export const categories: CategoryWithIcon[] = [
  {
    id: "unit-conversion",
    name: "Unit & Conversion Tools",
    description: "Convert between different units of measurement and systems.",
    count: 10,
    icon: createIcon(
      "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.479m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    ),
    color: colorPalette[0],
  },
  {
    id: "calculation",
    name: "Calculation Tools",
    description: "Advanced calculators for various mathematical operations.",
    count: 12,
    icon: createIcon(
      "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z",
    ),
    color: colorPalette[1],
  },
  {
    id: "text-string",
    name: "Text & String Tools",
    description: "Tools for text manipulation, formatting and analysis.",
    count: 16,
    icon: createIcon(
      "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z",
    ),
    color: colorPalette[2],
  },
  {
    id: "downloader",
    name: "Downloader Tools",
    description: "Download anything from internet",
    count: 9,
    icon: createIcon(
      "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    ),
    color: colorPalette[3],
  },
  {
    id: "image-media",
    name: "Image & Media Tools",
    description:
      "Edit, crop, resize, and convert images and other media files.",
    count: 14,
    icon: createIcon(
      "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    ),
    color: colorPalette[4],
  },
  {
    id: "color-design",
    name: "Color & Design Tools",
    description: "Color pickers, palettes, design utilities and more.",
    count: 8,
    icon: createIcon(
      "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
    ),
    color: colorPalette[5],
  },
  {
    id: "pdf-document",
    name: "PDF & Document Tools",
    description: "PDF converters, merge/split tools, document processors.",
    count: 11,
    icon: createIcon(
      "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    ),
    color: colorPalette[6],
  },
  {
    id: "developer",
    name: "Code & Developer Tools",
    description:
      "JSON formatters, regex testers, API testers, and code utilities.",
    count: 18,
    icon: createIcon(
      "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    ),
    color: colorPalette[7],
  },
  {
    id: "seo",
    name: "SEO & Marketing Tools",
    description: "Meta tag generators, keyword extractors, SERP preview tools.",
    count: 11,
    icon: createIcon(
      "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    ),
    color: colorPalette[8],
  },
  {
    id: "writing",
    name: "Writing & Content Tools",
    description: "Tools for content creation, writing, and editing.",
    count: 12,
    icon: createIcon(
      "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
    ),
    color: colorPalette[9],
  },
  {
    id: "grammar-plagiarism",
    name: "Grammar & Plagiarism Tools",
    description: "Grammar checkers, paraphrasers, plagiarism detectors.",
    count: 7,
    icon: createIcon(
      "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
    ),
    color: colorPalette[10],
  },
  {
    id: "ai-automation",
    name: "AI & Automation Tools",
    description: "AI-powered tools and automation utilities.",
    count: 9,
    icon: createIcon(
      "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
    ),
    color: colorPalette[11],
  },
  {
    id: "social-media",
    name: "Social Media Tools",
    description: "Tools for social media content creation and management.",
    count: 10,
    icon: createIcon(
      "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z",
    ),
    color: colorPalette[12],
  },
  {
    id: "privacy-security",
    name: "Privacy & Security Tools",
    description: "Encryption tools, password generators, security utilities.",
    count: 8,
    icon: createIcon(
      "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    ),
    color: colorPalette[13],
  },
  {
    id: "email-communication",
    name: "Email & Communication Tools",
    description: "Email templates, messaging tools, communication utilities.",
    count: 6,
    icon: createIcon(
      "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    ),
    color: colorPalette[14],
  },
  {
    id: "data-analysis",
    name: "Data Analysis & Visualization Tools",
    description: "Tools for analyzing data and creating visualizations.",
    count: 11,
    icon: createIcon(
      "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    ),
    color: colorPalette[15],
  },
  {
    id: "website-domain",
    name: "Website & Domain Tools",
    description: "Domain tools, website testing utilities and more.",
    count: 9,
    icon: createIcon(
      "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    ),
    color: colorPalette[16],
  },
  {
    id: "network-ip",
    name: "Network & IP Tools",
    description: "IP lookup tools, network analyzers, and utilities.",
    count: 7,
    icon: createIcon(
      "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
    ),
    color: colorPalette[17],
  },
  {
    id: "timer-scheduling",
    name: "Timer & Scheduling Tools",
    description: "Countdown timers, scheduling utilities, and reminders.",
    count: 6,
    icon: createIcon("M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"),
    color: colorPalette[18],
  },
  {
    id: "randomization",
    name: "Randomization Tools",
    description: "Random number generators, dice simulators, and more.",
    count: 8,
    icon: createIcon(
      "M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3",
    ),
    color: colorPalette[19],
  },
  {
    id: "fake-data",
    name: "Fake Data & Identity Tools",
    description: "Generate mock data for testing and development.",
    count: 5,
    icon: createIcon(
      "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z",
    ),
    color: colorPalette[20],
  },
  {
    id: "qrcode-barcode",
    name: "QR Code & Barcode Tools",
    description: "Generate and scan QR codes and barcodes.",
    count: 4,
    icon: createIcon(
      "M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z",
    ),
    color: colorPalette[21],
  },
  {
    id: "education-learning",
    name: "Education & Learning Tools",
    description: "Educational tools, flashcards, learning utilities.",
    count: 7,
    icon: createIcon(
      "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    ),
    color: colorPalette[22],
  },
  {
    id: "audio-music",
    name: "Audio & Music Tools",
    description: "Audio converters, music editing tools, and more.",
    count: 9,
    icon: createIcon(
      "M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z",
    ),
    color: colorPalette[23],
  },
  {
    id: "video-tools",
    name: "Video Tools",
    description: "Video converters, editors, and utilities.",
    count: 8,
    icon: createIcon(
      "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
    ),
    color: colorPalette[24],
  },
  {
    id: "screen-webcam",
    name: "Screen & Webcam Tools",
    description: "Screen recording, webcam utilities, and capture tools.",
    count: 5,
    icon: createIcon(
      "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z",
    ),
    color: colorPalette[25],
  },
  {
    id: "language-translation",
    name: "Language & Translation Tools",
    description: "Translation utilities, language detection tools.",
    count: 6,
    icon: createIcon(
      "M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802",
    ),
    color: colorPalette[26],
  },
  {
    id: "measurement",
    name: "Measurement Tools",
    description: "Tools for measuring distances, angles, and more.",
    count: 4,
    icon: createIcon(
      "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3",
    ),
    color: colorPalette[27],
  },
  {
    id: "health",
    name: "Health & Fitness Tools",
    description: "BMI calculators, calorie counters, fitness trackers.",
    count: 7,
    icon: createIcon(
      "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
    ),
    color: colorPalette[28],
  },
  {
    id: "finance",
    name: "Finance & Budget Tools",
    description: "Budget calculators, loan tools, financial utilities.",
    count: 8,
    icon: createIcon(
      "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    ),
    color: colorPalette[29],
  },
  {
    id: "legal-policy",
    name: "Legal & Policy Tools",
    description: "Privacy policy generators, legal document tools.",
    count: 4,
    icon: createIcon(
      "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z",
    ),
    color: colorPalette[30],
  },
  {
    id: "ecommerce-product",
    name: "E-commerce & Product Tools",
    description: "Product listing tools, e-commerce utilities.",
    count: 6,
    icon: createIcon(
      "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    ),
    color: colorPalette[31],
  },
  {
    id: "blogging-publishing",
    name: "Blogging & Publishing Tools",
    description: "Blog post generators, publishing utilities.",
    count: 5,
    icon: createIcon(
      "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
    ),
    color: colorPalette[32],
  },
  {
    id: "game-entertainment",
    name: "Game & Entertainment Tools",
    description: "Game utilities, entertainment tools, and more.",
    count: 7,
    icon: createIcon(
      "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z",
    ),
    color: colorPalette[33],
  },
  {
    id: "resume-career",
    name: "Resume & Career Tools",
    description: "Resume builders, CV templates, career utilities.",
    count: 5,
    icon: createIcon(
      "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z",
    ),
    color: colorPalette[34],
  },
  {
  id: "productivity-organization",
  name: "Productivity & Organization Tools",
  description: "For task managers, note-taking, to-do lists, or Pomodoro timers.",
  count: 0,
  icon: createIcon(
    "M3 7.5A1.5 1.5 0 014.5 6h15a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-12zm3 3h12v1.5H6V10.5zm0 4h12v1.5H6V14.5z"
  ),
  color: colorPalette[35],
},
{
  id: "collaboration-teamwork",
  name: "Collaboration & Teamwork Tools",
  description: "Shared whiteboards, file sharing, or real-time editing utilities.",
  count: 0,
  icon: createIcon(
    "M12 4.5c2.485 0 4.5 2.015 4.5 4.5S14.485 13.5 12 13.5 7.5 11.485 7.5 9 9.515 4.5 12 4.5zm0 10.5c-4.142 0-7.5 2.015-7.5 4.5v.75h15v-.75c0-2.485-3.358-4.5-7.5-4.5z"
  ),
  color: colorPalette[36],
},
{
  id: "testing-qa",
  name: "Testing & QA Tools",
  description: "Browser compatibility checkers, API testers, or debugging utilities.",
  count: 0,
  icon: createIcon(
    "M4.5 5.25h15v13.5h-15V5.25zM6 6.75v10.5h12V6.75H6z"
  ),
  color: colorPalette[37],
},
{
  id: "crypto-blockchain",
  name: "Cryptocurrency & Blockchain Tools",
  description: "Wallet generators, price converters, or transaction trackers.",
  count: 0,
  icon: createIcon(
    "M12 2.25c5.385 0 9.75 3.615 9.75 8.063 0 4.383-4.365 8.062-9.75 8.062S2.25 14.696 2.25 10.313C2.25 5.865 6.615 2.25 12 2.25zm0 3a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"
  ),
  color: colorPalette[38],
},
{
  id: "weather-environment",
  name: "Weather & Environment Tools",
  description: "Forecast calculators, pollution checkers, or climate converters.",
  count: 0,
  icon: createIcon(
    "M6 14.25a6 6 0 1112 0A6 6 0 016 14.25zm9.75 4.5a3.75 3.75 0 11-7.5 0h7.5z"
  ),
  color: colorPalette[39],
},
{
  id: "proxy-vpn",
  name: "Proxy & VPN Tools",
  description: "IP hiders, location spoofers, or anonymity checkers.",
  count: 0,
  icon: createIcon(
    "M12 2.25c5.385 0 9.75 4.365 9.75 9.75S17.385 21.75 12 21.75 2.25 17.385 2.25 12 6.615 2.25 12 2.25zm0 3a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5z"
  ),
  color: colorPalette[40],
},
{
  id: "news-rss",
  name: "News & RSS Tools",
  description: "Feed aggregators, headline summarizers, or article extractors.",
  count: 0,
  icon: createIcon(
    "M4.5 6A13.5 13.5 0 0118 19.5H15A9 9 0 006 10.5V6zM6 15a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
  ),
  color: colorPalette[41],
},
{
  id: "file-compression",
  name: "File Compression & Archive Tools",
  description: "ZIP/RAR creators, extractors, or multi-format converters.",
  count: 0,
  icon: createIcon(
    "M9 3.75h6v16.5H9V3.75zM6 6h12M6 18h12"
  ),
  color: colorPalette[42],
},
{
  id: "database-sql",
  name: "Database & SQL Tools",
  description: "Query builders, schema visualizers, or data exporters.",
  count: 0,
  icon: createIcon(
    "M4.5 6.75c0-1.657 3.358-3 7.5-3s7.5 1.343 7.5 3-3.358 3-7.5 3-7.5-1.343-7.5-3zm0 5.25c0-1.657 3.358-3 7.5-3s7.5 1.343 7.5 3-3.358 3-7.5 3-7.5-1.343-7.5-3z"
  ),
  color: colorPalette[43],
},
{
  id: "art-illustration",
  name: "Art & Illustration Tools",
  description: "Vector editors, icon generators, or digital drawing aids.",
  count: 0,
  icon: createIcon(
    "M6 6l12 12M18 6l-12 12"
  ),
  color: colorPalette[44],
},
{
  id: "survey-form",
  name: "Survey & Form Builder Tools",
  description: "Polls, quizzes, feedback forms, or contact forms with logic.",
  count: 0,
  icon: createIcon(
    "M5.25 6.75h13.5v10.5H5.25V6.75zM8.25 9.75h7.5v1.5h-7.5v-1.5zm0 3h4.5v1.5h-4.5v-1.5z"
  ),
  color: colorPalette[45],
},
{
  id: "font-typography",
  name: "Font & Typography Tools",
  description: "Font identifiers, pair recommenders, or text styling previews.",
  count: 0,
  icon: createIcon(
    "M9 3.75h6L12 18.75h-3L9 3.75z"
  ),
  color: colorPalette[46],
},
{
  id: "invoice-billing",
  name: "Invoice & Billing Tools",
  description: "Create, customize, and calculate invoices, receipts, or estimates.",
  count: 0,
  icon: createIcon(
    "M6 6.75h12v10.5H6V6.75zm3 3h6v1.5H9v-1.5zm0 3h4.5v1.5H9v-1.5z"
  ),
  color: colorPalette[47],
},
{
  id: "mind-mapping",
  name: "Mind Mapping & Diagramming Tools",
  description: "Brainstorming maps, flowcharts, org charts, or UML diagrams.",
  count: 0,
  icon: createIcon(
    "M6 12h12M12 6v12"
  ),
  color: colorPalette[48],
},
{
  id: "api-integration",
  name: "API & Integration Tools",
  description: "Testers, mock servers, or endpoint explorers for developers.",
  count: 0,
  icon: createIcon(
    "M4.5 12h15M12 4.5v15"
  ),
  color: colorPalette[49],
},
{
  id: "event-calendar",
  name: "Event & Calendar Tools",
  description: "Planners for invitations, RSVPs, reminders, or iCal generators.",
  count: 0,
  icon: createIcon(
    "M6 7.5h12v9H6v-9zM9 3.75v3m6-3v3"
  ),
  color: colorPalette[50],
},
{
  id: "mapping-location",
  name: "Mapping & Location Tools",
  description: "Coordinate converters, distance calculators, or GIS viewers.",
  count: 0,
  icon: createIcon(
    "M12 2.25c4.556 0 8.25 3.694 8.25 8.25s-3.694 8.25-8.25 8.25S3.75 15.056 3.75 10.5 7.444 2.25 12 2.25zm0 4.5a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5z"
  ),
  color: colorPalette[51],
},
{
  id: "password-credential",
  name: "Password & Credential Tools",
  description: "Generators, strength checkers, or hashers.",
  count: 0,
  icon: createIcon(
    "M12 3a4.5 4.5 0 014.5 4.5v3h-9v-3A4.5 4.5 0 0112 3zm-6 9.75h12v8.25H6v-8.25z"
  ),
  color: colorPalette[52],
},
{
  id: "backup-sync",
  name: "Backup & Sync Tools",
  description: "File backups, diff checkers, or sync simulators.",
  count: 0,
  icon: createIcon(
    "M6.75 12a5.25 5.25 0 1110.5 0M12 6.75v3.75m0 0l-1.5-1.5M12 10.5l1.5-1.5"
  ),
  color: colorPalette[53],
},
{
  id: "animation-gif",
  name: "Animation & GIF Tools",
  description: "Creators, editors, or frame extractors for simple animations.",
  count: 0,
  icon: createIcon(
    "M6 6h12v12H6V6zm3 3h6v6H9V9z"
  ),
  color: colorPalette[54],
},

];
