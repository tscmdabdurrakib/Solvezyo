import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Thermometer, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * HeatIndexCalculator Component
 * 
 * Calculates heat index (feels-like temperature) based on temperature and humidity
 */
export function HeatIndexCalculator() {
  const [temperature, setTemperature] = useState<string>('90');
  const [humidity, setHumidity] = useState<string>('60');
  const [tempUnit, setTempUnit] = useState<string>('fahrenheit');

  // Results
  const [heatIndex, setHeatIndex] = useState<number>(0);
  const [dangerLevel, setDangerLevel] = useState<string>('');
  const [warning, setWarning] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => {
    calculateHeatIndex();
  }, [temperature, humidity, tempUnit]);

  const calculateHeatIndex = () => {
    let temp = parseFloat(temperature) || 0;
    const rh = parseFloat(humidity) || 0;

    // Convert to Fahrenheit for calculation
    if (tempUnit === 'celsius') {
      temp = (temp * 9/5) + 32;
    }

    let hi = 0;

    // Heat index formula (Rothfusz regression)
    // Only valid for temp ≥ 80°F and RH ≥ 40%
    if (temp >= 80) {
      hi = -42.379 
        + (2.04901523 * temp) 
        + (10.14333127 * rh) 
        - (0.22475541 * temp * rh) 
        - (0.00683783 * temp * temp) 
        - (0.05481717 * rh * rh) 
        + (0.00122874 * temp * temp * rh) 
        + (0.00085282 * temp * rh * rh) 
        - (0.00000199 * temp * temp * rh * rh);

      // Adjustments for extreme conditions
      if (rh < 13 && temp >= 80 && temp <= 112) {
        hi -= ((13 - rh) / 4) * Math.sqrt((17 - Math.abs(temp - 95)) / 17);
      } else if (rh > 85 && temp >= 80 && temp <= 87) {
        hi += ((rh - 85) / 10) * ((87 - temp) / 5);
      }
    } else {
      // Simple approximation for lower temps
      hi = temp;
    }

    // Convert back to user's preferred unit
    if (tempUnit === 'celsius') {
      hi = (hi - 32) * 5/9;
    }

    setHeatIndex(hi);

    // Determine danger level (based on Fahrenheit)
    const hiF = tempUnit === 'celsius' ? (hi * 9/5) + 32 : hi;
    
    if (hiF < 80) {
      setDangerLevel('safe');
      setWarning('Normal conditions');
    } else if (hiF < 90) {
      setDangerLevel('caution');
      setWarning('Fatigue possible with prolonged exposure');
    } else if (hiF < 103) {
      setDangerLevel('extreme-caution');
      setWarning('Heat cramps and heat exhaustion possible');
    } else if (hiF < 125) {
      setDangerLevel('danger');
      setWarning('Heat cramps and heat exhaustion likely. Heat stroke possible');
    } else {
      setDangerLevel('extreme-danger');
      setWarning('Heat stroke highly likely with continued exposure');
    }
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const getDangerColor = () => {
    switch (dangerLevel) {
      case 'safe': return 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30';
      case 'caution': return 'from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30';
      case 'extreme-caution': return 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30';
      case 'danger': return 'from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30';
      case 'extreme-danger': return 'from-purple-50 to-fuchsia-50 dark:from-purple-950/30 dark:to-fuchsia-950/30';
      default: return 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30';
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Heat Index Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate how hot it feels when humidity is factored with temperature
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Thermometer className="mr-2 h-5 w-5" /> Weather Conditions
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="temperature">Air Temperature</Label>
              <Input
                id="temperature"
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="90"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="tempUnit">Temperature Unit</Label>
              <Select value={tempUnit} onValueChange={setTempUnit}>
                <SelectTrigger id="tempUnit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="humidity">Relative Humidity (%)</Label>
              <Input
                id="humidity"
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                placeholder="60"
                min="0"
                max="100"
                className="mt-2"
              />
              <div className="mt-2 text-xs text-muted-foreground">
                Current value: {humidity}%
              </div>
            </div>
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
              <Droplets className="mr-2 h-5 w-5" /> Heat Index Results
            </h2>
            
            <div className="grid gap-4">
              <div className={`bg-gradient-to-r ${getDangerColor()} p-6 rounded-lg`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Heat Index</h3>
                    <div className="text-5xl font-bold">
                      {heatIndex.toFixed(1)}°{tempUnit === 'celsius' ? 'C' : 'F'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Feels like temperature
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${heatIndex.toFixed(1)}°${tempUnit === 'celsius' ? 'C' : 'F'}`, 'Heat Index')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Danger Level</h3>
                      <div className="text-2xl font-bold capitalize">
                        {dangerLevel.replace('-', ' ')}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Heat exposure risk
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Health Warning</h3>
                      <div className="text-sm font-medium mt-2">
                        {warning}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(warning, 'Health Warning')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding Heat Index</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is Heat Index?</h3>
              <p className="text-muted-foreground text-sm">
                Heat index combines air temperature and relative humidity to determine how hot it actually feels to the human body.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Why Humidity Matters</h3>
              <p className="text-muted-foreground text-sm">
                High humidity prevents sweat from evaporating efficiently, making it harder for your body to cool down.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Safety Precautions</h3>
              <p className="text-muted-foreground text-sm">
                Stay hydrated, take frequent breaks in shade or AC, wear light clothing, and avoid strenuous activity during peak heat.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HeatIndexCalculator;
