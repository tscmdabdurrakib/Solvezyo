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
  factor: number; // conversion factor to V/m (base unit)
}

const units: ConversionUnit[] = [
  { name: "Volt per Meter", symbol: "V/m", factor: 1 },
  { name: "Volt per Centimeter", symbol: "V/cm", factor: 100 },
  { name: "Volt per Inch", symbol: "V/in", factor: 39.3701 },
  { name: "Kilovolt per Meter", symbol: "kV/m", factor: 0.001 },
  { name: "Millivolt per Meter", symbol: "mV/m", factor: 1000 },
  { name: "Newton per Coulomb", symbol: "N/C", factor: 1 },
  { name: "Volt per Millimeter", symbol: "V/mm", factor: 1000 },
  { name: "Kilovolt per Centimeter", symbol: "kV/cm", factor: 0.0001 },
  { name: "Megavolt per Meter", symbol: "MV/m", factor: 0.000001 },
  { name: "Microvolt per Meter", symbol: "μV/m", factor: 1000000 },
];

export default function ElectricFieldStrengthConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [inputUnit, setInputUnit] = useState<string>("V/m");
  const [outputUnit, setOutputUnit] = useState<string>("kV/m");
  const [result, setResult] = useState<string>("0.001");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (V/m) then to target unit
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
          <Zap className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Electric Field Strength Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of electric field strength including volts per meter, kilovolts per meter, and newtons per coulomb.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Electric Field Strength Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert electric field strength measurements
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
                  className="text-lg font-semibold bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
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
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                About Electric Field Strength Converter
              </h3>
              <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2 leading-relaxed">
                <p>
                  Electric field strength (E) represents the force per unit charge exerted on a test charge in an electric field.
                  It's a fundamental concept in electrostatics and electromagnetic theory, measuring how strong an electric field is at any given point.
                </p>
                <p>
                  The SI base unit is volts per meter (V/m), which is equivalent to newtons per coulomb (N/C).
                  This converter supports various units commonly used in electrical engineering, physics, and scientific applications.
                </p>
                <p>
                  <strong>Common applications:</strong> High voltage equipment design, electrical safety calculations, 
                  electromagnetic field analysis, and physics education. Electric field strength is crucial for understanding 
                  electrical breakdown, dielectric properties, and electromagnetic interference.
                </p>
                <p>
                  <strong>Key relationships:</strong> E = V/d (voltage over distance), E = F/q (force per charge), 
                  and E = ρ/ε (charge density over permittivity). Higher values indicate stronger electric fields 
                  that can cause electrical breakdown in materials.
                </p>
                <p>
                  <strong>Safety note:</strong> High electric field strengths can be dangerous. Air breaks down at approximately 
                  3 MV/m (3000 kV/m), creating electrical arcs. Understanding field strength is essential for electrical safety 
                  and equipment design in power systems, electronics, and scientific instruments.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
