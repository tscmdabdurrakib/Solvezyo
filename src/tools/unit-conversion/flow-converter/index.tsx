import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Droplets, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to m³/s as base unit)
const conversionFactors = {
  "cubic-meter-per-second": 1,
  "cubic-meter-per-minute": 1/60,
  "cubic-meter-per-hour": 1/3600,
  "liter-per-second": 0.001,
  "liter-per-minute": 0.001/60,
  "liter-per-hour": 0.001/3600,
  "milliliter-per-second": 0.000001,
  "milliliter-per-minute": 0.000001/60,
  "gallon-us-per-second": 0.003785412,
  "gallon-us-per-minute": 0.003785412/60,
  "gallon-us-per-hour": 0.003785412/3600,
  "gallon-imperial-per-second": 0.004546087,
  "gallon-imperial-per-minute": 0.004546087/60,
  "gallon-imperial-per-hour": 0.004546087/3600,
  "cubic-foot-per-second": 0.028316847,
  "cubic-foot-per-minute": 0.028316847/60,
  "cubic-foot-per-hour": 0.028316847/3600,
  "cubic-inch-per-second": 0.000016387064,
  "cubic-inch-per-minute": 0.000016387064/60,
  "barrel-per-second": 0.158987295,
  "barrel-per-minute": 0.158987295/60,
  "barrel-per-hour": 0.158987295/3600,
};

// Unit display names with abbreviations
const unitLabels = {
  "cubic-meter-per-second": "Cubic Meter per Second (m³/s)",
  "cubic-meter-per-minute": "Cubic Meter per Minute (m³/min)",
  "cubic-meter-per-hour": "Cubic Meter per Hour (m³/h)",
  "liter-per-second": "Liter per Second (L/s)",
  "liter-per-minute": "Liter per Minute (L/min)",
  "liter-per-hour": "Liter per Hour (L/h)",
  "milliliter-per-second": "Milliliter per Second (mL/s)",
  "milliliter-per-minute": "Milliliter per Minute (mL/min)",
  "gallon-us-per-second": "US Gallon per Second (gal/s)",
  "gallon-us-per-minute": "US Gallon per Minute (GPM)",
  "gallon-us-per-hour": "US Gallon per Hour (gal/h)",
  "gallon-imperial-per-second": "Imperial Gallon per Second (Igal/s)",
  "gallon-imperial-per-minute": "Imperial Gallon per Minute (Igal/min)",
  "gallon-imperial-per-hour": "Imperial Gallon per Hour (Igal/h)",
  "cubic-foot-per-second": "Cubic Foot per Second (ft³/s)",
  "cubic-foot-per-minute": "Cubic Foot per Minute (CFM)",
  "cubic-foot-per-hour": "Cubic Foot per Hour (ft³/h)",
  "cubic-inch-per-second": "Cubic Inch per Second (in³/s)",
  "cubic-inch-per-minute": "Cubic Inch per Minute (in³/min)",
  "barrel-per-second": "Barrel per Second (bbl/s)",
  "barrel-per-minute": "Barrel per Minute (bbl/min)",
  "barrel-per-hour": "Barrel per Hour (bbl/h)",
};

// Type for Flow units
type FlowUnit = keyof typeof conversionFactors;

/**
 * Flow Converter Component
 * Allows users to convert between different volumetric flow rate units
 */
export default function FlowConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<FlowUnit>('liter-per-minute');
  const [toUnit, setToUnit] = useState<FlowUnit>('gallon-us-per-minute');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertFlow();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one flow unit to another
   */
  const convertFlow = () => {
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

    // Validate the input is positive for flow rate
    if (value < 0) {
      setError('Flow rate cannot be negative');
      setResult('');
      return;
    }

    try {
      // Convert to base unit (m³/s) first
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
    setFromUnit('liter-per-minute');
    setToUnit('gallon-us-per-minute');
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
              <Droplets className="h-6 w-6 text-cyan-600" />
            </motion.div>
            Flow Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Convert between different units of volumetric flow rate for fluid dynamics and engineering applications.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Enter Value */}
            <div className="space-y-2">
              <label htmlFor="flow-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Value
              </label>
              <Input
                id="flow-input"
                type="number"
                step="any"
                placeholder="Enter flow rate"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-lg"
                data-testid="input-flow-rate"
              />
            </div>

            {/* From Unit */}
            <div className="space-y-2">
              <label htmlFor="from-unit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                From
              </label>
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as FlowUnit)}>
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
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as FlowUnit)}>
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
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400" data-testid="text-result">
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
            Accurate conversions for volumetric flow rates
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
                <li>• Water pump systems</li>
                <li>• HVAC ventilation</li>
                <li>• Chemical process design</li>
                <li>• Irrigation systems</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Typical Values:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Household faucet: 5-10 L/min</li>
                <li>• Garden hose: 15-30 L/min</li>
                <li>• Fire hydrant: 1000-4000 L/min</li>
                <li>• Industrial pump: 100-10000 L/min</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
