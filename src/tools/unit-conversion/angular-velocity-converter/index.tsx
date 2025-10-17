import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RotateCcw, ArrowRightLeft, RotateCw, Info } from "lucide-react";
import { motion } from "framer-motion";

// Angular velocity unit types
type AngularVelocityUnit = 
  | "radianPerSecond" | "degreePerSecond" | "revolutionPerMinute" 
  | "revolutionPerSecond" | "hertz" | "radianPerMinute" | "degreePerMinute";

// Conversion factors to radian per second (base unit)
const conversionFactors: Record<AngularVelocityUnit, number> = {
  radianPerSecond: 1,
  degreePerSecond: Math.PI / 180,
  revolutionPerMinute: Math.PI / 30, // RPM to rad/s
  revolutionPerSecond: 2 * Math.PI,
  hertz: 2 * Math.PI, // Hz to rad/s (same as rev/s)
  radianPerMinute: 1 / 60,
  degreePerMinute: Math.PI / (180 * 60),
};

// Unit display labels
const unitLabels: Record<AngularVelocityUnit, string> = {
  radianPerSecond: "Radian per Second (rad/s)",
  degreePerSecond: "Degree per Second (°/s)",
  revolutionPerMinute: "Revolution per Minute (RPM)",
  revolutionPerSecond: "Revolution per Second (rev/s)",
  hertz: "Hertz (Hz)",
  radianPerMinute: "Radian per Minute (rad/min)",
  degreePerMinute: "Degree per Minute (°/min)",
};

function AngularVelocityConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<AngularVelocityUnit>('revolutionPerMinute');
  const [toUnit, setToUnit] = useState<AngularVelocityUnit>('radianPerSecond');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertAngularVelocity();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one angular velocity unit to another
   */
  const convertAngularVelocity = () => {
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
    // First convert to radian per second (base unit), then to target unit
    const inRadianPerSecond = value * conversionFactors[fromUnit];
    const converted = inRadianPerSecond / conversionFactors[toUnit];

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
    setFromUnit('revolutionPerMinute');
    setToUnit('radianPerSecond');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <RotateCw className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Angular Velocity Converter</CardTitle>
            <CardDescription>
              Convert between different units of angular velocity and rotational speed
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="angular-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="angular-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter angular velocity"
                className="w-full"
                step="0.01"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as AngularVelocityUnit)}>
                  <SelectTrigger id="from-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revolutionPerMinute">RPM (rev/min)</SelectItem>
                    <SelectItem value="radianPerSecond">Radian per Second (rad/s)</SelectItem>
                    <SelectItem value="degreePerSecond">Degree per Second (°/s)</SelectItem>
                    <SelectItem value="revolutionPerSecond">Revolution per Second (rev/s)</SelectItem>
                    <SelectItem value="hertz">Hertz (Hz)</SelectItem>
                    <SelectItem value="radianPerMinute">Radian per Minute (rad/min)</SelectItem>
                    <SelectItem value="degreePerMinute">Degree per Minute (°/min)</SelectItem>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as AngularVelocityUnit)}>
                  <SelectTrigger id="to-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revolutionPerMinute">RPM (rev/min)</SelectItem>
                    <SelectItem value="radianPerSecond">Radian per Second (rad/s)</SelectItem>
                    <SelectItem value="degreePerSecond">Degree per Second (°/s)</SelectItem>
                    <SelectItem value="revolutionPerSecond">Revolution per Second (rev/s)</SelectItem>
                    <SelectItem value="hertz">Hertz (Hz)</SelectItem>
                    <SelectItem value="radianPerMinute">Radian per Minute (rad/min)</SelectItem>
                    <SelectItem value="degreePerMinute">Degree per Minute (°/min)</SelectItem>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    {`1 ${unitLabels[fromUnit]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toFixed(6)} ${unitLabels[toUnit]}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Common Angular Velocity Reference */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-2">Common Angular Velocity References:</h4>
            <div className="grid gap-1 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>60 RPM</span>
                <span>=</span>
                <span>6.28 rad/s</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 Hz</span>
                <span>=</span>
                <span>6.28 rad/s</span>
              </div>
              <div className="flex items-center justify-between">
                <span>360°/s</span>
                <span>=</span>
                <span>6.28 rad/s</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 rev/s</span>
                <span>=</span>
                <span>60 RPM</span>
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
          Accurate rotational speed and angular velocity conversions
        </div>
      </CardFooter>
    </Card>
  );
}

export default AngularVelocityConverter;
