import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Percent, Calendar, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * MortgageAmortizationCalculator Component
 * 
 * Calculate detailed mortgage amortization schedule with principal and interest breakdown
 */
export function MortgageAmortizationCalculator() {
  const { toast } = useToast();

  // State for input values
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  
  // State for calculated results
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [firstYearInterest, setFirstYearInterest] = useState<number>(0);
  const [firstYearPrincipal, setFirstYearPrincipal] = useState<number>(0);

  // Calculate amortization when inputs change
  useEffect(() => {
    calculateAmortization();
  }, [loanAmount, interestRate, loanTerm]);

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

  // Function to calculate amortization details
  const calculateAmortization = () => {
    const monthly = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
    const totalPayments = monthly * loanTerm * 12;
    const totalInt = totalPayments - loanAmount;
    
    // Calculate first year breakdown
    const monthlyRate = interestRate / 100 / 12;
    let balance = loanAmount;
    let yearInterest = 0;
    let yearPrincipal = 0;
    
    for (let i = 0; i < 12; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthly - interestPayment;
      
      yearInterest += interestPayment;
      yearPrincipal += principalPayment;
      balance -= principalPayment;
    }
    
    setMonthlyPayment(monthly);
    setTotalPayment(totalPayments);
    setTotalInterest(totalInt);
    setFirstYearInterest(yearInterest);
    setFirstYearPrincipal(yearPrincipal);
  };

  // Function to reset all values
  const handleReset = () => {
    setLoanAmount(300000);
    setInterestRate(4.5);
    setLoanTerm(30);
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
    const result = `Mortgage Amortization Summary:
Loan Amount: ${formatCurrency(loanAmount)}
Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years
Monthly Payment: ${formatCurrency(monthlyPayment)}
Total Payment: ${formatCurrency(totalPayment)}
Total Interest: ${formatCurrency(totalInterest)}
First Year Interest: ${formatCurrency(firstYearInterest)}
First Year Principal: ${formatCurrency(firstYearPrincipal)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Mortgage Amortization Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate detailed mortgage amortization with principal and interest breakdown
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Loan Details
          </h2>
          
          <div className="space-y-6">
            {/* Loan Amount */}
            <div>
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="loanAmount"
                  type="number"
                  className="pl-10"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[loanAmount]}
                max={1000000}
                step={5000}
                onValueChange={(values) => setLoanAmount(values[0])}
              />
            </div>

            {/* Interest Rate */}
            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[interestRate]}
                max={10}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
            </div>

            {/* Loan Term */}
            <div>
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="loanTerm"
                  type="number"
                  className="pl-10"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[loanTerm]}
                max={40}
                step={1}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
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
                  <h2 className="text-xl font-semibold">Amortization Summary</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-200 flex items-center">
                      <TrendingDown className="mr-2 h-4 w-4" />
                      Monthly Payment
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(monthlyPayment)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Payment</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(totalPayment)}
                    </div>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Total Interest</h3>
                    <div className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                      {formatCurrency(totalInterest)}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">First Year Breakdown</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Interest:</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {formatCurrency(firstYearInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Principal:</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {formatCurrency(firstYearPrincipal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Understanding Amortization</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Early payments are mostly interest, later payments are mostly principal
              </p>
              <p>
                • Amortization shows exactly how your loan balance decreases over time
              </p>
              <p>
                • Making extra principal payments can significantly reduce total interest
              </p>
              <p>
                • First year typically has the highest interest payments
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MortgageAmortizationCalculator;
