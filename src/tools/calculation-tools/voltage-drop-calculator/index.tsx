import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Zap, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * VoltageDropCalculator Component
 * 
 * Calculate voltage drop in electrical circuits
 */
export function VoltageDropCalculator() {
  const { toast } = useToast();

  // State for input values
  const [voltage, setVoltage] = useState<number>(120);
  const [current, setCurrent] = useState<number>(15);
  const [wireLength, setWireLength] = useState<number>(100);
  const [wireGauge, setWireGauge] = useState<string>('12');
  const [material, setMaterial] = useState<string>('copper');
  
  // State for calculated results
  const [voltageDrop, setVoltageDrop] = useState<number>(0);
  const [voltageDropPercent, setVoltageDropPercent] = useState<number>(0);
  const [endVoltage, setEndVoltage] = useState<number>(0);
  const [isAcceptable, setIsAcceptable] = useState<boolean>(true);

  // Wire resistance values (ohms per 1000 ft)
  const wireResistance: {[key: string]: {copper: number, aluminum: number}} = {
    '14': { copper: 2.525, aluminum: 4.22 },
    '12': { copper: 1.588, aluminum: 2.66 },
    '10': { copper: 0.999, aluminum: 1.67 },
    '8': { copper: 0.628, aluminum: 1.05 },
    '6': { copper: 0.395, aluminum: 0.66 },
    '4': { copper: 0.249, aluminum: 0.42 },
    '2': { copper: 0.156, aluminum: 0.26 },
    '1': { copper: 0.124, aluminum: 0.21 },
    '0': { copper: 0.098, aluminum: 0.16 },
  };

  // Calculate voltage drop when inputs change
  useEffect(() => {
    calculateVoltageDrop();
  }, [voltage, current, wireLength, wireGauge, material]);

  // Function to calculate voltage drop
  const calculateVoltageDrop = () => {
    // Get wire resistance per 1000 ft
    const resistancePerThousandFt = wireResistance[wireGauge][material as 'copper' | 'aluminum'];
    
    // Calculate total resistance (2x length for round trip, divided by 1000 to get actual length)
    const totalResistance = (resistancePerThousandFt * wireLength * 2) / 1000;
    
    // Calculate voltage drop using Ohm's Law: V = I × R
    const drop = current * totalResistance;
    setVoltageDrop(drop);

    // Calculate voltage drop percentage
    const dropPercent = (drop / voltage) * 100;
    setVoltageDropPercent(dropPercent);

    // Calculate end voltage
    const endV = voltage - drop;
    setEndVoltage(endV);

    // Check if voltage drop is acceptable (typically < 3% for branch circuits, < 5% total)
    setIsAcceptable(dropPercent <= 3);
  };

  // Function to reset all values
  const handleReset = () => {
    setVoltage(120);
    setCurrent(15);
    setWireLength(100);
    setWireGauge('12');
    setMaterial('copper');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Voltage Drop Calculation:
System Voltage: ${voltage}V
Current: ${current}A
Wire Length: ${wireLength} ft (one way)
Wire Gauge: AWG ${wireGauge}
Material: ${material.charAt(0).toUpperCase() + material.slice(1)}

Voltage Drop: ${voltageDrop.toFixed(2)}V
Voltage Drop: ${voltageDropPercent.toFixed(2)}%
End Voltage: ${endVoltage.toFixed(2)}V
Status: ${isAcceptable ? 'Acceptable' : 'Excessive - Consider larger wire'}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Voltage drop results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Voltage Drop Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate voltage drop in electrical circuits for proper wire sizing
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 h-5 w-5" /> Circuit Parameters
          </h2>
          
          <div className="space-y-6">
            {/* Voltage */}
            <div>
              <Label htmlFor="voltage">System Voltage (V)</Label>
              <Select value={voltage.toString()} onValueChange={(val) => setVoltage(Number(val))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12V DC</SelectItem>
                  <SelectItem value="24">24V DC</SelectItem>
                  <SelectItem value="120">120V AC</SelectItem>
                  <SelectItem value="208">208V AC (3-phase)</SelectItem>
                  <SelectItem value="240">240V AC</SelectItem>
                  <SelectItem value="277">277V AC</SelectItem>
                  <SelectItem value="480">480V AC (3-phase)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Current */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="current">Current (Amperes)</Label>
                <span className="text-sm font-bold">{current}A</span>
              </div>
              <Input
                id="current"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={current}
                onChange={(e) => setCurrent(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[current]}
                max={200}
                step={1}
                onValueChange={(values) => setCurrent(values[0])}
              />
            </div>

            {/* Wire Length */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="wireLength">One-Way Distance (feet)</Label>
                <span className="text-sm font-bold">{wireLength} ft</span>
              </div>
              <Input
                id="wireLength"
                type="number"
                step="1"
                className="mt-1.5"
                value={wireLength}
                onChange={(e) => setWireLength(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[wireLength]}
                max={500}
                step={10}
                onValueChange={(values) => setWireLength(values[0])}
              />
            </div>

            {/* Wire Gauge */}
            <div>
              <Label htmlFor="wireGauge">Wire Gauge (AWG)</Label>
              <Select value={wireGauge} onValueChange={setWireGauge}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14">14 AWG</SelectItem>
                  <SelectItem value="12">12 AWG</SelectItem>
                  <SelectItem value="10">10 AWG</SelectItem>
                  <SelectItem value="8">8 AWG</SelectItem>
                  <SelectItem value="6">6 AWG</SelectItem>
                  <SelectItem value="4">4 AWG</SelectItem>
                  <SelectItem value="2">2 AWG</SelectItem>
                  <SelectItem value="1">1 AWG</SelectItem>
                  <SelectItem value="0">0 AWG (1/0)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Material */}
            <div>
              <Label htmlFor="material">Conductor Material</Label>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="copper">Copper</SelectItem>
                  <SelectItem value="aluminum">Aluminum</SelectItem>
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
                  <h2 className="text-xl font-semibold">Voltage Drop Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    isAcceptable 
                      ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                      : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                  }`}>
                    <h3 className={`text-sm font-medium ${
                      isAcceptable ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                    }`}>
                      Voltage Drop Percentage
                    </h3>
                    <div className={`mt-2 text-5xl font-bold ${
                      isAcceptable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {voltageDropPercent.toFixed(2)}%
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {isAcceptable ? (
                        <span className="text-sm text-green-700 dark:text-green-300">✓ Acceptable</span>
                      ) : (
                        <span className="text-sm text-red-700 dark:text-red-300 flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" /> Excessive - Use larger wire
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Voltage Drop</h3>
                      <div className="mt-1 text-2xl font-bold">{voltageDrop.toFixed(2)}V</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">End Voltage</h3>
                      <div className="mt-1 text-2xl font-bold">{endVoltage.toFixed(2)}V</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                      Circuit Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Wire Type:</span>
                        <span className="font-bold">AWG {wireGauge} {material.charAt(0).toUpperCase() + material.slice(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Wire Length:</span>
                        <span className="font-bold">{wireLength * 2} ft (round trip)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Load Current:</span>
                        <span className="font-bold">{current}A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">NEC Guidelines</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Branch circuits: Maximum 3% voltage drop recommended
              </p>
              <p>
                • Feeders: Maximum 2% voltage drop recommended
              </p>
              <p>
                • Total (feeder + branch): Maximum 5% voltage drop
              </p>
              <p>
                • Lower voltage drop = better efficiency and performance
              </p>
              <p>
                • Consider using larger wire gauge if drop exceeds limits
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default VoltageDropCalculator;
