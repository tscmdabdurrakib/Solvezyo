import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to cd/m² as base unit)
const conversionFactors = {
  "cd/m²": 1,
  "cd/cm²": 10000,
  "cd/ft²": 10.764,
  "cd/in²": 10.764*144,
  "nit": 1,
  "stilb": 10000,
  "apostilb": 1/Math.PI,
  "blondel": 1/Math.PI,
  "skot": 1e-3/Math.PI,
  "bril": 1e-7/Math.PI,
  "lambert": 10000/Math.PI,
  "millilambert": 10/Math.PI,
  "foot-lambert": 10.764/Math.PI,
  "lm/m²/sr": 1,
  "lm/cm²/sr": 10000,
  "lm/ft²/sr": 10.764,
  "lm/in²/sr": 10.764*144,
  "W/(m²·sr)": 683, // at 555 nm (peak photopic sensitivity)
  "W/(cm²·sr)": 683*10000,
  "W/(ft²·sr)": 683*10.764,
  "W/(in²·sr)": 683*10.764*144,
};

// Unit display names with abbreviations
const unitLabels = {
  "cd/m²": "Candela per Square Meter (cd/m²)",
  "cd/cm²": "Candela per Square Centimeter (cd/cm²)",
  "cd/ft²": "Candela per Square Foot (cd/ft²)",
  "cd/in²": "Candela per Square Inch (cd/in²)",
  "nit": "Nit (nt)",
  "stilb": "Stilb (sb)",
  "apostilb": "Apostilb (asb)",
  "blondel": "Blondel (bl)",
  "skot": "Skot (sk)",
  "bril": "Bril (bril)",
  "lambert": "Lambert (L)",
  "millilambert": "Millilambert (mL)",
  "foot-lambert": "Foot-lambert (fL)",
  "lm/m²/sr": "Lumen per Square Meter per Steradian (lm/(m²·sr))",
  "lm/cm²/sr": "Lumen per Square Centimeter per Steradian (lm/(cm²·sr))",
  "lm/ft²/sr": "Lumen per Square Foot per Steradian (lm/(ft²·sr))",
  "lm/in²/sr": "Lumen per Square Inch per Steradian (lm/(in²·sr))",
  "W/(m²·sr)": "Watt per Square Meter per Steradian (W/(m²·sr))",
  "W/(cm²·sr)": "Watt per Square Centimeter per Steradian (W/(cm²·sr))",
  "W/(ft²·sr)": "Watt per Square Foot per Steradian (W/(ft²·sr))",
  "W/(in²·sr)": "Watt per Square Inch per Steradian (W/(in²·sr))",
};

// Type for Luminance units
type LuminanceUnit = keyof typeof conversionFactors;

export default function LuminanceConverter() {
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<LuminanceUnit>("cd/m²");
  const [toUnit, setToUnit] = useState<LuminanceUnit>("nit");
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
      // Convert to base unit (cd/m²) then to target unit
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
    setFromUnit("cd/m²");
    setToUnit("nit");
    setResult("");
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl text-white shadow-lg">
              <Lightbulb size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Luminance Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different luminance units for photometry and optical applications
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
                <Select value={fromUnit} onValueChange={(value: LuminanceUnit) => setFromUnit(value)}>
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
                <Select value={toUnit} onValueChange={(value: LuminanceUnit) => setToUnit(value)}>
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
            <p>Common conversions: 1 cd/m² = 1 nit = 0.29 foot-lambert</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
