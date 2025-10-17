import { Link, useParams } from "wouter";
import { blogs } from "@/data/blogs";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Eye, Heart, Share2, ChevronUp } from "lucide-react";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { CommentSection } from "@/components/blog/CommentSection";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { SEO } from "@/components/blog/SEO";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function BlogSinglePage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id || ""));
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (blog) {
      setLikeCount(blog.likes);
    }
  }, [blog]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
    } else {
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Blog post not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Sorry, we couldn't find the article you're looking for.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts
  const relatedPosts = blog.relatedPosts
    ? blogs.filter((b) => blog.relatedPosts?.includes(b.id))
    : blogs.filter((b) => b.category === blog.category && b.id !== blog.id).slice(0, 3);

  // Generate Structured Data for BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "image": {
      "@type": "ImageObject",
      "url": blog.image,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": blog.author.name,
      "url": blog.author.url || `${typeof window !== "undefined" ? window.location.origin : ""}/author/${blog.author.name.toLowerCase().replace(/\s+/g, "-")}`,
      "image": blog.author.avatar,
      "jobTitle": blog.author.role,
      "description": blog.author.bio
    },
    "publisher": {
      "@type": "Organization",
      "name": "Solvezyo",
      "url": typeof window !== "undefined" ? window.location.origin : "",
      "logo": {
        "@type": "ImageObject",
        "url": `${typeof window !== "undefined" ? window.location.origin : ""}/logo.png`
      }
    },
    "datePublished": new Date(blog.date).toISOString(),
    "dateModified": blog.modifiedDate ? new Date(blog.modifiedDate).toISOString() : new Date(blog.date).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${blog.id}`
    },
    "keywords": blog.tags.join(", "),
    "articleSection": blog.category,
    "wordCount": blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length,
    "timeRequired": `PT${blog.readingTime}M`,
    "url": `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${blog.id}`,
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ReadAction",
        "userInteractionCount": blog.views
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": likeCount
      }
    ]
  };

  // Generate Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": typeof window !== "undefined" ? window.location.origin : ""
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${typeof window !== "undefined" ? window.location.origin : ""}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${blog.id}`
      }
    ]
  };

  // Combine schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [blogPostingSchema, breadcrumbSchema]
  };

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.description}
        image={blog.image}
        url={`/blog/${blog.id}`}
        author={blog.author.name}
        authorUrl={blog.author.url}
        publishedDate={new Date(blog.date).toISOString()}
        modifiedDate={blog.modifiedDate ? new Date(blog.modifiedDate).toISOString() : new Date(blog.date).toISOString()}
        tags={blog.tags}
        type="article"
        structuredData={combinedSchema}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8"
          aria-label="Breadcrumb"
        >
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/">
              <span className="hover:text-blue-500 cursor-pointer" itemProp="item">
                <span itemProp="name">Home</span>
              </span>
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">
              <span className="hover:text-blue-500 cursor-pointer" itemProp="item">
                <span itemProp="name">Blog</span>
              </span>
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs" itemProp="item" aria-current="page">
              <span itemProp="name">{blog.title}</span>
            </span>
          </motion.div>
        </nav>

        {/* Article Header */}
        <motion.header
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Category Badge */}
          <div className="inline-block mb-4">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {blog.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-3">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-12 h-12 rounded-full ring-2 ring-blue-100 dark:ring-blue-900"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">{blog.author.name}</p>
                <p className="text-sm">{blog.author.role}</p>
              </div>
            </div>
            <span className="hidden md:block">•</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <span className="hidden md:block">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{blog.readingTime} min read</span>
            </div>
            <span className="hidden md:block">•</span>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{blog.views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.figure
          className="max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={blog.image}
            alt={`Featured image for ${blog.title}`}
            className="w-full h-auto object-cover"
            loading="eager"
            itemProp="image"
            width="1200"
            height="630"
          />
        </motion.figure>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Floating Sidebar - Left (Social Share & Like) */}
            <aside className="lg:col-span-2 hidden lg:block">
              <div className="sticky top-24 space-y-4">
                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className={`w-full flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition-all ${
                    liked
                      ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-500"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-red-300 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
                  <span className="text-sm font-semibold">{likeCount}</span>
                  <span className="text-xs">Likes</span>
                </button>

                {/* Share Buttons */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Share2 className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-semibold">Share</span>
                  </div>
                  <ShareButtons
                    url={`/blog/${blog.id}`}
                    title={blog.title}
                    description={blog.description}
                    vertical={true}
                  />
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-7" role="main" aria-label="Blog post content">
              {/* Article Content */}
              <motion.article
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                {/* Last Updated */}
                {blog.modifiedDate && (
                  <div className="mb-6 text-sm text-gray-500 dark:text-gray-400 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/10 rounded-r">
                    <span className="font-semibold">Last updated:</span>{" "}
                    <time dateTime={new Date(blog.modifiedDate).toISOString()}>
                      {new Date(blog.modifiedDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                )}

                <div
                  className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:scroll-mt-24
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:scroll-mt-24
                    prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                    prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                    prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
                    prose-ul:my-6 prose-li:my-2 prose-ul:list-disc
                    prose-ol:my-6 prose-ol:list-decimal
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                  "
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  itemProp="articleBody"
                />
              </motion.article>

              {/* Mobile Share Buttons */}
              <div className="lg:hidden mb-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          liked
                            ? "bg-red-50 dark:bg-red-900/20 text-red-500"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                        <span className="font-semibold">{likeCount}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold">Share</span>
                    </div>
                  </div>
                  <ShareButtons
                    url={`/blog/${blog.id}`}
                    title={blog.title}
                    description={blog.description}
                  />
                </div>
              </div>

              {/* Author Bio */}
              <div className="mb-12">
                <AuthorCard author={blog.author} />
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mb-12">
                  <RelatedPosts posts={relatedPosts} />
                </div>
              )}

              {/* Comments Section */}
              <CommentSection />
            </main>

            {/* Table of Contents - Right Sidebar */}
            <aside className="lg:col-span-3 hidden lg:block">
              <TableOfContents content={blog.content} />
            </aside>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
