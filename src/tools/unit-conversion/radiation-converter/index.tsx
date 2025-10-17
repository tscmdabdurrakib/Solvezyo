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
  factor: number; // conversion factor to Sv (base unit)
}

const units: ConversionUnit[] = [
  { name: "Sievert", symbol: "Sv", factor: 1 },
  { name: "Millisievert", symbol: "mSv", factor: 1000 },
  { name: "Microsievert", symbol: "μSv", factor: 1000000 },
  { name: "Nanosievert", symbol: "nSv", factor: 1000000000 },
  { name: "Rem", symbol: "rem", factor: 100 },
  { name: "Millirem", symbol: "mrem", factor: 100000 },
  { name: "Microrem", symbol: "μrem", factor: 100000000 },
  { name: "Gray", symbol: "Gy", factor: 1 },
  { name: "Milligray", symbol: "mGy", factor: 1000 },
  { name: "Microgray", symbol: "μGy", factor: 1000000 },
  { name: "Rad", symbol: "rad", factor: 100 },
  { name: "Millirad", symbol: "mrad", factor: 100000 },
];

export default function RadiationConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [inputUnit, setInputUnit] = useState<string>("mSv");
  const [outputUnit, setOutputUnit] = useState<string>("μSv");
  const [result, setResult] = useState<string>("1000");

  const convertValue = (value: number, fromUnit: string, toUnit: string): number => {
    const fromUnitData = units.find(unit => unit.symbol === fromUnit);
    const toUnitData = units.find(unit => unit.symbol === toUnit);
    
    if (!fromUnitData || !toUnitData) return 0;
    
    // Convert to base unit (Sv) then to target unit
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
          <Zap className="h-6 w-6 text-amber-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Radiation Converter
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert between different units of radiation including sieverts, rems, grays, rads, and their submultiples.
        </p>
      </div>

      {/* Converter Tool */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-600" />
            Radiation Dose Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert radiation dose measurements
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
                  className="text-lg font-semibold bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700"
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
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                About Radiation Converter
              </h3>
              <div className="text-sm text-amber-800 dark:text-amber-200 space-y-2 leading-relaxed">
                <p>
                  This converter handles radiation dose measurements, which quantify the amount of ionizing radiation absorbed by matter.
                  Different units measure various aspects: absorbed dose (Gray, Rad) and equivalent dose (Sievert, Rem).
                </p>
                <p>
                  The Sievert (Sv) is the SI unit for equivalent dose, accounting for biological effectiveness of different radiation types.
                  The Gray (Gy) measures absorbed dose, representing energy deposited per unit mass. Traditional units like Rem and Rad are still commonly used.
                </p>
                <p>
                  <strong>Common applications:</strong> Medical dosimetry, nuclear safety, radiation therapy, environmental monitoring,
                  occupational health, and research applications. Understanding radiation units is crucial for safety and regulatory compliance.
                </p>
                <p>
                  <strong>Key relationships:</strong> 1 Sv = 100 rem (equivalent dose), 1 Gy = 100 rad (absorbed dose), and dose rate calculations
                  are essential for exposure assessment. Biological effects depend on dose, dose rate, and radiation type.
                </p>
                <p>
                  <strong>Safety reference levels:</strong> Annual public exposure limit (~1 mSv), occupational limits (~20 mSv/year),
                  medical procedures (μSv to mSv range), and natural background radiation (~2-3 mSv/year globally).
                  Proper unit conversion ensures accurate dose assessment and regulatory compliance in radiation protection applications.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
