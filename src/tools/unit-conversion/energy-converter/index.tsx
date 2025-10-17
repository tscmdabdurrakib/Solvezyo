import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const conversionFactors = {
  joule: 1,
  kilojoule: 1000,
  'kilowatt-hour': 3600000,
  'watt-hour': 3600,
  'calorie-nutritional': 4184,
  'horsepower-metric-hour': 2647795.5,
  'btu-it': 1055.05585,
  'btu-th': 1054.35026,
  gigajoule: 1e9,
  megajoule: 1e6,
  millijoule: 0.001,
  microjoule: 1e-6,
  nanojoule: 1e-9,
  attojoule: 1e-18,
  'megaelectron-volt': 1.60218e-13,
  'kiloelectron-volt': 1.60218e-16,
  'electron-volt': 1.60218e-19,
  erg: 1e-7,
  'gigawatt-hour': 3.6e12,
  'megawatt-hour': 3.6e9,
  'kilowatt-second': 1000,
  'watt-second': 1,
  'newton-meter': 1,
  'horsepower-hour': 2684519.5,
  'kilocalorie-it': 4186.8,
  'kilocalorie-th': 4184,
  'calorie-it': 4.1868,
  'calorie-th': 4.184,
  'mbtu-it': 1055055.85,
  'ton-hour-refrigeration': 12660670.2,
  'fuel-oil-equivalent-kiloliter': 3.67e10,
  'fuel-oil-equivalent-barrel-us': 5.8e9,
  gigaton: 4.184e18,
  megaton: 4.184e15,
  kiloton: 4.184e12,
  'ton-explosives': 4.184e9,
  'dyne-centimeter': 1e-7,
  'gram-force-meter': 0.00980665,
  'gram-force-centimeter': 0.0000980665,
  'kilogram-force-centimeter': 0.0980665,
  'kilogram-force-meter': 9.80665,
  'kilopond-meter': 9.80665,
  'pound-force-foot': 1.35581795,
  'pound-force-inch': 0.112984829,
  'ounce-force-inch': 0.0070615518,
  'foot-pound': 1.35581795,
  'inch-pound': 0.112984829,
  'inch-ounce': 0.0070615518,
  'poundal-foot': 0.04214011,
  therm: 105506000,
  'therm-ec': 105506000,
  'therm-us': 105480400,
  'hartree-energy': 4.35974e-18,
  'rydberg-constant': 2.17987e-18,
};

const unitLabels = {
    joule: "Joule (J)",
    kilojoule: "Kilojoule (kJ)",
    'kilowatt-hour': "Kilowatt-hour (kW*h)",
    'watt-hour': "Watt-hour (W*h)",
    'calorie-nutritional': "Calorie (nutritional)",
    'horsepower-metric-hour': "Horsepower (metric) hour",
    'btu-it': "Btu (IT) (Btu)",
    'btu-th': "Btu (th)",
    gigajoule: "Gigajoule (GJ)",
    megajoule: "Megajoule (MJ)",
    millijoule: "Millijoule (mJ)",
    microjoule: "Microjoule (µJ)",
    nanojoule: "Nanojoule (nJ)",
    attojoule: "Attojoule (aJ)",
    'megaelectron-volt': "Megaelectron-volt (MeV)",
    'kiloelectron-volt': "Kiloelectron-volt (keV)",
    'electron-volt': "Electron-volt (eV)",
    erg: "Erg",
    'gigawatt-hour': "Gigawatt-hour (GW*h)",
    'megawatt-hour': "Megawatt-hour (MW*h)",
    'kilowatt-second': "Kilowatt-second (kW*s)",
    'watt-second': "Watt-second (W*s)",
    'newton-meter': "Newton meter (N*m)",
    'horsepower-hour': "Horsepower hour (hp*h)",
    'kilocalorie-it': "Kilocalorie (IT) (kcal (IT))",
    'kilocalorie-th': "Kilocalorie (th) (kcal (th))",
    'calorie-it': "Calorie (IT) (cal (IT), cal)",
    'calorie-th': "Calorie (th) (cal (th))",
    'mbtu-it': "MBtu (IT) (MBtu (IT))",
    'ton-hour-refrigeration': "Ton-hour (refrigeration)",
    'fuel-oil-equivalent-kiloliter': "Fuel oil equivalent @kiloliter",
    'fuel-oil-equivalent-barrel-us': "Fuel oil equivalent @barrel (US)",
    gigaton: "Gigaton (Gton)",
    megaton: "Megaton (Mton)",
    kiloton: "Kiloton (kton)",
    'ton-explosives': "Ton (explosives)",
    'dyne-centimeter': "Dyne centimeter (dyn*cm)",
    'gram-force-meter': "Gram-force meter (gf*m)",
    'gram-force-centimeter': "Gram-force centimeter",
    'kilogram-force-centimeter': "Kilogram-force centimeter",
    'kilogram-force-meter': "Kilogram-force meter",
    'kilopond-meter': "Kilopond meter (kp*m)",
    'pound-force-foot': "Pound-force foot (lbf*ft)",
    'pound-force-inch': "Pound-force inch (lbf*in)",
    'ounce-force-inch': "Ounce-force inch (ozf*in)",
    'foot-pound': "Foot-pound (ft*lbf)",
    'inch-pound': "Inch-pound (in*lbf)",
    'inch-ounce': "Inch-ounce (in*ozf)",
    'poundal-foot': "Poundal foot (pdl*ft)",
    therm: "Therm",
    'therm-ec': "Therm (EC)",
    'therm-us': "Therm (US)",
    'hartree-energy': "Hartree energy",
    'rydberg-constant': "Rydberg constant",
};

const unitCategories = {
  common: {
    name: "Common Units",
    units: ["joule", "kilojoule", "kilowatt-hour", "watt-hour", "calorie-nutritional", "btu-it", "electron-volt", "newton-meter"],
  },
  si: {
    name: "SI Prefixes",
    units: ["gigajoule", "megajoule", "millijoule", "microjoule", "nanojoule", "attojoule"],
  },
  power: {
    name: "Power-Time",
    units: ["gigawatt-hour", "megawatt-hour", "kilowatt-second", "watt-second", "horsepower-hour", "horsepower-metric-hour"],
  },
  calories: {
    name: "Calories",
    units: ["kilocalorie-it", "kilocalorie-th", "calorie-it", "calorie-th"],
  },
  explosives: {
    name: "Explosives",
    units: ["gigaton", "megaton", "kiloton", "ton-explosives"],
  },
  forceDistance: {
    name: "Force-Distance",
    units: ["dyne-centimeter", "gram-force-meter", "gram-force-centimeter", "kilogram-force-centimeter", "kilogram-force-meter", "kilopond-meter", "pound-force-foot", "pound-force-inch", "ounce-force-inch", "foot-pound", "inch-pound", "inch-ounce", "poundal-foot"],
  },
  therms: {
    name: "Therms",
    units: ["therm", "therm-ec", "therm-us"],
  },
  atomic: {
    name: "Atomic & Fuel",
    units: ["megaelectron-volt", "kiloelectron-volt", "hartree-energy", "rydberg-constant", "fuel-oil-equivalent-kiloliter", "fuel-oil-equivalent-barrel-us"],
  },
  other: {
    name: "Other",
    units: ["erg", "mbtu-it", "ton-hour-refrigeration"],
  }
};

type EnergyUnit = keyof typeof conversionFactors;

export default function EnergyConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<EnergyUnit>('joule');
  const [toUnit, setToUnit] = useState<EnergyUnit>('kilojoule');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  useEffect(() => {
    convertEnergy();
  }, [inputValue, fromUnit, toUnit]);

  const convertEnergy = () => {
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
    const inJoules = value * conversionFactors[fromUnit];
    const converted = inJoules / conversionFactors[toUnit];
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.000001 && num !== 0) {
      return num.toExponential(6);
    }
    if (num === 0) return "0";
    const numStr = num.toString();
    if (numStr.includes('e')) return numStr;
    const [integerPart, decimalPart] = numStr.split('.');
    if (!decimalPart) return integerPart;
    if (Math.abs(num) >= 10000) {
        return parseFloat(num.toFixed(2)).toLocaleString();
    }
    if (Math.abs(num) >= 1) {
        return num.toFixed(Math.min(4, decimalPart.length));
    }
    return num.toFixed(Math.min(8, decimalPart.length));
  };

  const swapUnits = () => {
    setSwapAnimation(true);
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    setTimeout(() => setSwapAnimation(false), 500);
  };

  const resetConverter = () => {
    setInputValue('');
    setFromUnit('joule');
    setToUnit('kilojoule');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 dark:from-gray-900 dark:via-yellow-950/30 dark:to-orange-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Zap className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Energy Converter</CardTitle>
            <CardDescription className="text-yellow-100">
              Convert between various units of energy
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="energy-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="energy-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter energy value"
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
                              .filter(unit => unitLabels[unit as EnergyUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as EnergyUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as EnergyUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as EnergyUnit]}
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
                    className="rounded-full h-12 w-12 bg-gradient-to-br from-yellow-500 to-orange-500 border-0 text-white hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                              .filter(unit => unitLabels[unit as EnergyUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as EnergyUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as EnergyUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as EnergyUnit]}
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

          <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-orange-50 dark:from-green-950/20 dark:via-yellow-950/20 dark:to-orange-950/20 p-6 rounded-2xl border-2 border-green-200/50 dark:border-green-800/50 shadow-inner">
            <h3 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3 uppercase tracking-wide">Conversion Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">
                {result ? (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <span className="text-green-600 dark:text-green-400">{result}</span>
                    <span className="text-lg font-normal text-muted-foreground">
                      {unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1] || unitLabels[toUnit]}
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
            <div className="bg-yellow-50/50 dark:bg-yellow-950/20 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                  <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-yellow-900 dark:text-yellow-100">Conversion Details:</span>
                  <p className="text-yellow-700 dark:text-yellow-300 mt-2 font-medium">
                    {`${inputValue} ${unitLabels[fromUnit]?.split(' ')[0]} = ${result} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2 bg-yellow-100/50 dark:bg-yellow-900/30 p-2 rounded-lg">
                    <strong>Conversion Factor:</strong> 1 {unitLabels[fromUnit]?.split(' ')[0]} = {(conversionFactors[fromUnit] / conversionFactors[toUnit]).toExponential(6)} {unitLabels[toUnit]?.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t-0 p-8 bg-gradient-to-r from-gray-50 to-yellow-50/30 dark:from-gray-900 dark:to-yellow-950/30 rounded-b-2xl">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2 h-11 px-6 font-medium border-2 hover:border-primary transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
        >
          <RotateCcw className="h-4 w-4" /> Reset Converter
        </Button>
        
        <div className="text-sm text-center sm:text-right text-muted-foreground">
          <div className="font-medium">Precise energy unit conversions</div>
          <div className="text-xs mt-1">Supports a wide range of scientific and common units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
