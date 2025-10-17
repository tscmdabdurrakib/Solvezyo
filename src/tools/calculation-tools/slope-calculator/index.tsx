import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * SlopeCalculator Component
 * 
 * Calculates slope, distance, and angle between two points
 * Slope formula: m = (y₂ - y₁) / (x₂ - x₁)
 * Distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]
 */
export function SlopeCalculator() {
  const [x1, setX1] = useState<string>('0');
  const [y1, setY1] = useState<string>('0');
  const [x2, setX2] = useState<string>('4');
  const [y2, setY2] = useState<string>('3');
  const [slope, setSlope] = useState<string>('');
  const [distance, setDistance] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);
  const [midpoint, setMidpoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [equation, setEquation] = useState<string>('');
  const [slopeType, setSlopeType] = useState<string>('');
  const { toast } = useToast();

  // Calculate slope when inputs change
  useEffect(() => {
    calculateSlope();
  }, [x1, y1, x2, y2]);

  // Function to calculate slope and related values
  const calculateSlope = () => {
    const x1Val = parseFloat(x1) || 0;
    const y1Val = parseFloat(y1) || 0;
    const x2Val = parseFloat(x2) || 0;
    const y2Val = parseFloat(y2) || 0;

    const deltaX = x2Val - x1Val;
    const deltaY = y2Val - y1Val;

    // Calculate slope: m = (y₂ - y₁) / (x₂ - x₁)
    if (deltaX === 0) {
      if (deltaY === 0) {
        setSlope('Undefined (same point)');
        setSlopeType('Same point');
      } else {
        setSlope('Undefined (vertical line)');
        setSlopeType('Vertical line');
        setEquation(`x = ${x1Val}`);
      }
      setAngle(90);
    } else {
      const m = deltaY / deltaX;
      setSlope(m.toFixed(6));
      
      // Determine slope type
      if (m === 0) {
        setSlopeType('Horizontal line');
        setEquation(`y = ${y1Val}`);
      } else if (m > 0) {
        setSlopeType('Positive slope (rising)');
      } else {
        setSlopeType('Negative slope (falling)');
      }

      // Calculate angle in degrees: θ = arctan(m)
      const angleRad = Math.atan(m);
      const angleDeg = (angleRad * 180) / Math.PI;
      setAngle(angleDeg);

      // Calculate equation in slope-intercept form: y = mx + b
      const b = y1Val - m * x1Val;
      if (m !== 0) {
        setEquation(`y = ${m.toFixed(4)}x ${b >= 0 ? '+' : ''} ${b.toFixed(4)}`);
      }
    }

    // Calculate distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    setDistance(dist);

    // Calculate midpoint: ((x₁ + x₂) / 2, (y₁ + y₂) / 2)
    const midX = (x1Val + x2Val) / 2;
    const midY = (y1Val + y2Val) / 2;
    setMidpoint({ x: midX, y: midY });
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
    setX2('4');
    setY2('3');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Slope Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate slope, distance, angle, and line equation between two points
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> Point Coordinates
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Point 1 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-medium">Point 1 (x₁, y₁)</h3>
              <div>
                <Label htmlFor="x1">x₁ coordinate</Label>
                <Input
                  id="x1"
                  type="number"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  placeholder="Enter x₁"
                  className="mt-2"
                  step="any"
                />
              </div>
              <div>
                <Label htmlFor="y1">y₁ coordinate</Label>
                <Input
                  id="y1"
                  type="number"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  placeholder="Enter y₁"
                  className="mt-2"
                  step="any"
                />
              </div>
            </div>

            {/* Point 2 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-medium">Point 2 (x₂, y₂)</h3>
              <div>
                <Label htmlFor="x2">x₂ coordinate</Label>
                <Input
                  id="x2"
                  type="number"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  placeholder="Enter x₂"
                  className="mt-2"
                  step="any"
                />
              </div>
              <div>
                <Label htmlFor="y2">y₂ coordinate</Label>
                <Input
                  id="y2"
                  type="number"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  placeholder="Enter y₂"
                  className="mt-2"
                  step="any"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            {/* Primary Result - Slope */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Slope (m)</h3>
                  <div className="text-4xl font-bold">
                    {slope || 'N/A'}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {slopeType}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(slope, 'Slope')}
                  disabled={!slope}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Distance */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Distance</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {distance.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Between the two points
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

              {/* Angle */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Angle</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {angle.toFixed(4)}°
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Angle with horizontal axis
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${angle.toFixed(4)}°`, 'Angle')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Midpoint */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Midpoint</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ({midpoint.x.toFixed(4)}, {midpoint.y.toFixed(4)})
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Center point of line segment
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`(${midpoint.x.toFixed(4)}, ${midpoint.y.toFixed(4)})`, 'Midpoint')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Line Equation */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Line Equation</h3>
                    <div className="mt-1 text-xl font-bold">
                      {equation || 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Slope-intercept form
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(equation, 'Line Equation')}
                    disabled={!equation}
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
          <h2 className="text-xl font-semibold mb-4">About Slope Calculation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Slope Formula</h3>
              <p className="text-muted-foreground text-sm">
                The slope m = (y₂ - y₁) / (x₂ - x₁) measures the steepness and direction of a line. Positive slope rises, negative slope falls.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Distance Formula</h3>
              <p className="text-muted-foreground text-sm">
                The distance d = √[(x₂ - x₁)² + (y₂ - y₁)²] calculates the straight-line distance between two points using the Pythagorean theorem.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in construction for determining roof pitch, roads and ramps grading, surveying terrain, and graphing linear equations.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SlopeCalculator;
