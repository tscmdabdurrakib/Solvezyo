import { useState, useEffect } from "react";
import { Calculator, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToolVisit } from "@/hooks/useToolVisit";

interface SpecificVolumeUnit {
  name: string;
  factor: number;
  symbol: string;
}

const units: Record<string, SpecificVolumeUnit> = {
  "m3_kg": { name: "Cubic meters per kilogram", factor: 1, symbol: "m³/kg" },
  "l_kg": { name: "Liters per kilogram", factor: 0.001, symbol: "L/kg" },
  "ml_g": { name: "Milliliters per gram", factor: 0.001, symbol: "mL/g" },
  "ft3_lb": { name: "Cubic feet per pound", factor: 0.062428, symbol: "ft³/lb" },
  "in3_lb": { name: "Cubic inches per pound", factor: 0.000036127, symbol: "in³/lb" },
  "ft3_slug": { name: "Cubic feet per slug", factor: 2.0112, symbol: "ft³/slug" },
  "gal_lb": { name: "US gallons per pound", factor: 0.008345, symbol: "gal/lb" },
  "l_g": { name: "Liters per gram", factor: 1, symbol: "L/g" },
  "cm3_g": { name: "Cubic centimeters per gram", factor: 0.001, symbol: "cm³/g" },
  "bbl_ton": { name: "Barrels per ton", factor: 0.1590, symbol: "bbl/ton" },
};

export default function SpecificVolumeConverter() {
  useToolVisit("specific-volume-converter");
  
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("m3_kg");
  const [toUnit, setToUnit] = useState<string>("l_kg");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetFields = () => {
    setInputValue("");
    setResult("");
    setError("");
  };

  const convertSpecificVolume = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value)) {
      setError("Please enter a valid number");
      setResult("");
      return;
    }

    if (value < 0) {
      setError("Specific volume cannot be negative");
      setResult("");
      return;
    }

    setError("");

    // Convert to base unit (m³/kg)
    const valueInBase = value * units[fromUnit].factor;
    
    // Convert from base to target unit
    const convertedValue = valueInBase / units[toUnit].factor;
    
    // Format result with appropriate decimal places
    const decimalPlaces = convertedValue < 0.001 ? 10 : convertedValue < 1 ? 8 : convertedValue < 1000 ? 6 : 4;
    setResult(convertedValue.toFixed(decimalPlaces));
  };

  useEffect(() => {
    if (inputValue) {
      convertSpecificVolume();
    } else {
      setResult("");
      setError("");
    }
  }, [inputValue, fromUnit, toUnit]);

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Calculator className="h-5 w-5" />
          Specific Volume Converter
        </CardTitle>
        <CardDescription>
          Convert between specific volume units for engineering applications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="input">From</Label>
            <div className="flex gap-2">
              <Input
                id="input"
                type="number"
                step="any"
                placeholder="Enter specific volume value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="result">To</Label>
            <div className="flex gap-2">
              <Input
                id="result"
                type="text"
                value={result}
                readOnly
                placeholder="Result will appear here"
                className="flex-1"
              />
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center">
          <Button 
            onClick={resetFields} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Fields
          </Button>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Formula:</h4>
          <p className="font-mono text-sm">v = V/m = 1/ρ</p>
          <p className="text-sm text-muted-foreground mt-1">
            Where v is specific volume, V is volume, m is mass, and ρ is density
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
