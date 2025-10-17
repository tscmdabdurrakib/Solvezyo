import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Network, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to m² as base unit)
const conversionFactors = {
  "m²": 1,
  "cm²": 0.0001,
  "mm²": 0.000001,
  "μm²": 1e-12,
  "nm²": 1e-18,
  "ft²": 0.092903,
  "in²": 0.00064516,
  "darcy": 9.869233e-13,
  "mD": 9.869233e-16, // millidarcy
  "μD": 9.869233e-19, // microdarcy
  "nD": 9.869233e-22, // nanodarcy
  "pD": 9.869233e-25, // picodarcy
  "fD": 9.869233e-28, // femtodarcy
  "barn": 1e-28,
  "millibarn": 1e-31,
  "microbarn": 1e-34,
  "nanobarn": 1e-37,
  "picobarn": 1e-40,
  "femtobarn": 1e-43,
  "attobarn": 1e-46,
  "acre": 4047,
  "hectare": 10000,
};

// Unit display names with abbreviations
const unitLabels = {
  "m²": "Square Meter (m²)",
  "cm²": "Square Centimeter (cm²)",
  "mm²": "Square Millimeter (mm²)",
  "μm²": "Square Micrometer (μm²)",
  "nm²": "Square Nanometer (nm²)",
  "ft²": "Square Foot (ft²)",
  "in²": "Square Inch (in²)",
  "darcy": "Darcy (D)",
  "mD": "Millidarcy (mD)",
  "μD": "Microdarcy (μD)",
  "nD": "Nanodarcy (nD)",
  "pD": "Picodarcy (pD)",
  "fD": "Femtodarcy (fD)",
  "barn": "Barn (b)",
  "millibarn": "Millibarn (mb)",
  "microbarn": "Microbarn (μb)",
  "nanobarn": "Nanobarn (nb)",
  "picobarn": "Picobarn (pb)",
  "femtobarn": "Femtobarn (fb)",
  "attobarn": "Attobarn (ab)",
  "acre": "Acre (acre)",
  "hectare": "Hectare (ha)",
};

// Type for Permeability units
type PermeabilityUnit = keyof typeof conversionFactors;

export default function PermeabilityConverter() {
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<PermeabilityUnit>("m²");
  const [toUnit, setToUnit] = useState<PermeabilityUnit>("darcy");
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
      // Convert to base unit (m²) then to target unit
      const baseValue = numericValue * conversionFactors[fromUnit];
      const convertedValue = baseValue / conversionFactors[toUnit];
      
      // Format the result
      if (convertedValue === 0) {
        setResult("0");
      } else if (Math.abs(convertedValue) < 1e-15) {
        setResult(convertedValue.toExponential(6));
      } else if (Math.abs(convertedValue) >= 1e15) {
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
    setFromUnit("m²");
    setToUnit("darcy");
    setResult("");
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white shadow-lg">
              <Network size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Permeability Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different permeability units for petroleum engineering and porous media applications
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
                <Select value={fromUnit} onValueChange={(value: PermeabilityUnit) => setFromUnit(value)}>
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
                <Select value={toUnit} onValueChange={(value: PermeabilityUnit) => setToUnit(value)}>
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
            <p>Common conversions: 1 Darcy = 9.87 × 10⁻¹³ m² = 1000 mD</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
