import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Droplet } from 'lucide-react';
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
 * FatIntakeCalculator Component
 * 
 * Calculates daily fat intake requirements based on total calories,
 * activity level, and dietary goals.
 */
export function FatIntakeCalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [dailyCalories, setDailyCalories] = useState<number>(2000);
  const [goal, setGoal] = useState<string>('balanced');
  
  // State for calculated results
  const [totalFat, setTotalFat] = useState<number>(0);
  const [minFat, setMinFat] = useState<number>(0);
  const [maxFat, setMaxFat] = useState<number>(0);
  const [saturatedFat, setSaturatedFat] = useState<number>(0);
  const [unsaturatedFat, setUnsaturatedFat] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  // Calculate fat intake when inputs change
  useEffect(() => {
    calculateFat();
  }, [weight, weightUnit, dailyCalories, goal]);

  // Function to calculate fat intake requirements
  const calculateFat = () => {
    // Convert weight to kg if needed
    const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
    
    if (weightInKg <= 0 || dailyCalories <= 0) {
      setTotalFat(0);
      setMinFat(0);
      setMaxFat(0);
      setSaturatedFat(0);
      setUnsaturatedFat(0);
      setPercentage(0);
      return;
    }
    
    // Fat percentage ranges based on goal
    let fatPercentage = 0;
    let minPercentage = 0;
    let maxPercentage = 0;
    
    switch (goal) {
      case 'low-fat':
        minPercentage = 15;
        maxPercentage = 20;
        fatPercentage = 18;
        break;
      case 'balanced':
        minPercentage = 25;
        maxPercentage = 30;
        fatPercentage = 28;
        break;
      case 'moderate-fat':
        minPercentage = 30;
        maxPercentage = 35;
        fatPercentage = 33;
        break;
      case 'high-fat':
        minPercentage = 35;
        maxPercentage = 40;
        fatPercentage = 38;
        break;
      case 'keto':
        minPercentage = 60;
        maxPercentage = 75;
        fatPercentage = 70;
        break;
    }
    
    // Calculate fat in grams (1g fat = 9 calories)
    const calculatedFat = (dailyCalories * (fatPercentage / 100)) / 9;
    const calculatedMin = (dailyCalories * (minPercentage / 100)) / 9;
    const calculatedMax = (dailyCalories * (maxPercentage / 100)) / 9;
    
    // Saturated fat should be less than 10% of total calories
    const calculatedSaturatedFat = (dailyCalories * 0.10) / 9;
    
    // Unsaturated fat (remaining fat)
    const calculatedUnsaturatedFat = calculatedFat - calculatedSaturatedFat;
    
    setTotalFat(Math.round(calculatedFat));
    setMinFat(Math.round(calculatedMin));
    setMaxFat(Math.round(calculatedMax));
    setSaturatedFat(Math.round(calculatedSaturatedFat));
    setUnsaturatedFat(Math.round(calculatedUnsaturatedFat));
    setPercentage(fatPercentage);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(70);
    setWeightUnit('kg');
    setDailyCalories(2000);
    setGoal('balanced');
  };

  // Function to copy result to clipboard
  const handleCopy = () => {
    const resultText = `Daily Fat Intake: ${totalFat}g (Range: ${minFat}g - ${maxFat}g)\nSaturated Fat: ≤${saturatedFat}g\nUnsaturated Fat: ${unsaturatedFat}g\nPercentage of daily calories: ${percentage}%`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "Fat intake calculation results copied successfully.",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Fat Intake Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your daily fat needs based on calories and dietary goals
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Droplet className="mr-2 h-5 w-5" /> Your Information
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

            {/* Daily Calories */}
            <div>
              <Label htmlFor="calories">Daily Calorie Target</Label>
              <Input
                id="calories"
                type="number"
                value={dailyCalories}
                onChange={(e) => setDailyCalories(Number(e.target.value))}
                className="mt-1.5"
              />
              <Slider
                className="mt-2"
                defaultValue={[dailyCalories]}
                max={4000}
                min={1000}
                step={50}
                value={[dailyCalories]}
                onValueChange={(values) => setDailyCalories(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1000 cal</span>
                <span>2500 cal</span>
                <span>4000 cal</span>
              </div>
            </div>

            {/* Goal */}
            <div>
              <Label htmlFor="goal">Dietary Approach</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger id="goal" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-fat">Low Fat (15-20%)</SelectItem>
                  <SelectItem value="balanced">Balanced (25-30%)</SelectItem>
                  <SelectItem value="moderate-fat">Moderate Fat (30-35%)</SelectItem>
                  <SelectItem value="high-fat">High Fat (35-40%)</SelectItem>
                  <SelectItem value="keto">Ketogenic (60-75%)</SelectItem>
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
              key={totalFat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Daily Fat Intake</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Daily Fat</h3>
                    <div className="mt-2 text-4xl font-bold text-primary">
                      {totalFat}g
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Minimum</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {minFat}g
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Maximum</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {maxFat}g
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
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Fat Type Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Saturated Fat (max)</span>
                        <span className="font-semibold">≤{saturatedFat}g</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Unsaturated Fat</span>
                        <span className="font-semibold">{unsaturatedFat}g</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Calories from Fat</h3>
                    <div className="text-lg font-semibold">
                      {totalFat * 9} calories
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      (9 calories per gram of fat)
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
            <h2 className="text-lg font-semibold mb-3">Understanding Dietary Fats</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Unsaturated fats</strong> (omega-3, omega-6) support heart health and should make up most of your fat intake.
              </p>
              <p>
                <strong>Saturated fats</strong> should be limited to less than 10% of total calories.
              </p>
              <p>
                Avoid trans fats completely. Focus on sources like nuts, avocados, olive oil, and fatty fish.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FatIntakeCalculator;
