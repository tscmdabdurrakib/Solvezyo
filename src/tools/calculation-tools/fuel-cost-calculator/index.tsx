import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Fuel, DollarSign, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * FuelCostCalculator Component
 * 
 * Calculate fuel costs for trips based on distance, fuel efficiency, and fuel price
 */
export function FuelCostCalculator() {
  const { toast } = useToast();

  // State for input values
  const [distance, setDistance] = useState<number>(100);
  const [fuelEfficiency, setFuelEfficiency] = useState<number>(25);
  const [fuelPrice, setFuelPrice] = useState<number>(3.5);
  
  // State for calculated results
  const [fuelNeeded, setFuelNeeded] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [costPerMile, setCostPerMile] = useState<number>(0);

  // Calculate fuel cost when inputs change
  useEffect(() => {
    calculateFuelCost();
  }, [distance, fuelEfficiency, fuelPrice]);

  // Function to calculate fuel cost
  const calculateFuelCost = () => {
    // Calculate fuel needed (distance / MPG)
    const gallonsNeeded = distance / fuelEfficiency;
    setFuelNeeded(gallonsNeeded);

    // Calculate total cost
    const cost = gallonsNeeded * fuelPrice;
    setTotalCost(cost);

    // Calculate cost per mile
    const perMile = cost / distance;
    setCostPerMile(isFinite(perMile) ? perMile : 0);
  };

  // Function to reset all values
  const handleReset = () => {
    setDistance(100);
    setFuelEfficiency(25);
    setFuelPrice(3.5);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Fuel Cost Calculation:
Distance: ${distance} miles
Fuel Efficiency: ${fuelEfficiency} MPG
Fuel Price: $${fuelPrice.toFixed(2)}/gallon
Fuel Needed: ${fuelNeeded.toFixed(2)} gallons
Total Cost: $${totalCost.toFixed(2)}
Cost per Mile: $${costPerMile.toFixed(3)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Fuel cost details copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Fuel Cost Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate trip fuel costs based on distance, efficiency, and fuel prices
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Fuel className="mr-2 h-5 w-5" /> Trip Details
          </h2>
          
          <div className="space-y-6">
            {/* Distance */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="distance">Distance (miles)</Label>
                <span className="text-sm font-bold">{distance}</span>
              </div>
              <div className="relative mt-1.5">
                <Navigation className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="distance"
                  type="number"
                  step="1"
                  className="pl-10"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[distance]}
                max={1000}
                step={10}
                onValueChange={(values) => setDistance(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 mi</span>
                <span>500 mi</span>
                <span>1000 mi</span>
              </div>
            </div>

            {/* Fuel Efficiency */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="fuelEfficiency">Fuel Efficiency (MPG)</Label>
                <span className="text-sm font-bold">{fuelEfficiency}</span>
              </div>
              <div className="relative mt-1.5">
                <Fuel className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fuelEfficiency"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={fuelEfficiency}
                  onChange={(e) => setFuelEfficiency(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[fuelEfficiency]}
                max={60}
                min={5}
                step={1}
                onValueChange={(values) => setFuelEfficiency(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5 MPG</span>
                <span>30 MPG</span>
                <span>60 MPG</span>
              </div>
            </div>

            {/* Fuel Price */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="fuelPrice">Fuel Price ($/gallon)</Label>
                <span className="text-sm font-bold">${fuelPrice.toFixed(2)}</span>
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fuelPrice"
                  type="number"
                  step="0.01"
                  className="pl-10"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[fuelPrice]}
                max={10}
                min={1}
                step={0.1}
                onValueChange={(values) => setFuelPrice(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$1.00</span>
                <span>$5.00</span>
                <span>$10.00</span>
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
                  <h2 className="text-xl font-semibold">Cost Breakdown</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Total Fuel Cost
                    </h3>
                    <div className="mt-2 text-5xl font-bold text-green-600 dark:text-green-400">
                      ${totalCost.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Fuel Needed</h3>
                      <div className="mt-1 text-2xl font-bold">{fuelNeeded.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">gallons</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Cost per Mile</h3>
                      <div className="mt-1 text-2xl font-bold">${costPerMile.toFixed(3)}</div>
                      <div className="text-xs text-muted-foreground">per mile</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                      Trip Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Distance:</span>
                        <span className="font-bold">{distance} miles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vehicle MPG:</span>
                        <span className="font-bold">{fuelEfficiency} MPG</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fuel Price:</span>
                        <span className="font-bold">${fuelPrice.toFixed(2)}/gal</span>
                      </div>
                    </div>
                  </div>

                  {/* Return Trip Cost */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Round Trip Cost
                    </h3>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      ${(totalCost * 2).toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total cost for a round trip ({distance * 2} miles)
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Fuel Saving Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Maintain steady speeds to improve fuel efficiency
              </p>
              <p>
                • Keep tires properly inflated to reduce fuel consumption
              </p>
              <p>
                • Remove unnecessary weight from your vehicle
              </p>
              <p>
                • Use cruise control on highways when possible
              </p>
              <p>
                • Plan routes to avoid traffic and minimize idling
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FuelCostCalculator;
