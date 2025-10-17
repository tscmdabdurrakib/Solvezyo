import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Scale, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * AnorexicBMICalculator Component
 * 
 * Calculate BMI and assess anorexia severity levels based on BMI ranges
 * Educational tool for understanding weight status
 */
export function AnorexicBMICalculator() {
  const { toast } = useToast();

  // State for input values
  const [weight, setWeight] = useState<number>(50);
  const [height, setHeight] = useState<number>(165);
  const [unit, setUnit] = useState<string>('metric');
  
  // State for calculated results
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [healthyWeightMin, setHealthyWeightMin] = useState<number>(0);
  const [healthyWeightMax, setHealthyWeightMax] = useState<number>(0);

  // Calculate BMI when inputs change
  useEffect(() => {
    calculateBMI();
  }, [weight, height, unit]);

  // Function to get BMI category with anorexia severity levels
  const getBMICategory = (bmiValue: number): { category: string; color: string; severity: string } => {
    if (bmiValue < 15) {
      return { 
        category: 'Severely Underweight', 
        color: 'darkred',
        severity: 'Extreme Anorexia - Immediate medical attention required'
      };
    } else if (bmiValue < 16) {
      return { 
        category: 'Severely Underweight', 
        color: 'red',
        severity: 'Severe Anorexia - Medical intervention needed'
      };
    } else if (bmiValue < 17) {
      return { 
        category: 'Moderately Underweight', 
        color: 'orange',
        severity: 'Moderate Anorexia - Professional help recommended'
      };
    } else if (bmiValue < 18.5) {
      return { 
        category: 'Underweight', 
        color: 'yellow',
        severity: 'Mild Underweight - Monitor closely'
      };
    } else if (bmiValue < 25) {
      return { 
        category: 'Normal Weight', 
        color: 'green',
        severity: 'Healthy weight range'
      };
    } else if (bmiValue < 30) {
      return { 
        category: 'Overweight', 
        color: 'orange',
        severity: 'Above healthy weight range'
      };
    } else {
      return { 
        category: 'Obese', 
        color: 'red',
        severity: 'Significantly above healthy weight'
      };
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

    const { category: cat, color, severity: sev } = getBMICategory(bmiValue);
    
    setBmi(bmiValue);
    setCategory(cat);
    setCategoryColor(color);
    setSeverity(sev);
    setHealthyWeightMin(minWeight);
    setHealthyWeightMax(maxWeight);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(50);
    setHeight(165);
    setUnit('metric');
  };

  // Get category background color classes
  const getCategoryColorClasses = () => {
    switch (categoryColor) {
      case 'darkred':
        return 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100';
      case 'red':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200';
      case 'yellow':
        return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
      case 'green':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      default:
        return 'bg-muted/50';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const unitLabel = unit === 'metric' ? 'kg' : 'lbs';
    const heightLabel = unit === 'metric' ? 'cm' : 'inches';
    
    const result = `BMI & Anorexia Severity Assessment:
Weight: ${weight} ${unitLabel}
Height: ${height} ${heightLabel}
BMI: ${bmi.toFixed(1)}
Category: ${category}
Severity: ${severity}
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
        <h1 className="text-3xl font-bold tracking-tight">Anorexic BMI Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Assess BMI and understand anorexia severity levels
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
                  <h2 className="text-xl font-semibold">BMI Assessment</h2>
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

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Assessment</h3>
                    <p className="mt-1 text-sm">
                      {severity}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Healthy Weight Range</h3>
                    <div className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                      {healthyWeightMin.toFixed(1)} - {healthyWeightMax.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-amber-800 dark:text-amber-200">
                        <p className="font-semibold mb-1">Important:</p>
                        <p>If you or someone you know is struggling with an eating disorder, please seek professional help immediately.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Anorexia Severity Levels (BMI)
                    </h3>
                    <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                      <div className="flex justify-between">
                        <span>&lt; 15</span>
                        <span>Extreme - Emergency</span>
                      </div>
                      <div className="flex justify-between">
                        <span>15 - 16</span>
                        <span>Severe</span>
                      </div>
                      <div className="flex justify-between">
                        <span>16 - 17</span>
                        <span>Moderate</span>
                      </div>
                      <div className="flex justify-between">
                        <span>17 - 18.5</span>
                        <span>Mild Underweight</span>
                      </div>
                      <div className="flex justify-between">
                        <span>18.5 - 24.9</span>
                        <span>Healthy Range</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Resources & Support</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • National Eating Disorders Hotline: 1-800-931-2237
              </p>
              <p>
                • Crisis Text Line: Text "NEDA" to 741741
              </p>
              <p>
                • Anorexia is a serious medical condition requiring treatment
              </p>
              <p>
                • Early intervention significantly improves recovery outcomes
              </p>
              <p>
                • This calculator is educational - consult healthcare providers
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AnorexicBMICalculator;
