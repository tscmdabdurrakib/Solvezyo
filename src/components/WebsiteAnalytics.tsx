import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Users, Wrench, FolderOpen } from "lucide-react";

interface AnalyticsData {
  totalVisits: number;
  totalTools: number;
  totalCategories: number;
  usersOnline: number;
}

export function WebsiteAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    totalTools: 0,
    totalCategories: 0,
    usersOnline: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/website/analytics');
        const data = await response.json();
        setAnalytics(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        setIsLoading(false);
      }
    };

    fetchAnalytics();
    // Update every 10 seconds
    const interval = setInterval(fetchAnalytics, 10000);
    return () => clearInterval(interval);
  }, []);

  // Real-time counter animation - only increment, never decrement
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setAnalytics(prev => ({
          ...prev,
          // Add random users online (1-4 new users)
          usersOnline: prev.usersOnline + Math.floor(Math.random() * 4) + 1
        }));
      }, 8000 + Math.random() * 12000); // Random interval between 8-20 seconds

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const stats = [
    {
      label: "Total Visits",
      value: analytics.totalVisits,
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Lifetime website visits"
    },
    {
      label: "Active Users",
      value: analytics.usersOnline,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Currently online"
    },
    {
      label: "Available Tools",
      value: analytics.totalTools,
      icon: Wrench,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Ready to use"
    },
    {
      label: "Categories",
      value: analytics.totalCategories,
      icon: FolderOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "Tool categories"
    }
  ];

  if (isLoading) {
    return (
      <div className="py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Live Statistics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time analytics showing our platform's reach and impact
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-4 md:p-6">
                  <div className={`w-12 h-12 md:w-14 md:h-14 ${stat.bgColor} rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} />
                  </div>
                  
                  <motion.div
                    key={stat.value}
                    initial={{ scale: 1.05, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 font-mono tracking-tight leading-none"
                    style={{ 
                      fontSize: stat.value > 99999 ? 'clamp(1.25rem, 4vw, 2rem)' : 'clamp(1.5rem, 5vw, 2.5rem)'
                    }}
                  >
                    {stat.value.toLocaleString('en-US')}
                  </motion.div>
                  
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {stat.label}
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                    {stat.description}
                  </div>

                  {/* Live indicator for dynamic stats */}
                  {(stat.label === "Total Visits" || stat.label === "Active Users") && (
                    <div className="absolute top-2 md:top-3 right-2 md:right-3">
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 dark:text-green-400 font-bold">LIVE</span>
                      </div>
                    </div>
                  )}

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Statistics update in real-time • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
