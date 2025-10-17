import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Calendar, Percent, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * RefinanceCalculator Component
 * 
 * Calculate potential savings from refinancing a mortgage with lower interest rates
 */
export function RefinanceCalculator() {
  const { toast } = useToast();

  // State for input values
  const [currentLoanBalance, setCurrentLoanBalance] = useState<number>(250000);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(6.5);
  const [currentLoanTerm, setCurrentLoanTerm] = useState<number>(25);
  const [newInterestRate, setNewInterestRate] = useState<number>(4.5);
  const [newLoanTerm, setNewLoanTerm] = useState<number>(30);
  const [closingCosts, setClosingCosts] = useState<number>(3500);
  
  // State for calculated results
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState<number>(0);
  const [newMonthlyPayment, setNewMonthlyPayment] = useState<number>(0);
  const [monthlySavings, setMonthlySavings] = useState<number>(0);
  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [breakEvenMonths, setBreakEvenMonths] = useState<number>(0);

  // Calculate refinance details when inputs change
  useEffect(() => {
    calculateRefinance();
  }, [currentLoanBalance, currentInterestRate, currentLoanTerm, newInterestRate, newLoanTerm, closingCosts]);

  // Function to calculate monthly payment
  const calculateMonthlyPayment = (principal: number, annualRate: number, years: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    const payments = years * 12;
    
    if (monthlyRate === 0) {
      return principal / payments;
    }
    
    const x = Math.pow(1 + monthlyRate, payments);
    return (principal * monthlyRate * x) / (x - 1);
  };

  // Function to calculate refinance savings
  const calculateRefinance = () => {
    // Calculate current monthly payment
    const currentPayment = calculateMonthlyPayment(currentLoanBalance, currentInterestRate, currentLoanTerm);
    
    // Calculate new monthly payment
    const newPayment = calculateMonthlyPayment(currentLoanBalance, newInterestRate, newLoanTerm);
    
    // Calculate monthly savings
    const savings = currentPayment - newPayment;
    
    // Calculate total savings over new loan term (minus closing costs)
    const totalPaid = newPayment * newLoanTerm * 12;
    const totalWouldHavePaid = currentPayment * currentLoanTerm * 12;
    const totalSaved = totalWouldHavePaid - totalPaid - closingCosts;
    
    // Calculate break-even point (months to recover closing costs)
    const breakEven = savings > 0 ? closingCosts / savings : 0;
    
    setCurrentMonthlyPayment(currentPayment);
    setNewMonthlyPayment(newPayment);
    setMonthlySavings(savings);
    setTotalSavings(totalSaved);
    setBreakEvenMonths(breakEven);
  };

  // Function to reset all values
  const handleReset = () => {
    setCurrentLoanBalance(250000);
    setCurrentInterestRate(6.5);
    setCurrentLoanTerm(25);
    setNewInterestRate(4.5);
    setNewLoanTerm(30);
    setClosingCosts(3500);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Refinance Analysis:
Current Monthly Payment: ${formatCurrency(currentMonthlyPayment)}
New Monthly Payment: ${formatCurrency(newMonthlyPayment)}
Monthly Savings: ${formatCurrency(monthlySavings)}
Total Savings: ${formatCurrency(totalSavings)}
Break-even: ${breakEvenMonths.toFixed(0)} months`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Refinance Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Analyze potential savings from refinancing your mortgage
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Loan Details
          </h2>
          
          <div className="space-y-6">
            {/* Current Loan Balance */}
            <div>
              <Label htmlFor="balance">Current Loan Balance</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="balance"
                  type="number"
                  className="pl-10"
                  value={currentLoanBalance}
                  onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[currentLoanBalance]}
                max={1000000}
                step={1000}
                onValueChange={(values) => setCurrentLoanBalance(values[0])}
              />
            </div>

            {/* Current Interest Rate */}
            <div>
              <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="currentRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={currentInterestRate}
                  onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[currentInterestRate]}
                max={15}
                step={0.1}
                onValueChange={(values) => setCurrentInterestRate(values[0])}
              />
            </div>

            {/* Current Loan Term */}
            <div>
              <Label htmlFor="currentTerm">Remaining Term (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="currentTerm"
                  type="number"
                  className="pl-10"
                  value={currentLoanTerm}
                  onChange={(e) => setCurrentLoanTerm(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[currentLoanTerm]}
                max={40}
                step={1}
                onValueChange={(values) => setCurrentLoanTerm(values[0])}
              />
            </div>

            {/* New Interest Rate */}
            <div>
              <Label htmlFor="newRate">New Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <TrendingDown className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="newRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={newInterestRate}
                  onChange={(e) => setNewInterestRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[newInterestRate]}
                max={15}
                step={0.1}
                onValueChange={(values) => setNewInterestRate(values[0])}
              />
            </div>

            {/* New Loan Term */}
            <div>
              <Label htmlFor="newTerm">New Loan Term (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="newTerm"
                  type="number"
                  className="pl-10"
                  value={newLoanTerm}
                  onChange={(e) => setNewLoanTerm(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[newLoanTerm]}
                max={40}
                step={1}
                onValueChange={(values) => setNewLoanTerm(values[0])}
              />
            </div>

            {/* Closing Costs */}
            <div>
              <Label htmlFor="closingCosts">Closing Costs</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="closingCosts"
                  type="number"
                  className="pl-10"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(Number(e.target.value))}
                />
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
                  <h2 className="text-xl font-semibold">Refinance Summary</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Current Monthly Payment</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(currentMonthlyPayment)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">New Monthly Payment</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(newMonthlyPayment)}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Monthly Savings</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(monthlySavings)}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Savings</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(totalSavings)}
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Over {newLoanTerm} years</p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Break-even Point</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {breakEvenMonths.toFixed(0)} months
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Time to recover closing costs
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Should You Refinance?</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Refinancing can save you money if interest rates have dropped since your original loan
              </p>
              <p>
                • Consider the break-even point - you should plan to stay in your home longer than this period
              </p>
              <p>
                • Factor in closing costs, which typically range from 2-5% of the loan amount
              </p>
              <p>
                • A good rule of thumb: refinance if you can lower your rate by at least 0.5-1%
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RefinanceCalculator;
