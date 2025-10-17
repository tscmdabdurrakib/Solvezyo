import { useEffect } from "react";
import VolumeLumberConverter from "@/tools/unit-conversion/volume-lumber-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, TreePine, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function VolumeLumberConverterPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts and set page title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Volume - Lumber Converter Tool - Solvezyo";
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
            <BreadcrumbLink className="font-medium">Volume - Lumber Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <TreePine className="h-6 w-6 text-primary" />
            <span>Volume - Lumber Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different units of lumber and wood volume measurements.
            Perfect for construction, forestry, and woodworking applications.
          </p>
        </div>

        {/* The Converter Tool */}
        <VolumeLumberConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Lumber Volume Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Lumber Units</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary">Board Foot (bf)</h4>
                    <p className="text-sm text-muted-foreground">
                      The most common lumber measurement. Equals 144 cubic inches (1" × 12" × 12").
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Cord</h4>
                    <p className="text-sm text-muted-foreground">
                      A stack of wood 4 feet high, 4 feet wide, and 8 feet long (128 cubic feet).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Cubic Foot (ft³)</h4>
                    <p className="text-sm text-muted-foreground">
                      Standard volume measurement, commonly used in construction and shipping.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Industry Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Construction material estimation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Lumber pricing and purchasing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Forest management and harvesting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Woodworking project planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Firewood measurement and sales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Shipping and logistics calculations</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Common Conversions</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 Board Foot</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>0.0833 Cubic Feet</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 Cord</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>128 Cubic Feet</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 Cubic Meter</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>35.31 Cubic Feet</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1000 Board Feet</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>2.36 Cubic Meters</span>
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
