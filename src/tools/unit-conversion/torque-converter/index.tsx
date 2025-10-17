import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Wrench, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to N⋅m as base unit)
const conversionFactors = {
  "newton-meter": 1,
  "kilonewton-meter": 1000,
  "pound-foot": 1.35582,
  "pound-inch": 0.112985,
  "kilogram-meter": 9.80665,
  "gram-centimeter": 0.0000980665,
  "ounce-inch": 0.007062,
  "dyne-centimeter": 0.0000001,
  "foot-pound": 1.35582,
  "inch-pound": 0.112985,
};

// Unit display names with abbreviations
const unitLabels = {
  "newton-meter": "Newton-meter (N⋅m)",
  "kilonewton-meter": "Kilonewton-meter (kN⋅m)",
  "pound-foot": "Pound-foot (lb⋅ft)",
  "pound-inch": "Pound-inch (lb⋅in)",
  "kilogram-meter": "Kilogram-meter (kg⋅m)",
  "gram-centimeter": "Gram-centimeter (g⋅cm)",
  "ounce-inch": "Ounce-inch (oz⋅in)",
  "dyne-centimeter": "Dyne-centimeter (dyn⋅cm)",
  "foot-pound": "Foot-pound (ft⋅lb)",
  "inch-pound": "Inch-pound (in⋅lb)",
};

// Type for Torque units
type TorqueUnit = keyof typeof conversionFactors;

/**
 * Torque Converter Component
 * Allows users to convert between different torque units
 */
export default function TorqueConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TorqueUnit>('newton-meter');
  const [toUnit, setToUnit] = useState<TorqueUnit>('pound-foot');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertTorque();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one torque unit to another
   */
  const convertTorque = () => {
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

    // Validate the input is positive for certain physical quantities
    if (value < 0) {
      setError('Torque value cannot be negative');
      setResult('');
      return;
    }

    try {
      // Convert to base unit (N⋅m) first
      const baseValue = value * conversionFactors[fromUnit];
      
      // Convert from base unit to target unit
      const convertedValue = baseValue / conversionFactors[toUnit];
      
      // Format the result based on magnitude
      let formattedResult: string;
      if (convertedValue === 0) {
        formattedResult = '0';
      } else if (Math.abs(convertedValue) < 0.001) {
        formattedResult = convertedValue.toExponential(4);
      } else if (Math.abs(convertedValue) >= 1000000) {
        formattedResult = convertedValue.toExponential(4);
      } else {
        formattedResult = parseFloat(convertedValue.toFixed(8)).toString();
      }
      
      setResult(formattedResult);
    } catch (err) {
      setError('Conversion error occurred');
      setResult('');
    }
  };

  /**
   * Swap the from and to units
   */
  const swapUnits = () => {
    setSwapAnimation(true);
    setTimeout(() => setSwapAnimation(false), 300);
    
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
  };

  /**
   * Reset all fields to default values
   */
  const resetFields = () => {
    setInputValue('');
    setFromUnit('newton-meter');
    setToUnit('pound-foot');
    setResult('');
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Main Converter Card */}
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Wrench className="h-6 w-6 text-blue-600" />
            </motion.div>
            Torque Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Accurately convert between different units of torque and moment of force. Supports metric (N⋅m) and imperial (lb⋅ft) measurements.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Enter Value */}
            <div className="space-y-2">
              <label htmlFor="torque-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Value
              </label>
              <Input
                id="torque-input"
                type="number"
                step="any"
                placeholder="Enter torque"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* From Unit */}
            <div className="space-y-2">
              <label htmlFor="from-unit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                From
              </label>
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as TorqueUnit)}>
                <SelectTrigger id="from-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Unit */}
            <div className="space-y-2">
              <label htmlFor="to-unit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                To
              </label>
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as TorqueUnit)}>
                <SelectTrigger id="to-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={swapUnits}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: swapAnimation ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRightLeft className="h-4 w-4" />
              </motion.div>
              Swap Units
            </Button>
          </div>

          {/* Result Section */}
          <div className="space-y-2">
            <label htmlFor="result" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Result
            </label>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              {result ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {result}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {unitLabels[toUnit]}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  — Enter a value to convert —
                </div>
              )}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFields}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Accurate conversions between metric and imperial units
          </p>
        </CardFooter>
      </Card>

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5" />
            Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Common Applications:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Car lug nuts: 80-120 N⋅m</li>
                <li>• Bicycle pedals: 35-50 N⋅m</li>
                <li>• Engine head bolts: 50-100 N⋅m</li>
                <li>• Door hinges: 2-8 N⋅m</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Unit Types:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Metric:</strong> N⋅m, kN⋅m</li>
                <li>• <strong>Imperial:</strong> lb⋅ft, lb⋅in</li>
                <li>• <strong>CGS:</strong> dyn⋅cm, g⋅cm</li>
                <li>• <strong>Other:</strong> kg⋅m, oz⋅in</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
