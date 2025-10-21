import React, { useState } from 'react';
import { Parser } from 'expr-eval';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Delete, RefreshCw, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ScientificCalculator Component
 * 
 * Full-featured scientific calculator with advanced mathematical functions
 */
export function ScientificCalculator() {
  const { toast } = useToast();

  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [lastResult, setLastResult] = useState<number | null>(null);

  // Handle number and operator input
  const handleInput = (value: string) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  // Handle backspace
  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  // Clear all
  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setLastResult(null);
  };

  // Calculate result
  const handleCalculate = () => {
    try {
      // Replace functions for evaluation
      // Replace user-friendly symbols with standard operators
      const expr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/√/g, 'sqrt')
        .replace(/π/g, 'pi');

      // Use the 'expr-eval' parser to safely evaluate the expression
      const parser = new Parser();
      const result = parser.evaluate(expr);
      
      setEquation(display + ' =');
      setDisplay(result.toString());
      setLastResult(result);
    } catch (error) {
      setDisplay('Error');
      toast({
        title: "Calculation Error",
        description: "Invalid expression",
        variant: "destructive",
      });
    }
  };

  // Scientific functions
  const handleFunction = (func: string) => {
    try {
      const value = parseFloat(display);
      let result: number;

      switch (func) {
        case 'sin':
          result = Math.sin(value);
          break;
        case 'cos':
          result = Math.cos(value);
          break;
        case 'tan':
          result = Math.tan(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'square':
          result = value * value;
          break;
        case 'inverse':
          result = 1 / value;
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'exp':
          result = Math.exp(value);
          break;
        case 'factorial':
          result = factorial(value);
          break;
        case 'percent':
          result = value / 100;
          break;
        default:
          result = value;
      }

      setEquation(`${func}(${display}) =`);
      setDisplay(result.toString());
      setLastResult(result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  // Factorial helper
  const factorial = (n: number): number => {
    if (n < 0 || n !== Math.floor(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Scientific Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Advanced calculator with scientific and mathematical functions
        </p>
      </div>

      <Card className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Display */}
            <div className="mb-6">
              <div className="bg-muted/50 p-4 rounded-lg min-h-[80px] flex flex-col justify-end">
                {equation && (
                  <div className="text-sm text-muted-foreground mb-1 text-right">
                    {equation}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold break-all">
                    {display}
                  </div>
                  <Button onClick={copyToClipboard} variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Scientific Functions Row 1 */}
            <div className="grid grid-cols-5 gap-2 mb-2">
              <Button variant="outline" onClick={() => handleFunction('sin')}>sin</Button>
              <Button variant="outline" onClick={() => handleFunction('cos')}>cos</Button>
              <Button variant="outline" onClick={() => handleFunction('tan')}>tan</Button>
              <Button variant="outline" onClick={() => handleFunction('log')}>log</Button>
              <Button variant="outline" onClick={() => handleFunction('ln')}>ln</Button>
            </div>

            {/* Scientific Functions Row 2 */}
            <div className="grid grid-cols-5 gap-2 mb-2">
              <Button variant="outline" onClick={() => handleFunction('sqrt')}>√</Button>
              <Button variant="outline" onClick={() => handleFunction('square')}>x²</Button>
              <Button variant="outline" onClick={() => handleFunction('inverse')}>1/x</Button>
              <Button variant="outline" onClick={() => handleFunction('exp')}>eˣ</Button>
              <Button variant="outline" onClick={() => handleFunction('factorial')}>n!</Button>
            </div>

            {/* Constants & Special */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              <Button variant="outline" onClick={() => handleInput('π')}>π</Button>
              <Button variant="outline" onClick={() => handleInput('e')}>e</Button>
              <Button variant="outline" onClick={() => handleInput('(')}>{'('}</Button>
              <Button variant="outline" onClick={() => handleInput(')')}>{')'}</Button>
              <Button variant="outline" onClick={() => handleFunction('percent')}>%</Button>
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <Button variant="outline" onClick={handleClear} className="bg-red-50 dark:bg-red-950 hover:bg-red-100">
                AC
              </Button>
              <Button variant="outline" onClick={handleBackspace}>
                <Delete className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => handleInput('÷')}>÷</Button>
              <Button variant="outline" onClick={() => handleInput('×')}>×</Button>

              {/* Row 2 */}
              <Button variant="outline" onClick={() => handleInput('7')}>7</Button>
              <Button variant="outline" onClick={() => handleInput('8')}>8</Button>
              <Button variant="outline" onClick={() => handleInput('9')}>9</Button>
              <Button variant="outline" onClick={() => handleInput('-')}>-</Button>

              {/* Row 3 */}
              <Button variant="outline" onClick={() => handleInput('4')}>4</Button>
              <Button variant="outline" onClick={() => handleInput('5')}>5</Button>
              <Button variant="outline" onClick={() => handleInput('6')}>6</Button>
              <Button variant="outline" onClick={() => handleInput('+')}>+</Button>

              {/* Row 4 */}
              <Button variant="outline" onClick={() => handleInput('1')}>1</Button>
              <Button variant="outline" onClick={() => handleInput('2')}>2</Button>
              <Button variant="outline" onClick={() => handleInput('3')}>3</Button>
              <Button 
                variant="default" 
                onClick={handleCalculate}
                className="row-span-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                =
              </Button>

              {/* Row 5 */}
              <Button variant="outline" onClick={() => handleInput('0')} className="col-span-2">0</Button>
              <Button variant="outline" onClick={() => handleInput('.')}>.</Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Information Card */}
      <Card className="p-6 mt-8">
        <h3 className="font-semibold text-lg mb-3 flex items-center">
          <Calculator className="mr-2 h-5 w-5" /> Calculator Functions
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2">Trigonometric</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• sin, cos, tan - Trigonometric functions</li>
              <li>• Input in radians</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Logarithmic</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• log - Base 10 logarithm</li>
              <li>• ln - Natural logarithm</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Power & Root</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• √ - Square root</li>
              <li>• x² - Square</li>
              <li>• eˣ - Exponential</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Other</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 1/x - Reciprocal</li>
              <li>• n! - Factorial</li>
              <li>• % - Percentage</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ScientificCalculator;
