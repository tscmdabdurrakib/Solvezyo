import React, { Suspense, lazy, useMemo, useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/tools";
import { blogs } from "@/data/blogs";
import { categories as staticCategories, type CategoryWithIcon } from "@/data/categories";

// --- Performance Optimization: Lazy Loading Components ---
// React.lazy() and Suspense let us split the code bundle. Components are only loaded when they are first rendered.
const CategoryCard = lazy(() => import('@/components/CategoryCard').then(module => ({ default: module.CategoryCard })));
const ToolCard = lazy(() => import('@/components/ToolCard').then(module => ({ default: module.ToolCard })));
const Newsletter = lazy(() => import('@/components/Newsletter').then(module => ({ default: module.Newsletter })));
const SearchBar = lazy(() => import('@/components/SearchBar').then(module => ({ default: module.SearchBar })));

// A generic loader for suspended components
const ComponentLoader = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// --- Performance Optimization: Lazy Load Sections on Viewport Entry ---
// This component uses the Intersection Observer API to only render its children 
// when the component is scrolled into view. This prevents rendering of off-screen sections.
interface LazyLoadOnViewProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const LazyLoadOnView: React.FC<LazyLoadOnViewProps> = ({ children, threshold = 0.1, rootMargin = "0px" }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null); // Added proper typing

  useEffect(() => {
    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  // Render a placeholder with a minimum height to prevent layout shift
  return <div ref={ref} className="min-h-[200px]">{isInView ? children : null}</div>;
};

// Define a type for our category object that includes the tool count
interface CategoryWithToolCount extends CategoryWithIcon {
  toolCount: number;
}

export default function Home() {
  const [categories, setCategories] = useState<CategoryWithToolCount[]>([]);
  const latestBlogs = useMemo(() => blogs.slice(0, 3), []);

  // --- Performance Optimization: Caching ---
  // Caches category data in sessionStorage to avoid reprocessing on revisits during the same session.
  useEffect(() => {
    try {
      const cachedToolCountsJSON = sessionStorage.getItem('cachedToolCounts');
      
      let toolCounts: { [key: string]: number } = {};

      if (cachedToolCountsJSON) {
        try {
          toolCounts = JSON.parse(cachedToolCountsJSON);
        } catch (parseError) {
          console.warn('Failed to parse cached tool counts:', parseError);
          sessionStorage.removeItem('cachedToolCounts');
        }
      }
      
      if (Object.keys(toolCounts).length === 0) {
        staticCategories.forEach(category => {
          toolCounts[category.id] = tools.filter(tool => tool.category?.id === category.id).length;
        });
        sessionStorage.setItem('cachedToolCounts', JSON.stringify(toolCounts));
      }

      const processedCategories: CategoryWithToolCount[] = staticCategories.map(category => ({
        ...category,
        toolCount: toolCounts[category.id] || 0,
      }));

      setCategories(processedCategories);
    } catch (error) {
      console.error('Error processing categories:', error);
      // Fallback to basic categories without tool counts
      const fallbackCategories: CategoryWithToolCount[] = staticCategories.map(category => ({
        ...category,
        toolCount: 0,
      }));
      setCategories(fallbackCategories);
    }
  }, []);

  // --- Performance Optimization: useMemo ---
  // Memoizes the sorted categories array. The sorting logic runs only when the `categories` state changes,
  // preventing expensive re-sorting on every render.
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      if (a.toolCount > 0 && b.toolCount === 0) return -1;
      if (a.toolCount === 0 && b.toolCount > 0) return 1;
      return (a.name || '').localeCompare(b.name || '');
    });
  }, [categories]);

  // --- Performance Optimization: Simplified Animation Variants ---
  // Using simpler, top-level animation variants reduces complexity.
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      {/* Hero Section */}
      <motion.section 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to <span className="scribble-underline">Solvezyo</span></h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your comprehensive collection of 70+ professional tools across 35 categories. Convert, calculate, edit and optimize with ease.
        </p>

        <div className="mt-8 max-w-xl mx-auto">
          <Suspense fallback={<div>Loading Search...</div>}>
            <SearchBar variant="input" />
          </Suspense>
        </div>
        
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          <Button 
            size="lg" 
            className="px-6" 
            onClick={() => {
              const element = document.getElementById('categories');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Tools
            <svg xmlns="http://www.w.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
          </Button>
          <Link to="/recent">
            <Button size="lg" variant="outline" className="px-6">
              Recently Added
            </Button>
          </Link>
        </div>
      </motion.section>

      <LazyLoadOnView>
        <Suspense fallback={<ComponentLoader />}>
          {/* Categories Section */}
          <motion.section 
            id="categories" 
            className="mb-16"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
              Categories
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
              {sortedCategories.map((category) => (
                <motion.div key={category.id || `category-${Math.random()}`} variants={item} className="w-full max-w-sm">
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </Suspense>
      </LazyLoadOnView>

      <LazyLoadOnView>
        <Suspense fallback={<ComponentLoader />}>
          {/* Most Popular Tools Section */}
          <motion.section
           className="mb-16"
           variants={container}
           initial="hidden"
           animate="show"
         >
           <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl font-bold flex items-center">
               <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
               </svg>
               Our Most Popular Tools
             </h2>
             <Link to="/popular">
               <div className="text-primary hover:text-primary/90 text-sm font-medium flex items-center cursor-pointer">
                 View all
                 <svg xmlns="http://www.w.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                 </svg>
               </div>
             </Link>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
             {tools.slice(0, 8).map((tool) => (
               <motion.div key={tool.id || `tool-${Math.random()}`} variants={item} className="w-full max-w-sm">
                 <ToolCard tool={tool} />
               </motion.div>
             ))}
           </div>
         </motion.section>
        </Suspense>
      </LazyLoadOnView>

      <LazyLoadOnView>
        <Suspense fallback={<ComponentLoader />}>
          {/* Recently Used Tools Section */}
          <motion.section
            className="mb-16"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center">
                <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 100-20 10 10 0 000 20z" />
                </svg>
                Recently Used Tools
              </h2>
              <Link to="/recent">
                <div className="text-primary hover:text-primary/90 text-sm font-medium flex items-center cursor-pointer">
                  View all
                  <svg xmlns="http://www.w.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {tools.slice(4, 7).map((tool) => (
                <motion.div key={tool.id || `tool-${Math.random()}`} variants={item} className="w-full max-w-sm">
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </Suspense>
      </LazyLoadOnView>

      <LazyLoadOnView>
        {/* Social Proof / Trust-Building Section */}
        <motion.section
          className="mb-16 bg-card py-12 rounded-lg text-center shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-card-foreground mb-4">Trusted by 20,000+ users worldwide</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            "This platform has revolutionized the way I handle my daily tasks. Absolutely indispensable!" - Happy User
          </p>
        </motion.section>
      </LazyLoadOnView>

      <LazyLoadOnView>
        {/* How It Works Section */}
        <motion.section
          className="mb-16"
          variants={container}
          initial="hidden"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          animate="show"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={item} className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm border">
              <svg xmlns="http://www.w.org/2000/svg" className="h-12 w-12 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">1. Find Your Tool</h3>
              <p className="text-muted-foreground">Browse our extensive collection or use the search bar to find exactly what you need.</p>
            </motion.div>
            <motion.div variants={item} className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm border">
              <svg xmlns="http://www.w.org/2000/svg" className="h-12 w-12 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2m-2 0h-2m-6 0H6a2 2 0 00-2 2v3a2 2 0 002 2h4m-6 0h6m-6 0v4a2 2 0 002 2h2a2 2 0 002-2v-4m-6 0H6a2 2 0 00-2 2v4a2 2 0 002 2h2m-2 0h6" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">2. Process Your File</h3>
              <p className="text-muted-foreground">Upload your file, input your data, and let our tools do the heavy lifting.</p>
            </motion.div>
            <motion.div variants={item} className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm border">
              <svg xmlns="http://www.w.org/2000/svg" className="h-12 w-12 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">3. Get Instant Results</h3>
              <p className="text-muted-foreground">Download your processed files or view your results instantly.</p>
            </motion.div>
          </div>
        </motion.section>
      </LazyLoadOnView>

      <LazyLoadOnView>
        <Suspense fallback={<ComponentLoader />}>
          {/* Blog / Articles Section */}
          <motion.section
            className="mb-16"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">From Our Blog</h2>
              <Link to="/blog">
                <div className="text-primary hover:text-primary/90 text-sm font-medium flex items-center cursor-pointer">
                  View all blog
                  <svg xmlns="http://www.w.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestBlogs.map((blog) => (
                <motion.div key={blog.id || `blog-${Math.random()}`} variants={item} className="border rounded-lg overflow-hidden shadow-sm">
                  {/* --- Performance Optimization: Lazy load images --- */}
                  {blog.image && (
                    <img 
                      src={blog.image} 
                      alt={blog.title || "Blog image"} 
                      className="w-full h-48 object-cover" 
                      loading="lazy" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{blog.title || "Untitled"}</h3>
                    <p className="text-muted-foreground text-sm">{blog.description || "No description available"}</p>
                    <Link to={`/blog/${blog.id}`} className="text-primary hover:underline mt-2 inline-block">Read More</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </Suspense>
      </LazyLoadOnView>
      
      <LazyLoadOnView>
        <Suspense fallback={<ComponentLoader />}>
          {/* Newsletter Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Newsletter />
          </motion.section>
        </Suspense>
      </LazyLoadOnView>
    </main>
  );
}