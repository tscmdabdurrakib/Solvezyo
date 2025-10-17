import { useState, useEffect } from "react";
import { Calculator, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToolVisit } from "@/hooks/useToolVisit";

interface TorqueUnit {
  name: string;
  factor: number;
  symbol: string;
}

const units: Record<string, TorqueUnit> = {
  "n_m": { name: "Newton meters", factor: 1, symbol: "N⋅m" },
  "kn_m": { name: "Kilonewton meters", factor: 1000, symbol: "kN⋅m" },
  "lb_ft": { name: "Pound-feet", factor: 1.35582, symbol: "lb⋅ft" },
  "lb_in": { name: "Pound-inches", factor: 0.112985, symbol: "lb⋅in" },
  "kg_m": { name: "Kilogram-force meters", factor: 9.80665, symbol: "kg⋅m" },
  "g_cm": { name: "Gram-force centimeters", factor: 0.000098067, symbol: "g⋅cm" },
  "oz_in": { name: "Ounce-inches", factor: 0.007062, symbol: "oz⋅in" },
  "dyn_cm": { name: "Dyne centimeters", factor: 0.0000001, symbol: "dyn⋅cm" },
  "kgf_cm": { name: "Kilogram-force centimeters", factor: 0.0980665, symbol: "kgf⋅cm" },
  "ft_lbf": { name: "Foot pound-force", factor: 1.35582, symbol: "ft⋅lbf" },
};

const applicationExamples = [
  {
    application: "Car Lug Nuts",
    range: "80-120 N⋅m",
    description: "Typical torque specification"
  },
  {
    application: "Bicycle Pedals",
    range: "35-50 N⋅m", 
    description: "Standard installation torque"
  },
  {
    application: "Engine Head Bolts",
    range: "50-100 N⋅m",
    description: "Varies by engine size"
  },
  {
    application: "Door Hinges",
    range: "2-8 N⋅m",
    description: "Residential door hardware"
  },
];

export default function MomentOfForceConverter() {
  useToolVisit("moment-of-force-converter");
  
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("n_m");
  const [toUnit, setToUnit] = useState<string>("lb_ft");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetFields = () => {
    setInputValue("");
    setResult("");
    setError("");
  };

  const convertTorque = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value)) {
      setError("Please enter a valid number");
      setResult("");
      return;
    }

    setError("");

    // Convert to base unit (N⋅m)
    const valueInBase = value * units[fromUnit].factor;
    
    // Convert from base to target unit
    const convertedValue = valueInBase / units[toUnit].factor;
    
    // Format result with appropriate decimal places
    const decimalPlaces = convertedValue < 0.001 ? 8 : convertedValue < 1 ? 6 : convertedValue < 1000 ? 4 : 2;
    setResult(convertedValue.toFixed(decimalPlaces));
  };

  useEffect(() => {
    if (inputValue) {
      convertTorque();
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
          Moment of Force Converter
        </CardTitle>
        <CardDescription>
          Convert torque and moment of force units with engineering precision
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
                placeholder="Enter torque value"
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
          <h4 className="font-semibold">Common Applications:</h4>
          <div className="grid gap-3">
            {applicationExamples.map((example, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-semibold text-sm">{example.application}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{example.description}</p>
                  </div>
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400">{example.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Formula:</h4>
          <p className="font-mono text-sm">τ = r × F</p>
          <p className="text-sm text-muted-foreground mt-1">
            Where τ is torque, r is radius vector, and F is applied force
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
