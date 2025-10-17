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
  factor: number; // conversion factor to V (base unit)
}

const units: ConversionUnit[] = [
  { name: "Volt", symbol: "V", factor: 1 },
  { name: "Kilovolt", symbol: "kV", factor: 0.001 },
  { name: "Megavolt", symbol: "MV", factor: 0.000001 },
  { name: "Millivolt", symbol: "mV", factor: 1000 },
  { name: "Microvolt", symbol: "μV", factor: 1000000 },
  { name: "Nanovolt", symbol: "nV", factor: 1000000000 },
  { name: "Picovolt", symbol: "pV", factor: 1000000000000 },
  { name: "Gigavolt", symbol: "GV", factor: 0.000000001 },
  { name: "Teravolt", symbol: "TV", factor: 0.000000000001 },
  { name: "Abvolt", symbol: "abV", factor: 100000000 },
  { name: "Statvolt", symbol: "statV", factor: 0.00333564 },
];

export default function ElectricPotentialConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [inputUnit, setInputUnit] = useState<string>("V");
  const [outputUnit, setOutputUnit] = useState<string>("kV");
  const [result, setResult] = useState<string>("0.001");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (V) then to target unit
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
          <Zap className="h-6 w-6 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Electric Potential Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of electric potential including volts, kilovolts, millivolts, and other voltage units.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-600" />
            Electric Potential Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert electric potential (voltage) measurements
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
                  className="text-lg font-semibold bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
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
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-green-900 dark:text-green-100">
                About Electric Potential Converter
              </h3>
              <div className="text-sm text-green-800 dark:text-green-200 space-y-2 leading-relaxed">
                <p>
                  Electric potential (voltage) is the amount of work needed per unit of electric charge to move a test charge 
                  from a reference point to a specific point in an electric field. It's measured in volts (V), named after Alessandro Volta.
                </p>
                <p>
                  The volt is the SI unit for electric potential, defined as one joule of energy per coulomb of charge.
                  This converter supports various voltage units used in electronics, power systems, and scientific measurements.
                </p>
                <p>
                  <strong>Common applications:</strong> Electronics design, power systems engineering, battery specifications,
                  circuit analysis, and electrical measurements. Voltage is fundamental to all electrical and electronic systems.
                </p>
                <p>
                  <strong>Key relationships:</strong> V = W/Q (work per charge), V = IR (Ohm's law), and V = Ed (field times distance).
                  Voltage drives electric current through circuits and determines the energy available for electrical work.
                </p>
                <p>
                  <strong>Practical examples:</strong> AA batteries (1.5V), household outlets (110-240V), car batteries (12V),
                  high-voltage transmission lines (hundreds of kV), and microelectronics (mV to low V ranges).
                  Understanding voltage levels is crucial for safety and proper system design.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
