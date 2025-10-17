import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Activity, Flame, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * CalorieCalculator Component
 * 
 * Calculate daily calorie needs based on age, gender, weight, height, and activity level
 */
export function CalorieCalculator() {
  const { toast } = useToast();

  // State for input values
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<string>('male');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  
  // State for calculated results
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);
  const [targetCalories, setTargetCalories] = useState<number>(0);
  const [calorieAdjustment, setCalorieAdjustment] = useState<number>(0);

  // Calculate calories when inputs change
  useEffect(() => {
    calculateCalories();
  }, [age, gender, weight, height, activityLevel, goal]);

  // Function to calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = (): number => {
    // BMR for men = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5
    // BMR for women = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161
    
    const baseBMR = 10 * weight + 6.25 * height - 5 * age;
    return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
  };

  // Function to get activity multiplier
  const getActivityMultiplier = (): number => {
    switch (activityLevel) {
      case 'sedentary': return 1.2;
      case 'light': return 1.375;
      case 'moderate': return 1.55;
      case 'active': return 1.725;
      case 'very_active': return 1.9;
      default: return 1.55;
    }
  };

  // Function to calculate target calories based on goal
  const calculateTargetCalories = (tdeeValue: number): { target: number; adjustment: number } => {
    let adjustment = 0;
    
    switch (goal) {
      case 'lose_fast':
        adjustment = -1000; // Lose 2 lbs/week
        break;
      case 'lose':
        adjustment = -500; // Lose 1 lb/week
        break;
      case 'lose_slow':
        adjustment = -250; // Lose 0.5 lb/week
        break;
      case 'maintain':
        adjustment = 0;
        break;
      case 'gain_slow':
        adjustment = 250; // Gain 0.5 lb/week
        break;
      case 'gain':
        adjustment = 500; // Gain 1 lb/week
        break;
      case 'gain_fast':
        adjustment = 1000; // Gain 2 lbs/week
        break;
    }
    
    return { target: tdeeValue + adjustment, adjustment };
  };

  // Function to calculate all calorie values
  const calculateCalories = () => {
    const bmrValue = calculateBMR();
    const activityMultiplier = getActivityMultiplier();
    const tdeeValue = bmrValue * activityMultiplier;
    const { target, adjustment } = calculateTargetCalories(tdeeValue);
    
    setBmr(bmrValue);
    setTdee(tdeeValue);
    setTargetCalories(target);
    setCalorieAdjustment(adjustment);
  };

  // Function to reset all values
  const handleReset = () => {
    setAge(30);
    setGender('male');
    setWeight(70);
    setHeight(170);
    setActivityLevel('moderate');
    setGoal('maintain');
  };

  // Get activity level label
  const getActivityLabel = (): string => {
    switch (activityLevel) {
      case 'sedentary': return 'Sedentary (little or no exercise)';
      case 'light': return 'Light (exercise 1-3 days/week)';
      case 'moderate': return 'Moderate (exercise 3-5 days/week)';
      case 'active': return 'Active (exercise 6-7 days/week)';
      case 'very_active': return 'Very Active (intense exercise daily)';
      default: return 'Moderate';
    }
  };

  // Get goal label
  const getGoalLabel = (): string => {
    switch (goal) {
      case 'lose_fast': return 'Lose Weight Fast (2 lbs/week)';
      case 'lose': return 'Lose Weight (1 lb/week)';
      case 'lose_slow': return 'Lose Weight Slowly (0.5 lb/week)';
      case 'maintain': return 'Maintain Weight';
      case 'gain_slow': return 'Gain Weight Slowly (0.5 lb/week)';
      case 'gain': return 'Gain Weight (1 lb/week)';
      case 'gain_fast': return 'Gain Weight Fast (2 lbs/week)';
      default: return 'Maintain Weight';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Daily Calorie Needs:
Age: ${age} years
Gender: ${gender === 'male' ? 'Male' : 'Female'}
Weight: ${weight} kg
Height: ${height} cm
Activity Level: ${getActivityLabel()}
Goal: ${getGoalLabel()}

Basal Metabolic Rate (BMR): ${Math.round(bmr)} calories/day
Total Daily Energy Expenditure (TDEE): ${Math.round(tdee)} calories/day
Target Calories: ${Math.round(targetCalories)} calories/day
${calorieAdjustment !== 0 ? `Calorie Adjustment: ${calorieAdjustment > 0 ? '+' : ''}${calorieAdjustment} calories/day` : ''}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Calorie Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your daily calorie needs based on your profile and goals
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" /> Your Information
          </h2>
          
          <div className="space-y-6">
            {/* Age */}
            <div>
              <Label htmlFor="age">Age (years)</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="age"
                  type="number"
                  className="pl-10"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[age]}
                min={15}
                max={100}
                step={1}
                onValueChange={(values) => setAge(values[0])}
              />
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
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="relative mt-1.5">
                <Activity className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
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
                min={30}
                max={200}
                step={1}
                onValueChange={(values) => setWeight(values[0])}
              />
            </div>

            {/* Height */}
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <div className="relative mt-1.5">
                <Activity className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="height"
                  type="number"
                  className="pl-10"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[height]}
                min={100}
                max={250}
                step={1}
                onValueChange={(values) => setHeight(values[0])}
              />
            </div>

            {/* Activity Level */}
            <div>
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="very_active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Goal */}
            <div>
              <Label htmlFor="goal">Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose_fast">Lose Fast (2 lbs/week)</SelectItem>
                  <SelectItem value="lose">Lose (1 lb/week)</SelectItem>
                  <SelectItem value="lose_slow">Lose Slow (0.5 lb/week)</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain_slow">Gain Slow (0.5 lb/week)</SelectItem>
                  <SelectItem value="gain">Gain (1 lb/week)</SelectItem>
                  <SelectItem value="gain_fast">Gain Fast (2 lbs/week)</SelectItem>
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
                  <h2 className="text-xl font-semibold">Your Calorie Needs</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200 flex items-center">
                      <Target className="mr-2 h-4 w-4" />
                      Target Calories
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {Math.round(targetCalories)} cal/day
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      {getGoalLabel()}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Flame className="mr-2 h-4 w-4" />
                      Basal Metabolic Rate (BMR)
                    </h3>
                    <div className="mt-1 text-2xl font-bold">
                      {Math.round(bmr)} cal/day
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Calories burned at rest
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Total Daily Energy Expenditure (TDEE)
                    </h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {Math.round(tdee)} cal/day
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Maintenance calories
                    </p>
                  </div>
                  
                  {calorieAdjustment !== 0 && (
                    <div className={`p-4 rounded-lg border ${
                      calorieAdjustment > 0 
                        ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                        : 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800'
                    }`}>
                      <h3 className={`text-sm font-medium ${
                        calorieAdjustment > 0 
                          ? 'text-green-800 dark:text-green-200' 
                          : 'text-purple-800 dark:text-purple-200'
                      }`}>
                        Daily Adjustment
                      </h3>
                      <div className={`mt-1 text-2xl font-bold ${
                        calorieAdjustment > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-purple-600 dark:text-purple-400'
                      }`}>
                        {calorieAdjustment > 0 ? '+' : ''}{calorieAdjustment} cal
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Understanding Your Results</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • BMR is the minimum calories needed for basic bodily functions
              </p>
              <p>
                • TDEE includes your activity level and represents maintenance calories
              </p>
              <p>
                • 3,500 calories = approximately 1 pound of body weight
              </p>
              <p>
                • Adjust your intake based on your weight loss or gain goals
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CalorieCalculator;
