import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Droplets, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * DewPointCalculator Component
 * 
 * Calculates dew point temperature from air temperature and relative humidity
 */
export function DewPointCalculator() {
  const [temperature, setTemperature] = useState<string>('75');
  const [humidity, setHumidity] = useState<string>('65');
  const [tempUnit, setTempUnit] = useState<string>('fahrenheit');

  // Results
  const [dewPoint, setDewPoint] = useState<number>(0);
  const [comfortLevel, setComfortLevel] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => {
    calculateDewPoint();
  }, [temperature, humidity, tempUnit]);

  const calculateDewPoint = () => {
    let temp = parseFloat(temperature) || 0;
    const rh = parseFloat(humidity) || 0;

    // Convert to Celsius for calculation
    let tempC = temp;
    if (tempUnit === 'fahrenheit') {
      tempC = (temp - 32) * 5/9;
    }

    // Magnus formula for dew point calculation
    // Constants: a = 17.27, b = 237.7
    const a = 17.27;
    const b = 237.7;
    
    // Calculate alpha = ln(RH/100) + (a*T)/(b+T)
    const alpha = Math.log(rh / 100) + (a * tempC) / (b + tempC);
    
    // Dew point in Celsius = (b * alpha) / (a - alpha)
    const dewPointC = (b * alpha) / (a - alpha);

    // Convert back to user's preferred unit
    let dp = dewPointC;
    if (tempUnit === 'fahrenheit') {
      dp = (dewPointC * 9/5) + 32;
    }

    setDewPoint(dp);

    // Determine comfort level (based on Fahrenheit dew point)
    const dpF = tempUnit === 'celsius' ? (dewPointC * 9/5) + 32 : dp;
    
    if (dpF < 50) {
      setComfortLevel('Dry');
      setDescription('Air feels dry and comfortable');
    } else if (dpF < 60) {
      setComfortLevel('Comfortable');
      setDescription('Most people find this comfortable');
    } else if (dpF < 65) {
      setComfortLevel('Slightly Humid');
      setDescription('Slightly uncomfortable for some');
    } else if (dpF < 70) {
      setComfortLevel('Humid');
      setDescription('Somewhat uncomfortable, sticky feeling');
    } else if (dpF < 75) {
      setComfortLevel('Very Humid');
      setDescription('Quite uncomfortable, oppressive');
    } else {
      setComfortLevel('Extremely Humid');
      setDescription('Extremely uncomfortable, oppressive and miserable');
    }
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const getComfortColor = () => {
    switch (comfortLevel) {
      case 'Dry': return 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30';
      case 'Comfortable': return 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30';
      case 'Slightly Humid': return 'from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30';
      case 'Humid': return 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30';
      case 'Very Humid': return 'from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30';
      case 'Extremely Humid': return 'from-purple-50 to-fuchsia-50 dark:from-purple-950/30 dark:to-fuchsia-950/30';
      default: return 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30';
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Dew Point Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate dew point temperature and humidity comfort level
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CloudRain className="mr-2 h-5 w-5" /> Weather Conditions
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="temperature">Air Temperature</Label>
              <Input
                id="temperature"
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="75"
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
                placeholder="65"
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
              <Droplets className="mr-2 h-5 w-5" /> Dew Point Results
            </h2>
            
            <div className="grid gap-4">
              <div className={`bg-gradient-to-r ${getComfortColor()} p-6 rounded-lg`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Dew Point Temperature</h3>
                    <div className="text-5xl font-bold">
                      {dewPoint.toFixed(1)}°{tempUnit === 'celsius' ? 'C' : 'F'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Temperature at which water vapor condenses
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${dewPoint.toFixed(1)}°${tempUnit === 'celsius' ? 'C' : 'F'}`, 'Dew Point')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Comfort Level</h3>
                      <div className="text-2xl font-bold">
                        {comfortLevel}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Perceived comfort
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                      <div className="text-sm font-medium mt-2">
                        {description}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(description, 'Description')}
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
          <h2 className="text-xl font-semibold mb-4">Understanding Dew Point</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is Dew Point?</h3>
              <p className="text-muted-foreground text-sm">
                Dew point is the temperature at which air becomes saturated with moisture and water vapor begins to condense into dew.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Why It's Important</h3>
              <p className="text-muted-foreground text-sm">
                Dew point is a better indicator of comfort than relative humidity because it doesn't change with temperature.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Comfort Guide</h3>
              <p className="text-muted-foreground text-sm">
                Below 60°F is comfortable, 60-69°F is acceptable, and above 70°F becomes increasingly uncomfortable and muggy.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DewPointCalculator;
