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
  factor: number; // conversion factor to Wb (base unit)
}

const units: ConversionUnit[] = [
  { name: "Weber", symbol: "Wb", factor: 1 },
  { name: "Milliweber", symbol: "mWb", factor: 1000 },
  { name: "Microweber", symbol: "μWb", factor: 1000000 },
  { name: "Nanoweber", symbol: "nWb", factor: 1000000000 },
  { name: "Picoweber", symbol: "pWb", factor: 1000000000000 },
  { name: "Kiloweber", symbol: "kWb", factor: 0.001 },
  { name: "Megaweber", symbol: "MWb", factor: 0.000001 },
  { name: "Maxwell", symbol: "Mx", factor: 100000000 },
  { name: "Volt-second", symbol: "V⋅s", factor: 1 },
  { name: "Tesla square meter", symbol: "T⋅m²", factor: 1 },
  { name: "Gauss square centimeter", symbol: "G⋅cm²", factor: 100000000 },
];

export default function MagneticFluxConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [inputUnit, setInputUnit] = useState<string>("Wb");
  const [outputUnit, setOutputUnit] = useState<string>("mWb");
  const [result, setResult] = useState<string>("1000");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (Wb) then to target unit
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
          <Magnet className="h-6 w-6 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Magnetic Flux Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of magnetic flux including webers, milliwebers, maxwells, and volt-seconds.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Magnet className="h-5 w-5 text-purple-600" />
            Magnetic Flux Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert magnetic flux measurements
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
                About Magnetic Flux Converter
              </h3>
              <div className="text-sm text-purple-800 dark:text-purple-200 space-y-2 leading-relaxed">
                <p>
                  Magnetic flux (Φ) represents the quantity of magnetic field lines passing through a given area.
                  It's measured in webers (Wb) in the SI system and quantifies how much magnetic field penetrates a surface.
                </p>
                <p>
                  The weber is the SI unit of magnetic flux, defined as the flux that, when changing at a rate of one weber per second,
                  induces an EMF of one volt. The maxwell (Mx) is a CGS unit commonly used in electromagnetics.
                </p>
                <p>
                  <strong>Common applications:</strong> Electromagnetic induction, transformer design, motor analysis, magnetic circuit calculations,
                  and flux linkage measurements. Understanding magnetic flux is fundamental to electromagnetic device operation.
                </p>
                <p>
                  <strong>Key relationships:</strong> Φ = B⋅A (flux density × area), Φ = L⋅I (inductance × current for coils),
                  and ε = -dΦ/dt (Faraday's law of induction). Magnetic flux changes drive electromagnetic induction.
                </p>
                <p>
                  <strong>Practical examples:</strong> Small transformers (mWb range), power transformers (Wb range),
                  permanent magnet flux (μWb to mWb), and MRI scanners (Wb range). Proper flux calculation is essential for
                  designing efficient electromagnetic devices, optimizing magnetic circuits, and understanding induction phenomena.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
