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
  factor: number; // conversion factor to H (base unit)
}

const units: ConversionUnit[] = [
  { name: "Henry", symbol: "H", factor: 1 },
  { name: "Millihenry", symbol: "mH", factor: 1000 },
  { name: "Microhenry", symbol: "μH", factor: 1000000 },
  { name: "Nanohenry", symbol: "nH", factor: 1000000000 },
  { name: "Picohenry", symbol: "pH", factor: 1000000000000 },
  { name: "Kilohenry", symbol: "kH", factor: 0.001 },
  { name: "Megahenry", symbol: "MH", factor: 0.000001 },
  { name: "Gigahenry", symbol: "GH", factor: 0.000000001 },
  { name: "Terahenry", symbol: "TH", factor: 0.000000000001 },
  { name: "Abhenry", symbol: "abH", factor: 1000000000 },
  { name: "Stathenry", symbol: "statH", factor: 1.11265e-12 },
];

export default function InductanceConverter() {
  const [inputValue, setInputValue] = useState<string>("1000");
  const [inputUnit, setInputUnit] = useState<string>("μH");
  const [outputUnit, setOutputUnit] = useState<string>("mH");
  const [result, setResult] = useState<string>("1");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (H) then to target unit
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
          <Zap className="h-6 w-6 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Inductance Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of inductance including henries, millihenries, microhenries, and nanohenries.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600" />
            Inductance Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert inductance measurements
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
                  className="text-lg font-semibold bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700"
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
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">
                About Inductance Converter
              </h3>
              <div className="text-sm text-emerald-800 dark:text-emerald-200 space-y-2 leading-relaxed">
                <p>
                  Inductance is the tendency of an electrical conductor to oppose a change in the electric current flowing through it.
                  It's measured in henries (H), named after Joseph Henry, and represents the ability to store energy in a magnetic field.
                </p>
                <p>
                  The henry is the SI unit of inductance, defined as the inductance of a circuit in which an induced EMF of one volt 
                  is produced when the current changes at a rate of one ampere per second. Most practical inductors have much smaller values.
                </p>
                <p>
                  <strong>Common applications:</strong> Transformers, chokes, filters, tuning circuits, motors, generators,
                  and switching power supplies. Inductors are essential components in AC circuits and electromagnetic devices.
                </p>
                <p>
                  <strong>Key relationships:</strong> L = Φ/I (flux linkage per current), V = L(dI/dt) (Faraday's law),
                  and E = ½LI² (energy storage). Inductance opposes changes in current and stores energy in magnetic fields.
                </p>
                <p>
                  <strong>Practical examples:</strong> Air core inductors (nH to μH), ferrite core inductors (μH to mH),
                  power transformers (H range), and RF coils (nH range). Understanding inductance is crucial for
                  filter design, power conversion, motor control, and high-frequency circuit applications.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
