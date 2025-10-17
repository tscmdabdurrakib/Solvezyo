import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Droplets, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to Pa·s as base unit)
const conversionFactors = {
  "Pa·s": 1,
  "mPa·s": 0.001,
  "μPa·s": 0.000001,
  "cP": 0.001, // centipoise
  "P": 0.1, // poise
  "dPa·s": 0.1, // decipascal second
  "N·s/m²": 1,
  "kg/(m·s)": 1,
  "g/(cm·s)": 0.1,
  "dyn·s/cm²": 0.1,
  "slug/(ft·s)": 47.8803,
  "lbf·s/ft²": 47.8803,
  "lb/(ft·s)": 1.48816,
  "lb/(ft·h)": 1.48816/3600,
  "reyn": 6894.76, // pound-force second per square inch
  "lbf·s/in²": 6894.76,
  "oz·s/in²": 6894.76/16,
  "kgf·s/m²": 9.80665,
  "gf·s/cm²": 0.0980665,
};

// Unit display names with abbreviations
const unitLabels = {
  "Pa·s": "Pascal Second (Pa·s)",
  "mPa·s": "Millipascal Second (mPa·s)",
  "μPa·s": "Micropascal Second (μPa·s)",
  "cP": "Centipoise (cP)",
  "P": "Poise (P)",
  "dPa·s": "Decipascal Second (dPa·s)",
  "N·s/m²": "Newton Second per Square Meter (N·s/m²)",
  "kg/(m·s)": "Kilogram per Meter per Second (kg/(m·s))",
  "g/(cm·s)": "Gram per Centimeter per Second (g/(cm·s))",
  "dyn·s/cm²": "Dyne Second per Square Centimeter (dyn·s/cm²)",
  "slug/(ft·s)": "Slug per Foot per Second (slug/(ft·s))",
  "lbf·s/ft²": "Pound-force Second per Square Foot (lbf·s/ft²)",
  "lb/(ft·s)": "Pound per Foot per Second (lb/(ft·s))",
  "lb/(ft·h)": "Pound per Foot per Hour (lb/(ft·h))",
  "reyn": "Reyn (reyn)",
  "lbf·s/in²": "Pound-force Second per Square Inch (lbf·s/in²)",
  "oz·s/in²": "Ounce Second per Square Inch (oz·s/in²)",
  "kgf·s/m²": "Kilogram-force Second per Square Meter (kgf·s/m²)",
  "gf·s/cm²": "Gram-force Second per Square Centimeter (gf·s/cm²)",
};

// Type for Viscosity Dynamic units
type ViscosityDynamicUnit = keyof typeof conversionFactors;

/**
 * Viscosity - Dynamic Converter Component
 * Allows users to convert between different dynamic viscosity units
 */
export default function ViscosityDynamicConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<ViscosityDynamicUnit>('Pa·s');
  const [toUnit, setToUnit] = useState<ViscosityDynamicUnit>('cP');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertViscosityDynamic();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one dynamic viscosity unit to another
   */
  const convertViscosityDynamic = () => {
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
    // First convert to Pa·s (base unit), then to target unit
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
    setFromUnit('Pa·s');
    setToUnit('cP');
    setResult('');
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white shadow-lg">
              <Droplets size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Viscosity - Dynamic Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different dynamic viscosity units for fluid mechanics and engineering applications
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
                <Select value={fromUnit} onValueChange={(value: ViscosityDynamicUnit) => setFromUnit(value)}>
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
                <Select value={toUnit} onValueChange={(value: ViscosityDynamicUnit) => setToUnit(value)}>
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
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Result</p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 break-all">
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
            <p>Common conversions: 1 Pa·s = 1,000 cP = 10 P = 1 N·s/m²</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
