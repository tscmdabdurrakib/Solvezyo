import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BeakerIcon, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define unit conversion factors (to cubic meter as base unit)
const conversionFactors = {
  'cubic-meter': 1,
  'cubic-kilometer': 1e9,
  'cubic-centimeter': 1e-6,
  'cubic-millimeter': 1e-9,
  liter: 0.001,
  milliliter: 1e-6,
  exaliter: 1e15,
  petaliter: 1e12,
  teraliter: 1e9,
  gigaliter: 1e6,
  megaliter: 1000,
  kiloliter: 1,
  hectoliter: 0.1,
  dekaliter: 0.01,
  deciliter: 0.0001,
  centiliter: 1e-5,
  microliter: 1e-9,
  nanoliter: 1e-12,
  picoliter: 1e-15,
  femtoliter: 1e-18,
  attoliter: 1e-21,
  'cubic-decimeter': 0.001,
  'cubic-mile': 4.16818e9,
  'cubic-yard': 0.764555,
  'cubic-foot': 0.0283168,
  'cubic-inch': 1.6387e-5,
  'cup-us': 0.000236588,
  'gallon-us': 0.00378541,
  'quart-us': 0.000946353,
  'pint-us': 0.000473176,
  'tablespoon-us': 1.4787e-5,
  'teaspoon-us': 4.9289e-6,
  'fluid-ounce-us': 2.9574e-5,
  'gallon-uk': 0.00454609,
  'quart-uk': 0.00113652,
  'pint-uk': 0.000568261,
  'fluid-ounce-uk': 2.8413e-5,
  'cup-uk': 0.000284131,
  'tablespoon-uk': 1.7758e-5,
  'teaspoon-uk': 5.9194e-6,
  drop: 5e-8,
  'barrel-oil': 0.158987,
  'barrel-us': 0.11924,
  'barrel-uk': 0.163659,
  cc: 1e-6,
};

// Unit display names with abbreviations and categories
const unitLabels = {
  'cubic-meter': "Cubic meter (m³)",
  'cubic-kilometer': "Cubic kilometer (km³)",
  'cubic-centimeter': "Cubic centimeter (cm³)",
  'cubic-millimeter': "Cubic millimeter (mm³)",
  liter: "Liter (L, l)",
  milliliter: "Milliliter (mL)",
  exaliter: "Exaliter (EL)",
  petaliter: "Petaliter (PL)",
  teraliter: "Teraliter (TL)",
  gigaliter: "Gigaliter (GL)",
  megaliter: "Megaliter (ML)",
  kiloliter: "Kiloliter (kL)",
  hectoliter: "Hectoliter (hL)",
  dekaliter: "Dekaliter (daL)",
  deciliter: "Deciliter (dL)",
  centiliter: "Centiliter (cL)",
  microliter: "Microliter (µL)",
  nanoliter: "Nanoliter (nL)",
  picoliter: "Picoliter (pL)",
  femtoliter: "Femtoliter (fL)",
  attoliter: "Attoliter (aL)",
  'cubic-decimeter': "Cubic decimeter (dm³)",
  'cubic-mile': "Cubic mile (mi³)",
  'cubic-yard': "Cubic yard (yd³)",
  'cubic-foot': "Cubic foot (ft³)",
  'cubic-inch': "Cubic inch (in³)",
  'cup-us': "Cup (US)",
  'gallon-us': "Gallon (US)",
  'quart-us': "Quart (US)",
  'pint-us': "Pint (US)",
  'tablespoon-us': "Tablespoon (US)",
  'teaspoon-us': "Teaspoon (US)",
  'fluid-ounce-us': "Fluid ounce (US)",
  'gallon-uk': "Gallon (UK)",
  'quart-uk': "Quart (UK)",
  'pint-uk': "Pint (UK)",
  'fluid-ounce-uk': "Fluid ounce (UK)",
  'cup-uk': "Cup (UK)",
  'tablespoon-uk': "Tablespoon (UK)",
  'teaspoon-uk': "Teaspoon (UK)",
  drop: "Drop",
  'barrel-oil': "Barrel (oil)",
  'barrel-us': "Barrel (US)",
  'barrel-uk': "Barrel (UK)",
  cc: "Cubic Centimeter (cc)",
};

// Unit categories for better organization
const unitCategories = {
  metric: {
    name: "Metric",
    units: ['cubic-meter', 'cubic-kilometer', 'cubic-centimeter', 'cubic-millimeter', 'liter', 'milliliter', 'exaliter', 'petaliter', 'teraliter', 'gigaliter', 'megaliter', 'kiloliter', 'hectoliter', 'dekaliter', 'deciliter', 'centiliter', 'microliter', 'nanoliter', 'picoliter', 'femtoliter', 'attoliter', 'cubic-decimeter', 'cc'],
  },
  us: {
    name: "US",
    units: ['cubic-mile', 'cubic-yard', 'cubic-foot', 'cubic-inch', 'cup-us', 'gallon-us', 'quart-us', 'pint-us', 'tablespoon-us', 'teaspoon-us', 'fluid-ounce-us', 'barrel-us'],
  },
  uk: {
    name: "UK",
    units: ['gallon-uk', 'quart-uk', 'pint-uk', 'fluid-ounce-uk', 'cup-uk', 'tablespoon-uk', 'teaspoon-uk', 'barrel-uk'],
  },
  other: {
    name: "Other",
    units: ['drop', 'barrel-oil'],
  },
};

// Type for Volume units
type VolumeUnit = keyof typeof conversionFactors;

/**
 * Volume Converter Component
 * Allows users to convert between different volume units
 */
export default function VolumeConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<VolumeUnit>('liter');
  const [toUnit, setToUnit] = useState<VolumeUnit>('gallon-us');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertVolume();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one volume unit to another
   */
  const convertVolume = () => {
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
    const inCubicMeters = value * conversionFactors[fromUnit];
    const converted = inCubicMeters / conversionFactors[toUnit];

    // Format the result
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
    
    setTimeout(() => setSwapAnimation(false), 500);
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setInputValue('');
    setFromUnit('liter');
    setToUnit('gallon-us');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <BeakerIcon className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Volume Converter</CardTitle>
            <CardDescription className="text-blue-100">
              Convert between various units of volume with precision
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Input value and unit selection */}
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="volume-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="volume-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter volume value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                data-testid="input-volume-value"
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
                              .filter(unit => unitLabels[unit as VolumeUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as VolumeUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as VolumeUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as VolumeUnit]}
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
                              .filter(unit => unitLabels[unit as VolumeUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as VolumeUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as VolumeUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as VolumeUnit]}
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
          <div className="font-medium">Precision conversions for all volume units</div>
          <div className="text-xs mt-1">Including metric, US, and UK units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
