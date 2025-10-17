import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Square, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to A/m as base unit)
const conversionFactors = {
  "A/m": 1, // Ampere per meter (base unit)
  "A/cm": 100, // Ampere per centimeter
  "A/mm": 1000, // Ampere per millimeter
  "A/km": 0.001, // Ampere per kilometer
  "A/in": 39.3701, // Ampere per inch
  "A/ft": 3.28084, // Ampere per foot
  "mA/m": 0.001, // Milliampere per meter
  "mA/cm": 0.1, // Milliampere per centimeter
  "mA/mm": 1, // Milliampere per millimeter
  "mA/in": 0.0393701, // Milliampere per inch
  "mA/ft": 0.00328084, // Milliampere per foot
  "μA/m": 0.000001, // Microampere per meter
  "μA/cm": 0.0001, // Microampere per centimeter
  "μA/mm": 0.001, // Microampere per millimeter
  "μA/in": 0.0000393701, // Microampere per inch
  "μA/ft": 0.00000328084, // Microampere per foot
  "kA/m": 1000, // Kiloampere per meter
  "kA/cm": 100000, // Kiloampere per centimeter
  "kA/mm": 1000000, // Kiloampere per millimeter
  "kA/in": 39370.1, // Kiloampere per inch
  "kA/ft": 3280.84, // Kiloampere per foot
  "abA/cm": 1000, // Abampere per centimeter (EMU unit)
  "statA/cm": 3.335641e-8, // Statampere per centimeter (CGS unit)
};

// Unit display names with abbreviations
const unitLabels = {
  "A/m": "Ampere per meter (A/m)",
  "A/cm": "Ampere per centimeter (A/cm)",
  "A/mm": "Ampere per millimeter (A/mm)",
  "A/km": "Ampere per kilometer (A/km)",
  "A/in": "Ampere per inch (A/in)",
  "A/ft": "Ampere per foot (A/ft)",
  "mA/m": "Milliampere per meter (mA/m)",
  "mA/cm": "Milliampere per centimeter (mA/cm)",
  "mA/mm": "Milliampere per millimeter (mA/mm)",
  "mA/in": "Milliampere per inch (mA/in)",
  "mA/ft": "Milliampere per foot (mA/ft)",
  "μA/m": "Microampere per meter (μA/m)",
  "μA/cm": "Microampere per centimeter (μA/cm)",
  "μA/mm": "Microampere per millimeter (μA/mm)",
  "μA/in": "Microampere per inch (μA/in)",
  "μA/ft": "Microampere per foot (μA/ft)",
  "kA/m": "Kiloampere per meter (kA/m)",
  "kA/cm": "Kiloampere per centimeter (kA/cm)",
  "kA/mm": "Kiloampere per millimeter (kA/mm)",
  "kA/in": "Kiloampere per inch (kA/in)",
  "kA/ft": "Kiloampere per foot (kA/ft)",
  "abA/cm": "Abampere per centimeter (abA/cm)",
  "statA/cm": "Statampere per centimeter (statA/cm)",
};

// Type for Surface Current Density units
type SurfaceCurrentDensityUnit = keyof typeof conversionFactors;

/**
 * Surface Current Density Converter Component
 * Allows users to convert between different surface current density units
 */
export default function SurfaceCurrentDensityConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<SurfaceCurrentDensityUnit>('A/m');
  const [toUnit, setToUnit] = useState<SurfaceCurrentDensityUnit>('mA/cm');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertSurfaceCurrentDensity();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one surface current density unit to another
   */
  const convertSurfaceCurrentDensity = () => {
    // Clear previous errors
    setError(null);

    // If input is empty, clear the result
    if (!inputValue) {
      setResult('');
      return;
    }

    // Parse the input value
    const value = parseFloat(inputValue);

    // Validate the input is a number
    if (isNaN(value)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to A/m (base unit), then to target unit
    const inAPerM = value * conversionFactors[fromUnit];
    const converted = inAPerM / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (Math.abs(num) < 1e-15) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.0001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(8);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(2);
    } else if (Math.abs(num) > 1e6) {
      return num.toExponential(6);
    } else {
      return num.toFixed(0);
    }
  };

  /**
   * Swap the from and to units
   */
  const swapUnits = () => {
    setSwapAnimation(true);
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    
    // Reset animation state after animation completes
    setTimeout(() => setSwapAnimation(false), 500);
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setInputValue('');
    setFromUnit('A/m');
    setToUnit('mA/cm');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg" data-testid="card-surface-current-density-converter">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Square className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Surface Current Density Converter</CardTitle>
            <CardDescription>
              Convert between different surface current density units (current per unit width)
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="density-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="density-value"
                data-testid="input-density-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter current density"
                className="w-full"
                step="any"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as SurfaceCurrentDensityUnit)}>
                  <SelectTrigger id="from-unit" data-testid="select-from-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitLabels).map(([unit, label]) => (
                      <SelectItem key={unit} value={unit}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center items-center sm:col-span-1">
                <motion.div
                  animate={{ rotate: swapAnimation ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full h-10 w-10 bg-muted hover:bg-primary/10"
                    data-testid="button-swap-units"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="sr-only">Swap units</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="to-unit" className="block text-sm font-medium mb-2">
                  To
                </label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as SurfaceCurrentDensityUnit)}>
                  <SelectTrigger id="to-unit" data-testid="select-to-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitLabels).map(([unit, label]) => (
                      <SelectItem key={unit} value={unit}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conversion Result */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold" data-testid="text-result">
                {result ? (
                  <>
                    {result} <span className="text-lg font-normal">{unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1]}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground text-lg">— Enter a value to convert —</span>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" data-testid="alert-error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Conversion Formula Display */}
          {result && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} ${unitLabels[fromUnit]?.match(/\(([^)]+)\)/)?.[1]} = ${result} ${unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1]}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {`1 ${unitLabels[fromUnit]?.match(/\(([^)]+)\)/)?.[1]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toExponential(6)} ${unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1]}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Formula and Applications */}
          {result && (
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Surface Current Density:</h4>
              <div className="text-xs space-y-1">
                <div>Formula: K = I/w (current per unit width)</div>
                <div>Applications: Sheet currents, conductor surfaces, boundary conditions</div>
                <div>Boundary condition: n̂ × (H₁ - H₂) = K</div>
                <div>Used in electromagnetic field analysis at interfaces</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
          data-testid="button-reset"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Accurate conversions between surface current density units
        </div>
      </CardFooter>
    </Card>
  );
}
