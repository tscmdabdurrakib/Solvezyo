import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Info, Magnet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ConversionUnit {
  name: string;
  symbol: string;
  factor: number; // conversion factor to T (base unit)
}

const units: ConversionUnit[] = [
  { name: "Tesla", symbol: "T", factor: 1 },
  { name: "Millitesla", symbol: "mT", factor: 1000 },
  { name: "Microtesla", symbol: "μT", factor: 1000000 },
  { name: "Nanotesla", symbol: "nT", factor: 1000000000 },
  { name: "Picotesla", symbol: "pT", factor: 1000000000000 },
  { name: "Kiloguass", symbol: "kG", factor: 10 },
  { name: "Gauss", symbol: "G", factor: 10000 },
  { name: "Milligauss", symbol: "mG", factor: 10000000 },
  { name: "Weber per square meter", symbol: "Wb/m²", factor: 1 },
  { name: "Weber per square centimeter", symbol: "Wb/cm²", factor: 0.0001 },
  { name: "Maxwell per square centimeter", symbol: "Mx/cm²", factor: 10000 },
  { name: "Gamma", symbol: "γ", factor: 1000000000 },
];

export default function MagneticFluxDensityConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [inputUnit, setInputUnit] = useState<string>("T");
  const [outputUnit, setOutputUnit] = useState<string>("G");
  const [result, setResult] = useState<string>("10000");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (T) then to target unit
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
          <Magnet className="h-6 w-6 text-teal-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Magnetic Flux Density Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of magnetic flux density including teslas, gauss, milligauss, and webers per square meter.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Magnet className="h-5 w-5 text-teal-600" />
            Magnetic Flux Density Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert magnetic flux density measurements
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
                About Magnetic Flux Density Converter
              </h3>
              <div className="text-sm text-teal-800 dark:text-teal-200 space-y-2 leading-relaxed">
                <p>
                  Magnetic flux density (B), also known as magnetic induction, represents the strength of a magnetic field.
                  It's measured in teslas (T) in the SI system and indicates the amount of magnetic flux per unit area.
                </p>
                <p>
                  The tesla is the SI unit of magnetic flux density, defined as one weber per square meter (Wb/m²).
                  The gauss (G) is a CGS unit commonly used, especially in permanent magnet applications, where 1 T = 10,000 G.
                </p>
                <p>
                  <strong>Common applications:</strong> MRI systems, permanent magnets, electromagnetic devices, magnetic material characterization,
                  and geophysical measurements. B-field measurements are essential for magnetic device design and analysis.
                </p>
                <p>
                  <strong>Key relationships:</strong> B = μH (permeability × field strength), F = BIL (force on current-carrying conductor),
                  and Φ = B⋅A (flux through area). Magnetic flux density determines magnetic forces and induction effects.
                </p>
                <p>
                  <strong>Practical examples:</strong> Earth's magnetic field (~50 μT), refrigerator magnets (~5 mT),
                  MRI scanners (1.5-3 T), industrial electromagnets (1-2 T), and superconducting magnets (10+ T).
                  Understanding B-field is crucial for motor design, transformer optimization, and magnetic measurement applications.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
