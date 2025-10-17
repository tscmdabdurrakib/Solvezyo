import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Fuel, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * MileageCalculator Component
 * 
 * Calculates fuel economy (MPG/L/100km), fuel cost, and trip expenses
 */
export function MileageCalculator() {
  const [distanceTraveled, setDistanceTraveled] = useState<string>('300');
  const [fuelUsed, setFuelUsed] = useState<string>('12');
  const [fuelPrice, setFuelPrice] = useState<string>('3.50');
  const [distanceUnit, setDistanceUnit] = useState<string>('miles');
  const [fuelUnit, setFuelUnit] = useState<string>('gallons');
  const [mpg, setMpg] = useState<number>(0);
  const [kmPerLiter, setKmPerLiter] = useState<number>(0);
  const [litersPer100Km, setLitersPer100Km] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [costPerMile, setCostPerMile] = useState<number>(0);
  const { toast } = useToast();

  // Calculate mileage when inputs change
  useEffect(() => {
    calculateMileage();
  }, [distanceTraveled, fuelUsed, fuelPrice, distanceUnit, fuelUnit]);

  // Function to calculate mileage
  const calculateMileage = () => {
    const distance = parseFloat(distanceTraveled) || 0;
    const fuel = parseFloat(fuelUsed) || 0;
    const price = parseFloat(fuelPrice) || 0;

    if (fuel === 0 || distance === 0) {
      setMpg(0);
      setKmPerLiter(0);
      setLitersPer100Km(0);
      setTotalCost(0);
      setCostPerMile(0);
      return;
    }

    let distanceInMiles = distance;
    let fuelInGallons = fuel;

    // Convert to miles if needed
    if (distanceUnit === 'kilometers') {
      distanceInMiles = distance * 0.621371;
    }

    // Convert to gallons if needed
    if (fuelUnit === 'liters') {
      fuelInGallons = fuel * 0.264172;
    }

    // Calculate MPG (miles per gallon)
    const milesPerGallon = distanceInMiles / fuelInGallons;
    setMpg(milesPerGallon);

    // Calculate km/L (kilometers per liter)
    const distanceInKm = distanceUnit === 'kilometers' ? distance : distance * 1.60934;
    const fuelInLiters = fuelUnit === 'liters' ? fuel : fuel * 3.78541;
    const kmPerL = distanceInKm / fuelInLiters;
    setKmPerLiter(kmPerL);

    // Calculate L/100km (liters per 100 kilometers)
    const litersPer100 = (fuelInLiters / distanceInKm) * 100;
    setLitersPer100Km(litersPer100);

    // Calculate total cost and cost per distance
    const cost = fuel * price;
    setTotalCost(cost);
    setCostPerMile(cost / distance);
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
    setDistanceTraveled('300');
    setFuelUsed('12');
    setFuelPrice('3.50');
    setDistanceUnit('miles');
    setFuelUnit('gallons');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Mileage Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate fuel economy, MPG, and trip fuel costs
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Car className="mr-2 h-5 w-5" /> Trip Details
          </h2>
          
          <div className="space-y-4">
            {/* Distance Traveled */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label htmlFor="distance">Distance Traveled</Label>
                <Input
                  id="distance"
                  type="number"
                  value={distanceTraveled}
                  onChange={(e) => setDistanceTraveled(e.target.value)}
                  placeholder="Enter distance"
                  className="mt-2"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="distanceUnit">Unit</Label>
                <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="miles">Miles</SelectItem>
                    <SelectItem value="kilometers">Kilometers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fuel Used */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label htmlFor="fuel">Fuel Used</Label>
                <Input
                  id="fuel"
                  type="number"
                  value={fuelUsed}
                  onChange={(e) => setFuelUsed(e.target.value)}
                  placeholder="Enter fuel amount"
                  className="mt-2"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="fuelUnit">Unit</Label>
                <Select value={fuelUnit} onValueChange={setFuelUnit}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gallons">Gallons</SelectItem>
                    <SelectItem value="liters">Liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fuel Price */}
            <div>
              <Label htmlFor="fuelPrice">Fuel Price per {fuelUnit === 'gallons' ? 'Gallon' : 'Liter'} ($)</Label>
              <Input
                id="fuelPrice"
                type="number"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                placeholder="Enter fuel price"
                className="mt-2"
                min="0"
                step="0.01"
              />
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
              <Fuel className="mr-2 h-5 w-5" /> Fuel Economy Results
            </h2>
            
            <div className="grid gap-4">
              {/* MPG */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Miles Per Gallon (MPG)</h3>
                    <div className="text-4xl font-bold">
                      {mpg.toFixed(2)} MPG
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(mpg.toFixed(2), 'MPG')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* km/L */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Kilometers Per Liter</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {kmPerLiter.toFixed(2)} km/L
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(kmPerLiter.toFixed(2), 'km/L')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* L/100km */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Liters Per 100km</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {litersPer100Km.toFixed(2)} L/100km
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(litersPer100Km.toFixed(2), 'L/100km')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total Cost */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Total Fuel Cost</h3>
                      <div className="mt-1 text-2xl font-bold">
                        ${totalCost.toFixed(2)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(totalCost.toFixed(2), 'Total Cost')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Cost Per Mile */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Cost Per {distanceUnit === 'miles' ? 'Mile' : 'Kilometer'}
                      </h3>
                      <div className="mt-1 text-2xl font-bold">
                        ${costPerMile.toFixed(3)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(costPerMile.toFixed(3), 'Cost Per Distance')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Mileage Calculator</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Multiple Units</h3>
              <p className="text-muted-foreground text-sm">
                Calculate fuel economy in MPG, km/L, and L/100km to suit your preference and location.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Cost Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Track your fuel expenses with total cost and cost per distance calculations.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Flexible Input</h3>
              <p className="text-muted-foreground text-sm">
                Enter distance in miles or kilometers and fuel in gallons or liters for accurate results.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MileageCalculator;
