import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Thermometer, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to K/W as base unit)
const conversionFactors = {
  "kelvin-per-watt": 1,
  "celsius-per-watt": 1,
  "fahrenheit-per-watt": 5/9,
  "rankine-per-watt": 5/9,
  "kelvin-per-kilowatt": 0.001,
  "celsius-per-kilowatt": 0.001,
  "fahrenheit-per-kilowatt": 0.001 * 5/9,
  "kelvin-hour-per-btu": 1897.83,
  "celsius-hour-per-btu": 1897.83,
  "fahrenheit-hour-per-btu": 1054.35,
};

// Unit display names with abbreviations
const unitLabels = {
  "kelvin-per-watt": "Kelvin per Watt (K/W)",
  "celsius-per-watt": "Celsius per Watt (°C/W)",
  "fahrenheit-per-watt": "Fahrenheit per Watt (°F/W)",
  "rankine-per-watt": "Rankine per Watt (°R/W)",
  "kelvin-per-kilowatt": "Kelvin per Kilowatt (K/kW)",
  "celsius-per-kilowatt": "Celsius per Kilowatt (°C/kW)",
  "fahrenheit-per-kilowatt": "Fahrenheit per Kilowatt (°F/kW)",
  "kelvin-hour-per-btu": "Kelvin hour per BTU (K⋅h/BTU)",
  "celsius-hour-per-btu": "Celsius hour per BTU (°C⋅h/BTU)",
  "fahrenheit-hour-per-btu": "Fahrenheit hour per BTU (°F⋅h/BTU)",
};

// Type for Thermal Resistance units
type ThermalResistanceUnit = keyof typeof conversionFactors;

/**
 * Thermal Resistance Converter Component
 * Allows users to convert between different thermal resistance units
 */
export default function ThermalResistanceConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<ThermalResistanceUnit>('celsius-per-watt');
  const [toUnit, setToUnit] = useState<ThermalResistanceUnit>('kelvin-per-watt');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertThermalResistance();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one thermal resistance unit to another
   */
  const convertThermalResistance = () => {
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

    // Validate the input is positive for thermal resistance
    if (value < 0) {
      setError('Thermal resistance cannot be negative');
      setResult('');
      return;
    }

    try {
      // Convert to base unit (K/W) first
      const baseValue = value * conversionFactors[fromUnit];
      
      // Convert from base unit to target unit
      const convertedValue = baseValue / conversionFactors[toUnit];
      
      // Format the result based on magnitude
      let formattedResult: string;
      if (convertedValue === 0) {
        formattedResult = '0';
      } else if (Math.abs(convertedValue) < 0.000001) {
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
    setFromUnit('celsius-per-watt');
    setToUnit('kelvin-per-watt');
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
              <Thermometer className="h-6 w-6 text-orange-600" />
            </motion.div>
            Thermal Resistance Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Convert between different units of thermal resistance for heat transfer calculations and thermal engineering.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Enter Value */}
            <div className="space-y-2">
              <label htmlFor="thermal-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Value
              </label>
              <Input
                id="thermal-input"
                type="number"
                step="any"
                placeholder="Enter resistance"
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
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as ThermalResistanceUnit)}>
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
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as ThermalResistanceUnit)}>
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
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
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
            Accurate conversions for thermal resistance
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
                <li>• Heat sink design</li>
                <li>• Building insulation</li>
                <li>• Electronic cooling</li>
                <li>• HVAC systems</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Typical Values:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• CPU heat sink: 0.1-1.0 K/W</li>
                <li>• Wall insulation: 0.5-5.0 K/W</li>
                <li>• Thermal paste: 0.01-0.1 K/W</li>
                <li>• Air gap: 10-100 K/W</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
