import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Radiation activity conversion factors (to becquerels as base unit)
const conversionFactors = {
  becquerel: 1,
  kilobecquerel: 1000,
  megabecquerel: 1000000,
  gigabecquerel: 1000000000,
  terabecquerel: 1000000000000,
  curie: 37000000000,
  millicurie: 37000000,
  microcurie: 37000,
  nanocurie: 37,
  picocurie: 0.037,
  rutherford: 1000000
};

// Unit display names with abbreviations
const unitLabels = {
  becquerel: "Becquerel (Bq)",
  kilobecquerel: "Kilobecquerel (kBq)",
  megabecquerel: "Megabecquerel (MBq)",
  gigabecquerel: "Gigabecquerel (GBq)",
  terabecquerel: "Terabecquerel (TBq)",
  curie: "Curie (Ci)",
  millicurie: "Millicurie (mCi)",
  microcurie: "Microcurie (μCi)",
  nanocurie: "Nanocurie (nCi)",
  picocurie: "Picocurie (pCi)",
  rutherford: "Rutherford (Rd)"
};

// Type for radiation activity units
type RadiationActivityUnit = keyof typeof conversionFactors;

/**
 * Radiation Activity Converter Component
 * Allows users to convert between different units of radioactivity
 */
export default function RadiationActivityConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<RadiationActivityUnit>('becquerel');
  const [toUnit, setToUnit] = useState<RadiationActivityUnit>('curie');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertRadiationActivity();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one radiation activity unit to another
   */
  const convertRadiationActivity = () => {
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

    // Validate that value is not negative (radioactivity cannot be negative)
    if (value < 0) {
      setError('Radioactivity cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to becquerels (base unit), then to target unit
    const inBecquerels = value * conversionFactors[fromUnit];
    const converted = inBecquerels / conversionFactors[toUnit];

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
    setFromUnit('becquerel');
    setToUnit('curie');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Radiation Activity Converter</CardTitle>
            <CardDescription>
              Convert between different units of radioactivity and nuclear decay
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <Label htmlFor="activity-value" className="block text-sm font-medium mb-2">
                Enter Value
              </Label>
              <Input
                id="activity-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter activity"
                className="w-full"
                data-testid="input-activity-value"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <Label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </Label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as RadiationActivityUnit)}>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as RadiationActivityUnit)}>
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
                {result} {unitLabels[toUnit].split(' ')[1]}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {inputValue} {unitLabels[fromUnit].split(' ')[1]} = {result} {unitLabels[toUnit].split(' ')[1]}
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
              <strong>About Radiation Activity:</strong> Radiation activity measures the rate of radioactive decay. 
              The becquerel (Bq) is the SI unit, representing one decay per second. The curie (Ci) is an older unit 
              equal to 3.7 × 10¹⁰ decays per second, roughly the activity of 1 gram of radium-226. 
              This tool helps convert between these units for nuclear physics, medical applications, 
              and radiation safety calculations.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
