import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Divide } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * RatioCalculator Component
 * 
 * Calculates and simplifies ratios between values
 */
export function RatioCalculator() {
  const [value1, setValue1] = useState<string>('12');
  const [value2, setValue2] = useState<string>('16');
  const [simplifiedRatio, setSimplifiedRatio] = useState<string>('');
  const [decimal, setDecimal] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [gcd, setGcd] = useState<number>(1);
  const { toast } = useToast();

  // Calculate ratio when inputs change
  useEffect(() => {
    calculateRatio();
  }, [value1, value2]);

  // Function to calculate GCD using Euclidean algorithm
  const calculateGCD = (a: number, b: number): number => {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    
    if (b === 0) return a;
    return calculateGCD(b, a % b);
  };

  // Function to calculate ratio
  const calculateRatio = () => {
    const v1 = parseFloat(value1) || 0;
    const v2 = parseFloat(value2) || 1;

    if (v2 === 0) {
      setSimplifiedRatio('Undefined');
      setDecimal(0);
      setPercentage(0);
      setGcd(1);
      return;
    }

    // Calculate GCD for simplification
    const gcdValue = calculateGCD(v1, v2);
    setGcd(gcdValue);

    // Simplify the ratio
    const simplified1 = Math.round(v1 / gcdValue);
    const simplified2 = Math.round(v2 / gcdValue);
    setSimplifiedRatio(`${simplified1}:${simplified2}`);

    // Calculate decimal form
    const decimalValue = v1 / v2;
    setDecimal(decimalValue);

    // Calculate percentage
    const percentageValue = (v1 / v2) * 100;
    setPercentage(percentageValue);
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
    setValue1('12');
    setValue2('16');
  };

  // Function to swap values
  const handleSwap = () => {
    const temp = value1;
    setValue1(value2);
    setValue2(temp);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Ratio Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate and simplify ratios between two values
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Divide className="mr-2 h-5 w-5" /> Input Values
          </h2>
          
          <div className="space-y-4">
            {/* Value 1 */}
            <div>
              <Label htmlFor="value1">First Value</Label>
              <Input
                id="value1"
                type="number"
                step="any"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder="Enter first value"
                className="mt-2"
              />
            </div>

            {/* Value 2 */}
            <div>
              <Label htmlFor="value2">Second Value</Label>
              <Input
                id="value2"
                type="number"
                step="any"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="Enter second value"
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleSwap} variant="outline">
                ⇅ Swap Values
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
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            {/* Simplified Ratio Display */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Simplified Ratio</h3>
                  <div className="text-4xl font-bold">
                    {simplifiedRatio}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {value1} : {value2} = {simplifiedRatio}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(simplifiedRatio, 'Ratio')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Decimal Form */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Decimal Form</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {decimal.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {value1} ÷ {value2}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(decimal.toFixed(6), 'Decimal')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Percentage */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Percentage</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {percentage.toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Relative to second value
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(percentage.toFixed(2), 'Percentage')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* GCD */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Greatest Common Divisor</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {gcd}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Used for simplification
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

            {/* Additional Information */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Inverse Ratio</h3>
                <div className="text-xl font-bold">
                  {value2} : {value1} = {simplifiedRatio.split(':').reverse().join(':')}
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Parts of Total</h3>
                <div className="text-sm">
                  Total parts: {parseFloat(value1) + parseFloat(value2)}<br/>
                  First: {((parseFloat(value1) / (parseFloat(value1) + parseFloat(value2))) * 100).toFixed(2)}%<br/>
                  Second: {((parseFloat(value2) / (parseFloat(value1) + parseFloat(value2))) * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Ratios</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is a Ratio?</h3>
              <p className="text-muted-foreground text-sm">
                A ratio expresses the relationship between two quantities, showing how many times one value contains another.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Simplification</h3>
              <p className="text-muted-foreground text-sm">
                Ratios are simplified by dividing both values by their greatest common divisor (GCD) to get the lowest terms.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Ratios are used in cooking, finance, engineering, map scaling, mixing chemicals, and comparing quantities.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RatioCalculator;
