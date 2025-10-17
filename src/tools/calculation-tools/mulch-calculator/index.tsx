import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Boxes } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * MulchCalculator Component
 * 
 * Calculates mulch needed for landscaping projects
 */
export function MulchCalculator() {
  const [length, setLength] = useState<string>('20');
  const [width, setWidth] = useState<string>('10');
  const [depth, setDepth] = useState<string>('3');
  const [unit, setUnit] = useState<string>('feet');
  const [depthUnit, setDepthUnit] = useState<string>('inches');
  const [pricePerBag, setPricePerBag] = useState<string>('4.50');

  // Results
  const [area, setArea] = useState<number>(0);
  const [volumeCubicYards, setVolumeCubicYards] = useState<number>(0);
  const [volumeCubicFeet, setVolumeCubicFeet] = useState<number>(0);
  const [bagsNeeded, setBagsNeeded] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    calculateMulch();
  }, [length, width, depth, unit, depthUnit, pricePerBag]);

  const calculateMulch = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    const price = parseFloat(pricePerBag) || 0;

    // Convert to feet
    let lengthFt = l;
    let widthFt = w;
    if (unit === 'meters') {
      lengthFt = l * 3.28084;
      widthFt = w * 3.28084;
    }

    // Calculate area in square feet
    const areaSqFt = lengthFt * widthFt;
    setArea(areaSqFt);

    // Convert depth to feet
    let depthFt = d;
    if (depthUnit === 'inches') {
      depthFt = d / 12;
    } else if (depthUnit === 'centimeters') {
      depthFt = d / 30.48;
    }

    // Calculate volume in cubic feet
    const volCubicFt = areaSqFt * depthFt;
    setVolumeCubicFeet(volCubicFt);

    // Convert to cubic yards (1 cubic yard = 27 cubic feet)
    const volCubicYards = volCubicFt / 27;
    setVolumeCubicYards(volCubicYards);

    // Calculate bags needed (standard 2 cubic feet bags)
    const bags = Math.ceil(volCubicFt / 2);
    setBagsNeeded(bags);

    // Calculate total cost
    const cost = bags * price;
    setTotalCost(cost);
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
        <h1 className="text-3xl font-bold tracking-tight">Mulch Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate mulch needed for your landscaping project
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Boxes className="mr-2 h-5 w-5" /> Area Dimensions
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="20"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="10"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="unit">Measurement Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id="unit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feet">Feet</SelectItem>
                  <SelectItem value="meters">Meters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="depth">Mulch Depth</Label>
              <Input
                id="depth"
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                placeholder="3"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="depthUnit">Depth Unit</Label>
              <Select value={depthUnit} onValueChange={setDepthUnit}>
                <SelectTrigger id="depthUnit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="feet">Feet</SelectItem>
                  <SelectItem value="centimeters">Centimeters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price per Bag ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={pricePerBag}
                onChange={(e) => setPricePerBag(e.target.value)}
                placeholder="4.50"
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
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Coverage Area</h3>
                    <div className="text-2xl font-bold">
                      {area.toFixed(1)} sq ft
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(area / 10.764).toFixed(1)} m²
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${area.toFixed(1)} sq ft`, 'Coverage Area')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Volume (Cubic Yards)</h3>
                    <div className="text-2xl font-bold">
                      {volumeCubicYards.toFixed(2)} yd³
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {volumeCubicFeet.toFixed(1)} cubic feet
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${volumeCubicYards.toFixed(2)} cubic yards`, 'Volume')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Bags Needed</h3>
                    <div className="text-2xl font-bold">
                      {bagsNeeded}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 cubic feet per bag
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(bagsNeeded.toString(), 'Bags Needed')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Estimated Total Cost</h3>
                    <div className="text-2xl font-bold">
                      ${totalCost.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {bagsNeeded} bags × ${pricePerBag}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`$${totalCost.toFixed(2)}`, 'Total Cost')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Mulch Application Tips</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Recommended Depth</h3>
              <p className="text-muted-foreground text-sm">
                Apply 2-4 inches of mulch for best results. Too much can suffocate plants, while too little won't provide adequate protection.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Bag Coverage</h3>
              <p className="text-muted-foreground text-sm">
                A standard 2 cubic feet bag covers approximately 8 square feet at 3 inches deep. Bulk mulch (by cubic yard) is more economical for large areas.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Benefits of Mulch</h3>
              <p className="text-muted-foreground text-sm">
                Mulch retains moisture, regulates soil temperature, prevents weeds, and adds nutrients as it decomposes.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MulchCalculator;
