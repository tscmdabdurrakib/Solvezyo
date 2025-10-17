import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Scale, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define unit conversion factors (to kilogram as base unit)
const conversionFactors = {
  // Metric System
  kilogram: 1,
  gram: 0.001,
  milligram: 1e-6,
  'ton-metric': 1000,
  exagram: 1e15,
  petagram: 1e12,
  teragram: 1e9,
  gigagram: 1e6,
  megagram: 1000,
  hectogram: 0.1,
  dekagram: 0.01,
  decigram: 0.0001,
  centigram: 1e-5,
  microgram: 1e-9,
  nanogram: 1e-12,
  picogram: 1e-15,
  femtogram: 1e-18,
  attogram: 1e-21,
  
  // Imperial/US System
  pound: 0.45359237,
  ounce: 0.0283495231,
  'ton-short-us': 907.18474,
  'ton-long-uk': 1016.0469088,
  kilopound: 453.59237,
  slug: 14.5939,
  'pound-force-square-second-foot': 14.5939,
  'pound-troy': 0.3732417216,
  poundal: 0.0140539,
  'ton-assay-us': 0.0291667,
  'ton-assay-uk': 0.0326667,
  'kiloton-metric': 1000000,
  'quintal-metric': 100,
  'hundredweight-us': 45.359237,
  'hundredweight-uk': 50.80234544,
  'quarter-us': 11.33980925,
  'quarter-uk': 12.70058636,
  'stone-us': 5.669904625,
  'stone-uk': 6.35029318,
  tonne: 1000,
  pennyweight: 0.00155517,
  'scruple-apothecary': 0.00129598,
  grain: 0.0000647989,
  
  // Other
  carat: 0.0002,
  'atomic-mass-unit': 1.66054e-27,
  dalton: 1.66054e-27,
  'kilogram-force-square-second-meter': 9.80665,
  gamma: 1e-9,
  
  // Biblical
  'talent-biblical-hebrew': 34.2,
  'mina-biblical-hebrew': 0.57,
  'shekel-biblical-hebrew': 0.0114,
  'bekan-biblical-hebrew': 0.0057,
  'gerah-biblical-hebrew': 0.00057,
  'talent-biblical-greek': 20.4,
  'mina-biblical-greek': 0.34,
  'tetradrachma-biblical-greek': 0.0136,
  'didrachma-biblical-greek': 0.0068,
  'drachma-biblical-greek': 0.0034,
  'denarius-biblical-roman': 0.00385,
  'assarion-biblical-roman': 0.00024,
  'quadrans-biblical-roman': 0.00006,
  'lepton-biblical-roman': 0.00003,
  
  // Scientific
  'planck-mass': 2.17643e-8,
  'electron-mass-rest': 9.1093837e-31,
  'muon-mass': 1.8835316e-28,
  'proton-mass': 1.6726219e-27,
  'neutron-mass': 1.6749275e-27,
  'deuteron-mass': 3.3435838e-27,
  'earth-mass': 5.972e24,
  'sun-mass': 1.989e30,
};

// Unit display names with abbreviations and categories
const unitLabels = {
  // Metric System
  kilogram: "Kilogram (kg)",
  gram: "Gram (g)",
  milligram: "Milligram (mg)",
  'ton-metric': "Ton (metric) (t)",
  exagram: "Exagram (Eg)",
  petagram: "Petagram (Pg)",
  teragram: "Teragram (Tg)",
  gigagram: "Gigagram (Gg)",
  megagram: "Megagram (Mg)",
  hectogram: "Hectogram (hg)",
  dekagram: "Dekagram (dag)",
  decigram: "Decigram (dg)",
  centigram: "Centigram (cg)",
  microgram: "Microgram (µg)",
  nanogram: "Nanogram (ng)",
  picogram: "Picogram (pg)",
  femtogram: "Femtogram (fg)",
  attogram: "Attogram (ag)",
  
  // Imperial/US System
  pound: "Pound (lbs)",
  ounce: "Ounce (oz)",
  'ton-short-us': "Ton (short, US)",
  'ton-long-uk': "Ton (long, UK)",
  kilopound: "Kilopound (kip)",
  slug: "Slug",
  'pound-force-square-second-foot': "Pound-force square second/foot",
  'pound-troy': "Pound (troy or apothecary)",
  poundal: "Poundal (pdl)",
  'ton-assay-us': "Ton (assay) (US) [AT (US)]",
  'ton-assay-uk': "Ton (assay) (UK) [AT (UK)]",
  'kiloton-metric': "Kiloton (metric) [kt]",
  'quintal-metric': "Quintal (metric) [cwt]",
  'hundredweight-us': "Hundredweight (US)",
  'hundredweight-uk': "Hundredweight (UK)",
  'quarter-us': "Quarter (US) [qr (US)]",
  'quarter-uk': "Quarter (UK) [qr (UK)]",
  'stone-us': "Stone (US)",
  'stone-uk': "Stone (UK)",
  tonne: "Tonne [t]",
  pennyweight: "Pennyweight [pwt]",
  'scruple-apothecary': "Scruple (apothecary) [s.ap]",
  grain: "Grain [gr]",
  
  // Other
  carat: "Carat (car, ct)",
  'atomic-mass-unit': "Atomic mass unit (u)",
  dalton: "Dalton",
  'kilogram-force-square-second-meter': "Kilogram-force-square-second/meter",
  gamma: "Gamma",
  
  // Biblical
  'talent-biblical-hebrew': "Talent (Biblical Hebrew)",
  'mina-biblical-hebrew': "Mina (Biblical Hebrew)",
  'shekel-biblical-hebrew': "Shekel (Biblical Hebrew)",
  'bekan-biblical-hebrew': "Bekan (Biblical Hebrew)",
  'gerah-biblical-hebrew': "Gerah (Biblical Hebrew)",
  'talent-biblical-greek': "Talent (Biblical Greek)",
  'mina-biblical-greek': "Mina (Biblical Greek)",
  'tetradrachma-biblical-greek': "Tetradrachma (Biblical Greek)",
  'didrachma-biblical-greek': "Didrachma (Biblical Greek)",
  'drachma-biblical-greek': "Drachma (Biblical Greek)",
  'denarius-biblical-roman': "Denarius (Biblical Roman)",
  'assarion-biblical-roman': "Assarion (Biblical Roman)",
  'quadrans-biblical-roman': "Quadrans (Biblical Roman)",
  'lepton-biblical-roman': "Lepton (Biblical Roman)",
  
  // Scientific
  'planck-mass': "Planck mass",
  'electron-mass-rest': "Electron mass (rest)",
  'muon-mass': "Muon mass",
  'proton-mass': "Proton mass",
  'neutron-mass': "Neutron mass",
  'deuteron-mass': "Deuteron mass",
  'earth-mass': "Earth’s mass",
  'sun-mass': "Sun’s mass",
};

// Unit categories for better organization
const unitCategories = {
  metric: {
    name: "Metric",
    units: ["kilogram", "gram", "milligram", "ton-metric", "exagram", "petagram", "teragram", "gigagram", "megagram", "hectogram", "dekagram", "decigram", "centigram", "microgram", "nanogram", "picogram", "femtogram", "attogram"],
  },
  imperial: {
    name: "Imperial/US",
    units: ["pound", "ounce", "ton-short-us", "ton-long-uk", "kilopound", "slug", "pound-force-square-second-foot", "pound-troy", "poundal", "ton-assay-us", "ton-assay-uk", "kiloton-metric", "quintal-metric", "hundredweight-us", "hundredweight-uk", "quarter-us", "quarter-uk", "stone-us", "stone-uk", "tonne", "pennyweight", "scruple-apothecary", "grain"],
  },
  other: {
    name: "Other",
    units: ["carat", "atomic-mass-unit", "dalton", "kilogram-force-square-second-meter", "gamma"],
  },
  biblical: {
    name: "Biblical",
    units: ["talent-biblical-hebrew", "mina-biblical-hebrew", "shekel-biblical-hebrew", "bekan-biblical-hebrew", "gerah-biblical-hebrew", "talent-biblical-greek", "mina-biblical-greek", "tetradrachma-biblical-greek", "didrachma-biblical-greek", "drachma-biblical-greek", "denarius-biblical-roman", "assarion-biblical-roman", "quadrans-biblical-roman", "lepton-biblical-roman"],
  },
  scientific: {
    name: "Scientific",
    units: ["planck-mass", "electron-mass-rest", "muon-mass", "proton-mass", "neutron-mass", "deuteron-mass", "earth-mass", "sun-mass"],
  },
};

// Type for Weight units
type WeightUnit = keyof typeof conversionFactors;

/**
 * Weight and Mass Converter Component
 * Allows users to convert between different weight and mass units
 */
export default function WeightMassConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<WeightUnit>('kilogram');
  const [toUnit, setToUnit] = useState<WeightUnit>('pound');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertWeight();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one weight unit to another
   */
  const convertWeight = () => {
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
    const inKilograms = value * conversionFactors[fromUnit];
    const converted = inKilograms / conversionFactors[toUnit];

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
    setFromUnit('kilogram');
    setToUnit('pound');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Scale className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Weight & Mass Converter</CardTitle>
            <CardDescription className="text-blue-100">
              Convert between various units of weight and mass with precision
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Input value and unit selection */}
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="weight-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="weight-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter weight value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                data-testid="input-weight-value"
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
                              .filter(unit => unitLabels[unit as WeightUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as WeightUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as WeightUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as WeightUnit]}
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
                              .filter(unit => unitLabels[unit as WeightUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as WeightUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as WeightUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as WeightUnit]}
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
          <div className="font-medium">Precision conversions for all mass units</div>
          <div className="text-xs mt-1">Including metric, imperial, scientific & biblical units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
