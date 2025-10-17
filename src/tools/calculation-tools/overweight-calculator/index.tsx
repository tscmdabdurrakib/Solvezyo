import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Scale, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * OverweightCalculator Component
 * 
 * Calculate BMI and determine if someone is overweight, plus provide weight loss goals
 */
export function OverweightCalculator() {
  const { toast } = useToast();

  // State for input values
  const [weight, setWeight] = useState<number>(85);
  const [height, setHeight] = useState<number>(170);
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<string>('male');
  const [unit, setUnit] = useState<string>('metric');
  
  // State for calculated results
  const [bmi, setBmi] = useState<number>(0);
  const [isOverweight, setIsOverweight] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('');
  const [excessWeight, setExcessWeight] = useState<number>(0);
  const [targetWeight, setTargetWeight] = useState<number>(0);
  const [healthyWeightMax, setHealthyWeightMax] = useState<number>(0);

  // Calculate results when inputs change
  useEffect(() => {
    calculateOverweight();
  }, [weight, height, age, gender, unit]);

  // Function to get BMI category
  const getBMICategory = (bmiValue: number): { category: string; color: string; overweight: boolean } => {
    if (bmiValue < 18.5) {
      return { category: 'Underweight', color: 'blue', overweight: false };
    } else if (bmiValue < 25) {
      return { category: 'Normal Weight', color: 'green', overweight: false };
    } else if (bmiValue < 30) {
      return { category: 'Overweight', color: 'orange', overweight: true };
    } else if (bmiValue < 35) {
      return { category: 'Obese Class I', color: 'red', overweight: true };
    } else if (bmiValue < 40) {
      return { category: 'Obese Class II', color: 'darkred', overweight: true };
    } else {
      return { category: 'Obese Class III', color: 'darkred', overweight: true };
    }
  };

  // Function to calculate overweight status
  const calculateOverweight = () => {
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

    // Upper limit of healthy weight (BMI = 24.9)
    const maxHealthyWeight = 24.9 * (heightInMeters * heightInMeters);
    
    // Target weight (middle of healthy range, BMI = 21.5)
    const idealWeight = 21.5 * (heightInMeters * heightInMeters);

    // Convert back to display units if imperial
    const maxWeight = unit === 'imperial' ? maxHealthyWeight / 0.453592 : maxHealthyWeight;
    const targetWt = unit === 'imperial' ? idealWeight / 0.453592 : idealWeight;

    // Calculate excess weight
    const excess = Math.max(0, weightInKg - maxHealthyWeight);
    const excessDisplay = unit === 'imperial' ? excess / 0.453592 : excess;

    const { category: cat, color, overweight } = getBMICategory(bmiValue);
    
    setBmi(bmiValue);
    setCategory(cat);
    setCategoryColor(color);
    setIsOverweight(overweight);
    setExcessWeight(excessDisplay);
    setTargetWeight(targetWt);
    setHealthyWeightMax(maxWeight);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(85);
    setHeight(170);
    setAge(35);
    setGender('male');
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
      case 'darkred':
        return 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100';
      default:
        return 'bg-muted/50';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const unitLabel = unit === 'metric' ? 'kg' : 'lbs';
    const heightLabel = unit === 'metric' ? 'cm' : 'inches';
    
    const result = `Overweight Assessment:
Weight: ${weight} ${unitLabel}
Height: ${height} ${heightLabel}
Age: ${age}
Gender: ${gender}

BMI: ${bmi.toFixed(1)}
Category: ${category}
Overweight: ${isOverweight ? 'Yes' : 'No'}

${isOverweight ? `Excess Weight: ${excessWeight.toFixed(1)} ${unitLabel}
Target Weight: ${targetWeight.toFixed(1)} ${unitLabel}
Max Healthy Weight: ${healthyWeightMax.toFixed(1)} ${unitLabel}` : 'You are within or below healthy weight range'}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Assessment copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Overweight Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Determine if you're overweight and calculate weight loss goals
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" /> Your Information
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

            {/* Age */}
            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                className="mt-1.5"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
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
            </div>

            {/* Height */}
            <div>
              <Label htmlFor="height">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
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
                  <h2 className="text-xl font-semibold">Assessment Results</h2>
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
                    <div className="mt-1 text-2xl font-bold">
                      {category}
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${isOverweight ? 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800' : 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'}`}>
                    <h3 className="text-sm font-medium">Overweight Status</h3>
                    <div className={`mt-1 text-3xl font-bold ${isOverweight ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                      {isOverweight ? 'Yes' : 'No'}
                    </div>
                  </div>

                  {isOverweight && (
                    <>
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                          Excess Weight
                        </h3>
                        <div className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                          {excessWeight.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </div>
                        <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                          Above healthy weight range
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Target Weight Goal
                        </h3>
                        <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {targetWeight.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </div>
                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                          Middle of healthy BMI range
                        </p>
                      </div>
                    </>
                  )}

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Healthy Weight Range
                    </h3>
                    <p className="text-lg font-bold">
                      Up to {healthyWeightMax.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      BMI 18.5 - 24.9
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Weight Management Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Aim for gradual weight loss of 1-2 lbs (0.5-1 kg) per week
              </p>
              <p>
                • Combine healthy eating with regular physical activity
              </p>
              <p>
                • Focus on sustainable lifestyle changes, not quick fixes
              </p>
              <p>
                • Consult healthcare professionals for personalized advice
              </p>
              <p>
                • BMI is a screening tool - doesn't account for muscle mass
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OverweightCalculator;
