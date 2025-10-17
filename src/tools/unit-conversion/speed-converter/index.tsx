import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Speed conversion factors (to meters per second)
const conversionFactors = {
  // Metric
  meterPerSecond: 1,
  kilometerPerSecond: 1000,
  kilometerPerHour: 0.277778,
  centimeterPerSecond: 0.01,
  millimeterPerSecond: 0.001,
  
  // Imperial/US
  milePerHour: 0.44704,
  milePerSecond: 1609.34,
  footPerSecond: 0.3048,
  footPerHour: 0.0000846667,
  inchPerSecond: 0.0254,
  yardPerSecond: 0.9144,
  
  // Marine
  knot: 0.514444,
  
  // Aeronautics & Space
  mach: 340.29, // at sea level, 15°C
  speedOfLight: 299792458,
  
  // Other
  beaufortScale: 0.836, // Beaufort scale 1 is approximately 0.836 m/s
};

// Type for Speed units
type SpeedUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  meterPerSecond: "Meter per Second (m/s)",
  kilometerPerSecond: "Kilometer per Second (km/s)",
  kilometerPerHour: "Kilometer per Hour (km/h)",
  centimeterPerSecond: "Centimeter per Second (cm/s)",
  millimeterPerSecond: "Millimeter per Second (mm/s)",
  milePerHour: "Mile per Hour (mph)",
  milePerSecond: "Mile per Second (mi/s)",
  footPerSecond: "Foot per Second (ft/s)",
  footPerHour: "Foot per Hour (ft/h)",
  inchPerSecond: "Inch per Second (in/s)",
  yardPerSecond: "Yard per Second (yd/s)",
  knot: "Knot (kn)",
  mach: "Mach (M)",
  speedOfLight: "Speed of Light (c)",
  beaufortScale: "Beaufort Scale (Bft)"
};

/**
 * Speed Converter Component
 * Allows users to convert between different units of speed
 */
export default function SpeedConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<SpeedUnit>('kilometerPerHour');
  const [toUnit, setToUnit] = useState<SpeedUnit>('milePerHour');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertSpeed();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one speed unit to another
   */
  const convertSpeed = () => {
    // Clear previous errors
    setError(null);

    // If input is empty, clear the result
    if (!inputValue) {
      setResult('');
      return;
    }

    // Parse the input value
    const value = parseFloat(inputValue);

    // Validate the input is a number
    if (isNaN(value)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }
    
    // Speed cannot be negative except in very specific scientific contexts
    if (value < 0) {
      setError('Speed cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to meters per second (base unit), then to target unit
    const inMetersPerSecond = value * conversionFactors[fromUnit];
    const converted = inMetersPerSecond / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    
    const absNum = Math.abs(num);
    
    if (absNum < 0.0000001) return num.toExponential(6);
    if (absNum < 0.00001) return num.toFixed(10);
    if (absNum < 0.0001) return num.toFixed(8);
    if (absNum < 0.001) return num.toFixed(6);
    if (absNum < 0.01) return num.toFixed(5);
    if (absNum < 1) return num.toFixed(4);
    if (absNum < 10) return num.toFixed(3);
    if (absNum < 100) return num.toFixed(2);
    if (absNum < 1000) return num.toFixed(1);
    
    return num.toFixed(0);
  };

  /**
   * Swap the from and to units
   */
  const swapUnits = () => {
    setSwapAnimation(true);
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    
    // Reset animation state after animation completes
    setTimeout(() => setSwapAnimation(false), 500);
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setInputValue('');
    setFromUnit('kilometerPerHour');
    setToUnit('milePerHour');
    setResult('');
    setError(null);
  };

  // Generate the Select options grouped by category
  const renderUnitOptions = () => {
    const groups = {
      "Metric": ["meterPerSecond", "kilometerPerSecond", "kilometerPerHour", "centimeterPerSecond", "millimeterPerSecond"],
      "Imperial/US": ["milePerHour", "milePerSecond", "footPerSecond", "footPerHour", "inchPerSecond", "yardPerSecond"],
      "Marine": ["knot"],
      "Scientific": ["mach", "speedOfLight", "beaufortScale"]
    };

    return Object.entries(groups).map(([groupName, units]) => (
      <React.Fragment key={groupName}>
        <SelectItem value={units[0]} disabled className="font-semibold text-primary">
          {groupName}
        </SelectItem>
        {units.map(unit => (
          <SelectItem key={unit} value={unit}>
            {unitLabels[unit as SpeedUnit]}
          </SelectItem>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Gauge className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Speed Converter</CardTitle>
            <CardDescription>
              Convert between different units of speed and velocity
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="speed-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="speed-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter speed"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as SpeedUnit)}>
                  <SelectTrigger id="from-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {renderUnitOptions()}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center items-center sm:col-span-1">
                <motion.div
                  animate={{ rotate: swapAnimation ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full h-10 w-10 bg-muted hover:bg-primary/10"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="sr-only">Swap units</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="to-unit" className="block text-sm font-medium mb-2">
                  To
                </label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as SpeedUnit)}>
                  <SelectTrigger id="to-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {renderUnitOptions()}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conversion Result */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {result ? (
                  <>
                    {result} <span className="text-lg font-normal">{unitLabels[toUnit]?.split(' ')[1]?.replace(/[()]/g, '')}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground text-lg">— Enter a value to convert —</span>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Conversion Formula Display */}
          {result && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} ${unitLabels[fromUnit]?.split(' ')[0]} = ${result} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {`1 ${unitLabels[fromUnit]?.split(' ')[0]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toExponential(6)} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Common Speed Conversions */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-1">Common Speed Conversions:</h4>
            <div className="grid gap-1 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>1 km/h</span>
                <span>=</span>
                <span>0.621 mph</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 m/s</span>
                <span>=</span>
                <span>3.6 km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 knot</span>
                <span>=</span>
                <span>1.852 km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Mach 1</span>
                <span>=</span>
                <span>1225 km/h</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Accurate conversions between different speed and velocity units
        </div>
      </CardFooter>
    </Card>
  );
}
