import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Wind, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to W/(m²⋅K) as base unit)
const conversionFactors = {
  "watt-per-square-meter-kelvin": 1,
  "watt-per-square-meter-celsius": 1,
  "kilowatt-per-square-meter-kelvin": 1000,
  "calorie-per-square-centimeter-second-celsius": 41840,
  "kilocalorie-per-square-meter-hour-celsius": 1.163,
  "btu-per-square-foot-hour-fahrenheit": 5.678,
  "btu-per-square-foot-second-fahrenheit": 20441,
  "btu-per-square-inch-hour-fahrenheit": 0.03963,
  "btu-per-square-inch-second-fahrenheit": 142.65,
  "joule-per-square-meter-second-kelvin": 1,
  "joule-per-square-meter-second-celsius": 1,
  "horsepower-per-square-foot-fahrenheit": 14207,
};

// Unit display names with abbreviations
const unitLabels = {
  "watt-per-square-meter-kelvin": "Watt per Square Meter per Kelvin (W/(m²⋅K))",
  "watt-per-square-meter-celsius": "Watt per Square Meter per Celsius (W/(m²⋅°C))",
  "kilowatt-per-square-meter-kelvin": "Kilowatt per Square Meter per Kelvin (kW/(m²⋅K))",
  "calorie-per-square-centimeter-second-celsius": "Calorie per Square Centimeter per Second per Celsius (cal/(cm²⋅s⋅°C))",
  "kilocalorie-per-square-meter-hour-celsius": "Kilocalorie per Square Meter per Hour per Celsius (kcal/(m²⋅h⋅°C))",
  "btu-per-square-foot-hour-fahrenheit": "BTU per Square Foot per Hour per Fahrenheit (BTU/(h⋅ft²⋅°F))",
  "btu-per-square-foot-second-fahrenheit": "BTU per Square Foot per Second per Fahrenheit (BTU/(s⋅ft²⋅°F))",
  "btu-per-square-inch-hour-fahrenheit": "BTU per Square Inch per Hour per Fahrenheit (BTU/(h⋅in²⋅°F))",
  "btu-per-square-inch-second-fahrenheit": "BTU per Square Inch per Second per Fahrenheit (BTU/(s⋅in²⋅°F))",
  "joule-per-square-meter-second-kelvin": "Joule per Square Meter per Second per Kelvin (J/(m²⋅s⋅K))",
  "joule-per-square-meter-second-celsius": "Joule per Square Meter per Second per Celsius (J/(m²⋅s⋅°C))",
  "horsepower-per-square-foot-fahrenheit": "Horsepower per Square Foot per Fahrenheit (hp/(ft²⋅°F))",
};

// Type for Heat Transfer Coefficient units
type HeatTransferCoefficientUnit = keyof typeof conversionFactors;

/**
 * Heat Transfer Coefficient Converter Component
 * Allows users to convert between different heat transfer coefficient units
 */
export default function HeatTransferCoefficientConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<HeatTransferCoefficientUnit>('watt-per-square-meter-kelvin');
  const [toUnit, setToUnit] = useState<HeatTransferCoefficientUnit>('btu-per-square-foot-hour-fahrenheit');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertHeatTransferCoefficient();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one heat transfer coefficient unit to another
   */
  const convertHeatTransferCoefficient = () => {
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

    // Validate the input is positive for heat transfer coefficient
    if (value < 0) {
      setError('Heat transfer coefficient cannot be negative');
      setResult('');
      return;
    }

    try {
      // Convert to base unit (W/(m²⋅K)) first
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
    setFromUnit('watt-per-square-meter-kelvin');
    setToUnit('btu-per-square-foot-hour-fahrenheit');
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
              <Wind className="h-6 w-6 text-blue-600" />
            </motion.div>
            Heat Transfer Coefficient Converter Tool
          </CardTitle>
          <CardDescription className="text-base">
            Convert between different units of convective heat transfer coefficient for thermal engineering applications.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Enter Value */}
            <div className="space-y-2">
              <label htmlFor="heat-transfer-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Value
              </label>
              <Input
                id="heat-transfer-input"
                type="number"
                step="any"
                placeholder="Enter coefficient"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-lg"
                data-testid="input-heat-transfer-coefficient"
              />
            </div>

            {/* From Unit */}
            <div className="space-y-2">
              <label htmlFor="from-unit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                From
              </label>
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as HeatTransferCoefficientUnit)}>
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
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as HeatTransferCoefficientUnit)}>
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
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="text-result">
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
            Accurate conversions for heat transfer coefficients
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
                <li>• Heat exchanger design</li>
                <li>• HVAC system analysis</li>
                <li>• Convective cooling</li>
                <li>• Thermal boundary conditions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Typical Values:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Air (natural convection): 5-25 W/(m²⋅K)</li>
                <li>• Air (forced convection): 10-500 W/(m²⋅K)</li>
                <li>• Water: 50-10000 W/(m²⋅K)</li>
                <li>• Steam condensing: 5000-100000 W/(m²⋅K)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
