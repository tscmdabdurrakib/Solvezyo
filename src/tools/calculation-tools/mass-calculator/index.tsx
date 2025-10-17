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
 * MassCalculator Component
 * 
 * Calculates mass from density and volume, or finds missing values
 */
export function MassCalculator() {
  const [density, setDensity] = useState<string>('2');
  const [volume, setVolume] = useState<string>('100');
  const [densityUnit, setDensityUnit] = useState<string>('g/cm³');
  const [volumeUnit, setVolumeUnit] = useState<string>('cm³');
  const [massUnit, setMassUnit] = useState<string>('g');
  const [calculatedMass, setCalculatedMass] = useState<number>(0);
  const { toast } = useToast();

  // Calculate mass when inputs change
  useEffect(() => {
    calculateMass();
  }, [density, volume, densityUnit, volumeUnit, massUnit]);

  // Function to convert density to g/cm³
  const convertDensityToGPerCm3 = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'g/cm³': 1,
      'kg/m³': 0.001,
      'g/mL': 1,
      'lb/ft³': 0.016018,
      'lb/in³': 27.68,
    };
    return value * conversions[unit];
  };

  // Function to convert volume to cm³
  const convertVolumeToCm3 = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'cm³': 1,
      'm³': 1000000,
      'L': 1000,
      'mL': 1,
      'in³': 16.3871,
      'ft³': 28316.8,
    };
    return value * conversions[unit];
  };

  // Function to convert mass from grams to target unit
  const convertMassFromGrams = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'g': 1,
      'kg': 0.001,
      'mg': 1000,
      'lb': 0.00220462,
      'oz': 0.035274,
      't': 0.000001,
    };
    return value * conversions[unit];
  };

  // Function to calculate mass
  const calculateMass = () => {
    const d = parseFloat(density);
    const v = parseFloat(volume);

    if (isNaN(d) || isNaN(v)) {
      setCalculatedMass(0);
      return;
    }

    // Convert to base units
    const densityInGPerCm3 = convertDensityToGPerCm3(d, densityUnit);
    const volumeInCm3 = convertVolumeToCm3(v, volumeUnit);

    // Calculate mass in grams: mass = density × volume
    const massInGrams = densityInGPerCm3 * volumeInCm3;

    // Convert to desired unit
    const finalMass = convertMassFromGrams(massInGrams, massUnit);

    setCalculatedMass(finalMass);
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
    setDensity('2');
    setVolume('100');
    setDensityUnit('g/cm³');
    setVolumeUnit('cm³');
    setMassUnit('g');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Mass Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate mass from density and volume (Mass = Density × Volume)
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Scale className="mr-2 h-5 w-5" /> Input Values
          </h2>
          
          <div className="space-y-4">
            {/* Density */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label htmlFor="density">Density</Label>
                <Input
                  id="density"
                  type="number"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  placeholder="Enter density"
                  className="mt-2"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="densityUnit">Unit</Label>
                <Select value={densityUnit} onValueChange={setDensityUnit}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="g/cm³">g/cm³</SelectItem>
                    <SelectItem value="kg/m³">kg/m³</SelectItem>
                    <SelectItem value="g/mL">g/mL</SelectItem>
                    <SelectItem value="lb/ft³">lb/ft³</SelectItem>
                    <SelectItem value="lb/in³">lb/in³</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Volume */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label htmlFor="volume">Volume</Label>
                <Input
                  id="volume"
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="Enter volume"
                  className="mt-2"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="volumeUnit">Unit</Label>
                <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm³">cm³</SelectItem>
                    <SelectItem value="m³">m³</SelectItem>
                    <SelectItem value="L">Liters (L)</SelectItem>
                    <SelectItem value="mL">Milliliters (mL)</SelectItem>
                    <SelectItem value="in³">in³</SelectItem>
                    <SelectItem value="ft³">ft³</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mass Unit Selection */}
            <div>
              <Label htmlFor="massUnit">Mass Unit</Label>
              <Select value={massUnit} onValueChange={setMassUnit}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">Grams (g)</SelectItem>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="mg">Milligrams (mg)</SelectItem>
                  <SelectItem value="lb">Pounds (lb)</SelectItem>
                  <SelectItem value="oz">Ounces (oz)</SelectItem>
                  <SelectItem value="t">Tonnes (t)</SelectItem>
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
            
            {/* Mass Result */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Mass</h3>
                  <div className="text-4xl font-bold">
                    {calculatedMass.toFixed(4)} {massUnit}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Formula: m = ρ × V
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(calculatedMass.toFixed(4), 'Mass')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {/* Input Summary */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Density Input</h3>
                <div className="text-xl font-bold">
                  {density} {densityUnit}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Volume Input</h3>
                <div className="text-xl font-bold">
                  {volume} {volumeUnit}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Mass Calculation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Formula</h3>
              <p className="text-muted-foreground text-sm">
                Mass (m) = Density (ρ) × Volume (V). This fundamental relationship helps determine how much matter is in an object.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Multiple Units</h3>
              <p className="text-muted-foreground text-sm">
                Convert between grams, kilograms, pounds, ounces, and more with automatic unit conversion.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Essential for chemistry, physics, engineering, manufacturing, and material science calculations.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MassCalculator;
