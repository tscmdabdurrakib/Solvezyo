import { useEffect } from "react";
import MassFluxDensityConverter from "@/tools/unit-conversion/mass-flux-density-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Wind, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function MassFluxDensityConverterPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Mass Flux Density Converter | Convert Mass Flux Units - Solvezyo";
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
            <BreadcrumbLink className="font-medium">Mass Flux Density Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Wind className="h-6 w-6 text-primary" />
            <span>Mass Flux Density Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different mass flux density units for engineering and physics applications.
            Supports kg/(m²·s), g/(m²·s), lb/(ft²·s), and other mass transfer rate units.
          </p>
        </div>

        {/* The Converter Tool */}
        <MassFluxDensityConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Mass Flux Density Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Conversions</CardTitle>
                  <CardDescription>Popular mass flux density conversions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center">
                      <span className="font-medium">1 kg/(m²·s)</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1,000 g/(m²·s)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 g/(cm²·s)</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>10 kg/(m²·s)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 lb/(ft²·s)</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>4.88 kg/(m²·s)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 t/(m²·h)</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>0.278 kg/(m²·s)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applications</CardTitle>
                  <CardDescription>Where mass flux density is used</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Chemical Engineering:</span> Mass transfer 
                    operations, distillation, absorption, and extraction processes.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Environmental Engineering:</span> Pollution 
                    transport, soil contamination, and groundwater flow analysis.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Materials Science:</span> Diffusion studies, 
                    membrane permeability, and surface phenomena research.
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
                  <CardTitle className="text-base">Multiple Systems</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Supports metric (SI), imperial, and specialized engineering units.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Engineering Applications</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Perfect for chemical, environmental, and materials engineering calculations.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Professional Accuracy</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  High precision calculations suitable for professional engineering work.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Time-based Units</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Convert between per-second, per-minute, per-hour, and per-day rates.
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
