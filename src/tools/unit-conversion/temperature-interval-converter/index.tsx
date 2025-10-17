import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Thermometer, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to Kelvin interval as base unit)
const conversionFactors = {
  "kelvin": 1,
  "celsius": 1,
  "fahrenheit": 5/9,
  "rankine": 5/9,
  "delisle": -2/3,
  "newton": 100/33,
  "reaumur": 5/4,
  "romer": 40/21,
};

// Unit display names with abbreviations
const unitLabels = {
  "kelvin": "Kelvin interval (K)",
  "celsius": "Celsius interval (°C)",
  "fahrenheit": "Fahrenheit interval (°F)",
  "rankine": "Rankine interval (°R)",
  "delisle": "Delisle interval (°De)",
  "newton": "Newton interval (°N)",
  "reaumur": "Réaumur interval (°Ré)",
  "romer": "Rømer interval (°Rø)",
};

// Type for Temperature Interval units
type TemperatureIntervalUnit = keyof typeof conversionFactors;

/**
 * Temperature Interval Converter Component
 * Allows users to convert between different temperature interval units
 */
export default function TemperatureIntervalConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TemperatureIntervalUnit>('celsius');
  const [toUnit, setToUnit] = useState<TemperatureIntervalUnit>('fahrenheit');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertTemperatureInterval();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one temperature interval unit to another
   */
  const convertTemperatureInterval = () => {
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

    try {
      // Convert to base unit (Kelvin interval) first
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
        formattedResult = parseFloat(convertedValue.toFixed(6)).toString();
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
    setFromUnit('celsius');
    setToUnit('fahrenheit');
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
              <Thermometer className="h-6 w-6 text-red-600" />
            </motion.div>
            Temperature Interval Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Convert between different temperature interval units. Note: This converts intervals/differences, not absolute temperatures.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Enter Value */}
            <div className="space-y-2">
              <label htmlFor="temp-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Value
              </label>
              <Input
                id="temp-input"
                type="number"
                step="any"
                placeholder="Enter interval"
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
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as TemperatureIntervalUnit)}>
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
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as TemperatureIntervalUnit)}>
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
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
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
            Accurate conversions for temperature intervals
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
              <h4 className="font-semibold mb-2">Common Intervals:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Room temperature change: 5°C = 9°F</li>
                <li>• Fever rise: 3°C = 5.4°F</li>
                <li>• Seasonal change: 20°C = 36°F</li>
                <li>• Cooking precision: 1°C = 1.8°F</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Scale Types:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Common:</strong> °C, °F, K</li>
                <li>• <strong>Engineering:</strong> °R (Rankine)</li>
                <li>• <strong>Historical:</strong> °Ré, °N, °De</li>
                <li>• <strong>Scientific:</strong> K (absolute)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
