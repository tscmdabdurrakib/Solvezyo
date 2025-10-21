import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { roadmaps, Roadmap } from '@/data/roadmaps';
import RoadmapCard from '@/components/roadmaps/RoadmapCard';
import CategoryFilter from '@/components/roadmaps/CategoryFilter';
import SearchBar from '@/components/roadmaps/SearchBar';
// Removed TrendingRoadmaps import

const allCategories = Array.from(new Set(roadmaps.map((r) => r.category)));

const RoadmapHomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const roadmapsPerPage = 27; // 3 columns * 3 rows

  const filteredRoadmaps = useMemo(() => {
    let filtered = roadmaps;

    if (selectedCategory) {
      filtered = filtered.filter((roadmap) => roadmap.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((roadmap) =>
        roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roadmap.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [searchTerm, selectedCategory]);

  const paginatedRoadmaps = useMemo(() => {
    const startIndex = (currentPage - 1) * roadmapsPerPage;
    return filteredRoadmaps.slice(startIndex, startIndex + roadmapsPerPage);
  }, [filteredRoadmaps, currentPage, roadmapsPerPage]);

  const totalPages = Math.ceil(filteredRoadmaps.length / roadmapsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Helmet>
        <title>World Roadmaps | Explore Career & Learning Paths</title>
        <meta name="description" content="Step-by-step learning paths for every career — from tech to marketing." />
      </Helmet>

      {/* Hero Section */}
      <motion.section
        className="text-center mb-16 py-20 relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
          {/* Optional: Animated globe illustration or subtle pattern */}
          <div className="w-full h-full bg-[url('/logo.png')] bg-no-repeat bg-center bg-cover opacity-5 dark:opacity-20"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore Roadmaps to Master Any Field
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            From programming to business — discover step-by-step guides to learn and grow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-4"
          >
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </motion.div>
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            100+ curated learning paths from around the world.
          </motion.p>
        </div>
      </motion.section>

      {/* Category Filter */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Filter by Category</h2>
        <CategoryFilter
          categories={allCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1); // Reset to first page on category change
          }}
        />
      </motion.section>

      {/* All Roadmaps Grid */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* <h2 className="text-3xl font-bold text-center mb-8">All Roadmaps</h2> */}
        {paginatedRoadmaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRoadmaps.map((roadmap, index) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} delay={index * 0.05} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">No roadmaps found for your selection.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        )}
      </motion.section>

      {/* Sidebar (Optional - for future implementation or if layout allows) */}
      {/* For now, we'll omit the sidebar to keep the main content clean and responsive.
          It can be added later if the design allows for a multi-column layout. */}
    </div>
  );
};

export default RoadmapHomePage;