import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * SpeedCalculator Component
 * 
 * Calculates speed from distance and time, or finds missing values
 */
export function SpeedCalculator() {
  const [distance, setDistance] = useState<string>('100');
  const [time, setTime] = useState<string>('2');
  const [distanceUnit, setDistanceUnit] = useState<string>('km');
  const [timeUnit, setTimeUnit] = useState<string>('hours');
  const [speedUnit, setSpeedUnit] = useState<string>('km/h');
  const [calculatedSpeed, setCalculatedSpeed] = useState<number>(0);
  const [speedInOtherUnits, setSpeedInOtherUnits] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();

  // Calculate speed when inputs change
  useEffect(() => {
    calculateSpeed();
  }, [distance, time, distanceUnit, timeUnit, speedUnit]);

  // Function to convert distance to meters
  const convertDistanceToMeters = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'm': 1,
      'km': 1000,
      'cm': 0.01,
      'mm': 0.001,
      'mi': 1609.34,
      'yd': 0.9144,
      'ft': 0.3048,
      'in': 0.0254,
    };
    return value * conversions[unit];
  };

  // Function to convert time to seconds
  const convertTimeToSeconds = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'seconds': 1,
      'minutes': 60,
      'hours': 3600,
      'days': 86400,
    };
    return value * conversions[unit];
  };

  // Function to convert speed from m/s to target unit
  const convertSpeedFromMPS = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'm/s': 1,
      'km/h': 3.6,
      'mph': 2.23694,
      'ft/s': 3.28084,
      'knots': 1.94384,
    };
    return value * conversions[unit];
  };

  // Function to calculate speed
  const calculateSpeed = () => {
    const d = parseFloat(distance);
    const t = parseFloat(time);

    if (isNaN(d) || isNaN(t) || t === 0) {
      setCalculatedSpeed(0);
      setSpeedInOtherUnits({});
      return;
    }

    // Convert to base units (meters and seconds)
    const distanceInMeters = convertDistanceToMeters(d, distanceUnit);
    const timeInSeconds = convertTimeToSeconds(t, timeUnit);

    // Calculate speed in m/s: speed = distance / time
    const speedInMPS = distanceInMeters / timeInSeconds;

    // Convert to desired unit
    const finalSpeed = convertSpeedFromMPS(speedInMPS, speedUnit);
    setCalculatedSpeed(finalSpeed);

    // Calculate speed in other common units
    setSpeedInOtherUnits({
      'km/h': convertSpeedFromMPS(speedInMPS, 'km/h'),
      'mph': convertSpeedFromMPS(speedInMPS, 'mph'),
      'm/s': speedInMPS,
      'ft/s': convertSpeedFromMPS(speedInMPS, 'ft/s'),
      'knots': convertSpeedFromMPS(speedInMPS, 'knots'),
    });
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
    setDistance('100');
    setTime('2');
    setDistanceUnit('km');
    setTimeUnit('hours');
    setSpeedUnit('km/h');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Speed Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate speed from distance and time (Speed = Distance / Time)
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Gauge className="mr-2 h-5 w-5" /> Input Values
          </h2>
          
          <div className="space-y-4">
            {/* Distance */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label htmlFor="distance">Distance</Label>
                <Input
                  id="distance"
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="Enter distance"
                  className="mt-2"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="distanceUnit">Unit</Label>
                <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Meters (m)</SelectItem>
                    <SelectItem value="km">Kilometers (km)</SelectItem>
                    <SelectItem value="cm">Centimeters (cm)</SelectItem>
                    <SelectItem value="mm">Millimeters (mm)</SelectItem>
                    <SelectItem value="mi">Miles (mi)</SelectItem>
                    <SelectItem value="yd">Yards (yd)</SelectItem>
                    <SelectItem value="ft">Feet (ft)</SelectItem>
                    <SelectItem value="in">Inches (in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Enter time"
                  className="mt-2"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="timeUnit">Unit</Label>
                <Select value={timeUnit} onValueChange={setTimeUnit}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">Seconds</SelectItem>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Speed Unit Selection */}
            <div>
              <Label htmlFor="speedUnit">Speed Unit</Label>
              <Select value={speedUnit} onValueChange={setSpeedUnit}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m/s">Meters/second (m/s)</SelectItem>
                  <SelectItem value="km/h">Kilometers/hour (km/h)</SelectItem>
                  <SelectItem value="mph">Miles/hour (mph)</SelectItem>
                  <SelectItem value="ft/s">Feet/second (ft/s)</SelectItem>
                  <SelectItem value="knots">Knots</SelectItem>
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
              <Gauge className="mr-2 h-5 w-5" /> Calculation Results
            </h2>
            
            {/* Speed Result */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Speed</h3>
                  <div className="text-4xl font-bold">
                    {calculatedSpeed.toFixed(4)} {speedUnit}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Formula: v = d / t
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(calculatedSpeed.toFixed(4), 'Speed')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Speed in Other Units */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">km/h</h3>
                <div className="text-xl font-bold">
                  {speedInOtherUnits['km/h']?.toFixed(2) || '0.00'}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">mph</h3>
                <div className="text-xl font-bold">
                  {speedInOtherUnits['mph']?.toFixed(2) || '0.00'}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">m/s</h3>
                <div className="text-xl font-bold">
                  {speedInOtherUnits['m/s']?.toFixed(2) || '0.00'}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Knots</h3>
                <div className="text-xl font-bold">
                  {speedInOtherUnits['knots']?.toFixed(2) || '0.00'}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Speed Calculation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Formula</h3>
              <p className="text-muted-foreground text-sm">
                Speed (v) = Distance (d) / Time (t). It measures how fast an object is moving.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Multiple Units</h3>
              <p className="text-muted-foreground text-sm">
                See your speed in km/h, mph, m/s, and knots for different applications and regions.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in transportation, sports, physics, and everyday scenarios to measure velocity.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SpeedCalculator;
