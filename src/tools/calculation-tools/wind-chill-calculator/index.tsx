import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Wind, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * WindChillCalculator Component
 * 
 * Calculates wind chill temperature based on air temperature and wind speed
 */
export function WindChillCalculator() {
  const [temperature, setTemperature] = useState<string>('30');
  const [windSpeed, setWindSpeed] = useState<string>('15');
  const [tempUnit, setTempUnit] = useState<string>('fahrenheit');
  const [speedUnit, setSpeedUnit] = useState<string>('mph');

  // Results
  const [windChill, setWindChill] = useState<number>(0);
  const [frostbiteTime, setFrostbiteTime] = useState<string>('');
  const [dangerLevel, setDangerLevel] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => {
    calculateWindChill();
  }, [temperature, windSpeed, tempUnit, speedUnit]);

  const calculateWindChill = () => {
    let temp = parseFloat(temperature) || 0;
    let wind = parseFloat(windSpeed) || 0;

    // Convert to Fahrenheit and mph for calculation
    if (tempUnit === 'celsius') {
      temp = (temp * 9/5) + 32;
    }
    if (speedUnit === 'kph') {
      wind = wind * 0.621371;
    } else if (speedUnit === 'ms') {
      wind = wind * 2.23694;
    }

    // Wind chill formula (only valid for temps ≤ 50°F and wind ≥ 3 mph)
    let wc = 0;
    if (temp <= 50 && wind >= 3) {
      // New wind chill formula: 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)
      wc = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(wind, 0.16)) + (0.4275 * temp * Math.pow(wind, 0.16));
    } else {
      wc = temp; // No wind chill effect
    }

    // Convert back to user's preferred unit
    if (tempUnit === 'celsius') {
      wc = (wc - 32) * 5/9;
    }

    setWindChill(wc);

    // Determine frostbite time and danger level
    const wcF = tempUnit === 'celsius' ? (wc * 9/5) + 32 : wc;
    
    if (wcF > 16) {
      setFrostbiteTime('Low risk');
      setDangerLevel('low');
    } else if (wcF >= -18) {
      setFrostbiteTime('30 minutes');
      setDangerLevel('moderate');
    } else if (wcF >= -35) {
      setFrostbiteTime('10 minutes');
      setDangerLevel('high');
    } else if (wcF >= -60) {
      setFrostbiteTime('5 minutes');
      setDangerLevel('very-high');
    } else {
      setFrostbiteTime('2 minutes');
      setDangerLevel('extreme');
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
      case 'low': return 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30';
      case 'moderate': return 'from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30';
      case 'high': return 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30';
      case 'very-high': return 'from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30';
      case 'extreme': return 'from-purple-50 to-fuchsia-50 dark:from-purple-950/30 dark:to-fuchsia-950/30';
      default: return 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30';
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Wind Chill Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate how cold it feels when factoring in wind speed
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
                placeholder="30"
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

            <div>
              <Label htmlFor="windSpeed">Wind Speed</Label>
              <Input
                id="windSpeed"
                type="number"
                value={windSpeed}
                onChange={(e) => setWindSpeed(e.target.value)}
                placeholder="15"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="speedUnit">Speed Unit</Label>
              <Select value={speedUnit} onValueChange={setSpeedUnit}>
                <SelectTrigger id="speedUnit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mph">Miles per hour (mph)</SelectItem>
                  <SelectItem value="kph">Kilometers per hour (km/h)</SelectItem>
                  <SelectItem value="ms">Meters per second (m/s)</SelectItem>
                </SelectContent>
              </Select>
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
              <Wind className="mr-2 h-5 w-5" /> Wind Chill Results
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className={`bg-gradient-to-r ${getDangerColor()} p-6 rounded-lg md:col-span-2`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Wind Chill Temperature</h3>
                    <div className="text-5xl font-bold">
                      {windChill.toFixed(1)}°{tempUnit === 'celsius' ? 'C' : 'F'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Feels like temperature
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${windChill.toFixed(1)}°${tempUnit === 'celsius' ? 'C' : 'F'}`, 'Wind Chill')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Frostbite Risk</h3>
                    <div className="text-2xl font-bold">
                      {frostbiteTime}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Time to frostbite on exposed skin
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(frostbiteTime, 'Frostbite Risk')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Danger Level</h3>
                    <div className="text-2xl font-bold capitalize">
                      {dangerLevel.replace('-', ' ')}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Exposure risk assessment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding Wind Chill</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is Wind Chill?</h3>
              <p className="text-muted-foreground text-sm">
                Wind chill is how cold it feels on exposed skin when wind speed is factored with actual air temperature.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Why It Matters</h3>
              <p className="text-muted-foreground text-sm">
                Wind increases heat loss from your body, making it feel colder than the actual air temperature. This affects frostbite risk.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Safety Tips</h3>
              <p className="text-muted-foreground text-sm">
                Dress in layers, cover exposed skin, and limit outdoor exposure when wind chill is below 0°F (-18°C).
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default WindChillCalculator;
