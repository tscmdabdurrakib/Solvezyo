import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Wind, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to kg/(m²·s) as base unit)
const conversionFactors = {
  "kg/(m²·s)": 1,
  "g/(m²·s)": 0.001,
  "g/(cm²·s)": 10,
  "kg/(m²·min)": 1/60,
  "kg/(m²·h)": 1/3600,
  "g/(m²·min)": 0.001/60,
  "g/(m²·h)": 0.001/3600,
  "mg/(m²·s)": 0.000001,
  "mg/(cm²·s)": 0.01,
  "lb/(ft²·s)": 4.88243,
  "lb/(ft²·min)": 4.88243/60,
  "lb/(ft²·h)": 4.88243/3600,
  "oz/(ft²·s)": 4.88243/16,
  "oz/(ft²·min)": 4.88243/(16*60),
  "t/(m²·h)": 1000/3600,
  "t/(m²·day)": 1000/86400,
};

// Unit display names with abbreviations
const unitLabels = {
  "kg/(m²·s)": "Kilogram per Square Meter per Second (kg/(m²·s))",
  "g/(m²·s)": "Gram per Square Meter per Second (g/(m²·s))",
  "g/(cm²·s)": "Gram per Square Centimeter per Second (g/(cm²·s))",
  "kg/(m²·min)": "Kilogram per Square Meter per Minute (kg/(m²·min))",
  "kg/(m²·h)": "Kilogram per Square Meter per Hour (kg/(m²·h))",
  "g/(m²·min)": "Gram per Square Meter per Minute (g/(m²·min))",
  "g/(m²·h)": "Gram per Square Meter per Hour (g/(m²·h))",
  "mg/(m²·s)": "Milligram per Square Meter per Second (mg/(m²·s))",
  "mg/(cm²·s)": "Milligram per Square Centimeter per Second (mg/(cm²·s))",
  "lb/(ft²·s)": "Pound per Square Foot per Second (lb/(ft²·s))",
  "lb/(ft²·min)": "Pound per Square Foot per Minute (lb/(ft²·min))",
  "lb/(ft²·h)": "Pound per Square Foot per Hour (lb/(ft²·h))",
  "oz/(ft²·s)": "Ounce per Square Foot per Second (oz/(ft²·s))",
  "oz/(ft²·min)": "Ounce per Square Foot per Minute (oz/(ft²·min))",
  "t/(m²·h)": "Tonne per Square Meter per Hour (t/(m²·h))",
  "t/(m²·day)": "Tonne per Square Meter per Day (t/(m²·day))",
};

// Type for Mass Flux Density units
type MassFluxDensityUnit = keyof typeof conversionFactors;

/**
 * Mass Flux Density Converter Component
 * Allows users to convert between different mass flux density units
 */
export default function MassFluxDensityConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<MassFluxDensityUnit>('kg/(m²·s)');
  const [toUnit, setToUnit] = useState<MassFluxDensityUnit>('g/(m²·s)');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertMassFluxDensity();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one mass flux density unit to another
   */
  const convertMassFluxDensity = () => {
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
    // First convert to kg/(m²·s) (base unit), then to target unit
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
    setFromUnit('kg/(m²·s)');
    setToUnit('g/(m²·s)');
    setResult('');
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white shadow-lg">
              <Wind size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Mass Flux Density Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different mass flux density units for engineering and physics applications
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
                <Select value={fromUnit} onValueChange={(value: MassFluxDensityUnit) => setFromUnit(value)}>
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
                <Select value={toUnit} onValueChange={(value: MassFluxDensityUnit) => setToUnit(value)}>
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
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-100 dark:border-purple-800">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Result</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 break-all">
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
            <p>Common conversions: 1 kg/(m²·s) = 1,000 g/(m²·s) = 0.2048 lb/(ft²·s)</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
