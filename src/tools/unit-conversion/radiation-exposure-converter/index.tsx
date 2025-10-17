import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Radiation exposure conversion factors (to coulomb per kilogram as base unit)
const conversionFactors = {
  coulombPerKilogram: 1,
  roentgen: 0.000258,
  milliroentgen: 0.000000258,
  microroentgen: 0.000000000258
};

// Unit display names with abbreviations
const unitLabels = {
  coulombPerKilogram: "Coulomb per kilogram (C/kg)",
  roentgen: "Roentgen (R)",
  milliroentgen: "Milliroentgen (mR)",
  microroentgen: "Microroentgen (μR)"
};

// Type for radiation exposure units
type RadiationExposureUnit = keyof typeof conversionFactors;

/**
 * Radiation Exposure Converter Component
 * Allows users to convert between different units of radiation exposure
 */
export default function RadiationExposureConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<RadiationExposureUnit>('roentgen');
  const [toUnit, setToUnit] = useState<RadiationExposureUnit>('coulombPerKilogram');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertRadiationExposure();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one radiation exposure unit to another
   */
  const convertRadiationExposure = () => {
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

    // Validate that value is not negative (exposure cannot be negative)
    if (value < 0) {
      setError('Radiation exposure cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to coulomb per kilogram (base unit), then to target unit
    const inCoulombPerKg = value * conversionFactors[fromUnit];
    const converted = inCoulombPerKg / conversionFactors[toUnit];

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
    setFromUnit('roentgen');
    setToUnit('coulombPerKilogram');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Radiation Exposure Converter</CardTitle>
            <CardDescription>
              Convert between different units of ionizing radiation exposure
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <Label htmlFor="exposure-value" className="block text-sm font-medium mb-2">
                Enter Value
              </Label>
              <Input
                id="exposure-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter exposure"
                className="w-full"
                data-testid="input-exposure-value"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <Label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </Label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as RadiationExposureUnit)}>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as RadiationExposureUnit)}>
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
              <strong>About Radiation Exposure:</strong> Radiation exposure measures the amount of ionizing radiation 
              that travels through air. The roentgen (R) is the traditional unit, while the coulomb per kilogram (C/kg) 
              is the SI unit. One roentgen equals 2.58 × 10⁻⁴ C/kg. This measurement is important for radiation protection, 
              medical imaging, and environmental monitoring. Exposure differs from dose as it measures radiation in air, 
              not absorbed by tissue.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
