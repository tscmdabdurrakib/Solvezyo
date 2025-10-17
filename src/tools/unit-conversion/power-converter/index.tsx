import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Search, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define unit conversion factors (to watt [W] as base unit)
const conversionFactors = {
  'watt': 1,
  'exawatt': 1e18,
  'petawatt': 1e15,
  'terawatt': 1e12,
  'gigawatt': 1e9,
  'megawatt': 1e6,
  'kilowatt': 1000,
  'hectowatt': 100,
  'dekawatt': 10,
  'deciwatt': 0.1,
  'centiwatt': 0.01,
  'milliwatt': 0.001,
  'microwatt': 1e-6,
  'nanowatt': 1e-9,
  'picowatt': 1e-12,
  'femtowatt': 1e-15,
  'attowatt': 1e-18,
  'horsepower': 745.7,
  'horsepower-550-ftlbf-s': 745.7,
  'horsepower-metric': 735.499,
  'horsepower-boiler': 9809.5,
  'horsepower-electric': 746,
  'horsepower-water': 746.043,
  'pferdestarke-ps': 735.499,
  'btu-it-hour': 0.29307107,
  'btu-it-minute': 17.584264,
  'btu-it-second': 1055.05585,
  'btu-th-hour': 0.292875,
  'btu-th-minute': 17.5725,
  'btu-th-second': 1054.35,
  'mbtu-it-hour': 293071.07,
  'mbh': 293.07107,
  'ton-refrigeration': 3516.85284,
  'kilocalorie-it-hour': 1.163,
  'kilocalorie-it-minute': 69.78,
  'kilocalorie-it-second': 4186.8,
  'kilocalorie-th-hour': 1.16222222,
  'kilocalorie-th-minute': 69.733333,
  'kilocalorie-th-second': 4184,
  'calorie-it-hour': 0.001163,
  'calorie-it-minute': 0.06978,
  'calorie-it-second': 4.1868,
  'calorie-th-hour': 0.00116222,
  'calorie-th-minute': 0.06973333,
  'calorie-th-second': 4.184,
  'foot-pound-force-hour': 0.000376616,
  'foot-pound-force-minute': 0.02259696,
  'foot-pound-force-second': 1.35581795,
  'pound-foot-hour': 0.000376616,
  'pound-foot-minute': 0.02259696,
  'pound-foot-second': 1.35581795,
  'erg-second': 1e-7,
  'kilovolt-ampere': 1000,
  'volt-ampere': 1,
  'newton-meter-second': 1,
  'joule-second': 1,
  'exajoule-second': 1e18,
  'petajoule-second': 1e15,
  'terajoule-second': 1e12,
  'gigajoule-second': 1e9,
  'megajoule-second': 1e6,
  'kilojoule-second': 1000,
  'hectojoule-second': 100,
  'dekajoule-second': 10,
  'decijoule-second': 0.1,
  'centijoule-second': 0.01,
  'millijoule-second': 0.001,
  'microjoule-second': 1e-6,
  'nanojoule-second': 1e-9,
  'picojoule-second': 1e-12,
  'femtojoule-second': 1e-15,
  'attojoule-second': 1e-18,
  'joule-hour': 0.0002777778,
  'joule-minute': 0.0166666667,
  'kilojoule-hour': 0.277777778,
  'kilojoule-minute': 16.6666667,
};

// Unit display names with abbreviations and categories
const unitLabels = {
  'watt': "Watt (W)",
  'exawatt': "Exawatt (EW)",
  'petawatt': "Petawatt (PW)",
  'terawatt': "Terawatt (TW)",
  'gigawatt': "Gigawatt (GW)",
  'megawatt': "Megawatt (MW)",
  'kilowatt': "Kilowatt (kW)",
  'hectowatt': "Hectowatt (hW)",
  'dekawatt': "Dekawatt (daW)",
  'deciwatt': "Deciwatt (dW)",
  'centiwatt': "Centiwatt (cW)",
  'milliwatt': "Milliwatt (mW)",
  'microwatt': "Microwatt (µW)",
  'nanowatt': "Nanowatt (nW)",
  'picowatt': "Picowatt (pW)",
  'femtowatt': "Femtowatt (fW)",
  'attowatt': "Attowatt (aW)",
  'horsepower': "Horsepower (hp, hp (UK))",
  'horsepower-550-ftlbf-s': "Horsepower (550 ft·lbf/s)",
  'horsepower-metric': "Horsepower (metric)",
  'horsepower-boiler': "Horsepower (boiler)",
  'horsepower-electric': "Horsepower (electric)",
  'horsepower-water': "Horsepower (water)",
  'pferdestarke-ps': "Pferdestarke (ps)",
  'btu-it-hour': "Btu (IT)/hour (Btu/h)",
  'btu-it-minute': "Btu (IT)/minute",
  'btu-it-second': "Btu (IT)/second",
  'btu-th-hour': "Btu (th)/hour",
  'btu-th-minute': "Btu (th)/minute",
  'btu-th-second': "Btu (th)/second",
  'mbtu-it-hour': "MBtu (IT)/hour",
  'mbh': "MBH (million Btu per hour)",
  'ton-refrigeration': "Ton (refrigeration)",
  'kilocalorie-it-hour': "Kilocalorie (IT)/hour (kcal/h)",
  'kilocalorie-it-minute': "Kilocalorie (IT)/minute",
  'kilocalorie-it-second': "Kilocalorie (IT)/second",
  'kilocalorie-th-hour': "Kilocalorie (th)/hour",
  'kilocalorie-th-minute': "Kilocalorie (th)/minute",
  'kilocalorie-th-second': "Kilocalorie (th)/second",
  'calorie-it-hour': "Calorie (IT)/hour (cal/h)",
  'calorie-it-minute': "Calorie (IT)/minute",
  'calorie-it-second': "Calorie (IT)/second",
  'calorie-th-hour': "Calorie (th)/hour",
  'calorie-th-minute': "Calorie (th)/minute",
  'calorie-th-second': "Calorie (th)/second",
  'foot-pound-force-hour': "Foot pound-force/hour",
  'foot-pound-force-minute': "Foot pound-force/minute",
  'foot-pound-force-second': "Foot pound-force/second",
  'pound-foot-hour': "Pound-foot/hour (lbf·ft/h)",
  'pound-foot-minute': "Pound-foot/minute",
  'pound-foot-second': "Pound-foot/second",
  'erg-second': "Erg/second (erg/s)",
  'kilovolt-ampere': "Kilovolt ampere (kV·A)",
  'volt-ampere': "Volt ampere (V·A)",
  'newton-meter-second': "Newton meter/second",
  'joule-second': "Joule/second (J/s)",
  'exajoule-second': "Exajoule/second (EJ/s)",
  'petajoule-second': "Petajoule/second (PJ/s)",
  'terajoule-second': "Terajoule/second (TJ/s)",
  'gigajoule-second': "Gigajoule/second (GJ/s)",
  'megajoule-second': "Megajoule/second (MJ/s)",
  'kilojoule-second': "Kilojoule/second (kJ/s)",
  'hectojoule-second': "Hectojoule/second (hJ/s)",
  'dekajoule-second': "Dekajoule/second (daJ/s)",
  'decijoule-second': "Decijoule/second (dJ/s)",
  'centijoule-second': "Centijoule/second (cJ/s)",
  'millijoule-second': "Millijoule/second (mJ/s)",
  'microjoule-second': "Microjoule/second (µJ/s)",
  'nanojoule-second': "Nanojoule/second (nJ/s)",
  'picojoule-second': "Picojoule/second (pJ/s)",
  'femtojoule-second': "Femtojoule/second (fJ/s)",
  'attojoule-second': "Attajoule/second (aJ/s)",
  'joule-hour': "Joule/hour (J/h)",
  'joule-minute': "Joule/minute (J/min)",
  'kilojoule-hour': "Kilojoule/hour (kJ/h)",
  'kilojoule-minute': "Kilojoule/minute (kJ/min)",
};

// Unit categories for better organization
const unitCategories = {
  si: {
    name: "SI Units",
    units: ['exawatt', 'petawatt', 'terawatt', 'gigawatt', 'megawatt', 'kilowatt', 'hectowatt', 'dekawatt', 'watt', 'deciwatt', 'centiwatt', 'milliwatt', 'microwatt', 'nanowatt', 'picowatt', 'femtowatt', 'attowatt']
  },
  horsepower: {
    name: "Horsepower",
    units: ['horsepower', 'horsepower-550-ftlbf-s', 'horsepower-metric', 'horsepower-boiler', 'horsepower-electric', 'horsepower-water', 'pferdestarke-ps']
  },
  btu: {
    name: "BTU",
    units: ['btu-it-hour', 'btu-it-minute', 'btu-it-second', 'btu-th-hour', 'btu-th-minute', 'btu-th-second', 'mbtu-it-hour', 'mbh']
  },
  calorie: {
    name: "Calorie",
    units: ['kilocalorie-it-hour', 'kilocalorie-it-minute', 'kilocalorie-it-second', 'kilocalorie-th-hour', 'kilocalorie-th-minute', 'kilocalorie-th-second', 'calorie-it-hour', 'calorie-it-minute', 'calorie-it-second', 'calorie-th-hour', 'calorie-th-minute', 'calorie-th-second']
  },
  joule: {
    name: "Joule-based",
    units: ['exajoule-second', 'petajoule-second', 'terajoule-second', 'gigajoule-second', 'megajoule-second', 'kilojoule-second', 'hectojoule-second', 'dekajoule-second', 'joule-second', 'decijoule-second', 'centijoule-second', 'millijoule-second', 'microjoule-second', 'nanojoule-second', 'picojoule-second', 'femtojoule-second', 'attojoule-second', 'joule-hour', 'joule-minute', 'kilojoule-hour', 'kilojoule-minute']
  },
  other: {
    name: "Other Units",
    units: ['ton-refrigeration', 'foot-pound-force-hour', 'foot-pound-force-minute', 'foot-pound-force-second', 'pound-foot-hour', 'pound-foot-minute', 'pound-foot-second', 'erg-second', 'kilovolt-ampere', 'volt-ampere', 'newton-meter-second']
  }
};

// Type for Power units
type PowerUnit = keyof typeof conversionFactors;

/**
 * Power Converter Component
 * Allows users to convert between different power units
 */
export default function PowerConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<PowerUnit>('kilowatt');
  const [toUnit, setToUnit] = useState<PowerUnit>('horsepower');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertPower();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one power unit to another
   */
  const convertPower = () => {
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
    // First convert to watts (base unit), then to target unit
    const inWatts = value * conversionFactors[fromUnit];
    const converted = inWatts / conversionFactors[toUnit];

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
    setFromUnit('kilowatt');
    setToUnit('horsepower');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Zap className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Power Converter</CardTitle>
            <CardDescription className="text-blue-100">
              Convert between various units of power
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Input value and unit selection */}
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="power-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="power-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter power value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                data-testid="input-power-value"
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
                              .filter(unit => unitLabels[unit as PowerUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as PowerUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as PowerUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as PowerUnit]}
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
                              .filter(unit => unitLabels[unit as PowerUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as PowerUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as PowerUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as PowerUnit]}
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
          <div className="font-medium">Precision conversions for power units</div>
          <div className="text-xs mt-1">Including SI, imperial, and other specialized units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
