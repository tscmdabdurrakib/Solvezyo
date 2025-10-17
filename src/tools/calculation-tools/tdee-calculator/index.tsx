import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Zap } from 'lucide-react';
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
 * TDEECalculator Component
 * 
 * Calculates Total Daily Energy Expenditure using the Mifflin-St Jeor equation
 * combined with activity multipliers for accurate calorie needs.
 */
export function TDEECalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  
  // State for calculated results
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);
  const [weightLoss, setWeightLoss] = useState<number>(0);
  const [weightGain, setWeightGain] = useState<number>(0);

  // Calculate TDEE when inputs change
  useEffect(() => {
    calculateTDEE();
  }, [gender, age, weight, height, weightUnit, heightUnit, activityLevel]);

  // Function to calculate TDEE
  const calculateTDEE = () => {
    // Convert to metric if needed
    const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
    const heightInCm = heightUnit === 'in' ? height * 2.54 : height;
    
    if (weightInKg <= 0 || heightInCm <= 0 || age <= 0) {
      setBmr(0);
      setTdee(0);
      setWeightLoss(0);
      setWeightGain(0);
      return;
    }
    
    // Calculate BMR using Mifflin-St Jeor equation
    // Male: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5
    // Female: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161
    let calculatedBMR = 0;
    
    if (gender === 'male') {
      calculatedBMR = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5;
    } else {
      calculatedBMR = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
    }
    
    // Activity multipliers
    let activityMultiplier = 1.2;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'light':
        activityMultiplier = 1.375;
        break;
      case 'moderate':
        activityMultiplier = 1.55;
        break;
      case 'active':
        activityMultiplier = 1.725;
        break;
      case 'very-active':
        activityMultiplier = 1.9;
        break;
    }
    
    // Calculate TDEE
    const calculatedTDEE = calculatedBMR * activityMultiplier;
    
    // Calculate weight loss/gain calories
    // Moderate deficit/surplus of 20%
    const calculatedWeightLoss = calculatedTDEE * 0.8;
    const calculatedWeightGain = calculatedTDEE * 1.2;
    
    setBmr(Math.round(calculatedBMR));
    setTdee(Math.round(calculatedTDEE));
    setWeightLoss(Math.round(calculatedWeightLoss));
    setWeightGain(Math.round(calculatedWeightGain));
  };

  // Function to reset all values
  const handleReset = () => {
    setGender('male');
    setAge(30);
    setWeight(70);
    setHeight(170);
    setWeightUnit('kg');
    setHeightUnit('cm');
    setActivityLevel('moderate');
  };

  // Function to copy result to clipboard
  const handleCopy = () => {
    const resultText = `BMR: ${bmr} calories/day\nTDEE: ${tdee} calories/day\nWeight Loss: ${weightLoss} calories/day\nWeight Gain: ${weightGain} calories/day`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "TDEE calculation results copied successfully.",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">TDEE Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your Total Daily Energy Expenditure and calorie needs
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 h-5 w-5" /> Your Information
          </h2>
          
          <div className="space-y-6">
            {/* Gender */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="gender" className="mt-1.5">
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
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="mt-1.5"
              />
              <Slider
                className="mt-2"
                defaultValue={[age]}
                max={100}
                min={15}
                step={1}
                value={[age]}
                onValueChange={(values) => setAge(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>15 yrs</span>
                <span>50 yrs</span>
                <span>100 yrs</span>
              </div>
            </div>

            {/* Weight */}
            <div>
              <Label htmlFor="weight">Weight</Label>
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
                step={0.1}
                value={[weight]}
                onValueChange={(values) => setWeight(values[0])}
              />
            </div>

            {/* Height */}
            <div>
              <Label htmlFor="height">Height</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="flex-1"
                />
                <Select value={heightUnit} onValueChange={(value: 'cm' | 'in') => setHeightUnit(value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Slider
                className="mt-2"
                defaultValue={[height]}
                max={heightUnit === 'cm' ? 250 : 100}
                step={heightUnit === 'cm' ? 1 : 0.1}
                value={[height]}
                onValueChange={(values) => setHeight(values[0])}
              />
            </div>

            {/* Activity Level */}
            <div>
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger id="activity" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (twice per day)</SelectItem>
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
              key={tdee}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Results</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Daily Energy Expenditure</h3>
                    <div className="mt-2 text-4xl font-bold text-primary">
                      {tdee} cal
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Calories to maintain current weight
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Basal Metabolic Rate (BMR)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {bmr} cal/day
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Calories burned at rest
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <h3 className="text-sm font-medium text-muted-foreground">Weight Loss</h3>
                      <div className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                        {weightLoss} cal
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        -20% deficit
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <h3 className="text-sm font-medium text-muted-foreground">Weight Gain</h3>
                      <div className="mt-1 text-xl font-bold text-blue-600 dark:text-blue-400">
                        {weightGain} cal
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +20% surplus
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Macronutrient Split (Balanced)</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Protein (30%):</span>
                        <span className="font-semibold">{Math.round(tdee * 0.3 / 4)}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carbs (40%):</span>
                        <span className="font-semibold">{Math.round(tdee * 0.4 / 4)}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fat (30%):</span>
                        <span className="font-semibold">{Math.round(tdee * 0.3 / 9)}g</span>
                      </div>
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
            <h2 className="text-lg font-semibold mb-3">Understanding TDEE</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                TDEE is the total number of calories you burn per day, including all activities.
              </p>
              <p>
                To lose weight, consume fewer calories than your TDEE. To gain weight, consume more.
              </p>
              <p>
                A moderate deficit or surplus of 15-20% is recommended for sustainable results.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TDEECalculator;
