import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Percent, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * VAMortgageCalculator Component
 * 
 * Calculate VA loan payments with funding fee
 */
export function VAMortgageCalculator() {
  const { toast } = useToast();

  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(5.25);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [disabilityRating, setDisabilityRating] = useState<number>(0);
  
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [fundingFee, setFundingFee] = useState<number>(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState<number>(0);

  useEffect(() => {
    calculateVA();
  }, [homePrice, downPayment, interestRate, loanTerm, isFirstTime, disabilityRating]);

  const calculateVA = () => {
    const loanAmount = homePrice - downPayment;
    const downPaymentPercent = (downPayment / homePrice) * 100;
    
    // Calculate VA Funding Fee (waived if disability >= 10%)
    let feePercent = 0;
    if (disabilityRating < 10) {
      if (isFirstTime) {
        if (downPaymentPercent >= 10) feePercent = 1.40;
        else if (downPaymentPercent >= 5) feePercent = 1.65;
        else feePercent = 2.15;
      } else {
        if (downPaymentPercent >= 10) feePercent = 1.40;
        else if (downPaymentPercent >= 5) feePercent = 1.65;
        else feePercent = 3.30;
      }
    }
    
    const fee = loanAmount * (feePercent / 100);
    const totalFinanced = loanAmount + fee;
    
    // Calculate monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    
    let payment = 0;
    if (monthlyRate === 0) {
      payment = totalFinanced / payments;
    } else {
      const x = Math.pow(1 + monthlyRate, payments);
      payment = (totalFinanced * monthlyRate * x) / (x - 1);
    }
    
    setMonthlyPayment(payment);
    setFundingFee(fee);
    setTotalLoanAmount(totalFinanced);
  };

  const handleReset = () => {
    setHomePrice(300000);
    setDownPayment(0);
    setInterestRate(5.25);
    setLoanTerm(30);
    setIsFirstTime(true);
    setDisabilityRating(0);
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
    const result = `VA Mortgage Analysis:
Home Price: ${formatCurrency(homePrice)}
Down Payment: ${formatCurrency(downPayment)}
Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years
First-time VA User: ${isFirstTime ? 'Yes' : 'No'}
Disability Rating: ${disabilityRating}%

VA Funding Fee: ${formatCurrency(fundingFee)}
Total Loan Amount: ${formatCurrency(totalLoanAmount)}
Monthly Payment: ${formatCurrency(monthlyPayment)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "VA mortgage results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">VA Mortgage Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate VA loan payments for veterans and service members
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5" /> VA Loan Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="price">Home Price</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  className="pl-10"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[homePrice]}
                max={1000000}
                step={5000}
                onValueChange={(values) => setHomePrice(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="down">Down Payment (optional)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="down"
                  type="number"
                  className="pl-10"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[downPayment]}
                max={homePrice * 0.2}
                step={1000}
                onValueChange={(values) => setDownPayment(values[0])}
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
                max={10}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
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
                step={5}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="disability">VA Disability Rating (%)</Label>
              <Input
                id="disability"
                type="number"
                value={disabilityRating}
                onChange={(e) => setDisabilityRating(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Funding fee waived if 10% or higher
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="firstTime"
                checked={isFirstTime}
                onChange={(e) => setIsFirstTime(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="firstTime">First-time VA loan user</Label>
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
                  <h2 className="text-xl font-semibold">Payment Summary</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${disabilityRating >= 10
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                    : 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'}`}>
                    <h3 className={`text-sm font-medium ${disabilityRating >= 10
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-orange-800 dark:text-orange-200'}`}>
                      VA Funding Fee
                    </h3>
                    <div className={`mt-1 text-2xl font-bold ${disabilityRating >= 10
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-orange-600 dark:text-orange-400'}`}>
                      {disabilityRating >= 10 ? 'WAIVED' : formatCurrency(fundingFee)}
                    </div>
                    {disabilityRating < 10 && (
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                        Added to loan amount
                      </p>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Loan Amount</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(totalLoanAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Monthly Payment</h3>
                    <div className="mt-1 text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(monthlyPayment)}
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      Principal + Interest only
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">VA Loan Benefits</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• No down payment required (0% down)</p>
              <p>• No private mortgage insurance (PMI)</p>
              <p>• Competitive interest rates</p>
              <p>• Funding fee waived with 10%+ disability rating</p>
              <p>• Limited closing costs</p>
              <p>• Available to veterans, active duty, and eligible spouses</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default VAMortgageCalculator;
