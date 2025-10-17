import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Fuel, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to km/kg as base unit)
const conversionFactors = {
  "km-per-kg": 1,
  "miles-per-kg": 1.609344, // 1 mile = 1.609344 km
  "km-per-lb": 2.20462, // 1 lb = 0.453592 kg, so 1 km/lb = 2.20462 km/kg
  "miles-per-lb": 3.5476, // 1.609344 × 2.20462
  "m-per-g": 1, // 1 m/g = 0.001 km / 0.001 kg = 1 km/kg
  "ft-per-oz": 0.01075, // 1 ft/oz = 0.0003048 km / 0.0283495 kg
  "miles-per-ton": 0.001609344, // 1 mi/ton = 1.609344 km / 1000 kg
  "km-per-ton": 0.001, // 1 km/ton = 1 km / 1000 kg
  "nautical-miles-per-kg": 1.852, // 1 nautical mile = 1.852 km
  "yards-per-lb": 0.002016, // 1 yd/lb = 0.0009144 km / 0.453592 kg
};

// Unit display names with abbreviations
const unitLabels = {
  "km-per-kg": "Kilometers per kilogram (km/kg)",
  "miles-per-kg": "Miles per kilogram (mi/kg)",
  "km-per-lb": "Kilometers per pound (km/lb)",
  "miles-per-lb": "Miles per pound (mi/lb)",
  "m-per-g": "Meters per gram (m/g)",
  "ft-per-oz": "Feet per ounce (ft/oz)",
  "miles-per-ton": "Miles per ton (mi/ton)",
  "km-per-ton": "Kilometers per ton (km/ton)",
  "nautical-miles-per-kg": "Nautical miles per kilogram (nmi/kg)",
  "yards-per-lb": "Yards per pound (yd/lb)",
};

// Type for Fuel Efficiency Mass units
type FuelEfficiencyMassUnit = keyof typeof conversionFactors;

/**
 * Fuel Efficiency Mass Converter Component
 * Allows users to convert between different fuel efficiency units based on mass
 */
export default function FuelEfficiencyMassConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<FuelEfficiencyMassUnit>('km-per-kg');
  const [toUnit, setToUnit] = useState<FuelEfficiencyMassUnit>('miles-per-lb');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertFuelEfficiency();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one fuel efficiency unit to another
   */
  const convertFuelEfficiency = () => {
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

    // Validate the input is positive for fuel efficiency
    if (value < 0) {
      setError('Fuel efficiency cannot be negative');
      setResult('');
      return;
    }

    try {
      // Convert to base unit (km/kg) first
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
    setFromUnit('km-per-kg');
    setToUnit('miles-per-lb');
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
              <Fuel className="h-6 w-6 text-green-600" />
            </motion.div>
            Fuel Efficiency - Mass Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Convert between different units of fuel efficiency based on mass consumption. Supports distance per mass units.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Enter Value */}
            <div className="space-y-2">
              <label htmlFor="fuel-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Value
              </label>
              <Input
                id="fuel-input"
                type="number"
                step="any"
                placeholder="Enter efficiency"
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
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as FuelEfficiencyMassUnit)}>
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
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as FuelEfficiencyMassUnit)}>
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
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
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
            Accurate conversions for mass-based fuel efficiency
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
              <h4 className="font-semibold mb-2">Applications:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Aircraft fuel efficiency</li>
                <li>• Rocket propulsion analysis</li>
                <li>• Industrial transport</li>
                <li>• Freight optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Unit Types:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Metric:</strong> km/kg, m/g</li>
                <li>• <strong>Imperial:</strong> mi/lb, ft/oz</li>
                <li>• <strong>Marine:</strong> nmi/kg</li>
                <li>• <strong>Heavy:</strong> km/ton, mi/ton</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
