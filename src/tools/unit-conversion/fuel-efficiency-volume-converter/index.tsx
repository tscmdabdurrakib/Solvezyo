import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Fuel, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to km/L as base unit)
const conversionFactors = {
  "km-per-liter": 1,
  "miles-per-gallon-us": 0.425144, // (1.609344 km/mi) / (3.785411784 L/gal)
  "miles-per-gallon-imperial": 0.354006, // (1.609344 km/mi) / (4.54609 L/gal)
  "liters-per-100km": -1, // Special case: inverse relationship
  "mpg-us": 0.425144, // Same as miles-per-gallon-us
  "mpg-imperial": 0.354006, // Same as miles-per-gallon-imperial
  "km-per-gallon-us": 0.264172, // 1 / 3.785411784 L/gal
  "km-per-gallon-imperial": 0.219969, // 1 / 4.54609 L/gal
  "miles-per-liter": 1.609344, // 1 mile = 1.609344 km
  "gallons-per-100miles-us": -1, // Special case: inverse relationship
};

// Unit display names with abbreviations
const unitLabels = {
  "km-per-liter": "Kilometers per liter (km/L)",
  "miles-per-gallon-us": "Miles per gallon US (MPG)",
  "miles-per-gallon-imperial": "Miles per gallon Imperial (MPG)",
  "liters-per-100km": "Liters per 100 kilometers (L/100km)",
  "mpg-us": "Miles per gallon US (MPG)",
  "mpg-imperial": "Miles per gallon Imperial (MPG)",
  "km-per-gallon-us": "Kilometers per gallon US (km/gal)",
  "km-per-gallon-imperial": "Kilometers per gallon Imperial (km/gal)",
  "miles-per-liter": "Miles per liter (mi/L)",
  "gallons-per-100miles-us": "Gallons per 100 miles US (gal/100mi)",
};

// Type for Fuel Efficiency Volume units
type FuelEfficiencyVolumeUnit = keyof typeof conversionFactors;

/**
 * Fuel Efficiency Volume Converter Component
 * Allows users to convert between different fuel efficiency units based on volume
 */
export default function FuelEfficiencyVolumeConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<FuelEfficiencyVolumeUnit>('km-per-liter');
  const [toUnit, setToUnit] = useState<FuelEfficiencyVolumeUnit>('miles-per-gallon-us');
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
    if (value <= 0) {
      setError('Fuel efficiency must be positive');
      setResult('');
      return;
    }

    try {
      let convertedValue: number;

      // Handle special inverse cases
      if (fromUnit === 'liters-per-100km' && toUnit === 'liters-per-100km') {
        convertedValue = value;
      } else if (fromUnit === 'liters-per-100km') {
        // Convert from L/100km to km/L, then to target
        const kmPerL = 100 / value;
        convertedValue = kmPerL / conversionFactors[toUnit];
      } else if (toUnit === 'liters-per-100km') {
        // Convert from source to km/L, then to L/100km
        const baseValue = value * conversionFactors[fromUnit];
        convertedValue = 100 / baseValue;
      } else if (fromUnit === 'gallons-per-100miles-us' && toUnit === 'gallons-per-100miles-us') {
        convertedValue = value;
      } else if (fromUnit === 'gallons-per-100miles-us') {
        // Convert from gal/100mi to MPG, then to target
        const mpg = 100 / value;
        const kmPerL = mpg * 0.425144;
        convertedValue = kmPerL / conversionFactors[toUnit];
      } else if (toUnit === 'gallons-per-100miles-us') {
        // Convert from source to km/L, then to gal/100mi
        const baseValue = value * conversionFactors[fromUnit];
        const mpg = baseValue / 0.425144;
        convertedValue = 100 / mpg;
      } else {
        // Standard conversion through base unit (km/L)
        const baseValue = value * conversionFactors[fromUnit];
        convertedValue = baseValue / conversionFactors[toUnit];
      }
      
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
    setFromUnit('km-per-liter');
    setToUnit('miles-per-gallon-us');
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
              <Fuel className="h-6 w-6 text-blue-600" />
            </motion.div>
            Fuel Efficiency - Volume Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Convert between different units of fuel efficiency based on volume consumption. Supports MPG, km/L, and L/100km.
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
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as FuelEfficiencyVolumeUnit)}>
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
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as FuelEfficiencyVolumeUnit)}>
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
            Accurate conversions for volume-based fuel efficiency
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
              <h4 className="font-semibold mb-2">Common Values:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• City car: 25-35 MPG</li>
                <li>• Highway: 35-45 MPG</li>
                <li>• Hybrid: 45-55 MPG</li>
                <li>• Truck: 15-25 MPG</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Unit Types:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>US:</strong> MPG, gal/100mi</li>
                <li>• <strong>Imperial:</strong> MPG Imperial</li>
                <li>• <strong>Metric:</strong> km/L, L/100km</li>
                <li>• <strong>Mixed:</strong> mi/L, km/gal</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
