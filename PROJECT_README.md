# Solvezyo - AI Prompt Marketplace

A modern web application built with React, TypeScript, and Tailwind CSS that allows users to browse, copy, and share AI prompts.

## Features

### Prompt Marketplace
- Browse thousands of community-created AI prompts
- Copy prompts with one click
- Like and save your favorite prompts
- Submit your own prompts to share with the community
- Comment on prompts to discuss and provide feedback
- Filter prompts by category, model, and popularity
- Responsive design that works on all devices
- Light and dark mode support

### Tools Collection
- Over 500+ productivity tools organized by category
- Unit converters, calculators, text tools, and more
- Clean, intuitive interface with smooth animations
- Fully responsive design for all device sizes

### Blog & Resources
- Regular updates on AI trends and prompt engineering
- Tutorials and guides for beginners and advanced users
- Industry insights and best practices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: ShadCN UI, Radix UI
- **State Management**: React Query, Context API
- **Routing**: Wouter
- **Animations**: Framer Motion
- **Forms**: React Hook Form, Zod
- **Authentication**: Firebase
- **Build Tool**: Vite
- **Deployment**: Netlify

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── blog/           # Blog-specific components
│   ├── prompt/         # Prompt-specific components
│   ├── roadmaps/       # Roadmap components
│   └── ui/             # Shared UI components (ShadCN)
├── context/            # React context providers
├── data/               # Static data and JSON files
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
│   ├── prompt/         # Prompt website pages
│   ├── tools/          # Individual tool pages
│   └── ...             # Other page components
├── tools/              # Tool category directories
└── utils/              # Helper functions
```

## Prompt Website

The prompt website is a dedicated section of the application that allows users to:

1. **Browse Prompts**: Discover prompts organized by category and AI model
2. **Submit Prompts**: Share your best prompts with the community
3. **Interact**: Like, comment, and share prompts
4. **Search & Filter**: Find exactly what you need quickly

### Prompt Pages

- **Home Page** (`/prompt`): Featured prompts, trending content, and search
- **Browse Page** (`/prompt/browse`): Grid view of all prompts with filtering
- **Submit Page** (`/prompt/submit`): Form to submit new prompts
- **Detail Page** (`/prompt/:id`): Full prompt view with comments and sharing

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Deployment

The application is configured for deployment to Netlify with automatic builds from the main branch.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.