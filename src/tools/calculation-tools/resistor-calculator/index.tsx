import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ResistorCalculator Component
 * 
 * Calculate resistor values from color bands and vice versa
 */
export function ResistorCalculator() {
  const { toast } = useToast();

  // Color code mappings
  const colorCodes: { [key: string]: number } = {
    'black': 0, 'brown': 1, 'red': 2, 'orange': 3, 'yellow': 4,
    'green': 5, 'blue': 6, 'violet': 7, 'grey': 8, 'white': 9
  };

  const multipliers: { [key: string]: number } = {
    'black': 1, 'brown': 10, 'red': 100, 'orange': 1000, 'yellow': 10000,
    'green': 100000, 'blue': 1000000, 'violet': 10000000, 'grey': 100000000,
    'white': 1000000000, 'gold': 0.1, 'silver': 0.01
  };

  const tolerances: { [key: string]: number } = {
    'brown': 1, 'red': 2, 'green': 0.5, 'blue': 0.25, 'violet': 0.1,
    'grey': 0.05, 'gold': 5, 'silver': 10, 'none': 20
  };

  // State for inputs
  const [mode, setMode] = useState<string>('color'); // color or value
  const [band1, setBand1] = useState<string>('brown');
  const [band2, setBand2] = useState<string>('black');
  const [band3, setBand3] = useState<string>('red');
  const [band4, setBand4] = useState<string>('gold');
  const [bands, setBands] = useState<string>('4'); // 4, 5, or 6 bands
  const [band5, setBand5] = useState<string>('brown'); // For 5-6 band resistors
  const [band6, setBand6] = useState<string>('brown'); // For 6 band resistors (temp coefficient)
  
  // For value to color mode
  const [resistanceValue, setResistanceValue] = useState<number>(0);
  const [tolerancePercent, setTolerancePercent] = useState<number>(5);
  
  // State for results
  const [resistance, setResistance] = useState<number>(0);
  const [tolerance, setTolerance] = useState<number>(0);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  // Calculate when inputs change
  useEffect(() => {
    if (mode === 'color') {
      calculateFromColors();
    } else {
      setResistance(resistanceValue);
      setTolerance(tolerancePercent);
      calculateRange(resistanceValue, tolerancePercent);
    }
  }, [mode, band1, band2, band3, band4, band5, bands, resistanceValue, tolerancePercent]);

  // Calculate resistance from color bands
  const calculateFromColors = () => {
    let resistanceCalc = 0;
    let toleranceCalc = 0;

    if (bands === '4') {
      // 4-band: digit1, digit2, multiplier, tolerance
      const digit1 = colorCodes[band1] || 0;
      const digit2 = colorCodes[band2] || 0;
      const mult = multipliers[band3] || 1;
      
      resistanceCalc = (digit1 * 10 + digit2) * mult;
      toleranceCalc = tolerances[band4] || 20;
    } else if (bands === '5') {
      // 5-band: digit1, digit2, digit3, multiplier, tolerance
      const digit1 = colorCodes[band1] || 0;
      const digit2 = colorCodes[band2] || 0;
      const digit3 = colorCodes[band3] || 0;
      const mult = multipliers[band4] || 1;
      
      resistanceCalc = (digit1 * 100 + digit2 * 10 + digit3) * mult;
      toleranceCalc = tolerances[band5] || 20;
    } else {
      // 6-band: same as 5-band but with temperature coefficient
      const digit1 = colorCodes[band1] || 0;
      const digit2 = colorCodes[band2] || 0;
      const digit3 = colorCodes[band3] || 0;
      const mult = multipliers[band4] || 1;
      
      resistanceCalc = (digit1 * 100 + digit2 * 10 + digit3) * mult;
      toleranceCalc = tolerances[band5] || 20;
    }

    setResistance(resistanceCalc);
    setTolerance(toleranceCalc);
    calculateRange(resistanceCalc, toleranceCalc);
  };

  // Calculate min/max range
  const calculateRange = (res: number, tol: number) => {
    const variation = res * (tol / 100);
    setMinValue(res - variation);
    setMaxValue(res + variation);
  };

  // Format resistance value with appropriate unit
  const formatResistance = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} kΩ`;
    } else {
      return `${value.toFixed(2)} Ω`;
    }
  };

  // Function to reset all values
  const handleReset = () => {
    setBand1('brown');
    setBand2('black');
    setBand3('red');
    setBand4('gold');
    setBand5('brown');
    setResistanceValue(0);
    setTolerancePercent(5);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Resistor Calculation:
Resistance: ${formatResistance(resistance)}
Tolerance: ±${tolerance}%
Range: ${formatResistance(minValue)} - ${formatResistance(maxValue)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Resistor values copied to clipboard",
    });
  };

  const colorOptions = Object.keys(colorCodes);
  const multiplierOptions = Object.keys(multipliers);
  const toleranceOptions = Object.keys(tolerances);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Resistor Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate resistor values from color bands or find color codes for resistance values
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Cpu className="mr-2 h-5 w-5" /> Resistor Properties
          </h2>
          
          <div className="space-y-6">
            {/* Mode Selection */}
            <div>
              <Label htmlFor="mode">Calculation Mode</Label>
              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="color">Color Bands to Value</SelectItem>
                  <SelectItem value="value">Value to Color Bands</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === 'color' ? (
              <>
                {/* Number of Bands */}
                <div>
                  <Label htmlFor="bands">Number of Bands</Label>
                  <Select value={bands} onValueChange={setBands}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 Bands</SelectItem>
                      <SelectItem value="5">5 Bands</SelectItem>
                      <SelectItem value="6">6 Bands</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Band 1 */}
                <div>
                  <Label htmlFor="band1">Band 1 (1st Digit)</Label>
                  <Select value={band1} onValueChange={setBand1}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map(color => (
                        <SelectItem key={color} value={color} className="capitalize">
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Band 2 */}
                <div>
                  <Label htmlFor="band2">Band 2 (2nd Digit)</Label>
                  <Select value={band2} onValueChange={setBand2}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map(color => (
                        <SelectItem key={color} value={color} className="capitalize">
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Band 3 */}
                {bands === '4' ? (
                  <div>
                    <Label htmlFor="band3">Band 3 (Multiplier)</Label>
                    <Select value={band3} onValueChange={setBand3}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {multiplierOptions.map(color => (
                          <SelectItem key={color} value={color} className="capitalize">
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="band3">Band 3 (3rd Digit)</Label>
                    <Select value={band3} onValueChange={setBand3}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map(color => (
                          <SelectItem key={color} value={color} className="capitalize">
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Band 4 */}
                {bands === '4' ? (
                  <div>
                    <Label htmlFor="band4">Band 4 (Tolerance)</Label>
                    <Select value={band4} onValueChange={setBand4}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toleranceOptions.map(color => (
                          <SelectItem key={color} value={color} className="capitalize">
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="band4">Band 4 (Multiplier)</Label>
                    <Select value={band4} onValueChange={setBand4}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {multiplierOptions.map(color => (
                          <SelectItem key={color} value={color} className="capitalize">
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Band 5 (for 5 and 6 band resistors) */}
                {(bands === '5' || bands === '6') && (
                  <div>
                    <Label htmlFor="band5">Band 5 (Tolerance)</Label>
                    <Select value={band5} onValueChange={setBand5}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toleranceOptions.map(color => (
                          <SelectItem key={color} value={color} className="capitalize">
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Band 6 (for 6 band resistors - temperature coefficient) */}
                {bands === '6' && (
                  <div>
                    <Label htmlFor="band6">Band 6 (Temp Coefficient)</Label>
                    <Select value={band6} onValueChange={setBand6}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map(color => (
                          <SelectItem key={color} value={color} className="capitalize">
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Resistance Value */}
                <div>
                  <Label htmlFor="resistanceValue">Resistance Value (Ohms)</Label>
                  <Input
                    id="resistanceValue"
                    type="number"
                    className="mt-1.5"
                    value={resistanceValue}
                    onChange={(e) => setResistanceValue(Number(e.target.value))}
                  />
                </div>

                {/* Tolerance */}
                <div>
                  <Label htmlFor="tolerancePercent">Tolerance (%)</Label>
                  <Input
                    id="tolerancePercent"
                    type="number"
                    step="0.1"
                    className="mt-1.5"
                    value={tolerancePercent}
                    onChange={(e) => setTolerancePercent(Number(e.target.value))}
                  />
                </div>
              </>
            )}

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
                  <h2 className="text-xl font-semibold">Resistor Value</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Resistance
                    </h3>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {formatResistance(resistance)}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      Tolerance
                    </h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      ±{tolerance}%
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Value Range
                    </h3>
                    <div className="text-sm">
                      <div className="font-semibold">Min: {formatResistance(minValue)}</div>
                      <div className="font-semibold">Max: {formatResistance(maxValue)}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Color Code Reference</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>4-band:</strong> Digit-Digit-Multiplier-Tolerance
              </p>
              <p>
                • <strong>5-band:</strong> Digit-Digit-Digit-Multiplier-Tolerance
              </p>
              <p>
                • <strong>6-band:</strong> Same as 5-band + Temperature Coefficient
              </p>
              <p>
                • Gold multiplier = ×0.1, Silver = ×0.01
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ResistorCalculator;
