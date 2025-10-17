import { useEffect } from "react";
import RadiationExposureConverter from "@/tools/unit-conversion/radiation-exposure-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Shield, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function RadiationExposureConverterPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
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
            <BreadcrumbLink className="font-medium">Radiation Exposure Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Shield className="h-6 w-6 text-primary" />
            <span>Radiation Exposure Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different units of ionizing radiation exposure.
            Essential for radiation protection, medical imaging, and environmental monitoring.
          </p>
        </div>

        {/* The Converter Tool */}
        <RadiationExposureConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Radiation Exposure Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Exposure Units Explained</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary">Roentgen (R)</h4>
                    <p className="text-sm text-muted-foreground">
                      Traditional unit measuring ionization in air. Named after Wilhelm Roentgen, discoverer of X-rays.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Coulomb per Kilogram (C/kg)</h4>
                    <p className="text-sm text-muted-foreground">
                      SI unit of exposure. Measures electric charge produced by ionization per unit mass of air.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Conversion Factor</h4>
                    <p className="text-sm text-muted-foreground">
                      1 Roentgen = 2.58 × 10⁻⁴ C/kg. This relationship is fundamental in radiation measurement.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Differences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Exposure vs. dose: exposure measures radiation in air</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Only applies to X-rays and gamma rays</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Does not account for biological effects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Used in radiation protection standards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Important for calibrating radiation detectors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Widely used in medical radiology</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Practical Examples</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 Roentgen (R)</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>0.000258 C/kg</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>10 Milliroentgens (mR)</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>2.58 × 10⁻⁶ C/kg</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>100 Microroentgens (μR)</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>2.58 × 10⁻⁸ C/kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
