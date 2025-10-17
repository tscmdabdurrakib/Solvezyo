import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TestTube, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to kg/m³ as base unit)
const conversionFactors = {
  "kg/m³": 1,
  "g/L": 1,
  "g/mL": 1000,
  "g/dL": 10,
  "mg/L": 0.001,
  "mg/mL": 1,
  "mg/dL": 0.01,
  "μg/L": 0.000001,
  "μg/mL": 0.001,
  "μg/dL": 0.00001,
  "ng/mL": 0.000001,
  "pg/mL": 0.000000001,
  "ppm": 0.001, // parts per million (mg/L)
  "ppb": 0.000001, // parts per billion (μg/L)
  "ppt": 0.000000001, // parts per trillion (ng/L)
  "%w/v": 10, // percent weight/volume (1% = 10 g/L)
  "%w/w": 10, // percent weight/weight (assumed density = 1 kg/L)
  "lb/gal": 119.826, // pound per gallon
  "oz/gal": 7.489, // ounce per gallon
  "gr/gal": 0.017118, // grain per gallon
};

// Unit display names with abbreviations
const unitLabels = {
  "kg/m³": "Kilogram per Cubic Meter (kg/m³)",
  "g/L": "Gram per Liter (g/L)",
  "g/mL": "Gram per Milliliter (g/mL)",
  "g/dL": "Gram per Deciliter (g/dL)",
  "mg/L": "Milligram per Liter (mg/L)",
  "mg/mL": "Milligram per Milliliter (mg/mL)",
  "mg/dL": "Milligram per Deciliter (mg/dL)",
  "μg/L": "Microgram per Liter (μg/L)",
  "μg/mL": "Microgram per Milliliter (μg/mL)",
  "μg/dL": "Microgram per Deciliter (μg/dL)",
  "ng/mL": "Nanogram per Milliliter (ng/mL)",
  "pg/mL": "Picogram per Milliliter (pg/mL)",
  "ppm": "Parts per Million (ppm)",
  "ppb": "Parts per Billion (ppb)",
  "ppt": "Parts per Trillion (ppt)",
  "%w/v": "Percent Weight/Volume (%w/v)",
  "%w/w": "Percent Weight/Weight (%w/w)",
  "lb/gal": "Pound per Gallon (lb/gal)",
  "oz/gal": "Ounce per Gallon (oz/gal)",
  "gr/gal": "Grain per Gallon (gr/gal)",
};

// Type for Concentration Solution units
type ConcentrationSolutionUnit = keyof typeof conversionFactors;

/**
 * Concentration - Solution Converter Component
 * Allows users to convert between different solution concentration units
 */
export default function ConcentrationSolutionConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<ConcentrationSolutionUnit>('g/L');
  const [toUnit, setToUnit] = useState<ConcentrationSolutionUnit>('mg/L');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertConcentrationSolution();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one solution concentration unit to another
   */
  const convertConcentrationSolution = () => {
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
    // First convert to kg/m³ (base unit), then to target unit
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
    setFromUnit('g/L');
    setToUnit('mg/L');
    setResult('');
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl text-white shadow-lg">
              <TestTube size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Concentration - Solution Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different solution concentration units for analytical chemistry and laboratory work
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
                <Select value={fromUnit} onValueChange={(value: ConcentrationSolutionUnit) => setFromUnit(value)}>
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
                <Select value={toUnit} onValueChange={(value: ConcentrationSolutionUnit) => setToUnit(value)}>
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
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg p-6 border border-teal-100 dark:border-teal-800">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Result</p>
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400 break-all">
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
            <p>Common conversions: 1 g/L = 1000 ppm = 1,000 mg/L = 1,000,000 μg/L (for water-like density)</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
