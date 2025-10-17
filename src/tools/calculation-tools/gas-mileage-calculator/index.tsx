import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Fuel, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * GasMileageCalculator Component
 * 
 * Calculate fuel efficiency in MPG or L/100km
 */
export function GasMileageCalculator() {
  const { toast } = useToast();

  // State for inputs
  const [distance, setDistance] = useState<number>(0);
  const [fuelUsed, setFuelUsed] = useState<number>(0);
  const [unit, setUnit] = useState<string>('imperial'); // imperial or metric
  
  // State for results
  const [mpg, setMpg] = useState<number>(0);
  const [litersPer100km, setLitersPer100km] = useState<number>(0);
  const [kmPerLiter, setKmPerLiter] = useState<number>(0);

  // Calculate gas mileage when inputs change
  useEffect(() => {
    calculateMileage();
  }, [distance, fuelUsed, unit]);

  // Function to calculate gas mileage
  const calculateMileage = () => {
    if (distance <= 0 || fuelUsed <= 0) {
      setMpg(0);
      setLitersPer100km(0);
      setKmPerLiter(0);
      return;
    }

    if (unit === 'imperial') {
      // Miles and gallons
      const calculatedMpg = distance / fuelUsed;
      setMpg(calculatedMpg);
      
      // Convert to metric
      const km = distance * 1.60934; // miles to km
      const liters = fuelUsed * 3.78541; // gallons to liters
      setLitersPer100km((liters / km) * 100);
      setKmPerLiter(km / liters);
    } else {
      // Kilometers and liters
      const km = distance;
      const liters = fuelUsed;
      setLitersPer100km((liters / km) * 100);
      setKmPerLiter(km / liters);
      
      // Convert to imperial
      const miles = km / 1.60934;
      const gallons = liters / 3.78541;
      setMpg(miles / gallons);
    }
  };

  // Function to reset all values
  const handleReset = () => {
    setDistance(0);
    setFuelUsed(0);
    setUnit('imperial');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Gas Mileage Calculation:
Distance: ${distance} ${unit === 'imperial' ? 'miles' : 'km'}
Fuel Used: ${fuelUsed} ${unit === 'imperial' ? 'gallons' : 'liters'}

Results:
MPG: ${mpg.toFixed(2)}
L/100km: ${litersPer100km.toFixed(2)}
km/L: ${kmPerLiter.toFixed(2)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Gas mileage results copied to clipboard",
    });
  };

  // Get efficiency rating
  const getEfficiencyRating = () => {
    if (unit === 'imperial') {
      if (mpg >= 40) return { rating: 'Excellent', color: 'text-green-600 dark:text-green-400' };
      if (mpg >= 30) return { rating: 'Good', color: 'text-blue-600 dark:text-blue-400' };
      if (mpg >= 20) return { rating: 'Average', color: 'text-yellow-600 dark:text-yellow-400' };
      return { rating: 'Below Average', color: 'text-orange-600 dark:text-orange-400' };
    } else {
      if (litersPer100km <= 5) return { rating: 'Excellent', color: 'text-green-600 dark:text-green-400' };
      if (litersPer100km <= 7) return { rating: 'Good', color: 'text-blue-600 dark:text-blue-400' };
      if (litersPer100km <= 10) return { rating: 'Average', color: 'text-yellow-600 dark:text-yellow-400' };
      return { rating: 'Below Average', color: 'text-orange-600 dark:text-orange-400' };
    }
  };

  const efficiency = getEfficiencyRating();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Gas Mileage Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your vehicle's fuel efficiency in MPG or L/100km
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Fuel className="mr-2 h-5 w-5" /> Fuel Data
          </h2>
          
          <div className="space-y-6">
            {/* Unit Selection */}
            <div>
              <Label htmlFor="unit">Unit System</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imperial">Imperial (Miles, Gallons)</SelectItem>
                  <SelectItem value="metric">Metric (Kilometers, Liters)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Distance */}
            <div>
              <Label htmlFor="distance">
                Distance Traveled ({unit === 'imperial' ? 'miles' : 'km'})
              </Label>
              <div className="relative mt-1.5">
                <Car className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Fuel Used */}
            <div>
              <Label htmlFor="fuelUsed">
                Fuel Used ({unit === 'imperial' ? 'gallons' : 'liters'})
              </Label>
              <div className="relative mt-1.5">
                <Fuel className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fuelUsed"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={fuelUsed}
                  onChange={(e) => setFuelUsed(Number(e.target.value))}
                />
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Fuel Efficiency</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Miles Per Gallon
                    </h3>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {mpg.toFixed(2)} MPG
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Liters per 100 Kilometers
                    </h3>
                    <div className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                      {litersPer100km.toFixed(2)} L/100km
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      Kilometers per Liter
                    </h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {kmPerLiter.toFixed(2)} km/L
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Efficiency Rating
                    </h3>
                    <div className={`text-2xl font-bold ${efficiency.color}`}>
                      {efficiency.rating}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Fuel Efficiency</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • MPG (Miles Per Gallon): Higher is better
              </p>
              <p>
                • L/100km (Liters per 100km): Lower is better
              </p>
              <p>
                • Efficiency varies with driving conditions and vehicle type
              </p>
              <p>
                • Highway driving typically yields better mileage than city driving
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GasMileageCalculator;
