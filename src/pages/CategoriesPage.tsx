import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { Search, Grid3x3, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate stats
  const totalTools = tools.length;
  const totalCategories = categories.length;
  const totalViews = tools.reduce((sum, tool) => sum + tool.views, 0);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const query = searchQuery.toLowerCase();
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Get popular categories (top 6 by tool count)
  const popularCategories = useMemo(() => {
    return [...categories]
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, []);

  return (
    <>
      <Helmet>
        <title>All Categories - Solvezyo</title>
        <meta
          name="description"
          content="Browse all tool categories on Solvezyo. Find the perfect tool from our collection of 35+ categories and 97+ professional tools."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800">
                <Grid3x3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  All Categories
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Explore Tool Categories
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Discover our comprehensive collection of professional tools organized into {totalCategories}+ categories
              </p>

              {/* Stats Section */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {totalCategories}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Categories</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {totalTools}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Professional Tools</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                    {(totalViews / 1000).toFixed(1)}K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Views</div>
                </motion.div>
              </div>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl shadow-lg"
                  data-testid="input-search-categories"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Categories Section */}
        {!searchQuery && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Popular Categories
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {popularCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/category/${category.id}`}>
                      <Card 
                        className="group cursor-pointer h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-800"
                        data-testid={`card-popular-category-${category.id}`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-xl ${category.color.bg} ${category.color.text} transition-transform group-hover:scale-110`}>
                              {category.icon}
                            </div>
                            <Badge variant="secondary" className={`${category.color.badge.bg} ${category.color.badge.text} border-0`}>
                              <Sparkles className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          </div>
                          <CardTitle className="text-xl mt-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {category.name}
                          </CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-400">
                            {category.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {category.count} Tools
                            </span>
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Categories Section */}
        <section className="py-12 px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Grid3x3 className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {searchQuery ? "Search Results" : "All Categories"}
              </h2>
              {searchQuery && (
                <Badge variant="outline" className="ml-2">
                  {filteredCategories.length} found
                </Badge>
              )}
            </div>

            {filteredCategories.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  No categories found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try searching with different keywords
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/category/${category.id}`}>
                      <Card 
                        className="group cursor-pointer h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-800"
                        data-testid={`card-category-${category.id}`}
                      >
                        <CardHeader className="pb-4">
                          <div className={`p-3 rounded-xl ${category.color.bg} ${category.color.text} transition-transform group-hover:scale-110 w-fit`}>
                            {category.icon}
                          </div>
                          <CardTitle className="text-lg mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {category.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {category.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant="secondary" 
                              className={`${category.color.badge.bg} ${category.color.badge.text} border-0 text-xs`}
                            >
                              {category.count} Tools
                            </Badge>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </>
  );
}
