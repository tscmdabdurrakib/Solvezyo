import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * AreaCalculator Component
 * 
 * Calculates area for various geometric shapes
 */
export function AreaCalculator() {
  const [shape, setShape] = useState<string>('rectangle');
  const [dimension1, setDimension1] = useState<string>('10');
  const [dimension2, setDimension2] = useState<string>('5');
  const [dimension3, setDimension3] = useState<string>('3');
  const [area, setArea] = useState<number>(0);
  const [perimeter, setPerimeter] = useState<number>(0);
  const { toast } = useToast();

  // Calculate area when inputs change
  useEffect(() => {
    calculateArea();
  }, [shape, dimension1, dimension2, dimension3]);

  // Function to calculate area based on shape
  const calculateArea = () => {
    const d1 = parseFloat(dimension1) || 0;
    const d2 = parseFloat(dimension2) || 0;
    const d3 = parseFloat(dimension3) || 0;

    let calculatedArea = 0;
    let calculatedPerimeter = 0;

    switch (shape) {
      case 'rectangle':
        // Area = length × width
        calculatedArea = d1 * d2;
        calculatedPerimeter = 2 * (d1 + d2);
        break;
      
      case 'square':
        // Area = side²
        calculatedArea = d1 * d1;
        calculatedPerimeter = 4 * d1;
        break;
      
      case 'circle':
        // Area = πr²
        calculatedArea = Math.PI * d1 * d1;
        // Circumference = 2πr
        calculatedPerimeter = 2 * Math.PI * d1;
        break;
      
      case 'triangle':
        // Area = (base × height) / 2
        calculatedArea = (d1 * d2) / 2;
        // For perimeter, we need all three sides
        calculatedPerimeter = d1 + d2 + d3;
        break;
      
      case 'trapezoid':
        // Area = ((base1 + base2) × height) / 2
        calculatedArea = ((d1 + d2) * d3) / 2;
        break;
      
      case 'parallelogram':
        // Area = base × height
        calculatedArea = d1 * d2;
        break;
      
      case 'ellipse':
        // Area = π × a × b (where a and b are semi-major and semi-minor axes)
        calculatedArea = Math.PI * d1 * d2;
        break;
      
      case 'rhombus':
        // Area = (diagonal1 × diagonal2) / 2
        calculatedArea = (d1 * d2) / 2;
        break;
      
      default:
        calculatedArea = 0;
    }

    setArea(calculatedArea);
    setPerimeter(calculatedPerimeter);
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
    setDimension1('10');
    setDimension2('5');
    setDimension3('3');
  };

  // Get dimension labels based on shape
  const getDimensionLabels = () => {
    switch (shape) {
      case 'rectangle':
        return { d1: 'Length', d2: 'Width', d3: null };
      case 'square':
        return { d1: 'Side Length', d2: null, d3: null };
      case 'circle':
        return { d1: 'Radius', d2: null, d3: null };
      case 'triangle':
        return { d1: 'Base', d2: 'Height', d3: 'Third Side' };
      case 'trapezoid':
        return { d1: 'Base 1', d2: 'Base 2', d3: 'Height' };
      case 'parallelogram':
        return { d1: 'Base', d2: 'Height', d3: null };
      case 'ellipse':
        return { d1: 'Semi-major Axis', d2: 'Semi-minor Axis', d3: null };
      case 'rhombus':
        return { d1: 'Diagonal 1', d2: 'Diagonal 2', d3: null };
      default:
        return { d1: 'Dimension 1', d2: 'Dimension 2', d3: 'Dimension 3' };
    }
  };

  const labels = getDimensionLabels();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Area Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate area and perimeter for various geometric shapes
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Square className="mr-2 h-5 w-5" /> Shape Selection
          </h2>
          
          <div className="space-y-4">
            {/* Shape Selector */}
            <div>
              <Label htmlFor="shape">Select Shape</Label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangle">Rectangle</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                  <SelectItem value="trapezoid">Trapezoid</SelectItem>
                  <SelectItem value="parallelogram">Parallelogram</SelectItem>
                  <SelectItem value="ellipse">Ellipse</SelectItem>
                  <SelectItem value="rhombus">Rhombus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dimension 1 */}
            {labels.d1 && (
              <div>
                <Label htmlFor="dimension1">{labels.d1}</Label>
                <Input
                  id="dimension1"
                  type="number"
                  value={dimension1}
                  onChange={(e) => setDimension1(e.target.value)}
                  placeholder={`Enter ${labels.d1.toLowerCase()}`}
                  className="mt-2"
                  min="0"
                  step="any"
                />
              </div>
            )}

            {/* Dimension 2 */}
            {labels.d2 && (
              <div>
                <Label htmlFor="dimension2">{labels.d2}</Label>
                <Input
                  id="dimension2"
                  type="number"
                  value={dimension2}
                  onChange={(e) => setDimension2(e.target.value)}
                  placeholder={`Enter ${labels.d2.toLowerCase()}`}
                  className="mt-2"
                  min="0"
                  step="any"
                />
              </div>
            )}

            {/* Dimension 3 */}
            {labels.d3 && (
              <div>
                <Label htmlFor="dimension3">{labels.d3}</Label>
                <Input
                  id="dimension3"
                  type="number"
                  value={dimension3}
                  onChange={(e) => setDimension3(e.target.value)}
                  placeholder={`Enter ${labels.d3.toLowerCase()}`}
                  className="mt-2"
                  min="0"
                  step="any"
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
            
            {/* Primary Result - Area */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Area</h3>
                  <div className="text-4xl font-bold">
                    {area.toFixed(6)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    square units
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

            <div className="grid gap-4 md:grid-cols-2">
              {/* Perimeter/Circumference */}
              {(shape === 'rectangle' || shape === 'square' || shape === 'circle' || shape === 'triangle') && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {shape === 'circle' ? 'Circumference' : 'Perimeter'}
                      </h3>
                      <div className="mt-1 text-2xl font-bold">
                        {perimeter.toFixed(6)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        linear units
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(perimeter.toFixed(6), shape === 'circle' ? 'Circumference' : 'Perimeter')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Diameter (for circle) */}
              {shape === 'circle' && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Diameter</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {(parseFloat(dimension1) * 2).toFixed(6)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        2 × radius
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard((parseFloat(dimension1) * 2).toFixed(6), 'Diameter')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Shape Type Display */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Shape</h3>
                    <div className="mt-1 text-2xl font-bold capitalize">
                      {shape}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Selected geometric shape
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Area Formulas</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Basic Shapes</h3>
              <p className="text-muted-foreground text-sm">
                Rectangle: length × width<br/>
                Square: side²<br/>
                Circle: πr²<br/>
                Triangle: (base × height) / 2
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Quadrilaterals</h3>
              <p className="text-muted-foreground text-sm">
                Trapezoid: ((base₁ + base₂) × height) / 2<br/>
                Parallelogram: base × height<br/>
                Rhombus: (diagonal₁ × diagonal₂) / 2
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in construction, land surveying, flooring projects, painting, landscaping, and engineering calculations.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AreaCalculator;
