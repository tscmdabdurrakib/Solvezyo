import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PrimeFactorizationCalculator Component
 * 
 * Finds the prime factorization of a number
 */
export function PrimeFactorizationCalculator() {
  const [number, setNumber] = useState<string>('60');
  const [primeFactors, setPrimeFactors] = useState<number[]>([]);
  const [uniqueFactors, setUniqueFactors] = useState<Map<number, number>>(new Map());
  const [isPrime, setIsPrime] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    calculatePrimeFactorization();
  }, [number]);

  const calculatePrimeFactorization = () => {
    const num = parseInt(number);
    
    if (isNaN(num) || num <= 1) {
      setPrimeFactors([]);
      setUniqueFactors(new Map());
      setIsPrime(false);
      return;
    }

    // Check if prime
    if (checkIsPrime(num)) {
      setPrimeFactors([num]);
      setUniqueFactors(new Map([[num, 1]]));
      setIsPrime(true);
      return;
    }

    setIsPrime(false);

    // Find prime factors
    const factors: number[] = [];
    const factorCount = new Map<number, number>();
    let n = num;
    let divisor = 2;

    while (n > 1) {
      while (n % divisor === 0) {
        factors.push(divisor);
        factorCount.set(divisor, (factorCount.get(divisor) || 0) + 1);
        n = n / divisor;
      }
      divisor++;
      if (divisor * divisor > n && n > 1) {
        factors.push(n);
        factorCount.set(n, (factorCount.get(n) || 0) + 1);
        break;
      }
    }

    setPrimeFactors(factors);
    setUniqueFactors(factorCount);
  };

  const checkIsPrime = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleReset = () => {
    setNumber('60');
  };

  const num = parseInt(number);
  const isValidNumber = !isNaN(num) && num > 1;

  // Build factorization string with exponents
  const factorizationString = Array.from(uniqueFactors.entries())
    .map(([prime, count]) => count > 1 ? `${prime}^${count}` : `${prime}`)
    .join(' × ');

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Prime Factorization Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Find the prime factorization of any positive integer
        </p>
      </div>

      <div className="grid gap-6">
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
                min="2"
                step="1"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a positive integer greater than 1"
                className="mt-2"
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {isValidNumber && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              {isPrime ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Prime Number</h3>
                      <div className="text-4xl font-bold">{num}</div>
                      <p className="text-sm text-muted-foreground mt-2">
                        This number is prime and cannot be factored further.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Prime Factorization</h3>
                        <div className="text-3xl font-bold">{factorizationString}</div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {num} = {factorizationString}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(factorizationString, 'Prime Factorization')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-muted-foreground">All Prime Factors</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            (Including duplicates)
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(primeFactors.join(', '), 'All Factors')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {primeFactors.map((factor, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-background rounded-md text-sm font-semibold"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Unique Prime Factors</h3>
                      <div className="space-y-2">
                        {Array.from(uniqueFactors.entries()).map(([prime, count]) => (
                          <div key={prime} className="flex justify-between items-center px-3 py-2 bg-background rounded-md text-sm">
                            <span className="font-semibold">{prime}</span>
                            <span className="text-muted-foreground">× {count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Prime Factorization</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is it?</h3>
              <p className="text-muted-foreground text-sm">
                Prime factorization expresses a number as a product of prime numbers.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Fundamental Theorem</h3>
              <p className="text-muted-foreground text-sm">
                Every integer greater than 1 has a unique prime factorization.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in cryptography, number theory, and finding GCD/LCM.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PrimeFactorizationCalculator;
