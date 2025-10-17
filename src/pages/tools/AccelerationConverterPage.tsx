import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import AccelerationConverter from "@/tools/unit-conversion/acceleration-converter/index";

export default function AccelerationConverterPage() {
  useEffect(() => {
    document.title = "Acceleration Converter | Convert m/s², ft/s², g-force and More";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Acceleration Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between m/s², ft/s², g-force and other acceleration units</p>
        </div>

        <div className="grid gap-8 mb-10">
          <AccelerationConverter />
        </div>

        <div className="grid gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Acceleration?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Acceleration measures how quickly velocity changes over time. It's fundamental in physics, engineering, and understanding motion.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/speed-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Speed Converter
              </Button>
            </Link>
            <Link href="/tools/angular-velocity-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Angular Velocity Converter
              </Button>
            </Link>
            <Link href="/tools/force-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Force Converter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
