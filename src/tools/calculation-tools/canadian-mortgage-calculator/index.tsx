import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Home, Percent, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * CanadianMortgageCalculator Component
 * 
 * Calculate Canadian mortgage payments with semi-annual compounding
 */
export function CanadianMortgageCalculator() {
  const { toast } = useToast();

  // State for input values
  const [propertyPrice, setPropertyPrice] = useState<number>(500000);
  const [downPayment, setDownPayment] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [amortizationPeriod, setAmortizationPeriod] = useState<number>(25);
  const [paymentFrequency, setPaymentFrequency] = useState<string>('monthly');
  
  // State for calculated results
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [cmhcInsurance, setCmhcInsurance] = useState<number>(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0);

  // Calculate mortgage when inputs change
  useEffect(() => {
    calculateMortgage();
  }, [propertyPrice, downPayment, interestRate, amortizationPeriod, paymentFrequency]);

  // Function to calculate CMHC insurance (Canada Mortgage and Housing Corporation)
  const calculateCMHCInsurance = (price: number, down: number): number => {
    const ltv = ((price - down) / price) * 100;
    
    // CMHC insurance is required if down payment < 20%
    if (ltv <= 80) return 0;
    
    let rate = 0;
    if (ltv <= 85) rate = 0.028;
    else if (ltv <= 90) rate = 0.031;
    else if (ltv <= 95) rate = 0.04;
    
    return (price - down) * rate;
  };

  // Function to calculate Canadian mortgage payment
  const calculateCanadianMortgagePayment = (
    principal: number,
    annualRate: number,
    years: number,
    frequency: string
  ): number => {
    // Canadian mortgages compound semi-annually
    const semiAnnualRate = Math.pow(1 + annualRate / 100 / 2, 2) - 1;
    
    let paymentsPerYear = 12;
    if (frequency === 'weekly') paymentsPerYear = 52;
    else if (frequency === 'biweekly') paymentsPerYear = 26;
    else if (frequency === 'semi-monthly') paymentsPerYear = 24;
    
    const paymentRate = Math.pow(1 + semiAnnualRate, 1 / paymentsPerYear) - 1;
    const numberOfPayments = years * paymentsPerYear;
    
    if (paymentRate === 0) {
      return principal / numberOfPayments;
    }
    
    const x = Math.pow(1 + paymentRate, numberOfPayments);
    return (principal * paymentRate * x) / (x - 1);
  };

  // Function to calculate mortgage details
  const calculateMortgage = () => {
    const insurance = calculateCMHCInsurance(propertyPrice, downPayment);
    const loan = propertyPrice - downPayment + insurance;
    const payment = calculateCanadianMortgagePayment(loan, interestRate, amortizationPeriod, paymentFrequency);
    
    let paymentsPerYear = 12;
    if (paymentFrequency === 'weekly') paymentsPerYear = 52;
    else if (paymentFrequency === 'biweekly') paymentsPerYear = 26;
    else if (paymentFrequency === 'semi-monthly') paymentsPerYear = 24;
    
    const total = payment * amortizationPeriod * paymentsPerYear;
    const interest = total - loan;
    const downPercent = (downPayment / propertyPrice) * 100;
    
    setLoanAmount(loan);
    setPaymentAmount(payment);
    setTotalPayments(total);
    setTotalInterest(interest);
    setCmhcInsurance(insurance);
    setDownPaymentPercent(downPercent);
  };

  // Function to reset all values
  const handleReset = () => {
    setPropertyPrice(500000);
    setDownPayment(100000);
    setInterestRate(4.5);
    setAmortizationPeriod(25);
    setPaymentFrequency('monthly');
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get payment frequency label
  const getFrequencyLabel = () => {
    switch (paymentFrequency) {
      case 'weekly': return 'Weekly';
      case 'biweekly': return 'Bi-weekly';
      case 'semi-monthly': return 'Semi-monthly';
      default: return 'Monthly';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Canadian Mortgage Summary:
Property Price: ${formatCurrency(propertyPrice)}
Down Payment: ${formatCurrency(downPayment)} (${downPaymentPercent.toFixed(1)}%)
CMHC Insurance: ${formatCurrency(cmhcInsurance)}
Loan Amount: ${formatCurrency(loanAmount)}
Interest Rate: ${interestRate}%
Amortization Period: ${amortizationPeriod} years
Payment Frequency: ${getFrequencyLabel()}
${getFrequencyLabel()} Payment: ${formatCurrency(paymentAmount)}
Total Payments: ${formatCurrency(totalPayments)}
Total Interest: ${formatCurrency(totalInterest)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Canadian Mortgage Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate mortgage payments with Canadian semi-annual compounding and CMHC insurance
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
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
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
                step={10000}
                onValueChange={(values) => setPropertyPrice(values[0])}
              />
            </div>

            {/* Down Payment */}
            <div>
              <Label htmlFor="downPayment">Down Payment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="downPayment"
                  type="number"
                  className="pl-10"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[downPayment]}
                max={propertyPrice}
                step={5000}
                onValueChange={(values) => setDownPayment(values[0])}
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

            {/* Amortization Period */}
            <div>
              <Label htmlFor="amortizationPeriod">Amortization Period (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="amortizationPeriod"
                  type="number"
                  className="pl-10"
                  value={amortizationPeriod}
                  onChange={(e) => setAmortizationPeriod(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[amortizationPeriod]}
                max={30}
                step={1}
                onValueChange={(values) => setAmortizationPeriod(values[0])}
              />
            </div>

            {/* Payment Frequency */}
            <div>
              <Label htmlFor="paymentFrequency">Payment Frequency</Label>
              <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="semi-monthly">Semi-monthly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
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
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200 flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      {getFrequencyLabel()} Payment
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
                      {formatCurrency(paymentAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(loanAmount)}
                    </div>
                  </div>
                  
                  {cmhcInsurance > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">CMHC Insurance</h3>
                      <div className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {formatCurrency(cmhcInsurance)}
                      </div>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Required for down payment &lt; 20%
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-muted-foreground">Down Payment</h3>
                      <div className="mt-1 text-lg font-bold">
                        {downPaymentPercent.toFixed(1)}%
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-muted-foreground">Total Interest</h3>
                      <div className="mt-1 text-lg font-bold">
                        {formatCurrency(totalInterest)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Payments</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(totalPayments)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Canadian Mortgage Info</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Canadian mortgages use semi-annual compounding (different from US monthly)
              </p>
              <p>
                • CMHC insurance is required for down payments less than 20%
              </p>
              <p>
                • Minimum down payment: 5% for properties up to $500k
              </p>
              <p>
                • More frequent payments can reduce total interest paid
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CanadianMortgageCalculator;
