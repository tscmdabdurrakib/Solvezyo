import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sun, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to candela as base unit)
const conversionFactors = {
  "candela": 1,
  "cd": 1,
  "millicandela": 0.001,
  "mcd": 0.001,
  "kilocandela": 1000,
  "kcd": 1000,
  "megacandela": 1000000,
  "Mcd": 1000000,
  "microcandela": 0.000001,
  "μcd": 0.000001,
  "nanocandela": 1e-9,
  "ncd": 1e-9,
  "picocandela": 1e-12,
  "pcd": 1e-12,
  "international-candle": 1.02,
  "IC": 1.02,
  "new-candle": 1.02,
  "NC": 1.02,
  "hefner-candle": 0.903,
  "HC": 0.903,
  "carcel": 9.74,
  "bougie-decimal": 1,
  "lumen/steradian": 1,
  "lm/sr": 1,
  "watt/steradian": 683, // at 555 nm (peak photopic sensitivity)
  "W/sr": 683,
  "milliwatt/steradian": 0.683,
  "mW/sr": 0.683,
  "kilowatt/steradian": 683000,
  "kW/sr": 683000,
};

// Unit display names with abbreviations
const unitLabels = {
  "candela": "Candela (cd)",
  "cd": "Candela (cd)",
  "millicandela": "Millicandela (mcd)",
  "mcd": "Millicandela (mcd)",
  "kilocandela": "Kilocandela (kcd)",
  "kcd": "Kilocandela (kcd)",
  "megacandela": "Megacandela (Mcd)",
  "Mcd": "Megacandela (Mcd)",
  "microcandela": "Microcandela (μcd)",
  "μcd": "Microcandela (μcd)",
  "nanocandela": "Nanocandela (ncd)",
  "ncd": "Nanocandela (ncd)",
  "picocandela": "Picocandela (pcd)",
  "pcd": "Picocandela (pcd)",
  "international-candle": "International Candle (IC)",
  "IC": "International Candle (IC)",
  "new-candle": "New Candle (NC)",
  "NC": "New Candle (NC)",
  "hefner-candle": "Hefner Candle (HC)",
  "HC": "Hefner Candle (HC)",
  "carcel": "Carcel",
  "bougie-decimal": "Bougie Decimal",
  "lumen/steradian": "Lumen per Steradian (lm/sr)",
  "lm/sr": "Lumen per Steradian (lm/sr)",
  "watt/steradian": "Watt per Steradian (W/sr)",
  "W/sr": "Watt per Steradian (W/sr)",
  "milliwatt/steradian": "Milliwatt per Steradian (mW/sr)",
  "mW/sr": "Milliwatt per Steradian (mW/sr)",
  "kilowatt/steradian": "Kilowatt per Steradian (kW/sr)",
  "kW/sr": "Kilowatt per Steradian (kW/sr)",
};

// Type for Luminous Intensity units
type LuminousIntensityUnit = keyof typeof conversionFactors;

export default function LuminousIntensityConverter() {
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<LuminousIntensityUnit>("candela");
  const [toUnit, setToUnit] = useState<LuminousIntensityUnit>("lm/sr");
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
      // Convert to base unit (candela) then to target unit
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
    setFromUnit("candela");
    setToUnit("lm/sr");
    setResult("");
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl text-white shadow-lg">
              <Sun size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Luminous Intensity Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different luminous intensity units for photometry and lighting applications
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
                <Select value={fromUnit} onValueChange={(value: LuminousIntensityUnit) => setFromUnit(value)}>
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
                <Select value={toUnit} onValueChange={(value: LuminousIntensityUnit) => setToUnit(value)}>
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
            <p>Common conversions: 1 candela = 1 lm/sr = 9.74 carcel</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
