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
  factor: number; // conversion factor to S/m (base unit)
}

const units: ConversionUnit[] = [
  { name: "Siemens per Meter", symbol: "S/m", factor: 1 },
  { name: "Siemens per Centimeter", symbol: "S/cm", factor: 0.01 },
  { name: "Millisiemens per Meter", symbol: "mS/m", factor: 1000 },
  { name: "Millisiemens per Centimeter", symbol: "mS/cm", factor: 10 },
  { name: "Microsiemens per Meter", symbol: "μS/m", factor: 1000000 },
  { name: "Microsiemens per Centimeter", symbol: "μS/cm", factor: 10000 },
  { name: "Nanosiemens per Meter", symbol: "nS/m", factor: 1000000000 },
  { name: "Picosiemens per Meter", symbol: "pS/m", factor: 1000000000000 },
  { name: "Mho per Meter", symbol: "℧/m", factor: 1 },
  { name: "Abmho per Meter", symbol: "ab℧/m", factor: 1000000000 },
  { name: "Statmho per Meter", symbol: "stat℧/m", factor: 8.98755e11 },
];

export default function ElectricConductivityConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [inputUnit, setInputUnit] = useState<string>("S/m");
  const [outputUnit, setOutputUnit] = useState<string>("mS/cm");
  const [result, setResult] = useState<string>("10");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (S/m) then to target unit
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
          <Zap className="h-6 w-6 text-cyan-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Electric Conductivity Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of electric conductivity including siemens per meter, millisiemens per centimeter, and microsiemens per meter.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-cyan-600" />
            Electric Conductivity Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert electric conductivity measurements
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
                  className="text-lg font-semibold bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700"
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
      <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-cyan-900 dark:text-cyan-100">
                About Electric Conductivity Converter
              </h3>
              <div className="text-sm text-cyan-800 dark:text-cyan-200 space-y-2 leading-relaxed">
                <p>
                  Electric conductivity (σ) is a material property that quantifies how easily electric current can flow through a substance.
                  It's the reciprocal of electrical resistivity and is measured in siemens per meter (S/m) in the SI system.
                </p>
                <p>
                  The siemens per meter is the standard unit for conductivity, representing the ability of a material to conduct electric current.
                  This converter supports various conductivity units used in materials science, electronics, and chemical analysis.
                </p>
                <p>
                  <strong>Common applications:</strong> Material characterization, semiconductor manufacturing, water quality testing,
                  geological surveys, and quality control in manufacturing. Conductivity determines material suitability for electrical applications.
                </p>
                <p>
                  <strong>Key relationships:</strong> σ = 1/ρ (reciprocal of resistivity), σ = nqμ (charge density × mobility),
                  and I = σAE (current density relationship). Higher conductivity indicates better electrical conduction.
                </p>
                <p>
                  <strong>Material examples:</strong> Copper (~5.96×10⁷ S/m), aluminum (~3.77×10⁷ S/m), seawater (~5 S/m),
                  pure water (~5.5×10⁻⁶ S/m), and insulators (~10⁻¹⁶ S/m). Understanding conductivity is crucial for
                  material selection, circuit design, and electrochemical processes in various engineering applications.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
