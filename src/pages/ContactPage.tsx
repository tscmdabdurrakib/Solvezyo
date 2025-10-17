import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  Building,
  ExternalLink,
} from "lucide-react";

// Define form validation schema using zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// Type for our form values
type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  // State for loading animation
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Toast notifications
  const { toast } = useToast();
  
  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    // Show loading state
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // After "sending", reset form and show success message
    setIsSubmitting(false);
    form.reset();
    
    // Show success toast
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
      variant: "default",
    });
  };
  
  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header Section */}
      <motion.div 
        className="text-center space-y-4 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions or suggestions? We'd love to hear from you. Our team is always here to help.
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Contact Form - Takes 2/3 on large screens */}
        <motion.div 
          className="lg:col-span-2 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border shadow-md">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field} 
                                className="h-12 focus-visible:ring-primary/50 transition-all"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Email Field */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                type="email" 
                                {...field} 
                                className="h-12 focus-visible:ring-primary/50 transition-all"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Subject Field */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What's this about?" 
                              {...field} 
                              className="h-12 focus-visible:ring-primary/50 transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Message Field */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please tell us what's on your mind..." 
                              rows={5}
                              {...field} 
                              className="resize-none focus-visible:ring-primary/50 transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      size="lg"
                      className="gap-2 w-full sm:w-auto min-w-[160px] shadow-sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Google Maps Section */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border shadow-md">
              <CardContent className="p-0">
                <div className="relative w-full h-[300px] overflow-hidden rounded-md">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.7887760332853!2d-122.39633542474759!3d37.7903404129149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807ded297e89%3A0xd9301115f81c3ed!2sTransamerica%20Pyramid!5e0!3m2!1sen!2sus!4v1684988785092!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our Location"
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-4 bg-card/90 backdrop-blur-sm relative -mt-[60px] mx-4 rounded-md border border-border/50 shadow-md">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <MapPin className="h-4 w-4" />
                    <span>Our Location</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    600 Montgomery St, San Francisco, CA 94111, United States
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Contact Information - Takes 1/3 on large screens */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Contact Info Card */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-md overflow-hidden">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-6">
                    If you prefer to reach out directly, here are all the ways you can contact us.
                  </p>
                </div>
                
                <div className="space-y-5">
                  {/* Email Contact */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <a 
                        href="mailto:contact@toolhub.com" 
                        className="text-primary hover:underline transition-colors flex items-center gap-1"
                      >
                        contact@toolhub.com
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Phone Contact */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <a 
                        href="tel:+15555555555" 
                        className="text-primary hover:underline transition-colors flex items-center gap-1"
                      >
                        +1 (555) 555-5555
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visit Us</h3>
                      <address className="not-italic text-muted-foreground leading-relaxed">
                        600 Montgomery St<br />
                        San Francisco, CA 94111<br />
                        United States
                      </address>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Office Hours */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office Hours</h3>
                      <div className="text-muted-foreground text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>Monday - Friday</div>
                          <div>9:00 AM - 6:00 PM</div>
                          <div>Saturday</div>
                          <div>10:00 AM - 4:00 PM</div>
                          <div>Sunday</div>
                          <div>Closed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Media Card */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-md overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
                <div className="flex gap-4 flex-wrap">
                  {/* Facebook */}
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-card hover:bg-muted transition-colors p-3 rounded-full border"
                    aria-label="Facebook"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-5 h-5 text-[#1877F2]" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                    </svg>
                  </a>
                  
                  {/* Twitter/X */}
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-card hover:bg-muted transition-colors p-3 rounded-full border"
                    aria-label="Twitter"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148a13.98 13.98 0 0 0 10.15 5.144 4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" />
                    </svg>
                  </a>
                  
                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-card hover:bg-muted transition-colors p-3 rounded-full border"
                    aria-label="LinkedIn"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-5 h-5 text-[#0A66C2]" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h-.003z" />
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-card hover:bg-muted transition-colors p-3 rounded-full border"
                    aria-label="Instagram"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-5 h-5 text-[#E4405F]" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
                    </svg>
                  </a>
                  
                  {/* GitHub */}
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-card hover:bg-muted transition-colors p-3 rounded-full border"
                    aria-label="GitHub"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Support Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-primary/5 border shadow-md">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2.5 rounded-full">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">We're Here to Help!</h2>
                </div>
                <p className="text-muted-foreground">
                  Our support team typically responds within 24 hours on business days. For urgent matters, please call us directly.
                </p>
                <Button variant="link" className="mt-4 p-0 h-auto text-primary font-medium">
                  View support options
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* FAQ or Additional Information */}
      <motion.div 
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Separator className="mb-12" />
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick answers to common questions about our contact process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">What is your typical response time?</h3>
              <p className="text-muted-foreground text-sm">
                We aim to respond to all inquiries within 24 business hours. For urgent matters, please call our support line.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">How can I request a demo?</h3>
              <p className="text-muted-foreground text-sm">
                You can request a demo by filling out the contact form and selecting "Demo Request" in the subject line.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Do you offer technical support?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, we offer technical support for all our tools. For technical issues, please include detailed information about the problem.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Can I suggest a new tool feature?</h3>
              <p className="text-muted-foreground text-sm">
                Absolutely! We love hearing feature suggestions. Please share your ideas through our contact form.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
