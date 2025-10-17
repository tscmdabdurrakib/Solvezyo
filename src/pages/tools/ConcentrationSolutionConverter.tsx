import { useEffect } from "react";
import ConcentrationSolutionConverter from "@/tools/unit-conversion/concentration-solution-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, TestTube, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function ConcentrationSolutionConverterPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Concentration - Solution Converter | Convert Solution Concentration Units - Solvezyo";
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
            <BreadcrumbLink className="font-medium">Concentration - Solution Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <TestTube className="h-6 w-6 text-primary" />
            <span>Concentration - Solution Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different solution concentration units for analytical chemistry and laboratory work.
            Supports g/L, mg/L, μg/L, ppm, ppb, %w/v, and other mass concentration units.
          </p>
        </div>

        {/* The Converter Tool */}
        <ConcentrationSolutionConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Solution Concentration Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Conversions</CardTitle>
                  <CardDescription>Popular solution concentration conversions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center">
                      <span className="font-medium">1 g/L</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1 ppm</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 mg/L</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1,000 μg/L</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 ppm</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1,000 ppb</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 %w/v</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>10,000 ppm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applications</CardTitle>
                  <CardDescription>Where solution concentrations are used</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Environmental Analysis:</span> Water quality testing, 
                    pollution monitoring, and environmental compliance reporting.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Analytical Chemistry:</span> Sample preparation, 
                    calibration standards, and quantitative analysis methods.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Quality Control:</span> Product testing, 
                    food safety analysis, and pharmaceutical quality assurance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Understanding Solution Concentrations</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mass-based Units</CardTitle>
                  <CardDescription>Weight of solute per volume of solution</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <ul className="space-y-1 list-disc ml-4 text-muted-foreground">
                    <li><strong className="text-foreground">g/L:</strong> Grams per liter - common laboratory unit</li>
                    <li><strong className="text-foreground">mg/L:</strong> Milligrams per liter - water analysis</li>
                    <li><strong className="text-foreground">μg/L:</strong> Micrograms per liter - trace analysis</li>
                    <li><strong className="text-foreground">ng/mL:</strong> Nanograms per milliliter - ultra-trace</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ratio-based Units</CardTitle>
                  <CardDescription>Parts per notation and percentages</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <ul className="space-y-1 list-disc ml-4 text-muted-foreground">
                    <li><strong className="text-foreground">ppm:</strong> Parts per million (mg/L for dilute solutions)</li>
                    <li><strong className="text-foreground">ppb:</strong> Parts per billion (μg/L)</li>
                    <li><strong className="text-foreground">%w/v:</strong> Percent weight/volume</li>
                    <li><strong className="text-foreground">%w/w:</strong> Percent weight/weight</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Wide Range</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  From percent concentrations down to ultra-trace levels in pg/mL.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Environmental Focus</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Perfect for water quality, soil analysis, and environmental monitoring.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Laboratory Ready</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  All common analytical chemistry concentration units supported.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Quality Control</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Essential for pharmaceutical, food, and industrial quality testing.
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
