import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import VolumeDryConverter from "@/tools/unit-conversion/volume-dry-converter/index";

/**
 * VolumeDryConverterPage Component
 * 
 * Renders the dry volume converter tool with proper page layout
 */
export default function VolumeDryConverterPage() {
  // Set document title
  useEffect(() => {
    document.title = "Dry Volume Converter | Convert Bushels, Pecks, Cups and More";
  }, []);
  
  return (
    <>
      <div className="container max-w-5xl py-6 md:py-10">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="p-0 mb-2 h-auto" asChild>
              <div className="flex items-center text-muted-foreground text-sm font-normal hover:text-primary">
                <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                <span>Back to home</span>
              </div>
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2 mb-1">
            <Link href="/category/unit-conversion">
              <Badge variant="outline" className="text-xs font-medium">
                Unit & Conversion Tools
              </Badge>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dry Volume Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between different dry volume units for grains, seeds, and agricultural products</p>
        </div>

        <div className="grid gap-8 mb-10">
          <VolumeDryConverter />
        </div>

        {/* What, How, Why sections */}
        <div className="grid gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Dry Volume?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Dry volume measures the space occupied by dry goods like grains, seeds, flour, and other agricultural products. These measurements are different from liquid volume units and are commonly used in farming, cooking, and food distribution.
              </p>
              <div>
                <h3 className="font-medium mb-1">Common Dry Volume Units</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Bushel (bu) - Traditional grain measurement</p>
                  <p>• Peck (pk) - Quarter of a bushel</p>
                  <p>• Cup (dry) - Kitchen measurement for dry ingredients</p>
                  <p>• Cubic foot/inch - Volume measurements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">How to Use This Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-1">Step 1</h3>
                  <p className="text-sm text-muted-foreground">Enter your dry volume measurement</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Step 2</h3>
                  <p className="text-sm text-muted-foreground">Select the source unit from the dropdown</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Step 3</h3>
                  <p className="text-sm text-muted-foreground">Choose your target unit for conversion</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Step 4</h3>
                  <p className="text-sm text-muted-foreground">Get instant results with conversion details</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Why Use Our Dry Volume Converter?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-1">For Farmers</h3>
                  <p className="text-sm text-muted-foreground">Convert crop yields and storage measurements accurately</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Cooking</h3>
                  <p className="text-sm text-muted-foreground">Scale recipes and convert dry ingredient measurements</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Trade</h3>
                  <p className="text-sm text-muted-foreground">Calculate grain and commodity trading volumes</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Storage</h3>
                  <p className="text-sm text-muted-foreground">Plan storage capacity for dry goods and materials</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/volume-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Volume Converter
              </Button>
            </Link>
            <Link href="/tools/weight-mass-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Weight Converter
              </Button>
            </Link>
            <Link href="/tools/area-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Area Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
