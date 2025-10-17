import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Triangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PythagoreanTheoremCalculator Component
 * 
 * Calculates missing side of right triangle using Pythagorean theorem
 * a² + b² = c²
 */
export function PythagoreanTheoremCalculator() {
  const [sideA, setSideA] = useState<string>('3');
  const [sideB, setSideB] = useState<string>('4');
  const [sideC, setSideC] = useState<string>('');
  const [calculateFor, setCalculateFor] = useState<string>('c');
  const [result, setResult] = useState<number>(0);
  const { toast } = useToast();

  // Calculate when inputs change
  useEffect(() => {
    calculatePythagorean();
  }, [sideA, sideB, sideC, calculateFor]);

  // Function to calculate using Pythagorean theorem
  const calculatePythagorean = () => {
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;

    let res = 0;

    if (calculateFor === 'c') {
      // Calculate hypotenuse: c = √(a² + b²)
      res = Math.sqrt(a * a + b * b);
    } else if (calculateFor === 'a') {
      // Calculate leg a: a = √(c² - b²)
      if (c > b) {
        res = Math.sqrt(c * c - b * b);
      }
    } else if (calculateFor === 'b') {
      // Calculate leg b: b = √(c² - a²)
      if (c > a) {
        res = Math.sqrt(c * c - a * a);
      }
    }

    setResult(res);
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
    setSideC('');
    setCalculateFor('c');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pythagorean Theorem Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Find missing side of a right triangle using a² + b² = c²
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Triangle className="mr-2 h-5 w-5" /> Triangle Sides
          </h2>
          
          <div className="space-y-4">
            {/* Calculate For Selection */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <Label className="mb-3 block">Calculate Missing Side:</Label>
              <div className="flex gap-4">
                <Button
                  variant={calculateFor === 'c' ? 'default' : 'outline'}
                  onClick={() => setCalculateFor('c')}
                  className="flex-1"
                >
                  Hypotenuse (c)
                </Button>
                <Button
                  variant={calculateFor === 'a' ? 'default' : 'outline'}
                  onClick={() => setCalculateFor('a')}
                  className="flex-1"
                >
                  Side a
                </Button>
                <Button
                  variant={calculateFor === 'b' ? 'default' : 'outline'}
                  onClick={() => setCalculateFor('b')}
                  className="flex-1"
                >
                  Side b
                </Button>
              </div>
            </div>

            {/* Side A */}
            {calculateFor !== 'a' && (
              <div>
                <Label htmlFor="sideA">Side a (leg)</Label>
                <Input
                  id="sideA"
                  type="number"
                  step="any"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                  placeholder="Enter side a"
                  className="mt-2"
                />
              </div>
            )}

            {/* Side B */}
            {calculateFor !== 'b' && (
              <div>
                <Label htmlFor="sideB">Side b (leg)</Label>
                <Input
                  id="sideB"
                  type="number"
                  step="any"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                  placeholder="Enter side b"
                  className="mt-2"
                />
              </div>
            )}

            {/* Side C */}
            {calculateFor !== 'c' && (
              <div>
                <Label htmlFor="sideC">Side c (hypotenuse)</Label>
                <Input
                  id="sideC"
                  type="number"
                  step="any"
                  value={sideC}
                  onChange={(e) => setSideC(e.target.value)}
                  placeholder="Enter side c"
                  className="mt-2"
                />
              </div>
            )}

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
            
            {/* Result Display */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Side {calculateFor.toUpperCase()}
                  </h3>
                  <div className="text-4xl font-bold">
                    {result.toFixed(6)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {calculateFor === 'c' ? 
                      `√(${sideA}² + ${sideB}²) = ${result.toFixed(4)}` :
                      calculateFor === 'a' ?
                      `√(${sideC}² - ${sideB}²) = ${result.toFixed(4)}` :
                      `√(${sideC}² - ${sideA}²) = ${result.toFixed(4)}`
                    }
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(result.toFixed(6), `Side ${calculateFor}`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Triangle Properties */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Side a</h3>
                <div className="mt-1 text-2xl font-bold">
                  {calculateFor === 'a' ? result.toFixed(4) : sideA}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Side b</h3>
                <div className="mt-1 text-2xl font-bold">
                  {calculateFor === 'b' ? result.toFixed(4) : sideB}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Hypotenuse c</h3>
                <div className="mt-1 text-2xl font-bold">
                  {calculateFor === 'c' ? result.toFixed(4) : sideC}
                </div>
              </div>
            </div>

            {/* Verification */}
            {result > 0 && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <h3 className="font-semibold mb-2">Verification</h3>
                <div className="text-sm">
                  {calculateFor === 'c' ? (
                    <p>{sideA}² + {sideB}² = {(parseFloat(sideA) ** 2).toFixed(2)} + {(parseFloat(sideB) ** 2).toFixed(2)} = {(parseFloat(sideA) ** 2 + parseFloat(sideB) ** 2).toFixed(2)}</p>
                  ) : calculateFor === 'a' ? (
                    <p>{result.toFixed(4)}² + {sideB}² = {(result ** 2).toFixed(2)} + {(parseFloat(sideB) ** 2).toFixed(2)} ≈ {sideC}² = {(parseFloat(sideC) ** 2).toFixed(2)}</p>
                  ) : (
                    <p>{sideA}² + {result.toFixed(4)}² = {(parseFloat(sideA) ** 2).toFixed(2)} + {(result ** 2).toFixed(2)} ≈ {sideC}² = {(parseFloat(sideC) ** 2).toFixed(2)}</p>
                  )}
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Pythagorean Theorem</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">The Theorem</h3>
              <p className="text-muted-foreground text-sm">
                In a right triangle, the square of the hypotenuse (c) equals the sum of squares of the other two sides: a² + b² = c²
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Named After</h3>
              <p className="text-muted-foreground text-sm">
                Pythagoras, ancient Greek mathematician, though the theorem was known to earlier civilizations including Babylonians and Indians.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in construction, navigation, computer graphics, physics, engineering, and anywhere right triangles appear.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PythagoreanTheoremCalculator;
