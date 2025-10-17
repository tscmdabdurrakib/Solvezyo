import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Atom, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const conversionFactors = {
  'rad': 0.01,
  'millirad': 0.00001,
  'joule/kilogram': 1,
  'joule/gram': 1000,
  'joule/centigram': 100000,
  'joule/milligram': 1000000,
  'gray': 1,
  'exagray': 1e18,
  'petagray': 1e15,
  'teragray': 1e12,
  'gigagray': 1e9,
  'megagray': 1e6,
  'kilogray': 1000,
  'hectogray': 100,
  'dekagray': 10,
  'decigray': 0.1,
  'centigray': 0.01,
  'milligray': 0.001,
  'microgray': 1e-6,
  'nanogray': 1e-9,
  'picogray': 1e-12,
  'femtogray': 1e-15,
  'attogray': 1e-18,
};

const unitLabels = {
  'rad': "Rad (rd)",
  'millirad': "Millirad (mrd)",
  'joule/kilogram': "Joule/kilogram (J/kg)",
  'joule/gram': "Joule/gram (J/g)",
  'joule/centigram': "Joule/centigram (J/cg)",
  'joule/milligram': "Joule/milligram (J/mg)",
  'gray': "Gray (Gy)",
  'exagray': "Exagray (EGy)",
  'petagray': "Petagray (PGy)",
  'teragray': "Teragray (TGy)",
  'gigagray': "Gigagray (GGy)",
  'megagray': "Megagray (MGy)",
  'kilogray': "Kilogray (kGy)",
  'hectogray': "Hectogray (hGy)",
  'dekagray': "Dekagray (daGy)",
  'decigray': "Decigray (dGy)",
  'centigray': "Centigray (cGy)",
  'milligray': "Milligray (mGy)",
  'microgray': "Microgray (µGy)",
  'nanogray': "Nanogray (nGy)",
  'picogray': "Picogray (pGy)",
  'femtogray': "Femtogray (fGy)",
  'attogray': "Attogray (aGy)",
};

const unitCategories = {
  common: {
    name: "Common Units",
    units: ["gray", "rad", "millirad", "centigray", "milligray"],
  },
  si: {
    name: "SI Prefixes (Gray)",
    units: [
      "exagray", "petagray", "teragray", "gigagray", "megagray", "kilogray",
      "hectogray", "dekagray", "gray", "decigray", "centigray", "milligray",
      "microgray", "nanogray", "picogray", "femtogray", "attogray",
    ],
  },
  energy: {
    name: "Energy-based",
    units: [
      "joule/kilogram", "joule/gram", "joule/centigram", "joule/milligram",
    ],
  },
};

type RadiationUnit = keyof typeof conversionFactors;

export default function RadiationAbsorbedDoseConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<RadiationUnit>('gray');
  const [toUnit, setToUnit] = useState<RadiationUnit>('rad');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit]);

  const convert = () => {
    setError(null);
    if (!inputValue) {
      setResult('');
      return;
    }
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }
    const inBaseUnit = value * conversionFactors[fromUnit];
    const converted = inBaseUnit / conversionFactors[toUnit];
    setResult(formatResult(converted));
  };

  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    if (Math.abs(num) < 1e-9 || Math.abs(num) > 1e15) {
      return num.toExponential(6);
    }
    const fixed = num.toFixed(8);
    return parseFloat(fixed).toString();
  };

  const swapUnits = () => {
    setSwapAnimation(true);
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setTimeout(() => setSwapAnimation(false), 500);
  };

  const resetConverter = () => {
    setInputValue('');
    setFromUnit('gray');
    setToUnit('rad');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Atom className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Radiation-Absorbed Dose Converter</CardTitle>
            <CardDescription className="text-blue-100">
              Convert between various units of absorbed radiation dose
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="dose-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="dose-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter dose value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
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
                              .filter(unit => unitLabels[unit as RadiationUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as RadiationUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as RadiationUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as RadiationUnit]}
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
                              .filter(unit => unitLabels[unit as RadiationUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as RadiationUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as RadiationUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as RadiationUnit]}
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

          <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 p-6 rounded-2xl border-2 border-green-200/50 dark:border-green-800/50 shadow-inner">
            <h3 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3 uppercase tracking-wide">Conversion Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">
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

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
        >
          <RotateCcw className="h-4 w-4" /> Reset Converter
        </Button>
        
        <div className="text-sm text-center sm:text-right text-muted-foreground">
          <div className="font-medium">Accurate dose conversions</div>
          <div className="text-xs mt-1">Supports SI, common, and energy-based units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
