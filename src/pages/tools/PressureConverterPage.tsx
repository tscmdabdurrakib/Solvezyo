import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import PressureConverter from '@/tools/unit-conversion/pressure-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function PressureConverterPage() {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = "Pressure Converter | Convert Between Bar, PSI, Pascal and More";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Pressure Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between different units of pressure including bar, PSI, Pascal and more</p>
        </div>

        <div className="grid gap-8 mb-10">
          <PressureConverter />
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
                  <span>Convert between all common pressure units</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Support for scientific, engineering, and everyday pressure units</span>
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
                  <span>Accurate conversion factors</span>
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
                  This pressure converter handles conversions between a wide range of pressure units.
                  From SI units like Pascal to traditional measurements like mmHg and inH₂O,
                  this tool provides precise conversions for engineering, scientific, and everyday applications.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Supported Units</h3>
                <div className="grid grid-cols-2 text-sm text-muted-foreground gap-y-1">
                  <span>• Pascal (Pa)</span>
                  <span>• Kilopascal (kPa)</span>
                  <span>• Megapascal (MPa)</span>
                  <span>• Bar (bar)</span>
                  <span>• Millibar (mbar)</span>
                  <span>• Atmosphere (atm)</span>
                  <span>• PSI (psi)</span>
                  <span>• Torr (Torr)</span>
                  <span>• mmHg</span>
                  <span>• inHg</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Common Conversions</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• 1 Bar = 14.5038 PSI</p>
                  <p>• 1 Atmosphere = 1.01325 Bar</p>
                  <p>• 1 PSI = 6.89476 Kilopascal</p>
                  <p>• 1 Bar = 750.062 Torr</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/temperature-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Temperature Converter
              </Button>
            </Link>
            <Link href="/tools/area-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Area Converter
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
