import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * RootCalculator Component
 * 
 * Calculates nth root of a number
 * ⁿ√x = x^(1/n)
 */
export function RootCalculator() {
  const [value, setValue] = useState<string>('64');
  const [rootIndex, setRootIndex] = useState<string>('2');
  const [result, setResult] = useState<number>(0);
  const [power, setPower] = useState<number>(0);
  const { toast } = useToast();

  // Calculate root when inputs change
  useEffect(() => {
    calculateRoot();
  }, [value, rootIndex]);

  // Function to calculate root
  const calculateRoot = () => {
    const val = parseFloat(value) || 0;
    const n = parseFloat(rootIndex) || 1;

    if (n === 0) {
      setResult(0);
      setPower(0);
      return;
    }

    // Check for negative value with even root
    if (val < 0 && n % 2 === 0) {
      setResult(NaN);
      setPower(0);
      return;
    }

    // Calculate nth root: ⁿ√x = x^(1/n)
    let res: number;
    if (val < 0 && n % 2 !== 0) {
      // For odd roots of negative numbers
      res = -Math.pow(Math.abs(val), 1 / n);
    } else {
      res = Math.pow(val, 1 / n);
    }

    setResult(res);

    // Verify: result^n should equal original value
    const verification = Math.pow(res, n);
    setPower(verification);
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
    setValue('64');
    setRootIndex('2');
  };

  // Quick root selection
  const setQuickRoot = (root: string, val: string) => {
    setRootIndex(root);
    setValue(val);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Root Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate nth root of any number (square root, cube root, etc.)
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Input Values
          </h2>
          
          <div className="space-y-4">
            {/* Quick Options */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <Label className="mb-3 block">Quick Selection:</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickRoot('2', '64')}
                >
                  Square Root
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickRoot('3', '27')}
                >
                  Cube Root
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickRoot('4', '16')}
                >
                  Fourth Root
                </Button>
              </div>
            </div>

            {/* Value */}
            <div>
              <Label htmlFor="value">Number (x)</Label>
              <Input
                id="value"
                type="number"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter number"
                className="mt-2"
              />
            </div>

            {/* Root Index */}
            <div>
              <Label htmlFor="rootIndex">Root Index (n)</Label>
              <Input
                id="rootIndex"
                type="number"
                step="1"
                value={rootIndex}
                onChange={(e) => setRootIndex(e.target.value)}
                placeholder="Enter root index"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                2 = square root, 3 = cube root, etc.
              </p>
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
            
            {/* Result Display */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {rootIndex === '2' ? 'Square Root' :
                     rootIndex === '3' ? 'Cube Root' :
                     `${rootIndex}th Root`}
                  </h3>
                  <div className="text-4xl font-bold">
                    {isNaN(result) ? 'Not a real number' : result.toFixed(8)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {!isNaN(result) && `${rootIndex}√${value} = ${result.toFixed(6)}`}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(result.toFixed(8), 'Root')}
                  disabled={isNaN(result)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isNaN(result) && (
              <div className="grid gap-4 md:grid-cols-2">
                {/* Verification */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Verification</h3>
                      <div className="mt-1 text-xl font-bold">
                        ({result.toFixed(4)})^{rootIndex} ≈ {power.toFixed(4)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Should equal {value}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decimal Places */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Different Precisions</h3>
                  <div className="text-sm space-y-1">
                    <div>2 decimals: {result.toFixed(2)}</div>
                    <div>4 decimals: {result.toFixed(4)}</div>
                    <div>6 decimals: {result.toFixed(6)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Common Roots Reference */}
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <h3 className="font-semibold mb-2">Common Perfect Roots</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>√4 = 2</div>
                <div>√9 = 3</div>
                <div>√16 = 4</div>
                <div>√25 = 5</div>
                <div>³√8 = 2</div>
                <div>³√27 = 3</div>
                <div>³√64 = 4</div>
                <div>³√125 = 5</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Root Calculation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Definition</h3>
              <p className="text-muted-foreground text-sm">
                The nth root of x is a number that, when raised to the power n, equals x. Mathematically: ⁿ√x = x^(1/n)
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Special Cases</h3>
              <p className="text-muted-foreground text-sm">
                Square root (n=2) is most common. Even roots of negative numbers are not real. Odd roots can be negative.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in algebra, geometry, physics, engineering, statistics, and calculating compound interest or growth rates.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RootCalculator;
