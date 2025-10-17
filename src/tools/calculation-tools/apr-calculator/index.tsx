import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * APRCalculator Component
 * 
 * Calculate Annual Percentage Rate for loans and credit
 */
export function APRCalculator() {
  const { toast } = useToast();

  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [fees, setFees] = useState<number>(500);
  const [loanTerm, setLoanTerm] = useState<number>(3);
  
  const [apr, setAPR] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  useEffect(() => {
    calculateAPR();
  }, [loanAmount, interestRate, fees, loanTerm]);

  const calculateAPR = () => {
    // Calculate monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    
    let payment = 0;
    if (monthlyRate === 0) {
      payment = loanAmount / payments;
    } else {
      const x = Math.pow(1 + monthlyRate, payments);
      payment = (loanAmount * monthlyRate * x) / (x - 1);
    }
    
    // Total amount paid including fees
    const totalPaid = (payment * payments) + fees;
    
    // APR calculation: effective annual rate including all costs
    // Simplified APR = [(Fees + Interest) / Loan Amount] / Term in Years × 100
    const totalInterest = (payment * payments) - loanAmount;
    const aprCalc = ((fees + totalInterest) / loanAmount) / loanTerm * 100;
    
    setMonthlyPayment(payment);
    setTotalCost(totalPaid);
    setAPR(aprCalc);
  };

  const handleReset = () => {
    setLoanAmount(10000);
    setInterestRate(12);
    setFees(500);
    setLoanTerm(3);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const copyToClipboard = () => {
    const result = `APR Analysis:
Loan Amount: ${formatCurrency(loanAmount)}
Interest Rate: ${interestRate}%
Fees: ${formatCurrency(fees)}
Loan Term: ${loanTerm} years

APR: ${apr.toFixed(2)}%
Monthly Payment: ${formatCurrency(monthlyPayment)}
Total Cost: ${formatCurrency(totalCost)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "APR results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">APR Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the true Annual Percentage Rate including fees
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Percent className="mr-2 h-5 w-5" /> Loan Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="amount">Loan Amount</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  className="pl-10"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[loanAmount]}
                max={100000}
                step={500}
                onValueChange={(values) => setLoanAmount(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="rate"
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
                max={30}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="fees">Fees and Charges</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fees"
                  type="number"
                  className="pl-10"
                  value={fees}
                  onChange={(e) => setFees(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[fees]}
                max={5000}
                step={50}
                onValueChange={(values) => setFees(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="term">Loan Term (years)</Label>
              <Input
                id="term"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[loanTerm]}
                max={30}
                step={1}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

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
                  <h2 className="text-xl font-semibold">APR Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-6 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Annual Percentage Rate</h3>
                    <div className="mt-1 text-4xl font-bold text-red-600 dark:text-red-400">
                      {apr.toFixed(2)}%
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      True cost including fees
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Monthly Payment</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(monthlyPayment)}
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Cost</h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(totalCost)}
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      Principal + Interest + Fees
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Understanding APR</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• APR includes interest rate plus all fees and charges</p>
              <p>• APR is higher than the interest rate when there are fees</p>
              <p>• Use APR to compare true costs between different loan offers</p>
              <p>• Federal law requires lenders to disclose APR</p>
              <p>• Lower APR means lower overall cost of borrowing</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default APRCalculator;
