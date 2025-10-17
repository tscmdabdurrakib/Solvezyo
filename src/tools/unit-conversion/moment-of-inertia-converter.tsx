import { useState, useEffect } from "react";
import { Calculator, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToolVisit } from "@/hooks/useToolVisit";

interface MomentOfInertiaUnit {
  name: string;
  factor: number;
  symbol: string;
}

const units: Record<string, MomentOfInertiaUnit> = {
  "kg_m2": { name: "Kilogram square meters", factor: 1, symbol: "kg⋅m²" },
  "g_cm2": { name: "Gram square centimeters", factor: 0.0000001, symbol: "g⋅cm²" },
  "lb_ft2": { name: "Pound square feet", factor: 0.04214, symbol: "lb⋅ft²" },
  "lb_in2": { name: "Pound square inches", factor: 0.0002926, symbol: "lb⋅in²" },
  "oz_in2": { name: "Ounce square inches", factor: 0.00001829, symbol: "oz⋅in²" },
  "slug_ft2": { name: "Slug square feet", factor: 1.3558, symbol: "slug⋅ft²" },
  "t_m2": { name: "Tonne square meters", factor: 1000, symbol: "t⋅m²" },
  "kg_cm2": { name: "Kilogram square centimeters", factor: 0.0001, symbol: "kg⋅cm²" },
  "g_m2": { name: "Gram square meters", factor: 0.001, symbol: "g⋅m²" },
  "kg_mm2": { name: "Kilogram square millimeters", factor: 0.000001, symbol: "kg⋅mm²" },
};

const commonShapes = [
  {
    name: "Solid Cylinder (about axis)",
    formula: "I = ½mr²",
    description: "Rotating about its central axis"
  },
  {
    name: "Thin Ring",
    formula: "I = mr²",
    description: "Mass concentrated at radius r"
  },
  {
    name: "Solid Sphere",
    formula: "I = ⅖mr²",
    description: "About any diameter"
  },
  {
    name: "Thin Rod (center)",
    formula: "I = 1/12 mL²",
    description: "About center perpendicular to length"
  },
];

export default function MomentOfInertiaConverter() {
  useToolVisit("moment-of-inertia-converter");
  
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("kg_m2");
  const [toUnit, setToUnit] = useState<string>("lb_ft2");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetFields = () => {
    setInputValue("");
    setResult("");
    setError("");
  };

  const convertMomentOfInertia = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value)) {
      setError("Please enter a valid number");
      setResult("");
      return;
    }

    if (value < 0) {
      setError("Moment of inertia cannot be negative");
      setResult("");
      return;
    }

    setError("");

    // Convert to base unit (kg⋅m²)
    const valueInBase = value * units[fromUnit].factor;
    
    // Convert from base to target unit
    const convertedValue = valueInBase / units[toUnit].factor;
    
    // Format result with appropriate decimal places
    const decimalPlaces = convertedValue < 0.0001 ? 10 : convertedValue < 1 ? 8 : convertedValue < 1000 ? 6 : 4;
    setResult(convertedValue.toFixed(decimalPlaces));
  };

  useEffect(() => {
    if (inputValue) {
      convertMomentOfInertia();
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
          Moment of Inertia Converter
        </CardTitle>
        <CardDescription>
          Convert moment of inertia units for mechanical engineering
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
                placeholder="Enter moment of inertia value"
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

        <div className="grid gap-4">
          <h4 className="font-semibold">Common Shapes:</h4>
          <div className="grid gap-3">
            {commonShapes.map((shape, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <h5 className="font-semibold text-sm">{shape.name}</h5>
                <p className="font-mono text-xs text-blue-600 dark:text-blue-400 mt-1">{shape.formula}</p>
                <p className="text-xs text-muted-foreground mt-1">{shape.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Definition:</h4>
          <p className="font-mono text-sm">I = Σmr²</p>
          <p className="text-sm text-muted-foreground mt-1">
            Moment of inertia quantifies rotational inertia about an axis
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
