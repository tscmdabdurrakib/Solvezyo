import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * TireSizeCalculator Component
 * 
 * Calculates tire dimensions and compares different tire sizes
 */
export function TireSizeCalculator() {
  // Tire 1 (original)
  const [width1, setWidth1] = useState<string>('225');
  const [aspectRatio1, setAspectRatio1] = useState<string>('45');
  const [rimDiameter1, setRimDiameter1] = useState<string>('17');

  // Tire 2 (new)
  const [width2, setWidth2] = useState<string>('235');
  const [aspectRatio2, setAspectRatio2] = useState<string>('40');
  const [rimDiameter2, setRimDiameter2] = useState<string>('18');

  // Results
  const [diameter1, setDiameter1] = useState<number>(0);
  const [diameter2, setDiameter2] = useState<number>(0);
  const [circumference1, setCircumference1] = useState<number>(0);
  const [circumference2, setCircumference2] = useState<number>(0);
  const [sidewall1, setSidewall1] = useState<number>(0);
  const [sidewall2, setSidewall2] = useState<number>(0);
  const [diameterDiff, setDiameterDiff] = useState<number>(0);
  const [speedometerDiff, setSpeedometerDiff] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    calculateTireSpecs();
  }, [width1, aspectRatio1, rimDiameter1, width2, aspectRatio2, rimDiameter2]);

  const calculateTireSpecs = () => {
    const w1 = parseFloat(width1) || 0;
    const ar1 = parseFloat(aspectRatio1) || 0;
    const rd1 = parseFloat(rimDiameter1) || 0;

    const w2 = parseFloat(width2) || 0;
    const ar2 = parseFloat(aspectRatio2) || 0;
    const rd2 = parseFloat(rimDiameter2) || 0;

    // Calculate sidewall height (mm) = width * aspectRatio / 100
    const sw1 = (w1 * ar1) / 100;
    const sw2 = (w2 * ar2) / 100;
    setSidewall1(sw1);
    setSidewall2(sw2);

    // Calculate overall diameter (inches) = rim diameter + (2 * sidewall in inches)
    const d1 = rd1 + (2 * sw1 / 25.4); // Convert mm to inches
    const d2 = rd2 + (2 * sw2 / 25.4);
    setDiameter1(d1);
    setDiameter2(d2);

    // Calculate circumference (inches) = π * diameter
    const c1 = Math.PI * d1;
    const c2 = Math.PI * d2;
    setCircumference1(c1);
    setCircumference2(c2);

    // Calculate differences
    const dDiff = ((d2 - d1) / d1) * 100;
    setDiameterDiff(dDiff);

    // Speedometer difference: if tire is larger, speedometer reads slower
    const speedDiff = ((c2 - c1) / c1) * 100;
    setSpeedometerDiff(speedDiff);
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Tire Size Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Compare tire sizes and calculate dimensions for proper fitment
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Original Tire */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Original Tire Size</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="width1">Tire Width (mm)</Label>
              <Input
                id="width1"
                type="number"
                value={width1}
                onChange={(e) => setWidth1(e.target.value)}
                placeholder="225"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="aspectRatio1">Aspect Ratio (%)</Label>
              <Input
                id="aspectRatio1"
                type="number"
                value={aspectRatio1}
                onChange={(e) => setAspectRatio1(e.target.value)}
                placeholder="45"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="rimDiameter1">Rim Diameter (inches)</Label>
              <Input
                id="rimDiameter1"
                type="number"
                value={rimDiameter1}
                onChange={(e) => setRimDiameter1(e.target.value)}
                placeholder="17"
                className="mt-2"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sidewall Height:</span>
                <span className="font-medium">{sidewall1.toFixed(1)} mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Overall Diameter:</span>
                <span className="font-medium">{diameter1.toFixed(2)} in</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Circumference:</span>
                <span className="font-medium">{circumference1.toFixed(2)} in</span>
              </div>
            </div>
          </div>
        </Card>

        {/* New Tire */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">New Tire Size</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="width2">Tire Width (mm)</Label>
              <Input
                id="width2"
                type="number"
                value={width2}
                onChange={(e) => setWidth2(e.target.value)}
                placeholder="235"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="aspectRatio2">Aspect Ratio (%)</Label>
              <Input
                id="aspectRatio2"
                type="number"
                value={aspectRatio2}
                onChange={(e) => setAspectRatio2(e.target.value)}
                placeholder="40"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="rimDiameter2">Rim Diameter (inches)</Label>
              <Input
                id="rimDiameter2"
                type="number"
                value={rimDiameter2}
                onChange={(e) => setRimDiameter2(e.target.value)}
                placeholder="18"
                className="mt-2"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sidewall Height:</span>
                <span className="font-medium">{sidewall2.toFixed(1)} mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Overall Diameter:</span>
                <span className="font-medium">{diameter2.toFixed(2)} in</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Circumference:</span>
                <span className="font-medium">{circumference2.toFixed(2)} in</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Comparison Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Comparison Results</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Diameter Difference</h3>
                  <div className="text-2xl font-bold">
                    {diameterDiff > 0 ? '+' : ''}{diameterDiff.toFixed(2)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.abs(diameter2 - diameter1).toFixed(2)} inches {diameter2 > diameter1 ? 'larger' : 'smaller'}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(`${diameterDiff.toFixed(2)}%`, 'Diameter Difference')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Speedometer Effect</h3>
                  <div className="text-2xl font-bold">
                    {speedometerDiff > 0 ? '+' : ''}{speedometerDiff.toFixed(2)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    At 60 mph, actual speed: {(60 * (1 + speedometerDiff / 100)).toFixed(1)} mph
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(`${speedometerDiff.toFixed(2)}%`, 'Speedometer Effect')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {Math.abs(diameterDiff) > 3 && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Warning</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                    Diameter difference exceeds 3%. This may affect vehicle handling, speedometer accuracy, and could void warranties.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Information */}
      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">How to Read Tire Sizes</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">Width</h3>
            <p className="text-muted-foreground text-sm">
              The first number (e.g., 225) represents the tire width in millimeters from sidewall to sidewall.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Aspect Ratio</h3>
            <p className="text-muted-foreground text-sm">
              The second number (e.g., 45) is the sidewall height as a percentage of the width.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Rim Diameter</h3>
            <p className="text-muted-foreground text-sm">
              The third number (e.g., 17) indicates the wheel diameter in inches that the tire fits.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TireSizeCalculator;
