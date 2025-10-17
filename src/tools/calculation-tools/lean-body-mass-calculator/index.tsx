import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, User } from 'lucide-react';
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
 * LeanBodyMassCalculator Component
 * 
 * Calculates lean body mass using the Boer formula which considers
 * height, weight, and gender to estimate fat-free body mass.
 */
export function LeanBodyMassCalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [gender, setGender] = useState<string>('male');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  
  // State for calculated results
  const [lbm, setLbm] = useState<number>(0);
  const [bodyFatMass, setBodyFatMass] = useState<number>(0);
  const [lbmPercentage, setLbmPercentage] = useState<number>(0);

  // Calculate LBM when inputs change
  useEffect(() => {
    calculateLBM();
  }, [weight, height, gender, weightUnit, heightUnit]);

  // Function to calculate lean body mass using Boer formula
  const calculateLBM = () => {
    // Convert to metric if needed
    const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
    const heightInCm = heightUnit === 'in' ? height * 2.54 : height;
    
    if (weightInKg <= 0 || heightInCm <= 0) {
      setLbm(0);
      setBodyFatMass(0);
      setLbmPercentage(0);
      return;
    }
    
    // Boer formula for lean body mass
    // Male: LBM = (0.407 × weight in kg) + (0.267 × height in cm) - 19.2
    // Female: LBM = (0.252 × weight in kg) + (0.473 × height in cm) - 48.3
    let calculatedLBM = 0;
    
    if (gender === 'male') {
      calculatedLBM = (0.407 * weightInKg) + (0.267 * heightInCm) - 19.2;
    } else {
      calculatedLBM = (0.252 * weightInKg) + (0.473 * heightInCm) - 48.3;
    }
    
    // Calculate body fat mass
    const fatMass = weightInKg - calculatedLBM;
    const lbmPercent = (calculatedLBM / weightInKg) * 100;
    
    // Convert back to user's preferred unit if needed
    const lbmInUnit = weightUnit === 'lbs' ? calculatedLBM / 0.453592 : calculatedLBM;
    const fatMassInUnit = weightUnit === 'lbs' ? fatMass / 0.453592 : fatMass;
    
    setLbm(Math.round(lbmInUnit * 10) / 10);
    setBodyFatMass(Math.round(fatMassInUnit * 10) / 10);
    setLbmPercentage(Math.round(lbmPercent * 10) / 10);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(70);
    setHeight(170);
    setGender('male');
    setWeightUnit('kg');
    setHeightUnit('cm');
  };

  // Function to copy result to clipboard
  const handleCopy = () => {
    const resultText = `Lean Body Mass: ${lbm} ${weightUnit}\nBody Fat Mass: ${bodyFatMass} ${weightUnit}\nLBM Percentage: ${lbmPercentage}%`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "Lean body mass results copied successfully.",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Lean Body Mass Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your lean body mass using the Boer formula
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" /> Your Information
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
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 {weightUnit}</span>
                <span>100 {weightUnit}</span>
                <span>200 {weightUnit}</span>
              </div>
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
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 {heightUnit}</span>
                <span>{heightUnit === 'cm' ? '125' : '50'} {heightUnit}</span>
                <span>{heightUnit === 'cm' ? '250' : '100'} {heightUnit}</span>
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
              key={lbm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Results</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Lean Body Mass</h3>
                    <div className="mt-2 text-4xl font-bold text-primary">
                      {lbm} {weightUnit}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Body Fat Mass</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {bodyFatMass} {weightUnit}
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">LBM Percentage</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {lbmPercentage}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Body Composition</h3>
                    <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${lbmPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Fat: {100 - lbmPercentage}%</span>
                      <span className="text-muted-foreground">Lean: {lbmPercentage}%</span>
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
            <h2 className="text-lg font-semibold mb-3">About Lean Body Mass</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Lean body mass (LBM) is your total body weight minus body fat. It includes muscles, bones, organs, and water.
              </p>
              <p>
                This calculation uses the Boer formula, which is widely used in clinical and research settings.
              </p>
              <p>
                Higher LBM typically indicates better metabolic health and physical fitness.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LeanBodyMassCalculator;
