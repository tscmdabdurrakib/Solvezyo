import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import FuelConsumptionConverter from "@/tools/unit-conversion/fuel-consumption-converter/index";

/**
 * FuelConsumptionConverterPage Component
 * 
 * Renders the fuel consumption converter tool with proper page layout
 */
export default function FuelConsumptionConverterPage() {
  // Set document title
  useEffect(() => {
    document.title = "Fuel Consumption Converter | Convert MPG, L/100km, km/L and More";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Fuel Consumption Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between different fuel consumption units including MPG, L/100km, km/L and more</p>
        </div>

        <div className="grid gap-8 mb-10">
          <FuelConsumptionConverter />
        </div>

        {/* What, How, Why sections */}
        <div className="grid gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Fuel Consumption?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Fuel consumption measures how efficiently a vehicle uses fuel. It can be expressed as distance traveled per unit of fuel (like miles per gallon or kilometers per liter) or fuel used per distance (like liters per 100 kilometers).
              </p>
              <div>
                <h3 className="font-medium mb-1">Common Units</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• MPG (US/UK) - Miles per gallon</p>
                  <p>• L/100km - Liters per 100 kilometers</p>
                  <p>• km/L - Kilometers per liter</p>
                  <p>• gal/100mi - Gallons per 100 miles</p>
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
                  <p className="text-sm text-muted-foreground">Enter your fuel consumption value in any unit</p>
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
                  <p className="text-sm text-muted-foreground">Get instant results with detailed conversion info</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Why Use Our Fuel Consumption Converter?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-1">For Car Buyers</h3>
                  <p className="text-sm text-muted-foreground">Compare fuel efficiency across different regions and measurement systems</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Travel Planning</h3>
                  <p className="text-sm text-muted-foreground">Calculate fuel costs and consumption for road trips</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Fleet Management</h3>
                  <p className="text-sm text-muted-foreground">Monitor and optimize vehicle fuel efficiency</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">For Environmental Impact</h3>
                  <p className="text-sm text-muted-foreground">Calculate carbon footprint and fuel consumption impact</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/speed-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Speed Converter
              </Button>
            </Link>
            <Link href="/tools/volume-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Volume Converter
              </Button>
            </Link>
            <Link href="/tools/length-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Length Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
