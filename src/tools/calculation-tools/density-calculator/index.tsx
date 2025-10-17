import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * DensityCalculator Component
 * 
 * Calculates density from mass and volume, or finds missing values
 */
export function DensityCalculator() {
  const [mass, setMass] = useState<string>('100');
  const [volume, setVolume] = useState<string>('50');
  const [density, setDensity] = useState<string>('');
  const [massUnit, setMassUnit] = useState<string>('g');
  const [volumeUnit, setVolumeUnit] = useState<string>('cm³');
  const [densityUnit, setDensityUnit] = useState<string>('g/cm³');
  const [calculatedDensity, setCalculatedDensity] = useState<number>(0);
  const { toast } = useToast();

  // Calculate density when inputs change
  useEffect(() => {
    if (mass && volume) {
      calculateDensity();
    }
  }, [mass, volume, massUnit, volumeUnit, densityUnit]);

  // Function to convert mass to grams
  const convertMassToGrams = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'g': 1,
      'kg': 1000,
      'mg': 0.001,
      'lb': 453.592,
      'oz': 28.3495,
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

  // Function to calculate density
  const calculateDensity = () => {
    const m = parseFloat(mass);
    const v = parseFloat(volume);

    if (isNaN(m) || isNaN(v) || v === 0) {
      setCalculatedDensity(0);
      return;
    }

    // Convert to base units (g and cm³)
    const massInGrams = convertMassToGrams(m, massUnit);
    const volumeInCm3 = convertVolumeToCm3(v, volumeUnit);

    // Calculate density in g/cm³
    const densityInGPerCm3 = massInGrams / volumeInCm3;

    // Convert to desired density unit
    let finalDensity = densityInGPerCm3;
    switch (densityUnit) {
      case 'g/cm³':
        finalDensity = densityInGPerCm3;
        break;
      case 'kg/m³':
        finalDensity = densityInGPerCm3 * 1000;
        break;
      case 'g/mL':
        finalDensity = densityInGPerCm3;
        break;
      case 'lb/ft³':
        finalDensity = densityInGPerCm3 * 62.428;
        break;
      case 'lb/in³':
        finalDensity = densityInGPerCm3 * 0.0361273;
        break;
    }

    setCalculatedDensity(finalDensity);
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
    setVolume('50');
    setDensity('');
    setMassUnit('g');
    setVolumeUnit('cm³');
    setDensityUnit('g/cm³');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Density Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate density from mass and volume (Density = Mass / Volume)
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Package className="mr-2 h-5 w-5" /> Input Values
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
                    <SelectItem value="g">Grams (g)</SelectItem>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="mg">Milligrams (mg)</SelectItem>
                    <SelectItem value="lb">Pounds (lb)</SelectItem>
                    <SelectItem value="oz">Ounces (oz)</SelectItem>
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

            {/* Density Unit Selection */}
            <div>
              <Label htmlFor="densityUnit">Density Unit</Label>
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
              <Package className="mr-2 h-5 w-5" /> Calculation Result
            </h2>
            
            {/* Density Result */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Density</h3>
                  <div className="text-4xl font-bold">
                    {calculatedDensity.toFixed(4)} {densityUnit}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Formula: ρ = m / V
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(calculatedDensity.toFixed(4), 'Density')}
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
          <h2 className="text-xl font-semibold mb-4">About Density</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Formula</h3>
              <p className="text-muted-foreground text-sm">
                Density (ρ) = Mass (m) / Volume (V). It measures how much mass is contained in a given volume.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Common Densities</h3>
              <p className="text-muted-foreground text-sm">
                Water: 1 g/cm³, Aluminum: 2.7 g/cm³, Iron: 7.87 g/cm³, Gold: 19.3 g/cm³
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in material science, chemistry, physics, and engineering to identify substances and calculate properties.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DensityCalculator;
