import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";

// Dry volume unit types
type DryVolumeUnit = 
  | "cubicInch" | "cubicFoot" | "peck" | "bushel" 
  | "liter" | "gallon" | "quart" | "pint" | "cup"
  | "tablespoon" | "teaspoon" | "milliliter";

// Conversion factors to cubic meters (base unit)
const conversionFactors: Record<DryVolumeUnit, number> = {
  cubicInch: 0.000016387064,
  cubicFoot: 0.028316846592,
  peck: 0.008809767541720406,
  bushel: 0.03523907016688162,
  liter: 0.001,
  gallon: 0.0037854117840007,
  quart: 0.0009463529460001758,
  pint: 0.0004731764730000879,
  cup: 0.0002365882365000439,
  tablespoon: 0.000014786764781252745,
  teaspoon: 0.000004928921593750915,
  milliliter: 0.000001,
};

// Unit display labels
const unitLabels: Record<DryVolumeUnit, string> = {
  cubicInch: "Cubic Inch (in³)",
  cubicFoot: "Cubic Foot (ft³)",
  peck: "Peck (pk)",
  bushel: "Bushel (bu)",
  liter: "Liter (L)",
  gallon: "Gallon (Dry)",
  quart: "Quart (Dry)",
  pint: "Pint (Dry)",
  cup: "Cup (Dry)",
  tablespoon: "Tablespoon (Dry)",
  teaspoon: "Teaspoon (Dry)",
  milliliter: "Milliliter (mL)",
};

function VolumeDryConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<DryVolumeUnit>('bushel');
  const [toUnit, setToUnit] = useState<DryVolumeUnit>('liter');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertDryVolume();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one dry volume unit to another
   */
  const convertDryVolume = () => {
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
    
    // Dry volume cannot be negative
    if (value < 0) {
      setError('Volume cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to cubic meters (base unit), then to target unit
    const inCubicMeters = value * conversionFactors[fromUnit];
    const converted = inCubicMeters / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    
    const absNum = Math.abs(num);
    
    if (absNum < 0.0000001) return num.toExponential(6);
    if (absNum < 0.00001) return num.toFixed(10);
    if (absNum < 0.0001) return num.toFixed(8);
    if (absNum < 0.001) return num.toFixed(6);
    if (absNum < 0.01) return num.toFixed(5);
    if (absNum < 1) return num.toFixed(4);
    if (absNum < 10) return num.toFixed(3);
    if (absNum < 100) return num.toFixed(2);
    if (absNum < 1000) return num.toFixed(1);
    
    return num.toFixed(0);
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
    setFromUnit('bushel');
    setToUnit('liter');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Package className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Dry Volume Converter</CardTitle>
            <CardDescription>
              Convert between different units of dry volume for grains, seeds, and dry goods
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="dry-volume-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="dry-volume-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter dry volume"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as DryVolumeUnit)}>
                  <SelectTrigger id="from-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bushel">Bushel (bu)</SelectItem>
                    <SelectItem value="peck">Peck (pk)</SelectItem>
                    <SelectItem value="gallon">Gallon (Dry)</SelectItem>
                    <SelectItem value="quart">Quart (Dry)</SelectItem>
                    <SelectItem value="pint">Pint (Dry)</SelectItem>
                    <SelectItem value="cup">Cup (Dry)</SelectItem>
                    <SelectItem value="tablespoon">Tablespoon (Dry)</SelectItem>
                    <SelectItem value="teaspoon">Teaspoon (Dry)</SelectItem>
                    <SelectItem value="liter">Liter (L)</SelectItem>
                    <SelectItem value="milliliter">Milliliter (mL)</SelectItem>
                    <SelectItem value="cubicFoot">Cubic Foot (ft³)</SelectItem>
                    <SelectItem value="cubicInch">Cubic Inch (in³)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center items-center sm:col-span-1">
                <motion.div
                  animate={{ rotate: swapAnimation ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full h-10 w-10 bg-muted hover:bg-primary/10"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="sr-only">Swap units</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="to-unit" className="block text-sm font-medium mb-2">
                  To
                </label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as DryVolumeUnit)}>
                  <SelectTrigger id="to-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bushel">Bushel (bu)</SelectItem>
                    <SelectItem value="peck">Peck (pk)</SelectItem>
                    <SelectItem value="gallon">Gallon (Dry)</SelectItem>
                    <SelectItem value="quart">Quart (Dry)</SelectItem>
                    <SelectItem value="pint">Pint (Dry)</SelectItem>
                    <SelectItem value="cup">Cup (Dry)</SelectItem>
                    <SelectItem value="tablespoon">Tablespoon (Dry)</SelectItem>
                    <SelectItem value="teaspoon">Teaspoon (Dry)</SelectItem>
                    <SelectItem value="liter">Liter (L)</SelectItem>
                    <SelectItem value="milliliter">Milliliter (mL)</SelectItem>
                    <SelectItem value="cubicFoot">Cubic Foot (ft³)</SelectItem>
                    <SelectItem value="cubicInch">Cubic Inch (in³)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conversion Result */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {result ? (
                  <>
                    {result} <span className="text-lg font-normal">{unitLabels[toUnit]?.split(' ')[1]?.replace(/[()]/g, '')}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground text-lg">— Enter a value to convert —</span>
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
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} ${unitLabels[fromUnit]} = ${result} ${unitLabels[toUnit]}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {`1 ${unitLabels[fromUnit]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toFixed(6)} ${unitLabels[toUnit]}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Common Dry Volume Reference */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-2">Common Dry Volume References:</h4>
            <div className="grid gap-1 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>1 Bushel</span>
                <span>=</span>
                <span>4 Pecks</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 Peck</span>
                <span>=</span>
                <span>8 Quarts (Dry)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 Bushel</span>
                <span>=</span>
                <span>35.24 Liters</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 Cup (Dry)</span>
                <span>=</span>
                <span>16 Tablespoons</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Accurate conversions for dry goods and agricultural products
        </div>
      </CardFooter>
    </Card>
  );
}

export default VolumeDryConverter;
