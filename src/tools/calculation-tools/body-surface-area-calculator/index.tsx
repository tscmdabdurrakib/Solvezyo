import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BodySurfaceAreaCalculator Component
 * 
 * Calculate Body Surface Area (BSA) using multiple formulas
 * BSA is used in medical dosing and medical indicators
 */
export function BodySurfaceAreaCalculator() {
  const { toast } = useToast();

  // State for input values
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [unit, setUnit] = useState<string>('metric');
  const [formula, setFormula] = useState<string>('mosteller');
  
  // State for calculated results
  const [bsa, setBsa] = useState<number>(0);
  const [formulaName, setFormulaName] = useState<string>('');

  // Calculate BSA when inputs change
  useEffect(() => {
    calculateBSA();
  }, [weight, height, unit, formula]);

  // Function to calculate BSA using different formulas
  const calculateBSA = () => {
    let weightKg = weight;
    let heightCm = height;

    // Convert to metric if imperial
    if (unit === 'imperial') {
      weightKg = weight * 0.453592; // lbs to kg
      heightCm = height * 2.54; // inches to cm
    }

    let bsaValue: number;
    let name: string;

    switch (formula) {
      case 'mosteller':
        // Mosteller formula: BSA (m²) = √((height(cm) × weight(kg)) / 3600)
        bsaValue = Math.sqrt((heightCm * weightKg) / 3600);
        name = 'Mosteller Formula';
        break;
      
      case 'dubois':
        // DuBois & DuBois formula: BSA (m²) = 0.007184 × height(cm)^0.725 × weight(kg)^0.425
        bsaValue = 0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425);
        name = 'DuBois & DuBois Formula';
        break;
      
      case 'haycock':
        // Haycock formula: BSA (m²) = 0.024265 × height(cm)^0.3964 × weight(kg)^0.5378
        bsaValue = 0.024265 * Math.pow(heightCm, 0.3964) * Math.pow(weightKg, 0.5378);
        name = 'Haycock Formula';
        break;
      
      case 'gehan-george':
        // Gehan and George formula: BSA (m²) = 0.0235 × height(cm)^0.42246 × weight(kg)^0.51456
        bsaValue = 0.0235 * Math.pow(heightCm, 0.42246) * Math.pow(weightKg, 0.51456);
        name = 'Gehan & George Formula';
        break;
      
      case 'boyd':
        // Boyd formula (simplified): BSA (m²) = 0.0003207 × height(cm)^0.3 × weight(g)^(0.7285 - 0.0188 × log(weight))
        const weightG = weightKg * 1000;
        bsaValue = 0.0003207 * Math.pow(heightCm, 0.3) * Math.pow(weightG, 0.7285 - 0.0188 * Math.log10(weightG));
        name = 'Boyd Formula';
        break;
      
      default:
        bsaValue = 0;
        name = '';
    }

    setBsa(bsaValue);
    setFormulaName(name);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(70);
    setHeight(170);
    setUnit('metric');
    setFormula('mosteller');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const unitLabel = unit === 'metric' ? 'kg/cm' : 'lbs/inches';
    const result = `Body Surface Area Calculation:
Weight: ${weight} ${unit === 'metric' ? 'kg' : 'lbs'}
Height: ${height} ${unit === 'metric' ? 'cm' : 'inches'}
Formula: ${formulaName}

BSA: ${bsa.toFixed(4)} m²
BSA: ${(bsa * 10.764).toFixed(2)} ft²`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "BSA results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Body Surface Area Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate BSA for medical dosing and physiological measurements
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

            {/* Formula Selection */}
            <div>
              <Label htmlFor="formula">Calculation Formula</Label>
              <Select value={formula} onValueChange={setFormula}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mosteller">Mosteller (Most Common)</SelectItem>
                  <SelectItem value="dubois">DuBois & DuBois</SelectItem>
                  <SelectItem value="haycock">Haycock</SelectItem>
                  <SelectItem value="gehan-george">Gehan & George</SelectItem>
                  <SelectItem value="boyd">Boyd</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Weight */}
            <div>
              <Label htmlFor="weight">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </Label>
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
                  <h2 className="text-xl font-semibold">BSA Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Body Surface Area
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {bsa.toFixed(4)}
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      square meters (m²)
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      Also Equals
                    </h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {(bsa * 10.764).toFixed(2)} ft²
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                      square feet
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Formula Used
                    </h3>
                    <p className="text-sm font-semibold">
                      {formulaName}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                      Normal Range
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Adult: 1.6 - 2.0 m²
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Average Adult: ~1.73 m²
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About BSA</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • BSA is used to calculate drug dosages and medical indicators
              </p>
              <p>
                • The Mosteller formula is most commonly used in clinical practice
              </p>
              <p>
                • BSA is more accurate than weight alone for dosing calculations
              </p>
              <p>
                • Average adult BSA is approximately 1.73 m²
              </p>
              <p>
                • Used in chemotherapy dosing, cardiac index, and renal function
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BodySurfaceAreaCalculator;
