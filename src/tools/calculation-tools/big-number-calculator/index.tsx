import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calculator, Plus, Minus, X, Divide } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BigNumberCalculator Component
 * 
 * Performs arithmetic operations on very large numbers with high precision
 */
export function BigNumberCalculator() {
  const [numberA, setNumberA] = useState<string>('123456789012345678901234567890');
  const [numberB, setNumberB] = useState<string>('987654321098765432109876543210');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    calculateResult();
  }, [numberA, numberB, operation]);

  // BigInt addition
  const addBigNumbers = (a: string, b: string): string => {
    try {
      return (BigInt(a) + BigInt(b)).toString();
    } catch {
      return 'Invalid input';
    }
  };

  // BigInt subtraction
  const subtractBigNumbers = (a: string, b: string): string => {
    try {
      return (BigInt(a) - BigInt(b)).toString();
    } catch {
      return 'Invalid input';
    }
  };

  // BigInt multiplication
  const multiplyBigNumbers = (a: string, b: string): string => {
    try {
      return (BigInt(a) * BigInt(b)).toString();
    } catch {
      return 'Invalid input';
    }
  };

  // BigInt division
  const divideBigNumbers = (a: string, b: string): string => {
    try {
      const divisor = BigInt(b);
      if (divisor === BigInt(0)) return 'Cannot divide by zero';
      return (BigInt(a) / divisor).toString();
    } catch {
      return 'Invalid input';
    }
  };

  const calculateResult = () => {
    let res = '';
    
    switch (operation) {
      case 'add':
        res = addBigNumbers(numberA, numberB);
        break;
      case 'subtract':
        res = subtractBigNumbers(numberA, numberB);
        break;
      case 'multiply':
        res = multiplyBigNumbers(numberA, numberB);
        break;
      case 'divide':
        res = divideBigNumbers(numberA, numberB);
        break;
    }
    
    setResult(res);
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleReset = () => {
    setNumberA('123456789012345678901234567890');
    setNumberB('987654321098765432109876543210');
    setOperation('add');
  };

  const getOperationIcon = () => {
    switch (operation) {
      case 'add': return <Plus className="h-5 w-5" />;
      case 'subtract': return <Minus className="h-5 w-5" />;
      case 'multiply': return <X className="h-5 w-5" />;
      case 'divide': return <Divide className="h-5 w-5" />;
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Big Number Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Perform arithmetic operations on arbitrarily large integers
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Enter Big Numbers
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="numberA">First Number</Label>
              <Input
                id="numberA"
                type="text"
                value={numberA}
                onChange={(e) => setNumberA(e.target.value.replace(/[^0-9-]/g, ''))}
                placeholder="Enter a very large integer"
                className="mt-2 font-mono"
              />
            </div>

            <div>
              <Label>Operation</Label>
              <Select value={operation} onValueChange={(v: any) => setOperation(v)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Addition (+)</SelectItem>
                  <SelectItem value="subtract">Subtraction (−)</SelectItem>
                  <SelectItem value="multiply">Multiplication (×)</SelectItem>
                  <SelectItem value="divide">Division (÷)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="numberB">Second Number</Label>
              <Input
                id="numberB"
                type="text"
                value={numberB}
                onChange={(e) => setNumberB(e.target.value.replace(/[^0-9-]/g, ''))}
                placeholder="Enter a very large integer"
                className="mt-2 font-mono"
              />
            </div>

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
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                      Calculation Result {getOperationIcon()}
                    </h3>
                    <div className="text-2xl font-bold font-mono break-all">{result}</div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Number of digits: {result.replace(/[^0-9]/g, '').length}
                    </p>
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

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Expression</h3>
                <div className="text-sm font-mono break-all">
                  {numberA} {operation === 'add' ? '+' : operation === 'subtract' ? '−' : operation === 'multiply' ? '×' : '÷'} {numberB} = {result}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Big Number Calculations</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Arbitrary Precision</h3>
              <p className="text-muted-foreground text-sm">
                Uses JavaScript's BigInt to handle integers of any size without precision loss.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">No Limits</h3>
              <p className="text-muted-foreground text-sm">
                Calculate with numbers that exceed standard 64-bit integer limits (beyond 2^53-1).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Exact Results</h3>
              <p className="text-muted-foreground text-sm">
                All operations maintain exact precision - perfect for cryptography and scientific computing.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BigNumberCalculator;
