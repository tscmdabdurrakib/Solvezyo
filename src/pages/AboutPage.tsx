import { Link } from "wouter";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { 
  Users, 
  Lightbulb, 
  Target, 
  History, 
  Settings, 
  BarChart3, 
  Award, 
  Mail,
  GraduationCap,
  Code,
  Check,
  Heart
} from "lucide-react";

export default function AboutPage() {
  // Data is imported directly at the top of the file
  
  return (
    <div className="container py-8 space-y-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="inline-block p-2 px-4 bg-primary/10 rounded-full text-primary font-medium text-sm mb-2">
          About Our Platform
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Powering Your Digital Workflow
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We've built a comprehensive collection of tools designed to enhance productivity,
          streamline workflows, and solve everyday problems.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <div className="flex items-center gap-1.5 text-sm bg-secondary/50 px-3 py-1.5 rounded-full">
            <Users className="h-4 w-4" />
            <span>Serving 100K+ users</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm bg-secondary/50 px-3 py-1.5 rounded-full">
            <Settings className="h-4 w-4" />
            <span>{tools.length}+ tools</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm bg-secondary/50 px-3 py-1.5 rounded-full">
            <Award className="h-4 w-4" />
            <span>{categories.length} categories</span>
          </div>
        </div>
      </motion.section>

      {/* Our Mission */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-5 gap-8 items-center py-8 border-t"
      >
        <div className="md:col-span-2">
          <div className="bg-primary/10 p-6 rounded-2xl flex items-center justify-center">
            <Target className="h-32 w-32 text-primary" />
          </div>
        </div>
        <div className="md:col-span-3 space-y-4">
          <div className="inline-block p-2 px-3 bg-primary/10 rounded-full text-primary font-medium text-sm">
            Our Mission
          </div>
          <h2 className="text-3xl font-bold">Making Digital Tools Accessible To Everyone</h2>
          <p className="text-muted-foreground text-lg">
            Our mission is to democratize access to digital tools by creating a unified platform where users can find,
            discover, and utilize tools without needing specialized knowledge or expensive software.
          </p>
          <div className="space-y-3 mt-6">
            <div className="flex gap-3">
              <Check className="h-6 w-6 text-primary flex-shrink-0" />
              <p>Free access to essential digital tools for everyday tasks</p>
            </div>
            <div className="flex gap-3">
              <Check className="h-6 w-6 text-primary flex-shrink-0" />
              <p>Intuitive design focused on usability across all skill levels</p>
            </div>
            <div className="flex gap-3">
              <Check className="h-6 w-6 text-primary flex-shrink-0" />
              <p>Continuously expanding collection of tools based on user needs</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-5 gap-8 items-center py-8 border-t"
      >
        <div className="md:col-span-3 space-y-4 md:order-1 order-2">
          <div className="inline-block p-2 px-3 bg-primary/10 rounded-full text-primary font-medium text-sm">
            Our Story
          </div>
          <h2 className="text-3xl font-bold">From Idea to Digital Toolbox</h2>
          <p className="text-muted-foreground text-lg">
            Our journey began in 2023 when a group of developers, designers, and digital enthusiasts
            recognized a common frustration: the scattered nature of online tools. We envisioned a
            centralized platform that would bring together the most useful tools in one accessible location.
          </p>
          <p className="text-muted-foreground text-lg">
            What started as a small collection of developer utilities has grown into a comprehensive
            platform serving professionals, students, and everyday users looking to simplify their digital tasks.
          </p>
        </div>
        <div className="md:col-span-2 md:order-2 order-1">
          <div className="bg-primary/10 p-6 rounded-2xl flex items-center justify-center">
            <History className="h-32 w-32 text-primary" />
          </div>
        </div>
      </motion.section>

      {/* What We Offer */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8 space-y-10 border-t"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block p-2 px-3 bg-primary/10 rounded-full text-primary font-medium text-sm">
            What We Offer
          </div>
          <h2 className="text-3xl font-bold">A Growing Ecosystem of Digital Tools</h2>
          <p className="text-muted-foreground text-lg">
            Our platform is constantly evolving with new tools added regularly to meet the diverse needs of our users.
          </p>
        </div>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="categories">Tool Categories</TabsTrigger>
            <TabsTrigger value="benefits">User Benefits</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-xl space-y-4 border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Intelligent Search</h3>
                <p className="text-muted-foreground">
                  Our advanced search system learns from user behavior to deliver personalized tool recommendations.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-xl space-y-4 border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Usage Analytics</h3>
                <p className="text-muted-foreground">
                  Track your most used tools and discover new ones that complement your workflow.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-xl space-y-4 border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Open Integration</h3>
                <p className="text-muted-foreground">
                  Easily integrate our tools into your own projects with our developer-friendly API.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              {categories.slice(0, 6).map((category: any) => (
                <div key={category.id} className="flex items-center p-4 border rounded-lg gap-3 group hover:border-primary transition-colors">
                  <div className={`p-2 rounded-lg ${category.color.bg} ${category.color.text}`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} tools</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="outline">
                <Link href="/categories">View All {categories.length} Categories</Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-5 border rounded-xl">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Skill Development</h3>
                  <p className="text-muted-foreground">
                    Our tools include tutorials and examples to help you learn new skills while solving problems.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-5 border rounded-xl">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Personalization</h3>
                  <p className="text-muted-foreground">
                    Save your favorite tools and customize your dashboard for a tailored experience.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8 space-y-10 border-t"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block p-2 px-3 bg-primary/10 rounded-full text-primary font-medium text-sm">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg">
            We're proud to help thousands of users simplify their digital tasks every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <p className="italic text-muted-foreground">
              "This platform has completely transformed how I handle routine tasks. The image tools alone have saved me countless hours of work."
            </p>
            <div className="pt-4 border-t">
              <p className="font-medium">Sarah K.</p>
              <p className="text-sm text-muted-foreground">Graphic Designer</p>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <p className="italic text-muted-foreground">
              "As a developer, having all these utilities in one place is invaluable. The code formatters and converters are particularly useful."
            </p>
            <div className="pt-4 border-t">
              <p className="font-medium">Michael T.</p>
              <p className="text-sm text-muted-foreground">Software Engineer</p>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <p className="italic text-muted-foreground">
              "I use this platform daily for my university projects. The math and data conversion tools have been lifesavers during my research."
            </p>
            <div className="pt-4 border-t">
              <p className="font-medium">Priya R.</p>
              <p className="text-sm text-muted-foreground">Graduate Student</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Us */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8 space-y-8 border-t"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block p-2 px-3 bg-primary/10 rounded-full text-primary font-medium text-sm">
            Contact Us
          </div>
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <p className="text-muted-foreground text-lg">
            Have questions, suggestions, or feedback? Our team is here to help.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Email Us</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              For general inquiries, tool requests, or feature suggestions:
            </p>
            <a href="mailto:contact@toolhub.com" className="text-primary hover:underline">
              contact@toolhub.com
            </a>
          </div>
          
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">For Developers</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Interested in API access or contributing to our platform:
            </p>
            <a href="mailto:developers@toolhub.com" className="text-primary hover:underline">
              developers@toolhub.com
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            We typically respond to all inquiries within 24-48 hours.
          </p>
        </div>
      </motion.section>

      {/* Call to action */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center space-y-6 border-t"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Start Using Our Tools Today</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of users who are already simplifying their digital tasks with our comprehensive toolbox.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <Button asChild size="lg">
            <Link href="/">Explore Tools</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
