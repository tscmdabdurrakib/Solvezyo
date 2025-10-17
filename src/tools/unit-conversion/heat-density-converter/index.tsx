import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Flame, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to J/(m³⋅K) as base unit)
const conversionFactors = {
  "joule-per-cubic-meter-kelvin": 1,
  "joule-per-cubic-meter-celsius": 1,
  "kilojoule-per-cubic-meter-kelvin": 1000,
  "kilojoule-per-cubic-meter-celsius": 1000,
  "megajoule-per-cubic-meter-kelvin": 1000000,
  "calorie-per-cubic-centimeter-celsius": 4186000,
  "kilocalorie-per-cubic-meter-celsius": 4186,
  "btu-per-cubic-foot-fahrenheit": 67066.1,
  "btu-per-cubic-yard-fahrenheit": 2483.56,
  "watt-hour-per-cubic-meter-kelvin": 3600,
  "kilowatt-hour-per-cubic-meter-kelvin": 3600000,
};

// Unit display names with abbreviations
const unitLabels = {
  "joule-per-cubic-meter-kelvin": "Joule per Cubic Meter per Kelvin (J/(m³⋅K))",
  "joule-per-cubic-meter-celsius": "Joule per Cubic Meter per Celsius (J/(m³⋅°C))",
  "kilojoule-per-cubic-meter-kelvin": "Kilojoule per Cubic Meter per Kelvin (kJ/(m³⋅K))",
  "kilojoule-per-cubic-meter-celsius": "Kilojoule per Cubic Meter per Celsius (kJ/(m³⋅°C))",
  "megajoule-per-cubic-meter-kelvin": "Megajoule per Cubic Meter per Kelvin (MJ/(m³⋅K))",
  "calorie-per-cubic-centimeter-celsius": "Calorie per Cubic Centimeter per Celsius (cal/(cm³⋅°C))",
  "kilocalorie-per-cubic-meter-celsius": "Kilocalorie per Cubic Meter per Celsius (kcal/(m³⋅°C))",
  "btu-per-cubic-foot-fahrenheit": "BTU per Cubic Foot per Fahrenheit (BTU/(ft³⋅°F))",
  "btu-per-cubic-yard-fahrenheit": "BTU per Cubic Yard per Fahrenheit (BTU/(yd³⋅°F))",
  "watt-hour-per-cubic-meter-kelvin": "Watt Hour per Cubic Meter per Kelvin (Wh/(m³⋅K))",
  "kilowatt-hour-per-cubic-meter-kelvin": "Kilowatt Hour per Cubic Meter per Kelvin (kWh/(m³⋅K))",
};

// Type for Heat Density units
type HeatDensityUnit = keyof typeof conversionFactors;

/**
 * Heat Density Converter Component
 * Allows users to convert between different volumetric heat capacity units
 */
export default function HeatDensityConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<HeatDensityUnit>('joule-per-cubic-meter-kelvin');
  const [toUnit, setToUnit] = useState<HeatDensityUnit>('kilojoule-per-cubic-meter-kelvin');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertHeatDensity();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one heat density unit to another
   */
  const convertHeatDensity = () => {
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

    // Validate the input is positive for heat density
    if (value < 0) {
      setError('Heat density cannot be negative');
      setResult('');
      return;
    }

    try {
      // Convert to base unit (J/(m³⋅K)) first
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
    setFromUnit('joule-per-cubic-meter-kelvin');
    setToUnit('kilojoule-per-cubic-meter-kelvin');
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
            Heat Density Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Convert between different units of volumetric heat capacity for thermal engineering and material science.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Enter Value */}
            <div className="space-y-2">
              <label htmlFor="heat-density-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Value
              </label>
              <Input
                id="heat-density-input"
                type="number"
                step="any"
                placeholder="Enter heat density"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-lg"
                data-testid="input-heat-density"
              />
            </div>

            {/* From Unit */}
            <div className="space-y-2">
              <label htmlFor="from-unit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                From
              </label>
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as HeatDensityUnit)}>
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
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as HeatDensityUnit)}>
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
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400" data-testid="text-result">
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
            Accurate conversions for volumetric heat capacity
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
                <li>• Thermal energy storage</li>
                <li>• Building materials analysis</li>
                <li>• HVAC system design</li>
                <li>• Phase change materials</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Typical Values:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Water: 4.18 MJ/(m³⋅K)</li>
                <li>• Concrete: 1.8-2.4 MJ/(m³⋅K)</li>
                <li>• Steel: 3.8 MJ/(m³⋅K)</li>
                <li>• Air: 1.2 kJ/(m³⋅K)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
