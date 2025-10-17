import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Info, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ConversionUnit {
  name: string;
  symbol: string;
  factor: number; // conversion factor to Ω·m (base unit)
}

const units: ConversionUnit[] = [
  { name: "Ohm Meter", symbol: "Ω·m", factor: 1 },
  { name: "Ohm Centimeter", symbol: "Ω·cm", factor: 100 },
  { name: "Ohm Inch", symbol: "Ω·in", factor: 39.3701 },
  { name: "Microohm Meter", symbol: "μΩ·m", factor: 1000000 },
  { name: "Microohm Centimeter", symbol: "μΩ·cm", factor: 100000000 },
  { name: "Nanoohm Meter", symbol: "nΩ·m", factor: 1000000000 },
  { name: "Milliohm Meter", symbol: "mΩ·m", factor: 1000 },
  { name: "Kiloohm Meter", symbol: "kΩ·m", factor: 0.001 },
  { name: "Megohm Meter", symbol: "MΩ·m", factor: 0.000001 },
  { name: "Abohm Centimeter", symbol: "abΩ·cm", factor: 1000000000 },
  { name: "Statohm Centimeter", symbol: "statΩ·cm", factor: 1.11265e-10 },
];

export default function ElectricResistivityConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [inputUnit, setInputUnit] = useState<string>("Ω·m");
  const [outputUnit, setOutputUnit] = useState<string>("Ω·cm");
  const [result, setResult] = useState<string>("100");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (Ω·m) then to target unit
    const baseValue = value / fromUnitData.factor;
    const convertedValue = baseValue * toUnitData.factor;
    
    return convertedValue;
  };

  const handleConvert = () => {
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) {
      setResult("Invalid input");
      return;
    }

    const convertedValue = convertValue(numericValue, inputUnit, outputUnit);
    
    // Format result with appropriate precision
    if (Math.abs(convertedValue) >= 1000000) {
      setResult(convertedValue.toExponential(4));
    } else if (Math.abs(convertedValue) < 0.0001 && convertedValue !== 0) {
      setResult(convertedValue.toExponential(4));
    } else {
      setResult(convertedValue.toPrecision(6));
    }
  };

  const swapUnits = () => {
    const tempUnit = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(tempUnit);
  };

  // Auto-convert when values change
  useEffect(() => {
    handleConvert();
  }, [inputValue, inputUnit, outputUnit]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="h-6 w-6 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Electric Resistivity Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of electric resistivity including ohm-meters, ohm-centimeters, and microohm-meters.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Electric Resistivity Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert electric resistivity measurements
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From Value */}
            <div className="space-y-2">
              <Label htmlFor="input-value" className="text-sm font-medium">
                From Value
              </Label>
              <Input
                id="input-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value to convert"
                className="text-lg"
                data-testid="input-value"
              />
            </div>

            {/* From Unit */}
            <div className="space-y-2">
              <Label htmlFor="input-unit" className="text-sm font-medium">
                From Unit
              </Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger className="text-lg" data-testid="input-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={swapUnits}
              className="rounded-full"
              data-testid="swap-units"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Output Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* To Unit */}
            <div className="space-y-2">
              <Label htmlFor="output-unit" className="text-sm font-medium">
                To Unit
              </Label>
              <Select value={outputUnit} onValueChange={setOutputUnit}>
                <SelectTrigger className="text-lg" data-testid="output-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Result */}
            <div className="space-y-2">
              <Label htmlFor="result" className="text-sm font-medium">
                Result
              </Label>
              <div className="relative">
                <Input
                  id="result"
                  value={result}
                  readOnly
                  className="text-lg font-semibold bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700"
                  data-testid="result-value"
                />
                <Badge variant="secondary" className="absolute right-2 top-2 text-xs">
                  {outputUnit}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                About Electric Resistivity Converter
              </h3>
              <div className="text-sm text-purple-800 dark:text-purple-200 space-y-2 leading-relaxed">
                <p>
                  Electric resistivity (ρ) is an intrinsic property of materials that quantifies how strongly they oppose electric current flow.
                  Unlike resistance, resistivity is independent of the object's geometry and depends only on the material composition.
                </p>
                <p>
                  The SI unit is ohm-meter (Ω·m), representing the resistance offered by a material cube of one meter side length.
                  This converter supports various resistivity units used in materials science, electronics, and geological surveys.
                </p>
                <p>
                  <strong>Common applications:</strong> Material characterization, semiconductor manufacturing, geological surveys,
                  cable design, and quality control in manufacturing. Resistivity determines a material's suitability for electrical applications.
                </p>
                <p>
                  <strong>Key relationships:</strong> R = ρL/A (resistance calculation), ρ = 1/σ (reciprocal of conductivity),
                  and temperature dependencies. Lower resistivity indicates better electrical conduction capability.
                </p>
                <p>
                  <strong>Material examples:</strong> Silver (~1.6×10⁻⁸ Ω·m), copper (~1.7×10⁻⁸ Ω·m), silicon (10³ Ω·m),
                  glass (10¹² Ω·m). Understanding resistivity is essential for selecting appropriate materials for electrical
                  components, wiring, and electronic devices in various engineering applications.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
