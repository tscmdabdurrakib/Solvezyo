import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * FactorCalculator Component
 * 
 * Finds all factors of a given number
 */
export function FactorCalculator() {
  const [number, setNumber] = useState<string>('24');
  const [factors, setFactors] = useState<number[]>([]);
  const [primeFactors, setPrimeFactors] = useState<number[]>([]);
  const [factorPairs, setFactorPairs] = useState<[number, number][]>([]);
  const { toast } = useToast();

  // Calculate factors whenever number changes
  useEffect(() => {
    calculateFactors();
  }, [number]);

  // Find all factors of a number
  const calculateFactors = () => {
    const num = parseInt(number);
    
    if (isNaN(num) || num <= 0) {
      setFactors([]);
      setPrimeFactors([]);
      setFactorPairs([]);
      return;
    }

    // Find all factors
    const foundFactors: number[] = [];
    const pairs: [number, number][] = [];
    
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        foundFactors.push(i);
        if (i !== num / i) {
          foundFactors.push(num / i);
        }
        pairs.push([i, num / i]);
      }
    }
    
    foundFactors.sort((a, b) => a - b);
    setFactors(foundFactors);
    setFactorPairs(pairs);

    // Find prime factors
    const primes: number[] = [];
    let n = num;
    let divisor = 2;
    
    while (n > 1) {
      while (n % divisor === 0) {
        primes.push(divisor);
        n = n / divisor;
      }
      divisor++;
      if (divisor * divisor > n && n > 1) {
        primes.push(n);
        break;
      }
    }
    
    setPrimeFactors(primes);
  };

  // Check if a number is prime
  const isPrime = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
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
    setNumber('24');
  };

  const num = parseInt(number);
  const isValidNumber = !isNaN(num) && num > 0;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Factor Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Find all factors and prime factorization of any positive integer
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Enter Number
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                type="number"
                min="1"
                step="1"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a positive integer"
                className="mt-2"
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {isValidNumber && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              {/* Number Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Number</h3>
                    <div className="text-4xl font-bold">{num}</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {isPrime(num) ? 'This is a prime number' : 'This is a composite number'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {/* All Factors */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">All Factors</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Total: {factors.length} factors
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(factors.join(', '), 'Factors')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {factors.map((factor, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-background rounded-md text-sm font-semibold"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prime Factorization */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Prime Factorization</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {num} = {primeFactors.join(' × ')}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(primeFactors.join(' × '), 'Prime Factorization')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {primeFactors.map((prime, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-md text-sm font-semibold"
                      >
                        {prime}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Factor Pairs */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Factor Pairs</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pairs of factors that multiply to {num}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    {factorPairs.map((pair, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-background rounded-md text-sm font-mono"
                      >
                        {pair[0]} × {pair[1]} = {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Factors</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What are Factors?</h3>
              <p className="text-muted-foreground text-sm">
                Factors are whole numbers that divide evenly into another number without leaving a remainder.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Prime Factorization</h3>
              <p className="text-muted-foreground text-sm">
                Every composite number can be expressed as a unique product of prime numbers.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Factor Pairs</h3>
              <p className="text-muted-foreground text-sm">
                Factor pairs are two factors that multiply together to give the original number.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default FactorCalculator;
