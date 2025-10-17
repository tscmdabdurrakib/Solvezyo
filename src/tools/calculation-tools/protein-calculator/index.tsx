import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Beef } from 'lucide-react';
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
 * ProteinCalculator Component
 * 
 * Calculates daily protein requirements based on weight, activity level,
 * and fitness goals using evidence-based recommendations.
 */
export function ProteinCalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  
  // State for calculated results
  const [dailyProtein, setDailyProtein] = useState<number>(0);
  const [minProtein, setMinProtein] = useState<number>(0);
  const [maxProtein, setMaxProtein] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  // Calculate protein when inputs change
  useEffect(() => {
    calculateProtein();
  }, [weight, weightUnit, activityLevel, goal]);

  // Function to calculate protein requirements
  const calculateProtein = () => {
    // Convert weight to kg if needed
    const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
    
    if (weightInKg <= 0) {
      setDailyProtein(0);
      setMinProtein(0);
      setMaxProtein(0);
      setPercentage(0);
      return;
    }
    
    // Protein multipliers based on activity level and goal (grams per kg bodyweight)
    let minMultiplier = 0;
    let maxMultiplier = 0;
    let proteinPercentage = 0;
    
    // Base protein needs based on activity level
    switch (activityLevel) {
      case 'sedentary':
        minMultiplier = 0.8;
        maxMultiplier = 1.0;
        proteinPercentage = 15;
        break;
      case 'light':
        minMultiplier = 1.0;
        maxMultiplier = 1.2;
        proteinPercentage = 20;
        break;
      case 'moderate':
        minMultiplier = 1.2;
        maxMultiplier = 1.4;
        proteinPercentage = 25;
        break;
      case 'active':
        minMultiplier = 1.4;
        maxMultiplier = 1.6;
        proteinPercentage = 25;
        break;
      case 'very-active':
        minMultiplier = 1.6;
        maxMultiplier = 1.8;
        proteinPercentage = 30;
        break;
      case 'athlete':
        minMultiplier = 1.8;
        maxMultiplier = 2.2;
        proteinPercentage = 30;
        break;
    }
    
    // Adjust based on goal
    switch (goal) {
      case 'lose':
        minMultiplier += 0.2;
        maxMultiplier += 0.3;
        proteinPercentage += 5;
        break;
      case 'gain':
        minMultiplier += 0.3;
        maxMultiplier += 0.4;
        proteinPercentage += 5;
        break;
    }
    
    // Ensure reasonable limits
    minMultiplier = Math.max(0.8, minMultiplier);
    maxMultiplier = Math.min(2.5, maxMultiplier);
    proteinPercentage = Math.max(15, Math.min(35, proteinPercentage));
    
    const proteinMultiplier = (minMultiplier + maxMultiplier) / 2;
    
    // Calculate protein in grams
    const calculatedProtein = weightInKg * proteinMultiplier;
    const calculatedMin = weightInKg * minMultiplier;
    const calculatedMax = weightInKg * maxMultiplier;
    
    setDailyProtein(Math.round(calculatedProtein));
    setMinProtein(Math.round(calculatedMin));
    setMaxProtein(Math.round(calculatedMax));
    setPercentage(proteinPercentage);
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
    const resultText = `Daily Protein Intake: ${dailyProtein}g (Range: ${minProtein}g - ${maxProtein}g)\nPercentage of daily calories: ${percentage}%`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "Protein calculation results copied successfully.",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Protein Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your daily protein needs based on activity level and fitness goals
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Beef className="mr-2 h-5 w-5" /> Your Information
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
                  <SelectItem value="lose">Lose Weight (preserve muscle)</SelectItem>
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
              key={dailyProtein}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Daily Protein Needs</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Recommended Daily Intake</h3>
                    <div className="mt-2 text-4xl font-bold text-primary">
                      {dailyProtein}g
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Minimum</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {minProtein}g
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Maximum</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {maxProtein}g
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
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Calories from Protein</h3>
                    <div className="text-lg font-semibold">
                      {dailyProtein * 4} calories
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      (4 calories per gram of protein)
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Per Meal (4 meals/day)</h3>
                    <div className="text-lg font-semibold">
                      {Math.round(dailyProtein / 4)}g per meal
                    </div>
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
            <h2 className="text-lg font-semibold mb-3">Understanding Protein Needs</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Protein is essential for muscle repair, growth, and maintaining lean body mass.
              </p>
              <p>
                Athletes and those trying to lose weight while preserving muscle need higher protein intake.
              </p>
              <p>
                Spread protein intake throughout the day for optimal muscle protein synthesis.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProteinCalculator;
