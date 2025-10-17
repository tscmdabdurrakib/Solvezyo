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
  factor: number; // conversion factor to S (base unit)
}

const units: ConversionUnit[] = [
  { name: "Siemens", symbol: "S", factor: 1 },
  { name: "Millisiemens", symbol: "mS", factor: 1000 },
  { name: "Microsiemens", symbol: "μS", factor: 1000000 },
  { name: "Nanosiemens", symbol: "nS", factor: 1000000000 },
  { name: "Picosiemens", symbol: "pS", factor: 1000000000000 },
  { name: "Kilosiemens", symbol: "kS", factor: 0.001 },
  { name: "Megasiemens", symbol: "MS", factor: 0.000001 },
  { name: "Gigasiemens", symbol: "GS", factor: 0.000000001 },
  { name: "Mho", symbol: "℧", factor: 1 },
  { name: "Abmho", symbol: "ab℧", factor: 1000000000 },
  { name: "Statmho", symbol: "stat℧", factor: 8.98755e11 },
];

export default function ElectricConductanceConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [inputUnit, setInputUnit] = useState<string>("S");
  const [outputUnit, setOutputUnit] = useState<string>("mS");
  const [result, setResult] = useState<string>("1000");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (S) then to target unit
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
          <Zap className="h-6 w-6 text-teal-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Electric Conductance Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of electric conductance including siemens, millisiemens, microsiemens, and mho.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-teal-600" />
            Electric Conductance Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert electric conductance measurements
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
                  className="text-lg font-semibold bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700"
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
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-200 dark:border-teal-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-teal-900 dark:text-teal-100">
                About Electric Conductance Converter
              </h3>
              <div className="text-sm text-teal-800 dark:text-teal-200 space-y-2 leading-relaxed">
                <p>
                  Electric conductance (G) is a measure of how easily electric current flows through a material or component.
                  It's the reciprocal of resistance and is measured in siemens (S), named after Werner von Siemens.
                </p>
                <p>
                  The siemens is the SI unit of electrical conductance, defined as the conductance of a conductor with a resistance of one ohm.
                  Historically, conductance was measured in mho (ohm spelled backwards), which is equivalent to siemens.
                </p>
                <p>
                  <strong>Common applications:</strong> Circuit analysis, electronic component characterization, sensor design,
                  quality control in manufacturing, and electrical measurements. Conductance is particularly useful in parallel circuit analysis.
                </p>
                <p>
                  <strong>Key relationships:</strong> G = 1/R (reciprocal of resistance), G = I/V (current per voltage),
                  and Gtotal = G₁ + G₂ + ... (parallel conductances add directly). Higher conductance means easier current flow.
                </p>
                <p>
                  <strong>Practical examples:</strong> Semiconductor devices (μS to mS), electrolytic solutions (mS range),
                  superconductors (infinite conductance), and precision measurement instruments. Understanding conductance
                  is essential for analyzing electrical circuits, designing sensors, and characterizing materials.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
