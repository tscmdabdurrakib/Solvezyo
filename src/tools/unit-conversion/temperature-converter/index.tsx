import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Thermometer } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Temperature conversion functions
const conversionFunctions = {
  // Celsius conversions
  celsiusToFahrenheit: (celsius: number) => (celsius * 9/5) + 32,
  celsiusToKelvin: (celsius: number) => celsius + 273.15,
  celsiusToRankine: (celsius: number) => (celsius + 273.15) * 9/5,
  celsiusToReaumur: (celsius: number) => celsius * 4/5,
  
  // Fahrenheit conversions
  fahrenheitToCelsius: (fahrenheit: number) => (fahrenheit - 32) * 5/9,
  fahrenheitToKelvin: (fahrenheit: number) => (fahrenheit - 32) * 5/9 + 273.15,
  fahrenheitToRankine: (fahrenheit: number) => fahrenheit + 459.67,
  fahrenheitToReaumur: (fahrenheit: number) => (fahrenheit - 32) * 4/9,
  
  // Kelvin conversions
  kelvinToCelsius: (kelvin: number) => kelvin - 273.15,
  kelvinToFahrenheit: (kelvin: number) => (kelvin * 9/5) - 459.67,
  kelvinToRankine: (kelvin: number) => kelvin * 9/5,
  kelvinToReaumur: (kelvin: number) => (kelvin - 273.15) * 4/5,
  
  // Rankine conversions
  rankineToCelsius: (rankine: number) => (rankine - 491.67) * 5/9,
  rankineToFahrenheit: (rankine: number) => rankine - 459.67,
  rankineToKelvin: (rankine: number) => rankine * 5/9,
  rankineToReaumur: (rankine: number) => (rankine - 491.67) * 4/9,
  
  // Réaumur conversions
  reaumurToCelsius: (reaumur: number) => reaumur * 5/4,
  reaumurToFahrenheit: (reaumur: number) => (reaumur * 9/4) + 32,
  reaumurToKelvin: (reaumur: number) => (reaumur * 5/4) + 273.15,
  reaumurToRankine: (reaumur: number) => (reaumur * 9/4) + 491.67
};

// Type for Temperature units
type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin" | "rankine" | "reaumur";

// Unit display names with abbreviations
const unitLabels: Record<TemperatureUnit, string> = {
  celsius: "Celsius (°C)",
  fahrenheit: "Fahrenheit (°F)",
  kelvin: "Kelvin (K)",
  rankine: "Rankine (°R)",
  reaumur: "Réaumur (°Ré)"
};

// Conversion formula explanations
const conversionFormulas: Record<string, string> = {
  "celsius_fahrenheit": "°F = (°C × 9/5) + 32",
  "fahrenheit_celsius": "°C = (°F - 32) × 5/9",
  "celsius_kelvin": "K = °C + 273.15",
  "kelvin_celsius": "°C = K - 273.15",
  "fahrenheit_kelvin": "K = (°F - 32) × 5/9 + 273.15",
  "kelvin_fahrenheit": "°F = (K × 9/5) - 459.67",
  "celsius_rankine": "°R = (°C + 273.15) × 9/5",
  "rankine_celsius": "°C = (°R - 491.67) × 5/9",
  "celsius_reaumur": "°Ré = °C × 4/5",
  "reaumur_celsius": "°C = °Ré × 5/4"
};

/**
 * Temperature Converter Component
 * Allows users to convert between different temperature units
 */
export default function TemperatureConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius');
  const [toUnit, setToUnit] = useState<TemperatureUnit>('fahrenheit');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertTemperature();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one temperature unit to another
   */
  const convertTemperature = () => {
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

    // Perform conversion
    let convertedValue: number;
    
    // Select the appropriate conversion function
    if (fromUnit === toUnit) {
      convertedValue = value; // Same unit, no conversion needed
    } else if (fromUnit === "celsius" && toUnit === "fahrenheit") {
      convertedValue = conversionFunctions.celsiusToFahrenheit(value);
    } else if (fromUnit === "celsius" && toUnit === "kelvin") {
      convertedValue = conversionFunctions.celsiusToKelvin(value);
    } else if (fromUnit === "celsius" && toUnit === "rankine") {
      convertedValue = conversionFunctions.celsiusToRankine(value);
    } else if (fromUnit === "celsius" && toUnit === "reaumur") {
      convertedValue = conversionFunctions.celsiusToReaumur(value);
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
      convertedValue = conversionFunctions.fahrenheitToCelsius(value);
    } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
      convertedValue = conversionFunctions.fahrenheitToKelvin(value);
    } else if (fromUnit === "fahrenheit" && toUnit === "rankine") {
      convertedValue = conversionFunctions.fahrenheitToRankine(value);
    } else if (fromUnit === "fahrenheit" && toUnit === "reaumur") {
      convertedValue = conversionFunctions.fahrenheitToReaumur(value);
    } else if (fromUnit === "kelvin" && toUnit === "celsius") {
      convertedValue = conversionFunctions.kelvinToCelsius(value);
    } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
      convertedValue = conversionFunctions.kelvinToFahrenheit(value);
    } else if (fromUnit === "kelvin" && toUnit === "rankine") {
      convertedValue = conversionFunctions.kelvinToRankine(value);
    } else if (fromUnit === "kelvin" && toUnit === "reaumur") {
      convertedValue = conversionFunctions.kelvinToReaumur(value);
    } else if (fromUnit === "rankine" && toUnit === "celsius") {
      convertedValue = conversionFunctions.rankineToCelsius(value);
    } else if (fromUnit === "rankine" && toUnit === "fahrenheit") {
      convertedValue = conversionFunctions.rankineToFahrenheit(value);
    } else if (fromUnit === "rankine" && toUnit === "kelvin") {
      convertedValue = conversionFunctions.rankineToKelvin(value);
    } else if (fromUnit === "rankine" && toUnit === "reaumur") {
      convertedValue = conversionFunctions.rankineToReaumur(value);
    } else if (fromUnit === "reaumur" && toUnit === "celsius") {
      convertedValue = conversionFunctions.reaumurToCelsius(value);
    } else if (fromUnit === "reaumur" && toUnit === "fahrenheit") {
      convertedValue = conversionFunctions.reaumurToFahrenheit(value);
    } else if (fromUnit === "reaumur" && toUnit === "kelvin") {
      convertedValue = conversionFunctions.reaumurToKelvin(value);
    } else if (fromUnit === "reaumur" && toUnit === "rankine") {
      convertedValue = conversionFunctions.reaumurToRankine(value);
    } else {
      setError("Conversion not supported");
      setResult("");
      return;
    }

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(convertedValue);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    
    // For temperature, we usually want 2 decimal places for most values
    if (Math.abs(num) < 0.01) return num.toFixed(4);
    if (Math.abs(num) < 10) return num.toFixed(2);
    
    // For larger values, fewer decimal places
    return num.toFixed(1);
  };

  /**
   * Swap the from and to units
   */
  const swapUnits = () => {
    setSwapAnimation(true);
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    
    // Reset animation state after animation completes
    setTimeout(() => setSwapAnimation(false), 500);
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setInputValue('');
    setFromUnit('celsius');
    setToUnit('fahrenheit');
    setResult('');
    setError(null);
  };

  // Get the conversion formula text for display
  const getFormulaText = (): string => {
    const key = `${fromUnit}_${toUnit}`;
    return conversionFormulas[key] || '';
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Thermometer className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Temperature Converter</CardTitle>
            <CardDescription>
              Convert between different temperature units and scales
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="temperature-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="temperature-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter temperature"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as TemperatureUnit)}>
                  <SelectTrigger id="from-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                    <SelectItem value="rankine">Rankine (°R)</SelectItem>
                    <SelectItem value="reaumur">Réaumur (°Ré)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center items-center sm:col-span-1">
                <motion.div
                  animate={{ rotate: swapAnimation ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full h-10 w-10 bg-muted hover:bg-primary/10"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="sr-only">Swap units</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="to-unit" className="block text-sm font-medium mb-2">
                  To
                </label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as TemperatureUnit)}>
                  <SelectTrigger id="to-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                    <SelectItem value="rankine">Rankine (°R)</SelectItem>
                    <SelectItem value="reaumur">Réaumur (°Ré)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conversion Result */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {result ? (
                  <>
                    {result} <span className="text-lg font-normal">{unitLabels[toUnit]?.split(' ')[1]?.replace(/[()]/g, '')}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground text-lg">— Enter a value to convert —</span>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Conversion Formula Display */}
          {result && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} ${unitLabels[fromUnit]?.split(' ')[0]} = ${result} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {fromUnit !== toUnit && `Formula: ${getFormulaText()}`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Accurate conversions between temperature scales
        </div>
      </CardFooter>
    </Card>
  );
}
