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
  factor: number; // conversion factor to A/m (base unit)
}

const units: ConversionUnit[] = [
  { name: "Ampere per Meter", symbol: "A/m", factor: 1 },
  { name: "Ampere per Centimeter", symbol: "A/cm", factor: 0.01 },
  { name: "Ampere per Inch", symbol: "A/in", factor: 0.0254 },
  { name: "Kiloampere per Meter", symbol: "kA/m", factor: 0.001 },
  { name: "Milliampere per Meter", symbol: "mA/m", factor: 1000 },
  { name: "Microampere per Meter", symbol: "μA/m", factor: 1000000 },
  { name: "Ampere-turn per Meter", symbol: "At/m", factor: 1 },
  { name: "Ampere-turn per Centimeter", symbol: "At/cm", factor: 0.01 },
  { name: "Ampere-turn per Inch", symbol: "At/in", factor: 0.0254 },
  { name: "Oersted", symbol: "Oe", factor: 12.5664 },
  { name: "Gilbert per Centimeter", symbol: "Gb/cm", factor: 1.25664 },
];

export default function MagneticFieldStrengthConverter() {
  const [inputValue, setInputValue] = useState<string>("1000");
  const [inputUnit, setInputUnit] = useState<string>("A/m");
  const [outputUnit, setOutputUnit] = useState<string>("Oe");
  const [result, setResult] = useState<string>("12.5664");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (A/m) then to target unit
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
          <Magnet className="h-6 w-6 text-violet-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Magnetic Field Strength Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of magnetic field strength including amperes per meter, oersteds, and ampere-turns per meter.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Magnet className="h-5 w-5 text-violet-600" />
            Magnetic Field Strength Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert magnetic field strength measurements
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
                  className="text-lg font-semibold bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700"
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
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200 dark:border-violet-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-violet-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-violet-900 dark:text-violet-100">
                About Magnetic Field Strength Converter
              </h3>
              <div className="text-sm text-violet-800 dark:text-violet-200 space-y-2 leading-relaxed">
                <p>
                  Magnetic field strength (H) represents the magnetizing force that drives magnetic flux through a material.
                  It's measured in amperes per meter (A/m) in the SI system and is independent of the material's magnetic properties.
                </p>
                <p>
                  The ampere per meter is the SI unit for magnetic field strength, often expressed as ampere-turns per meter (At/m)
                  in practical applications. The oersted (Oe) is a commonly used CGS unit, especially in materials science.
                </p>
                <p>
                  <strong>Common applications:</strong> Electromagnetic design, magnetic material characterization, motor analysis,
                  transformer calculations, and magnetic circuit design. H-field measurements are essential for understanding magnetism.
                </p>
                <p>
                  <strong>Key relationships:</strong> B = μH (flux density relationship), H = NI/l (solenoid field),
                  and ∮H·dl = I (Ampère's law). Magnetic field strength drives magnetization and determines magnetic behavior.
                </p>
                <p>
                  <strong>Practical examples:</strong> Earth's magnetic field (~40 A/m), permanent magnets (10³-10⁶ A/m),
                  electromagnets (10²-10⁶ A/m), and MRI systems (~10⁶ A/m). Understanding H-field is crucial for
                  magnetic device design, material selection, and optimizing electromagnetic performance in various applications.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
