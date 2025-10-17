import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * GravelCalculator Component
 * 
 * Calculates gravel/stone needed for driveways, pathways, and landscaping
 */
export function GravelCalculator() {
  const [length, setLength] = useState<string>('30');
  const [width, setWidth] = useState<string>('12');
  const [depth, setDepth] = useState<string>('4');
  const [unit, setUnit] = useState<string>('feet');
  const [depthUnit, setDepthUnit] = useState<string>('inches');
  const [pricePerTon, setPricePerTon] = useState<string>('40');
  const [pricePerCubicYard, setPricePerCubicYard] = useState<string>('30');

  // Results
  const [area, setArea] = useState<number>(0);
  const [volumeCubicYards, setVolumeCubicYards] = useState<number>(0);
  const [volumeCubicFeet, setVolumeCubicFeet] = useState<number>(0);
  const [weightTons, setWeightTons] = useState<number>(0);
  const [costByTon, setCostByTon] = useState<number>(0);
  const [costByCubicYard, setCostByCubicYard] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    calculateGravel();
  }, [length, width, depth, unit, depthUnit, pricePerTon, pricePerCubicYard]);

  const calculateGravel = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    const priceTon = parseFloat(pricePerTon) || 0;
    const priceCubicYard = parseFloat(pricePerCubicYard) || 0;

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

    // Calculate weight in tons
    // Average gravel weight: approximately 1.4 tons per cubic yard
    const tons = volCubicYards * 1.4;
    setWeightTons(tons);

    // Calculate costs
    const costTon = tons * priceTon;
    setCostByTon(costTon);

    const costCY = volCubicYards * priceCubicYard;
    setCostByCubicYard(costCY);
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
        <h1 className="text-3xl font-bold tracking-tight">Gravel Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate gravel needed for driveways, paths, and landscaping
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Mountain className="mr-2 h-5 w-5" /> Area Dimensions
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="30"
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
                placeholder="12"
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
              <Label htmlFor="depth">Gravel Depth</Label>
              <Input
                id="depth"
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                placeholder="4"
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
          </div>
        </Card>

        {/* Pricing Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Pricing Options</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="priceTon">Price per Ton ($)</Label>
              <Input
                id="priceTon"
                type="number"
                step="0.01"
                value={pricePerTon}
                onChange={(e) => setPricePerTon(e.target.value)}
                placeholder="40"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="priceCubicYard">Price per Cubic Yard ($)</Label>
              <Input
                id="priceCubicYard"
                type="number"
                step="0.01"
                value={pricePerCubicYard}
                onChange={(e) => setPricePerCubicYard(e.target.value)}
                placeholder="30"
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
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Volume Needed</h3>
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
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Weight (Tons)</h3>
                    <div className="text-2xl font-bold">
                      {weightTons.toFixed(2)} tons
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      ~1.4 tons per cubic yard
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${weightTons.toFixed(2)} tons`, 'Weight')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Cost by Weight</h3>
                    <div className="text-2xl font-bold">
                      ${costByTon.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {weightTons.toFixed(2)} tons × ${pricePerTon}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`$${costByTon.toFixed(2)}`, 'Cost by Weight')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 p-4 rounded-lg md:col-span-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Cost by Volume</h3>
                    <div className="text-2xl font-bold">
                      ${costByCubicYard.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {volumeCubicYards.toFixed(2)} cubic yards × ${pricePerCubicYard}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`$${costByCubicYard.toFixed(2)}`, 'Cost by Volume')}
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
          <h2 className="text-xl font-semibold mb-4">Gravel Installation Tips</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Recommended Depth</h3>
              <p className="text-muted-foreground text-sm">
                Driveways need 4-6 inches, walkways 2-3 inches. Deeper layers provide better drainage and stability.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Gravel Types</h3>
              <p className="text-muted-foreground text-sm">
                Crushed stone compacts well for driveways. Pea gravel works for decorative areas. River rock is ideal for drainage.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Base Preparation</h3>
              <p className="text-muted-foreground text-sm">
                Always prepare the base with landscape fabric to prevent weeds and ensure proper drainage. Compact each layer.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GravelCalculator;
