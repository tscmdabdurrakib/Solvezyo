import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Cog, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * EngineHorsepowerCalculator Component
 * 
 * Calculate engine horsepower using various methods
 */
export function EngineHorsepowerCalculator() {
  const { toast } = useToast();

  // State for calculation method
  const [method, setMethod] = useState<string>('displacement'); // displacement, weight, et
  
  // State for displacement method
  const [cylinders, setCylinders] = useState<number>(4);
  const [bore, setBore] = useState<number>(0); // inches or mm
  const [stroke, setStroke] = useState<number>(0); // inches or mm
  const [unit, setUnit] = useState<string>('imperial'); // imperial or metric
  
  // State for weight/speed method
  const [vehicleWeight, setVehicleWeight] = useState<number>(0); // lbs or kg
  const [speed, setSpeed] = useState<number>(0); // mph or km/h
  const [time, setTime] = useState<number>(0); // seconds
  
  // State for ET (Elapsed Time) method
  const [weight, setWeight] = useState<number>(0); // lbs
  const [et, setEt] = useState<number>(0); // seconds
  
  // State for results
  const [horsepower, setHorsepower] = useState<number>(0);
  const [displacement, setDisplacement] = useState<number>(0);

  // Calculate when inputs change
  useEffect(() => {
    calculateHorsepower();
  }, [method, cylinders, bore, stroke, unit, vehicleWeight, speed, time, weight, et]);

  // Function to calculate horsepower
  const calculateHorsepower = () => {
    let hp = 0;
    
    switch (method) {
      case 'displacement':
        hp = calculateFromDisplacement();
        break;
      case 'weight':
        hp = calculateFromWeightSpeed();
        break;
      case 'et':
        hp = calculateFromET();
        break;
    }
    
    setHorsepower(hp);
  };

  // Calculate from engine displacement
  const calculateFromDisplacement = () => {
    if (bore <= 0 || stroke <= 0 || cylinders <= 0) return 0;
    
    // Convert to inches if needed
    const boreInches = unit === 'metric' ? bore / 25.4 : bore;
    const strokeInches = unit === 'metric' ? stroke / 25.4 : stroke;
    
    // Displacement in cubic inches = (π/4) × bore² × stroke × cylinders
    const disp = (Math.PI / 4) * Math.pow(boreInches, 2) * strokeInches * cylinders;
    setDisplacement(disp);
    
    // Estimate HP (typical naturally aspirated engine: ~1 HP per cubic inch)
    // This is a rough estimate
    return disp * 0.5; // Conservative estimate
  };

  // Calculate from weight and speed
  const calculateFromWeightSpeed = () => {
    if (vehicleWeight <= 0 || speed <= 0 || time <= 0) return 0;
    
    // Convert to imperial if needed
    const weightLbs = unit === 'metric' ? vehicleWeight * 2.20462 : vehicleWeight;
    const speedMph = unit === 'metric' ? speed * 0.621371 : speed;
    
    // HP = Weight × (Speed/234)³
    return weightLbs * Math.pow(speedMph / 234, 3);
  };

  // Calculate from ET (quarter mile time)
  const calculateFromET = () => {
    if (weight <= 0 || et <= 0) return 0;
    
    // HP = Weight / (ET/5.825)³
    return weight / Math.pow(et / 5.825, 3);
  };

  // Function to reset all values
  const handleReset = () => {
    setCylinders(4);
    setBore(0);
    setStroke(0);
    setVehicleWeight(0);
    setSpeed(0);
    setTime(0);
    setWeight(0);
    setEt(0);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    let result = `Engine Horsepower Calculation:\nMethod: ${method}\n\n`;
    
    if (method === 'displacement') {
      result += `Cylinders: ${cylinders}
Bore: ${bore} ${unit === 'imperial' ? 'in' : 'mm'}
Stroke: ${stroke} ${unit === 'imperial' ? 'in' : 'mm'}
Displacement: ${displacement.toFixed(2)} cu. in.
`;
    } else if (method === 'weight') {
      result += `Weight: ${vehicleWeight} ${unit === 'imperial' ? 'lbs' : 'kg'}
Speed: ${speed} ${unit === 'imperial' ? 'mph' : 'km/h'}
Time: ${time} seconds
`;
    } else {
      result += `Weight: ${weight} lbs
Quarter Mile ET: ${et} seconds
`;
    }
    
    result += `\nEstimated Horsepower: ${horsepower.toFixed(2)} HP`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Engine horsepower calculation copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Engine Horsepower Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Estimate engine horsepower using various calculation methods
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Cog className="mr-2 h-5 w-5" /> Engine Specifications
          </h2>
          
          <div className="space-y-6">
            {/* Method Selection */}
            <div>
              <Label htmlFor="method">Calculation Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="displacement">Engine Displacement</SelectItem>
                  <SelectItem value="weight">Weight & Speed</SelectItem>
                  <SelectItem value="et">Quarter Mile ET</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {method === 'displacement' && (
              <>
                <div>
                  <Label htmlFor="unit">Unit System</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imperial">Imperial (inches)</SelectItem>
                      <SelectItem value="metric">Metric (mm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cylinders">Number of Cylinders</Label>
                  <Input
                    id="cylinders"
                    type="number"
                    className="mt-1.5"
                    value={cylinders}
                    onChange={(e) => setCylinders(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="bore">Bore ({unit === 'imperial' ? 'inches' : 'mm'})</Label>
                  <div className="relative mt-1.5">
                    <Gauge className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="bore"
                      type="number"
                      step="0.01"
                      className="pl-10"
                      value={bore}
                      onChange={(e) => setBore(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="stroke">Stroke ({unit === 'imperial' ? 'inches' : 'mm'})</Label>
                  <div className="relative mt-1.5">
                    <Gauge className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="stroke"
                      type="number"
                      step="0.01"
                      className="pl-10"
                      value={stroke}
                      onChange={(e) => setStroke(Number(e.target.value))}
                    />
                  </div>
                </div>
              </>
            )}

            {method === 'weight' && (
              <>
                <div>
                  <Label htmlFor="unit">Unit System</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imperial">Imperial (lbs, mph)</SelectItem>
                      <SelectItem value="metric">Metric (kg, km/h)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="vehicleWeight">Vehicle Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</Label>
                  <Input
                    id="vehicleWeight"
                    type="number"
                    className="mt-1.5"
                    value={vehicleWeight}
                    onChange={(e) => setVehicleWeight(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="speed">Speed ({unit === 'imperial' ? 'mph' : 'km/h'})</Label>
                  <Input
                    id="speed"
                    type="number"
                    className="mt-1.5"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="time">Time to reach speed (seconds)</Label>
                  <Input
                    id="time"
                    type="number"
                    step="0.1"
                    className="mt-1.5"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                  />
                </div>
              </>
            )}

            {method === 'et' && (
              <>
                <div>
                  <Label htmlFor="weight">Vehicle Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    className="mt-1.5"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="et">Quarter Mile ET (seconds)</Label>
                  <Input
                    id="et"
                    type="number"
                    step="0.01"
                    className="mt-1.5"
                    value={et}
                    onChange={(e) => setEt(Number(e.target.value))}
                  />
                </div>
              </>
            )}

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
                  <h2 className="text-xl font-semibold">Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-6 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                      Estimated Horsepower
                    </h3>
                    <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                      {horsepower.toFixed(2)} HP
                    </div>
                  </div>
                  
                  {method === 'displacement' && displacement > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Engine Displacement
                      </h3>
                      <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {displacement.toFixed(2)} cu. in.
                      </div>
                      <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                        {(displacement * 16.387).toFixed(2)} cc
                      </div>
                    </div>
                  )}

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Note
                    </h3>
                    <p className="text-sm">
                      This is an estimated value. Actual horsepower depends on many factors including engine design, tuning, and condition.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Calculation Methods</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>Displacement:</strong> Based on engine size (conservative estimate)
              </p>
              <p>
                • <strong>Weight & Speed:</strong> Uses vehicle performance data
              </p>
              <p>
                • <strong>Quarter Mile ET:</strong> Based on drag racing performance
              </p>
              <p>
                • All methods provide estimates; dyno testing gives accurate results
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EngineHorsepowerCalculator;
