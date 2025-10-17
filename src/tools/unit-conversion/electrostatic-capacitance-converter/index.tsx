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
  factor: number; // conversion factor to F (base unit)
}

const units: ConversionUnit[] = [
  { name: "Farad", symbol: "F", factor: 1 },
  { name: "Millifarad", symbol: "mF", factor: 1000 },
  { name: "Microfarad", symbol: "μF", factor: 1000000 },
  { name: "Nanofarad", symbol: "nF", factor: 1000000000 },
  { name: "Picofarad", symbol: "pF", factor: 1000000000000 },
  { name: "Femtofarad", symbol: "fF", factor: 1000000000000000 },
  { name: "Attofarad", symbol: "aF", factor: 1000000000000000000 },
  { name: "Kilofarad", symbol: "kF", factor: 0.001 },
  { name: "Megafarad", symbol: "MF", factor: 0.000001 },
  { name: "Abfarad", symbol: "abF", factor: 1111265000000 },
  { name: "Statfarad", symbol: "statF", factor: 1.11265e12 },
];

export default function ElectrostaticCapacitanceConverter() {
  const [inputValue, setInputValue] = useState<string>("1000");
  const [inputUnit, setInputUnit] = useState<string>("pF");
  const [outputUnit, setOutputUnit] = useState<string>("nF");
  const [result, setResult] = useState<string>("1");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (F) then to target unit
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
          <Zap className="h-6 w-6 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Electrostatic Capacitance Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of electrostatic capacitance including farads, microfarads, nanofarads, and picofarads.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-600" />
            Electrostatic Capacitance Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert electrostatic capacitance measurements
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
                  className="text-lg font-semibold bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700"
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
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">
                About Electrostatic Capacitance Converter
              </h3>
              <div className="text-sm text-indigo-800 dark:text-indigo-200 space-y-2 leading-relaxed">
                <p>
                  Electrostatic capacitance is the ability of a component or circuit to collect and store energy in the form of an electrical charge.
                  It's measured in farads (F), named after Michael Faraday, representing the amount of electric charge stored per unit voltage.
                </p>
                <p>
                  The farad is the SI unit of capacitance, defined as one coulomb per volt. In practice, most capacitors have much smaller values,
                  measured in microfarads (μF), nanofarads (nF), or picofarads (pF) due to the large size of the farad unit.
                </p>
                <p>
                  <strong>Common applications:</strong> Electronic circuits, power supplies, filters, timing circuits, energy storage,
                  and signal coupling. Capacitors are fundamental components in virtually all electronic devices and systems.
                </p>
                <p>
                  <strong>Key relationships:</strong> C = Q/V (charge per voltage), C = εA/d (geometric formula), and E = ½CV² (energy storage).
                  Capacitance determines how much charge a capacitor can store at a given voltage level.
                </p>
                <p>
                  <strong>Practical examples:</strong> Ceramic capacitors (pF to μF), electrolytic capacitors (μF to mF),
                  supercapacitors (F range), and integrated circuit capacitors (fF to pF). Understanding capacitance values
                  is essential for circuit design, filtering, energy storage, and timing applications in electronics.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
