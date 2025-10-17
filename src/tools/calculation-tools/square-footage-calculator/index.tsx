import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Ruler, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * SquareFootageCalculator Component
 * 
 * Calculate square footage for various room shapes
 */
export function SquareFootageCalculator() {
  const { toast } = useToast();

  // State for shape selection
  const [shape, setShape] = useState<string>('rectangle');
  
  // State for rectangle
  const [length, setLength] = useState<number>(20);
  const [width, setWidth] = useState<number>(15);
  
  // State for circle
  const [radius, setRadius] = useState<number>(10);
  
  // State for triangle
  const [base, setBase] = useState<number>(15);
  const [height, setHeight] = useState<number>(20);
  
  // State for results
  const [squareFeet, setSquareFeet] = useState<number>(0);
  const [squareMeters, setSquareMeters] = useState<number>(0);
  const [squareYards, setSquareYards] = useState<number>(0);
  const [acres, setAcres] = useState<number>(0);

  // Calculate square footage when inputs change
  useEffect(() => {
    calculateSquareFootage();
  }, [shape, length, width, radius, base, height]);

  // Function to calculate square footage based on shape
  const calculateSquareFootage = () => {
    let sqFt = 0;

    switch (shape) {
      case 'rectangle':
        sqFt = length * width;
        break;
      case 'circle':
        sqFt = Math.PI * radius * radius;
        break;
      case 'triangle':
        sqFt = (base * height) / 2;
        break;
    }

    setSquareFeet(sqFt);
    setSquareMeters(sqFt * 0.092903); // 1 sq ft = 0.092903 sq m
    setSquareYards(sqFt / 9); // 9 sq ft = 1 sq yd
    setAcres(sqFt / 43560); // 43,560 sq ft = 1 acre
  };

  // Function to reset values
  const handleReset = () => {
    setLength(20);
    setWidth(15);
    setRadius(10);
    setBase(15);
    setHeight(20);
    setShape('rectangle');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Square Footage Calculation:
Shape: ${shape.charAt(0).toUpperCase() + shape.slice(1)}
Square Feet: ${squareFeet.toFixed(2)} sq ft
Square Meters: ${squareMeters.toFixed(2)} sq m
Square Yards: ${squareYards.toFixed(2)} sq yd
Acres: ${acres.toFixed(4)} acres`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Square footage copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Square Footage Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the square footage of different room shapes
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Ruler className="mr-2 h-5 w-5" /> Measurements
          </h2>
          
          <div className="space-y-6">
            {/* Shape Selection */}
            <div>
              <Label htmlFor="shape">Room Shape</Label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangle">Rectangle / Square</SelectItem>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Shape-specific inputs */}
            {shape === 'rectangle' && (
              <>
                <div>
                  <Label htmlFor="length">Length (feet)</Label>
                  <div className="relative mt-1.5">
                    <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="length"
                      type="number"
                      step="0.1"
                      className="pl-10"
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="width">Width (feet)</Label>
                  <div className="relative mt-1.5">
                    <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="width"
                      type="number"
                      step="0.1"
                      className="pl-10"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                    />
                  </div>
                </div>
              </>
            )}

            {shape === 'circle' && (
              <div>
                <Label htmlFor="radius">Radius (feet)</Label>
                <div className="relative mt-1.5">
                  <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="radius"
                    type="number"
                    step="0.1"
                    className="pl-10"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Radius is the distance from center to edge
                </p>
              </div>
            )}

            {shape === 'triangle' && (
              <>
                <div>
                  <Label htmlFor="base">Base (feet)</Label>
                  <div className="relative mt-1.5">
                    <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="base"
                      type="number"
                      step="0.1"
                      className="pl-10"
                      value={base}
                      onChange={(e) => setBase(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="height">Height (feet)</Label>
                  <div className="relative mt-1.5">
                    <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      className="pl-10"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Height is perpendicular to the base
                  </p>
                </div>
              </>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Square className="mr-2 h-5 w-5" /> Area Results
                  </h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Square Footage
                    </h3>
                    <div className="mt-2 text-5xl font-bold text-blue-600 dark:text-blue-400">
                      {squareFeet.toFixed(2)}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      square feet
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Square Meters</h3>
                      <div className="mt-1 text-2xl font-bold">{squareMeters.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">sq m</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Square Yards</h3>
                      <div className="mt-1 text-2xl font-bold">{squareYards.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">sq yd</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Acres</h3>
                    <div className="mt-1 text-3xl font-bold text-green-600 dark:text-green-400">
                      {acres.toFixed(4)}
                    </div>
                  </div>

                  {/* Common Applications */}
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-3">
                      Estimated Materials
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Paint (2 coats):</span>
                        <span className="font-bold">~{(squareFeet / 350).toFixed(1)} gallons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carpet:</span>
                        <span className="font-bold">{squareYards.toFixed(0)} sq yd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tile (with waste):</span>
                        <span className="font-bold">~{(squareFeet * 1.1).toFixed(0)} sq ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Quick Reference</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • 1 square yard = 9 square feet
              </p>
              <p>
                • 1 acre = 43,560 square feet
              </p>
              <p>
                • 1 square meter = 10.764 square feet
              </p>
              <p>
                • Add 10% for waste when ordering materials
              </p>
              <p>
                • 1 gallon of paint covers ~350 sq ft
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SquareFootageCalculator;
