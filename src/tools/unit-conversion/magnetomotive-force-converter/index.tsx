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
  factor: number; // conversion factor to A (base unit)
}

const units: ConversionUnit[] = [
  { name: "Ampere", symbol: "A", factor: 1 },
  { name: "Ampere-turn", symbol: "At", factor: 1 },
  { name: "Kiloampere", symbol: "kA", factor: 0.001 },
  { name: "Milliampere", symbol: "mA", factor: 1000 },
  { name: "Microampere", symbol: "μA", factor: 1000000 },
  { name: "Nanoampere", symbol: "nA", factor: 1000000000 },
  { name: "Picoampere", symbol: "pA", factor: 1000000000000 },
  { name: "Megaampere", symbol: "MA", factor: 0.000001 },
  { name: "Gigaampere", symbol: "GA", factor: 0.000000001 },
  { name: "Gilbert", symbol: "Gb", factor: 1.25664 },
  { name: "Abampere", symbol: "abA", factor: 0.1 },
];

export default function MagnetomotiveForceConverter() {
  const [inputValue, setInputValue] = useState<string>("100");
  const [inputUnit, setInputUnit] = useState<string>("At");
  const [outputUnit, setOutputUnit] = useState<string>("A");
  const [result, setResult] = useState<string>("100");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (A) then to target unit
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
          <Magnet className="h-6 w-6 text-rose-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Magnetomotive Force Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of magnetomotive force including amperes, ampere-turns, gilberts, and abamperes.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Magnet className="h-5 w-5 text-rose-600" />
            Magnetomotive Force Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert magnetomotive force measurements
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
                  className="text-lg font-semibold bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700"
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
      <Card className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-rose-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-rose-900 dark:text-rose-100">
                About Magnetomotive Force Converter
              </h3>
              <div className="text-sm text-rose-800 dark:text-rose-200 space-y-2 leading-relaxed">
                <p>
                  Magnetomotive force (MMF) is the magnetic potential difference that drives magnetic flux through a magnetic circuit.
                  It's the magnetic equivalent of electromotive force in electrical circuits, measured in amperes or ampere-turns.
                </p>
                <p>
                  The ampere-turn (At) is commonly used to express MMF, representing the product of current and the number of turns in a coil.
                  In SI units, MMF is measured in amperes, as it represents the current that produces the magnetic field.
                </p>
                <p>
                  <strong>Common applications:</strong> Electromagnetic design, motor analysis, transformer calculations, magnetic circuit design,
                  and inductor characterization. MMF is fundamental to understanding electromagnetic devices and systems.
                </p>
                <p>
                  <strong>Key relationships:</strong> MMF = NI (turns × current), MMF = ΦR (flux × reluctance), and Φ = MMF/R (magnetic Ohm's law).
                  Higher MMF produces stronger magnetic fields in magnetic circuits and electromagnetic devices.
                </p>
                <p>
                  <strong>Practical examples:</strong> Small relay coils (10-100 At), electric motors (100-10,000 At),
                  large transformers (10,000+ At), and MRI magnets (millions of At). Understanding MMF is essential for
                  designing electromagnetic devices, calculating magnetic forces, and optimizing magnetic circuit performance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
