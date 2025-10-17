import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Scale, TrendingUp, Baby } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PregnancyWeightGainCalculator Component
 * 
 * Calculate recommended pregnancy weight gain based on pre-pregnancy BMI
 */
export function PregnancyWeightGainCalculator() {
  const { toast } = useToast();

  // State for input values
  const [height, setHeight] = useState<number>(165);
  const [preWeight, setPreWeight] = useState<number>(60);
  const [currentWeight, setCurrentWeight] = useState<number>(65);
  const [weeks, setWeeks] = useState<number>(20);
  const [unit, setUnit] = useState<string>('metric');
  
  // State for calculated results
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [minGain, setMinGain] = useState<number>(0);
  const [maxGain, setMaxGain] = useState<number>(0);
  const [currentGain, setCurrentGain] = useState<number>(0);
  const [status, setStatus] = useState<string>('');

  // Calculate weight gain when inputs change
  useEffect(() => {
    calculateWeightGain();
  }, [height, preWeight, currentWeight, weeks, unit]);

  // Function to calculate pregnancy weight gain recommendations
  const calculateWeightGain = () => {
    let heightCm: number, preWeightKg: number, currentWeightKg: number;

    if (unit === 'imperial') {
      heightCm = height * 2.54;
      preWeightKg = preWeight * 0.453592;
      currentWeightKg = currentWeight * 0.453592;
    } else {
      heightCm = height;
      preWeightKg = preWeight;
      currentWeightKg = currentWeight;
    }

    // Calculate BMI
    const heightM = heightCm / 100;
    const bmiValue = preWeightKg / (heightM * heightM);
    setBmi(bmiValue);

    // Determine weight gain recommendations based on BMI
    let minTotal: number, maxTotal: number, cat: string;

    if (bmiValue < 18.5) {
      cat = 'Underweight';
      minTotal = 12.5; // kg
      maxTotal = 18;
    } else if (bmiValue < 25) {
      cat = 'Normal weight';
      minTotal = 11.5;
      maxTotal = 16;
    } else if (bmiValue < 30) {
      cat = 'Overweight';
      minTotal = 7;
      maxTotal = 11.5;
    } else {
      cat = 'Obese';
      minTotal = 5;
      maxTotal = 9;
    }

    setCategory(cat);

    // Calculate recommended gain for current week
    // Most weight gain happens in 2nd and 3rd trimesters
    const progressRatio = weeks > 13 ? (weeks - 13) / 27 : 0;
    const minGainCurrent = minTotal * progressRatio;
    const maxGainCurrent = maxTotal * progressRatio;

    // Calculate current weight gain
    const gainKg = currentWeightKg - preWeightKg;
    const gainDisplay = unit === 'imperial' ? gainKg / 0.453592 : gainKg;
    setCurrentGain(gainDisplay);

    // Convert to display units
    const minDisplay = unit === 'imperial' ? minGainCurrent / 0.453592 : minGainCurrent;
    const maxDisplay = unit === 'imperial' ? maxGainCurrent / 0.453592 : maxGainCurrent;
    
    setMinGain(minDisplay);
    setMaxGain(maxDisplay);

    // Determine status
    if (gainDisplay < minDisplay - 1) {
      setStatus('below');
    } else if (gainDisplay > maxDisplay + 1) {
      setStatus('above');
    } else {
      setStatus('on-track');
    }
  };

  // Function to reset all values
  const handleReset = () => {
    setHeight(165);
    setPreWeight(60);
    setCurrentWeight(65);
    setWeeks(20);
    setUnit('metric');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const unitLabel = unit === 'metric' ? 'kg' : 'lbs';
    
    const result = `Pregnancy Weight Gain:
Pre-pregnancy BMI: ${bmi.toFixed(1)} (${category})
Weeks Pregnant: ${weeks}
Current Weight Gain: ${currentGain.toFixed(1)} ${unitLabel}
Recommended Range: ${minGain.toFixed(1)} - ${maxGain.toFixed(1)} ${unitLabel}
Status: ${status === 'on-track' ? 'On Track' : status === 'below' ? 'Below Range' : 'Above Range'}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pregnancy Weight Gain Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Track recommended weight gain during pregnancy based on your BMI
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Scale className="mr-2 h-5 w-5" /> Your Measurements
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
                  <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Height */}
            <div>
              <Label htmlFor="height">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <Input
                id="height"
                type="number"
                className="mt-1.5"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>

            {/* Pre-pregnancy Weight */}
            <div>
              <Label htmlFor="preweight">
                Pre-pregnancy Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </Label>
              <Input
                id="preweight"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={preWeight}
                onChange={(e) => setPreWeight(Number(e.target.value))}
              />
            </div>

            {/* Current Weight */}
            <div>
              <Label htmlFor="currentweight">
                Current Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </Label>
              <Input
                id="currentweight"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
              />
            </div>

            {/* Weeks Pregnant */}
            <div>
              <Label htmlFor="weeks">Weeks Pregnant</Label>
              <Input
                id="weeks"
                type="number"
                className="mt-1.5"
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[weeks]}
                max={40}
                min={1}
                step={1}
                onValueChange={(values) => setWeeks(values[0])}
              />
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
                  <h2 className="text-xl font-semibold">Weight Gain Progress</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Pre-pregnancy BMI</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {bmi.toFixed(1)}
                    </div>
                    <p className="text-sm mt-1">{category}</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Current Weight Gain
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {currentGain.toFixed(1)}
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {unit === 'metric' ? 'kg' : 'lbs'} gained
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    status === 'on-track' 
                      ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                      : status === 'below'
                      ? 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
                      : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                  }`}>
                    <h3 className="text-sm font-medium">Recommended Range (Week {weeks})</h3>
                    <div className={`mt-1 text-2xl font-bold ${
                      status === 'on-track' 
                        ? 'text-green-600 dark:text-green-400'
                        : status === 'below'
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {minGain.toFixed(1)} - {maxGain.toFixed(1)}
                    </div>
                    <p className="text-sm mt-1">
                      {unit === 'metric' ? 'kg' : 'lbs'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    status === 'on-track' 
                      ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                      : status === 'below'
                      ? 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200'
                      : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                  }`}>
                    <h3 className="text-sm font-medium flex items-center">
                      <Baby className="mr-2 h-4 w-4" />
                      Status
                    </h3>
                    <div className="mt-1 text-xl font-bold">
                      {status === 'on-track' ? 'On Track' : status === 'below' ? 'Below Range' : 'Above Range'}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Weight Gain Guidelines</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Underweight:</strong> 12.5-18 kg (28-40 lbs)</p>
              <p>• <strong>Normal weight:</strong> 11.5-16 kg (25-35 lbs)</p>
              <p>• <strong>Overweight:</strong> 7-11.5 kg (15-25 lbs)</p>
              <p>• <strong>Obese:</strong> 5-9 kg (11-20 lbs)</p>
              <p className="mt-2">Consult your healthcare provider for personalized advice</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PregnancyWeightGainCalculator;
