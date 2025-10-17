import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Thermometer, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define unit conversion factors (to pascal [Pa] as base unit)
const conversionFactors = {
  'pascal': 1,
  'kilopascal': 1000,
  'bar': 100000,
  'psi': 6894.76,
  'ksi': 6894760,
  'standard-atmosphere': 101325,
  'exapascal': 1e18,
  'petapascal': 1e15,
  'terapascal': 1e12,
  'gigapascal': 1e9,
  'megapascal': 1e6,
  'hectopascal': 100,
  'dekapascal': 10,
  'decipascal': 0.1,
  'centipascal': 0.01,
  'millipascal': 0.001,
  'micropascal': 1e-6,
  'nanopascal': 1e-9,
  'picopascal': 1e-12,
  'femtopascal': 1e-15,
  'attopascal': 1e-18,
  'newton-square-meter': 1,
  'newton-square-centimeter': 10000,
  'newton-square-millimeter': 1000000,
  'kilonewton-square-meter': 1000,
  'millibar': 100,
  'microbar': 0.1,
  'dyne-square-centimeter': 0.1,
  'kilogram-force-square-meter': 9.80665,
  'kilogram-force-sq-centimeter': 98066.5,
  'kilogram-force-sq-millimeter': 9806650,
  'gram-force-sq-centimeter': 98.0665,
  'ton-force-short-sq-foot': 95760.5,
  'ton-force-short-sq-inch': 13789500,
  'ton-force-long-square-foot': 107252,
  'ton-force-long-square-inch': 15444300,
  'kip-force-square-inch': 6894760,
  'pound-force-square-foot': 47.8803,
  'pound-force-square-inch': 6894.76,
  'poundal-square-foot': 1.48816,
  'torr': 133.322,
  'centimeter-mercury-0-c': 1333.22,
  'millimeter-mercury-0-c': 133.322,
  'inch-mercury-32-f': 3386.39,
  'inch-mercury-60-f': 3376.85,
  'centimeter-water-4-c': 98.0638,
  'millimeter-water-4-c': 9.80638,
  'inch-water-4-c': 249.082,
  'foot-water-4-c': 2988.98,
  'inch-water-60-f': 248.84,
  'foot-water-60-f': 2986.08,
  'atmosphere-technical': 98066.5,
};

// Unit display names with abbreviations and categories
const unitLabels = {
    'pascal': "Pascal (Pa)",
    'kilopascal': "Kilopascal (kPa)",
    'bar': "Bar",
    'psi': "Psi (psi)",
    'ksi': "Ksi (ksi)",
    'standard-atmosphere': "Standard atmosphere (atm)",
    'exapascal': "Exapascal (EPa)",
    'petapascal': "Petapascal (PPa)",
    'terapascal': "Terapascal (TPa)",
    'gigapascal': "Gigapascal (GPa)",
    'megapascal': "Megapascal (MPa)",
    'hectopascal': "Hectopascal (hPa)",
    'dekapascal': "Dekapascal (daPa)",
    'decipascal': "Decipascal (dPa)",
    'centipascal': "Centipascal (cPa)",
    'millipascal': "Millipascal (mPa)",
    'micropascal': "Micropascal (µPa)",
    'nanopascal': "Nanopascal (nPa)",
    'picopascal': "Picopascal (pPa)",
    'femtopascal': "Femtopascal (fPa)",
    'attopascal': "Attopascal (aPa)",
    'newton-square-meter': "Newton/square meter",
    'newton-square-centimeter': "Newton/square centimeter",
    'newton-square-millimeter': "Newton/square millimeter",
    'kilonewton-square-meter': "Kilonewton/square meter",
    'millibar': "Millibar (mbar)",
    'microbar': "Microbar (µbar)",
    'dyne-square-centimeter': "Dyne/square centimeter",
    'kilogram-force-square-meter': "Kilogram-force/square meter",
    'kilogram-force-sq-centimeter': "Kilogram-force/sq. centimeter",
    'kilogram-force-sq-millimeter': "Kilogram-force/sq. millimeter",
    'gram-force-sq-centimeter': "Gram-force/sq. centimeter",
    'ton-force-short-sq-foot': "Ton-force (short)/sq. foot",
    'ton-force-short-sq-inch': "Ton-force (short)/sq. inch",
    'ton-force-long-square-foot': "Ton-force (long)/square foot",
    'ton-force-long-square-inch': "Ton-force (long)/square inch",
    'kip-force-square-inch': "Kip-force/square inch",
    'pound-force-square-foot': "Pound-force/square foot",
    'pound-force-square-inch': "Pound-force/square inch",
    'poundal-square-foot': "Poundal/square foot",
    'torr': "Torr (Torr)",
    'centimeter-mercury-0-c': "Centimeter mercury (0 °C)",
    'millimeter-mercury-0-c': "Millimeter mercury (0 °C)",
    'inch-mercury-32-f': "Inch mercury (32 °F) (inHg)",
    'inch-mercury-60-f': "Inch mercury (60 °F) (inHg)",
    'centimeter-water-4-c': "Centimeter water (4 °C)",
    'millimeter-water-4-c': "Millimeter water (4 °C)",
    'inch-water-4-c': "Inch water (4 °C) (inAq)",
    'foot-water-4-c': "Foot water (4 °C) (ftAq)",
    'inch-water-60-f': "Inch water (60 °F) (inAq)",
    'foot-water-60-f': "Foot water (60 °F) (ftAq)",
    'atmosphere-technical': "Atmosphere technical (at)",
};

// Unit categories for better organization
const unitCategories = {
  common: {
    name: "Common Units",
    units: ['pascal', 'kilopascal', 'bar', 'psi', 'ksi', 'standard-atmosphere']
  },
  si: {
    name: "SI Prefixes",
    units: ['exapascal', 'petapascal', 'terapascal', 'gigapascal', 'megapascal', 'hectopascal', 'dekapascal', 'decipascal', 'centipascal', 'millipascal', 'micropascal', 'nanopascal', 'picopascal', 'femtopascal', 'attopascal']
  },
  newton: {
    name: "Newton-based",
    units: ['newton-square-meter', 'newton-square-centimeter', 'newton-square-millimeter', 'kilonewton-square-meter']
  },
  force: {
    name: "Force-based",
    units: ['kilogram-force-square-meter', 'kilogram-force-sq-centimeter', 'kilogram-force-sq-millimeter', 'gram-force-sq-centimeter', 'ton-force-short-sq-foot', 'ton-force-short-sq-inch', 'ton-force-long-square-foot', 'ton-force-long-square-inch', 'kip-force-square-inch', 'pound-force-square-foot', 'pound-force-square-inch', 'poundal-square-foot']
  },
  mercury: {
    name: "Mercury-based",
    units: ['torr', 'centimeter-mercury-0-c', 'millimeter-mercury-0-c', 'inch-mercury-32-f', 'inch-mercury-60-f']
  },
  water: {
    name: "Water-based",
    units: ['centimeter-water-4-c', 'millimeter-water-4-c', 'inch-water-4-c', 'foot-water-4-c', 'inch-water-60-f', 'foot-water-60-f']
  },
  other: {
    name: "Other",
    units: ['millibar', 'microbar', 'dyne-square-centimeter', 'atmosphere-technical']
  }
};

// Type for Pressure units
type PressureUnit = keyof typeof conversionFactors;

/**
 * Pressure Converter Component
 * Allows users to convert between different pressure units
 */
export default function PressureConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<PressureUnit>('pascal');
  const [toUnit, setToUnit] = useState<PressureUnit>('kilopascal');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertPressure();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one pressure unit to another
   */
  const convertPressure = () => {
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
    // First convert to pascals (base unit), then to target unit
    const inPascals = value * conversionFactors[fromUnit];
    const converted = inPascals / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.0001 && num !== 0) {
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
      return num.toPrecision(6);
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
    setFromUnit('pascal');
    setToUnit('kilopascal');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Thermometer className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Pressure Converter</CardTitle>
            <CardDescription className="text-blue-100">
              Convert between various units of pressure
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Input value and unit selection */}
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="pressure-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="pressure-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter pressure value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                data-testid="input-pressure-value"
              />
            </div>
            
            <div className="lg:col-span-3 grid lg:grid-cols-7 gap-4 items-end">
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold mb-3 text-foreground">
                  From Unit
                </label>
                <Popover open={fromUnitOpen} onOpenChange={setFromUnitOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={fromUnitOpen}
                      className="h-12 w-full justify-between text-left font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                      data-testid="select-from-unit"
                    >
                      {fromUnit ? unitLabels[fromUnit] : "Select unit..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <Command>
                      <CommandInput placeholder="Search units..." />
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandList className="max-h-80">
                        {Object.entries(unitCategories).map(([categoryKey, category]) => (
                          <CommandGroup key={categoryKey} heading={category.name}>
                            {category.units
                              .filter(unit => unitLabels[unit as PressureUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as PressureUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as PressureUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as PressureUnit]}
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
              
              <div className="flex justify-center items-center lg:col-span-1">
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
              
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold mb-3 text-foreground">
                  To Unit
                </label>
                <Popover open={toUnitOpen} onOpenChange={setToUnitOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={toUnitOpen}
                      className="h-12 w-full justify-between text-left font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                      data-testid="select-to-unit"
                    >
                      {toUnit ? unitLabels[toUnit] : "Select unit..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <Command>
                      <CommandInput placeholder="Search units..." />
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandList className="max-h-80">
                        {Object.entries(unitCategories).map(([categoryKey, category]) => (
                          <CommandGroup key={categoryKey} heading={category.name}>
                            {category.units
                              .filter(unit => unitLabels[unit as PressureUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as PressureUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as PressureUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as PressureUnit]}
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
              <div className="text-4xl font-bold" data-testid="result-display">
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
          {result && !error && (
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
                    <strong>Conversion Factor:</strong> 1 {unitLabels[fromUnit]?.split(' ')[0]} = {(conversionFactors[fromUnit] / conversionFactors[toUnit]).toExponential(6)} {unitLabels[toUnit]?.split(' ')[0]}
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
          <div className="font-medium">Precision conversions for pressure units</div>
          <div className="text-xs mt-1">Including SI, imperial, and other specialized units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
