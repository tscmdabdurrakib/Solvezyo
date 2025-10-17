import { useEffect } from "react";
import ViscosityDynamicConverter from "@/tools/unit-conversion/viscosity-dynamic-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Droplets, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function ViscosityDynamicConverterPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Viscosity - Dynamic Converter | Convert Dynamic Viscosity Units - Solvezyo";
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
            <BreadcrumbLink className="font-medium">Viscosity - Dynamic Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Droplets className="h-6 w-6 text-primary" />
            <span>Viscosity - Dynamic Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different dynamic viscosity units for fluid mechanics and engineering applications.
            Supports Pa·s, centipoise (cP), poise (P), and other fluid property units.
          </p>
        </div>

        {/* The Converter Tool */}
        <ViscosityDynamicConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Dynamic Viscosity Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Conversions</CardTitle>
                  <CardDescription>Popular dynamic viscosity conversions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center">
                      <span className="font-medium">1 Pa·s</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1,000 cP</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 P</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>100 cP</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 cP</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1 mPa·s</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 lb/(ft·s)</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1.488 Pa·s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applications</CardTitle>
                  <CardDescription>Where dynamic viscosity is important</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Fluid Mechanics:</span> Pipe flow calculations, 
                    pump design, and hydraulic system analysis.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Chemical Engineering:</span> Process design, 
                    mixing operations, and heat transfer calculations.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Materials Science:</span> Polymer processing, 
                    coating applications, and rheological characterization.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Understanding Dynamic Viscosity</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scientific Units</CardTitle>
                  <CardDescription>SI and CGS system units</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <ul className="space-y-1 list-disc ml-4 text-muted-foreground">
                    <li><strong className="text-foreground">Pa·s:</strong> Pascal second - SI unit</li>
                    <li><strong className="text-foreground">mPa·s:</strong> Millipascal second - water viscosity scale</li>
                    <li><strong className="text-foreground">P:</strong> Poise - CGS unit (dyne·s/cm²)</li>
                    <li><strong className="text-foreground">cP:</strong> Centipoise - most common unit</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engineering Units</CardTitle>
                  <CardDescription>Imperial and technical units</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <ul className="space-y-1 list-disc ml-4 text-muted-foreground">
                    <li><strong className="text-foreground">lb/(ft·s):</strong> Pound per foot per second</li>
                    <li><strong className="text-foreground">reyn:</strong> Pound-force second per square inch</li>
                    <li><strong className="text-foreground">slug/(ft·s):</strong> Slug per foot per second</li>
                    <li><strong className="text-foreground">lbf·s/ft²:</strong> Engineering unit</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8 bg-muted/30 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Viscosity Reference Values</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Common Fluids (at 20°C)</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><span className="font-medium text-foreground">Water:</span> 1.002 cP</li>
                  <li><span className="font-medium text-foreground">Air:</span> 0.018 cP</li>
                  <li><span className="font-medium text-foreground">Ethanol:</span> 1.2 cP</li>
                  <li><span className="font-medium text-foreground">Olive Oil:</span> 84 cP</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Industrial Fluids</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><span className="font-medium text-foreground">SAE 10 Oil:</span> 85-140 cP</li>
                  <li><span className="font-medium text-foreground">Glycerin:</span> 1,490 cP</li>
                  <li><span className="font-medium text-foreground">Honey:</span> ~10,000 cP</li>
                  <li><span className="font-medium text-foreground">Molasses:</span> ~5,000-10,000 cP</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
