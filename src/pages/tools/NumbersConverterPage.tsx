import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import NumbersConverter from '@/tools/unit-conversion/numbers-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function NumbersConverterPage() {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = "Numbers Converter | Convert Between Binary, Decimal, Hexadecimal and More";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Numbers Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between different number systems including binary, decimal, hexadecimal and more</p>
        </div>

        <div className="grid gap-8 mb-10">
          <NumbersConverter />
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
                  <span>Convert between all common number systems</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Support for binary, octal, decimal, and hexadecimal</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Real-time conversion as you type</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Input validation for each number system</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Educational information about number systems</span>
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
                  This numbers converter allows you to convert between different numerical systems.
                  Perfect for programmers, computer science students, and anyone working with different
                  number representations. The tool validates input based on the selected number system
                  and provides instant conversions with educational information.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Supported Number Systems</h3>
                <div className="grid grid-cols-2 text-sm text-muted-foreground gap-y-1">
                  <span>• Binary (Base-2)</span>
                  <span>• Octal (Base-8)</span>
                  <span>• Decimal (Base-10)</span>
                  <span>• Hexadecimal (Base-16)</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Common Conversions</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Decimal 10 = Binary 1010</p>
                  <p>• Decimal 15 = Hexadecimal F</p>
                  <p>• Decimal 255 = Binary 11111111</p>
                  <p>• Hexadecimal FF = Decimal 255</p>
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
          </div>
        </div>
      </div>
    </>
  );
}
