import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Dumbbell } from 'lucide-react';
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
 * OneRepMaxCalculator Component
 * 
 * Calculates one-rep max (1RM) using multiple formulas including Brzycki,
 * Epley, and Lombardi formulas. Used for strength training programming.
 */
export function OneRepMaxCalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [weight, setWeight] = useState<number>(100);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [reps, setReps] = useState<number>(5);
  const [formula, setFormula] = useState<string>('brzycki');
  
  // State for calculated results
  const [oneRepMax, setOneRepMax] = useState<number>(0);
  const [percentages, setPercentages] = useState<{ percent: number; weight: number }[]>([]);

  // Calculate 1RM when inputs change
  useEffect(() => {
    calculate1RM();
  }, [weight, weightUnit, reps, formula]);

  // Function to calculate one-rep max
  const calculate1RM = () => {
    if (weight <= 0 || reps <= 0 || reps > 20) {
      setOneRepMax(0);
      setPercentages([]);
      return;
    }
    
    let calculatedRM = 0;
    
    // Different formulas for calculating 1RM
    switch (formula) {
      case 'brzycki':
        // Brzycki formula: 1RM = weight × (36 / (37 - reps))
        calculatedRM = weight * (36 / (37 - reps));
        break;
      case 'epley':
        // Epley formula: 1RM = weight × (1 + 0.0333 × reps)
        calculatedRM = weight * (1 + 0.0333 * reps);
        break;
      case 'lombardi':
        // Lombardi formula: 1RM = weight × reps^0.1
        calculatedRM = weight * Math.pow(reps, 0.1);
        break;
      case 'mayhew':
        // Mayhew formula: 1RM = (100 × weight) / (52.2 + 41.9 × e^(-0.055 × reps))
        calculatedRM = (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps));
        break;
      case 'oconner':
        // O'Conner formula: 1RM = weight × (1 + 0.025 × reps)
        calculatedRM = weight * (1 + 0.025 * reps);
        break;
      case 'wathan':
        // Wathan formula: 1RM = (100 × weight) / (48.8 + 53.8 × e^(-0.075 × reps))
        calculatedRM = (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps));
        break;
    }
    
    setOneRepMax(Math.round(calculatedRM * 10) / 10);
    
    // Calculate training percentages
    const trainingPercentages = [
      { percent: 95, weight: calculatedRM * 0.95 },
      { percent: 90, weight: calculatedRM * 0.90 },
      { percent: 85, weight: calculatedRM * 0.85 },
      { percent: 80, weight: calculatedRM * 0.80 },
      { percent: 75, weight: calculatedRM * 0.75 },
      { percent: 70, weight: calculatedRM * 0.70 },
      { percent: 65, weight: calculatedRM * 0.65 },
      { percent: 60, weight: calculatedRM * 0.60 },
    ];
    
    setPercentages(trainingPercentages);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(100);
    setWeightUnit('kg');
    setReps(5);
    setFormula('brzycki');
  };

  // Function to copy result to clipboard
  const handleCopy = () => {
    const percentageText = percentages
      .map(p => `${p.percent}%: ${Math.round(p.weight * 10) / 10} ${weightUnit}`)
      .join('\n');
    const resultText = `One Rep Max: ${oneRepMax} ${weightUnit}\n\nTraining Percentages:\n${percentageText}`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "1RM calculation results copied successfully.",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">One Rep Max Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your one-rep max and training percentages for strength programming
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Dumbbell className="mr-2 h-5 w-5" /> Lift Details
          </h2>
          
          <div className="space-y-6">
            {/* Weight */}
            <div>
              <Label htmlFor="weight">Weight Lifted</Label>
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
                max={500}
                step={1}
                value={[weight]}
                onValueChange={(values) => setWeight(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 {weightUnit}</span>
                <span>250 {weightUnit}</span>
                <span>500 {weightUnit}</span>
              </div>
            </div>

            {/* Reps */}
            <div>
              <Label htmlFor="reps">Repetitions Completed</Label>
              <Input
                id="reps"
                type="number"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="mt-1.5"
                max={20}
                min={1}
              />
              <Slider
                className="mt-2"
                defaultValue={[reps]}
                max={20}
                min={1}
                step={1}
                value={[reps]}
                onValueChange={(values) => setReps(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 rep</span>
                <span>10 reps</span>
                <span>20 reps</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Best accuracy with 1-10 reps
              </p>
            </div>

            {/* Formula */}
            <div>
              <Label htmlFor="formula">Calculation Formula</Label>
              <Select value={formula} onValueChange={setFormula}>
                <SelectTrigger id="formula" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brzycki">Brzycki (Most Popular)</SelectItem>
                  <SelectItem value="epley">Epley</SelectItem>
                  <SelectItem value="lombardi">Lombardi</SelectItem>
                  <SelectItem value="mayhew">Mayhew et al.</SelectItem>
                  <SelectItem value="oconner">O'Conner et al.</SelectItem>
                  <SelectItem value="wathan">Wathan</SelectItem>
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
              key={oneRepMax}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your One Rep Max</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Estimated 1RM</h3>
                    <div className="mt-2 text-4xl font-bold text-primary">
                      {oneRepMax} {weightUnit}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Training Percentages</h3>
                    <div className="space-y-2">
                      {percentages.map((p) => (
                        <div key={p.percent} className="flex justify-between items-center text-sm">
                          <span className="font-medium">{p.percent}%</span>
                          <div className="flex-1 mx-3 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary/60"
                              style={{ width: `${p.percent}%` }}
                            />
                          </div>
                          <span className="font-semibold min-w-[80px] text-right">
                            {Math.round(p.weight * 10) / 10} {weightUnit}
                          </span>
                        </div>
                      ))}
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
            <h2 className="text-lg font-semibold mb-3">Training Guidelines</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Strength (85-100%)</p>
                <p>1-5 reps, 3-5 sets, 3-5 min rest</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Hypertrophy (65-85%)</p>
                <p>6-12 reps, 3-5 sets, 1-2 min rest</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Endurance (60-65%)</p>
                <p>12-20+ reps, 2-3 sets, 30-60 sec rest</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OneRepMaxCalculator;
