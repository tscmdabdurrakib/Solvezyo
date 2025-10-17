import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Activity, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BMRCalculator Component
 * 
 * Calculate Basal Metabolic Rate using multiple formulas
 */
export function BMRCalculator() {
  const { toast } = useToast();

  // State for input values
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [unit, setUnit] = useState<string>('metric');
  const [formula, setFormula] = useState<string>('mifflin');
  const [activityLevel, setActivityLevel] = useState<string>('1.2');
  
  // State for calculated results
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);

  // Calculate BMR when inputs change
  useEffect(() => {
    calculateBMR();
  }, [gender, age, height, weight, unit, formula, activityLevel]);

  // Function to calculate BMR
  const calculateBMR = () => {
    let heightCm: number, weightKg: number;

    if (unit === 'imperial') {
      // Convert to metric
      heightCm = height * 2.54;
      weightKg = weight * 0.453592;
    } else {
      heightCm = height;
      weightKg = weight;
    }

    let bmrValue: number;

    if (formula === 'mifflin') {
      // Mifflin-St Jeor Formula (more accurate for modern populations)
      if (gender === 'male') {
        bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
      } else {
        bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
      }
    } else {
      // Harris-Benedict Formula (revised)
      if (gender === 'male') {
        bmrValue = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
      } else {
        bmrValue = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
      }
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdeeValue = bmrValue * parseFloat(activityLevel);

    setBmr(bmrValue);
    setTdee(tdeeValue);
  };

  // Function to reset all values
  const handleReset = () => {
    setGender('male');
    setAge(30);
    setHeight(170);
    setWeight(70);
    setUnit('metric');
    setFormula('mifflin');
    setActivityLevel('1.2');
  };

  // Get activity level description
  const getActivityDescription = (level: string): string => {
    const descriptions: { [key: string]: string } = {
      '1.2': 'Sedentary (little or no exercise)',
      '1.375': 'Lightly active (1-3 days/week)',
      '1.55': 'Moderately active (3-5 days/week)',
      '1.725': 'Very active (6-7 days/week)',
      '1.9': 'Extra active (athlete/physical job)'
    };
    return descriptions[level] || '';
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const unitLabel = unit === 'metric' ? 'kg' : 'lbs';
    const heightLabel = unit === 'metric' ? 'cm' : 'inches';
    
    const result = `BMR Calculation:
Gender: ${gender}
Age: ${age} years
Weight: ${weight} ${unitLabel}
Height: ${height} ${heightLabel}
Formula: ${formula === 'mifflin' ? 'Mifflin-St Jeor' : 'Harris-Benedict'}
BMR: ${bmr.toFixed(0)} calories/day
Activity Level: ${getActivityDescription(activityLevel)}
TDEE: ${tdee.toFixed(0)} calories/day`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">BMR Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your Basal Metabolic Rate and daily calorie needs
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

            {/* Formula Selection */}
            <div>
              <Label htmlFor="formula">Calculation Formula</Label>
              <Select value={formula} onValueChange={setFormula}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mifflin">Mifflin-St Jeor (Recommended)</SelectItem>
                  <SelectItem value="harris">Harris-Benedict (Revised)</SelectItem>
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
                  <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="1.375">Lightly active (1-3 days/week)</SelectItem>
                  <SelectItem value="1.55">Moderately active (3-5 days/week)</SelectItem>
                  <SelectItem value="1.725">Very active (6-7 days/week)</SelectItem>
                  <SelectItem value="1.9">Extra active (athlete/physical job)</SelectItem>
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
                  <h2 className="text-xl font-semibold">Your Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200 flex items-center">
                      <Flame className="mr-2 h-4 w-4" />
                      Basal Metabolic Rate (BMR)
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-orange-600 dark:text-orange-400">
                      {bmr.toFixed(0)}
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                      calories per day
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200 flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Total Daily Energy Expenditure (TDEE)
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-green-600 dark:text-green-400">
                      {tdee.toFixed(0)}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      calories per day
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Calorie Goals</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Weight Loss (mild)</span>
                        <span className="font-semibold">{(tdee * 0.9).toFixed(0)} cal/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight Loss (moderate)</span>
                        <span className="font-semibold">{(tdee * 0.8).toFixed(0)} cal/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance</span>
                        <span className="font-semibold">{tdee.toFixed(0)} cal/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight Gain (lean)</span>
                        <span className="font-semibold">{(tdee * 1.1).toFixed(0)} cal/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight Gain (fast)</span>
                        <span className="font-semibold">{(tdee * 1.2).toFixed(0)} cal/day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About BMR & TDEE</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>BMR</strong> is the calories you burn at complete rest
              </p>
              <p>
                • <strong>TDEE</strong> is your total daily calorie burn including activity
              </p>
              <p>
                • Mifflin-St Jeor is generally more accurate for modern populations
              </p>
              <p>
                • To lose 1 lb/week, create a 500 calorie daily deficit
              </p>
              <p>
                • To gain 1 lb/week, create a 500 calorie daily surplus
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BMRCalculator;
