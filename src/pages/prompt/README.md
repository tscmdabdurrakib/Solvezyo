# Prompt Website Documentation

## Overview
This is a modern prompt website where users can browse, copy, and share AI prompts. The website includes all the required features and follows best practices for React, TypeScript, and Tailwind CSS.

## Features Implemented

### 1. Main Prompt Page (Home Page)
- Hero section with a bold tagline
- Search bar with filters
- Featured prompts in beautiful cards
- Trending prompts carousel
- Stats section
- Features section
- CTA section

### 2. Prompts Page
- Grid layout showing all prompts
- Each prompt card shows:
  - Prompt title
  - Short description
  - Tags (e.g., ChatGPT, Midjourney, Coding, Marketing)
  - Copy button with "Copied!" feedback
- Filter sidebar (Category, Model, Popularity)
- Infinite scroll or pagination

### 3. Submit Prompt Page
- Form for users to submit new prompts (Title, Description, Tags, Model, Category)
- Validation + success alert
- Preview section before publishing

### 4. Prompt Details Page
- Full prompt view
- Copy button
- Related prompts section
- Social share buttons (Facebook, Reddit, Twitter, LinkedIn)
- Comment section on prompt detail page

## Global Features
- Responsive design (desktop, tablet, mobile)
- Light/Dark mode toggle
- Copy-to-clipboard functionality
- SEO-friendly meta tags
- Toast notifications (for copy, submit, etc.)

## Bonus Features
- "Like" or "Save" prompts
- Comment section on prompt detail page
- Category-based browsing (e.g., ChatGPT, Midjourney, Coding, Writing)

## Components
The following reusable components have been created:
- PromptCard
- PromptSearch
- PromptFilter
- PromptList
- PromptDetail
- PromptComment

## Routes
The following routes have been added:
- `/prompt` - Main prompt page
- `/prompt/browse` - Browse all prompts
- `/prompt/submit` - Submit a new prompt
- `/prompt/:id` - Prompt detail page

## Navigation
The prompt link has been added to the "Others" dropdown in the main navigation menu.

## Technology Stack
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for smooth animations
- Lucide-react for icons
- ShadCN UI components
- React Hook Form for form validation
- Zod for schema validation