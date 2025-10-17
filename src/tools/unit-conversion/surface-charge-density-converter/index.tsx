import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Layers, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to C/m² as base unit)
const conversionFactors = {
  "C/m2": 1, // Coulomb per square meter (base unit)
  "C/cm2": 10000, // Coulomb per square centimeter
  "C/mm2": 1000000, // Coulomb per square millimeter
  "C/km2": 0.000001, // Coulomb per square kilometer
  "mC/m2": 0.001, // Millicoulomb per square meter
  "mC/cm2": 10, // Millicoulomb per square centimeter
  "mC/mm2": 1000, // Millicoulomb per square millimeter
  "μC/m2": 0.000001, // Microcoulomb per square meter
  "μC/cm2": 0.01, // Microcoulomb per square centimeter
  "μC/mm2": 1, // Microcoulomb per square millimeter
  "nC/m2": 0.000000001, // Nanocoulomb per square meter
  "nC/cm2": 0.00001, // Nanocoulomb per square centimeter
  "nC/mm2": 0.001, // Nanocoulomb per square millimeter
  "pC/m2": 0.000000000001, // Picocoulomb per square meter
  "pC/cm2": 0.00000001, // Picocoulomb per square centimeter
  "pC/mm2": 0.000001, // Picocoulomb per square millimeter
  "e/m2": 1.602176634e-19, // Elementary charges per square meter
  "e/cm2": 1.602176634e-15, // Elementary charges per square centimeter
  "e/mm2": 1.602176634e-13, // Elementary charges per square millimeter
};

// Unit display names with abbreviations
const unitLabels = {
  "C/m2": "Coulomb per square meter (C/m²)",
  "C/cm2": "Coulomb per square centimeter (C/cm²)",
  "C/mm2": "Coulomb per square millimeter (C/mm²)",
  "C/km2": "Coulomb per square kilometer (C/km²)",
  "mC/m2": "Millicoulomb per square meter (mC/m²)",
  "mC/cm2": "Millicoulomb per square centimeter (mC/cm²)",
  "mC/mm2": "Millicoulomb per square millimeter (mC/mm²)",
  "μC/m2": "Microcoulomb per square meter (μC/m²)",
  "μC/cm2": "Microcoulomb per square centimeter (μC/cm²)",
  "μC/mm2": "Microcoulomb per square millimeter (μC/mm²)",
  "nC/m2": "Nanocoulomb per square meter (nC/m²)",
  "nC/cm2": "Nanocoulomb per square centimeter (nC/cm²)",
  "nC/mm2": "Nanocoulomb per square millimeter (nC/mm²)",
  "pC/m2": "Picocoulomb per square meter (pC/m²)",
  "pC/cm2": "Picocoulomb per square centimeter (pC/cm²)",
  "pC/mm2": "Picocoulomb per square millimeter (pC/mm²)",
  "e/m2": "Elementary charges per square meter (e/m²)",
  "e/cm2": "Elementary charges per square centimeter (e/cm²)",
  "e/mm2": "Elementary charges per square millimeter (e/mm²)",
};

// Type for Surface Charge Density units
type SurfaceChargeDensityUnit = keyof typeof conversionFactors;

/**
 * Surface Charge Density Converter Component
 * Allows users to convert between different surface charge density units
 */
export default function SurfaceChargeDensityConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<SurfaceChargeDensityUnit>('C/m2');
  const [toUnit, setToUnit] = useState<SurfaceChargeDensityUnit>('μC/cm2');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertSurfaceChargeDensity();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one surface charge density unit to another
   */
  const convertSurfaceChargeDensity = () => {
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
    // First convert to C/m² (base unit), then to target unit
    const inCPerM2 = value * conversionFactors[fromUnit];
    const converted = inCPerM2 / conversionFactors[toUnit];

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
    setFromUnit('C/m2');
    setToUnit('μC/cm2');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg" data-testid="card-surface-charge-density-converter">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Layers className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Surface Charge Density Converter</CardTitle>
            <CardDescription>
              Convert between different surface charge density units (charge per unit area)
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
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as SurfaceChargeDensityUnit)}>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as SurfaceChargeDensityUnit)}>
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
              <h4 className="font-medium mb-2">Surface Charge Density:</h4>
              <div className="text-xs space-y-1">
                <div>Formula: σ = Q/A (charge per unit area)</div>
                <div>Applications: Capacitor plates, conductor surfaces, electrostatic fields</div>
                <div>Electric field near conductor: E = σ/ε₀</div>
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
          Accurate conversions between surface charge density units
        </div>
      </CardFooter>
    </Card>
  );
}
