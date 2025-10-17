import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * DistanceCalculator Component
 * 
 * Calculates distance between two points in 2D or 3D space
 * 2D: d = √((x₂-x₁)² + (y₂-y₁)²)
 * 3D: d = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)
 */
export function DistanceCalculator() {
  const [dimension, setDimension] = useState<string>('2D');
  const [x1, setX1] = useState<string>('0');
  const [y1, setY1] = useState<string>('0');
  const [z1, setZ1] = useState<string>('0');
  const [x2, setX2] = useState<string>('3');
  const [y2, setY2] = useState<string>('4');
  const [z2, setZ2] = useState<string>('0');
  const [distance, setDistance] = useState<number>(0);
  const [midpoint, setMidpoint] = useState<string>('');
  const { toast } = useToast();

  // Calculate distance when inputs change
  useEffect(() => {
    calculateDistance();
  }, [x1, y1, z1, x2, y2, z2, dimension]);

  // Function to calculate distance
  const calculateDistance = () => {
    const x1Val = parseFloat(x1) || 0;
    const y1Val = parseFloat(y1) || 0;
    const z1Val = parseFloat(z1) || 0;
    const x2Val = parseFloat(x2) || 0;
    const y2Val = parseFloat(y2) || 0;
    const z2Val = parseFloat(z2) || 0;

    let dist: number;
    let mid: string;

    if (dimension === '2D') {
      // Calculate 2D distance: d = √((x₂-x₁)² + (y₂-y₁)²)
      dist = Math.sqrt(Math.pow(x2Val - x1Val, 2) + Math.pow(y2Val - y1Val, 2));
      
      // Calculate midpoint in 2D
      const midX = (x1Val + x2Val) / 2;
      const midY = (y1Val + y2Val) / 2;
      mid = `(${midX.toFixed(2)}, ${midY.toFixed(2)})`;
    } else {
      // Calculate 3D distance: d = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)
      dist = Math.sqrt(
        Math.pow(x2Val - x1Val, 2) + 
        Math.pow(y2Val - y1Val, 2) + 
        Math.pow(z2Val - z1Val, 2)
      );
      
      // Calculate midpoint in 3D
      const midX = (x1Val + x2Val) / 2;
      const midY = (y1Val + y2Val) / 2;
      const midZ = (z1Val + z2Val) / 2;
      mid = `(${midX.toFixed(2)}, ${midY.toFixed(2)}, ${midZ.toFixed(2)})`;
    }

    setDistance(dist);
    setMidpoint(mid);
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
    setX1('0');
    setY1('0');
    setZ1('0');
    setX2('3');
    setY2('4');
    setZ2('0');
    setDimension('2D');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Distance Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate distance between two points in 2D or 3D space
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Navigation className="mr-2 h-5 w-5" /> Coordinate Points
          </h2>
          
          <div className="space-y-4">
            {/* Dimension Selection */}
            <div>
              <Label htmlFor="dimension">Dimension</Label>
              <Select value={dimension} onValueChange={setDimension}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2D">2D (X, Y)</SelectItem>
                  <SelectItem value="3D">3D (X, Y, Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Point 1 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold mb-3">Point 1</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="x1">X₁</Label>
                  <Input
                    id="x1"
                    type="number"
                    step="any"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="y1">Y₁</Label>
                  <Input
                    id="y1"
                    type="number"
                    step="any"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                    className="mt-1"
                  />
                </div>
                {dimension === '3D' && (
                  <div>
                    <Label htmlFor="z1">Z₁</Label>
                    <Input
                      id="z1"
                      type="number"
                      step="any"
                      value={z1}
                      onChange={(e) => setZ1(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Point 2 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold mb-3">Point 2</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="x2">X₂</Label>
                  <Input
                    id="x2"
                    type="number"
                    step="any"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="y2">Y₂</Label>
                  <Input
                    id="y2"
                    type="number"
                    step="any"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                    className="mt-1"
                  />
                </div>
                {dimension === '3D' && (
                  <div>
                    <Label htmlFor="z2">Z₂</Label>
                    <Input
                      id="z2"
                      type="number"
                      step="any"
                      value={z2}
                      onChange={(e) => setZ2(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
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
            
            {/* Distance Display */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Distance</h3>
                  <div className="text-4xl font-bold">
                    {distance.toFixed(6)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {dimension} distance between the two points
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(distance.toFixed(6), 'Distance')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Midpoint */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Midpoint</h3>
                    <div className="mt-1 text-xl font-bold">
                      {midpoint}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Center point between coordinates
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(midpoint, 'Midpoint')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Components */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Distance Components</h3>
                <div className="text-sm space-y-1">
                  <div>ΔX = {Math.abs(parseFloat(x2) - parseFloat(x1)).toFixed(4)}</div>
                  <div>ΔY = {Math.abs(parseFloat(y2) - parseFloat(y1)).toFixed(4)}</div>
                  {dimension === '3D' && (
                    <div>ΔZ = {Math.abs(parseFloat(z2) - parseFloat(z1)).toFixed(4)}</div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Distance Calculation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Formula</h3>
              <p className="text-muted-foreground text-sm">
                2D: d = √((x₂-x₁)² + (y₂-y₁)²)<br/>
                3D: d = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Midpoint</h3>
              <p className="text-muted-foreground text-sm">
                The midpoint is calculated as the average of corresponding coordinates from both points.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in navigation, computer graphics, physics, engineering, and geometric analysis.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DistanceCalculator;
