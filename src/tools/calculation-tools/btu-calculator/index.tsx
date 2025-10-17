import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Thermometer, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BTUCalculator Component
 * 
 * Calculate BTU requirements for heating and cooling spaces
 */
export function BTUCalculator() {
  const { toast } = useToast();

  // State for input values
  const [roomLength, setRoomLength] = useState<number>(20);
  const [roomWidth, setRoomWidth] = useState<number>(15);
  const [ceilingHeight, setCeilingHeight] = useState<number>(8);
  const [climate, setClimate] = useState<string>('moderate');
  const [insulation, setInsulation] = useState<string>('average');
  const [purpose, setPurpose] = useState<string>('cooling');
  
  // State for calculated results
  const [squareFootage, setSquareFootage] = useState<number>(0);
  const [cubicFootage, setCubicFootage] = useState<number>(0);
  const [baseBTU, setBaseBTU] = useState<number>(0);
  const [adjustedBTU, setAdjustedBTU] = useState<number>(0);
  const [recommendedTons, setRecommendedTons] = useState<number>(0);

  // BTU factors
  const climateFactor: {[key: string]: number} = {
    'hot': 1.3,
    'warm': 1.15,
    'moderate': 1.0,
    'cool': 0.9,
    'cold': 0.8,
  };

  const insulationFactor: {[key: string]: number} = {
    'poor': 1.25,
    'average': 1.0,
    'good': 0.85,
    'excellent': 0.75,
  };

  // Calculate BTU when inputs change
  useEffect(() => {
    calculateBTU();
  }, [roomLength, roomWidth, ceilingHeight, climate, insulation, purpose]);

  // Function to calculate BTU
  const calculateBTU = () => {
    // Calculate square footage
    const sqFt = roomLength * roomWidth;
    setSquareFootage(sqFt);

    // Calculate cubic footage
    const cuFt = roomLength * roomWidth * ceilingHeight;
    setCubicFootage(cuFt);

    // Base BTU calculation (typically 20 BTU per sq ft for cooling, 30-40 for heating)
    const btusPerSqFt = purpose === 'cooling' ? 20 : 35;
    const base = sqFt * btusPerSqFt;
    setBaseBTU(base);

    // Apply climate and insulation factors
    const adjusted = base * climateFactor[climate] * insulationFactor[insulation];
    setAdjustedBTU(adjusted);

    // Convert to tons (1 ton = 12,000 BTU)
    const tons = adjusted / 12000;
    setRecommendedTons(tons);
  };

  // Function to reset all values
  const handleReset = () => {
    setRoomLength(20);
    setRoomWidth(15);
    setCeilingHeight(8);
    setClimate('moderate');
    setInsulation('average');
    setPurpose('cooling');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `BTU Calculation Results:
Room Dimensions: ${roomLength}' × ${roomWidth}' × ${ceilingHeight}'
Square Footage: ${squareFootage} sq ft
Cubic Footage: ${cubicFootage} cu ft
Climate: ${climate.charAt(0).toUpperCase() + climate.slice(1)}
Insulation: ${insulation.charAt(0).toUpperCase() + insulation.slice(1)}
Purpose: ${purpose.charAt(0).toUpperCase() + purpose.slice(1)}

Base BTU: ${baseBTU.toLocaleString()}
Adjusted BTU: ${adjustedBTU.toLocaleString()}
Recommended Capacity: ${recommendedTons.toFixed(2)} tons`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "BTU calculation copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">BTU Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate BTU requirements for heating and cooling your space
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Thermometer className="mr-2 h-5 w-5" /> Room Details
          </h2>
          
          <div className="space-y-6">
            {/* Purpose */}
            <div>
              <Label htmlFor="purpose">Purpose</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cooling">Air Conditioning (Cooling)</SelectItem>
                  <SelectItem value="heating">Heating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Room Length */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="roomLength">Room Length (feet)</Label>
                <span className="text-sm font-bold">{roomLength} ft</span>
              </div>
              <Input
                id="roomLength"
                type="number"
                step="1"
                className="mt-1.5"
                value={roomLength}
                onChange={(e) => setRoomLength(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[roomLength]}
                max={50}
                min={5}
                step={1}
                onValueChange={(values) => setRoomLength(values[0])}
              />
            </div>

            {/* Room Width */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="roomWidth">Room Width (feet)</Label>
                <span className="text-sm font-bold">{roomWidth} ft</span>
              </div>
              <Input
                id="roomWidth"
                type="number"
                step="1"
                className="mt-1.5"
                value={roomWidth}
                onChange={(e) => setRoomWidth(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[roomWidth]}
                max={50}
                min={5}
                step={1}
                onValueChange={(values) => setRoomWidth(values[0])}
              />
            </div>

            {/* Ceiling Height */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="ceilingHeight">Ceiling Height (feet)</Label>
                <span className="text-sm font-bold">{ceilingHeight} ft</span>
              </div>
              <Input
                id="ceilingHeight"
                type="number"
                step="1"
                className="mt-1.5"
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[ceilingHeight]}
                max={20}
                min={6}
                step={1}
                onValueChange={(values) => setCeilingHeight(values[0])}
              />
            </div>

            {/* Climate */}
            <div>
              <Label htmlFor="climate">Climate Zone</Label>
              <Select value={climate} onValueChange={setClimate}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hot">Hot Climate</SelectItem>
                  <SelectItem value="warm">Warm Climate</SelectItem>
                  <SelectItem value="moderate">Moderate Climate</SelectItem>
                  <SelectItem value="cool">Cool Climate</SelectItem>
                  <SelectItem value="cold">Cold Climate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Insulation */}
            <div>
              <Label htmlFor="insulation">Insulation Quality</Label>
              <Select value={insulation} onValueChange={setInsulation}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poor">Poor Insulation</SelectItem>
                  <SelectItem value="average">Average Insulation</SelectItem>
                  <SelectItem value="good">Good Insulation</SelectItem>
                  <SelectItem value="excellent">Excellent Insulation</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                  <h2 className="text-xl font-semibold">BTU Requirements</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      Required BTU
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-orange-600 dark:text-orange-400">
                      {adjustedBTU.toLocaleString()}
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                      BTU/hr
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Recommended Capacity
                    </h3>
                    <div className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {recommendedTons.toFixed(2)} Tons
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Square Footage</h3>
                      <div className="mt-1 text-xl font-bold">{squareFootage}</div>
                      <div className="text-xs text-muted-foreground">sq ft</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Cubic Footage</h3>
                      <div className="mt-1 text-xl font-bold">{cubicFootage}</div>
                      <div className="text-xs text-muted-foreground">cu ft</div>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-3">
                      Calculation Breakdown
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base BTU:</span>
                        <span className="font-bold">{baseBTU.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Climate Factor:</span>
                        <span className="font-bold">×{climateFactor[climate]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Insulation Factor:</span>
                        <span className="font-bold">×{insulationFactor[insulation]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Wind className="mr-2 h-5 w-5" /> BTU Guide
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • 1 Ton of cooling = 12,000 BTU/hr
              </p>
              <p>
                • Typical cooling: 20 BTU per square foot
              </p>
              <p>
                • Typical heating: 30-40 BTU per square foot
              </p>
              <p>
                • Consider sun exposure, window count, and occupancy
              </p>
              <p>
                • Consult an HVAC professional for precise sizing
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BTUCalculator;
