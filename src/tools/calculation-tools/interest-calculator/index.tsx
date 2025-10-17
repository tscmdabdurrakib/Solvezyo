import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * InterestCalculator Component
 * 
 * Calculate compound and simple interest for investments
 */
export function InterestCalculator() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);
  const [compoundFrequency, setCompoundFrequency] = useState<string>('annually');
  const [calculationType, setCalculationType] = useState<string>('compound');
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const { toast } = useToast();

  // Calculate interest when inputs change
  useEffect(() => {
    calculateInterest();
  }, [principal, interestRate, years, compoundFrequency, calculationType]);

  /**
   * Function to calculate compound or simple interest
   * Compound Interest: A = P(1 + r/n)^(nt)
   * Simple Interest: A = P(1 + rt)
   * Where: A = final amount, P = principal, r = rate, n = compounds per year, t = time
   */
  const calculateInterest = () => {
    if (principal <= 0 || interestRate < 0 || years <= 0) {
      setFutureValue(0);
      setTotalInterest(0);
      return;
    }

    let finalAmount = 0;

    if (calculationType === 'simple') {
      // Simple Interest: A = P(1 + rt)
      finalAmount = principal * (1 + (interestRate / 100) * years);
    } else {
      // Compound Interest: A = P(1 + r/n)^(nt)
      const rate = interestRate / 100;
      const n = getCompoundsPerYear();
      finalAmount = principal * Math.pow(1 + rate / n, n * years);
    }

    setFutureValue(finalAmount);
    setTotalInterest(finalAmount - principal);
  };

  // Get number of compounds per year
  const getCompoundsPerYear = (): number => {
    switch (compoundFrequency) {
      case 'daily': return 365;
      case 'weekly': return 52;
      case 'monthly': return 12;
      case 'quarterly': return 4;
      case 'semiannually': return 2;
      case 'annually': return 1;
      default: return 1;
    }
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
    setPrincipal(10000);
    setInterestRate(5);
    setYears(10);
    setCompoundFrequency('annually');
    setCalculationType('compound');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Interest Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate compound or simple interest on your investments
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Investment Details
          </h2>
          
          <div className="space-y-4">
            {/* Calculation Type */}
            <div>
              <Label htmlFor="calculationType">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compound">Compound Interest</SelectItem>
                  <SelectItem value="simple">Simple Interest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Principal Amount */}
            <div>
              <Label htmlFor="principal">Principal Amount ($)</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                min="0"
                step="100"
                className="mt-2"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                step="0.1"
                className="mt-2"
              />
            </div>

            {/* Time Period */}
            <div>
              <Label htmlFor="years">Time Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
                min="0"
                step="1"
                className="mt-2"
              />
            </div>

            {/* Compound Frequency (only for compound interest) */}
            {calculationType === 'compound' && (
              <div>
                <Label htmlFor="compoundFrequency">Compound Frequency</Label>
                <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily (365/year)</SelectItem>
                    <SelectItem value="weekly">Weekly (52/year)</SelectItem>
                    <SelectItem value="monthly">Monthly (12/year)</SelectItem>
                    <SelectItem value="quarterly">Quarterly (4/year)</SelectItem>
                    <SelectItem value="semiannually">Semi-Annually (2/year)</SelectItem>
                    <SelectItem value="annually">Annually (1/year)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

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
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" /> Investment Growth
            </h2>
            
            {/* Primary Result */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Future Value</h3>
                  <div className="text-4xl font-bold">
                    ${futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(futureValue.toFixed(2), 'Future Value')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Principal */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Principal Amount</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(principal.toFixed(2), 'Principal')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Interest Earned */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest Earned</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalInterest.toFixed(2), 'Total Interest')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Annual Interest Rate</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {interestRate.toFixed(2)}%
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(interestRate.toFixed(2) + '%', 'Interest Rate')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Time Period */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Time Period</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {years} {years === 1 ? 'year' : 'years'}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(years.toString() + ' years', 'Time Period')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Return Percentage */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Return</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {principal > 0 ? ((totalInterest / principal) * 100).toFixed(2) : 0}%
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((principal > 0 ? ((totalInterest / principal) * 100).toFixed(2) : '0') + '%', 'Total Return')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Calculation Method */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Calculation Method</h3>
                    <div className="mt-1 text-lg font-bold">
                      {calculationType === 'compound' ? 'Compound Interest' : 'Simple Interest'}
                      {calculationType === 'compound' && (
                        <div className="text-xs font-normal text-muted-foreground mt-1">
                          Compounded {compoundFrequency}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Interest Calculator</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Compound Interest</h3>
              <p className="text-muted-foreground text-sm">
                Calculates interest on both principal and accumulated interest, resulting in exponential growth over time.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Simple Interest</h3>
              <p className="text-muted-foreground text-sm">
                Calculates interest only on the principal amount, providing linear growth throughout the investment period.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Flexible Compounding</h3>
              <p className="text-muted-foreground text-sm">
                Choose from daily, monthly, quarterly, or annual compounding to match your investment terms.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}