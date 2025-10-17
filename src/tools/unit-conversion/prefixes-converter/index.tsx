import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Hash } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// SI prefixes conversion factors (to base unit 1)
const conversionFactors = {
  yocto: 0.000000000000000000000001,
  zepto: 0.000000000000000000001,
  atto: 0.000000000000000001,
  femto: 0.000000000000001,
  pico: 0.000000000001,
  nano: 0.000000001,
  micro: 0.000001,
  milli: 0.001,
  centi: 0.01,
  deci: 0.1,
  base: 1,
  deca: 10,
  hecto: 100,
  kilo: 1000,
  mega: 1000000,
  giga: 1000000000,
  tera: 1000000000000,
  peta: 1000000000000000,
  exa: 1000000000000000000,
  zetta: 1000000000000000000000,
  yotta: 1000000000000000000000000
};

// Unit display names with symbols and powers
const unitLabels = {
  yocto: "yocto (y) - 10⁻²⁴",
  zepto: "zepto (z) - 10⁻²¹",
  atto: "atto (a) - 10⁻¹⁸",
  femto: "femto (f) - 10⁻¹⁵",
  pico: "pico (p) - 10⁻¹²",
  nano: "nano (n) - 10⁻⁹",
  micro: "micro (μ) - 10⁻⁶",
  milli: "milli (m) - 10⁻³",
  centi: "centi (c) - 10⁻²",
  deci: "deci (d) - 10⁻¹",
  base: "base unit (1) - 10⁰",
  deca: "deca (da) - 10¹",
  hecto: "hecto (h) - 10²",
  kilo: "kilo (k) - 10³",
  mega: "mega (M) - 10⁶",
  giga: "giga (G) - 10⁹",
  tera: "tera (T) - 10¹²",
  peta: "peta (P) - 10¹⁵",
  exa: "exa (E) - 10¹⁸",
  zetta: "zetta (Z) - 10²¹",
  yotta: "yotta (Y) - 10²⁴"
};

// Type for SI prefix units
type PrefixUnit = keyof typeof conversionFactors;

/**
 * Prefixes Converter Component
 * Allows users to convert between different SI prefixes
 */
export default function PrefixesConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<PrefixUnit>('kilo');
  const [toUnit, setToUnit] = useState<PrefixUnit>('mega');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertPrefixes();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one prefix unit to another
   */
  const convertPrefixes = () => {
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
    // First convert to base unit, then to target unit
    const inBaseUnit = value * conversionFactors[fromUnit];
    const converted = inBaseUnit / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    
    if (Math.abs(num) < 0.000000000001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.000001) {
      return num.toExponential(4);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(10);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(8);
    } else if (Math.abs(num) < 1000) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 1000000) {
      return num.toFixed(2);
    } else {
      return num.toExponential(4);
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
    setFromUnit('kilo');
    setToUnit('mega');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Hash className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">SI Prefixes Converter</CardTitle>
            <CardDescription>
              Convert between different SI metric prefixes and scale factors
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <Label htmlFor="prefix-value" className="block text-sm font-medium mb-2">
                Enter Value
              </Label>
              <Input
                id="prefix-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="w-full"
                data-testid="input-prefix-value"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <Label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </Label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as PrefixUnit)}>
                  <SelectTrigger id="from-unit" data-testid="select-from-unit">
                    <SelectValue placeholder="Select prefix" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitLabels).map(([unit, label]) => (
                      <SelectItem key={unit} value={unit}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-1 flex justify-center">
                <motion.div
                  animate={{ rotate: swapAnimation ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={swapUnits}
                    className="h-10 w-10 rounded-full"
                    data-testid="button-swap-units"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="to-unit" className="block text-sm font-medium mb-2">
                  To
                </Label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as PrefixUnit)}>
                  <SelectTrigger id="to-unit" data-testid="select-to-unit">
                    <SelectValue placeholder="Select prefix" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitLabels).map(([unit, label]) => (
                      <SelectItem key={unit} value={unit}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Result display */}
          {result && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-muted rounded-lg"
            >
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Result
              </Label>
              <div className="text-2xl font-bold text-primary" data-testid="text-result">
                {result} {toUnit}units
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {inputValue} {fromUnit}units = {result} {toUnit}units
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Multiplication factor: {(conversionFactors[fromUnit] / conversionFactors[toUnit]).toExponential(2)}
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={resetConverter}
              className="flex items-center gap-2"
              data-testid="button-reset"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Info section */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>About SI Prefixes:</strong> SI prefixes are used to form decimal multiples and submultiples 
              of SI units. They range from yocto (10⁻²⁴) to yotta (10²⁴). Common examples include kilo- (1,000), 
              mega- (1,000,000), milli- (0.001), and micro- (0.000001). These prefixes are essential in science, 
              engineering, and technology for expressing very large or very small quantities. 
              This converter helps you understand the relationships between different scales.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
