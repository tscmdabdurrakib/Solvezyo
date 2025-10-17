import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calculator, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * GreatestCommonFactorCalculator Component
 * 
 * Calculates the Greatest Common Factor (GCF) of multiple numbers
 * Uses the Euclidean algorithm for efficient calculation
 */
export function GreatestCommonFactorCalculator() {
  const [numbers, setNumbers] = useState<string[]>(['48', '18']);
  const [gcf, setGcf] = useState<number>(0);
  const [steps, setSteps] = useState<string[]>([]);
  const { toast } = useToast();

  // Calculate GCF whenever numbers change
  useEffect(() => {
    calculateGCF();
  }, [numbers]);

  // Euclidean algorithm to find GCF of two numbers
  const gcdTwo = (a: number, b: number): number => {
    return b === 0 ? a : gcdTwo(b, a % b);
  };

  // Calculate GCF of multiple numbers
  const calculateGCF = () => {
    const validNumbers = numbers
      .map(n => parseInt(n))
      .filter(n => !isNaN(n) && n > 0);

    if (validNumbers.length === 0) {
      setGcf(0);
      setSteps([]);
      return;
    }

    if (validNumbers.length === 1) {
      setGcf(validNumbers[0]);
      setSteps([`GCF of a single number is the number itself: ${validNumbers[0]}`]);
      return;
    }

    // Calculate GCF by reducing array
    let result = validNumbers[0];
    const calculationSteps: string[] = [];
    
    for (let i = 1; i < validNumbers.length; i++) {
      const prev = result;
      result = gcdTwo(result, validNumbers[i]);
      calculationSteps.push(`GCF(${prev}, ${validNumbers[i]}) = ${result}`);
    }

    setGcf(result);
    setSteps(calculationSteps);
  };

  // Add new number field
  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  // Remove number field
  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      setNumbers(newNumbers);
    }
  };

  // Update number at index
  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  // Copy result to clipboard
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Reset calculator
  const handleReset = () => {
    setNumbers(['48', '18']);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Greatest Common Factor Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Find the greatest common factor (GCF) of two or more numbers
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Enter Numbers
          </h2>
          
          <div className="space-y-4">
            {numbers.map((num, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor={`number-${index}`}>Number {index + 1}</Label>
                  <Input
                    id={`number-${index}`}
                    type="number"
                    min="1"
                    step="1"
                    value={num}
                    onChange={(e) => updateNumber(index, e.target.value)}
                    placeholder="Enter a positive integer"
                    className="mt-2"
                  />
                </div>
                {numbers.length > 2 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeNumber(index)}
                    className="mt-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={addNumber} variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Number
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Result</h2>
            
            {/* GCF Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Greatest Common Factor (GCF)
                  </h3>
                  <div className="text-4xl font-bold">
                    {gcf || 'Enter valid numbers'}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Numbers: {numbers.filter(n => n && !isNaN(parseInt(n))).join(', ')}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(gcf.toString(), 'GCF')}
                  disabled={gcf === 0}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calculation Steps */}
            {steps.length > 0 && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Calculation Steps</h3>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={index} className="text-sm font-mono bg-background/50 p-2 rounded">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About GCF</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is GCF?</h3>
              <p className="text-muted-foreground text-sm">
                The Greatest Common Factor (GCF) is the largest positive integer that divides each of the numbers without a remainder.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Euclidean Algorithm</h3>
              <p className="text-muted-foreground text-sm">
                We use the efficient Euclidean algorithm, which repeatedly applies division until the remainder is zero.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Multiple Numbers</h3>
              <p className="text-muted-foreground text-sm">
                For more than two numbers, we calculate GCF iteratively by reducing pairs until one result remains.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GreatestCommonFactorCalculator;
