import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Wine, AlertTriangle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BACCalculator Component
 * 
 * Calculate Blood Alcohol Content (BAC) based on drinks consumed
 * Uses the Widmark formula
 */
export function BACCalculator() {
  const { toast } = useToast();

  // State for input values
  const [weight, setWeight] = useState<number>(70);
  const [gender, setGender] = useState<string>('male');
  const [drinks, setDrinks] = useState<number>(2);
  const [hours, setHours] = useState<number>(2);
  const [unit, setUnit] = useState<string>('metric');
  
  // State for calculated results
  const [bac, setBac] = useState<number>(0);
  const [level, setLevel] = useState<string>('');
  const [levelColor, setLevelColor] = useState<string>('');
  const [effects, setEffects] = useState<string[]>([]);
  const [soberTime, setSoberTime] = useState<number>(0);

  // Calculate BAC when inputs change
  useEffect(() => {
    calculateBAC();
  }, [weight, gender, drinks, hours, unit]);

  // Function to get BAC level and effects
  const getBACLevel = (bacValue: number): { level: string; color: string; effects: string[] } => {
    if (bacValue < 0.02) {
      return {
        level: 'Sober',
        color: 'green',
        effects: ['No noticeable effects', 'Safe to drive']
      };
    } else if (bacValue < 0.05) {
      return {
        level: 'Light Impairment',
        color: 'yellow',
        effects: ['Relaxed feeling', 'Slight body warmth', 'Minor impairment of reasoning']
      };
    } else if (bacValue < 0.08) {
      return {
        level: 'Moderate Impairment',
        color: 'orange',
        effects: ['Lowered inhibitions', 'Reduced coordination', 'Impaired judgment', 'May be illegal to drive']
      };
    } else if (bacValue < 0.15) {
      return {
        level: 'Severe Impairment',
        color: 'red',
        effects: ['Significant motor impairment', 'Loss of balance', 'Blurred vision', 'Illegal to drive everywhere']
      };
    } else if (bacValue < 0.30) {
      return {
        level: 'Very Severe Impairment',
        color: 'darkred',
        effects: ['Severe intoxication', 'Risk of blackout', 'Vomiting', 'Possible loss of consciousness']
      };
    } else {
      return {
        level: 'Potentially Fatal',
        color: 'black',
        effects: ['Risk of coma', 'Life-threatening', 'Medical emergency', 'Seek immediate help']
      };
    }
  };

  // Function to calculate BAC using Widmark formula
  const calculateBAC = () => {
    let weightKg = weight;
    
    // Convert to kg if imperial
    if (unit === 'imperial') {
      weightKg = weight * 0.453592;
    }

    // Standard drink = 14g of pure alcohol
    const alcoholGrams = drinks * 14;
    
    // Widmark factor (r) varies by gender
    // Male: 0.68, Female: 0.55
    const r = gender === 'male' ? 0.68 : 0.55;
    
    // Widmark formula: BAC = (A / (r × W)) - (0.015 × H)
    // A = alcohol consumed in grams
    // r = gender constant
    // W = weight in kg
    // H = hours since drinking started
    // 0.015 = alcohol metabolism rate per hour
    
    const bacValue = (alcoholGrams / (r * weightKg)) - (0.015 * hours);
    
    // BAC cannot be negative
    const finalBAC = Math.max(0, bacValue);
    
    const { level: bacLevel, color, effects: bacEffects } = getBACLevel(finalBAC);
    
    setBac(finalBAC);
    setLevel(bacLevel);
    setLevelColor(color);
    setEffects(bacEffects);
    
    // Calculate time until sober (BAC = 0)
    // At 0.015 per hour metabolism rate
    const hoursToSober = finalBAC / 0.015;
    setSoberTime(hoursToSober);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(70);
    setGender('male');
    setDrinks(2);
    setHours(2);
    setUnit('metric');
  };

  // Get level background color classes
  const getLevelColorClasses = () => {
    switch (levelColor) {
      case 'green':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      case 'yellow':
        return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200';
      case 'red':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'darkred':
        return 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100';
      case 'black':
        return 'bg-gray-900 dark:bg-gray-100 border-gray-950 dark:border-gray-50 text-white dark:text-gray-900';
      default:
        return 'bg-muted/50';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `BAC Calculation:
Weight: ${weight} ${unit === 'metric' ? 'kg' : 'lbs'}
Gender: ${gender}
Drinks Consumed: ${drinks}
Hours Since First Drink: ${hours}

BAC: ${(bac * 100).toFixed(3)}%
Level: ${level}
Time Until Sober: ${soberTime.toFixed(1)} hours

Effects:
${effects.map(e => `• ${e}`).join('\n')}

⚠️ Do not drive if BAC > 0. This is an estimate only.`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "BAC results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">BAC Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Estimate your Blood Alcohol Content based on drinks consumed
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wine className="mr-2 h-5 w-5" /> Consumption Details
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
                  <SelectItem value="metric">Metric (kg)</SelectItem>
                  <SelectItem value="imperial">Imperial (lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Weight */}
            <div>
              <Label htmlFor="weight">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>

            {/* Number of Drinks */}
            <div>
              <Label htmlFor="drinks">Number of Standard Drinks</Label>
              <div className="relative mt-1.5">
                <Wine className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="drinks"
                  type="number"
                  step="0.5"
                  className="pl-10"
                  value={drinks}
                  onChange={(e) => setDrinks(Number(e.target.value))}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                1 standard drink = 12oz beer, 5oz wine, or 1.5oz spirits
              </p>
            </div>

            {/* Hours Since First Drink */}
            <div>
              <Label htmlFor="hours">Hours Since First Drink</Label>
              <div className="relative mt-1.5">
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="hours"
                  type="number"
                  step="0.25"
                  className="pl-10"
                  value={hours}
                  min={0}
                  onChange={(e) => setHours(Number(e.target.value))}
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
                  <h2 className="text-xl font-semibold">BAC Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      Blood Alcohol Content
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {(bac * 100).toFixed(3)}%
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                      {bac.toFixed(4)} g/dL
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${getLevelColorClasses()}`}>
                    <h3 className="text-sm font-medium">Impairment Level</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {level}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Expected Effects
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {effects.map((effect, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Time Until Sober
                    </h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {soberTime.toFixed(1)} hours
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-amber-800 dark:text-amber-200">
                        <p className="font-semibold mb-1">Warning:</p>
                        <p>This is an estimate only. Never drink and drive. Individual results vary significantly.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About BAC</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Legal limit for driving in most US states: 0.08%
              </p>
              <p>
                • Body metabolizes alcohol at ~0.015% per hour
              </p>
              <p>
                • Factors affecting BAC: weight, gender, food, medications
              </p>
              <p>
                • This calculator uses the Widmark formula for estimation
              </p>
              <p>
                • Results vary by individual - use as a guideline only
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BACCalculator;
