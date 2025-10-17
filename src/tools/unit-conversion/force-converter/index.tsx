import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Force conversion factors (to Newtons)
const conversionFactors = {
  // SI units
  newton: 1,
  kilonewton: 1000,
  meganewton: 1000000,
  
  // Gravitational force units
  kilogramForce: 9.80665,
  gramForce: 0.00980665,
  tonForce: 9806.65,
  
  // Imperial/US units
  poundForce: 4.44822,
  ounceForce: 0.278014,
  poundal: 0.138255,
  
  // Pressure * area units
  dyne: 1e-5,
  kilopond: 9.80665,
  
  // Other units
  tonForceShort: 8896.44, // Short ton-force
  tonForceLong: 9964.02,  // Long ton-force
  kipForce: 4448.22      // kilopound-force
};

// Type for Force units
type ForceUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  newton: "Newton (N)",
  kilonewton: "Kilonewton (kN)",
  meganewton: "Meganewton (MN)",
  kilogramForce: "Kilogram-force (kgf)",
  gramForce: "Gram-force (gf)",
  tonForce: "Ton-force (tf)",
  poundForce: "Pound-force (lbf)",
  ounceForce: "Ounce-force (ozf)",
  poundal: "Poundal (pdl)",
  dyne: "Dyne (dyn)",
  kilopond: "Kilopond (kp)",
  tonForceShort: "Short ton-force (short tf)",
  tonForceLong: "Long ton-force (long tf)",
  kipForce: "Kip-force (kip)"
};

/**
 * Force Converter Component
 * Allows users to convert between different units of force
 */
export default function ForceConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<ForceUnit>('newton');
  const [toUnit, setToUnit] = useState<ForceUnit>('poundForce');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertForce();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one force unit to another
   */
  const convertForce = () => {
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
    // First convert to newtons (base unit), then to target unit
    const inNewtons = value * conversionFactors[fromUnit];
    const converted = inNewtons / conversionFactors[toUnit];

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
    setFromUnit('newton');
    setToUnit('poundForce');
    setResult('');
    setError(null);
  };

  // Generate the Select options grouped by category
  const renderUnitOptions = () => {
    const groups = {
      "SI Units": ["newton", "kilonewton", "meganewton"],
      "Gravitational": ["kilogramForce", "gramForce", "tonForce", "kilopond"],
      "Imperial/US": ["poundForce", "ounceForce", "poundal", "kipForce", "tonForceShort", "tonForceLong"],
      "Other": ["dyne"]
    };

    return Object.entries(groups).map(([groupName, units]) => (
      <React.Fragment key={groupName}>
        <SelectItem value={units[0]} disabled className="font-semibold text-primary">
          {groupName}
        </SelectItem>
        {units.map(unit => (
          <SelectItem key={unit} value={unit}>
            {unitLabels[unit as ForceUnit]}
          </SelectItem>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <MoveRight className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Force Converter</CardTitle>
            <CardDescription>
              Convert between different units of force and pressure
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="force-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="force-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter force value"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as ForceUnit)}>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as ForceUnit)}>
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

          {/* About Force Units */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-1">What is Force?</h4>
            <p className="text-muted-foreground mb-2">
              Force is a push or pull that can cause an object with mass to accelerate. It can also be described as any interaction that, when unopposed, changes the motion of an object. The SI unit of force is the newton (N).
            </p>

            <h4 className="font-medium mb-1">Common Force Units:</h4>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li><strong>Newton (N):</strong> The SI unit of force, defined as the force needed to accelerate a 1 kg mass at a rate of 1 meter per second squared (1 kg·m/s²).</li>
              <li><strong>Pound-force (lbf):</strong> The gravitational force exerted on a mass of one pound at the Earth's surface. 1 lbf is approximately 4.448 N.</li>
              <li><strong>Kilogram-force (kgf):</strong> The force exerted by Earth's gravity on one kilogram of mass. 1 kgf is equal to 9.807 N.</li>
              <li><strong>Dyne (dyn):</strong> A small unit of force in the CGS system, equal to 10⁻⁵ N.</li>
              <li><strong>Kip:</strong> A unit used in engineering in the US, equal to 1,000 pounds-force or approximately 4,448 N.</li>
            </ul>

            <h4 className="font-medium mt-2 mb-1">How Force is Measured:</h4>
            <p className="text-muted-foreground">
              Force is measured using Newton's Second Law of Motion: F = ma, where F is force, m is mass, and a is acceleration. Force can also be measured using devices like spring scales, load cells, and dynamometers that use the deformation of a material to indicate the applied force.
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
          Accurate conversions between different force measurement units
        </div>
      </CardFooter>
    </Card>
  );
}
