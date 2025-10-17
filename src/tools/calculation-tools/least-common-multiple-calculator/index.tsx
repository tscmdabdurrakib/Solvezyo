import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calculator, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * LeastCommonMultipleCalculator Component
 * 
 * Calculates LCM and GCD of multiple numbers
 */
export function LeastCommonMultipleCalculator() {
  const [numbers, setNumbers] = useState<string[]>(['12', '18']);
  const [lcm, setLcm] = useState<number>(0);
  const [gcd, setGcd] = useState<number>(0);
  const { toast } = useToast();

  // Calculate LCM and GCD when inputs change
  useEffect(() => {
    calculateLCM();
  }, [numbers]);

  // Function to calculate GCD of two numbers using Euclidean algorithm
  const calculateGCD = (a: number, b: number): number => {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    
    if (b === 0) return a;
    return calculateGCD(b, a % b);
  };

  // Function to calculate LCM of two numbers
  const calculateLCMTwo = (a: number, b: number): number => {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a * b) / calculateGCD(a, b));
  };

  // Function to calculate LCM of multiple numbers
  const calculateLCM = () => {
    const validNumbers = numbers
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n) && n !== 0);

    if (validNumbers.length === 0) {
      setLcm(0);
      setGcd(0);
      return;
    }

    if (validNumbers.length === 1) {
      setLcm(Math.abs(Math.round(validNumbers[0])));
      setGcd(Math.abs(Math.round(validNumbers[0])));
      return;
    }

    // Calculate LCM by reducing array
    const lcmResult = validNumbers.reduce((acc, curr) => 
      calculateLCMTwo(acc, curr)
    );
    setLcm(Math.round(lcmResult));

    // Calculate GCD by reducing array
    const gcdResult = validNumbers.reduce((acc, curr) => 
      calculateGCD(acc, curr)
    );
    setGcd(Math.round(gcdResult));
  };

  // Function to update number at index
  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  // Function to add new number input
  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  // Function to remove number at index
  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      setNumbers(newNumbers);
    }
  };

  // Function to copy result to clipboard
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Function to reset values
  const handleReset = () => {
    setNumbers(['12', '18']);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Least Common Multiple Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate LCM and GCD of multiple numbers
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Input Numbers
          </h2>
          
          <div className="space-y-4">
            {/* Number Inputs */}
            {numbers.map((num, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor={`number-${index}`}>Number {index + 1}</Label>
                  <Input
                    id={`number-${index}`}
                    type="number"
                    step="1"
                    value={num}
                    onChange={(e) => updateNumber(index, e.target.value)}
                    placeholder={`Enter number ${index + 1}`}
                    className="mt-2"
                  />
                </div>
                {numbers.length > 2 && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeNumber(index)}
                    className="mt-8"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}

            {/* Add Number Button */}
            <Button onClick={addNumber} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Another Number
            </Button>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              {/* LCM Display */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Least Common Multiple</h3>
                    <div className="text-4xl font-bold">
                      {lcm.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      LCM({numbers.filter(n => n).join(', ')})
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(lcm.toString(), 'LCM')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* GCD Display */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Greatest Common Divisor</h3>
                    <div className="text-4xl font-bold">
                      {gcd.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      GCD({numbers.filter(n => n).join(', ')})
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(gcd.toString(), 'GCD')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Multiples and Factors */}
            {lcm > 0 && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">First 5 Common Multiples</h3>
                  <div className="text-sm space-y-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i}>{i}. {(lcm * i).toLocaleString()}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Relationship</h3>
                  <div className="text-sm">
                    <p>LCM ÷ GCD = {(lcm / gcd).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      The LCM is the smallest number divisible by all inputs
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Prime Factorization Info */}
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <h3 className="font-semibold mb-2">How LCM is Calculated</h3>
              <p className="text-sm text-muted-foreground">
                The LCM is calculated using the formula: LCM(a,b) = (a × b) / GCD(a,b). 
                For multiple numbers, this is applied iteratively. The GCD is found using the Euclidean algorithm.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About LCM and GCD</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">LCM Definition</h3>
              <p className="text-muted-foreground text-sm">
                The Least Common Multiple (LCM) is the smallest positive integer that is divisible by all given numbers.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">GCD Definition</h3>
              <p className="text-muted-foreground text-sm">
                The Greatest Common Divisor (GCD) is the largest positive integer that divides all given numbers without remainder.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in fraction simplification, finding common denominators, scheduling problems, and solving number theory problems.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LeastCommonMultipleCalculator;
