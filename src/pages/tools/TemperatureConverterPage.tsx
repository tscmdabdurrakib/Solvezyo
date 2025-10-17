import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import TemperatureConverter from '@/tools/unit-conversion/temperature-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function TemperatureConverterPage() {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = "Temperature Converter | Convert Between Celsius, Fahrenheit, Kelvin and More";
  }, []);
  
  return (
    <>
      <div className="container max-w-3xl mx-auto py-6 md:py-10 px-4 sm:px-6 lg:px-8">
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Temperature Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between Celsius, Fahrenheit, Kelvin, and other temperature units</p>
        </div>

        <div className="grid gap-8 mb-10">
          <TemperatureConverter />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Convert between Celsius, Fahrenheit, Kelvin, Rankine, and Réaumur</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Real-time conversion with accurate formulas</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Instant unit swapping</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Conversion formulas displayed for educational purposes</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Copy results with one click</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Tool Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Tool Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Description</h3>
                <p className="text-sm text-muted-foreground">
                  This temperature converter allows you to easily convert between different temperature scales.
                  From everyday Celsius/Fahrenheit conversions to scientific measurements in Kelvin,
                  the tool provides accurate results with precise formulas.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Supported Units</h3>
                <div className="grid grid-cols-2 text-sm text-muted-foreground gap-y-1">
                  <span>• Celsius (°C)</span>
                  <span>• Fahrenheit (°F)</span>
                  <span>• Kelvin (K)</span>
                  <span>• Rankine (°R)</span>
                  <span>• Réaumur (°Ré)</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Common Conversion Formulas</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• °F = (°C × 9/5) + 32</p>
                  <p>• °C = (°F - 32) × 5/9</p>
                  <p>• K = °C + 273.15</p>
                  <p>• °C = K - 273.15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/length-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Length Converter
              </Button>
            </Link>
            <Link href="/tools/weight-mass-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Weight Mass Converter
              </Button>
            </Link>
            <Link href="/tools/volume-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Volume Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
