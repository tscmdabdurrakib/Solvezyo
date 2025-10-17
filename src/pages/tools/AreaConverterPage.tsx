import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import AreaConverter from '@/tools/unit-conversion/area-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function AreaConverterPage() {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = "Area Converter | Convert Between Square Meters, Acres, Hectares and More";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Area Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between different units of area including square meters, acres, hectares and more</p>
        </div>

        <div className="grid gap-8 mb-10">
          <AreaConverter />
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
                  <span>Convert between metric and imperial area units</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Support for over 15 different area units</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Real-time conversion as you type</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Instant unit swapping</span>
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
                  This area converter allows you to easily convert between different area measurement units.
                  From everyday units like square meters and square feet to specialized units such as acres, 
                  hectares, and townships, this tool provides precise conversions for all your needs.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Supported Units</h3>
                <div className="grid grid-cols-2 text-sm text-muted-foreground gap-y-1">
                  <span>• Square Meter (m²)</span>
                  <span>• Square Kilometer (km²)</span>
                  <span>• Square Centimeter (cm²)</span>
                  <span>• Hectare (ha)</span>
                  <span>• Square Mile (mi²)</span>
                  <span>• Square Yard (yd²)</span>
                  <span>• Square Foot (ft²)</span>
                  <span>• Square Inch (in²)</span>
                  <span>• Acre (ac)</span>
                  <span>• Township (twp)</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Common Conversions</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• 1 Hectare = 2.47105 Acres</p>
                  <p>• 1 Square Meter = 10.7639 Square Feet</p>
                  <p>• 1 Acre = 4046.86 Square Meters</p>
                  <p>• 1 Square Mile = 2.59 Square Kilometers</p>
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
            <Link href="/tools/volume-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Volume Converter
              </Button>
            </Link>
            <Link href="/tools/weight-mass-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Weight Mass Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
