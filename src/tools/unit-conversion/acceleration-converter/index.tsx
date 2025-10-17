import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Ruler, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define unit conversion factors (to meter/square second as base unit)
const conversionFactors = {
  "meter/square second": 1,
  "decimeter/square second": 0.1,
  "centimeter/square second": 0.01,
  "millimeter/square second": 0.001,
  "micrometer/square second": 1e-6,
  "nanometer/square second": 1e-9,
  "picometer/square second": 1e-12,
  "femtometer/square second": 1e-15,
  "attometer/square second": 1e-18,
  "kilometer/square second": 1000,
  "hectometer/square second": 100,
  "dekameter/square second": 10,
  "gal [Gal] (galileo)": 0.01, // 1 Gal = 1 cm/s²
  "mile/square second [mi/s²]": 1609.344,
  "yard/square second": 0.9144,
  "foot/square second [ft/s²]": 0.3048,
  "inch/square second [in/s²]": 0.0254,
  "acceleration of gravity [g]": 9.80665,
};

// Unit display names with abbreviations and categories
const unitLabels = {
  "meter/square second": "Meter/Square Second (m/s²)",
  "decimeter/square second": "Decimeter/Square Second (dm/s²)",
  "centimeter/square second": "Centimeter/Square Second (cm/s²)",
  "millimeter/square second": "Millimeter/Square Second (mm/s²)",
  "micrometer/square second": "Micrometer/Square Second (µm/s²)",
  "nanometer/square second": "Nanometer/Square Second (nm/s²)",
  "picometer/square second": "Picometer/Square Second (pm/s²)",
  "femtometer/square second": "Femtometer/Square Second (fm/s²)",
  "attometer/square second": "Attometer/Square Second (am/s²)",
  "kilometer/square second": "Kilometer/Square Second (km/s²)",
  "hectometer/square second": "Hectometer/Square Second (hm/s²)",
  "dekameter/square second": "Dekameter/Square Second (dam/s²)",
  "gal [Gal] (galileo)": "Gal (Galileo)",
  "mile/square second [mi/s²]": "Mile/Square Second (mi/s²)",
  "yard/square second": "Yard/Square Second (yd/s²)",
  "foot/square second [ft/s²]": "Foot/Square Second (ft/s²)",
  "inch/square second [in/s²]": "Inch/Square Second (in/s²)",
  "acceleration of gravity [g]": "Acceleration of Gravity (g)",
};

// Unit categories for better organization
const unitCategories = {
  metric: {
    name: "Metric System",
    units: [
      "kilometer/square second",
      "hectometer/square second",
      "dekameter/square second",
      "meter/square second",
      "decimeter/square second",
      "centimeter/square second",
      "millimeter/square second",
      "micrometer/square second",
      "nanometer/square second",
      "picometer/square second",
      "femtometer/square second",
      "attometer/square second",
    ],
  },
  imperial: {
    name: "Imperial/US System",
    units: [
      "mile/square second [mi/s²]",
      "yard/square second",
      "foot/square second [ft/s²]",
      "inch/square second [in/s²]",
    ],
  },
  other: {
    name: "Other Units",
    units: ["gal [Gal] (galileo)", "acceleration of gravity [g]"],
  },
};

// Type for Acceleration units
type AccelerationUnit = keyof typeof conversionFactors;

/**
 * Acceleration Converter Component
 * Allows users to convert between different acceleration units
 */
export default function AccelerationConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<AccelerationUnit>('meter/square second');
  const [toUnit, setToUnit] = useState<AccelerationUnit>('centimeter/square second');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertAcceleration();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one acceleration unit to another
   */
  const convertAcceleration = () => {
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
    // First convert to meter/square second (base unit), then to target unit
    const inBaseUnit = value * conversionFactors[fromUnit];
    const converted = inBaseUnit / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.0001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(2);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(1);
    } else {
      return num.toFixed(0);
    }
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
    setFromUnit('meter/square second');
    setToUnit('centimeter/square second');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Ruler className="h-8 w-8" /> {/* Consider changing icon if a more suitable one exists */}
          </div>
          <div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Acceleration Converter</CardTitle>
            <CardDescription className="text-sm sm:text-base text-blue-100">
              Convert between various units of acceleration with precision
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Input value and unit selection */}
          <div className="grid gap-6 md:gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="acceleration-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="acceleration-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter acceleration value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                data-testid="input-acceleration-value"
              />
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
              <div className="md:col-span-3">
                <label className="block text-sm font-semibold mb-3 text-foreground">
                  From Unit
                </label>
                <Popover open={fromUnitOpen} onOpenChange={setFromUnitOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={fromUnitOpen}
                      className="h-12 w-full justify-start gap-2 text-left font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                      data-testid="select-from-unit"
                    >
                      <span className="flex-1 truncate">{fromUnit ? unitLabels[fromUnit] : "Select unit..."}</span>
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                    <Command>
                      <CommandInput placeholder="Search units..." />
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandList className="max-h-80">
                        {Object.entries(unitCategories).map(([categoryKey, category]) => (
                          <CommandGroup key={categoryKey} heading={category.name}>
                            {category.units
                              .filter(unit => unitLabels[unit as AccelerationUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as AccelerationUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as AccelerationUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as AccelerationUnit]}
                                </CommandItem>
                              ))
                            }
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex justify-center items-center md:col-span-1">
                <motion.div
                  animate={{ rotate: swapAnimation ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 border-0 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    data-testid="button-swap-units"
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                    <span className="sr-only">Swap units</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-semibold mb-3 text-foreground">
                  To Unit
                </label>
                <Popover open={toUnitOpen} onOpenChange={setToUnitOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={toUnitOpen}
                      className="h-12 w-full justify-start gap-2 text-left font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                      data-testid="select-to-unit"
                    >
                      <span className="flex-1 truncate">{toUnit ? unitLabels[toUnit] : "Select unit..."}</span>
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                    <Command>
                      <CommandInput placeholder="Search units..." />
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandList className="max-h-80">
                        {Object.entries(unitCategories).map(([categoryKey, category]) => (
                          <CommandGroup key={categoryKey} heading={category.name}>
                            {category.units
                              .filter(unit => unitLabels[unit as AccelerationUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as AccelerationUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as AccelerationUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as AccelerationUnit]}
                                </CommandItem>
                              ))
                            }
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Conversion Result */}
          <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 p-6 rounded-2xl border-2 border-green-200/50 dark:border-green-800/50 shadow-inner">
            <h3 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3 uppercase tracking-wide">Conversion Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl sm:text-4xl font-bold" data-testid="result-display">
                {result ? (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <span className="text-green-600 dark:text-green-400">{result}</span>
                    <span className="text-lg font-normal text-muted-foreground">
                      {unitLabels[toUnit]?.split(' ')[1]?.replace(/[()]/g, '') || unitLabels[toUnit]}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-xl italic">Enter a value to see the conversion</span>
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
            <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-blue-900 dark:text-blue-100">Conversion Details:</span>
                  <p className="text-blue-700 dark:text-blue-300 mt-2 font-medium">
                    {`${inputValue} ${unitLabels[fromUnit]?.split(' ')[0]} = ${result} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-lg">
                    <strong>Conversion Factor:</strong> 1 {unitLabels[fromUnit]?.split(' ')[0]} = {(conversionFactors[fromUnit] / conversionFactors[toUnit]).toFixed(8)} {unitLabels[toUnit]?.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t-0 p-8 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 rounded-b-2xl">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2 h-11 px-6 font-medium border-2 hover:border-primary transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
          data-testid="button-reset"
        >
          <RotateCcw className="h-4 w-4" /> Reset Converter
        </Button>
        
        <div className="text-sm text-center sm:text-right text-muted-foreground">
          <div className="font-medium">Precision conversions between various acceleration units</div>
          <div className="text-xs mt-1">Including metric, imperial & other units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
