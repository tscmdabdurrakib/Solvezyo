import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Instagram, 
  ChevronLeft, 
  Mail, 
  Globe, 
  Calendar, 
  MapPin 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/**
 * AuthorPage Component
 * A responsive and modern about the author page
 */
export default function AuthorPage() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-10 md:py-16">
      {/* Back to Home Button */}
      <Link href="/">
        <Button variant="ghost" className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      {/* Main Content */}
      <motion.div 
        className="space-y-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About the Author
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Meet the Creator Behind This Website
          </p>
        </motion.div>

        {/* Profile Section - Responsive Layout */}
        <motion.div variants={itemVariants}>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Profile Image Section */}
            <div className="md:col-span-1">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Placeholder Profile Image - Replace with actual image later */}
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    {/* Uncomment and use the following line when you have an actual image */}
                    {/* <img src="/path/to/profile-image.jpg" alt="Md Abdur Rakib" className="w-full h-full object-cover" /> */}
                  </div>
                </CardContent>
              </Card>

              {/* Author Quick Info */}
              <div className="mt-4 space-y-3">
                <h2 className="text-2xl font-bold text-center">Md Abdur Rakib</h2>
                <p className="text-center text-muted-foreground">Web Developer & Digital Marketer</p>
                
                <div className="flex justify-center space-x-3 mt-4">
                  {/* Social Media Links - Replace href with actual links */}
                  <Button variant="outline" size="icon" asChild className="rounded-full">
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="rounded-full">
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="rounded-full">
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="rounded-full">
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="space-y-2 pt-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>contact@example.com</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>www.example.com</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography Section */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">The Journey Behind All-in-One Tools</h3>
                    
                    <p className="text-muted-foreground">
                      As a passionate web developer and digital marketer with over 5 years of experience, 
                      I've always been frustrated with having to visit multiple websites to access different 
                      tools for my daily tasks. Whether converting units, formatting text, or analyzing SEO metrics, 
                      I found myself juggling between dozens of bookmarks and websites.
                    </p>
                    
                    <p className="text-muted-foreground">
                      That's when the idea for this All-in-One Tools website was born. Starting in early 2023, 
                      I embarked on the journey to create a comprehensive platform that would bring together all 
                      the essential tools that developers, marketers, students, and everyday users need. The goal 
                      was simple yet ambitious: to build a one-stop destination that eliminates the need to hop 
                      between different websites.
                    </p>
                    
                    <p className="text-muted-foreground">
                      Development wasn't without challenges. Ensuring each tool was accurate, user-friendly, and 
                      accessible required meticulous attention to detail. The biggest hurdle was optimizing 
                      performance while maintaining a seamless experience across all devices. After months of 
                      coding, testing, and refining, I'm proud to present this collection of over 100 tools designed 
                      to make your online tasks simpler and more efficient.
                    </p>

                    <Separator className="my-4" />

                    <h3 className="text-xl font-semibold">My Mission</h3>
                    <p className="text-muted-foreground">
                      My mission is to continuously expand this toolkit, adding new features based on user feedback 
                      and emerging needs. I believe in creating tools that are not only functional but also intuitive 
                      and accessible to everyone, regardless of their technical expertise. Through this platform, 
                      I hope to simplify digital tasks and boost productivity for people worldwide.
                    </p>

                    <Separator className="my-4" />

                    <h3 className="text-xl font-semibold">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["React", "TypeScript", "Node.js", "Express", "TailwindCSS", "UX/UI Design", 
                        "SEO", "Digital Marketing", "Content Creation", "API Development"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experience & Education Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Experience</h3>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Senior Web Developer</h4>
                            <span className="text-sm text-muted-foreground">2021 - Present</span>
                          </div>
                          <p className="text-sm text-muted-foreground">TechSolutions Inc.</p>
                          <p className="text-sm">
                            Leading frontend development for enterprise clients, specializing in React applications.
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Digital Marketing Specialist</h4>
                            <span className="text-sm text-muted-foreground">2018 - 2021</span>
                          </div>
                          <p className="text-sm text-muted-foreground">MarketGrowth Agency</p>
                          <p className="text-sm">
                            Managed SEO strategies and content marketing campaigns for B2B clients.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Education</h3>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">MSc in Computer Science</h4>
                            <span className="text-sm text-muted-foreground">2016 - 2018</span>
                          </div>
                          <p className="text-sm text-muted-foreground">University of Technology</p>
                          <p className="text-sm">
                            Specialized in Web Technologies and Software Engineering.
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">BSc in Computer Science</h4>
                            <span className="text-sm text-muted-foreground">2012 - 2016</span>
                          </div>
                          <p className="text-sm text-muted-foreground">National University</p>
                          <p className="text-sm">
                            Graduated with honors, focusing on programming and databases.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact / Get in Touch Section */}
              <div className="mt-6 text-center">
                <Link href="/contact">
                  <Button size="lg" className="mt-2">
                    <Mail className="mr-2 h-4 w-4" />
                    Get in Touch
                  </Button>
                </Link>
                <p className="mt-3 text-sm text-muted-foreground">
                  Have questions or suggestions? I'd love to hear from you!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div variants={itemVariants} className="bg-muted/40 p-8 rounded-lg mt-12 text-center">
          <blockquote className="text-lg italic">
            "My goal is to create tools that make people's digital lives easier. Every day is an opportunity to 
            simplify complex tasks and help users achieve more in less time."
          </blockquote>
          <p className="mt-4 font-medium">— Md Abdur Rakib</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
