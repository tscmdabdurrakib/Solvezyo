import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTools } from "@/context/ToolsContext";
import { 
  HomeIcon,
  FolderKanban,
  GanttChartSquare,
  FileSearch,
  Info,
  Shield,
  FileText,
  Mail,
  ChevronRight,
  ExternalLink,
  Layers,
  Users,
  LayoutGrid,
  HelpCircle
} from "lucide-react";

export default function SitemapPage() {
  const { categories = [], tools = [] } = useTools() || { categories: [], tools: [] };

  // Group categories for better organization
  const groupedCategories = {
    popular: categories.slice(0, 8),
    media: categories.filter(c => 
      c.name.toLowerCase().includes("image") || 
      c.name.toLowerCase().includes("video") || 
      c.name.toLowerCase().includes("audio") ||
      c.name.toLowerCase().includes("media")
    ),
    data: categories.filter(c => 
      c.name.toLowerCase().includes("data") || 
      c.name.toLowerCase().includes("file") || 
      c.name.toLowerCase().includes("convert")
    ),
    dev: categories.filter(c => 
      c.name.toLowerCase().includes("code") || 
      c.name.toLowerCase().includes("developer") || 
      c.name.toLowerCase().includes("programming")
    ),
  };
  
  // Function to render links with animation
  const AnimatedLink = ({ href, text, icon }: { href: string; text: string; icon?: React.ReactNode }) => (
    <motion.div 
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link 
        href={href}
        className="flex items-center py-2 text-muted-foreground hover:text-primary transition-colors"
      >
        {icon && <span className="mr-2 text-primary">{icon}</span>}
        <span>{text}</span>
      </Link>
    </motion.div>
  );
  
  return (
    <div className="container py-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Site Map
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find all the pages and resources available on ToolHub to help you navigate our site more effectively.
        </p>
      </motion.section>

      {/* Quick Links */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <GanttChartSquare className="mr-2 h-6 w-6 text-primary" />
          Quick Navigation
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card hover:bg-card/80 border rounded-xl p-5 transition-colors shadow-sm hover:shadow"
          >
            <Link href="/" className="flex flex-col items-center text-center h-full space-y-3">
              <HomeIcon className="h-12 w-12 text-primary mb-1" />
              <h3 className="font-medium text-lg">Home</h3>
              <p className="text-sm text-muted-foreground">Discover our featured and popular tools</p>
            </Link>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card hover:bg-card/80 border rounded-xl p-5 transition-colors shadow-sm hover:shadow"
          >
            <Link href="/categories" className="flex flex-col items-center text-center h-full space-y-3">
              <FolderKanban className="h-12 w-12 text-primary mb-1" />
              <h3 className="font-medium text-lg">Categories</h3>
              <p className="text-sm text-muted-foreground">Browse all tool categories</p>
            </Link>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card hover:bg-card/80 border rounded-xl p-5 transition-colors shadow-sm hover:shadow"
          >
            <Link href="/about" className="flex flex-col items-center text-center h-full space-y-3">
              <Info className="h-12 w-12 text-primary mb-1" />
              <h3 className="font-medium text-lg">About Us</h3>
              <p className="text-sm text-muted-foreground">Learn about our platform and mission</p>
            </Link>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card hover:bg-card/80 border rounded-xl p-5 transition-colors shadow-sm hover:shadow"
          >
            <Link href="/search" className="flex flex-col items-center text-center h-full space-y-3">
              <FileSearch className="h-12 w-12 text-primary mb-1" />
              <h3 className="font-medium text-lg">Search</h3>
              <p className="text-sm text-muted-foreground">Find specific tools and resources</p>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Categories Section (Col 1-2) */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2 space-y-10"
        >
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center border-b pb-2">
              <LayoutGrid className="mr-2 h-6 w-6 text-primary" />
              Tool Categories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Popular Categories */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-primary">
                  <span className="w-2 h-6 bg-primary rounded-full mr-2"></span>
                  Popular Categories
                </h3>
                <ul className="space-y-1.5">
                  {groupedCategories.popular.map(category => (
                    <li key={category.id}>
                      <AnimatedLink 
                        href={`/category/${category.id}`} 
                        text={category.name} 
                        icon={<ChevronRight className="h-4 w-4" />}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Media Categories */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-primary">
                  <span className="w-2 h-6 bg-primary rounded-full mr-2"></span>
                  Media Tools
                </h3>
                <ul className="space-y-1.5">
                  {groupedCategories.media.slice(0, 8).map(category => (
                    <li key={category.id}>
                      <AnimatedLink 
                        href={`/category/${category.id}`} 
                        text={category.name} 
                        icon={<ChevronRight className="h-4 w-4" />}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Data Categories */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-primary">
                  <span className="w-2 h-6 bg-primary rounded-full mr-2"></span>
                  Data & Conversion
                </h3>
                <ul className="space-y-1.5">
                  {groupedCategories.data.slice(0, 8).map(category => (
                    <li key={category.id}>
                      <AnimatedLink 
                        href={`/category/${category.id}`} 
                        text={category.name} 
                        icon={<ChevronRight className="h-4 w-4" />}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Developer Categories */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-primary">
                  <span className="w-2 h-6 bg-primary rounded-full mr-2"></span>
                  Developer Tools
                </h3>
                <ul className="space-y-1.5">
                  {groupedCategories.dev.slice(0, 8).map(category => (
                    <li key={category.id}>
                      <AnimatedLink 
                        href={`/category/${category.id}`} 
                        text={category.name} 
                        icon={<ChevronRight className="h-4 w-4" />}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                href="/categories" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View All {categories.length} Categories
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center border-b pb-2">
              <Layers className="mr-2 h-6 w-6 text-primary" />
              Popular Tools
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tools.slice(0, 12).map(tool => (
                <motion.div 
                  key={tool.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-card hover:bg-card/70 border rounded-lg p-3 transition-colors"
                >
                  <Link href={`/tool/${tool.id}`} className="flex items-center gap-2">
                    <span className="text-primary">{tool.icon}</span>
                    <span className="text-sm">{tool.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recently Added Tools */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center border-b pb-2">
              <Layers className="mr-2 h-6 w-6 text-primary" />
              Recently Added
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {tools.slice(-10).reverse().map(tool => (
                <motion.div 
                  key={tool.id}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link 
                    href={`/tool/${tool.id}`} 
                    className="flex items-center py-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>{tool.name}</span>
                    <span className="ml-2 text-xs px-2 py-1 bg-primary/10 rounded-full text-primary">{tool.category.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Company Pages & Resources (Col 3) */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="space-y-10"
        >
          {/* Company Pages */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center border-b pb-2">
              <Users className="mr-2 h-6 w-6 text-primary" />
              Company Pages
            </h2>
            
            <ul className="space-y-2">
              <li>
                <AnimatedLink href="/about" text="About Us" icon={<Info className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/contact" text="Contact Us" icon={<Mail className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/careers" text="Careers" icon={<Users className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/blog" text="Blog" icon={<FileText className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/status" text="System Status" icon={<ExternalLink className="h-4 w-4" />} />
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center border-b pb-2">
              <Shield className="mr-2 h-6 w-6 text-primary" />
              Legal Resources
            </h2>
            
            <ul className="space-y-2">
              <li>
                <AnimatedLink href="/terms" text="Terms of Service" icon={<FileText className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/privacy" text="Privacy Policy" icon={<Shield className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/disclaimer" text="Disclaimer" icon={<FileText className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/dmca" text="DMCA & Copyright Policy" icon={<Shield className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/cookies" text="Cookie Policy" icon={<FileText className="h-4 w-4" />} />
              </li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center border-b pb-2">
              <HelpCircle className="mr-2 h-6 w-6 text-primary" />
              Help & Support
            </h2>
            
            <ul className="space-y-2">
              <li>
                <AnimatedLink href="/help" text="Help Center" icon={<HelpCircle className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/faq" text="Frequently Asked Questions" icon={<HelpCircle className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/guides" text="User Guides" icon={<FileText className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/feedback" text="Submit Feedback" icon={<Mail className="h-4 w-4" />} />
              </li>
              <li>
                <AnimatedLink href="/sitemap" text="Sitemap" icon={<GanttChartSquare className="h-4 w-4" />} />
              </li>
            </ul>
          </div>
          
          {/* Visual Sitemap Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="mt-10 bg-primary/5 border border-primary/10 rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-medium text-lg mb-3 text-primary">Looking for Something Specific?</h3>
            <p className="text-muted-foreground mb-4">
              Our search feature can help you find exactly what you're looking for across all our tools and resources.
            </p>
            <Link 
              href="/search" 
              className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Go to Search
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        </motion.section>
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center border-t pt-6 text-sm text-muted-foreground">
        <p>
          This sitemap provides an overview of the main pages on ToolHub. Our platform is constantly growing with new tools and resources.
        </p>
        <p className="mt-1">
          Last updated: May 10, 2025
        </p>
      </div>
    </div>
  );
}
