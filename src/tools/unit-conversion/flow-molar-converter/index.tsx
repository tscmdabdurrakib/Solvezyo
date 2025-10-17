import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FlaskConical, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to mol/s as base unit)
const conversionFactors = {
  "mol/s": 1,
  "mol/min": 1/60,
  "mol/h": 1/3600,
  "mol/day": 1/86400,
  "kmol/s": 1000,
  "kmol/min": 1000/60,
  "kmol/h": 1000/3600,
  "kmol/day": 1000/86400,
  "mmol/s": 0.001,
  "mmol/min": 0.001/60,
  "mmol/h": 0.001/3600,
  "μmol/s": 0.000001,
  "μmol/min": 0.000001/60,
  "μmol/h": 0.000001/3600,
  "lb-mol/s": 453.592,
  "lb-mol/min": 453.592/60,
  "lb-mol/h": 453.592/3600,
};

// Unit display names with abbreviations
const unitLabels = {
  "mol/s": "Mole per Second (mol/s)",
  "mol/min": "Mole per Minute (mol/min)",
  "mol/h": "Mole per Hour (mol/h)",
  "mol/day": "Mole per Day (mol/day)",
  "kmol/s": "Kilomole per Second (kmol/s)",
  "kmol/min": "Kilomole per Minute (kmol/min)",
  "kmol/h": "Kilomole per Hour (kmol/h)",
  "kmol/day": "Kilomole per Day (kmol/day)",
  "mmol/s": "Millimole per Second (mmol/s)",
  "mmol/min": "Millimole per Minute (mmol/min)",
  "mmol/h": "Millimole per Hour (mmol/h)",
  "μmol/s": "Micromole per Second (μmol/s)",
  "μmol/min": "Micromole per Minute (μmol/min)",
  "μmol/h": "Micromole per Hour (μmol/h)",
  "lb-mol/s": "Pound-mole per Second (lb-mol/s)",
  "lb-mol/min": "Pound-mole per Minute (lb-mol/min)",
  "lb-mol/h": "Pound-mole per Hour (lb-mol/h)",
};

// Type for Flow Molar units
type FlowMolarUnit = keyof typeof conversionFactors;

/**
 * Flow - Molar Converter Component
 * Allows users to convert between different molar flow rate units
 */
export default function FlowMolarConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<FlowMolarUnit>('mol/s');
  const [toUnit, setToUnit] = useState<FlowMolarUnit>('mol/min');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertFlowMolar();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one molar flow rate unit to another
   */
  const convertFlowMolar = () => {
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
    // First convert to mol/s (base unit), then to target unit
    const inMolPerSecond = value * conversionFactors[fromUnit];
    const converted = inMolPerSecond / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.000001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.001) {
      return num.toFixed(8);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(3);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(2);
    } else {
      return num.toFixed(1);
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
    setFromUnit('mol/s');
    setToUnit('mol/min');
    setResult('');
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl text-white shadow-lg">
              <FlaskConical size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Flow - Molar Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different molar flow rate units for chemical process engineering and laboratory applications
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <Info className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Value
                </label>
                <Input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value to convert"
                  className="w-full text-lg"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value: FlowMolarUnit) => setFromUnit(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
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
              <div className="md:col-span-2 flex justify-center">
                <motion.div
                  animate={{ rotate: swapAnimation ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    title="Swap units"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  To
                </label>
                <Select value={toUnit} onValueChange={(value: FlowMolarUnit) => setToUnit(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
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

          {/* Result Section */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Result</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 break-all">
                {result || '0'} {unitLabels[toUnit].split('(')[1]?.replace(')', '') || toUnit}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={resetConverter}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t bg-gray-50/50 dark:bg-gray-800/50">
          <div className="w-full text-center text-xs text-gray-500 dark:text-gray-400">
            <p>Common conversions: 1 mol/s = 60 mol/min = 3,600 mol/h = 1,000 mmol/s</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
