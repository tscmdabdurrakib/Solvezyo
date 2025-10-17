import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Delete } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BasicCalculator Component
 * 
 * A standard calculator for basic arithmetic operations
 */
export function BasicCalculator() {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string>('');
  const [operation, setOperation] = useState<string>('');
  const [newNumber, setNewNumber] = useState<boolean>(true);
  const { toast } = useToast();

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    if (operation && !newNumber) {
      calculate();
    }
    setPreviousValue(display);
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = current !== 0 ? prev / current : 0;
        break;
      case '%':
        result = (prev * current) / 100;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setOperation('');
    setPreviousValue('');
    setNewNumber(true);
  };

  const handleEquals = () => {
    if (operation && previousValue) {
      calculate();
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue('');
    setOperation('');
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0');
      setNewNumber(true);
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePercentage = () => {
    setDisplay((parseFloat(display) / 100).toString());
    setNewNumber(true);
  };

  const handleSign = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
  };

  const buttonClass = "h-14 text-lg font-semibold rounded-xl transition-all hover:scale-105";
  const numberButtonClass = `${buttonClass} bg-muted hover:bg-muted/80`;
  const operationButtonClass = `${buttonClass} bg-primary text-primary-foreground hover:bg-primary/90`;
  const specialButtonClass = `${buttonClass} bg-secondary hover:bg-secondary/80`;

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Basic Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Standard calculator for everyday arithmetic
        </p>
      </div>

      <Card className="p-6">
        {/* Display */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6 rounded-2xl mb-4 border-2">
          {previousValue && operation && (
            <div className="text-sm text-muted-foreground mb-1">
              {previousValue} {operation}
            </div>
          )}
          <div className="flex justify-between items-center">
            <div className="text-4xl font-bold break-all">{display}</div>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="ml-2"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={handleClear} className={specialButtonClass}>
            AC
          </Button>
          <Button onClick={handleSign} className={specialButtonClass}>
            +/-
          </Button>
          <Button onClick={handlePercentage} className={specialButtonClass}>
            %
          </Button>
          <Button onClick={() => handleOperation('÷')} className={operationButtonClass}>
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => handleNumber('7')} className={numberButtonClass}>
            7
          </Button>
          <Button onClick={() => handleNumber('8')} className={numberButtonClass}>
            8
          </Button>
          <Button onClick={() => handleNumber('9')} className={numberButtonClass}>
            9
          </Button>
          <Button onClick={() => handleOperation('×')} className={operationButtonClass}>
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => handleNumber('4')} className={numberButtonClass}>
            4
          </Button>
          <Button onClick={() => handleNumber('5')} className={numberButtonClass}>
            5
          </Button>
          <Button onClick={() => handleNumber('6')} className={numberButtonClass}>
            6
          </Button>
          <Button onClick={() => handleOperation('-')} className={operationButtonClass}>
            -
          </Button>

          {/* Row 4 */}
          <Button onClick={() => handleNumber('1')} className={numberButtonClass}>
            1
          </Button>
          <Button onClick={() => handleNumber('2')} className={numberButtonClass}>
            2
          </Button>
          <Button onClick={() => handleNumber('3')} className={numberButtonClass}>
            3
          </Button>
          <Button onClick={() => handleOperation('+')} className={operationButtonClass}>
            +
          </Button>

          {/* Row 5 */}
          <Button onClick={() => handleNumber('0')} className={`${numberButtonClass} col-span-2`}>
            0
          </Button>
          <Button onClick={handleDecimal} className={numberButtonClass}>
            .
          </Button>
          <Button onClick={handleEquals} className={`${operationButtonClass} bg-green-600 hover:bg-green-700`}>
            =
          </Button>
        </div>

        <Button onClick={handleBackspace} variant="outline" className="w-full mt-4">
          <Delete className="mr-2 h-4 w-4" /> Backspace
        </Button>
      </Card>

      {/* Information */}
      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Calculator Features</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-sm mb-2">Basic Operations</h3>
            <p className="text-muted-foreground text-xs">
              Addition (+), Subtraction (-), Multiplication (×), Division (÷)
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2">Special Functions</h3>
            <p className="text-muted-foreground text-xs">
              Percentage (%), Sign change (+/-), Clear (AC)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BasicCalculator;
