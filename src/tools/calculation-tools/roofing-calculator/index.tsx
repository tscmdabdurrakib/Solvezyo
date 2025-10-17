import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * RoofingCalculator Component
 * 
 * Calculates roofing materials needed based on roof dimensions
 */
export function RoofingCalculator() {
  const [length, setLength] = useState<string>('40');
  const [width, setWidth] = useState<string>('30');
  const [pitch, setPitch] = useState<string>('6'); // Roof pitch (rise per 12" run)
  const [wastePercentage, setWastePercentage] = useState<string>('10');
  
  // Results
  const [roofArea, setRoofArea] = useState<number>(0);
  const [squares, setSquares] = useState<number>(0);
  const [bundles, setBundles] = useState<number>(0);
  const [wastage, setWastage] = useState<number>(0);
  const [totalArea, setTotalArea] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    calculateRoofing();
  }, [length, width, pitch, wastePercentage]);

  const calculateRoofing = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const p = parseFloat(pitch) || 0;
    const waste = parseFloat(wastePercentage) || 0;

    // Calculate pitch multiplier using Pythagorean theorem
    // For a pitch of X:12, the multiplier = √(12² + X²) / 12
    const pitchMultiplier = Math.sqrt(144 + p * p) / 12;

    // Calculate roof area (accounting for pitch)
    const area = l * w * pitchMultiplier;
    setRoofArea(area);

    // Calculate wastage
    const wasteAmount = area * (waste / 100);
    setWastage(wasteAmount);

    // Total area including waste
    const total = area + wasteAmount;
    setTotalArea(total);

    // Calculate roofing squares (1 square = 100 sq ft)
    const roofSquares = total / 100;
    setSquares(roofSquares);

    // Calculate bundles needed (typically 3 bundles per square)
    const bundlesNeeded = Math.ceil(roofSquares * 3);
    setBundles(bundlesNeeded);
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Roofing Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate shingles and materials needed for your roofing project
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Home className="mr-2 h-5 w-5" /> Roof Dimensions
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="length">Roof Length (feet)</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="40"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="width">Roof Width (feet)</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="30"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="pitch">Roof Pitch (rise per 12" run)</Label>
              <Select value={pitch} onValueChange={setPitch}>
                <SelectTrigger id="pitch" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Flat (0:12)</SelectItem>
                  <SelectItem value="3">Low (3:12)</SelectItem>
                  <SelectItem value="4">4:12</SelectItem>
                  <SelectItem value="5">5:12</SelectItem>
                  <SelectItem value="6">6:12 (Standard)</SelectItem>
                  <SelectItem value="7">7:12</SelectItem>
                  <SelectItem value="8">8:12</SelectItem>
                  <SelectItem value="9">9:12</SelectItem>
                  <SelectItem value="10">10:12</SelectItem>
                  <SelectItem value="12">12:12 (Steep)</SelectItem>
                  <SelectItem value="14">14:12</SelectItem>
                  <SelectItem value="16">16:12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="waste">Waste Allowance (%)</Label>
              <Input
                id="waste"
                type="number"
                value={wastePercentage}
                onChange={(e) => setWastePercentage(e.target.value)}
                placeholder="10"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Materials Needed</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Roof Area</h3>
                    <div className="text-2xl font-bold">
                      {roofArea.toFixed(0)} sq ft
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Includes pitch adjustment
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${roofArea.toFixed(0)} sq ft`, 'Roof Area')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Roofing Squares</h3>
                    <div className="text-2xl font-bold">
                      {squares.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 square = 100 sq ft
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(squares.toFixed(2), 'Roofing Squares')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Shingle Bundles</h3>
                    <div className="text-2xl font-bold">
                      {bundles}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      3 bundles per square
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(bundles.toString(), 'Bundles Needed')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Waste Allowance</h3>
                    <div className="text-2xl font-bold">
                      {wastage.toFixed(0)} sq ft
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {wastePercentage}% extra material
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${wastage.toFixed(0)} sq ft`, 'Waste Allowance')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Coverage Area</h3>
                  <div className="text-xl font-bold mt-1">{totalArea.toFixed(0)} sq ft</div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(`${totalArea.toFixed(0)} sq ft`, 'Total Coverage')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Roofing Tips</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Roof Pitch</h3>
              <p className="text-muted-foreground text-sm">
                Roof pitch affects the actual surface area. Steeper roofs require more materials than flat roofs of the same footprint.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Waste Factor</h3>
              <p className="text-muted-foreground text-sm">
                Always add 10-15% for waste, cuts, and mistakes. Complex roofs with valleys and hips need more waste allowance.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Bundle Coverage</h3>
              <p className="text-muted-foreground text-sm">
                Standard shingles come 3 bundles per square. Each bundle covers approximately 33 square feet.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RoofingCalculator;
