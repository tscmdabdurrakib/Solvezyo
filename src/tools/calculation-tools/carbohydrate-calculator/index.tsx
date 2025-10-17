import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * CarbohydrateCalculator Component
 * 
 * Calculates daily carbohydrate intake based on activity level, weight, and goals.
 * Uses standard nutritional guidelines for carbohydrate recommendations.
 */
export function CarbohydrateCalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  
  // State for calculated results
  const [dailyCarbs, setDailyCarbs] = useState<number>(0);
  const [minCarbs, setMinCarbs] = useState<number>(0);
  const [maxCarbs, setMaxCarbs] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  // Calculate carbohydrates when inputs change
  useEffect(() => {
    calculateCarbs();
  }, [weight, weightUnit, activityLevel, goal]);

  // Function to calculate carbohydrate requirements
  const calculateCarbs = () => {
    // Convert weight to kg if needed
    const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
    
    if (weightInKg <= 0) {
      setDailyCarbs(0);
      setMinCarbs(0);
      setMaxCarbs(0);
      setPercentage(0);
      return;
    }
    
    // Carb multipliers based on activity level and goal (grams per kg bodyweight)
    let carbMultiplier = 0;
    let minMultiplier = 0;
    let maxMultiplier = 0;
    let carbPercentage = 0;
    
    // Determine carb needs based on activity level
    switch (activityLevel) {
      case 'sedentary':
        minMultiplier = 3;
        maxMultiplier = 4;
        carbPercentage = 45;
        break;
      case 'light':
        minMultiplier = 4;
        maxMultiplier = 5;
        carbPercentage = 50;
        break;
      case 'moderate':
        minMultiplier = 5;
        maxMultiplier = 6;
        carbPercentage = 50;
        break;
      case 'active':
        minMultiplier = 6;
        maxMultiplier = 7;
        carbPercentage = 55;
        break;
      case 'very-active':
        minMultiplier = 7;
        maxMultiplier = 8;
        carbPercentage = 60;
        break;
      case 'athlete':
        minMultiplier = 8;
        maxMultiplier = 10;
        carbPercentage = 60;
        break;
    }
    
    // Adjust based on goal
    switch (goal) {
      case 'lose':
        minMultiplier -= 1;
        maxMultiplier -= 1;
        carbPercentage -= 5;
        break;
      case 'gain':
        minMultiplier += 1;
        maxMultiplier += 1;
        carbPercentage += 5;
        break;
    }
    
    // Ensure minimum values
    minMultiplier = Math.max(2, minMultiplier);
    maxMultiplier = Math.max(3, maxMultiplier);
    carbPercentage = Math.max(30, Math.min(65, carbPercentage));
    
    carbMultiplier = (minMultiplier + maxMultiplier) / 2;
    
    // Calculate carbs in grams
    const calculatedCarbs = weightInKg * carbMultiplier;
    const calculatedMin = weightInKg * minMultiplier;
    const calculatedMax = weightInKg * maxMultiplier;
    
    setDailyCarbs(Math.round(calculatedCarbs));
    setMinCarbs(Math.round(calculatedMin));
    setMaxCarbs(Math.round(calculatedMax));
    setPercentage(carbPercentage);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(70);
    setWeightUnit('kg');
    setActivityLevel('moderate');
    setGoal('maintain');
  };

  // Function to copy result to clipboard
  const handleCopy = () => {
    const resultText = `Daily Carbohydrate Intake: ${dailyCarbs}g (Range: ${minCarbs}g - ${maxCarbs}g)\nPercentage of daily calories: ${percentage}%`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "Carbohydrate calculation results copied successfully.",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Carbohydrate Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your daily carbohydrate needs based on activity level and fitness goals
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2 h-5 w-5" /> Your Information
          </h2>
          
          <div className="space-y-6">
            {/* Weight */}
            <div>
              <Label htmlFor="weight">Body Weight</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="flex-1"
                />
                <Select value={weightUnit} onValueChange={(value: 'kg' | 'lbs') => setWeightUnit(value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Slider
                className="mt-2"
                defaultValue={[weight]}
                max={200}
                step={1}
                value={[weight]}
                onValueChange={(values) => setWeight(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 {weightUnit}</span>
                <span>100 {weightUnit}</span>
                <span>200 {weightUnit}</span>
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger id="activity" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (twice per day)</SelectItem>
                  <SelectItem value="athlete">Athlete (professional training)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Goal */}
            <div>
              <Label htmlFor="goal">Fitness Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger id="goal" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight/Muscle</SelectItem>
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
              key={dailyCarbs}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Daily Carbohydrate Needs</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Recommended Daily Intake</h3>
                    <div className="mt-2 text-4xl font-bold text-primary">
                      {dailyCarbs}g
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Minimum</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {minCarbs}g
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Maximum</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {maxCarbs}g
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">% of Daily Calories</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {percentage}%
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Calories from Carbs</h3>
                    <div className="text-lg font-semibold">
                      {dailyCarbs * 4} calories
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      (4 calories per gram of carbohydrate)
                    </p>
                  </div>
                  
                  <Button onClick={handleCopy} className="w-full">
                    <Copy className="mr-2 h-4 w-4" /> Copy Result
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-3">Understanding Carbohydrates</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Carbohydrates are your body's primary energy source, especially during exercise.
              </p>
              <p>
                The recommended amount varies based on activity level, with athletes requiring more carbs for performance.
              </p>
              <p>
                Focus on complex carbohydrates like whole grains, fruits, and vegetables for sustained energy.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CarbohydrateCalculator;
