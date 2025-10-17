import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Plus, Minus, X, Divide } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * FractionCalculator Component
 * 
 * Perform arithmetic operations on fractions with automatic simplification
 */
export function FractionCalculator() {
  const { toast } = useToast();

  // State for first fraction
  const [numerator1, setNumerator1] = useState<number>(1);
  const [denominator1, setDenominator1] = useState<number>(2);
  
  // State for second fraction
  const [numerator2, setNumerator2] = useState<number>(1);
  const [denominator2, setDenominator2] = useState<number>(3);
  
  // State for operation
  const [operation, setOperation] = useState<string>('add');
  
  // State for results
  const [resultNum, setResultNum] = useState<number>(0);
  const [resultDenom, setResultDenom] = useState<number>(1);
  const [simplifiedNum, setSimplifiedNum] = useState<number>(0);
  const [simplifiedDenom, setSimplifiedDenom] = useState<number>(1);
  const [decimal, setDecimal] = useState<number>(0);
  const [mixed, setMixed] = useState<{ whole: number; num: number; denom: number }>({ whole: 0, num: 0, denom: 1 });

  // Calculate result when inputs change
  useEffect(() => {
    calculateFraction();
  }, [numerator1, denominator1, numerator2, denominator2, operation]);

  // Function to find GCD (Greatest Common Divisor)
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Function to simplify fraction
  const simplifyFraction = (num: number, denom: number): { num: number; denom: number } => {
    if (denom === 0) return { num: 0, denom: 1 };
    
    const divisor = gcd(num, denom);
    let simplifiedNum = num / divisor;
    let simplifiedDenom = denom / divisor;
    
    // Keep denominator positive
    if (simplifiedDenom < 0) {
      simplifiedNum = -simplifiedNum;
      simplifiedDenom = -simplifiedDenom;
    }
    
    return { num: simplifiedNum, denom: simplifiedDenom };
  };

  // Function to convert improper fraction to mixed number
  const toMixedNumber = (num: number, denom: number): { whole: number; num: number; denom: number } => {
    const whole = Math.floor(Math.abs(num) / denom);
    const remainder = Math.abs(num) % denom;
    const sign = num < 0 ? -1 : 1;
    
    return {
      whole: whole * sign,
      num: remainder,
      denom: denom
    };
  };

  // Function to calculate fraction operations
  const calculateFraction = () => {
    let num: number;
    let denom: number;

    switch (operation) {
      case 'add':
        // a/b + c/d = (ad + bc) / bd
        num = numerator1 * denominator2 + numerator2 * denominator1;
        denom = denominator1 * denominator2;
        break;
      
      case 'subtract':
        // a/b - c/d = (ad - bc) / bd
        num = numerator1 * denominator2 - numerator2 * denominator1;
        denom = denominator1 * denominator2;
        break;
      
      case 'multiply':
        // a/b × c/d = (ac) / (bd)
        num = numerator1 * numerator2;
        denom = denominator1 * denominator2;
        break;
      
      case 'divide':
        // a/b ÷ c/d = (ad) / (bc)
        num = numerator1 * denominator2;
        denom = denominator1 * numerator2;
        break;
      
      default:
        num = 0;
        denom = 1;
    }

    // Simplify the result
    const simplified = simplifyFraction(num, denom);
    const mixedNum = toMixedNumber(simplified.num, simplified.denom);
    
    setResultNum(num);
    setResultDenom(denom);
    setSimplifiedNum(simplified.num);
    setSimplifiedDenom(simplified.denom);
    setDecimal(denom !== 0 ? num / denom : 0);
    setMixed(mixedNum);
  };

  // Function to reset all values
  const handleReset = () => {
    setNumerator1(1);
    setDenominator1(2);
    setNumerator2(1);
    setDenominator2(3);
    setOperation('add');
  };

  // Get operation symbol
  const getOperationSymbol = () => {
    switch (operation) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '+';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Fraction Calculation:
${numerator1}/${denominator1} ${getOperationSymbol()} ${numerator2}/${denominator2}

Result: ${resultNum}/${resultDenom}
Simplified: ${simplifiedNum}/${simplifiedDenom}
${mixed.whole !== 0 ? `Mixed Number: ${mixed.whole} ${mixed.num}/${mixed.denom}` : ''}
Decimal: ${decimal.toFixed(6)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Fraction Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Add, subtract, multiply, and divide fractions with automatic simplification
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Fraction Operations</h2>
          
          <div className="space-y-6">
            {/* First Fraction */}
            <div>
              <Label className="mb-2 block">First Fraction</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Numerator"
                  value={numerator1}
                  onChange={(e) => setNumerator1(Number(e.target.value))}
                  className="text-center"
                />
                <div className="text-2xl font-bold">/</div>
                <Input
                  type="number"
                  placeholder="Denominator"
                  value={denominator1}
                  onChange={(e) => setDenominator1(Number(e.target.value))}
                  className="text-center"
                />
              </div>
              <div className="mt-2 text-center">
                <div className="inline-block border-t-2 border-foreground px-4">
                  <div className="text-lg font-semibold">{numerator1}</div>
                </div>
                <div className="text-lg font-semibold">{denominator1}</div>
              </div>
            </div>

            {/* Operation Selection */}
            <div>
              <Label htmlFor="operation">Operation</Label>
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">
                    <div className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" /> Addition (+)
                    </div>
                  </SelectItem>
                  <SelectItem value="subtract">
                    <div className="flex items-center">
                      <Minus className="mr-2 h-4 w-4" /> Subtraction (-)
                    </div>
                  </SelectItem>
                  <SelectItem value="multiply">
                    <div className="flex items-center">
                      <X className="mr-2 h-4 w-4" /> Multiplication (×)
                    </div>
                  </SelectItem>
                  <SelectItem value="divide">
                    <div className="flex items-center">
                      <Divide className="mr-2 h-4 w-4" /> Division (÷)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Second Fraction */}
            <div>
              <Label className="mb-2 block">Second Fraction</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Numerator"
                  value={numerator2}
                  onChange={(e) => setNumerator2(Number(e.target.value))}
                  className="text-center"
                />
                <div className="text-2xl font-bold">/</div>
                <Input
                  type="number"
                  placeholder="Denominator"
                  value={denominator2}
                  onChange={(e) => setDenominator2(Number(e.target.value))}
                  className="text-center"
                />
              </div>
              <div className="mt-2 text-center">
                <div className="inline-block border-t-2 border-foreground px-4">
                  <div className="text-lg font-semibold">{numerator2}</div>
                </div>
                <div className="text-lg font-semibold">{denominator2}</div>
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Equation */}
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <div className="text-lg">
                      <span className="font-semibold">{numerator1}/{denominator1}</span>
                      {' '}{getOperationSymbol()}{' '}
                      <span className="font-semibold">{numerator2}/{denominator2}</span>
                      {' = '}
                    </div>
                  </div>

                  {/* Raw Result */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Result
                    </h3>
                    <div className="text-center">
                      <div className="inline-block border-t-4 border-blue-600 dark:border-blue-400 px-6">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{resultNum}</div>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{resultDenom}</div>
                    </div>
                  </div>
                  
                  {/* Simplified */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Simplified
                    </h3>
                    <div className="text-center">
                      <div className="inline-block border-t-4 border-purple-600 dark:border-purple-400 px-6">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{simplifiedNum}</div>
                      </div>
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{simplifiedDenom}</div>
                    </div>
                  </div>

                  {/* Mixed Number */}
                  {Math.abs(simplifiedNum) >= simplifiedDenom && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                        Mixed Number
                      </h3>
                      <div className="text-center text-2xl font-bold text-green-600 dark:text-green-400">
                        {mixed.whole !== 0 && <span>{mixed.whole} </span>}
                        {mixed.num !== 0 && (
                          <>
                            <span className="inline-block border-t-2 border-green-600 dark:border-green-400 px-2">
                              {mixed.num}
                            </span>
                            <span>/{mixed.denom}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Decimal */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                      Decimal Form
                    </h3>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {decimal.toFixed(6)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Fractions</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Fractions are automatically simplified to lowest terms
              </p>
              <p>
                • Improper fractions are converted to mixed numbers
              </p>
              <p>
                • Results include both fraction and decimal forms
              </p>
              <p>
                • The calculator handles positive and negative fractions
              </p>
              <p>
                • Avoid zero denominators for valid calculations
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FractionCalculator;
