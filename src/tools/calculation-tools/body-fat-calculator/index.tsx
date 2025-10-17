import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Activity, Ruler } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BodyFatCalculator Component
 * 
 * Calculate body fat percentage using Navy Method
 */
export function BodyFatCalculator() {
  const { toast } = useToast();

  // State for input values
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [neck, setNeck] = useState<number>(37);
  const [waist, setWaist] = useState<number>(85);
  const [hip, setHip] = useState<number>(95);
  const [unit, setUnit] = useState<string>('metric');
  
  // State for calculated results
  const [bodyFat, setBodyFat] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('');
  const [leanMass, setLeanMass] = useState<number>(0);
  const [fatMass, setFatMass] = useState<number>(0);

  // Calculate body fat when inputs change
  useEffect(() => {
    calculateBodyFat();
  }, [gender, age, height, weight, neck, waist, hip, unit]);

  // Function to get body fat category
  const getBodyFatCategory = (bf: number, g: string): { category: string; color: string } => {
    if (g === 'male') {
      if (bf < 6) return { category: 'Essential Fat', color: 'blue' };
      if (bf < 14) return { category: 'Athletes', color: 'green' };
      if (bf < 18) return { category: 'Fitness', color: 'green' };
      if (bf < 25) return { category: 'Average', color: 'orange' };
      return { category: 'Obese', color: 'red' };
    } else {
      if (bf < 14) return { category: 'Essential Fat', color: 'blue' };
      if (bf < 21) return { category: 'Athletes', color: 'green' };
      if (bf < 25) return { category: 'Fitness', color: 'green' };
      if (bf < 32) return { category: 'Average', color: 'orange' };
      return { category: 'Obese', color: 'red' };
    }
  };

  // Function to calculate body fat percentage (Navy Method)
  const calculateBodyFat = () => {
    let heightCm: number, weightKg: number, neckCm: number, waistCm: number, hipCm: number;

    if (unit === 'imperial') {
      // Convert to metric
      heightCm = height * 2.54;
      weightKg = weight * 0.453592;
      neckCm = neck * 2.54;
      waistCm = waist * 2.54;
      hipCm = hip * 2.54;
    } else {
      heightCm = height;
      weightKg = weight;
      neckCm = neck;
      waistCm = waist;
      hipCm = hip;
    }

    let bodyFatPercentage: number;

    if (gender === 'male') {
      // Navy Formula for Men: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      // Navy Formula for Women: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }

    // Calculate fat mass and lean mass
    const fatMassKg = (bodyFatPercentage / 100) * weightKg;
    const leanMassKg = weightKg - fatMassKg;

    // Convert back to display units if imperial
    const fatMassDisplay = unit === 'imperial' ? fatMassKg / 0.453592 : fatMassKg;
    const leanMassDisplay = unit === 'imperial' ? leanMassKg / 0.453592 : leanMassKg;

    const { category: cat, color } = getBodyFatCategory(bodyFatPercentage, gender);
    
    setBodyFat(bodyFatPercentage);
    setCategory(cat);
    setCategoryColor(color);
    setFatMass(fatMassDisplay);
    setLeanMass(leanMassDisplay);
  };

  // Function to reset all values
  const handleReset = () => {
    setGender('male');
    setAge(30);
    setHeight(170);
    setWeight(70);
    setNeck(37);
    setWaist(85);
    setHip(95);
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
    
    const result = `Body Fat Calculation:
Gender: ${gender}
Weight: ${weight} ${unitLabel}
Height: ${height} ${heightLabel}
Body Fat: ${bodyFat.toFixed(1)}%
Category: ${category}
Fat Mass: ${fatMass.toFixed(1)} ${unitLabel}
Lean Mass: ${leanMass.toFixed(1)} ${unitLabel}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Body Fat Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your body fat percentage using the U.S. Navy Method
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

            {/* Neck */}
            <div>
              <Label htmlFor="neck">
                Neck ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <Input
                id="neck"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={neck}
                onChange={(e) => setNeck(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[neck]}
                max={unit === 'metric' ? 60 : 24}
                step={1}
                onValueChange={(values) => setNeck(values[0])}
              />
            </div>

            {/* Waist */}
            <div>
              <Label htmlFor="waist">
                Waist ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <Input
                id="waist"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[waist]}
                max={unit === 'metric' ? 150 : 60}
                step={1}
                onValueChange={(values) => setWaist(values[0])}
              />
            </div>

            {/* Hip (Women only) */}
            {gender === 'female' && (
              <div>
                <Label htmlFor="hip">
                  Hip ({unit === 'metric' ? 'cm' : 'inches'})
                </Label>
                <Input
                  id="hip"
                  type="number"
                  step="0.1"
                  className="mt-1.5"
                  value={hip}
                  onChange={(e) => setHip(Number(e.target.value))}
                />
                <Slider
                  className="mt-2"
                  value={[hip]}
                  max={unit === 'metric' ? 150 : 60}
                  step={1}
                  onValueChange={(values) => setHip(values[0])}
                />
              </div>
            )}

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
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      Body Fat Percentage
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {bodyFat.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${getCategoryColorClasses()}`}>
                    <h3 className="text-sm font-medium">Category</h3>
                    <div className={`mt-1 text-2xl font-bold ${getCategoryTextColor()}`}>
                      {category}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Fat Mass</h3>
                    <div className="mt-1 text-xl font-bold text-red-600 dark:text-red-400">
                      {fatMass.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Lean Mass</h3>
                    <div className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                      {leanMass.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Body Fat Categories</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium">Men:</p>
              <p>• Essential Fat: 2-5%</p>
              <p>• Athletes: 6-13%</p>
              <p>• Fitness: 14-17%</p>
              <p>• Average: 18-24%</p>
              <p>• Obese: 25%+</p>
              <p className="font-medium mt-3">Women:</p>
              <p>• Essential Fat: 10-13%</p>
              <p>• Athletes: 14-20%</p>
              <p>• Fitness: 21-24%</p>
              <p>• Average: 25-31%</p>
              <p>• Obese: 32%+</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BodyFatCalculator;
