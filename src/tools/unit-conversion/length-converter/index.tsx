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

// Define unit conversion factors (to meters as base unit)
const conversionFactors = {
  // Metric System - Base
  meter: 1,
  decimeter: 0.1,
  centimeter: 0.01,
  millimeter: 0.001,
  micrometer: 0.000001,
  micron: 0.000001,
  nanometer: 0.000000001,
  picometer: 0.000000000001,
  femtometer: 0.000000000000001,
  attometer: 0.000000000000000001,
  
  // Metric System - Large
  dekameter: 10,
  hectometer: 100,
  kilometer: 1000,
  megameter: 1000000,
  gigameter: 1000000000,
  terameter: 1000000000000,
  petameter: 1000000000000000,
  exameter: 1000000000000000000,
  
  // Imperial/US System
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
  "mile-statute": 1609.344,
  "mile-us-survey": 1609.347218694,
  "mile-roman": 1479.8,
  kiloyard: 914.4,
  furlong: 201.168,
  chain: 20.1168,
  rod: 5.0292,
  perch: 5.0292,
  pole: 5.0292,
  fathom: 1.8288,
  ell: 1.143,
  "cubit-uk": 0.4572,
  "cubit-greek": 0.462,
  "span-cloth": 0.2286,
  "finger-cloth": 0.1143,
  "nail-cloth": 0.05715,
  barleycorn: 0.008466667,
  thou: 0.0000254,
  microinch: 0.0000000254,
  centiinch: 0.000254,
  
  // Astronomical Units
  "light-year": 9460730472580800,
  parsec: 30856775814913700,
  kiloparsec: 30856775814913700000,
  megaparsec: 30856775814913700000000,
  "astronomical-unit": 149597870700,
  
  // Nautical
  "nautical-mile-international": 1852,
  "nautical-mile-uk": 1853.184,
  "nautical-league-international": 5556,
  "nautical-league-uk": 5559.552,
  league: 4828.032,
  
  // Scientific/Special Units
  angstrom: 0.0000000001,
  "x-unit": 1.0021e-13,
  fermi: 1e-15,
  "planck-length": 1.616255e-35,
  "electron-radius-classical": 2.8179403262e-15,
  "bohr-radius": 5.29177210903e-11,
  "au-length": 5.29177210903e-11,
  
  // Earth/Sun Related
  "earth-equatorial-radius": 6378137,
  "earth-polar-radius": 6356752.314245,
  "sun-radius": 696000000,
  "earth-sun-distance": 149597870700,
  
  // Historical/Regional
  arpent: 58.471308,
  pica: 0.004233333,
  point: 0.000352778,
  twip: 0.000017639,
  aln: 0.5938,
  famn: 1.781,
  caliber: 0.000254,
  ken: 1.818,
  "russian-arshin": 0.7112,
  "roman-actus": 35.48,
  "vara-de-tarea": 2.505456,
  "vara-conuquera": 2.505456,
  "vara-castellana": 0.835905,
  "long-reed": 3.2004,
  reed: 2.7432,
  "long-cubit": 0.5334,
  handbreadth: 0.0762,
  fingerbreadth: 0.01905,
  
  // SI Extended Units (extreme)
  ronnameter: 1e27, // Ronnameter
  quettameter: 1e30, // Quettameter 
  rontometer: 1e-27, // Rontometer
  quectometer: 1e-30, // Quectometer
  
  // Additional Survey Units
  'foot-us-survey': 0.30480061, // US Survey Foot
  'yard-us-survey': 0.91440183, // US Survey Yard
  'inch-us-survey': 0.02540005, // US Survey Inch
  
  // Maritime/Nautical Extended
  'cable-international': 185.2, // International Cable
  'cable-uk': 182.88, // UK Cable
  'cable-us': 219.456, // US Cable
  
  // Traditional/Equine
  hand: 0.1016, // Hand (equine measurement)
  palm: 0.0762, // Palm
  span: 0.2286, // Span (hand spread)
  
  // Surveying/Engineering
  link: 0.201168, // Link (surveyor's)
  
  // Additional Planetary
  'earth-diameter': 1.2742e7, // Earth's diameter
  'moon-radius': 1.7374e6, // Moon's radius
  'jupiter-radius': 6.9911e7, // Jupiter's radius
  
  // Additional Historical
  'biblical-cubit': 0.4445, // Biblical Cubit
  'royal-cubit': 0.525, // Royal Cubit (Egyptian)
  'roman-foot': 0.296, // Roman Foot
  
  // Textile/Cloth Extended
  'cloth-nail': 0.05715, // Cloth Nail
  'cloth-quarter': 0.2286, // Cloth Quarter
  stick: 0.0508, // Stick (printing)
};

// Unit display names with abbreviations and categories
const unitLabels = {
  // Metric System - Base
  meter: "Meter (m)",
  decimeter: "Decimeter (dm)",
  centimeter: "Centimeter (cm)",
  millimeter: "Millimeter (mm)",
  micrometer: "Micrometer (µm)",
  micron: "Micron (µ)",
  nanometer: "Nanometer (nm)",
  picometer: "Picometer (pm)",
  femtometer: "Femtometer (fm)",
  attometer: "Attometer (am)",
  
  // Metric System - Large
  dekameter: "Dekameter (dam)",
  hectometer: "Hectometer (hm)",
  kilometer: "Kilometer (km)",
  megameter: "Megameter (Mm)",
  gigameter: "Gigameter (Gm)",
  terameter: "Terameter (Tm)",
  petameter: "Petameter (Pm)",
  exameter: "Exameter (Em)",
  
  // Imperial/US System
  inch: "Inch (in)",
  foot: "Foot (ft)",
  yard: "Yard (yd)",
  mile: "Mile (mi)",
  "mile-statute": "Mile (statute)",
  "mile-us-survey": "Mile (US survey)",
  "mile-roman": "Mile (Roman)",
  kiloyard: "Kiloyard (ky)",
  furlong: "Furlong (fur)",
  chain: "Chain (ch)",
  rod: "Rod (rd)",
  perch: "Perch",
  pole: "Pole",
  fathom: "Fathom (ftm)",
  ell: "Ell",
  "cubit-uk": "Cubit (UK)",
  "cubit-greek": "Cubit (Greek)",
  "span-cloth": "Span (cloth)",
  "finger-cloth": "Finger (cloth)",
  "nail-cloth": "Nail (cloth)",
  barleycorn: "Barleycorn",
  thou: "Thou",
  microinch: "Microinch (µin)",
  centiinch: "Centiinch (cin)",
  
  // Astronomical Units
  "light-year": "Light Year (ly)",
  parsec: "Parsec (pc)",
  kiloparsec: "Kiloparsec (kpc)",
  megaparsec: "Megaparsec (Mpc)",
  "astronomical-unit": "Astronomical Unit (AU)",
  
  // Nautical
  "nautical-mile-international": "Nautical Mile (international)",
  "nautical-mile-uk": "Nautical Mile (UK)",
  "nautical-league-international": "Nautical League (international)",
  "nautical-league-uk": "Nautical League (UK)",
  league: "League (lea)",
  
  // Scientific/Special Units
  angstrom: "Angstrom (Å)",
  "x-unit": "X-unit",
  fermi: "Fermi (F)",
  "planck-length": "Planck Length",
  "electron-radius-classical": "Electron Radius (classical)",
  "bohr-radius": "Bohr Radius",
  "au-length": "A.U. of Length",
  
  // Earth/Sun Related
  "earth-equatorial-radius": "Earth's Equatorial Radius",
  "earth-polar-radius": "Earth's Polar Radius",
  "sun-radius": "Sun's Radius",
  "earth-sun-distance": "Earth's Distance from Sun",
  
  // Historical/Regional
  arpent: "Arpent",
  pica: "Pica",
  point: "Point",
  twip: "Twip",
  aln: "Aln",
  famn: "Famn",
  caliber: "Caliber",
  ken: "Ken",
  "russian-arshin": "Russian Arshin",
  "roman-actus": "Roman Actus",
  "vara-de-tarea": "Vara de Tarea",
  "vara-conuquera": "Vara Conuquera",
  "vara-castellana": "Vara Castellana",
  "long-reed": "Long Reed",
  reed: "Reed",
  "long-cubit": "Long Cubit",
  handbreadth: "Handbreadth",
  fingerbreadth: "Fingerbreadth",
  
  // SI Extended Units (extreme)
  ronnameter: "Ronnameter (Rm)",
  quettameter: "Quettameter (Qm)", 
  rontometer: "Rontometer (rm)",
  quectometer: "Quectometer (qm)",
  
  // Additional Survey Units
  'foot-us-survey': "Foot (US Survey)",
  'yard-us-survey': "Yard (US Survey)",
  'inch-us-survey': "Inch (US Survey)",
  
  // Maritime/Nautical Extended
  'cable-international': "Cable (International)",
  'cable-uk': "Cable (UK)",
  'cable-us': "Cable (US)",
  
  // Traditional/Equine
  hand: "Hand (equine)",
  palm: "Palm",
  span: "Span",
  
  // Surveying/Engineering
  link: "Link (surveyor's)",
  
  // Additional Planetary
  'earth-diameter': "Earth's Diameter",
  'moon-radius': "Moon's Radius",
  'jupiter-radius': "Jupiter's Radius",
  
  // Additional Historical
  'biblical-cubit': "Biblical Cubit",
  'royal-cubit': "Royal Cubit (Egyptian)",
  'roman-foot': "Roman Foot",
  
  // Textile/Cloth Extended
  'cloth-nail': "Cloth Nail",
  'cloth-quarter': "Cloth Quarter",
  stick: "Stick (printing)",
};

// Unit categories for better organization
const unitCategories = {
  metric: {
    name: "Metric System",
    units: ["quettameter", "ronnameter", "exameter", "petameter", "terameter", "gigameter", "megameter", "kilometer", "hectometer", "dekameter", "meter", "decimeter", "centimeter", "millimeter", "micrometer", "micron", "nanometer", "picometer", "femtometer", "attometer", "rontometer", "quectometer"]
  },
  imperial: {
    name: "Imperial/US System",
    units: ["mile", "mile-statute", "mile-us-survey", "mile-roman", "kiloyard", "furlong", "chain", "rod", "perch", "pole", "fathom", "yard", "yard-us-survey", "foot", "foot-us-survey", "inch", "inch-us-survey", "ell", "cubit-uk", "cubit-greek", "span-cloth", "finger-cloth", "nail-cloth", "barleycorn", "thou", "microinch", "centiinch", "hand", "palm", "span", "link"]
  },
  astronomical: {
    name: "Astronomical Units",
    units: ["megaparsec", "kiloparsec", "parsec", "light-year", "astronomical-unit", "earth-sun-distance"]
  },
  nautical: {
    name: "Nautical Units",
    units: ["nautical-league-uk", "nautical-league-international", "league", "nautical-mile-uk", "nautical-mile-international", "cable-international", "cable-uk", "cable-us"]
  },
  scientific: {
    name: "Scientific Units",
    units: ["planck-length", "electron-radius-classical", "bohr-radius", "au-length", "fermi", "x-unit", "angstrom"]
  },
  earthSun: {
    name: "Planetary",
    units: ["sun-radius", "earth-equatorial-radius", "earth-polar-radius", "earth-diameter", "moon-radius", "jupiter-radius"]
  },
  historical: {
    name: "Historical/Regional",
    units: ["arpent", "russian-arshin", "roman-actus", "vara-de-tarea", "vara-conuquera", "vara-castellana", "long-reed", "reed", "long-cubit", "handbreadth", "fingerbreadth", "pica", "point", "twip", "aln", "famn", "caliber", "ken", "biblical-cubit", "royal-cubit", "roman-foot", "cloth-nail", "cloth-quarter", "stick"]
  }
};

// Type for Length units
type LengthUnit = keyof typeof conversionFactors;

/**
 * Length Converter Component
 * Allows users to convert between different length units
 */
export default function LengthConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<LengthUnit>('meter');
  const [toUnit, setToUnit] = useState<LengthUnit>('centimeter');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertLength();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one length unit to another
   */
  const convertLength = () => {
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
    // First convert to meters (base unit), then to target unit
    const inMeters = value * conversionFactors[fromUnit];
    const converted = inMeters / conversionFactors[toUnit];

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
    setFromUnit('meter');
    setToUnit('centimeter');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Ruler className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Length Converter</CardTitle>
            <CardDescription className="text-blue-100">
              Convert between 90+ units of length and distance with precision
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Input value and unit selection */}
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="length-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="length-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter length value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                data-testid="input-length-value"
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
                              .filter(unit => unitLabels[unit as LengthUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as LengthUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as LengthUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as LengthUnit]}
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
                              .filter(unit => unitLabels[unit as LengthUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as LengthUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as LengthUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as LengthUnit]}
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
          <div className="font-medium">Precision conversions between 90+ units</div>
          <div className="text-xs mt-1">Including metric, imperial, astronomical & scientific units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
