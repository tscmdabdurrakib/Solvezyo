import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Angle conversion factors (to Radians)
const conversionFactors = {
  // Common angles units
  radian: 1,
  degree: Math.PI / 180,
  arcminute: Math.PI / (180 * 60),
  arcsecond: Math.PI / (180 * 60 * 60),
  
  // Circle divisions
  gradian: Math.PI / 200,
  milliradian: 0.001,
  minuteOfArc: Math.PI / (180 * 60),
  secondOfArc: Math.PI / (180 * 60 * 60),
  
  // Navigational units
  turn: 2 * Math.PI,
  quadrant: Math.PI / 2,
  sextant: Math.PI / 3,
  octant: Math.PI / 4,
  
  // Specific angles
  rightAngle: Math.PI / 2,
  straightAngle: Math.PI,
  fullAngle: 2 * Math.PI,
  
  // Other
  hourAngle: Math.PI / 12  // 15 degrees = 1 hour in astronomy
};

// Type for Angle units
type AngleUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  radian: "Radian (rad)",
  degree: "Degree (°)",
  arcminute: "Arcminute (')",
  arcsecond: "Arcsecond (\")",
  gradian: "Gradian (grad)",
  milliradian: "Milliradian (mrad)",
  minuteOfArc: "Minute of Arc (')",
  secondOfArc: "Second of Arc (\")",
  turn: "Turn (rev)",
  quadrant: "Quadrant (quad)",
  sextant: "Sextant (sext)",
  octant: "Octant (oct)",
  rightAngle: "Right Angle",
  straightAngle: "Straight Angle",
  fullAngle: "Full Angle",
  hourAngle: "Hour Angle (h)"
};

/**
 * Angle Converter Component
 * Allows users to convert between different units of angle measurement
 */
export default function AngleConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<AngleUnit>('degree');
  const [toUnit, setToUnit] = useState<AngleUnit>('radian');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertAngle();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one angle unit to another
   */
  const convertAngle = () => {
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

    // Perform conversion
    // First convert to radians (base unit), then to target unit
    const inRadians = value * conversionFactors[fromUnit];
    const converted = inRadians / conversionFactors[toUnit];

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
    setFromUnit('degree');
    setToUnit('radian');
    setResult('');
    setError(null);
  };

  // Generate the Select options grouped by category
  const renderUnitOptions = () => {
    const groups = {
      "Common Units": ["degree", "radian", "arcminute", "arcsecond"],
      "Circle Divisions": ["gradian", "milliradian", "minuteOfArc", "secondOfArc"],
      "Navigational": ["turn", "quadrant", "sextant", "octant", "hourAngle"],
      "Geometric": ["rightAngle", "straightAngle", "fullAngle"]
    };

    return Object.entries(groups).map(([groupName, units]) => (
      <React.Fragment key={groupName}>
        <SelectItem value={units[0]} disabled className="font-semibold text-primary">
          {groupName}
        </SelectItem>
        {units.map(unit => (
          <SelectItem key={unit} value={unit}>
            {unitLabels[unit as AngleUnit]}
          </SelectItem>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Compass className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Angle Converter</CardTitle>
            <CardDescription>
              Convert between different units of angular measurement
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="angle-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="angle-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter angle"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as AngleUnit)}>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as AngleUnit)}>
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

          {/* About Angle Units */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-1">What are Angles?</h4>
            <p className="text-muted-foreground mb-2">
              An angle is a figure formed by two rays, called the sides of the angle, sharing a common endpoint, called the vertex. Angles are used to measure rotation, orientation, and the space between intersecting lines or surfaces.
            </p>

            <h4 className="font-medium mb-1">Common Angle Units:</h4>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li><strong>Degree (°):</strong> Based on a 360-part division of a full circle. The most commonly used angular unit in everyday life.</li>
              <li><strong>Radian (rad):</strong> The SI unit of angle, defined as the angle subtended at the center of a circle by an arc whose length is equal to the radius of the circle. A full circle is 2π radians.</li>
              <li><strong>Arcminute (') and Arcsecond (\"):</strong> Subdivisions of a degree. 1 degree = 60 arcminutes, 1 arcminute = 60 arcseconds. Used in astronomy, navigation, and surveying.</li>
              <li><strong>Gradian (grad):</strong> Based on a 400-part division of a full circle, making right angles exactly 100 gradians. Used in some fields of engineering and surveying.</li>
              <li><strong>Turn:</strong> A full 360° rotation (2π radians). Useful in contexts where rotational symmetry is important.</li>
            </ul>

            <h4 className="font-medium mt-2 mb-1">How Angle Measurements Are Used:</h4>
            <p className="text-muted-foreground">
              Angle measurements are essential in mathematics, physics, engineering, navigation, astronomy, and many other fields. They help describe rotations, directions, positions, and the relationships between lines and surfaces in geometry and trigonometry.
            </p>
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
          Accurate conversions between different angular measurement units
        </div>
      </CardFooter>
    </Card>
  );
}
