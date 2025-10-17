import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * WeightCalculator Component
 * 
 * Calculates weight from mass and gravity (Weight = Mass × Gravity)
 */
export function WeightCalculator() {
  const [mass, setMass] = useState<string>('100');
  const [gravity, setGravity] = useState<string>('9.81');
  const [location, setLocation] = useState<string>('earth');
  const [massUnit, setMassUnit] = useState<string>('kg');
  const [weightUnit, setWeightUnit] = useState<string>('N');
  const [calculatedWeight, setCalculatedWeight] = useState<number>(0);
  const { toast } = useToast();

  // Gravity values for different locations (m/s²)
  const gravityValues: { [key: string]: number } = {
    'earth': 9.81,
    'moon': 1.62,
    'mars': 3.71,
    'jupiter': 24.79,
    'venus': 8.87,
    'mercury': 3.70,
    'saturn': 10.44,
    'uranus': 8.69,
    'neptune': 11.15,
    'custom': parseFloat(gravity) || 9.81,
  };

  // Update gravity when location changes
  useEffect(() => {
    if (location !== 'custom') {
      setGravity(gravityValues[location].toString());
    }
  }, [location]);

  // Calculate weight when inputs change
  useEffect(() => {
    calculateWeight();
  }, [mass, gravity, massUnit, weightUnit]);

  // Function to convert mass to kilograms
  const convertMassToKg = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'kg': 1,
      'g': 0.001,
      'mg': 0.000001,
      'lb': 0.453592,
      'oz': 0.0283495,
      't': 1000,
    };
    return value * conversions[unit];
  };

  // Function to convert weight from Newtons to target unit
  const convertWeightFromNewtons = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'N': 1,
      'kN': 0.001,
      'lbf': 0.224809,
      'kgf': 0.101972,
    };
    return value * conversions[unit];
  };

  // Function to calculate weight
  const calculateWeight = () => {
    const m = parseFloat(mass);
    const g = parseFloat(gravity);

    if (isNaN(m) || isNaN(g)) {
      setCalculatedWeight(0);
      return;
    }

    // Convert mass to kg
    const massInKg = convertMassToKg(m, massUnit);

    // Calculate weight in Newtons: W = m × g
    const weightInNewtons = massInKg * g;

    // Convert to desired unit
    const finalWeight = convertWeightFromNewtons(weightInNewtons, weightUnit);

    setCalculatedWeight(finalWeight);
  };

  // Function to copy result to clipboard
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Function to reset values
  const handleReset = () => {
    setMass('100');
    setGravity('9.81');
    setLocation('earth');
    setMassUnit('kg');
    setWeightUnit('N');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Weight Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate weight from mass and gravitational acceleration (W = m × g)
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Scale className="mr-2 h-5 w-5" /> Input Values
          </h2>
          
          <div className="space-y-4">
            {/* Mass */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label htmlFor="mass">Mass</Label>
                <Input
                  id="mass"
                  type="number"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                  placeholder="Enter mass"
                  className="mt-2"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="massUnit">Unit</Label>
                <Select value={massUnit} onValueChange={setMassUnit}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="g">Grams (g)</SelectItem>
                    <SelectItem value="mg">Milligrams (mg)</SelectItem>
                    <SelectItem value="lb">Pounds (lb)</SelectItem>
                    <SelectItem value="oz">Ounces (oz)</SelectItem>
                    <SelectItem value="t">Tonnes (t)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earth">Earth (9.81 m/s²)</SelectItem>
                  <SelectItem value="moon">Moon (1.62 m/s²)</SelectItem>
                  <SelectItem value="mars">Mars (3.71 m/s²)</SelectItem>
                  <SelectItem value="jupiter">Jupiter (24.79 m/s²)</SelectItem>
                  <SelectItem value="venus">Venus (8.87 m/s²)</SelectItem>
                  <SelectItem value="mercury">Mercury (3.70 m/s²)</SelectItem>
                  <SelectItem value="saturn">Saturn (10.44 m/s²)</SelectItem>
                  <SelectItem value="uranus">Uranus (8.69 m/s²)</SelectItem>
                  <SelectItem value="neptune">Neptune (11.15 m/s²)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gravity */}
            <div>
              <Label htmlFor="gravity">Gravitational Acceleration (m/s²)</Label>
              <Input
                id="gravity"
                type="number"
                value={gravity}
                onChange={(e) => {
                  setGravity(e.target.value);
                  setLocation('custom');
                }}
                placeholder="Enter gravity"
                className="mt-2"
                min="0"
                step="0.01"
                disabled={location !== 'custom'}
              />
            </div>

            {/* Weight Unit Selection */}
            <div>
              <Label htmlFor="weightUnit">Weight Unit</Label>
              <Select value={weightUnit} onValueChange={setWeightUnit}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="N">Newtons (N)</SelectItem>
                  <SelectItem value="kN">Kilonewtons (kN)</SelectItem>
                  <SelectItem value="lbf">Pound-force (lbf)</SelectItem>
                  <SelectItem value="kgf">Kilogram-force (kgf)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Scale className="mr-2 h-5 w-5" /> Calculation Result
            </h2>
            
            {/* Weight Result */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Weight</h3>
                  <div className="text-4xl font-bold">
                    {calculatedWeight.toFixed(4)} {weightUnit}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Formula: W = m × g
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(calculatedWeight.toFixed(4), 'Weight')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {/* Input Summary */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Mass Input</h3>
                <div className="text-xl font-bold">
                  {mass} {massUnit}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Gravity</h3>
                <div className="text-xl font-bold">
                  {gravity} m/s²
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Weight Calculation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Weight vs Mass</h3>
              <p className="text-muted-foreground text-sm">
                Mass is the amount of matter in an object. Weight is the force exerted by gravity on that mass.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Planetary Weights</h3>
              <p className="text-muted-foreground text-sm">
                Your weight changes on different planets due to varying gravitational forces, but your mass remains the same.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in physics, engineering, aerospace, and science to calculate forces and structural loads.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default WeightCalculator;
