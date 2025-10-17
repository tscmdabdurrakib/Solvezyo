import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PermutationCombinationCalculator Component
 * 
 * Calculates permutations and combinations
 * Permutation (order matters): P(n,r) = n! / (n-r)!
 * Combination (order doesn't matter): C(n,r) = n! / (r! × (n-r)!)
 */
export function PermutationCombinationCalculator() {
  const [calculationType, setCalculationType] = useState<string>('combination');
  const [n, setN] = useState<string>('10');
  const [r, setR] = useState<string>('3');
  const [result, setResult] = useState<number>(0);
  const [permutation, setPermutation] = useState<number>(0);
  const [combination, setCombination] = useState<number>(0);
  const [nFactorial, setNFactorial] = useState<number>(0);
  const [rFactorial, setRFactorial] = useState<number>(0);
  const { toast } = useToast();

  // Calculate when inputs change
  useEffect(() => {
    calculateResult();
  }, [calculationType, n, r]);

  // Function to calculate factorial
  const factorial = (num: number): number => {
    if (num < 0) return 0;
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
      // Prevent overflow for large numbers
      if (result === Infinity) return Infinity;
    }
    return result;
  };

  // Function to calculate permutation and combination
  const calculateResult = () => {
    const nVal = parseInt(n) || 0;
    const rVal = parseInt(r) || 0;

    if (nVal < 0 || rVal < 0 || rVal > nVal) {
      setResult(0);
      setPermutation(0);
      setCombination(0);
      setNFactorial(0);
      setRFactorial(0);
      return;
    }

    // Calculate factorials
    const nFact = factorial(nVal);
    const rFact = factorial(rVal);
    const nMinusRFact = factorial(nVal - rVal);

    setNFactorial(nFact);
    setRFactorial(rFact);

    // Calculate permutation: P(n,r) = n! / (n-r)!
    const perm = nMinusRFact !== 0 ? nFact / nMinusRFact : 0;
    setPermutation(perm);

    // Calculate combination: C(n,r) = n! / (r! × (n-r)!)
    const comb = (rFact !== 0 && nMinusRFact !== 0) ? nFact / (rFact * nMinusRFact) : 0;
    setCombination(comb);

    // Set result based on calculation type
    if (calculationType === 'permutation') {
      setResult(perm);
    } else {
      setResult(comb);
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
    setN('10');
    setR('3');
    setCalculationType('combination');
  };

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num === Infinity) return '∞ (too large)';
    if (num >= 1e15) return num.toExponential(2);
    return num.toLocaleString();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Permutation and Combination Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate permutations (order matters) and combinations (order doesn't matter)
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shuffle className="mr-2 h-5 w-5" /> Calculation Parameters
          </h2>
          
          <div className="space-y-4">
            {/* Calculation Type */}
            <div>
              <Label htmlFor="calculationType">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="combination">Combination (C) - Order doesn't matter</SelectItem>
                  <SelectItem value="permutation">Permutation (P) - Order matters</SelectItem>
                  <SelectItem value="both">Both P and C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Total Items (n) */}
            <div>
              <Label htmlFor="n">Total Items (n)</Label>
              <Input
                id="n"
                type="number"
                value={n}
                onChange={(e) => setN(e.target.value)}
                placeholder="Total number of items"
                className="mt-2"
                min="0"
                max="170"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Total number of items in the set (max 170 for factorial calculation)
              </p>
            </div>

            {/* Items to Choose (r) */}
            <div>
              <Label htmlFor="r">Items to Choose (r)</Label>
              <Input
                id="r"
                type="number"
                value={r}
                onChange={(e) => setR(e.target.value)}
                placeholder="Number of items to choose"
                className="mt-2"
                min="0"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Number of items to select from the total (r ≤ n)
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Formula:</h3>
              {calculationType === 'permutation' && (
                <p className="text-sm text-muted-foreground">
                  P(n,r) = n! / (n-r)! = {n}! / ({n}-{r})!
                </p>
              )}
              {calculationType === 'combination' && (
                <p className="text-sm text-muted-foreground">
                  C(n,r) = n! / (r! × (n-r)!) = {n}! / ({r}! × ({n}-{r})!)
                </p>
              )}
              {calculationType === 'both' && (
                <>
                  <p className="text-sm text-muted-foreground">
                    P(n,r) = n! / (n-r)! = {n}! / ({n}-{r})!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    C(n,r) = n! / (r! × (n-r)!) = {n}! / ({r}! × ({n}-{r})!)
                  </p>
                </>
              )}
            </div>

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
            
            {/* Primary Result */}
            {calculationType !== 'both' && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {calculationType === 'permutation' ? 'Permutation P(n,r)' : 'Combination C(n,r)'}
                    </h3>
                    <div className="text-4xl font-bold">
                      {formatNumber(result)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {calculationType === 'permutation' 
                        ? 'Number of ordered arrangements' 
                        : 'Number of unordered selections'}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(formatNumber(result), calculationType === 'permutation' ? 'Permutation' : 'Combination')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Both Results */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Permutation */}
              {(calculationType === 'permutation' || calculationType === 'both') && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Permutation P({n},{r})</h3>
                      <div className="text-3xl font-bold">
                        {formatNumber(permutation)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Order matters</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(formatNumber(permutation), 'Permutation')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Combination */}
              {(calculationType === 'combination' || calculationType === 'both') && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Combination C({n},{r})</h3>
                      <div className="text-3xl font-bold">
                        {formatNumber(combination)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Order doesn't matter</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(formatNumber(combination), 'Combination')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* n! */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">n! ({n}!)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatNumber(nFactorial)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Factorial of n
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(formatNumber(nFactorial), 'n Factorial')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* r! */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">r! ({r}!)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatNumber(rFactorial)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Factorial of r
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(formatNumber(rFactorial), 'r Factorial')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Ratio */}
              {calculationType === 'both' && permutation > 0 && (
                <div className="bg-muted/50 p-4 rounded-lg md:col-span-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">P/C Ratio</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {(permutation / combination).toFixed(2)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Permutations are {(permutation / combination).toFixed(0)}× more than combinations
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Permutations and Combinations</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Permutations</h3>
              <p className="text-muted-foreground text-sm">
                Order matters! P(n,r) = n!/(n-r)!. Use when arrangement sequence is important (passwords, rankings, race positions).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Combinations</h3>
              <p className="text-muted-foreground text-sm">
                Order doesn't matter! C(n,r) = n!/(r!×(n-r)!). Use when selection order is irrelevant (lottery, committees, card hands).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in probability, statistics, cryptography, genetics, lottery calculations, scheduling, and tournament planning.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PermutationCombinationCalculator;
