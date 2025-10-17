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
  factor: number; // conversion factor to Ω (base unit)
}

const units: ConversionUnit[] = [
  { name: "Ohm", symbol: "Ω", factor: 1 },
  { name: "Kiloohm", symbol: "kΩ", factor: 0.001 },
  { name: "Megohm", symbol: "MΩ", factor: 0.000001 },
  { name: "Gigohm", symbol: "GΩ", factor: 0.000000001 },
  { name: "Milliohm", symbol: "mΩ", factor: 1000 },
  { name: "Microohm", symbol: "μΩ", factor: 1000000 },
  { name: "Nanoohm", symbol: "nΩ", factor: 1000000000 },
  { name: "Picoohm", symbol: "pΩ", factor: 1000000000000 },
  { name: "Teraohm", symbol: "TΩ", factor: 0.000000000001 },
  { name: "Abohm", symbol: "abΩ", factor: 1000000000 },
  { name: "Statohm", symbol: "statΩ", factor: 1.11265e-12 },
];

export default function ElectricResistanceConverter() {
  const [inputValue, setInputValue] = useState<string>("1000");
  const [inputUnit, setInputUnit] = useState<string>("Ω");
  const [outputUnit, setOutputUnit] = useState<string>("kΩ");
  const [result, setResult] = useState<string>("1");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (Ω) then to target unit
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
          <Zap className="h-6 w-6 text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Electric Resistance Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of electric resistance including ohms, kiloohms, megohms, and other resistance units.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            Electric Resistance Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert electric resistance measurements
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
                  className="text-lg font-semibold bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700"
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
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                About Electric Resistance Converter
              </h3>
              <div className="text-sm text-orange-800 dark:text-orange-200 space-y-2 leading-relaxed">
                <p>
                  Electric resistance is a measure of the opposition to current flow in an electrical circuit. 
                  It's measured in ohms (Ω), named after Georg Simon Ohm, and is fundamental to understanding electrical circuits.
                </p>
                <p>
                  The ohm is the SI unit of electrical resistance, defined as the resistance between two points of a conductor 
                  when a constant potential difference of one volt produces a current of one ampere.
                </p>
                <p>
                  <strong>Common applications:</strong> Electronics design, circuit analysis, component selection, 
                  power calculations, and electrical troubleshooting. Resistors are fundamental components in all electronic circuits.
                </p>
                <p>
                  <strong>Key relationships:</strong> R = V/I (Ohm's law), P = I²R (power dissipation), and R = ρL/A 
                  (resistance in terms of material properties). Resistance determines how much current flows for a given voltage.
                </p>
                <p>
                  <strong>Practical examples:</strong> LED current-limiting resistors (hundreds of Ω), heating elements (few Ω),
                  precision instruments (MΩ ranges), and wire resistance (mΩ). Understanding resistance is crucial for
                  circuit design, power management, and electrical safety in all electronic systems.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
