import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, TreePine } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Volume lumber conversion factors (to cubic meters as base unit)
const conversionFactors = {
  cubicMeter: 1,
  cubicFoot: 0.0283168,
  cubicInch: 0.0000163871,
  boardFoot: 0.00235974,
  cord: 3.62456,
  cubicYard: 0.764555,
  liter: 0.001,
  gallon: 0.00378541,
  stere: 1,
  registerTon: 2.83168
};

// Unit display names with abbreviations
const unitLabels = {
  cubicMeter: "Cubic meter (m³)",
  cubicFoot: "Cubic foot (ft³)",
  cubicInch: "Cubic inch (in³)",
  boardFoot: "Board foot (bf)",
  cord: "Cord",
  cubicYard: "Cubic yard (yd³)",
  liter: "Liter (L)",
  gallon: "Gallon (gal)",
  stere: "Stere (st)",
  registerTon: "Register ton (RT)"
};

// Type for volume lumber units
type VolumeLumberUnit = keyof typeof conversionFactors;

/**
 * Volume Lumber Converter Component
 * Allows users to convert between different units of lumber volume
 */
export default function VolumeLumberConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<VolumeLumberUnit>('boardFoot');
  const [toUnit, setToUnit] = useState<VolumeLumberUnit>('cubicFoot');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertVolumeLumber();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one volume lumber unit to another
   */
  const convertVolumeLumber = () => {
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

    // Validate that value is not negative (volume cannot be negative)
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
    
    if (Math.abs(num) < 0.000001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.001) {
      return num.toFixed(8);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(2);
    } else if (Math.abs(num) < 1000000) {
      return num.toFixed(1);
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
    setFromUnit('boardFoot');
    setToUnit('cubicFoot');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <TreePine className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Volume - Lumber Converter</CardTitle>
            <CardDescription>
              Convert between different units of lumber and wood volume measurements
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <Label htmlFor="lumber-value" className="block text-sm font-medium mb-2">
                Enter Value
              </Label>
              <Input
                id="lumber-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter lumber volume"
                className="w-full"
                data-testid="input-lumber-value"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <Label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </Label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as VolumeLumberUnit)}>
                  <SelectTrigger id="from-unit" data-testid="select-from-unit">
                    <SelectValue placeholder="Select unit" />
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as VolumeLumberUnit)}>
                  <SelectTrigger id="to-unit" data-testid="select-to-unit">
                    <SelectValue placeholder="Select unit" />
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
                {result} {unitLabels[toUnit].split(' ')[unitLabels[toUnit].split(' ').length - 1].replace('(', '').replace(')', '')}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {inputValue} {unitLabels[fromUnit].split(' ')[unitLabels[fromUnit].split(' ').length - 1].replace('(', '').replace(')', '')} = {result} {unitLabels[toUnit].split(' ')[unitLabels[toUnit].split(' ').length - 1].replace('(', '').replace(')', '')}
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
              <strong>About Lumber Volume:</strong> Lumber volume measurements are used in the forestry and construction 
              industries. A board foot is the most common lumber measurement, representing a piece of wood 1 foot wide, 
              1 foot long, and 1 inch thick (144 cubic inches). A cord is a stack of wood 4 feet high, 4 feet wide, 
              and 8 feet long (128 cubic feet). These measurements are essential for pricing lumber, calculating material 
              needs for construction projects, and managing forest resources.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
