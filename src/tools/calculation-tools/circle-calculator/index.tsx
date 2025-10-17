import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * CircleCalculator Component
 * 
 * Calculates circle properties from radius or diameter
 * Circumference = 2πr
 * Area = πr²
 */
export function CircleCalculator() {
  const [radius, setRadius] = useState<string>('5');
  const [diameter, setDiameter] = useState<string>('');
  const [circumference, setCircumference] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const { toast } = useToast();

  // Calculate circle properties when radius changes
  useEffect(() => {
    calculateCircle();
  }, [radius]);

  // Function to calculate circle properties
  const calculateCircle = () => {
    const r = parseFloat(radius) || 0;

    if (r < 0) {
      setDiameter('');
      setCircumference(0);
      setArea(0);
      return;
    }

    // Calculate diameter: d = 2r
    const d = 2 * r;
    setDiameter(d.toFixed(6));

    // Calculate circumference: C = 2πr
    const c = 2 * Math.PI * r;
    setCircumference(c);

    // Calculate area: A = πr²
    const a = Math.PI * r * r;
    setArea(a);
  };

  // Function to handle diameter input
  const handleDiameterChange = (value: string) => {
    const d = parseFloat(value) || 0;
    setDiameter(value);
    setRadius((d / 2).toString());
  };

  // Function to copy result to clipboard
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Function to reset values
  const handleReset = () => {
    setRadius('5');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Circle Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate area, circumference, and diameter of a circle
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Circle className="mr-2 h-5 w-5" /> Circle Dimensions
          </h2>
          
          <div className="space-y-4">
            {/* Radius */}
            <div>
              <Label htmlFor="radius">Radius (r)</Label>
              <Input
                id="radius"
                type="number"
                step="any"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="Enter radius"
                className="mt-2"
              />
            </div>

            {/* Diameter */}
            <div>
              <Label htmlFor="diameter">Diameter (d)</Label>
              <Input
                id="diameter"
                type="number"
                step="any"
                value={diameter}
                onChange={(e) => handleDiameterChange(e.target.value)}
                placeholder="Enter diameter"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can input either radius or diameter
              </p>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              {/* Circumference */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Circumference</h3>
                    <div className="text-3xl font-bold">
                      {circumference.toFixed(6)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      C = 2πr = {(2 * parseFloat(radius)).toFixed(2)}π
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(circumference.toFixed(6), 'Circumference')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Area */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Area</h3>
                    <div className="text-3xl font-bold">
                      {area.toFixed(6)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      A = πr² = {(parseFloat(radius) * parseFloat(radius)).toFixed(2)}π
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(area.toFixed(6), 'Area')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Radius */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Radius</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {parseFloat(radius).toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Distance from center to edge
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(radius, 'Radius')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Diameter */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Diameter</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {diameter}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Distance across the circle
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(diameter, 'Diameter')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional Properties */}
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <h3 className="font-semibold mb-2">Additional Properties</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Sector Area (90°): {(area / 4).toFixed(4)}</div>
                <div>Arc Length (90°): {(circumference / 4).toFixed(4)}</div>
                <div>Semicircle Area: {(area / 2).toFixed(4)}</div>
                <div>Semicircle Perimeter: {(circumference / 2 + parseFloat(diameter)).toFixed(4)}</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Circle Calculations</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Formulas</h3>
              <p className="text-muted-foreground text-sm">
                Circumference: C = 2πr = πd<br/>
                Area: A = πr²<br/>
                Diameter: d = 2r
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Pi (π)</h3>
              <p className="text-muted-foreground text-sm">
                π ≈ 3.14159265359 is the ratio of a circle's circumference to its diameter, used in all circle calculations.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in engineering, architecture, physics, astronomy, and whenever circular measurements are needed.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CircleCalculator;
