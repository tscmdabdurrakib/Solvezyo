import { useEffect } from "react";
import FlowMolarConverter from "@/tools/unit-conversion/flow-molar-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, FlaskConical, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function FlowMolarConverterPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Flow - Molar Converter | Convert Molar Flow Rate Units - Solvezyo";
  }, [location]);

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Home className="h-3 w-3" />
              <span>Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category/unit-conversion">Unit Conversion Tools</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium">Flow - Molar Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <FlaskConical className="h-6 w-6 text-primary" />
            <span>Flow - Molar Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different molar flow rate units for chemical process engineering and laboratory applications.
            Supports mol/s, mol/min, mol/h, kmol/h, and more scientific units.
          </p>
        </div>

        {/* The Converter Tool */}
        <FlowMolarConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Molar Flow Rate Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Conversions</CardTitle>
                  <CardDescription>Popular molar flow rate conversions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center">
                      <span className="font-medium">1 mol/s</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>60 mol/min</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 mol/h</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1,000 mmol/h</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 kmol/s</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1,000 mol/s</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 mol/min</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>60,000 mmol/min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applications</CardTitle>
                  <CardDescription>Where molar flow rates are used</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Chemical Engineering:</span> Reactor design, 
                    mass balance calculations, and process optimization in chemical plants.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Laboratory Research:</span> Analytical chemistry, 
                    synthesis reactions, and quantitative analysis of chemical processes.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Industrial Processes:</span> Pharmaceutical 
                    manufacturing, petrochemical processing, and material production.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Multiple Units</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Convert between mol/s, mol/min, mol/h, kmol/h, mmol/min, and more scientific units.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">High Precision</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Accurate calculations with proper significant figures for scientific applications.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Real-time Results</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Instant conversion results as you type, perfect for quick calculations.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Scientific Notation</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Automatic formatting for very large or small numbers using scientific notation.
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
