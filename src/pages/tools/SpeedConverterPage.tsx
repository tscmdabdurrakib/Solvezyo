import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import SpeedConverter from '@/tools/unit-conversion/speed-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function SpeedConverterPage() {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = "Speed Converter | Convert Between km/h, mph, knots and More";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Speed Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between different units of speed including km/h, mph, knots and more</p>
        </div>

        <div className="grid gap-8 mb-10">
          <SpeedConverter />
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
                  <span>Convert between metric and imperial speed units</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Support for specialized units like knots and Mach</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Real-time conversion as you type</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Quick unit swapping</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Precise scientific conversions</span>
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
                  This speed converter handles conversions between various units of speed and velocity.
                  From everyday units like kilometers per hour and miles per hour to specialized units 
                  like knots, Mach, and even the speed of light, this tool provides accurate conversions 
                  for scientific, transportation, and everyday applications.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Supported Units</h3>
                <div className="grid grid-cols-2 text-sm text-muted-foreground gap-y-1">
                  <span>• Kilometer per Hour (km/h)</span>
                  <span>• Mile per Hour (mph)</span>
                  <span>• Meter per Second (m/s)</span>
                  <span>• Foot per Second (ft/s)</span>
                  <span>• Knot (kn)</span>
                  <span>• Mach (M)</span>
                  <span>• Beaufort Scale</span>
                  <span>• Speed of Light (c)</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Common Conversions</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• 100 km/h = 62.14 mph</p>
                  <p>• 1 m/s = 3.6 km/h</p>
                  <p>• 1 knot = 1.852 km/h</p>
                  <p>• 1 mph = 1.467 ft/s</p>
                  <p>• 1 Mach = 1225.04 km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/time-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Time Converter
              </Button>
            </Link>
            <Link href="/tools/length-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Length Converter
              </Button>
            </Link>
            <Link href="/tools/pressure-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Pressure Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
