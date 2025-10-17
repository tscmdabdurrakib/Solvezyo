import { Link } from "wouter";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Shield, 
  Lock, 
  Cookie, 
  MailQuestion,
  Clock, 
  FileText,
  UserPlus,
  ServerCrash,
  Scale,
  ExternalLink,
  DollarSign,
  AlertCircle
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 10, 2025";
  
  return (
    <div className="container py-8 space-y-12 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="inline-block p-2 px-4 bg-primary/10 rounded-full text-primary font-medium text-sm mb-2">
          Last Updated: {lastUpdated}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect,
          use, and safeguard your information when you use our platform.
        </p>
      </motion.section>

      {/* Quick Links */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-card p-6 rounded-xl border space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Shield className="h-5 w-5" />
            <h3>Your Rights</h3>
          </div>
          <p className="text-sm text-muted-foreground">Learn about your data protection and privacy rights</p>
          <a href="#your-rights" className="text-sm text-primary hover:underline">Read more</a>
        </div>
        
        <div className="bg-card p-6 rounded-xl border space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Cookie className="h-5 w-5" />
            <h3>Cookies & Tracking</h3>
          </div>
          <p className="text-sm text-muted-foreground">How we use cookies and other tracking technologies</p>
          <a href="#cookies" className="text-sm text-primary hover:underline">Read more</a>
        </div>
        
        <div className="bg-card p-6 rounded-xl border space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-primary font-medium">
            <MailQuestion className="h-5 w-5" />
            <h3>Contact Us</h3>
          </div>
          <p className="text-sm text-muted-foreground">Questions about our privacy practices? Get in touch.</p>
          <a href="#contact" className="text-sm text-primary hover:underline">Read more</a>
        </div>
      </motion.section>

      {/* Table of Contents */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card border rounded-xl p-6 space-y-4"
      >
        <h2 className="text-lg font-medium">Table of Contents</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><a href="#introduction" className="hover:text-primary hover:underline">Introduction</a></li>
          <li><a href="#information-we-collect" className="hover:text-primary hover:underline">Information We Collect</a></li>
          <li><a href="#how-we-use" className="hover:text-primary hover:underline">How We Use Your Information</a></li>
          <li><a href="#information-sharing" className="hover:text-primary hover:underline">Information Sharing and Disclosure</a></li>
          <li><a href="#your-rights" className="hover:text-primary hover:underline">Your Data Protection Rights</a></li>
          <li><a href="#cookies" className="hover:text-primary hover:underline">Cookies and Tracking Technologies</a></li>
          <li><a href="#data-security" className="hover:text-primary hover:underline">Data Security</a></li>
          <li><a href="#international-transfers" className="hover:text-primary hover:underline">International Data Transfers</a></li>
          <li><a href="#children" className="hover:text-primary hover:underline">Children's Privacy</a></li>
          <li><a href="#changes" className="hover:text-primary hover:underline">Changes to This Privacy Policy</a></li>
          <li><a href="#contact" className="hover:text-primary hover:underline">Contact Us</a></li>
        </ol>
      </motion.section>

      {/* Main Content */}
      <div className="space-y-10">
        {/* Introduction */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="introduction"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">1. Introduction</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              Welcome to ToolHub's Privacy Policy. This policy describes how ToolHub ("we", "our", or "us") collects, uses, 
              and shares your personal information when you visit or use our website, mobile application, or any of our tools 
              (collectively, the "Services").
            </p>
            <p>
              We respect your privacy and are committed to protecting your personal information. We encourage you to read this 
              Privacy Policy carefully to understand our practices regarding your data.
            </p>
            <p>
              By accessing or using our Services, you agree to the collection, use, and sharing of your information as described in this Privacy Policy. 
              If you do not agree with our policies and practices, please do not use our Services.
            </p>
          </div>
        </motion.section>

        {/* Information We Collect */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="information-we-collect"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">2. Information We Collect</h2>
          </div>
          <div className="pl-14 space-y-6">
            <p>
              We collect several types of information from and about users of our Services, including:
            </p>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2">Personal Information</h3>
                <p className="text-muted-foreground">
                  Information that can be used to identify you, such as your name, email address, and in some cases, 
                  account credentials if you choose to create an account.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2">Usage Data</h3>
                <p className="text-muted-foreground">
                  Information about how you use our Services, including which tools you use, how often you use them,
                  your interaction with our interface, and feature usage patterns.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2">Device Information</h3>
                <p className="text-muted-foreground">
                  Information about the device you use to access our Services, including hardware model, operating system, 
                  unique device identifiers, and mobile network information.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2">Log Data</h3>
                <p className="text-muted-foreground">
                  Information that your browser sends whenever you visit our website, such as your IP address, 
                  browser type and version, time zone setting, and pages you visit.
                </p>
              </div>
            </div>
            
            <p>
              We collect this information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Directly from you when you provide it to us (e.g., when you register or contact us).</li>
              <li>Automatically when you use our Services (e.g., through cookies and similar technologies).</li>
              <li>From third parties that we work with to provide certain features or services.</li>
            </ul>
          </div>
        </motion.section>

        {/* How We Use Your Information */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="how-we-use"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              We use the information we collect for various purposes, including to:
            </p>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All Purposes</TabsTrigger>
                <TabsTrigger value="service">Service Provision</TabsTrigger>
                <TabsTrigger value="improvement">Improvement</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Provide Our Services</h3>
                    <p className="text-sm text-muted-foreground">
                      Process and deliver the tools and features you request, maintain your account, and enable proper functionality of our platform.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Improve Our Services</h3>
                    <p className="text-sm text-muted-foreground">
                      Understand how users interact with our tools, identify popular features, and develop new capabilities.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Personalize Your Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      Remember your preferences, suggest relevant tools, and provide a more tailored experience.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Communicate With You</h3>
                    <p className="text-sm text-muted-foreground">
                      Respond to your inquiries, provide support, and send updates about our services.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Ensure Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Protect our Services and users from fraudulent, harmful, unauthorized, or illegal activity.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Comply With Obligations</h3>
                    <p className="text-sm text-muted-foreground">
                      Meet legal requirements, enforce our terms, and respond to legal requests.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="service" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Account Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Create and manage your account, including authentication and user profile maintenance.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Tool Functionality</h3>
                    <p className="text-sm text-muted-foreground">
                      Process the data you input to provide the results and outputs of our various tools.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Save Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Store your tool settings, recent usage history, and preferences for future visits.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">User Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Respond to your inquiries, troubleshoot issues, and provide technical assistance.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="improvement" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Usage Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Analyze how our platform is used to identify patterns, popular features, and areas for improvement.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Performance Monitoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Track system performance, identify bottlenecks, and optimize tool processing speeds.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">User Experience Research</h3>
                    <p className="text-sm text-muted-foreground">
                      Study how users interact with our interface to improve navigation and usability.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Feature Development</h3>
                    <p className="text-sm text-muted-foreground">
                      Identify gaps in our offerings and develop new tools based on user needs and feedback.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Legal Basis:</strong> We process your information based on your consent, our legitimate interests,
                contractual necessity, and/or compliance with legal obligations, depending on the specific purpose.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Information Sharing and Disclosure */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="information-sharing"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ExternalLink className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">4. Information Sharing and Disclosure</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              We may share your personal information with:
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="service-providers">
                <AccordionTrigger>Service Providers</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Third parties that help us provide our Services, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Cloud hosting and infrastructure providers</li>
                    <li>Analytics and reporting services</li>
                    <li>Customer support software providers</li>
                    <li>Payment processors (if applicable)</li>
                    <li>Email and communication service providers</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">
                    These service providers are obligated to use your information only to provide services to us and in a manner consistent with this Privacy Policy.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="business-transfers">
                <AccordionTrigger>Business Transfers</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of our assets,
                    your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice
                    on our website of any change in ownership or uses of your personal information, as well as any choices you may have.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="legal-requirements">
                <AccordionTrigger>Legal Requirements</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We may disclose your information if required to do so by law or in response to valid requests by public authorities 
                    (e.g., a court or government agency). We may also disclose your information to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-2">
                    <li>Enforce our Terms of Service and other agreements</li>
                    <li>Protect and defend our rights or property</li>
                    <li>Prevent or investigate possible wrongdoing in connection with the Services</li>
                    <li>Protect the personal safety of users of the Services or the public</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="consent">
                <AccordionTrigger>With Your Consent</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We may share your information with third parties when you explicitly consent to such sharing.
                    For example, if you choose to share your generated content or tool results on social media
                    through our platform's sharing features.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="bg-primary/5 p-4 rounded-lg mt-4">
              <h3 className="font-medium mb-1">Aggregated and Anonymized Data</h3>
              <p className="text-sm text-muted-foreground">
                We may share aggregated, anonymized information that does not identify any specific user
                with third parties for market analysis, improving our Services, and other business purposes.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Your Data Protection Rights */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="your-rights"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">5. Your Data Protection Rights</h2>
          </div>
          <div className="pl-14 space-y-6">
            <p>
              Depending on your location, you may have certain rights regarding your personal information.
              These may include:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Access</h3>
                <p className="text-sm text-muted-foreground">
                  You can request copies of your personal information that we hold.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Rectification</h3>
                <p className="text-sm text-muted-foreground">
                  You can ask us to correct inaccurate information or complete incomplete information.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Erasure</h3>
                <p className="text-sm text-muted-foreground">
                  You can ask us to delete your personal information in certain circumstances.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Restriction</h3>
                <p className="text-sm text-muted-foreground">
                  You can ask us to restrict the processing of your information in certain circumstances.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Data Portability</h3>
                <p className="text-sm text-muted-foreground">
                  You can ask us to transfer your information to another organization or to you.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Objection</h3>
                <p className="text-sm text-muted-foreground">
                  You can object to the processing of your personal data in certain circumstances.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">How to Exercise Your Rights</h3>
              <p className="text-muted-foreground">
                To exercise any of these rights, please contact us using the details provided in the "Contact Us" section.
                We will respond to your request within a reasonable timeframe, typically within 30 days.
              </p>
              <p className="text-muted-foreground">
                Please note that we may ask you to verify your identity before responding to such requests,
                and in some cases, we may not be able to comply with your request if permitted by law.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Cookies and Tracking Technologies */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="cookies"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">6. Cookies and Tracking Technologies</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              We use cookies and similar tracking technologies to track activity on our Services and 
              hold certain information. Cookies are files with a small amount of data that may include 
              an anonymous unique identifier.
            </p>
            
            <div className="bg-card border rounded-lg p-6 space-y-6">
              <h3 className="font-medium">Types of Cookies We Use</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Essential Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These cookies are necessary for the website to function properly. They enable core
                      functionality such as security, network management, and account access. You can't disable
                      these cookies through our system.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These cookies help us understand how visitors interact with our website by collecting and
                      reporting information anonymously. This helps us improve our website and services.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Preference Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These cookies enable the website to remember choices you make and provide
                      enhanced, more personal features. They may be set by us or by third-party providers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Your Cookie Choices</h3>
              <p className="text-muted-foreground">
                You can choose to have your computer warn you each time a cookie is being sent, or you can 
                choose to turn off all cookies through your browser settings. Look at your browser's Help section 
                to learn how to modify your cookie settings.
              </p>
              <p className="text-muted-foreground">
                If you disable cookies, some features that make the site more efficient may not function properly.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Data Security */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="data-security"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">7. Data Security</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              We implement appropriate technical and organizational security measures designed to protect the security of your personal information.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2">Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  We use industry-standard encryption protocols to protect data transmission between your device and our servers.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2">Access Controls</h3>
                <p className="text-sm text-muted-foreground">
                  We restrict access to your personal information to employees and contractors who need to know that information.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2">Regular Audits</h3>
                <p className="text-sm text-muted-foreground">
                  We regularly review our information collection, storage, and processing practices to guard against unauthorized access.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2">Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  We maintain systems to detect and prevent security breaches and suspicious activities.
                </p>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Important Notice</p>
                <p className="text-sm">
                  While we strive to use commercially acceptable means to protect your personal information, 
                  no method of transmission over the Internet or method of electronic storage is 100% secure. 
                  We cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* International Data Transfers */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="international-transfers"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ServerCrash className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">8. International Data Transfers</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              We may transfer, store, and process your information in countries other than your own. Our servers are 
              located in various regions around the world, and your information may be processed on servers located outside 
              of the country where you live.
            </p>
            <p>
              These countries may have data protection laws that differ from the laws of your country. By using our Services, 
              you consent to the transfer of your information to these countries.
            </p>
            <p>
              When we transfer your information internationally, we take steps to ensure that appropriate safeguards are in place 
              to protect your information and to ensure that it is treated in accordance with this Privacy Policy.
            </p>
            <div className="bg-card/50 border rounded-lg p-4">
              <h3 className="font-medium mb-2">Safeguards for International Transfers</h3>
              <p className="text-sm text-muted-foreground">
                These may include using data transfer agreements, standard contractual clauses approved by relevant 
                authorities, obtaining your consent for specific transfers, or ensuring that recipients are certified 
                under appropriate data protection frameworks.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Children's Privacy */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="children"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">9. Children's Privacy</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information 
              from children under 13. If we become aware that we have collected personal information from a child under 13 without 
              verification of parental consent, we take steps to remove that information from our servers.
            </p>
            <p>
              If you are a parent or guardian and you believe your child has provided us with personal information, 
              please contact us so that we can take appropriate action.
            </p>
          </div>
        </motion.section>

        {/* Changes to This Privacy Policy */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="changes"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">10. Changes to This Privacy Policy</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
              are effective when they are posted on this page.
            </p>
            <div className="bg-card/50 border rounded-lg p-4">
              <h3 className="font-medium mb-2">Notification of Material Changes</h3>
              <p className="text-sm text-muted-foreground">
                For material changes to this Privacy Policy, we will make a more prominent notice, which may include sending you an 
                email notification or displaying a prominent notice on our website.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Us */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="contact"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MailQuestion className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">11. Contact Us</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-6 space-y-3">
                <h3 className="font-medium">By Email</h3>
                <a href="mailto:privacy@toolhub.com" className="text-primary hover:underline">privacy@toolhub.com</a>
              </div>
              
              <div className="bg-card border rounded-lg p-6 space-y-3">
                <h3 className="font-medium">By Mail</h3>
                <address className="not-italic text-muted-foreground">
                  ToolHub Privacy Team<br />
                  123 Tech Plaza<br />
                  Suite 456<br />
                  San Francisco, CA 94105<br />
                  United States
                </address>
              </div>
            </div>
            
            <p>
              We will respond to your inquiry within 30 days.
            </p>
          </div>
        </motion.section>
      </div>

      {/* Call to action */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-primary/10 rounded-xl p-6 md:p-8 text-center space-y-4 border mt-12"
      >
        <h2 className="text-xl md:text-2xl font-bold">Have Questions About Your Privacy?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're committed to transparency and protecting your privacy. If you have any concerns or questions,
          don't hesitate to reach out to our team.
        </p>
        <div className="pt-2">
          <Button asChild size="lg">
            <a href="mailto:privacy@toolhub.com">Contact Our Privacy Team</a>
          </Button>
        </div>
      </motion.section>

      {/* Last Updated Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>This Privacy Policy was last updated on: {lastUpdated}</p>
      </div>
    </div>
  );
}
