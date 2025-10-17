import { useEffect } from "react";
import RadiationActivityConverter from "@/tools/unit-conversion/radiation-activity-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function RadiationActivityConverterPage() {
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
            <BreadcrumbLink className="font-medium">Radiation Activity Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Zap className="h-6 w-6 text-primary" />
            <span>Radiation Activity Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different units of radioactivity and nuclear decay rates.
            Perfect for nuclear physics, medical applications, and radiation safety calculations.
          </p>
        </div>

        {/* The Converter Tool */}
        <RadiationActivityConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Radiation Activity Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Units Explained</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary">Becquerel (Bq)</h4>
                    <p className="text-sm text-muted-foreground">
                      The SI unit of radioactivity. One becquerel equals one nuclear decay per second.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Curie (Ci)</h4>
                    <p className="text-sm text-muted-foreground">
                      Traditional unit equal to 3.7 × 10¹⁰ Bq, roughly the activity of 1 gram of radium-226.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Rutherford (Rd)</h4>
                    <p className="text-sm text-muted-foreground">
                      Obsolete unit equal to 10⁶ disintegrations per second (1 MBq).
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applications & Uses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Nuclear medicine and radiopharmaceuticals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Radiation safety and protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Environmental radiation monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Nuclear power plant operations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Scientific research and dating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Food irradiation and sterilization</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Conversion Examples</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 Curie (Ci)</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>37 Gigabecquerels (GBq)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 Megabecquerel (MBq)</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>27 Microcuries (μCi)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1000 Picocuries (pCi)</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>37 Becquerels (Bq)</span>
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
