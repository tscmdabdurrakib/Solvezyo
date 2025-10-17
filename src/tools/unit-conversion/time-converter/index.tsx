import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Timer, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define unit conversion factors (to seconds as base unit)
const conversionFactors = {
  second: 1,
  millisecond: 0.001,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2628000,
  year: 31536000,
  decade: 315360000,
  century: 3153600000,
  millennium: 31536000000,
  microsecond: 1e-6,
  nanosecond: 1e-9,
  picosecond: 1e-12,
  femtosecond: 1e-15,
  attosecond: 1e-18,
  shake: 1e-8,
  'month-synodic': 2551442.88,
  'year-julian': 31557600,
  'year-leap': 31622400,
  'year-tropical': 31556925.2,
  'year-sidereal': 31558149.8,
  'day-sidereal': 86164.09,
  'hour-sidereal': 3590.17,
  'minute-sidereal': 59.836,
  'second-sidereal': 0.99727,
  fortnight: 1209600,
  septennial: 220752000,
  octennial: 252288000,
  novennial: 283824000,
  quindecennial: 473040000,
  quinquennial: 157680000,
  'planck-time': 5.391247e-44,
};

// Unit display names with abbreviations and categories
const unitLabels = {
  second: "Second [s]",
  millisecond: "Millisecond [ms]",
  minute: "Minute [min]",
  hour: "Hour [h]",
  day: "Day [d]",
  week: "Week",
  month: "Month",
  year: "Year [y]",
  decade: "Decade",
  century: "Century",
  millennium: "Millennium",
  microsecond: "Microsecond [µs]",
  nanosecond: "Nanosecond [ns]",
  picosecond: "Picosecond [ps]",
  femtosecond: "Femtosecond [fs]",
  attosecond: "Attosecond [as]",
  shake: "Shake",
  'month-synodic': "Month (synodic)",
  'year-julian': "Year (Julian)",
  'year-leap': "Year (leap)",
  'year-tropical': "Year (tropical)",
  'year-sidereal': "Year (sidereal)",
  'day-sidereal': "Day (sidereal)",
  'hour-sidereal': "Hour (sidereal)",
  'minute-sidereal': "Minute (sidereal)",
  'second-sidereal': "Second (sidereal)",
  fortnight: "Fortnight",
  septennial: "Septennial",
  octennial: "Octennial",
  novennial: "Novennial",
  quindecennial: "Quindecennial",
  quinquennial: "Quinquennial",
  'planck-time': "Planck time",
};

// Unit categories for better organization
const unitCategories = {
  common: {
    name: "Common Units",
    units: ["second", "millisecond", "minute", "hour", "day", "week", "month", "year", "decade", "century", "millennium"]
  },
  scientific: {
    name: "Scientific Units",
    units: ["microsecond", "nanosecond", "picosecond", "femtosecond", "attosecond", "shake", "planck-time"]
  },
  astronomical: {
    name: "Astronomical Units",
    units: ['month-synodic', 'year-julian', 'year-leap', 'year-tropical', 'year-sidereal', 'day-sidereal', 'hour-sidereal', 'minute-sidereal', 'second-sidereal']
  },
  historical: {
    name: "Historical/Long Duration",
    units: ["fortnight", "septennial", "octennial", "novennial", "quindecennial", "quinquennial"]
  }
};

// Type for Time units
type Timeunit = keyof typeof conversionFactors;

/**
 * Time Converter Component
 * Allows users to convert between different time units
 */
export default function TimeConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<Timeunit>('second');
  const [toUnit, setToUnit] = useState<Timeunit>('minute');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertTime();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one time unit to another
   */
  const convertTime = () => {
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
    // First convert to seconds (base unit), then to target unit
    const inSeconds = value * conversionFactors[fromUnit];
    const converted = inSeconds / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    if (Math.abs(num) < 1e-9) {
      return num.toExponential(6);
    }
    if (Math.abs(num) < 0.0001) {
      return num.toPrecision(6);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(2);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(1);
    } else {
      return num.toPrecision(8);
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
    setFromUnit('second');
    setToUnit('minute');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Timer className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Time Converter</CardTitle>
            <CardDescription className="text-blue-100">
              Convert between various units of time with precision
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Input value and unit selection */}
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="time-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="time-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter time value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                data-testid="input-time-value"
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
                              .filter(unit => unitLabels[unit as Timeunit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as Timeunit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as Timeunit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as Timeunit]}
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
                              .filter(unit => unitLabels[unit as Timeunit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as Timeunit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as Timeunit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as Timeunit]}
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
          <div className="font-medium">Precision conversions for all time units</div>
          <div className="text-xs mt-1">Including common, scientific & astronomical units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
