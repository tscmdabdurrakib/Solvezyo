import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  FileText, 
  Mail, 
  Info, 
  AlertTriangle, 
  Check,
  ClipboardCopy,
  Scale,
  BookCopy,
  FileSymlink
} from "lucide-react";

export default function DMCAPolicyPage() {
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
          DMCA & Copyright Policy
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn about our commitment to copyright protection and how we handle DMCA takedown requests.
        </p>
      </motion.section>

      {/* Introduction & Quick Navigation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="md:col-span-2 space-y-6">
          <Alert className="bg-primary/5 border-primary/20">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="text-lg font-medium text-primary">Copyright Respect</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              <p className="mb-2">
                At ToolHub, we respect the intellectual property rights of others and expect our users to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and respond promptly to notices of alleged copyright infringement.
              </p>
              <p>
                This policy outlines how to submit notifications of claimed copyright infringement and how we process these claims.
              </p>
            </AlertDescription>
          </Alert>
          
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-medium">On This Page</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <a href="#notification" className="hover:text-primary hover:underline">How to Submit a DMCA Notice</a>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <a href="#counter-notice" className="hover:text-primary hover:underline">How to Submit a Counter Notice</a>
              </li>
              <li className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                <a href="#policy" className="hover:text-primary hover:underline">Our Policy on Repeat Infringers</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="#contact" className="hover:text-primary hover:underline">Contact Information</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 space-y-4 relative overflow-hidden">
          <h3 className="font-medium text-lg">Designated Agent</h3>
          <p className="text-muted-foreground">
            All DMCA notices should be sent to our designated copyright agent:
          </p>
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <BookCopy className="h-4 w-4 text-primary" />
              <span className="font-medium">Legal Department, ToolHub Inc.</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:copyright@toolhub.com" className="text-primary hover:underline">copyright@toolhub.com</a>
            </div>
          </div>
          
          <div className="absolute -bottom-10 -right-10 opacity-5">
            <Shield className="h-48 w-48 text-primary" />
          </div>
        </div>
      </motion.div>

      {/* What is the DMCA */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">What is the DMCA?</h2>
        </div>
        <div className="pl-14 space-y-4">
          <p className="text-muted-foreground">
            The Digital Millennium Copyright Act (DMCA) is a United States copyright law that provides guidelines for online service providers like ToolHub 
            in dealing with copyright infringement. It includes a "safe harbor" provision that limits service provider liability for copyright infringement 
            when they promptly take action to remove infringing material upon receiving proper notification.
          </p>
          
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h3 className="font-medium">The DMCA Process in Simple Terms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="bg-muted/30 p-4 rounded-lg border border-muted space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 rounded-full bg-primary/10 items-center justify-center">
                    <span className="text-sm font-medium text-primary">1</span>
                  </div>
                  <span className="font-medium">Notice</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Copyright owner submits a takedown notice for allegedly infringing content.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg border border-muted space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 rounded-full bg-primary/10 items-center justify-center">
                    <span className="text-sm font-medium text-primary">2</span>
                  </div>
                  <span className="font-medium">Action</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We remove or disable access to the content and notify the content provider.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg border border-muted space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 rounded-full bg-primary/10 items-center justify-center">
                    <span className="text-sm font-medium text-primary">3</span>
                  </div>
                  <span className="font-medium">Counter-Notice</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Content provider may dispute by submitting a counter-notice if they believe the removal was in error.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* How to Submit a DMCA Notice */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="notification"
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">How to Submit a DMCA Notice</h2>
        </div>
        <div className="pl-14 space-y-6">
          <p className="text-muted-foreground">
            If you believe that content on our platform infringes your copyright, you may submit a DMCA notification. 
            To be effective, your notification must include the following information:
          </p>
          
          <div className="bg-card border rounded-lg p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Physical or Electronic Signature</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Identification of the Copyrighted Work</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Identification of the copyrighted work claimed to have been infringed, or if multiple works, a representative list of such works.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Identification of the Infringing Material</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed, with enough information to allow us to locate the material (e.g., URLs).
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-medium">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Contact Information</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your contact information, including your address, telephone number, and email address.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-medium">5</span>
                </div>
                <div>
                  <h3 className="font-medium">Statement of Good Faith Belief</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    A statement by you that you have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-medium">6</span>
                </div>
                <div>
                  <h3 className="font-medium">Statement of Accuracy</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    A statement, under penalty of perjury, that the information in your notification is accurate and that you are authorized to act on behalf of the copyright owner.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Notice Template</h3>
              <div className="bg-muted p-4 rounded-lg border">
                <code className="whitespace-pre-wrap text-sm block mb-4">
                  Subject: DMCA Copyright Infringement Notification
                  
                  Dear ToolHub Legal Team:
                  
                  I am writing to notify you about a copyright infringement on your platform. I have found content that infringes upon my copyright rights.
                  
                  1. I, [Your Full Name], am the copyright owner [or authorized to act on behalf of the owner] of [Title of Original Work].
                  
                  2. The copyrighted work that has been infringed is [detailed description of your work].
                  
                  3. The material infringing the copyright appears at: [URL or specific location of the infringing material].
                  
                  4. My contact information is as follows:
                     Name: [Your Full Name]
                     Address: [Your Physical Address]
                     Phone: [Your Phone Number]
                     Email: [Your Email Address]
                  
                  5. I have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
                  
                  6. The information in this notification is accurate, and under penalty of perjury, I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                  
                  [Electronic Signature]
                  [Your Full Name]
                  [Date]
                </code>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ClipboardCopy className="h-4 w-4" />
                  <span>Copy Template</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>Important Note</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Please be aware that under Section 512(f) of the DMCA, any person who knowingly makes material misrepresentations in a notification of claimed infringement may be liable for damages, including costs and attorneys' fees.
            </p>
          </div>
        </div>
      </motion.section>

      {/* How to Submit a Counter Notice */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="counter-notice"
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">How to Submit a Counter Notice</h2>
        </div>
        <div className="pl-14 space-y-6">
          <p className="text-muted-foreground">
            If you believe your content was removed due to a mistake or misidentification, you may submit a counter notice. 
            To be effective, your counter notice must include the following information:
          </p>
          
          <Tabs defaultValue="requirements" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="requirements">Counter Notice Requirements</TabsTrigger>
              <TabsTrigger value="template">Counter Notice Template</TabsTrigger>
            </TabsList>
            
            <TabsContent value="requirements" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Your Physical or Electronic Signature</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A physical or electronic signature (typing your full legal name is acceptable).
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Identification of Removed Material</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Statement Under Penalty of Perjury</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-medium">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Your Contact Information</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your name, address, telephone number, and email address.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-medium">5</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Consent to Jurisdiction</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located, or if your address is outside of the United States, for any judicial district in which ToolHub may be found.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-medium">6</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Acceptance of Service</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A statement that you will accept service of process from the person who provided the DMCA notification or an agent of such person.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Please Note</span>
                </h3>
                <p className="text-sm">
                  Upon receipt of a valid counter notice, we will promptly forward it to the person who submitted the original DMCA notification. The original complainant will then have 10 business days to notify us that they have filed a legal action seeking a court order to restrain you from engaging in the allegedly infringing activity. If we don't receive such notification, we may restore the material to the platform.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="template" className="space-y-6 mt-6">
              <div className="bg-muted p-4 rounded-lg border">
                <code className="whitespace-pre-wrap text-sm block mb-4">
                  Subject: DMCA Counter Notification
                  
                  Dear ToolHub Legal Team:
                  
                  I am writing to submit a counter notification in response to the removal of my content following a DMCA complaint.
                  
                  1. My name: [Your Full Name]
                  
                  2. The following material was removed or disabled as a result of a DMCA complaint:
                     [Identify and describe the removed content and its previous location on the platform]
                  
                  3. I have a good faith belief that this material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled, for the following reasons:
                     [Explain why you believe the content was wrongfully removed]
                  
                  4. My contact information is as follows:
                     Name: [Your Full Name]
                     Address: [Your Physical Address]
                     Phone: [Your Phone Number]
                     Email: [Your Email Address]
                  
                  5. I consent to the jurisdiction of the Federal District Court for the judicial district in which my address is located (or if my address is outside of the United States, for any judicial district in which ToolHub may be found).
                  
                  6. I will accept service of process from the person who provided the DMCA notification or an agent of such person.
                  
                  7. I declare under penalty of perjury that I have a good faith belief that the material was removed or disabled as a result of a mistake or misidentification of the material to be removed or disabled.
                  
                  [Electronic Signature]
                  [Your Full Name]
                  [Date]
                </code>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ClipboardCopy className="h-4 w-4" />
                  <span>Copy Template</span>
                </Button>
              </div>
              
              <div className="bg-card/50 p-4 rounded-lg border text-muted-foreground">
                <h3 className="font-medium mb-2">Submission Guidelines</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Send your counter notice to our designated agent at <a href="mailto:copyright@toolhub.com" className="text-primary hover:underline">copyright@toolhub.com</a></li>
                  <li>Include all required elements to ensure proper processing</li>
                  <li>Be aware that all information provided may be shared with the original complainant</li>
                  <li>Legal counsel is recommended if you're unsure about any aspect of your counter notice</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Our Policy on Repeat Infringers */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="policy"
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Our Policy on Repeat Infringers</h2>
        </div>
        <div className="pl-14 space-y-4">
          <p className="text-muted-foreground">
            We have adopted a policy of terminating, in appropriate circumstances, the accounts of users who are 
            determined to be repeat infringers of copyright.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-destructive flex items-center gap-2 text-base">
                  <AlertTriangle className="h-4 w-4" />
                  What Constitutes a Repeat Infringer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardDescription>
                  A user may be considered a repeat infringer when:
                </CardDescription>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Multiple valid DMCA notices are filed against content they've uploaded</li>
                  <li>They have engaged in clear and obvious copyright infringement</li>
                  <li>They have had content removed multiple times for claimed infringement and have not filed valid counter notices</li>
                  <li>A pattern of infringing behavior is established</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-emerald-600 flex items-center gap-2 text-base">
                  <Check className="h-4 w-4" />
                  Actions We May Take
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardDescription>
                  In response to repeat infringement, we may:
                </CardDescription>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Issue warnings to the user</li>
                  <li>Temporarily suspend account privileges</li>
                  <li>Permanently terminate user accounts</li>
                  <li>Block IP addresses or implement other technical measures</li>
                  <li>Refuse future registration from repeat infringers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mt-4">
            <h3 className="font-medium mb-2">Fair Consideration</h3>
            <p className="text-sm text-muted-foreground">
              We evaluate each situation individually, considering the number and nature of notices received, counter notices filed, 
              and other relevant circumstances. We understand that not all DMCA notices are valid, and we strive to apply our 
              repeat infringer policy fairly and reasonably.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Frequently Asked Questions */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileSymlink className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="pl-14 space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="fair-use">
              <AccordionTrigger>What is Fair Use?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-3">
                  Fair use is a legal doctrine that permits limited use of copyrighted material without acquiring permission from the rights holders. It's determined on a case-by-case basis, considering factors such as:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>The purpose and character of the use (including whether commercial or educational)</li>
                  <li>The nature of the copyrighted work</li>
                  <li>The amount and substantiality of the portion used in relation to the whole</li>
                  <li>The effect of the use on the potential market for or value of the work</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  If you believe your use of copyrighted material constitutes fair use and was wrongly removed, you may submit a counter notice explaining your position.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="processing-time">
              <AccordionTrigger>How long does it take to process a DMCA notice?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We typically process complete and valid DMCA notices within 2-5 business days. However, this may vary depending on the complexity of the claim, the volume of notices we're processing, and whether additional information is needed. We'll acknowledge receipt of your notice and keep you informed of any significant delays.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="false-claims">
              <AccordionTrigger>What happens if someone files a false DMCA claim against me?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  If you believe someone has filed a false or misrepresented DMCA claim against your content, you have the right to submit a counter notice as described above. Additionally, under Section 512(f) of the DMCA, anyone who knowingly misrepresents that material is infringing may be subject to liability for damages, including costs and attorneys' fees. If you believe a DMCA notice was submitted in bad faith, you may want to consult with an attorney about your options.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="tools-copyright">
              <AccordionTrigger>Can I use your tools to process copyrighted material?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-3">
                  This depends on several factors:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>If you own the copyright to the material or have permission from the copyright holder, you may generally use our tools to process it.</li>
                  <li>If your use falls under fair use or another copyright exception, it may be permissible.</li>
                  <li>If you don't have rights or permission, using our tools to process copyrighted material could potentially infringe copyright.</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  We advise users to ensure they have the necessary rights or permissions before uploading or processing copyrighted materials with our tools. ToolHub does not grant you any rights to use copyrighted materials that you don't otherwise have.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="public-domain">
              <AccordionTrigger>What is the public domain?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Public domain refers to creative materials that are not protected by intellectual property laws such as copyright, trademark, or patent laws. The public owns these works, not an individual author or artist. Anyone can use a public domain work without obtaining permission, but no one can ever own it. Works may enter the public domain when their copyright term expires, if they were dedicated to the public domain by their creator, or if they were created by the U.S. federal government.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.section>

      {/* Contact Information */}
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
          <h2 className="text-2xl font-bold">Contact Information</h2>
        </div>
        <div className="pl-14 space-y-4">
          <p className="text-muted-foreground">
            All DMCA notices and counter notices should be sent to our designated copyright agent:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-card border rounded-lg p-6 space-y-3">
              <h3 className="font-medium">By Email</h3>
              <a href="mailto:copyright@toolhub.com" className="text-primary hover:underline">copyright@toolhub.com</a>
            </div>
            
            <div className="bg-card border rounded-lg p-6 space-y-3">
              <h3 className="font-medium">By Mail</h3>
              <address className="not-italic text-muted-foreground">
                ToolHub Copyright Agent<br />
                Legal Department<br />
                123 Tech Plaza<br />
                Suite 456<br />
                San Francisco, CA 94105<br />
                United States
              </address>
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg mt-2">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This contact information is only for copyright-related inquiries. For other matters, please visit our 
              <Link href="/contact" className="text-primary hover:underline px-1">
                Contact Us
              </Link>
              page.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Call to action */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-primary/10 rounded-xl p-6 md:p-8 text-center space-y-4 border mt-12"
      >
        <h2 className="text-xl md:text-2xl font-bold">Questions About Copyright?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          If you have questions about our copyright policy or need assistance with a DMCA notice or counter notice, 
          our team is here to help.
        </p>
        <div className="pt-2">
          <Button asChild size="lg">
            <a href="mailto:copyright@toolhub.com">Contact Our Copyright Team</a>
          </Button>
        </div>
      </motion.section>

      {/* Last Updated Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>This DMCA & Copyright Policy was last updated on: {lastUpdated}</p>
      </div>
    </div>
  );
}
