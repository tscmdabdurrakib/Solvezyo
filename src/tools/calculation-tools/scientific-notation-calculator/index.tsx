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
 * ScientificNotationCalculator Component
 * 
 * Converts numbers to and from scientific notation
 */
export function ScientificNotationCalculator() {
  const [number, setNumber] = useState<string>('12345');
  const [mode, setMode] = useState<'toScientific' | 'fromScientific'>('toScientific');
  const [coefficient, setCoefficient] = useState<string>('1.2345');
  const [exponent, setExponent] = useState<string>('4');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    calculateConversion();
  }, [number, mode, coefficient, exponent]);

  const calculateConversion = () => {
    if (mode === 'toScientific') {
      const num = parseFloat(number);
      if (isNaN(num) || num === 0) {
        setResult('');
        return;
      }
      
      const exp = Math.floor(Math.log10(Math.abs(num)));
      const coef = num / Math.pow(10, exp);
      setResult(`${coef.toFixed(4)} × 10^${exp}`);
    } else {
      const coef = parseFloat(coefficient);
      const exp = parseInt(exponent);
      
      if (isNaN(coef) || isNaN(exp)) {
        setResult('');
        return;
      }
      
      const num = coef * Math.pow(10, exp);
      setResult(num.toLocaleString('en-US', { maximumFractionDigits: 10 }));
    }
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleReset = () => {
    setNumber('12345');
    setCoefficient('1.2345');
    setExponent('4');
    setMode('toScientific');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Scientific Notation Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Convert numbers to and from scientific notation
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Conversion Mode
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label>Mode</Label>
              <Select value={mode} onValueChange={(v: any) => setMode(v)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toScientific">Number → Scientific Notation</SelectItem>
                  <SelectItem value="fromScientific">Scientific Notation → Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === 'toScientific' ? (
              <div>
                <Label htmlFor="number">Enter Number</Label>
                <Input
                  id="number"
                  type="number"
                  step="any"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="e.g., 12345 or 0.00123"
                  className="mt-2"
                />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="coefficient">Coefficient (a)</Label>
                  <Input
                    id="coefficient"
                    type="number"
                    step="any"
                    value={coefficient}
                    onChange={(e) => setCoefficient(e.target.value)}
                    placeholder="e.g., 1.2345"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="exponent">Exponent (n)</Label>
                  <Input
                    id="exponent"
                    type="number"
                    step="1"
                    value={exponent}
                    onChange={(e) => setExponent(e.target.value)}
                    placeholder="e.g., 4"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">a × 10^n</p>
                </div>
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Result</h2>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {mode === 'toScientific' ? 'Scientific Notation' : 'Standard Form'}
                    </h3>
                    <div className="text-3xl font-bold break-all">{result}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(result, 'Result')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Scientific Notation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is it?</h3>
              <p className="text-muted-foreground text-sm">
                Scientific notation expresses numbers as a × 10^n, where 1 ≤ |a| &lt; 10 and n is an integer.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">When to Use</h3>
              <p className="text-muted-foreground text-sm">
                Ideal for very large (e.g., 3.0 × 10^8) or very small numbers (e.g., 1.6 × 10^-19).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Examples</h3>
              <p className="text-muted-foreground text-sm">
                Speed of light: 299,792,458 m/s = 2.998 × 10^8 m/s
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ScientificNotationCalculator;
