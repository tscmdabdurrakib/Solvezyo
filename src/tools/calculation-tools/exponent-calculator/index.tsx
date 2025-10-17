import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Superscript } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ExponentCalculator Component
 * 
 * Calculates exponents and power operations:
 * - Basic exponentiation (base^exponent)
 * - Scientific notation support
 * - Negative exponents
 */
export function ExponentCalculator() {
  const [base, setBase] = useState<string>('2');
  const [exponent, setExponent] = useState<string>('3');
  const [result, setResult] = useState<number>(0);
  const [scientificNotation, setScientificNotation] = useState<string>('');
  const [reciprocal, setReciprocal] = useState<number>(0);
  
  const { toast } = useToast();

  // Calculate exponentiation
  useEffect(() => {
    const b = parseFloat(base) || 0;
    const e = parseFloat(exponent) || 0;

    // Calculate base^exponent
    const res = Math.pow(b, e);
    setResult(res);

    // Scientific notation
    setScientificNotation(res.toExponential(6));

    // Reciprocal (1/result)
    if (res !== 0) {
      setReciprocal(1 / res);
    } else {
      setReciprocal(0);
    }
  }, [base, exponent]);

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
    setBase('2');
    setExponent('3');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Exponent Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate powers and exponents with detailed results
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Superscript className="mr-2 h-5 w-5" /> Power Calculation
          </h2>
          
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="base">Base</Label>
                <Input
                  id="base"
                  type="number"
                  step="0.001"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  placeholder="Enter base number"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="exponent">Exponent (Power)</Label>
                <Input
                  id="exponent"
                  type="number"
                  step="0.001"
                  value={exponent}
                  onChange={(e) => setExponent(e.target.value)}
                  placeholder="Enter exponent"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-lg font-medium">
                {base}<sup>{exponent}</sup> = ?
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
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
                  <div className="text-4xl font-bold break-all">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 10 })}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {base}<sup>{exponent}</sup> = {result}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(result.toString(), 'Result')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Scientific Notation</h3>
                    <div className="mt-1 text-xl font-bold break-all">
                      {scientificNotation}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(scientificNotation, 'Scientific Notation')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Reciprocal (1/result)</h3>
                    <div className="mt-1 text-xl font-bold break-all">
                      {reciprocal.toLocaleString(undefined, { maximumFractionDigits: 10 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(reciprocal.toString(), 'Reciprocal')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Square Root of Result</h3>
                    <div className="mt-1 text-xl font-bold break-all">
                      {Math.sqrt(Math.abs(result)).toLocaleString(undefined, { maximumFractionDigits: 10 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(Math.sqrt(Math.abs(result)).toString(), 'Square Root')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Natural Log of Result</h3>
                    <div className="mt-1 text-xl font-bold break-all">
                      {result > 0 ? Math.log(result).toFixed(10) : 'N/A'}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => result > 0 && copyToClipboard(Math.log(result).toString(), 'Natural Log')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Exponentiation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Exponent Rules</h3>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• x<sup>0</sup> = 1</li>
                <li>• x<sup>1</sup> = x</li>
                <li>• x<sup>-n</sup> = 1/x<sup>n</sup></li>
                <li>• x<sup>a</sup> × x<sup>b</sup> = x<sup>a+b</sup></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Negative Exponents</h3>
              <p className="text-muted-foreground text-sm">
                A negative exponent means division. For example, 2<sup>-3</sup> = 1/2<sup>3</sup> = 1/8 = 0.125
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Fractional Exponents</h3>
              <p className="text-muted-foreground text-sm">
                Fractional exponents represent roots. For example, x<sup>1/2</sup> = √x and x<sup>1/3</sup> = ∛x
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ExponentCalculator;
