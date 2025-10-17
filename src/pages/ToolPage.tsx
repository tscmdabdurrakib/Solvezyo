import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useTools } from "@/context/ToolsContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ToolPage({ params }: { params?: { id?: string } }) {
  // If params is not provided via props, try to get from useRoute
  const [, routeParams] = useRoute("/tool/:id");
  const effectiveParams = params || routeParams;
  
  const { tools = [] } = useTools() || { tools: [] };
  const [isLoading, setIsLoading] = useState(true);
  
  const toolId = effectiveParams?.id;
  const tool = tools.find((t: any) => t.id === toolId);
  

  
  // Common state
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // For specific tools, redirect to their dedicated pages
    if (toolId === "length-converter") {
      window.location.href = "/tools/length-converter";
    }
    
    return () => clearTimeout(timer);
  }, [toolId]);

  // Generic handlers
  const handleProcess = () => {
    // Process based on tool type
    if (tool?.category.id === 'unit-conversion') {
      setOutputValue(`Converted value: ${inputValue} units`);
    } else if (tool?.category.id === 'text-string') {
      setOutputValue(inputValue.toUpperCase());
    } else {
      setOutputValue(`Processed: ${inputValue}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Tool Not Found</h1>
        <p className="text-muted-foreground mb-8">The tool you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  // Main content
  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <Link href={`/category/${tool.category.id}`}>
            <span className="text-muted-foreground hover:text-foreground transition-colors">
              {tool.category.name}
            </span>
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl font-bold">{tool.name}</h1>
        </div>

        <div className="mb-8">
          <p className="text-muted-foreground max-w-3xl">{tool.description}</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <div className="mr-3 text-primary">{tool.icon}</div>
                <span>{tool.name}</span>
              </div>
            </CardTitle>
            <CardDescription>
              Enter your input below and click Process to use this tool.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium">Input</label>
                <Textarea 
                  className="min-h-32"
                  placeholder="Enter text or values here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button onClick={handleProcess}>Process</Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="block text-sm font-medium">Output</label>
                  {outputValue && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCopy}
                      className="flex items-center"
                    >
                      {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  )}
                </div>
                <div className="p-4 bg-muted rounded border min-h-32 font-mono">
                  {outputValue || "Result will appear here"}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex-col items-start">
            <h4 className="font-medium mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {tool.features ? tool.features.map((feature, i) => (
                <Badge key={i} variant="secondary">{feature}</Badge>
              )) : (
                <p className="text-sm text-muted-foreground">
                  This tool provides {tool.name.toLowerCase()} functionality.
                </p>
              )}
            </div>
          </CardFooter>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <span>Tool Details</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">How to use</h4>
                <ol className="list-decimal ml-4 text-sm text-muted-foreground space-y-1">
                  <li>Enter your input in the text area above</li>
                  <li>Click the "Process" button to perform the operation</li>
                  <li>View the results in the output area</li>
                  <li>Use the "Copy" button to copy the results to clipboard</li>
                </ol>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Use cases</h4>
                <ul className="list-disc ml-4 text-sm text-muted-foreground space-y-1">
                  {tool.category.id === 'unit-conversion' && (
                    <>
                      <li>Converting between different measurement units</li>
                      <li>Scientific calculations requiring unit conversions</li>
                      <li>International recipe conversion</li>
                      <li>Educational purposes for teaching about measurement systems</li>
                    </>
                  )}
                  
                  {tool.category.id === 'text-string' && (
                    <>
                      <li>Formatting text for different requirements</li>
                      <li>Cleaning up text data from various sources</li>
                      <li>Preparing content for publication</li>
                      <li>Text analysis and manipulation</li>
                    </>
                  )}
                  
                  {tool.category.id !== 'unit-conversion' && tool.category.id !== 'text-string' && (
                    <>
                      <li>Simplifying everyday tasks related to {tool.category.name.toLowerCase()}</li>
                      <li>Professional applications in {tool.category.name.toLowerCase()} field</li>
                      <li>Personal productivity and efficiency</li>
                      <li>Educational purposes</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Technical specifications</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Browser-based processing</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>No data storage</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Responsive design</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Instant results</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
