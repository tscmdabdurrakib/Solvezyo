import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Scale, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to kg/s as base unit)
const conversionFactors = {
  "kilogram-per-second": 1,
  "kilogram-per-minute": 1/60,
  "kilogram-per-hour": 1/3600,
  "gram-per-second": 0.001,
  "gram-per-minute": 0.001/60,
  "gram-per-hour": 0.001/3600,
  "metric-ton-per-second": 1000,
  "metric-ton-per-minute": 1000/60,
  "metric-ton-per-hour": 1000/3600,
  "pound-per-second": 0.45359237,
  "pound-per-minute": 0.45359237/60,
  "pound-per-hour": 0.45359237/3600,
  "ounce-per-second": 0.028349523,
  "ounce-per-minute": 0.028349523/60,
  "ounce-per-hour": 0.028349523/3600,
  "ton-us-per-second": 907.18474,
  "ton-us-per-minute": 907.18474/60,
  "ton-us-per-hour": 907.18474/3600,
  "ton-uk-per-second": 1016.0469,
  "ton-uk-per-minute": 1016.0469/60,
  "ton-uk-per-hour": 1016.0469/3600,
  "slug-per-second": 14.5939,
  "slug-per-minute": 14.5939/60,
  "slug-per-hour": 14.5939/3600,
};

// Unit display names with abbreviations
const unitLabels = {
  "kilogram-per-second": "Kilogram per Second (kg/s)",
  "kilogram-per-minute": "Kilogram per Minute (kg/min)",
  "kilogram-per-hour": "Kilogram per Hour (kg/h)",
  "gram-per-second": "Gram per Second (g/s)",
  "gram-per-minute": "Gram per Minute (g/min)",
  "gram-per-hour": "Gram per Hour (g/h)",
  "metric-ton-per-second": "Metric Ton per Second (t/s)",
  "metric-ton-per-minute": "Metric Ton per Minute (t/min)",
  "metric-ton-per-hour": "Metric Ton per Hour (t/h)",
  "pound-per-second": "Pound per Second (lb/s)",
  "pound-per-minute": "Pound per Minute (lb/min)",
  "pound-per-hour": "Pound per Hour (lb/h)",
  "ounce-per-second": "Ounce per Second (oz/s)",
  "ounce-per-minute": "Ounce per Minute (oz/min)",
  "ounce-per-hour": "Ounce per Hour (oz/h)",
  "ton-us-per-second": "US Ton per Second (ton/s)",
  "ton-us-per-minute": "US Ton per Minute (ton/min)",
  "ton-us-per-hour": "US Ton per Hour (ton/h)",
  "ton-uk-per-second": "UK Ton per Second (LT/s)",
  "ton-uk-per-minute": "UK Ton per Minute (LT/min)",
  "ton-uk-per-hour": "UK Ton per Hour (LT/h)",
  "slug-per-second": "Slug per Second (slug/s)",
  "slug-per-minute": "Slug per Minute (slug/min)",
  "slug-per-hour": "Slug per Hour (slug/h)",
};

// Type for Mass Flow units
type MassFlowUnit = keyof typeof conversionFactors;

/**
 * Flow - Mass Converter Component
 * Allows users to convert between different mass flow rate units
 */
export default function FlowMassConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<MassFlowUnit>('kilogram-per-hour');
  const [toUnit, setToUnit] = useState<MassFlowUnit>('pound-per-hour');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertMassFlow();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one mass flow unit to another
   */
  const convertMassFlow = () => {
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

    // Validate the input is positive for mass flow rate
    if (value < 0) {
      setError('Mass flow rate cannot be negative');
      setResult('');
      return;
    }

    try {
      // Convert to base unit (kg/s) first
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
    setFromUnit('kilogram-per-hour');
    setToUnit('pound-per-hour');
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
              <Scale className="h-6 w-6 text-purple-600" />
            </motion.div>
            Flow - Mass Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Convert between different units of mass flow rate for industrial processes and engineering calculations.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Enter Value */}
            <div className="space-y-2">
              <label htmlFor="mass-flow-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Value
              </label>
              <Input
                id="mass-flow-input"
                type="number"
                step="any"
                placeholder="Enter mass flow rate"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-lg"
                data-testid="input-mass-flow-rate"
              />
            </div>

            {/* From Unit */}
            <div className="space-y-2">
              <label htmlFor="from-unit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                From
              </label>
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as MassFlowUnit)}>
                <SelectTrigger id="from-unit" data-testid="select-from-unit">
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
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as MassFlowUnit)}>
                <SelectTrigger id="to-unit" data-testid="select-to-unit">
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
              data-testid="button-swap"
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
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400" data-testid="text-result">
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
            data-testid="button-reset"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Accurate conversions for mass flow rates
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
                <li>• Chemical process design</li>
                <li>• Steam and gas systems</li>
                <li>• Manufacturing processes</li>
                <li>• Material handling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Typical Values:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Steam boiler: 1-100 kg/h</li>
                <li>• Chemical reactor: 10-1000 kg/h</li>
                <li>• Conveyor system: 100-10000 kg/h</li>
                <li>• Gas pipeline: 1-100 t/h</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
