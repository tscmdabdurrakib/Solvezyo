import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Ruler, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to C/m as base unit)
const conversionFactors = {
  "C/m": 1, // Coulomb per meter (base unit)
  "C/cm": 100, // Coulomb per centimeter
  "C/mm": 1000, // Coulomb per millimeter
  "C/km": 0.001, // Coulomb per kilometer
  "mC/m": 0.001, // Millicoulomb per meter
  "mC/cm": 0.1, // Millicoulomb per centimeter
  "mC/mm": 1, // Millicoulomb per millimeter
  "μC/m": 0.000001, // Microcoulomb per meter
  "μC/cm": 0.0001, // Microcoulomb per centimeter
  "μC/mm": 0.001, // Microcoulomb per millimeter
  "nC/m": 0.000000001, // Nanocoulomb per meter
  "nC/cm": 0.0000001, // Nanocoulomb per centimeter
  "nC/mm": 0.000001, // Nanocoulomb per millimeter
  "pC/m": 0.000000000001, // Picocoulomb per meter
  "pC/cm": 0.0000000001, // Picocoulomb per centimeter
  "pC/mm": 0.000000001, // Picocoulomb per millimeter
  "e/m": 1.602176634e-19, // Elementary charges per meter
  "e/cm": 1.602176634e-17, // Elementary charges per centimeter
  "e/mm": 1.602176634e-16, // Elementary charges per millimeter
};

// Unit display names with abbreviations
const unitLabels = {
  "C/m": "Coulomb per meter (C/m)",
  "C/cm": "Coulomb per centimeter (C/cm)",
  "C/mm": "Coulomb per millimeter (C/mm)",
  "C/km": "Coulomb per kilometer (C/km)",
  "mC/m": "Millicoulomb per meter (mC/m)",
  "mC/cm": "Millicoulomb per centimeter (mC/cm)",
  "mC/mm": "Millicoulomb per millimeter (mC/mm)",
  "μC/m": "Microcoulomb per meter (μC/m)",
  "μC/cm": "Microcoulomb per centimeter (μC/cm)",
  "μC/mm": "Microcoulomb per millimeter (μC/mm)",
  "nC/m": "Nanocoulomb per meter (nC/m)",
  "nC/cm": "Nanocoulomb per centimeter (nC/cm)",
  "nC/mm": "Nanocoulomb per millimeter (nC/mm)",
  "pC/m": "Picocoulomb per meter (pC/m)",
  "pC/cm": "Picocoulomb per centimeter (pC/cm)",
  "pC/mm": "Picocoulomb per millimeter (pC/mm)",
  "e/m": "Elementary charges per meter (e/m)",
  "e/cm": "Elementary charges per centimeter (e/cm)",
  "e/mm": "Elementary charges per millimeter (e/mm)",
};

// Type for Linear Charge Density units
type LinearChargeDensityUnit = keyof typeof conversionFactors;

/**
 * Linear Charge Density Converter Component
 * Allows users to convert between different linear charge density units
 */
export default function LinearChargeDensityConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<LinearChargeDensityUnit>('C/m');
  const [toUnit, setToUnit] = useState<LinearChargeDensityUnit>('mC/m');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertLinearChargeDensity();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one linear charge density unit to another
   */
  const convertLinearChargeDensity = () => {
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
    // First convert to C/m (base unit), then to target unit
    const inCPerM = value * conversionFactors[fromUnit];
    const converted = inCPerM / conversionFactors[toUnit];

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
    setFromUnit('C/m');
    setToUnit('mC/m');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg" data-testid="card-linear-charge-density-converter">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Ruler className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Linear Charge Density Converter</CardTitle>
            <CardDescription>
              Convert between different linear charge density units (charge per unit length)
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
                placeholder="Enter charge density"
                className="w-full"
                step="any"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as LinearChargeDensityUnit)}>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as LinearChargeDensityUnit)}>
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
              <h4 className="font-medium mb-2">Linear Charge Density:</h4>
              <div className="text-xs space-y-1">
                <div>Formula: λ = Q/L (charge per unit length)</div>
                <div>Applications: Wire charges, rod charges, line charges</div>
                <div>Electric field from infinite line charge: E = λ/(2πε₀r)</div>
                <div>Elementary charge: e = 1.602176634 × 10⁻¹⁹ C</div>
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
          Accurate conversions between linear charge density units
        </div>
      </CardFooter>
    </Card>
  );
}
