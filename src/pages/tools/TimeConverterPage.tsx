import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import TimeConverter from '@/tools/unit-conversion/time-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function TimeConverterPage() {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = "Time Converter | Convert Between Seconds, Minutes, Hours, Days and More";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Time Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between different units of time including seconds, minutes, hours, days and more</p>
        </div>

        <div className="grid gap-8 mb-10">
          <TimeConverter />
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
                  <span>Convert between small and large time units</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Support for nanoseconds to millennia</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Real-time conversion as you type</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Unit swapping with one click</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Copy results to clipboard</span>
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
                  This time converter allows you to easily convert between different units of time.
                  From nanoseconds to millennia, this tool handles both everyday time units and 
                  specialized scientific units. Perfect for time calculations, event planning, 
                  project timelines, or scientific conversions.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Supported Units</h3>
                <div className="grid grid-cols-2 text-sm text-muted-foreground gap-y-1">
                  <span>• Nanosecond (ns)</span>
                  <span>• Microsecond (μs)</span>
                  <span>• Second (s)</span>
                  <span>• Minute (min)</span>
                  <span>• Hour (h)</span>
                  <span>• Day (d)</span>
                  <span>• Week (wk)</span>
                  <span>• Month (mo)</span>
                  <span>• Year (yr)</span>
                  <span>• Decade (dec)</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Common Conversions</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• 1 Minute = 60 Seconds</p>
                  <p>• 1 Hour = 60 Minutes</p>
                  <p>• 1 Day = 24 Hours</p>
                  <p>• 1 Week = 7 Days</p>
                  <p>• 1 Year = 365 Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/data-storage-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Data Storage Converter
              </Button>
            </Link>
            <Link href="/tools/length-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Length Converter
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
