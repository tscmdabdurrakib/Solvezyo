import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Droplets, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to m²/s as base unit)
const conversionFactors = {
  "m²/s": 1,
  "cm²/s": 0.0001,
  "mm²/s": 0.000001,
  "ft²/s": 0.092903,
  "in²/s": 0.00064516,
  "stokes": 0.0001, // St
  "centistokes": 0.000001, // cSt
  "m²/h": 1/3600,
  "cm²/h": 0.0001/3600,
  "mm²/h": 0.000001/3600,
  "ft²/h": 0.092903/3600,
  "in²/h": 0.00064516/3600,
  "ft²/min": 0.092903/60,
  "in²/min": 0.00064516/60,
  "acre/h": 4046.8564224/3600,
  "m²/d": 1/86400,
  "cm²/d": 0.0001/86400,
};

// Unit display names with abbreviations
const unitLabels = {
  "m²/s": "Square Meter per Second (m²/s)",
  "cm²/s": "Square Centimeter per Second (cm²/s)",
  "mm²/s": "Square Millimeter per Second (mm²/s)",
  "ft²/s": "Square Foot per Second (ft²/s)",
  "in²/s": "Square Inch per Second (in²/s)",
  "stokes": "Stokes (St)",
  "centistokes": "Centistokes (cSt)",
  "m²/h": "Square Meter per Hour (m²/h)",
  "cm²/h": "Square Centimeter per Hour (cm²/h)",
  "mm²/h": "Square Millimeter per Hour (mm²/h)",
  "ft²/h": "Square Foot per Hour (ft²/h)",
  "in²/h": "Square Inch per Hour (in²/h)",
  "ft²/min": "Square Foot per Minute (ft²/min)",
  "in²/min": "Square Inch per Minute (in²/min)",
  "acre/h": "Acre per Hour (acre/h)",
  "m²/d": "Square Meter per Day (m²/d)",
  "cm²/d": "Square Centimeter per Day (cm²/d)",
};

// Type for Kinematic Viscosity units
type KinematicViscosityUnit = keyof typeof conversionFactors;

export default function ViscosityKinematicConverter() {
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<KinematicViscosityUnit>("m²/s");
  const [toUnit, setToUnit] = useState<KinematicViscosityUnit>("stokes");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform conversion
  useEffect(() => {
    if (inputValue === "" || inputValue === "-") {
      setResult("");
      setError("");
      return;
    }

    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) {
      setError("Please enter a valid number");
      setResult("");
      return;
    }

    try {
      // Convert to base unit (m²/s) then to target unit
      const baseValue = numericValue * conversionFactors[fromUnit];
      const convertedValue = baseValue / conversionFactors[toUnit];
      
      // Format the result
      if (convertedValue === 0) {
        setResult("0");
      } else if (Math.abs(convertedValue) < 0.000001) {
        setResult(convertedValue.toExponential(6));
      } else if (Math.abs(convertedValue) >= 1000000) {
        setResult(convertedValue.toExponential(6));
      } else {
        setResult(parseFloat(convertedValue.toPrecision(8)).toString());
      }
      setError("");
    } catch (err) {
      setError("Conversion error occurred");
      setResult("");
    }
  }, [inputValue, fromUnit, toUnit]);

  const swapUnits = () => {
    setSwapAnimation(true);
    setTimeout(() => setSwapAnimation(false), 500);
    
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    
    if (result) {
      setInputValue(result);
    }
  };

  const resetFields = () => {
    setInputValue("");
    setFromUnit("m²/s");
    setToUnit("stokes");
    setResult("");
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white shadow-lg">
              <Droplets size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Viscosity - Kinematic Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different kinematic viscosity units for fluid mechanics and engineering applications
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <Info className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Value
                </label>
                <Input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value to convert"
                  className="w-full text-lg"
                  data-testid="input-value"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value: KinematicViscosityUnit) => setFromUnit(value)}>
                  <SelectTrigger className="w-full" data-testid="select-from-unit">
                    <SelectValue />
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
              <div className="md:col-span-2 flex justify-center">
                <motion.div
                  animate={{ rotate: swapAnimation ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    title="Swap units"
                    data-testid="button-swap"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  To
                </label>
                <Select value={toUnit} onValueChange={(value: KinematicViscosityUnit) => setToUnit(value)}>
                  <SelectTrigger className="w-full" data-testid="select-to-unit">
                    <SelectValue />
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

          <Separator />

          {/* Result Section */}
          <div className="space-y-4">
            <div className="text-center">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Result
              </label>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 min-h-[2.5rem] flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-lg py-4">
                <span data-testid="result-value">{result || "0"}</span>
              </div>
              {result && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {inputValue} {unitLabels[fromUnit]} = {result} {unitLabels[toUnit]}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={resetFields}
              className="flex items-center gap-2"
              data-testid="button-reset"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t bg-gray-50/50 dark:bg-gray-800/50">
          <div className="w-full text-center text-xs text-gray-500 dark:text-gray-400">
            <p>Common conversions: 1 m²/s = 10,000 stokes = 1,000,000 centistokes</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
