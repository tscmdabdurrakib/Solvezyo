import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Home, Percent, Calendar, Banknote, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * MortgageCalculatorUK Component
 * 
 * Calculate UK mortgage payments with stamp duty and other UK-specific costs
 */
export function MortgageCalculatorUK() {
  const { toast } = useToast();

  // State for input values
  const [propertyPrice, setPropertyPrice] = useState<number>(300000);
  const [deposit, setDeposit] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [mortgageTerm, setMortgageTerm] = useState<number>(25);
  
  // State for calculated results
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalRepayment, setTotalRepayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [stampDuty, setStampDuty] = useState<number>(0);
  const [loanToValue, setLoanToValue] = useState<number>(0);

  // Calculate mortgage when inputs change
  useEffect(() => {
    calculateMortgage();
  }, [propertyPrice, deposit, interestRate, mortgageTerm]);

  // Function to calculate stamp duty (England & Northern Ireland rates)
  const calculateStampDuty = (price: number): number => {
    let duty = 0;
    
    if (price <= 250000) {
      duty = 0;
    } else if (price <= 925000) {
      duty = (price - 250000) * 0.05;
    } else if (price <= 1500000) {
      duty = 33750 + (price - 925000) * 0.10;
    } else {
      duty = 33750 + 57500 + (price - 1500000) * 0.12;
    }
    
    return duty;
  };

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

  // Function to calculate mortgage details
  const calculateMortgage = () => {
    const loan = propertyPrice - deposit;
    const monthly = calculateMonthlyPayment(loan, interestRate, mortgageTerm);
    const total = monthly * mortgageTerm * 12;
    const interest = total - loan;
    const duty = calculateStampDuty(propertyPrice);
    const ltv = (loan / propertyPrice) * 100;
    
    setLoanAmount(loan);
    setMonthlyPayment(monthly);
    setTotalRepayment(total);
    setTotalInterest(interest);
    setStampDuty(duty);
    setLoanToValue(ltv);
  };

  // Function to reset all values
  const handleReset = () => {
    setPropertyPrice(300000);
    setDeposit(60000);
    setInterestRate(3.5);
    setMortgageTerm(25);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `UK Mortgage Summary:
Property Price: ${formatCurrency(propertyPrice)}
Deposit: ${formatCurrency(deposit)}
Loan Amount: ${formatCurrency(loanAmount)}
Interest Rate: ${interestRate}%
Mortgage Term: ${mortgageTerm} years
Monthly Payment: ${formatCurrency(monthlyPayment)}
Total Repayment: ${formatCurrency(totalRepayment)}
Total Interest: ${formatCurrency(totalInterest)}
Stamp Duty: ${formatCurrency(stampDuty)}
Loan-to-Value: ${loanToValue.toFixed(1)}%`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">UK Mortgage Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate mortgage payments with UK stamp duty and loan-to-value ratio
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Home className="mr-2 h-5 w-5" /> Property Details
          </h2>
          
          <div className="space-y-6">
            {/* Property Price */}
            <div>
              <Label htmlFor="propertyPrice">Property Price</Label>
              <div className="relative mt-1.5">
                <Banknote className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="propertyPrice"
                  type="number"
                  className="pl-10"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[propertyPrice]}
                max={2000000}
                step={5000}
                onValueChange={(values) => setPropertyPrice(values[0])}
              />
            </div>

            {/* Deposit */}
            <div>
              <Label htmlFor="deposit">Deposit</Label>
              <div className="relative mt-1.5">
                <Banknote className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="deposit"
                  type="number"
                  className="pl-10"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[deposit]}
                max={propertyPrice}
                step={1000}
                onValueChange={(values) => setDeposit(values[0])}
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

            {/* Mortgage Term */}
            <div>
              <Label htmlFor="mortgageTerm">Mortgage Term (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="mortgageTerm"
                  type="number"
                  className="pl-10"
                  value={mortgageTerm}
                  onChange={(e) => setMortgageTerm(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[mortgageTerm]}
                max={40}
                step={1}
                onValueChange={(values) => setMortgageTerm(values[0])}
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
                  <h2 className="text-xl font-semibold">Mortgage Summary</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Monthly Payment
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(monthlyPayment)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(loanAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">Stamp Duty</h3>
                    <div className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {formatCurrency(stampDuty)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-muted-foreground">Total Interest</h3>
                      <div className="mt-1 text-lg font-bold">
                        {formatCurrency(totalInterest)}
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-muted-foreground">Loan-to-Value</h3>
                      <div className="mt-1 text-lg font-bold">
                        {loanToValue.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Repayment</h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(totalRepayment)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">UK Mortgage Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Stamp duty rates are based on England & Northern Ireland (2024)
              </p>
              <p>
                • A lower loan-to-value ratio may qualify for better interest rates
              </p>
              <p>
                • Consider additional costs like legal fees, survey, and moving costs
              </p>
              <p>
                • Fixed-rate vs variable-rate mortgages have different risk profiles
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MortgageCalculatorUK;
