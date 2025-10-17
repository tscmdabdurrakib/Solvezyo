import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Triangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * RightTriangleCalculator Component
 * 
 * Calculates all properties of a right triangle from known sides/angles
 */
export function RightTriangleCalculator() {
  const [sideA, setSideA] = useState<string>('3');
  const [sideB, setSideB] = useState<string>('4');
  const [hypotenuse, setHypotenuse] = useState<number>(0);
  const [angleA, setAngleA] = useState<number>(0);
  const [angleB, setAngleB] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [perimeter, setPerimeter] = useState<number>(0);
  const { toast } = useToast();

  // Calculate triangle properties when inputs change
  useEffect(() => {
    calculateTriangle();
  }, [sideA, sideB]);

  // Function to calculate triangle properties
  const calculateTriangle = () => {
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;

    if (a <= 0 || b <= 0) {
      setHypotenuse(0);
      setAngleA(0);
      setAngleB(0);
      setArea(0);
      setPerimeter(0);
      return;
    }

    // Calculate hypotenuse using Pythagorean theorem: c = √(a² + b²)
    const c = Math.sqrt(a * a + b * b);
    setHypotenuse(c);

    // Calculate angles using trigonometry
    // Angle A (opposite to side a): tan(A) = a/b
    const angleArad = Math.atan(a / b);
    const angleAdeg = (angleArad * 180) / Math.PI;
    setAngleA(angleAdeg);

    // Angle B (opposite to side b): tan(B) = b/a
    const angleBrad = Math.atan(b / a);
    const angleBdeg = (angleBrad * 180) / Math.PI;
    setAngleB(angleBdeg);

    // Calculate area: A = (1/2) * a * b
    const triangleArea = (a * b) / 2;
    setArea(triangleArea);

    // Calculate perimeter: P = a + b + c
    const p = a + b + c;
    setPerimeter(p);
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
    setSideA('3');
    setSideB('4');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Right Triangle Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate all properties of a right triangle from two sides
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Triangle className="mr-2 h-5 w-5" /> Triangle Legs
          </h2>
          
          <div className="space-y-4">
            {/* Side A */}
            <div>
              <Label htmlFor="sideA">Side a (First Leg)</Label>
              <Input
                id="sideA"
                type="number"
                step="any"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                placeholder="Enter first leg"
                className="mt-2"
              />
            </div>

            {/* Side B */}
            <div>
              <Label htmlFor="sideB">Side b (Second Leg)</Label>
              <Input
                id="sideB"
                type="number"
                step="any"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                placeholder="Enter second leg"
                className="mt-2"
              />
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
            <h2 className="text-xl font-semibold mb-4">Triangle Properties</h2>
            
            {/* Hypotenuse Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Hypotenuse (c)</h3>
                  <div className="text-4xl font-bold">
                    {hypotenuse.toFixed(6)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    c = √(a² + b²) = √({sideA}² + {sideB}²)
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(hypotenuse.toFixed(6), 'Hypotenuse')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Angle A */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Angle A (opposite to a)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {angleA.toFixed(2)}°
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(angleA * Math.PI / 180).toFixed(4)} radians
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(angleA.toFixed(2), 'Angle A')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Angle B */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Angle B (opposite to b)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {angleB.toFixed(2)}°
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(angleB * Math.PI / 180).toFixed(4)} radians
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(angleB.toFixed(2), 'Angle B')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Area */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Area</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {area.toFixed(4)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      A = (1/2) × a × b
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(area.toFixed(4), 'Area')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Perimeter */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Perimeter</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {perimeter.toFixed(4)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      P = a + b + c
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(perimeter.toFixed(4), 'Perimeter')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional Properties */}
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <h3 className="font-semibold mb-2">Trigonometric Ratios</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>sin(A) = {(parseFloat(sideA) / hypotenuse).toFixed(4)}</div>
                <div>sin(B) = {(parseFloat(sideB) / hypotenuse).toFixed(4)}</div>
                <div>cos(A) = {(parseFloat(sideB) / hypotenuse).toFixed(4)}</div>
                <div>cos(B) = {(parseFloat(sideA) / hypotenuse).toFixed(4)}</div>
                <div>tan(A) = {(parseFloat(sideA) / parseFloat(sideB)).toFixed(4)}</div>
                <div>tan(B) = {(parseFloat(sideB) / parseFloat(sideA)).toFixed(4)}</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Right Triangles</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Definition</h3>
              <p className="text-muted-foreground text-sm">
                A right triangle has one 90° angle. The side opposite to the right angle is called the hypotenuse, and the other two sides are called legs.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Key Properties</h3>
              <p className="text-muted-foreground text-sm">
                The sum of the two acute angles is always 90°. The Pythagorean theorem applies: a² + b² = c².
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in trigonometry, construction, navigation, physics, and engineering for calculating distances and angles.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RightTriangleCalculator;
