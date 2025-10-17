import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Square, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define unit conversion factors (to square meter as base unit)
const conversionFactors = {
  'square-meter': 1,
  'square-kilometer': 1e6,
  'square-centimeter': 1e-4,
  'square-millimeter': 1e-6,
  'square-micrometer': 1e-12,
  hectare: 10000,
  'square-mile': 2.59e6,
  'square-yard': 0.836127,
  'square-foot': 0.092903,
  'square-inch': 0.00064516,
  'square-hectometer': 10000,
  'square-dekameter': 100,
  'square-decimeter': 0.01,
  'square-nanometer': 1e-18,
  are: 100,
  barn: 1e-28,
  'square-mile-us-survey': 2.59e6,
  'square-foot-us-survey': 0.0929034,
  'circular-inch': 0.000506707,
  township: 9.324e7,
  section: 2.59e6,
  'acre-us-survey': 4046.87,
  rood: 1011.71,
  'square-chain': 404.686,
  'square-rod': 25.2929,
  'square-rod-us-survey': 25.29295,
  'square-perch': 25.2929,
  'square-pole': 25.2929,
  'square-mil': 6.4516e-10,
  'circular-mil': 5.06707e-10,
  homestead: 647500,
  sabin: 0.092903,
  arpent: 3439.08,
  cuerda: 3930.39,
  plaza: 6400,
  'varas-castellanas-cuad': 0.698737,
  'varas-conuqueras-cuad': 6.28863,
  'electron-cross-section': 6.65246e-29,
};

// Unit display names with abbreviations and categories
const unitLabels = {
  'square-meter': "Square meter [m²]",
  'square-kilometer': "Square kilometer [km²]",
  'square-centimeter': "Square centimeter [cm²]",
  'square-millimeter': "Square millimeter [mm²]",
  'square-micrometer': "Square micrometer [µm²]",
  hectare: "Hectare [ha]",
  'square-mile': "Square mile [mi²]",
  'square-yard': "Square yard [yd²]",
  'square-foot': "Square foot [ft²]",
  'square-inch': "Square inch [in²]",
  'square-hectometer': "Square hectometer [hm²]",
  'square-dekameter': "Square dekameter [dam²]",
  'square-decimeter': "Square decimeter [dm²]",
  'square-nanometer': "Square nanometer [nm²]",
  are: "Are [a]",
  barn: "Barn [b]",
  'square-mile-us-survey': "Square mile (US survey)",
  'square-foot-us-survey': "Square foot (US survey)",
  'circular-inch': "Circular inch",
  township: "Township",
  section: "Section",
  'acre-us-survey': "Acre (US survey)",
  rood: "Rood",
  'square-chain': "Square chain [ch²]",
  'square-rod': "Square rod",
  'square-rod-us-survey': "Square rod (US survey)",
  'square-perch': "Square perch",
  'square-pole': "Square pole",
  'square-mil': "Square mil [mil²]",
  'circular-mil': "Circular mil",
  homestead: "Homestead",
  sabin: "Sabin",
  arpent: "Arpent",
  cuerda: "Cuerda",
  plaza: "Plaza",
  'varas-castellanas-cuad': "Varas castellanas cuad",
  'varas-conuqueras-cuad': "Varas conuqueras cuad",
  'electron-cross-section': "Electron cross section",
};

// Unit categories for better organization
const unitCategories = {
  metric: {
    name: "Metric",
    units: ['square-meter', 'square-kilometer', 'square-centimeter', 'square-millimeter', 'square-micrometer', 'hectare', 'square-hectometer', 'square-dekameter', 'square-decimeter', 'square-nanometer', 'are', 'barn'],
  },
  us: {
    name: "US/Imperial",
    units: ['square-mile', 'square-yard', 'square-foot', 'square-inch', 'square-mile-us-survey', 'square-foot-us-survey', 'circular-inch', 'township', 'section', 'acre-us-survey', 'rood', 'square-chain', 'square-rod', 'square-rod-us-survey', 'square-perch', 'square-pole', 'square-mil', 'circular-mil', 'homestead'],
  },
  other: {
    name: "Other",
    units: ['sabin', 'arpent', 'cuerda', 'plaza', 'varas-castellanas-cuad', 'varas-conuqueras-cuad', 'electron-cross-section'],
  },
};

// Type for Area units
type AreaUnit = keyof typeof conversionFactors;

/**
 * Area Converter Component
 * Allows users to convert between different area units
 */
export default function AreaConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<AreaUnit>('square-meter');
  const [toUnit, setToUnit] = useState<AreaUnit>('square-foot');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertArea();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one area unit to another
   */
  const convertArea = () => {
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
    const inSquareMeters = value * conversionFactors[fromUnit];
    const converted = inSquareMeters / conversionFactors[toUnit];

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
    setFromUnit('square-meter');
    setToUnit('square-foot');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Square className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Area Converter</CardTitle>
            <CardDescription className="text-blue-100">
              Convert between various units of area with precision
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Input value and unit selection */}
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="area-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="area-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter area value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                data-testid="input-area-value"
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
                              .filter(unit => unitLabels[unit as AreaUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as AreaUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as AreaUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as AreaUnit]}
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
                              .filter(unit => unitLabels[unit as AreaUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as AreaUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as AreaUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as AreaUnit]}
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
                      {unitLabels[toUnit]?.split(' ')[1]?.replace(/[\[\]]/g, '') || unitLabels[toUnit]}
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
          <div className="font-medium">Precision conversions for all area units</div>
          <div className="text-xs mt-1">Including metric, US/imperial, and other units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
