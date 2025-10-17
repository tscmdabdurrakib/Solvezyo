import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Timer, MapPin, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PaceCalculator Component
 * 
 * Calculate running/walking pace, time, and distance
 */
export function PaceCalculator() {
  const { toast } = useToast();

  const [calculationMode, setCalculationMode] = useState<string>('pace');
  const [distance, setDistance] = useState<number>(5);
  const [distanceUnit, setDistanceUnit] = useState<string>('km');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  
  // Results
  const [paceMinPerKm, setPaceMinPerKm] = useState<number>(0);
  const [paceSecPerKm, setPaceSecPerKm] = useState<number>(0);
  const [paceMinPerMile, setPaceMinPerMile] = useState<number>(0);
  const [paceSecPerMile, setPaceSecPerMile] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [speedMph, setSpeedMph] = useState<number>(0);

  useEffect(() => {
    calculatePace();
  }, [distance, distanceUnit, hours, minutes, seconds]);

  const calculatePace = () => {
    // Convert distance to km
    const distanceKm = distanceUnit === 'miles' ? distance * 1.60934 : distance;
    
    // Total time in seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    if (distanceKm > 0 && totalSeconds > 0) {
      // Calculate pace in seconds per km
      const paceSecondsPerKm = totalSeconds / distanceKm;
      const paceMin = Math.floor(paceSecondsPerKm / 60);
      const paceSec = Math.round(paceSecondsPerKm % 60);
      
      setPaceMinPerKm(paceMin);
      setPaceSecPerKm(paceSec);
      
      // Calculate pace per mile
      const paceSecondsPerMile = paceSecondsPerKm * 1.60934;
      const paceMinMile = Math.floor(paceSecondsPerMile / 60);
      const paceSecMile = Math.round(paceSecondsPerMile % 60);
      
      setPaceMinPerMile(paceMinMile);
      setPaceSecPerMile(paceSecMile);
      
      // Calculate speed in km/h
      const speedKmh = (distanceKm / totalSeconds) * 3600;
      setSpeed(speedKmh);
      
      // Calculate speed in mph
      const speedMph = speedKmh / 1.60934;
      setSpeedMph(speedMph);
    }
  };

  const handleReset = () => {
    setDistance(5);
    setDistanceUnit('km');
    setHours(0);
    setMinutes(25);
    setSeconds(0);
  };

  const copyToClipboard = () => {
    const result = `Pace Calculation:
Distance: ${distance} ${distanceUnit}
Time: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}

Pace:
${paceMinPerKm}:${paceSecPerKm.toString().padStart(2, '0')} min/km
${paceMinPerMile}:${paceSecPerMile.toString().padStart(2, '0')} min/mile

Speed:
${speed.toFixed(2)} km/h
${speedMph.toFixed(2)} mph`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pace Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate running or walking pace, speed, and time
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Timer className="mr-2 h-5 w-5" /> Input Values
          </h2>
          
          <div className="space-y-6">
            {/* Distance */}
            <div>
              <Label htmlFor="distance">Distance</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  className="flex-1"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                />
                <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">km</SelectItem>
                    <SelectItem value="miles">miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time */}
            <div>
              <Label>Time</Label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                <div>
                  <Label htmlFor="hours" className="text-xs text-muted-foreground">Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="minutes" className="text-xs text-muted-foreground">Minutes</Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="seconds" className="text-xs text-muted-foreground">Seconds</Label>
                  <Input
                    id="seconds"
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

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
                  <h2 className="text-xl font-semibold">Your Pace</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 flex items-center">
                      <Gauge className="mr-2 h-4 w-4" />
                      Pace per Kilometer
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {paceMinPerKm}:{paceSecPerKm.toString().padStart(2, '0')}
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      min/km
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200 flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Pace per Mile
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-green-600 dark:text-green-400">
                      {paceMinPerMile}:{paceSecPerMile.toString().padStart(2, '0')}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      min/mile
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Speed (km/h)</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {speed.toFixed(2)}
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Speed (mph)</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {speedMph.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Pace Guidelines</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Walking:</strong> 15-20 min/mile (9-12 min/km)</p>
              <p>• <strong>Jogging:</strong> 12-15 min/mile (7.5-9 min/km)</p>
              <p>• <strong>Running:</strong> 8-12 min/mile (5-7.5 min/km)</p>
              <p>• <strong>Fast Running:</strong> 6-8 min/mile (3.7-5 min/km)</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PaceCalculator;
