import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import MomentOfInertiaConverterTool from "@/tools/unit-conversion/moment-of-inertia-converter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function MomentOfInertiaConverter() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Moment of Inertia Converter | Solvezyo";
  }, []);

  return (
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
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Moment of Inertia Converter</h1>
        <p className="text-lg text-muted-foreground">Convert moment of inertia units for mechanical engineering</p>
      </div>

      <div className="grid gap-8 mb-10">
        <MomentOfInertiaConverterTool />
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
                <span>Convert between kg⋅m², lb⋅ft², slug⋅ft² and more</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Common geometric shapes reference guide</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>High precision engineering calculations</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Formula display for each shape</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Real-time conversion with validation</span>
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
                Moment of inertia converter for rotational dynamics calculations. Essential for
                mechanical engineering, physics, and structural analysis applications.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-1">Definition</h3>
              <p className="text-sm font-mono bg-muted px-2 py-1 rounded">I = Σmr²</p>
              <p className="text-xs text-muted-foreground mt-1">Moment of inertia quantifies rotational inertia about an axis</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
