import { useEffect } from "react";
import ConcentrationMolarConverter from "@/tools/unit-conversion/concentration-molar-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Beaker, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function ConcentrationMolarConverterPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Concentration - Molar Converter | Convert Molar Concentration Units - Solvezyo";
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
            <BreadcrumbLink className="font-medium">Concentration - Molar Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Beaker className="h-6 w-6 text-primary" />
            <span>Concentration - Molar Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different molar concentration units for chemistry and biochemistry applications.
            Supports Molar (M), millimolar (mM), micromolar (μM), mol/L, mmol/L, and more scientific units.
          </p>
        </div>

        {/* The Converter Tool */}
        <ConcentrationMolarConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Molar Concentration Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Conversions</CardTitle>
                  <CardDescription>Popular molar concentration conversions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center">
                      <span className="font-medium">1 M</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1 mol/L</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 M</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1,000 mM</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 mM</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1,000 μM</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 μM</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1,000 nM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applications</CardTitle>
                  <CardDescription>Where molar concentrations are used</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Analytical Chemistry:</span> Solution preparation, 
                    titrations, and quantitative analysis in laboratory work.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Biochemistry:</span> Enzyme kinetics, protein 
                    studies, and biological assays requiring precise concentrations.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Pharmacology:</span> Drug concentrations, 
                    IC50 values, and therapeutic drug monitoring.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Understanding Molar Concentration</h2>
            <div className="prose max-w-none text-muted-foreground">
              <p className="mb-4">
                <span className="text-foreground font-medium">Molar concentration (M)</span> is defined as the number of moles 
                of solute per liter of solution. It's one of the most commonly used concentration units in chemistry.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Concentration Scales</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm">
                    <ul className="space-y-1 list-disc ml-4">
                      <li><strong>Molar (M):</strong> Standard laboratory scale</li>
                      <li><strong>Millimolar (mM):</strong> Biological systems</li>
                      <li><strong>Micromolar (μM):</strong> Trace analysis</li>
                      <li><strong>Nanomolar (nM):</strong> Ultra-trace analysis</li>
                      <li><strong>Picomolar (pM):</strong> Single molecule detection</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Related Units</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm">
                    <ul className="space-y-1 list-disc ml-4">
                      <li><strong>Normal (N):</strong> Equivalent concentration</li>
                      <li><strong>Osmolar:</strong> Osmotically active particles</li>
                      <li><strong>mol/m³:</strong> SI base unit</li>
                      <li><strong>mol/mL:</strong> Small volume applications</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
