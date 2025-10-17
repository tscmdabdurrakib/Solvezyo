import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface DivisionStep {
  stepNumber: number;
  description: string;
  calculation: string;
}

/**
 * LongDivisionCalculator Component
 * 
 * Performs long division with step-by-step breakdown
 */
export function LongDivisionCalculator() {
  const [dividend, setDividend] = useState<string>('156');
  const [divisor, setDivisor] = useState<string>('12');
  const [quotient, setQuotient] = useState<number>(0);
  const [remainder, setRemainder] = useState<number>(0);
  const [steps, setSteps] = useState<DivisionStep[]>([]);
  const [decimalResult, setDecimalResult] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    performDivision();
  }, [dividend, divisor]);

  const performDivision = () => {
    const dividendNum = parseInt(dividend);
    const divisorNum = parseInt(divisor);

    if (isNaN(dividendNum) || isNaN(divisorNum) || divisorNum === 0) {
      setQuotient(0);
      setRemainder(0);
      setSteps([]);
      setDecimalResult('');
      return;
    }

    // Calculate quotient and remainder
    const q = Math.floor(dividendNum / divisorNum);
    const r = dividendNum % divisorNum;
    
    setQuotient(q);
    setRemainder(r);

    // Calculate decimal result
    const decimal = (dividendNum / divisorNum).toFixed(6);
    setDecimalResult(decimal);

    // Generate step-by-step breakdown
    const divisionSteps: DivisionStep[] = [];
    let currentDividend = dividendNum;
    let currentQuotient = '';
    let stepNum = 1;

    // Convert dividend to string for digit-by-digit processing
    const dividendStr = dividendNum.toString();
    let workingNumber = 0;
    let position = 0;

    while (position < dividendStr.length) {
      workingNumber = workingNumber * 10 + parseInt(dividendStr[position]);

      if (workingNumber >= divisorNum) {
        const digit = Math.floor(workingNumber / divisorNum);
        const product = digit * divisorNum;
        
        divisionSteps.push({
          stepNumber: stepNum++,
          description: `Divide ${workingNumber} by ${divisorNum}`,
          calculation: `${workingNumber} ÷ ${divisorNum} = ${digit} (remainder ${workingNumber - product})`
        });

        currentQuotient += digit;
        workingNumber = workingNumber - product;
      } else if (currentQuotient) {
        currentQuotient += '0';
        divisionSteps.push({
          stepNumber: stepNum++,
          description: `${workingNumber} is less than ${divisorNum}`,
          calculation: `Bring down next digit, quotient digit is 0`
        });
      }

      position++;
    }

    // Final step
    if (workingNumber > 0) {
      divisionSteps.push({
        stepNumber: stepNum,
        description: 'Final remainder',
        calculation: `Remainder: ${workingNumber}`
      });
    }

    setSteps(divisionSteps);
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleReset = () => {
    setDividend('156');
    setDivisor('12');
  };

  const isValidInput = !isNaN(parseInt(dividend)) && !isNaN(parseInt(divisor)) && parseInt(divisor) !== 0;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Long Division Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Perform division with step-by-step breakdown
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Enter Values
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="dividend">Dividend (Number to be divided)</Label>
              <Input
                id="dividend"
                type="number"
                min="0"
                step="1"
                value={dividend}
                onChange={(e) => setDividend(e.target.value)}
                placeholder="Enter dividend"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="divisor">Divisor (Number to divide by)</Label>
              <Input
                id="divisor"
                type="number"
                min="1"
                step="1"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
                placeholder="Enter divisor"
                className="mt-2"
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {isValidInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              {/* Main Result */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Division Result</h3>
                    <div className="text-3xl font-bold">
                      {dividend} ÷ {divisor} = {quotient}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Remainder: {remainder}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${quotient}`, 'Quotient')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="bg-background/50 p-3 rounded">
                    <div className="text-xs text-muted-foreground">Quotient</div>
                    <div className="text-xl font-bold">{quotient}</div>
                  </div>
                  <div className="bg-background/50 p-3 rounded">
                    <div className="text-xs text-muted-foreground">Remainder</div>
                    <div className="text-xl font-bold">{remainder}</div>
                  </div>
                  <div className="bg-background/50 p-3 rounded md:col-span-2">
                    <div className="text-xs text-muted-foreground">Decimal Result</div>
                    <div className="text-xl font-bold">{decimalResult}</div>
                  </div>
                </div>
              </div>

              {/* Step-by-Step */}
              {steps.length > 0 && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Step-by-Step Breakdown</h3>
                  <div className="space-y-3">
                    {steps.map((step) => (
                      <div key={step.stepNumber} className="bg-background/50 p-3 rounded">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {step.stepNumber}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{step.description}</div>
                            <div className="text-xs text-muted-foreground font-mono mt-1">
                              {step.calculation}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification */}
              <div className="bg-muted/50 p-4 rounded-lg mt-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Verification</h3>
                <div className="text-sm font-mono">
                  ({divisor} × {quotient}) + {remainder} = {parseInt(divisor) * quotient + remainder}
                  {parseInt(divisor) * quotient + remainder === parseInt(dividend) && (
                    <span className="text-green-600 dark:text-green-400 ml-2">✓ Correct</span>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Long Division</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Division Formula</h3>
              <p className="text-muted-foreground text-sm">
                Dividend = (Divisor × Quotient) + Remainder
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Quotient</h3>
              <p className="text-muted-foreground text-sm">
                The number of times the divisor goes into the dividend.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Remainder</h3>
              <p className="text-muted-foreground text-sm">
                What's left over after division. Always less than the divisor.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LongDivisionCalculator;
