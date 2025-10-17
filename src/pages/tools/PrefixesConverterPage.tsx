import { useEffect } from "react";
import PrefixesConverter from "@/tools/unit-conversion/prefixes-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Hash, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function PrefixesConverterPage() {
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
            <BreadcrumbLink className="font-medium">SI Prefixes Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Hash className="h-6 w-6 text-primary" />
            <span>SI Prefixes Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different SI metric prefixes and scale factors.
            Essential for scientific calculations, engineering, and understanding metric measurements.
          </p>
        </div>

        {/* The Converter Tool */}
        <PrefixesConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About SI Prefixes</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Large Scale Prefixes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>yotta (Y)</strong></span>
                    <span>10²⁴</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>zetta (Z)</strong></span>
                    <span>10²¹</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>exa (E)</strong></span>
                    <span>10¹⁸</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>peta (P)</strong></span>
                    <span>10¹⁵</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>tera (T)</strong></span>
                    <span>10¹²</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>giga (G)</strong></span>
                    <span>10⁹</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>mega (M)</strong></span>
                    <span>10⁶</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>kilo (k)</strong></span>
                    <span>10³</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Small Scale Prefixes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>milli (m)</strong></span>
                    <span>10⁻³</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>micro (μ)</strong></span>
                    <span>10⁻⁶</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>nano (n)</strong></span>
                    <span>10⁻⁹</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>pico (p)</strong></span>
                    <span>10⁻¹²</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>femto (f)</strong></span>
                    <span>10⁻¹⁵</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>atto (a)</strong></span>
                    <span>10⁻¹⁸</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>zepto (z)</strong></span>
                    <span>10⁻²¹</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span><strong>yocto (y)</strong></span>
                    <span>10⁻²⁴</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Real-World Applications</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">• Computer storage (GB, TB)</div>
                  <div className="text-sm">• Network speeds (Mbps, Gbps)</div>
                  <div className="text-sm">• Processor frequencies (GHz)</div>
                  <div className="text-sm">• Memory capacity (MB, GB)</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Science</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">• Molecular measurements (nm, μm)</div>
                  <div className="text-sm">• Astronomical distances (Mm, Gm)</div>
                  <div className="text-sm">• Laboratory quantities (mL, μL)</div>
                  <div className="text-sm">• Electrical measurements (mA, kV)</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engineering</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">• Power ratings (kW, MW)</div>
                  <div className="text-sm">• Material properties (GPa, μm)</div>
                  <div className="text-sm">• Signal processing (MHz, GHz)</div>
                  <div className="text-sm">• Manufacturing tolerances (μm)</div>
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
                    <span>1 kilo</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>1,000 base units</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 mega</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>1,000 kilo units</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 milli</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>0.001 base units</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 micro</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>0.001 milli units</span>
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
