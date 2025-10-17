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

export const downloaderTools: Tool[] = [
{
    id: "facebook-reels-downloader",
    name: "Facebook Reels Downloader",
    description:
      "Download Facebook Reels instantly in MP4 format with no watermarks.",
    category: getCategoryById("downloader"),
    icon: createIcon(
      "M4 4h16c1.1 0 2 .9 2 2v2h-2V6H4v12h16v-2h2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM14 10.5v3l-2.5-1.5L14 10.5zM22 10V8l-6 4 6 4v-2l-3.5-2L22 10z",
    ),
    views: 8900,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Save Facebook Reels in high quality",
      "Fast download with one click",
      "Mobile and desktop friendly",
      "Supports private reels (if accessible)",
    ],
  },
{
    id: "facebook-photo-downloader",
    name: "Facebook Photo Downloader",
    description:
      "Download high-quality Facebook photos from posts, albums, or profiles.",
    category: getCategoryById("downloader"),
    icon: createIcon(
      "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm4 3a2 2 0 110-4 2 2 0 010 4zm0 2l2.5 3.2 3.5-4.5 5 6.3H4l4-5z",
    ),
    views: 7650,
    gradient: "from-blue-400 to-cyan-500",
    features: [
      "Download single or multiple Facebook photos",
      "Support for public and profile pictures",
      "Save photos in original resolution",
    ],
  },
{
    id: "youtube-video-downloader",
    name: "YouTube Video Downloader",
    description:
      "Download videos from YouTube in various resolutions, including 1080p and 4K.",
    category: getCategoryById("downloader"),
    icon: createIcon(
      "M10 15l5.19-3L10 9v6zm10-3c0-2.21-.18-4.42-.54-6.63a2.5 2.5 0 00-1.76-1.94C15.99 3.77 12 3.75 12 3.75s-3.99.02-5.7.68a2.5 2.5 0 00-1.76 1.94C4.18 7.58 4 9.79 4 12s.18 4.42.54 6.63a2.5 2.5 0 001.76 1.94c1.71.66 5.7.68 5.7.68s3.99-.02 5.7-.68a2.5 2.5 0 001.76-1.94c.36-2.21.54-4.42.54-6.63z",
    ),
    views: 34700,
    gradient: "from-red-600 to-yellow-500",
    features: [
      "Supports MP4 and WebM formats",
      "Choose from multiple resolutions",
      "Download playlists and subtitles",
      "No ads or watermarks",
    ],
  },
{
    id: "youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    description:
      "Extract and download high-resolution thumbnails from any YouTube video.",
    category: getCategoryById("downloader"),
    icon: createIcon(
      "M10 15l5.19-3L10 9v6zm10-3c0-2.21-.18-4.42-.54-6.63a2.5 2.5 0 00-1.76-1.94C15.99 3.77 12 3.75 12 3.75s-3.99.02-5.7.68a2.5 2.5 0 00-1.76 1.94C4.18 7.58 4 9.79 4 12s.18 4.42.54 6.63a2.5 2.5 0 001.76 1.94c1.71.66 5.7.68 5.7.68s3.99-.02 5.7-.68a2.5 2.5 0 001.76-1.94c.36-2.21.54-4.42.54-6.63z",
    ),
    views: 19400,
    gradient: "from-orange-500 to-red-500",
    features: [
      "HD, SD, and MQ thumbnail options",
      "Preview before download",
      "Copy URL or download instantly",
    ],
  },
{
    id: "youtube-audio-downloader",
    name: "YouTube Audio Downloader (MP3)",
    description: "Download high-quality MP3 audio from any YouTube video.",
    category: getCategoryById("downloader"),
    icon: createIcon(
      "M10 15l5.19-3L10 9v6zm10-3c0-2.21-.18-4.42-.54-6.63a2.5 2.5 0 00-1.76-1.94C15.99 3.77 12 3.75 12 3.75s-3.99.02-5.7.68a2.5 2.5 0 00-1.76 1.94C4.18 7.58 4 9.79 4 12s.18 4.42.54 6.63a2.5 2.5 0 001.76 1.94c1.71.66 5.7.68 5.7.68s3.99-.02 5.7-.68a2.5 2.5 0 001.76-1.94c.36-2.21.54-4.42.54-6.63z",
    ),
    views: 40200,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Extract audio from YouTube",
      "Download as MP3, M4A, or WAV",
      "ID3 tag support (title, artist, album)",
      "No registration needed",
    ],
  },
{
    id: "snapchat-story-downloader",
    name: "Snapchat Story Downloader",
    description: "Download Snapchat stories or snaps before they expire.",
    category: getCategoryById("downloader"),
    icon: createIcon("M12 4a8 8 0 110 16 8 8 0 010-16z"),
    views: 11700,
    gradient: "from-yellow-400 to-orange-400",
    features: [
      "Save public Snapchat stories",
      "Supports snaps and spotlight videos",
      "No watermarks on downloads",
    ],
  },
{
    id: "instagram-video-downloader",
    name: "Instagram Video Downloader",
    description: "Download Instagram videos from posts, IGTV, and reels.",
    category: getCategoryById("downloader"),
    icon: createIcon("M4 4h16v16H4z"),
    views: 22000,
    gradient: "from-pink-500 to-red-500",
    features: [
      "Save video posts from Instagram",
      "No login required",
      "Supports multiple formats",
    ],
  },
{
    id: "instagram-reels-downloader",
    name: "Instagram Reels Downloader",
    description: "Download Instagram Reels in HD with no watermark.",
    category: getCategoryById("downloader"),
    icon: createIcon("M8 4v16m8-16v16"),
    views: 25000,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Download public Instagram Reels",
      "MP4 format support",
      "High-speed servers",
    ],
  },
{
    id: "instagram-photo-downloader",
    name: "Instagram Photo Downloader",
    description:
      "Download Instagram photos from posts, profiles, and carousels.",
    category: getCategoryById("downloader"),
    icon: createIcon("M4 4h16v16H4z"),
    views: 19300,
    gradient: "from-yellow-500 to-red-500",
    features: [
      "Save single or multiple images",
      "Supports carousels and stories",
      "Original quality download",
    ],
  },
{
    id: "instagram-story-downloader",
    name: "Instagram Story Downloader",
    description: "Download Instagram stories before they disappear.",
    category: getCategoryById("downloader"),
    icon: createIcon("M4 4h16v16H4z"),
    views: 17000,
    gradient: "from-pink-400 to-orange-400",
    features: [
      "Download public stories in one click",
      "Save videos and photos",
      "Works on mobile and desktop",
    ],
  },
{
    id: "instagram-highlights-downloader",
    name: "Instagram Highlights Downloader",
    description: "Download Instagram Highlights including cover and content.",
    category: getCategoryById("downloader"),
    icon: createIcon("M4 4h16v16H4z"),
    views: 14500,
    gradient: "from-red-600 to-purple-600",
    features: [
      "Save entire Instagram Highlights",
      "Supports videos and photos",
      "Includes highlight cover download",
    ],
  },
{
    id: "pinterest-video-downloader",
    name: "Pinterest Video Downloader",
    description:
      "Download videos from Pinterest boards or pins in high resolution.",
    category: getCategoryById("downloader"),
    icon: createIcon("M4 4h16v16H4z"),
    views: 12100,
    gradient: "from-red-500 to-pink-500",
    features: [
      "Save Pinterest videos easily",
      "Supports mobile and desktop",
      "MP4 format supported",
    ],
  },
{
    id: "pinterest-image-downloader",
    name: "Pinterest Image Downloader",
    description:
      "Download Pinterest images from any pin or board in original quality.",
    category: getCategoryById("downloader"),
    icon: createIcon("M12 4l-8 8 8 8 8-8-8-8z"),
    views: 9900,
    gradient: "from-pink-500 to-red-400",
    features: [
      "Download single or multiple images",
      "Preserve image resolution",
      "Bulk download support",
    ],
  },
{
    id: "reddit-video-downloader",
    name: "Reddit Video Downloader",
    description:
      "Download videos from Reddit including audio (with merged option).",
    category: getCategoryById("downloader"),
    icon: createIcon("M4 4h16v16H4z"),
    views: 13200,
    gradient: "from-orange-500 to-yellow-400",
    features: [
      "MP4 video and audio support",
      "Supports NSFW (with filter)",
      "Subreddit-specific downloads",
    ],
  },
{
    id: "tiktok-video-downloader",
    name: "TikTok Video Downloader",
    description: "Download TikTok videos with or without watermark in HD.",
    category: getCategoryById("downloader"),
    icon: createIcon("M12 4l-8 8 8 8 8-8-8-8z"),
    views: 28400,
    gradient: "from-pink-500 to-blue-500",
    features: [
      "Watermark-free download option",
      "Supports music and sound extraction",
      "Batch TikTok link support",
    ],
  },
{
    id: "twitter-video-downloader",
    name: "Twitter/X Video Downloader",
    description: "Download videos from Twitter/X posts in various resolutions.",
    category: getCategoryById("downloader"),
    icon: createIcon("M5 3l14 9-14 9V3z"),
    views: 17800,
    gradient: "from-blue-500 to-sky-500",
    features: [
      "MP4 video download from any tweet",
      "Select from 360p to 1080p",
      "Save private video (if accessible)",
    ],
  },
{
    id: "twitter-photo-downloader",
    name: "Twitter/X Photo Downloader",
    description: "Download images from Twitter/X posts in full resolution.",
    category: getCategoryById("downloader"),
    icon: createIcon("M12 4l8 8-8 8-8-8 8-8"),
    views: 11400,
    gradient: "from-sky-400 to-blue-600",
    features: [
      "Download image sets from tweets",
      "Supports GIFs and PNGs",
      "Batch media download support",
    ],
  },
{
    id: "vimeo-video-downloader",
    name: "Vimeo Video Downloader",
    description: "Download high-quality videos from Vimeo in MP4 format.",
    category: getCategoryById("downloader"),
    icon: createIcon("M8 4v16m8-16v16"),
    views: 15600,
    gradient: "from-gray-500 to-blue-400",
    features: [
      "Supports private and public videos",
      "720p, 1080p, and 4K options",
      "No watermark",
    ],
  },
{
    id: "linkedin-video-downloader",
    name: "LinkedIn Video Downloader",
    description: "Download videos from LinkedIn posts or company pages.",
    category: getCategoryById("downloader"),
    icon: createIcon("M4 4h16v16H4z"),
    views: 9200,
    gradient: "from-blue-700 to-blue-500",
    features: [
      "Save LinkedIn post videos",
      "Supports company and profile content",
      "Professional-grade quality download",
    ],
  },
{
    id: "linkedin-photo-downloader",
    name: "LinkedIn Photo Downloader",
    description:
      "Download profile or post images from LinkedIn in high resolution.",
    category: getCategoryById("downloader"),
    icon: createIcon("M12 4l8 8-8 8-8-8 8-8"),
    views: 6800,
    gradient: "from-slate-600 to-blue-500",
    features: [
      "Download profile pictures, covers, and post images",
      "One-click download",
      "Supports PNG and JPG",
    ],
  },
{
    id: "soundcloud-audio-downloader",
    name: "SoundCloud Audio Downloader",
    description: "Download music or tracks from SoundCloud in MP3 format.",
    category: getCategoryById("downloader"),
    icon: createIcon("M12 4v16m8-16v16"),
    views: 18900,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "MP3, AAC, and FLAC format support",
      "Download playlists or albums",
      "High-bitrate support",
    ],
  },
{
    id: "dailymotion-video-downloader",
    name: "DailyMotion Video Downloader",
    description: "Download videos from DailyMotion in full HD.",
    category: getCategoryById("downloader"),
    icon: createIcon("M4 4h16v16H4z"),
    views: 10500,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Supports 480p to 1080p resolution",
      "Batch URL support",
      "Quick and reliable server",
    ],
  },
{
    id: "twitch-clip-downloader",
    name: "Twitch Clip Downloader",
    description: "Download Twitch clips or highlights from streamers.",
    category: getCategoryById("downloader"),
    icon: createIcon("M5 3l14 9-14 9V3z"),
    views: 13600,
    gradient: "from-purple-700 to-indigo-600",
    features: [
      "Download clips in MP4",
      "Download VOD highlights",
      "Supports usernames and clip links",
    ],
  },
{
    id: "imdb-trailer-downloader",
    name: "IMDb Trailer Downloader",
    description: "Download movie trailers and teasers directly from IMDb.",
    category: getCategoryById("downloader"),
    icon: createIcon("M12 4v16m8-16v16"),
    views: 7700,
    gradient: "from-yellow-400 to-amber-500",
    features: [
      "Save trailers in MP4 or MOV",
      "High-definition support",
      "Movie, series, and episode trailers",
    ],
  },
];
