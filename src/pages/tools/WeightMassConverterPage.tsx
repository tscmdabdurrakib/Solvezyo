import React, { useEffect } from "react";
import WeightMassConverter from "@/tools/unit-conversion/weight-mass-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Scale, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function WeightMassConverterPage() {
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
            <BreadcrumbLink className="font-medium">Weight and Mass Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Scale className="h-6 w-6 text-primary" />
            <span>Weight and Mass Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Easily convert between different units of weight and mass - from milligrams to metric tons.
            Supports both metric and imperial measurement systems.
          </p>
        </div>

        {/* The Converter Tool */}
        <WeightMassConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Weight and Mass Units</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Metric vs Imperial Units</CardTitle>
                  <CardDescription>Understanding the different systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">
                    Weight and mass measurements are based on two main systems: the metric system 
                    (used globally) and the imperial system (used primarily in the US and a few 
                    other countries).
                  </p>
                  <div className="grid grid-cols-2 gap-1 mt-3">
                    <div className="font-medium">Metric Units:</div>
                    <div className="text-muted-foreground">gram, kilogram, tonne</div>
                    
                    <div className="font-medium">Imperial Units:</div>
                    <div className="text-muted-foreground">ounce, pound, stone, ton</div>
                    
                    <div className="font-medium">Base Unit (Metric):</div>
                    <div className="text-muted-foreground">gram (g)</div>
                    
                    <div className="font-medium">Base Unit (Imperial):</div>
                    <div className="text-muted-foreground">pound (lb)</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Conversion Equations</CardTitle>
                  <CardDescription>Formulas for popular conversions</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-muted-foreground">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center">
                      <span className="font-medium">1 kilogram</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>2.20462 pounds</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 pound</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>453.592 grams</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 ounce</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>28.3495 grams</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 stone</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>6.35029 kilograms</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 metric ton</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>2204.62 pounds</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 US ton</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>907.185 kilograms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">How to Use the Weight and Mass Converter</h2>
            <div className="prose max-w-none text-muted-foreground">
              <ol className="space-y-2 ml-5 list-decimal">
                <li><span className="text-foreground font-medium">Enter the weight or mass value</span> you want to convert in the input field.</li>
                <li><span className="text-foreground font-medium">Select the source unit</span> from the "From" dropdown menu (gram, kilogram, pound, etc.).</li>
                <li><span className="text-foreground font-medium">Choose the target unit</span> from the "To" dropdown that you want to convert to.</li>
                <li>View the <span className="text-foreground font-medium">conversion result</span> which appears instantly below.</li>
                <li>Use the <span className="text-foreground font-medium">swap button</span> to quickly reverse the conversion direction.</li>
                <li>Click <span className="text-foreground font-medium">Reset</span> to clear all fields and start a new conversion.</li>
                <li>Use the <span className="text-foreground font-medium">Copy</span> button to copy the conversion result to your clipboard.</li>
              </ol>
              <p className="mt-4">
                The converter handles a wide range of values, from extremely small measurements (like milligrams) 
                to very large ones (like metric tons). For very large or very small numbers, scientific notation 
                may be used for better readability.
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Applications and Use Cases</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Cooking and Food Preparation</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Convert between grams, ounces, and pounds when following recipes from different 
                  countries or measuring ingredients for cooking and baking.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Health and Fitness</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Track body weight in preferred units, convert between kilograms and pounds for 
                  fitness goals, and calculate nutritional information accurately.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Shipping and Logistics</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Calculate shipping costs based on weight, convert between different weight units 
                  for international shipping requirements, and manage cargo loading.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Science and Education</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Convert units for laboratory measurements, scientific experiments, and educational 
                  problems in physics and chemistry classes.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Manufacturing</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Ensure accurate material quantities for production processes, convert raw material 
                  weights between different measurement systems, and manage inventory.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Agriculture</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Calculate crop yields, fertilizer applications, and livestock feed quantities using 
                  different weight measurement systems around the world.
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8 bg-muted/30 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Interesting Facts About Weight and Mass</h2>
            <ul className="space-y-3 ml-5 list-disc text-muted-foreground">
              <li>
                The <span className="font-medium text-foreground">kilogram</span> is the only SI base unit still 
                defined by a physical object - a platinum-iridium cylinder kept in France - until 2019 when it was 
                redefined based on Planck's constant.
              </li>
              <li>
                The <span className="font-medium text-foreground">stone</span> as a unit of weight is primarily 
                used in the United Kingdom and Ireland and equals 14 pounds.
              </li>
              <li>
                <span className="font-medium text-foreground">Weight</span> and <span className="font-medium text-foreground">mass</span> are 
                not the same thing: mass is the amount of matter in an object, while weight is the force exerted on that mass due to gravity.
              </li>
              <li>
                The <span className="font-medium text-foreground">carat</span>, used for measuring gemstones, 
                is equal to exactly 200 milligrams and gets its name from the carob seed, which was used as a 
                reference weight in ancient times.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
