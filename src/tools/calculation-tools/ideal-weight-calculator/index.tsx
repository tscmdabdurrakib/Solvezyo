import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Target, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * IdealWeightCalculator Component
 * 
 * Calculate ideal body weight using multiple formulas
 */
export function IdealWeightCalculator() {
  const { toast } = useToast();

  // State for input values
  const [gender, setGender] = useState<string>('male');
  const [height, setHeight] = useState<number>(170);
  const [unit, setUnit] = useState<string>('metric');
  
  // State for calculated results
  const [robinson, setRobinson] = useState<number>(0);
  const [miller, setMiller] = useState<number>(0);
  const [devine, setDevine] = useState<number>(0);
  const [hamwi, setHamwi] = useState<number>(0);
  const [average, setAverage] = useState<number>(0);

  // Calculate ideal weights when inputs change
  useEffect(() => {
    calculateIdealWeight();
  }, [gender, height, unit]);

  // Function to calculate ideal weights using multiple formulas
  const calculateIdealWeight = () => {
    let heightCm = unit === 'imperial' ? height * 2.54 : height;
    let heightInches = heightCm / 2.54;

    // All formulas work with height in inches
    let robinsonWeight: number, millerWeight: number, devineWeight: number, hamwiWeight: number;

    if (gender === 'male') {
      // Robinson (1983): 52 kg + 1.9 kg per inch over 5 feet
      robinsonWeight = 52 + 1.9 * (heightInches - 60);
      
      // Miller (1983): 56.2 kg + 1.41 kg per inch over 5 feet
      millerWeight = 56.2 + 1.41 * (heightInches - 60);
      
      // Devine (1974): 50 kg + 2.3 kg per inch over 5 feet
      devineWeight = 50 + 2.3 * (heightInches - 60);
      
      // Hamwi (1964): 48 kg + 2.7 kg per inch over 5 feet
      hamwiWeight = 48 + 2.7 * (heightInches - 60);
    } else {
      // Robinson (1983): 49 kg + 1.7 kg per inch over 5 feet
      robinsonWeight = 49 + 1.7 * (heightInches - 60);
      
      // Miller (1983): 53.1 kg + 1.36 kg per inch over 5 feet
      millerWeight = 53.1 + 1.36 * (heightInches - 60);
      
      // Devine (1974): 45.5 kg + 2.3 kg per inch over 5 feet
      devineWeight = 45.5 + 2.3 * (heightInches - 60);
      
      // Hamwi (1964): 45.5 kg + 2.2 kg per inch over 5 feet
      hamwiWeight = 45.5 + 2.2 * (heightInches - 60);
    }

    // Convert to display units if imperial
    const robinsonDisplay = unit === 'imperial' ? robinsonWeight / 0.453592 : robinsonWeight;
    const millerDisplay = unit === 'imperial' ? millerWeight / 0.453592 : millerWeight;
    const devineDisplay = unit === 'imperial' ? devineWeight / 0.453592 : devineWeight;
    const hamwiDisplay = unit === 'imperial' ? hamwiWeight / 0.453592 : hamwiWeight;
    
    const avg = (robinsonWeight + millerWeight + devineWeight + hamwiWeight) / 4;
    const avgDisplay = unit === 'imperial' ? avg / 0.453592 : avg;

    setRobinson(robinsonDisplay);
    setMiller(millerDisplay);
    setDevine(devineDisplay);
    setHamwi(hamwiDisplay);
    setAverage(avgDisplay);
  };

  // Function to reset all values
  const handleReset = () => {
    setGender('male');
    setHeight(170);
    setUnit('metric');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const unitLabel = unit === 'metric' ? 'kg' : 'lbs';
    const heightLabel = unit === 'metric' ? 'cm' : 'inches';
    
    const result = `Ideal Weight Calculation:
Gender: ${gender}
Height: ${height} ${heightLabel}

Ideal Weight by Formula:
Robinson: ${robinson.toFixed(1)} ${unitLabel}
Miller: ${miller.toFixed(1)} ${unitLabel}
Devine: ${devine.toFixed(1)} ${unitLabel}
Hamwi: ${hamwi.toFixed(1)} ${unitLabel}

Average: ${average.toFixed(1)} ${unitLabel}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Ideal Weight Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your ideal body weight using multiple scientific formulas
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

            {/* Height */}
            <div>
              <Label htmlFor="height">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <div className="relative mt-1.5">
                <Scale className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[height]}
                max={unit === 'metric' ? 250 : 100}
                min={unit === 'metric' ? 100 : 40}
                step={1}
                onValueChange={(values) => setHeight(values[0])}
              />
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
                  <h2 className="text-xl font-semibold">Ideal Weight Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 flex items-center">
                      <Target className="mr-2 h-4 w-4" />
                      Average Ideal Weight
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {average.toFixed(1)}
                    </div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                      {unit === 'metric' ? 'kg' : 'lbs'}
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">By Formula</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Robinson (1983)</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {robinson.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Miller (1983)</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {miller.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Devine (1974)</span>
                        <span className="font-semibold text-orange-600 dark:text-orange-400">
                          {devine.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Hamwi (1964)</span>
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          {hamwi.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Healthy Weight Range
                    </h3>
                    <div className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                      {(average * 0.9).toFixed(1)} - {(average * 1.1).toFixed(1)}
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ±10% of average ideal weight
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About These Formulas</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>Robinson:</strong> Widely used in medical settings
              </p>
              <p>
                • <strong>Miller:</strong> Modified version of Robinson formula
              </p>
              <p>
                • <strong>Devine:</strong> Used for drug dosing calculations
              </p>
              <p>
                • <strong>Hamwi:</strong> Quick estimation method
              </p>
              <p>
                • These are estimates - actual healthy weight varies by individual
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default IdealWeightCalculator;
