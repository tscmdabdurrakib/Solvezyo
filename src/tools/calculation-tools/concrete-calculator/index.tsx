import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Construction } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * ConcreteCalculator Component
 * 
 * Calculates concrete volume and materials needed for construction projects
 */
export function ConcreteCalculator() {
  const [shape, setShape] = useState<string>('slab');
  const [unit, setUnit] = useState<string>('feet');
  
  // Slab dimensions
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [thickness, setThickness] = useState<number>(4);
  
  // Column dimensions
  const [diameter, setDiameter] = useState<number>(12);
  const [height, setHeight] = useState<number>(8);
  
  // Stairs dimensions
  const [stairsWidth, setStairsWidth] = useState<number>(3);
  const [stairsRise, setStairsRise] = useState<number>(7);
  const [stairsRun, setStairsRun] = useState<number>(11);
  const [numberOfSteps, setNumberOfSteps] = useState<number>(10);
  
  // Results
  const [volume, setVolume] = useState<number>(0);
  const [cubicYards, setCubicYards] = useState<number>(0);
  const [cubicMeters, setCubicMeters] = useState<number>(0);
  const [bags, setBags] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  
  // Pricing
  const [pricePerYard, setPricePerYard] = useState<number>(125);
  
  const { toast } = useToast();

  // Calculate concrete when inputs change
  useEffect(() => {
    calculateConcrete();
  }, [shape, unit, length, width, thickness, diameter, height, stairsWidth, stairsRise, stairsRun, numberOfSteps, pricePerYard]);

  // Function to convert to cubic feet
  const toCubicFeet = (l: number, w: number, t: number): number => {
    if (unit === 'feet') {
      return l * w * (t / 12); // thickness in inches to feet
    } else if (unit === 'meters') {
      return l * w * t * 35.3147; // cubic meters to cubic feet
    } else if (unit === 'inches') {
      return (l / 12) * (w / 12) * (t / 12);
    }
    return 0;
  };

  // Function to calculate concrete volume
  const calculateConcrete = () => {
    let cubicFeet = 0;

    if (shape === 'slab') {
      // Calculate for rectangular slab
      cubicFeet = toCubicFeet(length, width, thickness);
    } else if (shape === 'column') {
      // Calculate for circular column
      // Volume = π × r² × h
      const radius = (unit === 'feet' ? diameter / 2 : diameter / 24); // convert inches to feet
      const h = unit === 'feet' ? height : height / 12;
      cubicFeet = Math.PI * radius * radius * h;
    } else if (shape === 'stairs') {
      // Calculate for stairs
      // Volume = (Width × ((Rise × Run × Steps) / 2))
      const w = unit === 'feet' ? stairsWidth : stairsWidth / 12;
      const rise = unit === 'feet' ? stairsRise : stairsRise / 12;
      const run = unit === 'feet' ? stairsRun : stairsRun / 12;
      cubicFeet = w * ((rise * run * numberOfSteps) / 2);
    }

    // Convert cubic feet to cubic yards
    const yards = cubicFeet / 27;
    
    // Convert to cubic meters
    const meters = cubicFeet * 0.0283168;
    
    // Calculate number of 80lb bags needed (covers 0.6 cubic feet)
    const bagsNeeded = Math.ceil(cubicFeet / 0.6);
    
    // Calculate cost
    const totalCost = yards * pricePerYard;

    setVolume(cubicFeet);
    setCubicYards(yards);
    setCubicMeters(meters);
    setBags(bagsNeeded);
    setCost(totalCost);
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
    setShape('slab');
    setUnit('feet');
    setLength(10);
    setWidth(10);
    setThickness(4);
    setDiameter(12);
    setHeight(8);
    setStairsWidth(3);
    setStairsRise(7);
    setStairsRun(11);
    setNumberOfSteps(10);
    setPricePerYard(125);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Concrete Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate concrete volume and materials needed for your project
        </p>
      </div>

      <div className="grid gap-6">
        {/* Settings */}
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="shape">Shape/Type</Label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slab">Slab / Floor</SelectItem>
                  <SelectItem value="column">Column / Cylinder</SelectItem>
                  <SelectItem value="stairs">Stairs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="unit">Measurement Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feet">Feet</SelectItem>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="meters">Meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Input Section - Different for each shape */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Construction className="mr-2 h-5 w-5" /> Dimensions
          </h2>
          
          <div className="space-y-4">
            {/* Slab Inputs */}
            {shape === 'slab' && (
              <>
                <div>
                  <Label htmlFor="length">Length ({unit})</Label>
                  <Input
                    id="length"
                    type="number"
                    min="0"
                    step="0.1"
                    className="mt-2"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="width">Width ({unit})</Label>
                  <Input
                    id="width"
                    type="number"
                    min="0"
                    step="0.1"
                    className="mt-2"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="thickness">
                    Thickness ({unit === 'feet' ? 'inches' : unit})
                  </Label>
                  <Input
                    id="thickness"
                    type="number"
                    min="0"
                    step="0.5"
                    className="mt-2"
                    value={thickness}
                    onChange={(e) => setThickness(Number(e.target.value))}
                  />
                </div>
              </>
            )}

            {/* Column Inputs */}
            {shape === 'column' && (
              <>
                <div>
                  <Label htmlFor="diameter">
                    Diameter ({unit === 'feet' ? 'inches' : unit})
                  </Label>
                  <Input
                    id="diameter"
                    type="number"
                    min="0"
                    step="0.5"
                    className="mt-2"
                    value={diameter}
                    onChange={(e) => setDiameter(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height ({unit})</Label>
                  <Input
                    id="height"
                    type="number"
                    min="0"
                    step="0.1"
                    className="mt-2"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                  />
                </div>
              </>
            )}

            {/* Stairs Inputs */}
            {shape === 'stairs' && (
              <>
                <div>
                  <Label htmlFor="stairsWidth">Width ({unit})</Label>
                  <Input
                    id="stairsWidth"
                    type="number"
                    min="0"
                    step="0.1"
                    className="mt-2"
                    value={stairsWidth}
                    onChange={(e) => setStairsWidth(Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stairsRise">Rise per Step ({unit === 'feet' ? 'inches' : unit})</Label>
                    <Input
                      id="stairsRise"
                      type="number"
                      min="0"
                      step="0.5"
                      className="mt-2"
                      value={stairsRise}
                      onChange={(e) => setStairsRise(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stairsRun">Run per Step ({unit === 'feet' ? 'inches' : unit})</Label>
                    <Input
                      id="stairsRun"
                      type="number"
                      min="0"
                      step="0.5"
                      className="mt-2"
                      value={stairsRun}
                      onChange={(e) => setStairsRun(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="numberOfSteps">Number of Steps</Label>
                  <Input
                    id="numberOfSteps"
                    type="number"
                    min="1"
                    className="mt-2"
                    value={numberOfSteps}
                    onChange={(e) => setNumberOfSteps(Number(e.target.value))}
                  />
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Pricing */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cost Estimation (Optional)</h2>
          <div>
            <Label htmlFor="pricePerYard">Price per Cubic Yard ($)</Label>
            <Input
              id="pricePerYard"
              type="number"
              min="0"
              step="1"
              className="mt-2"
              value={pricePerYard}
              onChange={(e) => setPricePerYard(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleReset} variant="outline" className="w-full mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </Card>

        {/* Results Section */}
        {volume > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              {/* Volume Display */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Concrete Needed</h3>
                    <div className="text-4xl font-bold">
                      {cubicYards.toFixed(2)} yd³
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {volume.toFixed(2)} cubic feet
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(cubicYards.toFixed(2), 'Cubic Yards')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Cubic Meters */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Cubic Meters</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {cubicMeters.toFixed(2)} m³
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(cubicMeters.toFixed(2), 'Cubic Meters')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* 80lb Bags */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">80lb Bags Needed</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {bags} bags
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(bags.toString(), 'Bags Needed')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Cost */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mt-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Estimated Cost</h3>
                    <div className="text-4xl font-bold">
                      {formatCurrency(cost)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on {formatCurrency(pricePerYard)} per cubic yard
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(formatCurrency(cost), 'Estimated Cost')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mt-4">
                <h3 className="font-medium mb-2">💡 Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Add 5-10% extra concrete for waste and spillage</li>
                  <li>• Ready-mix concrete is sold by the cubic yard</li>
                  <li>• Minimum order is typically 1 cubic yard</li>
                  <li>• For small jobs, use 80lb bags of concrete mix</li>
                </ul>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Concrete Calculator Guide</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Measurements</h3>
              <p className="text-muted-foreground text-sm">
                Measure length, width, and thickness accurately. For slabs, thickness is typically 4-6 inches for most residential projects.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Ordering</h3>
              <p className="text-muted-foreground text-sm">
                Concrete is ordered in cubic yards. Always order 5-10% more than calculated to account for waste, spillage, and ground irregularities.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Bag Coverage</h3>
              <p className="text-muted-foreground text-sm">
                An 80lb bag of concrete mix covers approximately 0.6 cubic feet. For small projects, bags are more convenient than ready-mix trucks.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ConcreteCalculator;
