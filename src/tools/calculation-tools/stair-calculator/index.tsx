import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Move, Ruler } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * StairCalculator Component
 * 
 * Calculate stair dimensions including number of steps, rise, run, and angle
 */
export function StairCalculator() {
  const { toast } = useToast();

  // State for inputs
  const [totalRise, setTotalRise] = useState<number>(0); // Total height
  const [totalRun, setTotalRun] = useState<number>(0); // Total horizontal distance
  const [numberOfSteps, setNumberOfSteps] = useState<number>(0); // Can be calculated or input
  const [unit, setUnit] = useState<string>('imperial'); // imperial or metric
  const [inputMode, setInputMode] = useState<string>('auto'); // auto or manual
  
  // State for results
  const [risePerStep, setRisePerStep] = useState<number>(0);
  const [runPerStep, setRunPerStep] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);
  const [calculatedSteps, setCalculatedSteps] = useState<number>(0);
  const [stringerLength, setStringerLength] = useState<number>(0);

  // Calculate when inputs change
  useEffect(() => {
    calculateStairDimensions();
  }, [totalRise, totalRun, numberOfSteps, inputMode]);

  // Function to calculate stair dimensions
  const calculateStairDimensions = () => {
    if (totalRise <= 0) {
      resetResults();
      return;
    }

    let steps = numberOfSteps;
    
    if (inputMode === 'auto' || steps <= 0) {
      // Optimal rise per step is 7-7.75 inches (18-20 cm)
      const optimalRise = unit === 'imperial' ? 7.5 : 19;
      steps = Math.round(totalRise / optimalRise);
      if (steps < 1) steps = 1;
      setCalculatedSteps(steps);
    } else {
      setCalculatedSteps(steps);
    }

    // Calculate rise per step
    const risePerStepCalc = totalRise / steps;
    setRisePerStep(risePerStepCalc);

    // Calculate run per step
    let runPerStepCalc = 0;
    if (totalRun > 0) {
      runPerStepCalc = totalRun / (steps - 1); // steps - 1 because run is between steps
    } else {
      // Use optimal run of 10-11 inches (25-28 cm) if not specified
      runPerStepCalc = unit === 'imperial' ? 10 : 25;
    }
    setRunPerStep(runPerStepCalc);

    // Calculate angle
    const angleRad = Math.atan(risePerStepCalc / runPerStepCalc);
    const angleDeg = angleRad * (180 / Math.PI);
    setAngle(angleDeg);

    // Calculate stringer length (hypotenuse)
    const stringerLen = Math.sqrt(Math.pow(totalRise, 2) + Math.pow((steps - 1) * runPerStepCalc, 2));
    setStringerLength(stringerLen);
  };

  const resetResults = () => {
    setRisePerStep(0);
    setRunPerStep(0);
    setAngle(0);
    setCalculatedSteps(0);
    setStringerLength(0);
  };

  // Function to reset all values
  const handleReset = () => {
    setTotalRise(0);
    setTotalRun(0);
    setNumberOfSteps(0);
    setInputMode('auto');
  };

  // Check if dimensions meet building codes
  const checkBuildingCode = () => {
    if (unit === 'imperial') {
      // IRC (International Residential Code) standards
      const riseOK = risePerStep >= 4 && risePerStep <= 7.75;
      const runOK = runPerStep >= 10;
      return { riseOK, runOK };
    } else {
      // Metric equivalents
      const riseOK = risePerStep >= 10 && risePerStep <= 20;
      const runOK = runPerStep >= 25;
      return { riseOK, runOK };
    }
  };

  const buildingCode = checkBuildingCode();

  // Copy result to clipboard
  const copyToClipboard = () => {
    const unitLabel = unit === 'imperial' ? 'inches' : 'cm';
    const result = `Stair Calculator Results:
Total Rise: ${totalRise} ${unitLabel}
Total Run: ${totalRun} ${unitLabel}
Number of Steps: ${calculatedSteps}

Rise per Step: ${risePerStep.toFixed(2)} ${unitLabel}
Run per Step: ${runPerStep.toFixed(2)} ${unitLabel}
Stair Angle: ${angle.toFixed(2)}°
Stringer Length: ${stringerLength.toFixed(2)} ${unitLabel}

Building Code: ${buildingCode.riseOK && buildingCode.runOK ? 'Compliant' : 'Review Required'}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Stair calculations copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Stair Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate stair dimensions and verify building code compliance
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Ruler className="mr-2 h-5 w-5" /> Stair Dimensions
          </h2>
          
          <div className="space-y-6">
            {/* Unit Selection */}
            <div>
              <Label htmlFor="unit">Unit System</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imperial">Imperial (inches)</SelectItem>
                  <SelectItem value="metric">Metric (cm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Total Rise */}
            <div>
              <Label htmlFor="totalRise">Total Rise (Height) *</Label>
              <div className="relative mt-1.5">
                <Move className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="totalRise"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={totalRise}
                  onChange={(e) => setTotalRise(Number(e.target.value))}
                  placeholder={unit === 'imperial' ? 'inches' : 'cm'}
                />
              </div>
            </div>

            {/* Total Run */}
            <div>
              <Label htmlFor="totalRun">Total Run (Optional)</Label>
              <div className="relative mt-1.5">
                <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="totalRun"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={totalRun}
                  onChange={(e) => setTotalRun(Number(e.target.value))}
                  placeholder={unit === 'imperial' ? 'inches' : 'cm'}
                />
              </div>
            </div>

            {/* Input Mode */}
            <div>
              <Label htmlFor="inputMode">Number of Steps</Label>
              <Select value={inputMode} onValueChange={setInputMode}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto Calculate</SelectItem>
                  <SelectItem value="manual">Manual Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Manual Steps Input */}
            {inputMode === 'manual' && (
              <div>
                <Label htmlFor="numberOfSteps">Enter Number of Steps</Label>
                <Input
                  id="numberOfSteps"
                  type="number"
                  className="mt-1.5"
                  value={numberOfSteps}
                  onChange={(e) => setNumberOfSteps(Number(e.target.value))}
                />
              </div>
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
                  <h2 className="text-xl font-semibold">Stair Specifications</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="text-xs font-medium text-blue-800 dark:text-blue-200">Number of Steps</h3>
                      <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {calculatedSteps}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h3 className="text-xs font-medium text-purple-800 dark:text-purple-200">Angle</h3>
                      <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {angle.toFixed(1)}°
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${buildingCode.riseOK ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'}`}>
                    <h3 className={`text-sm font-medium ${buildingCode.riseOK ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                      Rise per Step
                    </h3>
                    <div className={`mt-1 text-xl font-bold ${buildingCode.riseOK ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {risePerStep.toFixed(2)} {unit === 'imperial' ? 'in' : 'cm'}
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${buildingCode.runOK ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'}`}>
                    <h3 className={`text-sm font-medium ${buildingCode.runOK ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                      Run per Step (Tread)
                    </h3>
                    <div className={`mt-1 text-xl font-bold ${buildingCode.runOK ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {runPerStep.toFixed(2)} {unit === 'imperial' ? 'in' : 'cm'}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Stringer Length</h3>
                    <div className="mt-1 text-xl font-bold">
                      {stringerLength.toFixed(2)} {unit === 'imperial' ? 'in' : 'cm'}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${buildingCode.riseOK && buildingCode.runOK ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
                    <p className="text-sm font-medium">
                      {buildingCode.riseOK && buildingCode.runOK 
                        ? '✓ Meets Building Code Requirements' 
                        : '⚠ Review dimensions - may not meet code'}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Building Code Standards</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>Rise:</strong> {unit === 'imperial' ? '4-7.75 inches' : '10-20 cm'} per step
              </p>
              <p>
                • <strong>Run:</strong> Minimum {unit === 'imperial' ? '10 inches' : '25 cm'} per tread
              </p>
              <p>
                • <strong>Angle:</strong> Typically 30-40° for comfortable stairs
              </p>
              <p>
                • Always check local building codes before construction
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StairCalculator;
