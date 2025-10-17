import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  ClipboardCheck, 
  Server,
  Layers,
  Shield,
  ExternalLink,
  Terminal,
  CloudOff,
  FileWarning,
  BarChart,
  Globe,
  Clock
} from "lucide-react";

export default function DisclaimerPage() {
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
          Disclaimer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Important information about the reliability, accuracy, and limitations of our tools and services.
        </p>
      </motion.section>

      {/* Main Alert */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-destructive font-bold text-lg">Important Notice</AlertTitle>
          <AlertDescription className="text-destructive/90">
            <p className="mb-2">
              The tools provided on this platform are designed to assist you, but they are not guaranteed to be 100% accurate or reliable.
              Results may vary depending on various factors, including input data quality and external API availability.
            </p>
            <p>
              Please review all outputs carefully before use in critical applications or decisions.
            </p>
          </AlertDescription>
        </Alert>
      </motion.section>

      {/* Quick Navigation */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-amber-500">
              <ClipboardCheck className="h-5 w-5" />
              <CardTitle className="text-base">Tool Accuracy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <a href="#tool-accuracy" className="text-primary hover:underline">Learn about the accuracy and reliability of our tools</a>
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-blue-500">
              <Server className="h-5 w-5" />
              <CardTitle className="text-base">External APIs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <a href="#external-apis" className="text-primary hover:underline">Information about third-party services we use</a>
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-emerald-500">
              <Shield className="h-5 w-5" />
              <CardTitle className="text-base">Data Practices</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <a href="#data-practices" className="text-primary hover:underline">How we handle your data when using our tools</a>
            </CardDescription>
          </CardContent>
        </Card>
      </motion.section>

      {/* Content Sections */}
      <div className="space-y-14">
        {/* General Disclaimer */}
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
            <h2 className="text-2xl font-bold">General Disclaimer</h2>
          </div>
          <div className="pl-14 space-y-4">
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h3 className="font-medium text-lg">No Professional Advice</h3>
              <p className="text-muted-foreground">
                The information, tools, and services provided by ToolHub are for general informational purposes only. 
                They are not intended to be, and should not be considered as, professional advice in any field, including 
                but not limited to legal, financial, medical, or technical advice.
              </p>
              
              <h3 className="font-medium text-lg mt-6">As-Is Basis</h3>
              <p className="text-muted-foreground">
                All tools, services, and information are provided on an "as-is" and "as-available" basis, without any 
                warranties of any kind, either express or implied, including but not limited to warranties of merchantability, 
                fitness for a particular purpose, or non-infringement.
              </p>
              
              <h3 className="font-medium text-lg mt-6">User Responsibility</h3>
              <p className="text-muted-foreground">
                You are solely responsible for any decisions or actions taken based on the results or outputs from our tools. 
                We strongly recommend that you verify all results independently before relying on them for important decisions.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Tool Accuracy */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="tool-accuracy"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <ClipboardCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold">Tool Accuracy and Reliability</h2>
          </div>
          <div className="pl-14 space-y-6">
            <p>
              While we strive to ensure that our tools produce accurate and reliable results, there are inherent 
              limitations to what we can guarantee. Here's what you should know:
            </p>
            
            <div className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-5 space-y-3">
                <h3 className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Accuracy Not Guaranteed</span>
                </h3>
                <p className="text-amber-700 dark:text-amber-300">
                  No tool on our platform is guaranteed to be 100% accurate or reliable. Results may contain 
                  errors, omissions, or inaccuracies. The accuracy of our tools depends on various factors, including 
                  the quality and completeness of input data, the complexity of the requested task, and current 
                  technological limitations.
                </p>
              </div>
              
              <Tabs defaultValue="categories" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="categories">By Tool Category</TabsTrigger>
                  <TabsTrigger value="factors">Accuracy Factors</TabsTrigger>
                  <TabsTrigger value="testing">Our Testing Process</TabsTrigger>
                </TabsList>
                
                <TabsContent value="categories" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        High Reliability (90-99%)
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Basic calculators and converters</li>
                        <li>Text formatters and syntax highlighting</li>
                        <li>Simple data validators</li>
                        <li>Hash generators</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        Medium Reliability (75-90%)
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Code analyzers and linters</li>
                        <li>Image processing tools</li>
                        <li>Data visualization generators</li>
                        <li>SEO analysis tools</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                        Variable Reliability (50-75%)
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Language translators</li>
                        <li>Content summarizers</li>
                        <li>Sentiment analyzers</li>
                        <li>Pattern recognition tools</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        <span>Low Reliability (&lt;50%)</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Predictive tools and forecasting</li>
                        <li>Complex AI-based content generation</li>
                        <li>Automated coding assistants</li>
                        <li>Health or legal analysis tools</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> These reliability ratings are general estimates and may vary based on specific use cases, 
                      input quality, and other factors. Always verify critical outputs independently.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="factors" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileWarning className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Input Quality</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          The accuracy of our tools heavily depends on the quality, completeness, and clarity of the data you input. 
                          Ambiguous, incomplete, or poor-quality inputs will likely result in less accurate outputs.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Layers className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Task Complexity</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          More complex tasks inherently have a higher chance of inaccuracy. Simple conversions or calculations 
                          are typically more reliable than complex analyses or generative tasks.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">External Dependencies</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tools that rely on external APIs or databases may experience fluctuations in accuracy based on the 
                          availability and quality of these external sources.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Recency of Updates</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tools that rely on databases, rules, or models that change over time (like language models, tax calculators, 
                          or code analyzers) may become less accurate if they're not frequently updated.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="testing" className="space-y-4">
                  <div className="border rounded-lg p-5 space-y-4">
                    <h4 className="font-medium">Our Quality Assurance Process</h4>
                    <p className="text-muted-foreground">
                      While we cannot guarantee 100% accuracy, we do implement a rigorous testing process for all tools:
                    </p>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary font-medium text-sm">1</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Development Testing</h5>
                          <p className="text-sm text-muted-foreground">
                            All tools undergo thorough unit and integration testing during development.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary font-medium text-sm">2</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Benchmark Testing</h5>
                          <p className="text-sm text-muted-foreground">
                            We compare our tools against established standards and benchmarks where applicable.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary font-medium text-sm">3</span>
                        </div>
                        <div>
                          <h5 className="font-medium">User Feedback Loop</h5>
                          <p className="text-sm text-muted-foreground">
                            We continuously collect and incorporate user feedback to improve accuracy.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary font-medium text-sm">4</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Regular Updates</h5>
                          <p className="text-sm text-muted-foreground">
                            Tools are regularly reviewed and updated to improve accuracy and reliability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Despite our best efforts, tool accuracy can never be guaranteed due to the inherent limitations of technology, 
                      the complexity of certain tasks, and various external factors.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-medium text-lg mb-3">Best Practices for Users</h3>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Always verify critical results with multiple sources or methods.</span>
                </li>
                <li className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Provide clear, complete inputs to maximize accuracy.</span>
                </li>
                <li className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Consider the inherent accuracy level of the tool category you're using.</span>
                </li>
                <li className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Review results carefully before making important decisions based on them.</span>
                </li>
                <li className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Report any accuracy issues you encounter to help us improve.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* External APIs */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="external-apis"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold">External APIs and Services</h2>
          </div>
          <div className="pl-14 space-y-6">
            <p>
              Many of our tools rely on external APIs, services, or databases to provide their functionality. 
              This introduces additional factors that may affect tool reliability and availability:
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 rounded-lg p-5 space-y-3 text-blue-900 dark:text-blue-300">
              <h3 className="font-bold flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                <span>Third-Party Dependencies</span>
              </h3>
              <p>
                When a tool uses external APIs or services, its functionality, accuracy, and availability are directly 
                dependent on those third-party services. This means that:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>If a third-party service is down, our tool may also be unavailable</li>
                <li>If a third-party API changes, our tool may produce unexpected results</li>
                <li>Rate limits or usage quotas may affect tool performance or availability</li>
                <li>Accuracy is limited by the accuracy of the third-party service itself</li>
              </ul>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="api-categories">
                <AccordionTrigger className="text-lg font-medium">
                  Categories of External Services We Use
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-primary" />
                        <span>Language Processing APIs</span>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Used for translation, summarization, and content generation tools.
                      </p>
                      <div className="bg-muted/30 p-2 rounded text-xs text-muted-foreground">
                        Examples: OpenAI, Google Translate, Microsoft Cognitive Services
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-primary" />
                        <span>Data Analysis Services</span>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Used for market data, statistics, and analytical tools.
                      </p>
                      <div className="bg-muted/30 p-2 rounded text-xs text-muted-foreground">
                        Examples: Alpha Vantage, World Bank API, various market data providers
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span>Geographic Services</span>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Used for mapping, location, and geospatial tools.
                      </p>
                      <div className="bg-muted/30 p-2 rounded text-xs text-muted-foreground">
                        Examples: Google Maps, OpenStreetMap, Mapbox, weather data providers
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <CloudOff className="h-4 w-4 text-primary" />
                        <span>Cloud Services</span>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Used for storage, processing, and computation.
                      </p>
                      <div className="bg-muted/30 p-2 rounded text-xs text-muted-foreground">
                        Examples: AWS, Google Cloud, Microsoft Azure
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Specific external services used by each tool may change over time as we 
                      continuously work to improve our offerings.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="api-disclosure">
                <AccordionTrigger className="text-lg font-medium">
                  How We Disclose API Usage
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We aim to be transparent about which tools use external APIs or services. You can identify tools 
                    that use external services in the following ways:
                  </p>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-medium text-sm">1</span>
                      </div>
                      <div>
                        <h5 className="font-medium">Tool Information Panels</h5>
                        <p className="text-sm text-muted-foreground">
                          Each tool page includes information about external dependencies in its description or details section.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-medium text-sm">2</span>
                      </div>
                      <div>
                        <h5 className="font-medium">API Indicators</h5>
                        <p className="text-sm text-muted-foreground">
                          Tools using external APIs display an "External API" badge or indicator.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-medium text-sm">3</span>
                      </div>
                      <div>
                        <h5 className="font-medium">Status Notifications</h5>
                        <p className="text-sm text-muted-foreground">
                          We display status notifications when external services experience downtime or issues.
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="api-mitigation">
                <AccordionTrigger className="text-lg font-medium">
                  How We Mitigate API Dependency Risks
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We implement several strategies to minimize disruptions from external API dependencies:
                  </p>
                  
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Implementing fallback mechanisms and caching where appropriate</span>
                    </li>
                    <li className="flex gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Monitoring external service health and providing status updates</span>
                    </li>
                    <li className="flex gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Using multiple providers for critical services when possible</span>
                    </li>
                    <li className="flex gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Building in graceful degradation so tools remain partially functional when possible</span>
                    </li>
                    <li className="flex gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Regularly updating and maintaining API integrations to ensure compatibility</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-medium text-lg mb-3">User Recommendations</h3>
              <p className="text-muted-foreground mb-4">
                When using tools that rely on external APIs, please consider these recommendations:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Be aware that availability and performance may fluctuate due to external factors.</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>For critical tasks, have alternative methods or tools available.</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Check tool status indicators before relying on time-sensitive results.</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Report any issues with API-dependent tools to help us address them quickly.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Data Practices */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="data-practices"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold">Data Handling Practices</h2>
          </div>
          <div className="pl-14 space-y-6">
            <p>
              When you use our tools, you may provide various types of data for processing. Here's important information 
              about how we handle your data:
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-5 space-y-3 text-emerald-900 dark:text-emerald-300">
              <h3 className="font-bold flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>Data Processing Disclosure</span>
              </h3>
              <p>
                When you use tools that rely on external APIs or services, the data you input may be processed by those third parties. 
                This means your data could be transmitted to servers operated by other companies during the processing of your request.
              </p>
              <p className="mt-2">
                For tools that use third-party services, we make reasonable efforts to ensure those services follow 
                appropriate security and privacy practices, but we cannot control their operations or policies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/5 p-4">
                  <h3 className="font-medium">Data Retention</h3>
                </div>
                <div className="p-4 text-muted-foreground">
                  <p>
                    Our general practices regarding data retention include:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Most tool inputs are processed temporarily and not permanently stored</li>
                    <li>Certain tools may cache results for performance, typically for 24-72 hours</li>
                    <li>We retain minimal usage data for analytics and improvement purposes</li>
                    <li>For registered users, saved preferences and settings are retained until account deletion</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/5 p-4">
                  <h3 className="font-medium">Data Security</h3>
                </div>
                <div className="p-4 text-muted-foreground">
                  <p>
                    We implement security measures to protect your data, including:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Data encryption in transit using TLS/SSL</li>
                    <li>Access controls and authentication for internal systems</li>
                    <li>Regular security assessments and updates</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-medium text-lg mb-3">Data Privacy Recommendations</h3>
              <p className="text-muted-foreground mb-4">
                To protect your privacy when using our tools, we recommend:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Avoid inputting sensitive personal or confidential information unless necessary.</span>
                </li>
                <li className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Review the privacy indicators for each tool before using it.</span>
                </li>
                <li className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>For sensitive work, consider using locally-processed tools rather than API-based ones.</span>
                </li>
                <li className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Be aware that external APIs may have different data retention policies than our platform.</span>
                </li>
              </ul>
              
              <div className="mt-6 flex items-center">
                <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mr-3">
                  <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  For complete details on how we handle your data, please refer to our 
                  <Link href="/privacy" className="text-primary hover:underline px-1">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Legal Limitations */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Legal Limitations and Indemnity</h2>
          </div>
          <div className="pl-14 space-y-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-5 space-y-4">
              <h3 className="font-medium text-destructive">Limitation of Liability</h3>
              <p className="text-muted-foreground">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, TOOLHUB, ITS AFFILIATES, AND THEIR RESPECTIVE OFFICERS, 
                DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS AND LICENSORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, 
                GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>THE USE OR INABILITY TO USE THE TOOLS OR SERVICES</li>
                <li>ANY INACCURACY, ERROR, OR INCORRECTNESS IN THE RESULTS PROVIDED BY THE TOOLS</li>
                <li>DECISIONS MADE OR ACTIONS TAKEN BASED ON THE RESULTS FROM OUR TOOLS</li>
                <li>ANY RELIANCE ON THE RELIABILITY, ACCURACY, OR COMPLETENESS OF OUR TOOLS</li>
              </ul>
            </div>
            
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-medium text-lg mb-3">Indemnification</h3>
              <p className="text-muted-foreground">
                By using our tools and services, you agree to indemnify, defend, and hold harmless ToolHub, its 
                affiliates, and their respective officers, directors, employees, agents, licensors, and suppliers 
                from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or 
                fees (including reasonable attorneys' fees) arising out of or relating to your use of our tools 
                or any breach of this Disclaimer.
              </p>
            </div>
            
            <p className="text-muted-foreground">
              For the complete terms governing your use of our services, please refer to our 
              <Link href="/terms" className="text-primary hover:underline px-1">
                Terms of Service
              </Link>.
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
        <h2 className="text-xl md:text-2xl font-bold">Questions About Tool Reliability?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          If you have questions about the reliability or accuracy of a specific tool, or would like to report an issue,
          our team is here to help.
        </p>
        <div className="pt-2">
          <Button asChild size="lg">
            <a href="mailto:support@toolhub.com">Contact Our Support Team</a>
          </Button>
        </div>
      </motion.section>

      {/* Last Updated Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>This Disclaimer was last updated on: {lastUpdated}</p>
      </div>
    </div>
  );
}
