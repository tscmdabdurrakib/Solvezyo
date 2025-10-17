export interface Blog {
  id: number;
  title: string;
  slug: string;
  date: string;
  modifiedDate?: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  readingTime: number;
  author: {
    name: string;
    avatar: string;
    bio: string;
    role: string;
    url?: string;
  };
  image: string;
  featured: boolean;
  views: number;
  likes: number;
  relatedPosts?: number[];
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Mastering React Hooks",
    slug: "ultimate-guide-react-hooks",
    date: "2024-07-28",
    description: "A deep dive into React Hooks, covering everything from useState to custom hooks. Learn how to write cleaner, more efficient React components.",
    content: `
      <p>React Hooks have revolutionized the way we write components. Before hooks, we had to rely on class components to manage state and lifecycle methods. Now, with hooks like <strong>useState</strong>, <strong>useEffect</strong>, and <strong>useContext</strong>, we can build powerful functional components with less boilerplate.</p>
      <h2 class="text-2xl font-bold my-4">useState: The Foundation of State</h2>
      <p>The <code>useState</code> hook is the most fundamental hook. It allows you to add state to your functional components. Here's a simple example:</p>
      <pre class="bg-gray-800 text-white p-4 rounded-md my-4"><code>
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
      </code></pre>
      <h2 class="text-2xl font-bold my-4">useEffect: Handling Side Effects</h2>
      <p>The <code>useEffect</code> hook lets you perform side effects in your components. This includes data fetching, subscriptions, or manually changing the DOM. It runs after every render by default, but you can control when it runs by passing a dependency array.</p>
      <h2 class="text-2xl font-bold my-4">Custom Hooks: Reusable Logic</h2>
      <p>Custom hooks allow you to extract component logic into reusable functions. This is one of the most powerful features of hooks, enabling you to share stateful logic across multiple components without changing your component hierarchy.</p>
      <p>By mastering React Hooks, you'll write more maintainable and testable code. Start with the basics, experiment with different hooks, and gradually build your own custom hooks for your specific use cases.</p>
    `,
    category: "React",
    tags: ["React", "Hooks", "JavaScript", "Frontend", "Web Development"],
    readingTime: 8,
    author: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      bio: "Senior Frontend Developer passionate about React and modern web technologies. 10+ years of experience building scalable applications.",
      role: "Senior Frontend Developer"
    },
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: true,
    views: 15420,
    likes: 342,
    relatedPosts: [2, 3]
  },
  {
    id: 2,
    title: "TailwindCSS for Modern Web Design",
    slug: "tailwindcss-modern-web-design",
    date: "2024-07-25",
    description: "Discover how TailwindCSS can speed up your development workflow and help you create beautiful, responsive designs without writing custom CSS.",
    content: `
      <p>TailwindCSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your HTML. This approach has several advantages over traditional CSS frameworks like Bootstrap.</p>
      <h2 class="text-2xl font-bold my-4">Why Utility-First?</h2>
      <p>With utility classes, you are not limited by pre-designed components. You have the freedom to create unique designs without fighting against the framework's styles. It also helps in keeping your CSS bundle size small, as you only include the styles you actually use.</p>
      <h2 class="text-2xl font-bold my-4">Responsive Design Made Easy</h2>
      <p>Tailwind makes responsive design intuitive. You can apply different classes for different screen sizes directly in your markup:</p>
      <pre class="bg-gray-800 text-white p-4 rounded-md my-4"><code>
<div class="w-full md:w-1/2 lg:w-1/3">
  {/* ... */}
</div>
      </code></pre>
      <p>This makes it easy to create complex responsive layouts without writing a single media query.</p>
      <h2 class="text-2xl font-bold my-4">Customization and Flexibility</h2>
      <p>Tailwind is highly customizable through its configuration file. You can define your own color palette, spacing scale, breakpoints, and more. This ensures your design system remains consistent across your entire application.</p>
      <p>Whether you're building a simple landing page or a complex web application, TailwindCSS provides the tools you need to create beautiful, responsive designs quickly and efficiently.</p>
    `,
    category: "CSS",
    tags: ["TailwindCSS", "CSS", "Design", "Frontend", "Responsive"],
    readingTime: 5,
    author: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
      bio: "UI/UX Designer and Frontend Developer with a passion for beautiful, functional web interfaces.",
      role: "UI/UX Designer"
    },
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: false,
    views: 8734,
    likes: 187,
    relatedPosts: [1, 4]
  },
  {
    id: 3,
    title: "Getting Started with Vite: The Next-Generation Frontend Tool",
    slug: "getting-started-vite",
    date: "2024-07-22",
    description: "Learn why Vite is becoming the go-to build tool for modern web development, offering lightning-fast hot module replacement and optimized builds.",
    content: `
      <p>Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts: a dev server that provides rich feature enhancements over native ES modules, and a build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.</p>
      <h2 class="text-2xl font-bold my-4">Lightning-Fast HMR</h2>
      <p>One of Vite's standout features is its Hot Module Replacement (HMR) that stays fast regardless of the size of your application. This is a huge productivity boost for developers.</p>
      <h2 class="text-2xl font-bold my-4">Optimized Builds</h2>
      <p>Vite uses Rollup for its production builds, which is highly optimized and produces small bundle sizes. It also supports features like code splitting and CSS pre-processors out of the box.</p>
      <h2 class="text-2xl font-bold my-4">Rich Plugin Ecosystem</h2>
      <p>Vite has a rich ecosystem of plugins that extend its capabilities. Whether you need React support, Vue support, or any other framework integration, there's likely a plugin available.</p>
      <p>Making the switch to Vite can dramatically improve your development experience with faster builds, instant server start, and lightning-fast HMR. It's the future of frontend tooling.</p>
    `,
    category: "Tooling",
    tags: ["Vite", "Build Tools", "JavaScript", "Development", "Performance"],
    readingTime: 6,
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      bio: "Full-stack developer specializing in modern JavaScript frameworks and build optimization.",
      role: "Full-Stack Developer"
    },
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: false,
    views: 6892,
    likes: 156,
    relatedPosts: [1, 2]
  },
  {
    id: 4,
    title: "A Guide to SEO for Developers",
    slug: "seo-guide-developers",
    date: "2024-07-20",
    description: "SEO is not just for marketers. As a developer, you have a huge impact on your site's search engine ranking. This guide will cover the technical SEO basics you need to know.",
    content: `
        <p>Search Engine Optimization (SEO) is crucial for any website that wants to be discovered. While content is king, technical SEO forms the foundation upon which good content can rank. Developers play a key role in ensuring that a website is crawlable, indexable, and fast.</p>
        <h2 class="text-2xl font-bold my-4">Key Areas of Technical SEO</h2>
        <ul>
            <li><strong>Site Speed:</strong> A fast-loading website is a must. Optimize images, use a CDN, and leverage browser caching.</li>
            <li><strong>Mobile-Friendliness:</strong> With mobile-first indexing, your site must be responsive and provide a great user experience on all devices.</li>
            <li><strong>Crawlability:</strong> Ensure that search engine bots can easily crawl your site. Use a well-structured robots.txt file and a sitemap.</li>
        </ul>
        <h2 class="text-2xl font-bold my-4">Structured Data and Schema Markup</h2>
        <p>Implementing structured data helps search engines understand your content better. Use Schema.org markup to provide rich snippets in search results.</p>
        <h2 class="text-2xl font-bold my-4">Core Web Vitals</h2>
        <p>Google's Core Web Vitals are essential metrics that measure user experience. Focus on LCP (Largest Contentful Paint), FID (First Input Delay), and CLS (Cumulative Layout Shift) to improve your rankings.</p>
        <p>By mastering technical SEO, developers can significantly impact a website's visibility and performance in search engine results.</p>
    `,
    category: "SEO",
    tags: ["SEO", "Web Development", "Performance", "Technical SEO", "Google"],
    readingTime: 7,
    author: {
        name: "Sarah Lee",
       avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
       bio: "SEO Specialist and Web Developer helping businesses improve their online visibility.",
       role: "SEO Specialist"
    },
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: false,
    views: 9456,
    likes: 203,
    relatedPosts: [1, 3]
  },
  {
    id: 5,
    title: "TypeScript Best Practices for Large-Scale Applications",
    slug: "typescript-best-practices",
    date: "2024-07-18",
    description: "Learn essential TypeScript patterns and practices that will help you build maintainable, scalable applications with confidence.",
    content: `
      <p>TypeScript has become the de facto standard for building large-scale JavaScript applications. Its static typing system helps catch errors early and improves code maintainability. However, to truly leverage TypeScript's power, you need to follow best practices.</p>
      <h2 class="text-2xl font-bold my-4">Strict Mode Configuration</h2>
      <p>Always enable strict mode in your tsconfig.json. This enables all strict type-checking options and helps you write safer code from the start.</p>
      <h2 class="text-2xl font-bold my-4">Interface vs Type</h2>
      <p>While interfaces and types can often be used interchangeably, prefer interfaces for object shapes and types for unions, intersections, and mapped types.</p>
      <h2 class="text-2xl font-bold my-4">Utility Types</h2>
      <p>TypeScript provides powerful utility types like Partial, Pick, Omit, and Record. Master these to write more expressive and reusable type definitions.</p>
      <p>By following these best practices, you'll build more robust applications and enjoy better developer experience with improved autocomplete and error detection.</p>
    `,
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Programming", "Code Quality"],
    readingTime: 9,
    author: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
      bio: "TypeScript enthusiast and software architect with experience in enterprise-scale applications.",
      role: "Software Architect"
    },
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: false,
    views: 11234,
    likes: 287,
    relatedPosts: [1, 3]
  },
  {
    id: 6,
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    date: "2024-07-15",
    description: "Accessibility is not optional. Learn how to build web applications that everyone can use, regardless of their abilities.",
    content: `
      <p>Web accessibility ensures that websites and applications can be used by everyone, including people with disabilities. It's not just about compliance—it's about creating inclusive digital experiences.</p>
      <h2 class="text-2xl font-bold my-4">Semantic HTML</h2>
      <p>Use semantic HTML elements like header, nav, main, and footer. These provide meaning to screen readers and improve SEO.</p>
      <h2 class="text-2xl font-bold my-4">ARIA Attributes</h2>
      <p>ARIA (Accessible Rich Internet Applications) attributes help make dynamic content and advanced UI controls accessible. However, use them sparingly—semantic HTML should be your first choice.</p>
      <h2 class="text-2xl font-bold my-4">Keyboard Navigation</h2>
      <p>Ensure all interactive elements can be accessed via keyboard. Test your application using only the Tab, Enter, and Arrow keys.</p>
      <p>Building accessible applications benefits everyone. It improves usability, expands your audience, and demonstrates your commitment to inclusive design.</p>
    `,
    category: "Accessibility",
    tags: ["Accessibility", "a11y", "Web Development", "ARIA", "Inclusive Design"],
    readingTime: 7,
    author: {
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d",
      bio: "Accessibility advocate and frontend developer committed to building inclusive web experiences.",
      role: "Accessibility Engineer"
    },
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: false,
    views: 7821,
    likes: 198,
    relatedPosts: [4, 2]
  }
];