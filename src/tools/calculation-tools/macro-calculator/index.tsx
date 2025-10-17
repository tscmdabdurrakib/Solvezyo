import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Target, PieChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * MacroCalculator Component
 * 
 * Calculate macronutrient breakdown based on goals and activity
 */
export function MacroCalculator() {
  const { toast } = useToast();

  // State for input values
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [unit, setUnit] = useState<string>('metric');
  const [activityLevel, setActivityLevel] = useState<string>('1.55');
  const [goal, setGoal] = useState<string>('maintain');
  
  // State for calculated results
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);
  const [fats, setFats] = useState<number>(0);
  const [proteinCal, setProteinCal] = useState<number>(0);
  const [carbsCal, setCarbsCal] = useState<number>(0);
  const [fatsCal, setFatsCal] = useState<number>(0);

  // Calculate macros when inputs change
  useEffect(() => {
    calculateMacros();
  }, [gender, age, height, weight, unit, activityLevel, goal]);

  // Function to calculate macros
  const calculateMacros = () => {
    let heightCm: number, weightKg: number;

    if (unit === 'imperial') {
      // Convert to metric
      heightCm = height * 2.54;
      weightKg = weight * 0.453592;
    } else {
      heightCm = height;
      weightKg = weight;
    }

    // Calculate BMR using Mifflin-St Jeor
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    // Calculate TDEE
    let tdee = bmr * parseFloat(activityLevel);

    // Adjust calories based on goal
    let targetCalories: number;
    let proteinRatio: number, carbsRatio: number, fatsRatio: number;

    switch (goal) {
      case 'lose':
        // Weight loss: 20% deficit
        targetCalories = tdee * 0.8;
        proteinRatio = 0.35; // Higher protein for muscle preservation
        fatsRatio = 0.30;
        carbsRatio = 0.35;
        break;
      case 'lose-aggressive':
        // Aggressive weight loss: 30% deficit
        targetCalories = tdee * 0.7;
        proteinRatio = 0.40;
        fatsRatio = 0.30;
        carbsRatio = 0.30;
        break;
      case 'gain':
        // Lean muscle gain: 10% surplus
        targetCalories = tdee * 1.1;
        proteinRatio = 0.30;
        fatsRatio = 0.25;
        carbsRatio = 0.45;
        break;
      case 'gain-aggressive':
        // Aggressive gain: 20% surplus
        targetCalories = tdee * 1.2;
        proteinRatio = 0.30;
        fatsRatio = 0.25;
        carbsRatio = 0.45;
        break;
      default: // maintain
        targetCalories = tdee;
        proteinRatio = 0.30;
        fatsRatio = 0.30;
        carbsRatio = 0.40;
    }

    // Calculate macros in grams
    // Protein: 4 cal/g, Carbs: 4 cal/g, Fats: 9 cal/g
    const proteinGrams = (targetCalories * proteinRatio) / 4;
    const carbsGrams = (targetCalories * carbsRatio) / 4;
    const fatsGrams = (targetCalories * fatsRatio) / 9;

    const proteinCalories = proteinGrams * 4;
    const carbsCalories = carbsGrams * 4;
    const fatsCalories = fatsGrams * 9;

    setCalories(targetCalories);
    setProtein(proteinGrams);
    setCarbs(carbsGrams);
    setFats(fatsGrams);
    setProteinCal(proteinCalories);
    setCarbsCal(carbsCalories);
    setFatsCal(fatsCalories);
  };

  // Function to reset all values
  const handleReset = () => {
    setGender('male');
    setAge(30);
    setHeight(170);
    setWeight(70);
    setUnit('metric');
    setActivityLevel('1.55');
    setGoal('maintain');
  };

  // Get goal description
  const getGoalDescription = (g: string): string => {
    const descriptions: { [key: string]: string } = {
      'lose-aggressive': 'Aggressive Fat Loss (-30%)',
      'lose': 'Fat Loss (-20%)',
      'maintain': 'Maintain Weight',
      'gain': 'Lean Muscle Gain (+10%)',
      'gain-aggressive': 'Aggressive Bulk (+20%)'
    };
    return descriptions[g] || '';
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Macro Calculation:
Goal: ${getGoalDescription(goal)}
Daily Calories: ${calories.toFixed(0)} cal

Macronutrient Breakdown:
Protein: ${protein.toFixed(0)}g (${proteinCal.toFixed(0)} cal)
Carbs: ${carbs.toFixed(0)}g (${carbsCal.toFixed(0)} cal)
Fats: ${fats.toFixed(0)}g (${fatsCal.toFixed(0)} cal)

Percentages:
Protein: ${((proteinCal / calories) * 100).toFixed(0)}%
Carbs: ${((carbsCal / calories) * 100).toFixed(0)}%
Fats: ${((fatsCal / calories) * 100).toFixed(0)}%`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Macro Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your daily macronutrient needs based on your goals
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

            {/* Gender Selection */}
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
              <Slider
                className="mt-2"
                value={[age]}
                min={15}
                max={100}
                step={1}
                onValueChange={(values) => setAge(values[0])}
              />
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
              <Slider
                className="mt-2"
                value={[weight]}
                max={unit === 'metric' ? 200 : 440}
                step={1}
                onValueChange={(values) => setWeight(values[0])}
              />
            </div>

            {/* Height */}
            <div>
              <Label htmlFor="height">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[height]}
                max={unit === 'metric' ? 250 : 100}
                step={1}
                onValueChange={(values) => setHeight(values[0])}
              />
            </div>

            {/* Activity Level */}
            <div>
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary</SelectItem>
                  <SelectItem value="1.375">Lightly active</SelectItem>
                  <SelectItem value="1.55">Moderately active</SelectItem>
                  <SelectItem value="1.725">Very active</SelectItem>
                  <SelectItem value="1.9">Extra active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Goal Selection */}
            <div>
              <Label htmlFor="goal">Fitness Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose-aggressive">Aggressive Fat Loss</SelectItem>
                  <SelectItem value="lose">Fat Loss</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Lean Muscle Gain</SelectItem>
                  <SelectItem value="gain-aggressive">Aggressive Bulk</SelectItem>
                </SelectContent>
              </Select>
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
                  <h2 className="text-xl font-semibold">Your Macros</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 flex items-center">
                      <Target className="mr-2 h-4 w-4" />
                      Daily Calorie Target
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {calories.toFixed(0)}
                    </div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                      {getGoalDescription(goal)}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Protein
                    </h3>
                    <div className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {protein.toFixed(0)}g
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {proteinCal.toFixed(0)} cal ({((proteinCal / calories) * 100).toFixed(0)}%)
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Carbohydrates
                    </h3>
                    <div className="mt-1 text-3xl font-bold text-green-600 dark:text-green-400">
                      {carbs.toFixed(0)}g
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {carbsCal.toFixed(0)} cal ({((carbsCal / calories) * 100).toFixed(0)}%)
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      Fats
                    </h3>
                    <div className="mt-1 text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {fats.toFixed(0)}g
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      {fatsCal.toFixed(0)} cal ({((fatsCal / calories) * 100).toFixed(0)}%)
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Macro Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>Protein:</strong> 4 calories per gram - builds & repairs muscle
              </p>
              <p>
                • <strong>Carbs:</strong> 4 calories per gram - primary energy source
              </p>
              <p>
                • <strong>Fats:</strong> 9 calories per gram - hormone production & health
              </p>
              <p>
                • Adjust ratios based on personal preference and performance
              </p>
              <p>
                • Track consistently for best results
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MacroCalculator;
