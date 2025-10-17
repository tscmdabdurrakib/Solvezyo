import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, ArrowRightLeft, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ConversionCalculator Component
 * 
 * Quick multi-category unit converter
 */
export function ConversionCalculator() {
  const { toast } = useToast();

  // State for input values
  const [category, setCategory] = useState<string>('length');
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('feet');
  
  // State for result
  const [result, setResult] = useState<number>(0);

  // Conversion categories and units
  const categories: {[key: string]: {name: string, units: {[key: string]: {name: string, factor: number}}}} = {
    length: {
      name: 'Length',
      units: {
        meters: { name: 'Meters', factor: 1 },
        kilometers: { name: 'Kilometers', factor: 0.001 },
        feet: { name: 'Feet', factor: 3.28084 },
        miles: { name: 'Miles', factor: 0.000621371 },
        inches: { name: 'Inches', factor: 39.3701 },
        yards: { name: 'Yards', factor: 1.09361 },
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilograms: { name: 'Kilograms', factor: 1 },
        grams: { name: 'Grams', factor: 1000 },
        pounds: { name: 'Pounds', factor: 2.20462 },
        ounces: { name: 'Ounces', factor: 35.274 },
        tons: { name: 'Metric Tons', factor: 0.001 },
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        celsius: { name: 'Celsius', factor: 1 },
        fahrenheit: { name: 'Fahrenheit', factor: 1 },
        kelvin: { name: 'Kelvin', factor: 1 },
      }
    },
    volume: {
      name: 'Volume',
      units: {
        liters: { name: 'Liters', factor: 1 },
        milliliters: { name: 'Milliliters', factor: 1000 },
        gallons: { name: 'Gallons (US)', factor: 0.264172 },
        cups: { name: 'Cups', factor: 4.22675 },
        pints: { name: 'Pints', factor: 2.11338 },
        quarts: { name: 'Quarts', factor: 1.05669 },
      }
    },
  };

  // Calculate conversion when inputs change
  useEffect(() => {
    calculateConversion();
  }, [category, value, fromUnit, toUnit]);

  // Update units when category changes
  useEffect(() => {
    const units = Object.keys(categories[category].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [category]);

  // Function to convert temperature
  const convertTemperature = (val: number, from: string, to: string): number => {
    let celsius: number;

    // Convert to Celsius first
    if (from === 'celsius') celsius = val;
    else if (from === 'fahrenheit') celsius = (val - 32) * 5/9;
    else celsius = val - 273.15; // kelvin

    // Convert from Celsius to target
    if (to === 'celsius') return celsius;
    else if (to === 'fahrenheit') return celsius * 9/5 + 32;
    else return celsius + 273.15; // kelvin
  };

  // Function to calculate conversion
  const calculateConversion = () => {
    if (category === 'temperature') {
      const converted = convertTemperature(value, fromUnit, toUnit);
      setResult(converted);
    } else {
      const units = categories[category].units;
      // Convert to base unit first, then to target unit
      const baseValue = value / units[fromUnit].factor;
      const converted = baseValue * units[toUnit].factor;
      setResult(converted);
    }
  };

  // Function to swap units
  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Function to reset
  const handleReset = () => {
    setValue(1);
    setCategory('length');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const resultText = `Conversion Result:
${value} ${categories[category].units[fromUnit].name} = ${result.toFixed(4)} ${categories[category].units[toUnit].name}`;

    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied!",
      description: "Conversion result copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Conversion Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Quick and easy unit conversions for multiple categories
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Conversion Settings
          </h2>
          
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categories).map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {categories[cat].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Value Input */}
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                step="any"
                className="mt-1.5"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>

            {/* From Unit */}
            <div>
              <Label htmlFor="fromUnit">From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categories[category].units).map(unit => (
                    <SelectItem key={unit} value={unit}>
                      {categories[category].units[unit].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button onClick={swapUnits} variant="outline" size="sm">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* To Unit */}
            <div>
              <Label htmlFor="toUnit">To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categories[category].units).map(unit => (
                    <SelectItem key={unit} value={unit}>
                      {categories[category].units[unit].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Conversion Result</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-center">
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                        {value} {categories[category].units[fromUnit].name}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">equals</div>
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        {result.toFixed(4)}
                      </div>
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mt-2">
                        {categories[category].units[toUnit].name}
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Quick Reference
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>1 {categories[category].units[fromUnit].name}</span>
                        <span className="font-bold">
                          {(1 / categories[category].units[fromUnit].factor * categories[category].units[toUnit].factor).toFixed(4)} {categories[category].units[toUnit].name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Available Categories</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Length: meters, kilometers, feet, miles, inches, yards
              </p>
              <p>
                • Weight: kilograms, grams, pounds, ounces, tons
              </p>
              <p>
                • Temperature: Celsius, Fahrenheit, Kelvin
              </p>
              <p>
                • Volume: liters, milliliters, gallons, cups, pints, quarts
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ConversionCalculator;
