import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Activity, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BMICalculator Component
 * 
 * Calculate Body Mass Index (BMI) and weight category
 */
export function BMICalculator() {
  const { toast } = useToast();

  // State for input values
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [unit, setUnit] = useState<string>('metric');
  
  // State for calculated results
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('');
  const [healthyWeightMin, setHealthyWeightMin] = useState<number>(0);
  const [healthyWeightMax, setHealthyWeightMax] = useState<number>(0);

  // Calculate BMI when inputs change
  useEffect(() => {
    calculateBMI();
  }, [weight, height, unit]);

  // Function to get BMI category
  const getBMICategory = (bmiValue: number): { category: string; color: string } => {
    if (bmiValue < 18.5) {
      return { category: 'Underweight', color: 'blue' };
    } else if (bmiValue < 25) {
      return { category: 'Normal weight', color: 'green' };
    } else if (bmiValue < 30) {
      return { category: 'Overweight', color: 'orange' };
    } else {
      return { category: 'Obese', color: 'red' };
    }
  };

  // Function to calculate BMI
  const calculateBMI = () => {
    let bmiValue: number;
    let heightInMeters: number;
    let weightInKg: number;

    if (unit === 'imperial') {
      // Convert pounds to kg and inches to meters
      weightInKg = weight * 0.453592;
      heightInMeters = height * 0.0254;
    } else {
      // Metric: weight in kg, height in cm
      weightInKg = weight;
      heightInMeters = height / 100;
    }

    // BMI = weight (kg) / (height (m))^2
    bmiValue = weightInKg / (heightInMeters * heightInMeters);

    // Calculate healthy weight range
    const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyWeight = 24.9 * (heightInMeters * heightInMeters);

    // Convert back to display units if imperial
    const minWeight = unit === 'imperial' ? minHealthyWeight / 0.453592 : minHealthyWeight;
    const maxWeight = unit === 'imperial' ? maxHealthyWeight / 0.453592 : maxHealthyWeight;

    const { category: cat, color } = getBMICategory(bmiValue);
    
    setBmi(bmiValue);
    setCategory(cat);
    setCategoryColor(color);
    setHealthyWeightMin(minWeight);
    setHealthyWeightMax(maxWeight);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(70);
    setHeight(170);
    setUnit('metric');
  };

  // Get category background color classes
  const getCategoryColorClasses = () => {
    switch (categoryColor) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      case 'green':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200';
      case 'red':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      default:
        return 'bg-muted/50';
    }
  };

  const getCategoryTextColor = () => {
    switch (categoryColor) {
      case 'blue': return 'text-blue-600 dark:text-blue-400';
      case 'green': return 'text-green-600 dark:text-green-400';
      case 'orange': return 'text-orange-600 dark:text-orange-400';
      case 'red': return 'text-red-600 dark:text-red-400';
      default: return '';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const unitLabel = unit === 'metric' ? 'kg' : 'lbs';
    const heightLabel = unit === 'metric' ? 'cm' : 'inches';
    
    const result = `BMI Calculation:
Weight: ${weight} ${unitLabel}
Height: ${height} ${heightLabel}
BMI: ${bmi.toFixed(1)}
Category: ${category}
Healthy Weight Range: ${healthyWeightMin.toFixed(1)} - ${healthyWeightMax.toFixed(1)} ${unitLabel}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">BMI Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your Body Mass Index and assess your weight category
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" /> Your Measurements
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

            {/* Weight */}
            <div>
              <Label htmlFor="weight">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </Label>
              <div className="relative mt-1.5">
                <Scale className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[weight]}
                max={unit === 'metric' ? 200 : 440}
                step={unit === 'metric' ? 1 : 1}
                onValueChange={(values) => setWeight(values[0])}
              />
            </div>

            {/* Height */}
            <div>
              <Label htmlFor="height">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <div className="relative mt-1.5">
                <Activity className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[height]}
                max={unit === 'metric' ? 250 : 100}
                step={1}
                onValueChange={(values) => setHeight(values[0])}
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
                  <h2 className="text-xl font-semibold">Your BMI Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      Your BMI
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {bmi.toFixed(1)}
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${getCategoryColorClasses()}`}>
                    <h3 className="text-sm font-medium">Weight Category</h3>
                    <div className={`mt-1 text-2xl font-bold ${getCategoryTextColor()}`}>
                      {category}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Healthy Weight Range</h3>
                    <div className="mt-1 text-xl font-bold">
                      {healthyWeightMin.toFixed(1)} - {healthyWeightMax.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-100 via-green-100 via-orange-100 to-red-100 dark:from-blue-900 dark:via-green-900 dark:via-orange-900 dark:to-red-900 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">BMI Scale</h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>&lt; 18.5</span>
                        <span>Underweight</span>
                      </div>
                      <div className="flex justify-between">
                        <span>18.5 - 24.9</span>
                        <span>Normal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>25 - 29.9</span>
                        <span>Overweight</span>
                      </div>
                      <div className="flex justify-between">
                        <span>≥ 30</span>
                        <span>Obese</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About BMI</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • BMI is a screening tool to categorize weight status
              </p>
              <p>
                • It doesn't measure body fat directly or account for muscle mass
              </p>
              <p>
                • BMI may not be accurate for athletes, elderly, or pregnant women
              </p>
              <p>
                • Consult a healthcare provider for personalized health advice
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;
