import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Heart } from 'lucide-react';
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
 * HealthyWeightCalculator Component
 * 
 * Calculates healthy weight range using multiple formulas including
 * BMI-based calculations and considers gender, height, and frame size.
 */
export function HealthyWeightCalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [height, setHeight] = useState<number>(170);
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  const [gender, setGender] = useState<string>('male');
  const [frameSize, setFrameSize] = useState<string>('medium');
  
  // State for calculated results
  const [minHealthyWeight, setMinHealthyWeight] = useState<number>(0);
  const [maxHealthyWeight, setMaxHealthyWeight] = useState<number>(0);
  const [idealWeight, setIdealWeight] = useState<number>(0);
  const [hamwiWeight, setHamwiWeight] = useState<number>(0);
  const [devineWeight, setDevineWeight] = useState<number>(0);

  // Calculate healthy weight when inputs change
  useEffect(() => {
    calculateHealthyWeight();
  }, [height, heightUnit, gender, frameSize]);

  // Function to calculate healthy weight range
  const calculateHealthyWeight = () => {
    // Convert to metric if needed
    const heightInCm = heightUnit === 'in' ? height * 2.54 : height;
    const heightInMeters = heightInCm / 100;
    
    if (heightInCm <= 0) {
      setMinHealthyWeight(0);
      setMaxHealthyWeight(0);
      setIdealWeight(0);
      setHamwiWeight(0);
      setDevineWeight(0);
      return;
    }
    
    // BMI-based healthy weight range (BMI 18.5 to 24.9)
    const minWeight = 18.5 * heightInMeters * heightInMeters;
    const maxWeight = 24.9 * heightInMeters * heightInMeters;
    
    // Hamwi formula (1964)
    // Male: 48 kg + 2.7 kg per inch over 5 feet
    // Female: 45.5 kg + 2.2 kg per inch over 5 feet
    const heightInInches = heightInCm / 2.54;
    const inchesOver60 = Math.max(0, heightInInches - 60);
    let hamwi = 0;
    
    if (gender === 'male') {
      hamwi = 48 + (2.7 * inchesOver60);
    } else {
      hamwi = 45.5 + (2.2 * inchesOver60);
    }
    
    // Devine formula (1974)
    // Male: 50 kg + 2.3 kg per inch over 5 feet
    // Female: 45.5 kg + 2.3 kg per inch over 5 feet
    let devine = 0;
    
    if (gender === 'male') {
      devine = 50 + (2.3 * inchesOver60);
    } else {
      devine = 45.5 + (2.3 * inchesOver60);
    }
    
    // Adjust for frame size
    let frameAdjustment = 1;
    switch (frameSize) {
      case 'small':
        frameAdjustment = 0.9;
        break;
      case 'large':
        frameAdjustment = 1.1;
        break;
    }
    
    // Calculate ideal weight as average of formulas with frame adjustment
    const ideal = ((hamwi + devine) / 2) * frameAdjustment;
    
    setMinHealthyWeight(Math.round(minWeight * 10) / 10);
    setMaxHealthyWeight(Math.round(maxWeight * 10) / 10);
    setIdealWeight(Math.round(ideal * 10) / 10);
    setHamwiWeight(Math.round(hamwi * frameAdjustment * 10) / 10);
    setDevineWeight(Math.round(devine * frameAdjustment * 10) / 10);
  };

  // Function to reset all values
  const handleReset = () => {
    setHeight(170);
    setHeightUnit('cm');
    setGender('male');
    setFrameSize('medium');
  };

  // Function to copy result to clipboard
  const handleCopy = () => {
    const resultText = `Healthy Weight Range: ${minHealthyWeight} - ${maxHealthyWeight} kg\nIdeal Weight: ${idealWeight} kg\nHamwi Formula: ${hamwiWeight} kg\nDevine Formula: ${devineWeight} kg`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "Healthy weight calculation results copied successfully.",
    });
  };

  // Convert weight to lbs for display
  const kgToLbs = (kg: number) => Math.round(kg * 2.20462 * 10) / 10;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Healthy Weight Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your ideal healthy weight range based on height, gender, and frame size
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Heart className="mr-2 h-5 w-5" /> Your Information
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

            {/* Frame Size */}
            <div>
              <Label htmlFor="frameSize">Frame Size</Label>
              <Select value={frameSize} onValueChange={setFrameSize}>
                <SelectTrigger id="frameSize" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small Frame</SelectItem>
                  <SelectItem value="medium">Medium Frame</SelectItem>
                  <SelectItem value="large">Large Frame</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Small frame: 10% lighter, Large frame: 10% heavier
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
              key={idealWeight}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Healthy Weight Range</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Ideal Weight</h3>
                    <div className="mt-2 text-4xl font-bold text-primary">
                      {idealWeight} kg
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      ({kgToLbs(idealWeight)} lbs)
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Healthy Weight Range (BMI)</h3>
                    <div className="mt-2 text-2xl font-bold">
                      {minHealthyWeight} - {maxHealthyWeight} kg
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      ({kgToLbs(minHealthyWeight)} - {kgToLbs(maxHealthyWeight)} lbs)
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Hamwi Formula</h3>
                      <div className="mt-1 text-xl font-bold">
                        {hamwiWeight} kg
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ({kgToLbs(hamwiWeight)} lbs)
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Devine Formula</h3>
                      <div className="mt-1 text-xl font-bold">
                        {devineWeight} kg
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ({kgToLbs(devineWeight)} lbs)
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
            <h2 className="text-lg font-semibold mb-3">Understanding Healthy Weight</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Your healthy weight range is based on BMI (18.5-24.9), which is associated with optimal health outcomes.
              </p>
              <p>
                The Hamwi and Devine formulas are clinical tools used by healthcare professionals to estimate ideal body weight.
              </p>
              <p>
                Remember, these are guidelines. Muscle mass, bone density, and overall health are also important factors.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HealthyWeightCalculator;
