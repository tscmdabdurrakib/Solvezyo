import { useEffect } from "react";
import RadiationAbsorbedDoseConverter from "@/tools/unit-conversion/radiation-absorbed-dose-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Target, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function RadiationAbsorbedDoseConverterPage() {
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
            <BreadcrumbLink className="font-medium">Radiation Absorbed Dose Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Target className="h-6 w-6 text-primary" />
            <span>Radiation Absorbed Dose Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different units of radiation energy absorbed by matter.
            Critical for radiation therapy, nuclear safety, and medical physics calculations.
          </p>
        </div>

        {/* The Converter Tool */}
        <RadiationAbsorbedDoseConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Absorbed Dose Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dose Units Explained</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary">Gray (Gy)</h4>
                    <p className="text-sm text-muted-foreground">
                      SI unit of absorbed dose. One gray equals one joule of energy per kilogram of matter.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Rad</h4>
                    <p className="text-sm text-muted-foreground">
                      Traditional unit equal to 0.01 Gy. Still commonly used in the United States.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Centigray (cGy)</h4>
                    <p className="text-sm text-muted-foreground">
                      Commonly used in radiation therapy, equal to 1 rad or 0.01 Gy.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Radiation therapy treatment planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Medical imaging dose calculations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Nuclear medicine dosimetry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Radiation safety compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Cancer treatment protocols</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Radiation detector calibration</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Common Dose Levels</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 Gray (Gy)</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>100 Rads</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>200 cGy (typical therapy fraction)</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>2 Gy</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>10 mGy (chest CT scan)</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>1000 mrad</span>
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
