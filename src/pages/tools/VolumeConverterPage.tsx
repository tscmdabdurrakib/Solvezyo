import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import VolumeConverter from '@/tools/unit-conversion/volume-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function VolumeConverterPage() {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = "Volume Converter | Convert Between Various Volume Units";
  }, []);
  
  return (
    <>
      <div className="container max-w-3xl mx-auto py-6 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="p-0 mb-2 h-auto" asChild>
              <div className="flex items-center text-muted-foreground text-sm font-normal hover:text-primary">
                <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                <span>Back to home</span>
              </div>
            </Button>
          </Link>
          
          <div className="container flex items-center space-x-2 mb-1">
            <Link href="/category/unit-conversion">
              <Badge variant="outline" className="text-xs font-medium">
                Unit & Conversion Tools
              </Badge>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Volume Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between different volume units including metric and imperial systems</p>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <VolumeConverter />
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
                  <span>Supports all common volume units including metric and imperial</span>
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
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Common conversion reference table</span>
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
                  This volume converter allows you to easily convert between different units of volume measurement.
                  It supports both metric units (like liters and cubic meters) and imperial/US units (like gallons and fluid ounces).
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Supported Units</h3>
                <div className="grid grid-cols-2 text-sm text-muted-foreground gap-y-1">
                  <span>• Cubic Meter (m³)</span>
                  <span>• Liter (L)</span>
                  <span>• Milliliter (mL)</span>
                  <span>• Cubic Centimeter (cm³)</span>
                  <span>• Cubic Inch (in³)</span>
                  <span>• Cubic Foot (ft³)</span>
                  <span>• US Gallon (gal)</span>
                  <span>• Imperial Gallon (gal)</span>
                  <span>• US Fluid Ounce (fl oz)</span>
                  <span>• US Cup (cup)</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">How It Works</h3>
                <p className="text-sm text-muted-foreground">
                  The converter uses standard conversion rates to transform volumes between different measurement systems.
                  All conversions are performed locally in your browser with no data sent to any server.
                </p>
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
            <Link href="/tools/temperature-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Temperature Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
