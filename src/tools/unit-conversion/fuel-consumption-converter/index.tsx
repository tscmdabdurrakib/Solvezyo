import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Fuel, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";

// Fuel consumption unit types
type FuelConsumptionUnit = 
  | "mpgUS" | "mpgUK" | "kmPerLiter" | "litersPer100km" 
  | "gallonUSPer100miles" | "gallonUKPer100miles" | "litersPerkm" 
  | "milesPerLiterUS" | "milesPerLiterUK";

// Conversion calculation functions
const convertFuelConsumption = (value: number, fromUnit: FuelConsumptionUnit, toUnit: FuelConsumptionUnit): number => {
  // Convert everything to L/100km as base, then to target
  let baseValue: number;
  
  // Convert from source to L/100km
  switch (fromUnit) {
    case "mpgUS":
      baseValue = 235.214583 / value;
      break;
    case "mpgUK":
      baseValue = 282.481 / value;
      break;
    case "kmPerLiter":
      baseValue = 100 / value;
      break;
    case "litersPer100km":
      baseValue = value;
      break;
    case "gallonUSPer100miles":
      baseValue = value * 235.214583 / 100;
      break;
    case "gallonUKPer100miles":
      baseValue = value * 282.481 / 100;
      break;
    case "litersPerkm":
      baseValue = value * 100;
      break;
    case "milesPerLiterUS":
      baseValue = 235.214583 / value;
      break;
    case "milesPerLiterUK":
      baseValue = 282.481 / value;
      break;
    default:
      baseValue = value;
  }
  
  // Convert from L/100km to target unit
  switch (toUnit) {
    case "mpgUS":
      return 235.214583 / baseValue;
    case "mpgUK":
      return 282.481 / baseValue;
    case "kmPerLiter":
      return 100 / baseValue;
    case "litersPer100km":
      return baseValue;
    case "gallonUSPer100miles":
      return baseValue * 100 / 235.214583;
    case "gallonUKPer100miles":
      return baseValue * 100 / 282.481;
    case "litersPerkm":
      return baseValue / 100;
    case "milesPerLiterUS":
      return 235.214583 / baseValue;
    case "milesPerLiterUK":
      return 282.481 / baseValue;
    default:
      return baseValue;
  }
};

// Unit display labels
const unitLabels: Record<FuelConsumptionUnit, string> = {
  mpgUS: "Miles per Gallon (US)",
  mpgUK: "Miles per Gallon (UK)",
  kmPerLiter: "Kilometers per Liter (km/L)",
  litersPer100km: "Liters per 100 Kilometers (L/100km)",
  'liter/100 km': 'liter/100 km [L/100 km]',
  'gallon (US)/mile': 'gallon (US)/mile',
  'gallon (US)/100 mi': 'gallon (US)/100 mi',
  'gallon (UK)/mile': 'gallon (UK)/mile',
  milesPerLiterUK: "Miles per Liter (UK)",
};

function FuelConsumptionConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<FuelConsumptionUnit>('mpgUS');
  const [toUnit, setToUnit] = useState<FuelConsumptionUnit>('litersPer100km');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertValue();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one fuel consumption unit to another
   */
  const convertValue = () => {
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
    
    // Fuel consumption cannot be negative or zero
    if (value <= 0) {
      setError('Fuel consumption must be positive');
      setResult('');
      return;
    }

    try {
      // Perform conversion
      const converted = convertFuelConsumption(value, fromUnit, toUnit);

      // Format the result based on the magnitude for better readability
      const roundedResult = formatResult(converted);
      setResult(roundedResult);
    } catch (err) {
      setError('Conversion error occurred');
      setResult('');
    }
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    
    const absNum = Math.abs(num);
    
    if (absNum < 0.0001) return num.toExponential(4);
    if (absNum < 0.001) return num.toFixed(6);
    if (absNum < 0.01) return num.toFixed(4);
    if (absNum < 1) return num.toFixed(3);
    if (absNum < 10) return num.toFixed(2);
    if (absNum < 100) return num.toFixed(1);
    
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
    setFromUnit('mpgUS');
    setToUnit('litersPer100km');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Fuel className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Fuel Consumption Converter</CardTitle>
            <CardDescription>
              Convert between different fuel consumption and efficiency units
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="fuel-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="fuel-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter fuel consumption"
                className="w-full"
                step="0.1"
                min="0"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as FuelConsumptionUnit)}>
                  <SelectTrigger id="from-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mpgUS">Miles per Gallon (US)</SelectItem>
                    <SelectItem value="mpgUK">Miles per Gallon (UK)</SelectItem>
                    <SelectItem value="kmPerLiter">Kilometers per Liter (km/L)</SelectItem>
                    <SelectItem value="litersPer100km">Liters per 100 km (L/100km)</SelectItem>
                    <SelectItem value="gallonUSPer100miles">Gallons (US) per 100 Miles</SelectItem>
                    <SelectItem value="gallonUKPer100miles">Gallons (UK) per 100 Miles</SelectItem>
                    <SelectItem value="milesPerLiterUS">Miles per Liter (US)</SelectItem>
                    <SelectItem value="milesPerLiterUK">Miles per Liter (UK)</SelectItem>
                    <SelectItem value="litersPerkm">Liters per Kilometer</SelectItem>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as FuelConsumptionUnit)}>
                  <SelectTrigger id="to-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mpgUS">Miles per Gallon (US)</SelectItem>
                    <SelectItem value="mpgUK">Miles per Gallon (UK)</SelectItem>
                    <SelectItem value="kmPerLiter">Kilometers per Liter (km/L)</SelectItem>
                    <SelectItem value="litersPer100km">Liters per 100 km (L/100km)</SelectItem>
                    <SelectItem value="gallonUSPer100miles">Gallons (US) per 100 Miles</SelectItem>
                    <SelectItem value="gallonUKPer100miles">Gallons (UK) per 100 Miles</SelectItem>
                    <SelectItem value="milesPerLiterUS">Miles per Liter (US)</SelectItem>
                    <SelectItem value="milesPerLiterUK">Miles per Liter (UK)</SelectItem>
                    <SelectItem value="litersPerkm">Liters per Kilometer</SelectItem>
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

          {/* Conversion Details */}
          {result && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} ${unitLabels[fromUnit]} = ${result} ${unitLabels[toUnit]}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Common Fuel Consumption Reference */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-2">Common Fuel Consumption References:</h4>
            <div className="grid gap-1 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>30 MPG (US)</span>
                <span>=</span>
                <span>7.84 L/100km</span>
              </div>
              <div className="flex items-center justify-between">
                <span>40 MPG (US)</span>
                <span>=</span>
                <span>5.88 L/100km</span>
              </div>
              <div className="flex items-center justify-between">
                <span>15 km/L</span>
                <span>=</span>
                <span>6.67 L/100km</span>
              </div>
              <div className="flex items-center justify-between">
                <span>5 L/100km</span>
                <span>=</span>
                <span>47.04 MPG (US)</span>
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
          Accurate fuel consumption conversions for vehicles
        </div>
      </CardFooter>
    </Card>
  );
}

export default FuelConsumptionConverter;
