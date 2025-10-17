import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * SurfaceAreaCalculator Component
 * 
 * Calculates surface area for various 3D shapes
 */
export function SurfaceAreaCalculator() {
  const [shape, setShape] = useState<string>('cube');
  const [side, setSide] = useState<string>('5');
  const [length, setLength] = useState<string>('5');
  const [width, setWidth] = useState<string>('4');
  const [height, setHeight] = useState<string>('3');
  const [radius, setRadius] = useState<string>('5');
  const [surfaceArea, setSurfaceArea] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const { toast } = useToast();

  // Calculate surface area when inputs change
  useEffect(() => {
    calculateSurfaceArea();
  }, [shape, side, length, width, height, radius]);

  // Function to calculate surface area
  const calculateSurfaceArea = () => {
    let sa = 0;
    let vol = 0;

    switch (shape) {
      case 'cube':
        // Surface Area = 6a²
        const a = parseFloat(side) || 0;
        sa = 6 * a * a;
        vol = a * a * a;
        break;

      case 'rectangular':
        // Surface Area = 2(lw + lh + wh)
        const l = parseFloat(length) || 0;
        const w = parseFloat(width) || 0;
        const h = parseFloat(height) || 0;
        sa = 2 * (l * w + l * h + w * h);
        vol = l * w * h;
        break;

      case 'sphere':
        // Surface Area = 4πr²
        const r = parseFloat(radius) || 0;
        sa = 4 * Math.PI * r * r;
        vol = (4 / 3) * Math.PI * r * r * r;
        break;

      case 'cylinder':
        // Surface Area = 2πr(r + h)
        const rc = parseFloat(radius) || 0;
        const hc = parseFloat(height) || 0;
        sa = 2 * Math.PI * rc * (rc + hc);
        vol = Math.PI * rc * rc * hc;
        break;

      case 'cone':
        // Surface Area = πr(r + √(h² + r²))
        const rco = parseFloat(radius) || 0;
        const hco = parseFloat(height) || 0;
        const slant = Math.sqrt(hco * hco + rco * rco);
        sa = Math.PI * rco * (rco + slant);
        vol = (1 / 3) * Math.PI * rco * rco * hco;
        break;

      default:
        sa = 0;
        vol = 0;
    }

    setSurfaceArea(sa);
    setVolume(vol);
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
    setSide('5');
    setLength('5');
    setWidth('4');
    setHeight('3');
    setRadius('5');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Surface Area Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate surface area and volume for 3D shapes
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Box className="mr-2 h-5 w-5" /> Shape Parameters
          </h2>
          
          <div className="space-y-4">
            {/* Shape Selection */}
            <div>
              <Label htmlFor="shape">Shape</Label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cube">Cube</SelectItem>
                  <SelectItem value="rectangular">Rectangular Prism</SelectItem>
                  <SelectItem value="sphere">Sphere</SelectItem>
                  <SelectItem value="cylinder">Cylinder</SelectItem>
                  <SelectItem value="cone">Cone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cube Inputs */}
            {shape === 'cube' && (
              <div>
                <Label htmlFor="side">Side Length (a)</Label>
                <Input
                  id="side"
                  type="number"
                  step="any"
                  value={side}
                  onChange={(e) => setSide(e.target.value)}
                  placeholder="Enter side length"
                  className="mt-2"
                />
              </div>
            )}

            {/* Rectangular Prism Inputs */}
            {shape === 'rectangular' && (
              <>
                <div>
                  <Label htmlFor="length">Length (l)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="any"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="width">Width (w)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="any"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (h)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="any"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </>
            )}

            {/* Sphere Inputs */}
            {shape === 'sphere' && (
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
            )}

            {/* Cylinder Inputs */}
            {shape === 'cylinder' && (
              <>
                <div>
                  <Label htmlFor="radius">Radius (r)</Label>
                  <Input
                    id="radius"
                    type="number"
                    step="any"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (h)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="any"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </>
            )}

            {/* Cone Inputs */}
            {shape === 'cone' && (
              <>
                <div>
                  <Label htmlFor="radius">Radius (r)</Label>
                  <Input
                    id="radius"
                    type="number"
                    step="any"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (h)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="any"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </>
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
            
            <div className="grid gap-4 md:grid-cols-2">
              {/* Surface Area */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Surface Area</h3>
                    <div className="text-3xl font-bold">
                      {surfaceArea.toFixed(4)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      square units
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(surfaceArea.toFixed(4), 'Surface Area')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Volume */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Volume</h3>
                    <div className="text-3xl font-bold">
                      {volume.toFixed(4)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      cubic units
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(volume.toFixed(4), 'Volume')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Surface Area Formulas</h2>
          
          <div className="grid gap-4 text-sm">
            <div className="p-3 bg-muted/50 rounded">
              <strong>Cube:</strong> SA = 6a²
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <strong>Rectangular Prism:</strong> SA = 2(lw + lh + wh)
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <strong>Sphere:</strong> SA = 4πr²
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <strong>Cylinder:</strong> SA = 2πr(r + h)
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <strong>Cone:</strong> SA = πr(r + √(h² + r²))
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SurfaceAreaCalculator;
