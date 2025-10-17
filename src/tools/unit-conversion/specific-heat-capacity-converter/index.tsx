import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Flame, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to J/(kg⋅K) as base unit)
const conversionFactors = {
  "joule-per-kg-kelvin": 1,
  "joule-per-kg-celsius": 1,
  "kilojoule-per-kg-kelvin": 1000,
  "kilojoule-per-kg-celsius": 1000,
  "calorie-per-gram-celsius": 4184,
  "kilocalorie-per-kg-celsius": 4184,
  "btu-per-pound-fahrenheit": 4186.8,
  "btu-per-pound-rankine": 4186.8,
  "joule-per-gram-kelvin": 1000,
  "joule-per-gram-celsius": 1000,
  "watt-hour-per-kg-kelvin": 3600,
  "foot-pound-per-pound-fahrenheit": 5380.32,
};

// Unit display names with abbreviations
const unitLabels = {
  "joule-per-kg-kelvin": "Joule per kilogram-kelvin (J/(kg⋅K))",
  "joule-per-kg-celsius": "Joule per kilogram-celsius (J/(kg⋅°C))",
  "kilojoule-per-kg-kelvin": "Kilojoule per kilogram-kelvin (kJ/(kg⋅K))",
  "kilojoule-per-kg-celsius": "Kilojoule per kilogram-celsius (kJ/(kg⋅°C))",
  "calorie-per-gram-celsius": "Calorie per gram-celsius (cal/(g⋅°C))",
  "kilocalorie-per-kg-celsius": "Kilocalorie per kilogram-celsius (kcal/(kg⋅°C))",
  "btu-per-pound-fahrenheit": "BTU per pound-fahrenheit (BTU/(lb⋅°F))",
  "btu-per-pound-rankine": "BTU per pound-rankine (BTU/(lb⋅°R))",
  "joule-per-gram-kelvin": "Joule per gram-kelvin (J/(g⋅K))",
  "joule-per-gram-celsius": "Joule per gram-celsius (J/(g⋅°C))",
  "watt-hour-per-kg-kelvin": "Watt hour per kilogram-kelvin (Wh/(kg⋅K))",
  "foot-pound-per-pound-fahrenheit": "Foot-pound per pound-fahrenheit (ft⋅lb/(lb⋅°F))",
};

// Type for Specific Heat Capacity units
type SpecificHeatCapacityUnit = keyof typeof conversionFactors;

/**
 * Specific Heat Capacity Converter Component
 * Allows users to convert between different specific heat capacity units
 */
export default function SpecificHeatCapacityConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<SpecificHeatCapacityUnit>('joule-per-kg-kelvin');
  const [toUnit, setToUnit] = useState<SpecificHeatCapacityUnit>('calorie-per-gram-celsius');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertSpecificHeat();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one specific heat capacity unit to another
   */
  const convertSpecificHeat = () => {
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

    // Validate the input is positive for specific heat capacity
    if (value < 0) {
      setError('Specific heat capacity cannot be negative');
      setResult('');
      return;
    }

    try {
      // Convert to base unit (J/(kg⋅K)) first
      const baseValue = value * conversionFactors[fromUnit];
      
      // Convert from base unit to target unit
      const convertedValue = baseValue / conversionFactors[toUnit];
      
      // Format the result based on magnitude
      let formattedResult: string;
      if (convertedValue === 0) {
        formattedResult = '0';
      } else if (Math.abs(convertedValue) < 0.0001) {
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
    setFromUnit('joule-per-kg-kelvin');
    setToUnit('calorie-per-gram-celsius');
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
              <Flame className="h-6 w-6 text-red-600" />
            </motion.div>
            Specific Heat Capacity Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Convert between different units of specific heat capacity for thermal analysis and materials science.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Enter Value */}
            <div className="space-y-2">
              <label htmlFor="heat-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Value
              </label>
              <Input
                id="heat-input"
                type="number"
                step="any"
                placeholder="Enter capacity"
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
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as SpecificHeatCapacityUnit)}>
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
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as SpecificHeatCapacityUnit)}>
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
            Accurate conversions for specific heat capacity
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
              <h4 className="font-semibold mb-2">Common Materials:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Water: 4184 J/(kg⋅K)</li>
                <li>• Air: 1005 J/(kg⋅K)</li>
                <li>• Steel: 490 J/(kg⋅K)</li>
                <li>• Aluminum: 900 J/(kg⋅K)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Applications:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Heat exchanger design</li>
                <li>• Thermal energy storage</li>
                <li>• Material characterization</li>
                <li>• HVAC calculations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
