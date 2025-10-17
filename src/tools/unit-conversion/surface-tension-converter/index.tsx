import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Waves, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to N/m as base unit)
const conversionFactors = {
  "N/m": 1,
  "mN/m": 0.001,
  "μN/m": 0.000001,
  "kN/m": 1000,
  "dyn/cm": 0.001,
  "gf/cm": 0.980665,
  "kgf/m": 9.80665,
  "lbf/in": 175.127,
  "lbf/ft": 14.5939,
  "pdl/in": 5.44302,
  "pdl/ft": 0.453585,
  "J/m²": 1,
  "erg/cm²": 0.001,
  "cal/cm²": 41840,
  "Btu/ft²": 11356.5,
  "kg/s²": 1,
  "g/s²": 0.001,
  "lb/s²": 0.453592,
  "oz/s²": 0.0283495,
};

// Unit display names with abbreviations
const unitLabels = {
  "N/m": "Newton per Meter (N/m)",
  "mN/m": "Millinewton per Meter (mN/m)",
  "μN/m": "Micronewton per Meter (μN/m)",
  "kN/m": "Kilonewton per Meter (kN/m)",
  "dyn/cm": "Dyne per Centimeter (dyn/cm)",
  "gf/cm": "Gram-force per Centimeter (gf/cm)",
  "kgf/m": "Kilogram-force per Meter (kgf/m)",
  "lbf/in": "Pound-force per Inch (lbf/in)",
  "lbf/ft": "Pound-force per Foot (lbf/ft)",
  "pdl/in": "Poundal per Inch (pdl/in)",
  "pdl/ft": "Poundal per Foot (pdl/ft)",
  "J/m²": "Joule per Square Meter (J/m²)",
  "erg/cm²": "Erg per Square Centimeter (erg/cm²)",
  "cal/cm²": "Calorie per Square Centimeter (cal/cm²)",
  "Btu/ft²": "BTU per Square Foot (Btu/ft²)",
  "kg/s²": "Kilogram per Second squared (kg/s²)",
  "g/s²": "Gram per Second squared (g/s²)",
  "lb/s²": "Pound per Second squared (lb/s²)",
  "oz/s²": "Ounce per Second squared (oz/s²)",
};

// Type for Surface Tension units
type SurfaceTensionUnit = keyof typeof conversionFactors;

export default function SurfaceTensionConverter() {
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<SurfaceTensionUnit>("N/m");
  const [toUnit, setToUnit] = useState<SurfaceTensionUnit>("dyn/cm");
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
      // Convert to base unit (N/m) then to target unit
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
    setFromUnit("N/m");
    setToUnit("dyn/cm");
    setResult("");
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl text-white shadow-lg">
              <Waves size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Surface Tension Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert between different surface tension units for fluid mechanics and material science applications
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
                <Select value={fromUnit} onValueChange={(value: SurfaceTensionUnit) => setFromUnit(value)}>
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
                <Select value={toUnit} onValueChange={(value: SurfaceTensionUnit) => setToUnit(value)}>
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
            <p>Common conversions: Water at 20°C ≈ 0.0728 N/m = 72.8 dyn/cm</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
