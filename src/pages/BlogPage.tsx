import { useState, useMemo } from "react";
import { Link } from "wouter";
import { blogs } from "@/data/blogs";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles, Filter, SortAsc } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Pagination } from "@/components/blog/Pagination";
import { SEO } from "@/components/blog/SEO";
import { Button } from "@/components/ui/button";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "popular">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];
  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags)));
  const featuredBlog = blogs.find((b) => b.featured);
  const popularPosts = [...blogs]
    .filter((b) => !b.featured)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs.filter((b) => !b.featured);

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((b) => b.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter((b) => b.tags.includes(selectedTag));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    const sorted = [...filtered];
    if (sortBy === "latest") {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "oldest") {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === "popular") {
      sorted.sort((a, b) => b.views - a.views);
    }

    return sorted;
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / POSTS_PER_PAGE);
  const paginatedBlogs = filteredAndSortedBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <>
      <SEO
        title="Blog - Expert Insights & Tutorials on Web Development and Technology"
        description="Discover expert insights, tutorials, and the latest trends in web development, design, technology, React, TypeScript, CSS, and more. Learn from industry professionals and level up your skills."
        url="/blog"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Solvezyo Blog",
          "description": "Expert insights, tutorials, and the latest trends in web development, design, and technology",
          "url": `${typeof window !== "undefined" ? window.location.origin : ""}/blog`,
          "publisher": {
            "@type": "Organization",
            "name": "Solvezyo",
            "url": typeof window !== "undefined" ? window.location.origin : ""
          }
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div className="container mx-auto px-4 py-12">
        {/* Hero Header */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Insights & Knowledge</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Solvezyo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover expert insights, tutorials, and the latest trends in web development, design, and technology.
          </p>
        </motion.header>

        {/* Featured Post */}
        {featuredBlog && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href={`/blog/${featuredBlog.id}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer h-[500px]">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Featured Badge */}
                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Featured Article
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="max-w-3xl">
                    <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      {featuredBlog.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-lg text-gray-200 mb-6 line-clamp-2">
                      {featuredBlog.description}
                    </p>
                    
                    {/* Author & Meta */}
                    <div className="flex items-center gap-4 text-white">
                      <img
                        src={featuredBlog.author.avatar}
                        alt={featuredBlog.author.name}
                        className="w-12 h-12 rounded-full ring-2 ring-white"
                      />
                      <div>
                        <p className="font-semibold">{featuredBlog.author.name}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(featuredBlog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span>•</span>
                          <span>{featuredBlog.readingTime} min read</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <div className="mt-6">
                      <Button className="bg-white text-gray-900 hover:bg-blue-500 hover:text-white transition-colors">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Blog Posts - Main Content */}
          <main className="lg:col-span-2 space-y-8" role="main" aria-label="Blog posts">
            {/* Filters & Sort */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              {/* Category Filters */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Filter by Category</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedTag(null);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        selectedCategory === category
                          ? "bg-blue-500 text-white shadow-lg scale-105"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag Filters */}
              {selectedTag && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Filtered by tag:</span>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                      #{selectedTag}
                      <button
                        onClick={() => setSelectedTag(null)}
                        className="ml-2 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                </div>
              )}

              {/* Sort Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SortAsc className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Sort by:</span>
                </div>
                <div className="flex gap-2">
                  {(["latest", "oldest", "popular"] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-all capitalize ${
                        sortBy === option
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{paginatedBlogs.length}</span> of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedBlogs.length}</span> articles
              </p>
            </div>

            {/* Blog Grid */}
            {paginatedBlogs.length > 0 ? (
              <section aria-label="Blog articles list">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {paginatedBlogs.map((blog, index) => (
                    <BlogCard key={blog.id} blog={blog} index={index} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </section>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 dark:text-gray-400">No articles found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedTag(null);
                    setSearchQuery("");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1" role="complementary" aria-label="Blog sidebar">
            <BlogSidebar
              popularPosts={popularPosts}
              categories={categories.filter((c) => c !== "All")}
              onSearch={handleSearch}
            />
          </aside>
        </div>
        </div>
      </div>
    </>
  );
}
