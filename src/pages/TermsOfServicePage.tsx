import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  User, 
  Eye, 
  XCircle, 
  Scale,
  Globe,
  Mail,
  Building,
  Microscope,
  BadgeInfo
} from "lucide-react";

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Please read these Terms of Service carefully before using our platform.
          They govern your use of our services and form a binding legal agreement.
        </p>
      </motion.section>

      {/* Quick Info Cards */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="border border-muted hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <CardTitle className="text-base">Legal Agreement</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              By using our platform, you agree to these terms and our Privacy Policy
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card className="border border-muted hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <User className="h-5 w-5" />
              <CardTitle className="text-base">Eligibility</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              You must be at least 13 years old to use our services
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card className="border border-muted hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <AlertTriangle className="h-5 w-5" />
              <CardTitle className="text-base">Important Notice</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              These terms include important disclaimers and limitations of liability
            </CardDescription>
          </CardContent>
        </Card>
      </motion.section>

      {/* Table of Contents */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card border rounded-xl p-6 space-y-4"
      >
        <h2 className="text-lg font-medium">Table of Contents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li><a href="#acceptance" className="hover:text-primary hover:underline">Acceptance of Terms</a></li>
            <li><a href="#eligibility" className="hover:text-primary hover:underline">Eligibility</a></li>
            <li><a href="#accounts" className="hover:text-primary hover:underline">Accounts and Registration</a></li>
            <li><a href="#services" className="hover:text-primary hover:underline">Services Description</a></li>
            <li><a href="#content" className="hover:text-primary hover:underline">User Content</a></li>
            <li><a href="#restrictions" className="hover:text-primary hover:underline">Prohibited Activities</a></li>
          </ol>
          <ol className="list-decimal list-inside space-y-2 ml-2" start={7}>
            <li><a href="#intellectual" className="hover:text-primary hover:underline">Intellectual Property Rights</a></li>
            <li><a href="#disclaimer" className="hover:text-primary hover:underline">Disclaimer of Warranties</a></li>
            <li><a href="#limitation" className="hover:text-primary hover:underline">Limitation of Liability</a></li>
            <li><a href="#termination" className="hover:text-primary hover:underline">Termination</a></li>
            <li><a href="#modifications" className="hover:text-primary hover:underline">Modifications to Terms</a></li>
            <li><a href="#general" className="hover:text-primary hover:underline">General Provisions</a></li>
          </ol>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="space-y-10">
        {/* Acceptance of Terms */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="acceptance"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              Welcome to ToolHub. By accessing or using our website, mobile application, or any of our tools 
              (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). 
              These Terms constitute a legal agreement between you and ToolHub ("we", "our", or "us").
            </p>
            <p>
              If you do not agree to these Terms, you must not access or use our Services. By using our 
              Services, you represent and warrant that you have the legal capacity to enter into these Terms.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <p className="text-sm font-medium">
                In addition to these Terms, please review our 
                <Link href="/privacy" className="text-primary hover:underline mx-1">
                  Privacy Policy
                </Link>
                which also governs your use of our Services and explains how we collect, use, and protect your personal information.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Eligibility */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="eligibility"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">2. Eligibility</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              To use our Services, you must be at least 13 years old. If you are under 18 years old, you must 
              have your parent or legal guardian's permission to use our Services and they must agree to these Terms on your behalf.
            </p>
            <p>
              By using our Services, you represent and warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>You are at least 13 years old (or the minimum legal age in your jurisdiction, if higher).</li>
              <li>If you are under 18, you have obtained your parent or guardian's consent to use our Services.</li>
              <li>You have not previously been suspended or removed from our Services.</li>
              <li>Your use of our Services does not violate any applicable law or regulation.</li>
            </ul>
          </div>
        </motion.section>

        {/* Accounts and Registration */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="accounts"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">3. Accounts and Registration</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              Some features of our Services may require registration and creation of an account.
              When you create an account, you must provide accurate, current, and complete information.
            </p>
            
            <div className="bg-card border rounded-lg p-4 space-y-3">
              <h3 className="font-medium">Account Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <span className="text-foreground font-medium">Account Security:</span> You are responsible for maintaining 
                  the confidentiality of your account credentials, including your password, and for all activities that occur under your account.
                </li>
                <li>
                  <span className="text-foreground font-medium">Notification:</span> You must immediately notify us of any unauthorized 
                  use of your account or any other breach of security.
                </li>
                <li>
                  <span className="text-foreground font-medium">Accurate Information:</span> You are responsible for keeping your account 
                  information up-to-date.
                </li>
              </ul>
            </div>
            
            <p>
              We reserve the right to suspend or terminate your account if any information provided during registration or 
              thereafter proves to be inaccurate, incomplete, or misleading.
            </p>
            
            <p>
              You may not transfer your account to anyone else without our prior written permission. We are not responsible 
              for any loss or damage arising from your failure to maintain the security of your account.
            </p>
          </div>
        </motion.section>

        {/* Services Description */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="services"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Microscope className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">4. Services Description</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              ToolHub provides a suite of online tools designed to assist with various tasks. These tools are meant 
              to be used as aids and not as substitutes for professional advice, consultation, or services.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Service Modifications</h3>
                <p className="text-sm text-muted-foreground">
                  We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time, 
                  with or without notice. This includes the removal or addition of features or functionalities.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Service Availability</h3>
                <p className="text-sm text-muted-foreground">
                  We strive to ensure that our Services are available 24/7, but we cannot guarantee uninterrupted access 
                  or that our Services will be error-free.
                </p>
              </div>
            </div>
            
            <p>
              While we make every effort to ensure the accuracy of our tools, we cannot guarantee that the results 
              obtained from using our Services will be accurate, reliable, or suitable for your particular needs.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-lg text-amber-900 dark:text-amber-300 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Important Note</p>
                <p className="text-sm">
                  The results and outputs from our tools should be reviewed and verified by you before being used 
                  for any purpose that may have significant consequences.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* User Content */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="content"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">5. User Content</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              Our Services may allow you to upload, submit, store, send, or receive content such as text, images, 
              files, or other materials ("User Content"). You retain ownership of any intellectual property rights 
              that you hold in that User Content.
            </p>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-primary/5 p-4">
                <h3 className="font-medium">License to User Content</h3>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-muted-foreground">
                  When you upload, submit, store, send, or receive User Content to or through our Services, you give us a 
                  worldwide, royalty-free license to use, host, store, reproduce, modify, create derivative works, communicate, 
                  publish, publicly perform, publicly display, and distribute such User Content for the limited purpose of:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Operating, promoting, and improving our Services</li>
                  <li>Developing new Services</li>
                </ul>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="representations">
                <AccordionTrigger>Your Representations and Warranties</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>
                    You represent and warrant that:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>You own or have obtained all necessary rights, licenses, consents, permissions, and authorizations for the User Content.</li>
                    <li>The User Content does not infringe or violate any third-party rights, including intellectual property rights or privacy rights.</li>
                    <li>The User Content complies with these Terms and all applicable laws and regulations.</li>
                    <li>The User Content is not harmful, offensive, illegal, deceptive, misleading, or abusive.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="monitoring">
                <AccordionTrigger>Content Monitoring</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>
                    We may, but have no obligation to, monitor or review User Content. We reserve the right to remove or 
                    modify User Content for any reason, including if we believe it violates these Terms or is otherwise 
                    objectionable, without notice or liability.
                  </p>
                  <p>
                    We are not responsible for any User Content and you may be exposed to User Content that is inaccurate, 
                    offensive, inappropriate, or otherwise unsuitable.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.section>

        {/* Prohibited Activities */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="restrictions"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <XCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">6. Prohibited Activities</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              In connection with your use of our Services, you agree not to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2 text-destructive">Legal & Regulatory</h3>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                  <li>Violate any applicable law or regulation</li>
                  <li>Infringe any intellectual property or other rights of any person or entity</li>
                  <li>Engage in fraudulent, deceptive, or misleading practices</li>
                  <li>Collect or store personal data about other users without their consent</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2 text-destructive">Technical Restrictions</h3>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                  <li>Use any robot, spider, scraper, or other automated means to access our Services</li>
                  <li>Interfere with or disrupt the operation of our Services</li>
                  <li>Bypass any measures we may use to prevent or restrict access to our Services</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2 text-destructive">Content Restrictions</h3>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                  <li>Upload or transmit viruses, malware, or other malicious code</li>
                  <li>Post content that is harassing, threatening, defamatory, or discriminatory</li>
                  <li>Distribute sexually explicit or violent material</li>
                  <li>Use our Services to promote illegal activities</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-card/50">
                <h3 className="font-medium mb-2 text-destructive">Usage Restrictions</h3>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                  <li>Use our Services in a manner that could disable, overburden, or impair them</li>
                  <li>Attempt to reverse engineer any portion of our Services</li>
                  <li>Resell, duplicate, or reproduce our Services without authorization</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation with them</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
              <p className="text-sm font-medium text-destructive">
                Violation of these prohibitions may result in the termination of your access to our Services and may 
                expose you to civil and/or criminal liability under applicable laws.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Intellectual Property Rights */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="intellectual"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BadgeInfo className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">7. Intellectual Property Rights</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              Our Services and all materials therein, including software, images, text, graphics, illustrations, 
              logos, trademarks, service marks, and other content (collectively, "Content"), are owned by or licensed 
              to us and are protected by intellectual property laws.
            </p>
            
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/5 p-4">
                  <h3 className="font-medium">Our Rights</h3>
                </div>
                <div className="p-4 text-muted-foreground">
                  <p>
                    Except as expressly permitted in these Terms, you may not:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Reproduce, modify, or create derivative works based on our Services or Content</li>
                    <li>Distribute, publicly display, publicly perform, or publicly digitally perform the Content</li>
                    <li>Remove any copyright, trademark, or other proprietary notices from the Content</li>
                    <li>Use our Content for commercial purposes without our prior written consent</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/5 p-4">
                  <h3 className="font-medium">Limited License</h3>
                </div>
                <div className="p-4 text-muted-foreground">
                  <p>
                    Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, 
                    non-sublicensable license to access and use our Services for your personal, non-commercial use.
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/5 p-4">
                  <h3 className="font-medium">Feedback</h3>
                </div>
                <div className="p-4 text-muted-foreground">
                  <p>
                    If you provide us with any feedback, suggestions, or ideas regarding our Services, you grant us 
                    an unlimited, irrevocable, perpetual, sublicensable, transferable, royalty-free license to use 
                    such feedback in any way.
                  </p>
                </div>
              </div>
            </div>
            
            <p>
              Nothing in these Terms grants you any right, title, or interest in our Services or Content other than 
              as explicitly set forth in these Terms.
            </p>
            
            <div className="bg-card/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Third-Party Content and Services</h3>
              <p className="text-sm text-muted-foreground">
                Our Services may contain links to third-party websites, products, or services, which may be subject to 
                separate terms and privacy policies. We are not responsible for any third-party content, websites, products, 
                or services, and you access and use them at your own risk.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Disclaimer of Warranties */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="disclaimer"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">8. Disclaimer of Warranties</h2>
          </div>
          <div className="pl-14 space-y-4">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-lg text-amber-900 dark:text-amber-300">
              <p className="text-sm uppercase font-bold mb-3">Important Legal Notice</p>
              <p className="mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR SERVICES ARE PROVIDED "AS IS," "AS AVAILABLE," AND 
                "WITH ALL FAULTS," WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
                THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>
              <p>
                WE MAKE NO WARRANTY THAT OUR SERVICES WILL MEET YOUR REQUIREMENTS, BE AVAILABLE ON AN UNINTERRUPTED, 
                TIMELY, SECURE, OR ERROR-FREE BASIS, OR BE ACCURATE, RELIABLE, COMPLETE, LEGAL, OR SAFE.
              </p>
            </div>
            
            <p>
              We specifically disclaim any implied warranties of any kind, including warranties of merchantability, 
              fitness for a particular purpose, non-infringement, and any warranties arising out of course of dealing or usage of trade.
            </p>
            
            <p>
              You use our Services at your own risk. We do not warrant that:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>The results that may be obtained from the use of our Services will be accurate or reliable</li>
              <li>The quality of any products, services, information, or other material purchased or obtained through our Services will meet your expectations</li>
              <li>Any errors in our Services will be corrected</li>
            </ul>
            
            <p>
              Some jurisdictions do not allow the exclusion of implied warranties, so some of the above exclusions may not apply to you.
            </p>
          </div>
        </motion.section>

        {/* Limitation of Liability */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="limitation"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">9. Limitation of Liability</h2>
          </div>
          <div className="pl-14 space-y-4">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-lg text-amber-900 dark:text-amber-300">
              <p className="text-sm uppercase font-bold mb-3">Important Legal Notice</p>
              <p className="mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE, OUR DIRECTORS, EMPLOYEES, PARTNERS, 
                AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE 
                DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, 
                RESULTING FROM:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE OUR SERVICES</li>
                <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON OUR SERVICES</li>
                <li>ANY CONTENT OBTAINED FROM OUR SERVICES</li>
                <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
              </ul>
            </div>
            
            <p>
              In no event shall our aggregate liability for all claims relating to our Services exceed the greater of 
              $100 or the amount you have paid us in the past 12 months.
            </p>
            
            <p>
              Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental 
              damages, so some of the above limitations may not apply to you.
            </p>
          </div>
        </motion.section>

        {/* Termination */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="termination"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <XCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">10. Termination</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              We may terminate or suspend your account and access to our Services immediately, without prior notice or 
              liability, for any reason, including, without limitation, if you breach these Terms.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Termination by Us</h3>
                <p className="text-sm text-muted-foreground">
                  We reserve the right to terminate or suspend your access to our Services at any time, with or without 
                  cause, and with or without notice.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Termination by You</h3>
                <p className="text-sm text-muted-foreground">
                  You may terminate these Terms at any time by discontinuing your use of our Services and deactivating 
                  your account, if applicable.
                </p>
              </div>
            </div>
            
            <p>
              Upon termination, your right to use our Services will immediately cease. The following provisions of these 
              Terms will survive termination: Intellectual Property Rights, Disclaimer of Warranties, Limitation of Liability, 
              and General Provisions.
            </p>
            
            <div className="bg-card/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Effect of Termination</h3>
              <p className="text-sm text-muted-foreground">
                Upon termination, we may delete your data and content associated with your account. We are not responsible 
                for the loss of any data or content resulting from the termination of your account.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Modifications to Terms */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="modifications"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">11. Modifications to Terms</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide 
              notice of any significant changes by posting the new Terms on this page and updating the "Last Updated" date at the top.
            </p>
            
            <p>
              Your continued use of our Services after any such changes constitutes your acceptance of the new Terms. 
              If you do not agree to the new Terms, you must stop using our Services.
            </p>
            
            <div className="bg-card/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Policy for Material Changes</h3>
              <p className="text-sm text-muted-foreground">
                For material changes to these Terms, we will make a more prominent notice, which may include notifying you 
                by email to the address associated with your account or displaying a prominent notice within our Services.
              </p>
            </div>
            
            <p>
              It is your responsibility to review these Terms periodically for changes. If you do not agree to any of the 
              terms in the revised Terms, you must stop using our Services.
            </p>
          </div>
        </motion.section>

        {/* General Provisions */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="general"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">12. General Provisions</h2>
          </div>
          <div className="pl-14 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="governing-law">
                <AccordionTrigger>Governing Law</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>
                    These Terms and your use of our Services shall be governed by and construed in accordance with the laws 
                    of the State of California, without giving effect to any choice or conflict of law provision or rule.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="dispute-resolution">
                <AccordionTrigger>Dispute Resolution</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>
                    Any dispute arising out of or relating to these Terms or our Services shall be resolved through binding 
                    arbitration, except that you may assert claims in small claims court if your claims qualify.
                  </p>
                  <p>
                    The arbitration shall be conducted by the American Arbitration Association under its Commercial 
                    Arbitration Rules. The arbitration shall take place in San Francisco, California.
                  </p>
                  <p>
                    <strong>Class Action Waiver:</strong> You agree that any proceedings to resolve disputes will be conducted 
                    only on an individual basis and not in a class, consolidated, or representative action.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="severability">
                <AccordionTrigger>Severability</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>
                    If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited 
                    or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="assignment">
                <AccordionTrigger>Assignment</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>
                    You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. 
                    Any attempt to assign without consent is void. We may freely assign or transfer these Terms without restriction.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="waiver">
                <AccordionTrigger>Waiver</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>
                    No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, 
                    and our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="entire-agreement">
                <AccordionTrigger>Entire Agreement</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>
                    These Terms, including our Privacy Policy incorporated by reference, constitute the entire agreement between you 
                    and us regarding our Services and supersede any prior or contemporaneous agreements, communications, or proposals.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          <div className="pl-14 space-y-4">
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-6 space-y-3">
                <h3 className="font-medium">By Email</h3>
                <a href="mailto:legal@toolhub.com" className="text-primary hover:underline">legal@toolhub.com</a>
              </div>
              
              <div className="bg-card border rounded-lg p-6 space-y-3">
                <h3 className="font-medium">By Mail</h3>
                <address className="not-italic text-muted-foreground">
                  ToolHub Legal Department<br />
                  123 Tech Plaza<br />
                  Suite 456<br />
                  San Francisco, CA 94105<br />
                  United States
                </address>
              </div>
            </div>
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
        <h2 className="text-xl md:text-2xl font-bold">Have Questions About Our Terms?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're committed to transparency and clarity. If you have any questions or concerns about our Terms of Service,
          please don't hesitate to contact our team.
        </p>
        <div className="pt-2">
          <Button asChild size="lg">
            <a href="mailto:legal@toolhub.com">Contact Our Legal Team</a>
          </Button>
        </div>
      </motion.section>

      {/* Last Updated Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>These Terms of Service were last updated on: {lastUpdated}</p>
      </div>
    </div>
  );
}
