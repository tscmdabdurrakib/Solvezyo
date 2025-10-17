import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calculator, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * LoanCalculator Component
 * 
 * Calculate monthly loan payments, total interest, and amortization
 */
export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [paymentFrequency, setPaymentFrequency] = useState<string>('monthly');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const { toast } = useToast();

  // Calculate payment when inputs change
  useEffect(() => {
    calculatePayment();
  }, [loanAmount, interestRate, loanTerm, paymentFrequency]);

  /**
   * Function to calculate loan payment
   * Uses the amortization formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
   * Where P = payment, L = loan amount, c = periodic interest rate, n = number of payments
   */
  const calculatePayment = () => {
    if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }

    // Convert annual interest rate to periodic rate
    const periodicRate = (interestRate / 100) / getPaymentsPerYear();
    
    // Calculate total number of payments
    const numberOfPayments = loanTerm * getPaymentsPerYear();

    // Calculate payment using amortization formula
    let payment = 0;
    if (periodicRate === 0) {
      // If interest rate is 0, simple division
      payment = loanAmount / numberOfPayments;
    } else {
      payment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, numberOfPayments)) / 
                (Math.pow(1 + periodicRate, numberOfPayments) - 1);
    }

    const total = payment * numberOfPayments;
    const interest = total - loanAmount;

    setMonthlyPayment(payment);
    setTotalPayment(total);
    setTotalInterest(interest);
  };

  // Get number of payments per year based on frequency
  const getPaymentsPerYear = (): number => {
    switch (paymentFrequency) {
      case 'weekly': return 52;
      case 'biweekly': return 26;
      case 'semimonthly': return 24;
      case 'monthly': return 12;
      case 'quarterly': return 4;
      case 'semiannually': return 2;
      case 'annually': return 1;
      default: return 12;
    }
  };

  // Get payment frequency label
  const getFrequencyLabel = (): string => {
    switch (paymentFrequency) {
      case 'weekly': return 'Weekly';
      case 'biweekly': return 'Bi-Weekly';
      case 'semimonthly': return 'Semi-Monthly';
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'semiannually': return 'Semi-Annually';
      case 'annually': return 'Annually';
      default: return 'Monthly';
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
    setLoanAmount(250000);
    setInterestRate(4.5);
    setLoanTerm(30);
    setPaymentFrequency('monthly');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Loan Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate monthly payments, total interest, and loan amortization
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Loan Details
          </h2>
          
          <div className="space-y-4">
            {/* Loan Amount */}
            <div>
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                min="0"
                step="1000"
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

            {/* Loan Term */}
            <div>
              <Label htmlFor="loanTerm">Loan Term (Years)</Label>
              <Input
                id="loanTerm"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseFloat(e.target.value) || 0)}
                min="1"
                max="50"
                step="1"
                className="mt-2"
              />
            </div>

            {/* Payment Frequency */}
            <div>
              <Label htmlFor="paymentFrequency">Payment Frequency</Label>
              <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly (52/year)</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly (26/year)</SelectItem>
                  <SelectItem value="semimonthly">Semi-Monthly (24/year)</SelectItem>
                  <SelectItem value="monthly">Monthly (12/year)</SelectItem>
                  <SelectItem value="quarterly">Quarterly (4/year)</SelectItem>
                  <SelectItem value="semiannually">Semi-Annually (2/year)</SelectItem>
                  <SelectItem value="annually">Annually (1/year)</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
              <Calculator className="mr-2 h-5 w-5" /> Payment Summary
            </h2>
            
            {/* Primary Result */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">{getFrequencyLabel()} Payment</h3>
                  <div className="text-4xl font-bold">
                    ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(monthlyPayment.toFixed(2), 'Payment Amount')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Total Payment */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Amount Paid</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalPayment.toFixed(2), 'Total Payment')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Interest */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
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

              {/* Principal Amount */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Principal Amount</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(loanAmount.toFixed(2), 'Principal')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Number of Payments */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Payments</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {(loanTerm * getPaymentsPerYear()).toLocaleString()} payments
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((loanTerm * getPaymentsPerYear()).toString(), 'Total Payments')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Loan Calculator</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Accurate Amortization</h3>
              <p className="text-muted-foreground text-sm">
                Uses standard amortization formula to calculate precise monthly payments for any loan type.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Flexible Frequencies</h3>
              <p className="text-muted-foreground text-sm">
                Choose from weekly, bi-weekly, monthly, quarterly, or annual payment schedules.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Total Cost Analysis</h3>
              <p className="text-muted-foreground text-sm">
                See the total interest you'll pay over the life of the loan to make informed decisions.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LoanCalculator;
