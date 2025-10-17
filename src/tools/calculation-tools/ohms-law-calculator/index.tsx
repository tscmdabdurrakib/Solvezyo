import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Zap, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * OhmsLawCalculator Component
 * 
 * Calculate Voltage, Current, Resistance, or Power using Ohm's Law
 */
export function OhmsLawCalculator() {
  const { toast } = useToast();

  // State for inputs (null means not provided)
  const [voltage, setVoltage] = useState<number | ''>(''); // V
  const [current, setCurrent] = useState<number | ''>(''); // I (Amperes)
  const [resistance, setResistance] = useState<number | ''>(''); // R (Ohms)
  const [power, setPower] = useState<number | ''>(''); // P (Watts)
  
  // State for calculated results
  const [calculatedVoltage, setCalculatedVoltage] = useState<number>(0);
  const [calculatedCurrent, setCalculatedCurrent] = useState<number>(0);
  const [calculatedResistance, setCalculatedResistance] = useState<number>(0);
  const [calculatedPower, setCalculatedPower] = useState<number>(0);
  const [canCalculate, setCanCalculate] = useState<boolean>(false);

  // Calculate when inputs change
  useEffect(() => {
    calculateOhmsLaw();
  }, [voltage, current, resistance, power]);

  // Function to calculate using Ohm's Law
  const calculateOhmsLaw = () => {
    // Count how many values are provided
    const provided = [voltage, current, resistance, power].filter(v => v !== '' && v > 0).length;
    
    if (provided < 2) {
      setCanCalculate(false);
      return;
    }
    
    setCanCalculate(true);
    
    const V = typeof voltage === 'number' ? voltage : 0;
    const I = typeof current === 'number' ? current : 0;
    const R = typeof resistance === 'number' ? resistance : 0;
    const P = typeof power === 'number' ? power : 0;

    // Ohm's Law: V = I × R
    // Power: P = V × I = I² × R = V² / R

    // Calculate Voltage
    if (voltage === '' || voltage === 0) {
      if (I > 0 && R > 0) {
        setCalculatedVoltage(I * R);
      } else if (P > 0 && I > 0) {
        setCalculatedVoltage(P / I);
      } else if (P > 0 && R > 0) {
        setCalculatedVoltage(Math.sqrt(P * R));
      }
    } else {
      setCalculatedVoltage(V);
    }

    // Calculate Current
    if (current === '' || current === 0) {
      if (V > 0 && R > 0) {
        setCalculatedCurrent(V / R);
      } else if (P > 0 && V > 0) {
        setCalculatedCurrent(P / V);
      } else if (P > 0 && R > 0) {
        setCalculatedCurrent(Math.sqrt(P / R));
      }
    } else {
      setCalculatedCurrent(I);
    }

    // Calculate Resistance
    if (resistance === '' || resistance === 0) {
      if (V > 0 && I > 0) {
        setCalculatedResistance(V / I);
      } else if (V > 0 && P > 0) {
        setCalculatedResistance(Math.pow(V, 2) / P);
      } else if (P > 0 && I > 0) {
        setCalculatedResistance(P / Math.pow(I, 2));
      }
    } else {
      setCalculatedResistance(R);
    }

    // Calculate Power
    if (power === '' || power === 0) {
      if (V > 0 && I > 0) {
        setCalculatedPower(V * I);
      } else if (I > 0 && R > 0) {
        setCalculatedPower(Math.pow(I, 2) * R);
      } else if (V > 0 && R > 0) {
        setCalculatedPower(Math.pow(V, 2) / R);
      }
    } else {
      setCalculatedPower(P);
    }
  };

  // Function to reset all values
  const handleReset = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setCalculatedVoltage(0);
    setCalculatedCurrent(0);
    setCalculatedResistance(0);
    setCalculatedPower(0);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Ohm's Law Calculation:
Voltage (V): ${calculatedVoltage.toFixed(3)} V
Current (I): ${calculatedCurrent.toFixed(3)} A
Resistance (R): ${calculatedResistance.toFixed(3)} Ω
Power (P): ${calculatedPower.toFixed(3)} W

Formulas Used:
V = I × R
P = V × I
P = I² × R
P = V² / R`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Ohm's Law calculations copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Ohm's Law Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate Voltage, Current, Resistance, or Power - enter any two values
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 h-5 w-5" /> Electrical Values
          </h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                Enter any two values to calculate the rest
              </p>
            </div>

            {/* Voltage */}
            <div>
              <Label htmlFor="voltage">Voltage (V) - Volts</Label>
              <div className="relative mt-1.5">
                <Zap className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="voltage"
                  type="number"
                  step="0.001"
                  className="pl-10"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Enter voltage"
                />
              </div>
            </div>

            {/* Current */}
            <div>
              <Label htmlFor="current">Current (I) - Amperes</Label>
              <div className="relative mt-1.5">
                <Zap className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="current"
                  type="number"
                  step="0.001"
                  className="pl-10"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Enter current"
                />
              </div>
            </div>

            {/* Resistance */}
            <div>
              <Label htmlFor="resistance">Resistance (R) - Ohms (Ω)</Label>
              <div className="relative mt-1.5">
                <Zap className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="resistance"
                  type="number"
                  step="0.001"
                  className="pl-10"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Enter resistance"
                />
              </div>
            </div>

            {/* Power */}
            <div>
              <Label htmlFor="power">Power (P) - Watts</Label>
              <div className="relative mt-1.5">
                <Zap className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="power"
                  type="number"
                  step="0.001"
                  className="pl-10"
                  value={power}
                  onChange={(e) => setPower(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Enter power"
                />
              </div>
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
                  <h2 className="text-xl font-semibold">Calculated Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm" disabled={!canCalculate}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                {canCalculate ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Voltage (V)
                      </h3>
                      <div className="mt-1 text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {calculatedVoltage.toFixed(3)} V
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Current (I)
                      </h3>
                      <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {calculatedCurrent.toFixed(3)} A
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                        Resistance (R)
                      </h3>
                      <div className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                        {calculatedResistance.toFixed(3)} Ω
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                        Power (P)
                      </h3>
                      <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {calculatedPower.toFixed(3)} W
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Zap className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      Enter at least two values to calculate
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Ohm's Law Formulas</h3>
            <div className="space-y-2 text-sm text-muted-foreground font-mono">
              <p>V = I × R</p>
              <p>I = V / R</p>
              <p>R = V / I</p>
              <p>P = V × I</p>
              <p>P = I² × R</p>
              <p>P = V² / R</p>
            </div>
            <div className="mt-4 pt-4 border-t space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>V</strong> = Voltage in Volts
              </p>
              <p>
                • <strong>I</strong> = Current in Amperes
              </p>
              <p>
                • <strong>R</strong> = Resistance in Ohms
              </p>
              <p>
                • <strong>P</strong> = Power in Watts
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OhmsLawCalculator;
