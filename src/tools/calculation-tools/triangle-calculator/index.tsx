import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Triangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * TriangleCalculator Component
 * 
 * Calculates triangle properties including area, perimeter, and missing sides
 * using the law of cosines and Heron's formula
 */
export function TriangleCalculator() {
  const [sideA, setSideA] = useState<string>('3');
  const [sideB, setSideB] = useState<string>('4');
  const [sideC, setSideC] = useState<string>('5');
  const [area, setArea] = useState<number>(0);
  const [perimeter, setPerimeter] = useState<number>(0);
  const [angleA, setAngleA] = useState<number>(0);
  const [angleB, setAngleB] = useState<number>(0);
  const [angleC, setAngleC] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(true);
  
  const { toast } = useToast();

  // Calculate triangle properties
  useEffect(() => {
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;

    // Validate triangle inequality theorem: sum of any two sides must be greater than the third
    const valid = (a + b > c) && (a + c > b) && (b + c > a) && a > 0 && b > 0 && c > 0;
    setIsValid(valid);

    if (!valid) {
      setArea(0);
      setPerimeter(0);
      setAngleA(0);
      setAngleB(0);
      setAngleC(0);
      return;
    }

    // Calculate perimeter
    const p = a + b + c;
    setPerimeter(p);

    // Calculate area using Heron's formula
    // s = semi-perimeter
    const s = p / 2;
    // Area = sqrt(s * (s-a) * (s-b) * (s-c))
    const calculatedArea = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    setArea(calculatedArea);

    // Calculate angles using law of cosines
    // cos(A) = (b² + c² - a²) / (2bc)
    const cosA = (b * b + c * c - a * a) / (2 * b * c);
    const A = Math.acos(cosA) * (180 / Math.PI);
    setAngleA(A);

    // cos(B) = (a² + c² - b²) / (2ac)
    const cosB = (a * a + c * c - b * b) / (2 * a * c);
    const B = Math.acos(cosB) * (180 / Math.PI);
    setAngleB(B);

    // cos(C) = (a² + b² - c²) / (2ab)
    const cosC = (a * a + b * b - c * c) / (2 * a * b);
    const C = Math.acos(cosC) * (180 / Math.PI);
    setAngleC(C);
  }, [sideA, sideB, sideC]);

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
    setSideC('5');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Triangle Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate area, perimeter, and angles of a triangle from three sides
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Triangle className="mr-2 h-5 w-5" /> Triangle Sides
          </h2>
          
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="sideA">Side A</Label>
                <Input
                  id="sideA"
                  type="number"
                  min="0"
                  step="0.01"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                  placeholder="Enter side A"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="sideB">Side B</Label>
                <Input
                  id="sideB"
                  type="number"
                  min="0"
                  step="0.01"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                  placeholder="Enter side B"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="sideC">Side C</Label>
                <Input
                  id="sideC"
                  type="number"
                  min="0"
                  step="0.01"
                  value={sideC}
                  onChange={(e) => setSideC(e.target.value)}
                  placeholder="Enter side C"
                  className="mt-2"
                />
              </div>
            </div>

            {!isValid && (
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  ⚠️ Invalid triangle: The sum of any two sides must be greater than the third side.
                </p>
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Triangle Properties</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                {/* Area */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Area</h3>
                      <div className="text-3xl font-bold">
                        {area.toFixed(2)} sq units
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(area.toFixed(2), 'Area')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Perimeter */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Perimeter</h3>
                      <div className="text-3xl font-bold">
                        {perimeter.toFixed(2)} units
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(perimeter.toFixed(2), 'Perimeter')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Angle A */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Angle A (opposite to side a)</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {angleA.toFixed(2)}°
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(angleA.toFixed(2) + '°', 'Angle A')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Angle B */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Angle B (opposite to side b)</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {angleB.toFixed(2)}°
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(angleB.toFixed(2) + '°', 'Angle B')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Angle C */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Angle C (opposite to side c)</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {angleC.toFixed(2)}°
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(angleC.toFixed(2) + '°', 'Angle C')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Sum of Angles */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Sum of Angles</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {(angleA + angleB + angleC).toFixed(2)}°
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard((angleA + angleB + angleC).toFixed(2) + '°', 'Sum of Angles')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Triangle Calculations</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Heron's Formula</h3>
              <p className="text-muted-foreground text-sm">
                Area is calculated using Heron's formula: A = √(s(s-a)(s-b)(s-c)) where s is the semi-perimeter.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Law of Cosines</h3>
              <p className="text-muted-foreground text-sm">
                Angles are calculated using the law of cosines to find each angle from the three known sides.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Triangle Inequality</h3>
              <p className="text-muted-foreground text-sm">
                A valid triangle requires the sum of any two sides to be greater than the third side.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TriangleCalculator;
