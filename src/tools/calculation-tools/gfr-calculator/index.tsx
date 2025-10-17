import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Activity, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * GFRCalculator Component
 * 
 * Calculate Glomerular Filtration Rate (GFR) to assess kidney function
 * Uses the CKD-EPI equation
 */
export function GFRCalculator() {
  const { toast } = useToast();

  // State for input values
  const [age, setAge] = useState<number>(45);
  const [gender, setGender] = useState<string>('male');
  const [race, setRace] = useState<string>('non-black');
  const [creatinine, setCreatinine] = useState<number>(1.0);
  
  // State for calculated results
  const [gfr, setGfr] = useState<number>(0);
  const [stage, setStage] = useState<string>('');
  const [stageColor, setStageColor] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Calculate GFR when inputs change
  useEffect(() => {
    calculateGFR();
  }, [age, gender, race, creatinine]);

  // Function to get CKD stage
  const getCKDStage = (gfrValue: number): { stage: string; color: string; description: string } => {
    if (gfrValue >= 90) {
      return { 
        stage: 'Stage 1 (Normal)', 
        color: 'green',
        description: 'Normal or high kidney function'
      };
    } else if (gfrValue >= 60) {
      return { 
        stage: 'Stage 2 (Mild)', 
        color: 'blue',
        description: 'Mild loss of kidney function'
      };
    } else if (gfrValue >= 45) {
      return { 
        stage: 'Stage 3a (Moderate)', 
        color: 'yellow',
        description: 'Mild to moderate loss of kidney function'
      };
    } else if (gfrValue >= 30) {
      return { 
        stage: 'Stage 3b (Moderate)', 
        color: 'orange',
        description: 'Moderate to severe loss of kidney function'
      };
    } else if (gfrValue >= 15) {
      return { 
        stage: 'Stage 4 (Severe)', 
        color: 'red',
        description: 'Severe loss of kidney function'
      };
    } else {
      return { 
        stage: 'Stage 5 (Kidney Failure)', 
        color: 'darkred',
        description: 'Kidney failure - dialysis or transplant needed'
      };
    }
  };

  // Function to calculate GFR using CKD-EPI equation
  const calculateGFR = () => {
    // CKD-EPI equation
    const kappa = gender === 'female' ? 0.7 : 0.9;
    const alpha = gender === 'female' ? -0.329 : -0.411;
    const genderFactor = gender === 'female' ? 1.018 : 1.0;
    const raceFactor = race === 'black' ? 1.159 : 1.0;
    
    // Calculate min(Scr/κ, 1) and max(Scr/κ, 1)
    const creatinineRatio = creatinine / kappa;
    const minPart = Math.min(creatinineRatio, 1);
    const maxPart = Math.max(creatinineRatio, 1);
    
    // GFR = 141 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.209 × 0.993^Age × [Gender Factor] × [Race Factor]
    const gfrValue = 141 * 
                     Math.pow(minPart, alpha) * 
                     Math.pow(maxPart, -1.209) * 
                     Math.pow(0.993, age) * 
                     genderFactor * 
                     raceFactor;

    const { stage: ckdStage, color, description: desc } = getCKDStage(gfrValue);
    
    setGfr(gfrValue);
    setStage(ckdStage);
    setStageColor(color);
    setDescription(desc);
  };

  // Function to reset all values
  const handleReset = () => {
    setAge(45);
    setGender('male');
    setRace('non-black');
    setCreatinine(1.0);
  };

  // Get stage background color classes
  const getStageColorClasses = () => {
    switch (stageColor) {
      case 'green':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      case 'yellow':
        return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200';
      case 'red':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'darkred':
        return 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100';
      default:
        return 'bg-muted/50';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `GFR Calculation:
Age: ${age} years
Gender: ${gender}
Race: ${race}
Serum Creatinine: ${creatinine} mg/dL

eGFR: ${gfr.toFixed(1)} mL/min/1.73m²
CKD Stage: ${stage}
Description: ${description}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "GFR results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">GFR Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Estimate Glomerular Filtration Rate to assess kidney function
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2 h-5 w-5" /> Patient Information
          </h2>
          
          <div className="space-y-6">
            {/* Age */}
            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                className="mt-1.5"
                value={age}
                min={18}
                max={120}
                onChange={(e) => setAge(Number(e.target.value))}
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

            {/* Race */}
            <div>
              <Label htmlFor="race">Race</Label>
              <Select value={race} onValueChange={setRace}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">Black/African American</SelectItem>
                  <SelectItem value="non-black">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Serum Creatinine */}
            <div>
              <Label htmlFor="creatinine">Serum Creatinine (mg/dL)</Label>
              <Input
                id="creatinine"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={creatinine}
                min={0.1}
                max={20}
                onChange={(e) => setCreatinine(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Normal range: 0.6-1.2 mg/dL
              </p>
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
                  <h2 className="text-xl font-semibold">GFR Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      eGFR (Estimated GFR)
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {gfr.toFixed(1)}
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      mL/min/1.73m²
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${getStageColorClasses()}`}>
                    <h3 className="text-sm font-medium">CKD Stage</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {stage}
                    </div>
                    <p className="text-sm mt-2">
                      {description}
                    </p>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-amber-800 dark:text-amber-200">
                        <p className="font-semibold mb-1">Important Note:</p>
                        <p>This calculator uses the CKD-EPI equation. Results should be interpreted by a healthcare professional. Do not use for self-diagnosis.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      GFR Stages Reference
                    </h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>≥ 90</span>
                        <span>Stage 1 (Normal)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>60-89</span>
                        <span>Stage 2 (Mild)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>45-59</span>
                        <span>Stage 3a (Moderate)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>30-44</span>
                        <span>Stage 3b (Moderate)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>15-29</span>
                        <span>Stage 4 (Severe)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>&lt; 15</span>
                        <span>Stage 5 (Failure)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About GFR</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • GFR measures how well kidneys filter blood
              </p>
              <p>
                • Normal GFR is typically 90 or higher
              </p>
              <p>
                • Lower GFR indicates reduced kidney function
              </p>
              <p>
                • This calculator uses the CKD-EPI equation (2009)
              </p>
              <p>
                • Consult a healthcare provider for proper interpretation
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GFRCalculator;
