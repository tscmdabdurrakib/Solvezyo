import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calculator, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * CommonFactorCalculator Component
 * 
 * Finds all common factors of two or more numbers
 */
export function CommonFactorCalculator() {
  const [numbers, setNumbers] = useState<string[]>(['12', '18']);
  const [commonFactors, setCommonFactors] = useState<number[]>([]);
  const [gcf, setGcf] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    calculateCommonFactors();
  }, [numbers]);

  // Find all factors of a number
  const findFactors = (num: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  };

  // Find GCF using Euclidean algorithm
  const gcdTwo = (a: number, b: number): number => {
    return b === 0 ? a : gcdTwo(b, a % b);
  };

  const calculateCommonFactors = () => {
    const validNumbers = numbers
      .map(n => parseInt(n))
      .filter(n => !isNaN(n) && n > 0);

    if (validNumbers.length === 0) {
      setCommonFactors([]);
      setGcf(0);
      return;
    }

    if (validNumbers.length === 1) {
      const factors = findFactors(validNumbers[0]);
      setCommonFactors(factors);
      setGcf(validNumbers[0]);
      return;
    }

    // Find GCF first
    let result = validNumbers[0];
    for (let i = 1; i < validNumbers.length; i++) {
      result = gcdTwo(result, validNumbers[i]);
    }
    setGcf(result);

    // Find all common factors (factors of GCF)
    const commonFactorList = findFactors(result);
    setCommonFactors(commonFactorList);
  };

  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      setNumbers(newNumbers);
    }
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleReset = () => {
    setNumbers(['12', '18']);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Common Factor Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Find all common factors of two or more numbers
        </p>
      </div>

      <div className="grid gap-6">
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

        {commonFactors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Greatest Common Factor (GCF)
                    </h3>
                    <div className="text-4xl font-bold">{gcf}</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Numbers: {numbers.filter(n => n && !isNaN(parseInt(n))).join(', ')}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(gcf.toString(), 'GCF')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">All Common Factors</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total: {commonFactors.length} common factors
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(commonFactors.join(', '), 'Common Factors')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {commonFactors.map((factor, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-md text-sm font-semibold ${
                        factor === gcf
                          ? 'bg-green-100 dark:bg-green-900/30 ring-2 ring-green-500'
                          : 'bg-background'
                      }`}
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Common Factors</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What are they?</h3>
              <p className="text-muted-foreground text-sm">
                Common factors are numbers that divide evenly into all the given numbers.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">GCF is Highlighted</h3>
              <p className="text-muted-foreground text-sm">
                The greatest common factor is highlighted in green - it's the largest common factor.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Relationship</h3>
              <p className="text-muted-foreground text-sm">
                All common factors are actually factors of the GCF itself.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CommonFactorCalculator;
