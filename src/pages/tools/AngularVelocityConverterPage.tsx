import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import AngularVelocityConverter from "@/tools/unit-conversion/angular-velocity-converter/index";

export default function AngularVelocityConverterPage() {
  useEffect(() => {
    document.title = "Angular Velocity Converter | Convert RPM, rad/s, Hz and More";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Angular Velocity Converter</h1>
          <p className="text-lg text-muted-foreground">Convert between RPM, radians per second, hertz and other rotational speed units</p>
        </div>

        <div className="grid gap-8 mb-10">
          <AngularVelocityConverter />
        </div>

        <div className="grid gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is Angular Velocity?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Angular velocity measures how fast an object rotates around an axis. It's commonly used in engineering, physics, and mechanical applications.
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
            <Link href="/tools/acceleration-converter">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Acceleration Converter
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
