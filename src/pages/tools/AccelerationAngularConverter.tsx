import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import AccelerationAngularConverterTool from "@/tools/unit-conversion/acceleration-angular-converter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AccelerationAngularConverter() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Acceleration to Angular Velocity Converter | Solvezyo";
  }, []);

  return (
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
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Acceleration to Angular Velocity Converter</h1>
        <p className="text-lg text-muted-foreground">Convert linear acceleration to angular velocity with professional precision for engineering applications</p>
      </div>

      <div className="grid gap-8 mb-10">
        <AccelerationAngularConverterTool />
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
                <span>Convert linear acceleration to angular velocity</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Support for multiple acceleration units (m/s², ft/s², g)</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Angular velocity in rad/s, RPM, deg/s</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Real-time calculation with radius parameter</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Professional engineering accuracy</span>
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
                This converter calculates angular velocity from linear acceleration using the formula α = a/r.
                Essential for mechanical engineering, robotics, and rotational dynamics calculations.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-1">Formula</h3>
              <p className="text-sm font-mono bg-muted px-2 py-1 rounded">α = a / r</p>
              <p className="text-xs text-muted-foreground mt-1">Where α is angular acceleration, a is linear acceleration, and r is radius</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
