import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Beaker, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to mol/m³ as base unit)
const conversionFactors = {
  "mol/m³": 1,
  "mol/L": 1000,
  "mol/mL": 1000000,
  "mol/dL": 10000,
  "mmol/L": 1,
  "mmol/mL": 1000,
  "μmol/L": 0.001,
  "μmol/mL": 1,
  "kmol/m³": 1000,
  "M": 1000, // Molar (mol/L)
  "mM": 1, // Millimolar (mmol/L)
  "μM": 0.001, // Micromolar (μmol/L)
  "nM": 0.000001, // Nanomolar (nmol/L)
  "pM": 0.000000001, // Picomolar (pmol/L)
  "N": 1000, // Normal (equivalent/L, assuming monovalent)
  "eq/L": 1000, // Equivalent per liter
  "meq/L": 1, // Milliequivalent per liter
  "osmol/L": 1000, // Osmolar
  "mOsmol/L": 1, // Milliosmolar
};

// Unit display names with abbreviations
const unitLabels = {
  "mol/m³": "Mole per Cubic Meter (mol/m³)",
  "mol/L": "Mole per Liter (mol/L)",
  "mol/mL": "Mole per Milliliter (mol/mL)",
  "mol/dL": "Mole per Deciliter (mol/dL)",
  "mmol/L": "Millimole per Liter (mmol/L)",
  "mmol/mL": "Millimole per Milliliter (mmol/mL)",
  "μmol/L": "Micromole per Liter (μmol/L)",
  "μmol/mL": "Micromole per Milliliter (μmol/mL)",
  "kmol/m³": "Kilomole per Cubic Meter (kmol/m³)",
  "M": "Molar (M)",
  "mM": "Millimolar (mM)",
  "μM": "Micromolar (μM)",
  "nM": "Nanomolar (nM)",
  "pM": "Picomolar (pM)",
  "N": "Normal (N)",
  "eq/L": "Equivalent per Liter (eq/L)",
  "meq/L": "Milliequivalent per Liter (meq/L)",
  "osmol/L": "Osmolar (osmol/L)",
  "mOsmol/L": "Milliosmolar (mOsmol/L)",
};

// Type for Concentration Molar units
type ConcentrationMolarUnit = keyof typeof conversionFactors;

/**
 * Concentration - Molar Converter Component
 * Allows users to convert between different molar concentration units
 */
export default function ConcentrationMolarConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<ConcentrationMolarUnit>('mol/L');
  const [toUnit, setToUnit] = useState<ConcentrationMolarUnit>('mmol/L');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertConcentrationMolar();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one molar concentration unit to another
   */
  const convertConcentrationMolar = () => {
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
    // First convert to mol/m³ (base unit), then to target unit
    const inBaseUnit = value * conversionFactors[fromUnit];
    const converted = inBaseUnit / conversionFactors[toUnit];

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
    setFromUnit('mol/L');
    setToUnit('mmol/L');
    setResult('');
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white shadow-lg">
              <Beaker size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Concentration - Molar Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different molar concentration units for chemistry and biochemistry applications
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
                <Select value={fromUnit} onValueChange={(value: ConcentrationMolarUnit) => setFromUnit(value)}>
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
                <Select value={toUnit} onValueChange={(value: ConcentrationMolarUnit) => setToUnit(value)}>
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
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-100 dark:border-green-800">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Result</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 break-all">
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
            <p>Common conversions: 1 M = 1 mol/L = 1,000 mmol/L = 1,000,000 μmol/L</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
