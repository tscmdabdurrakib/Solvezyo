import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Info, DollarSign, Percent, RefreshCw, Copy, Check, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CashBackOrLowInterestCalculator Component
 * 
 * Compare cash back rebate vs low interest rate financing options.
 */
export function CashBackOrLowInterestCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<number>(25000);
  const [cashBackAmount, setCashBackAmount] = useState<number>(2000);
  const [lowInterestRate, setLowInterestRate] = useState<number>(2.9);
  const [standardInterestRate, setStandardInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [downPayment, setDownPayment] = useState<number>(3000);
  
  const [cashBackMonthlyPayment, setCashBackMonthlyPayment] = useState<number>(0);
  const [cashBackTotalInterest, setCashBackTotalInterest] = useState<number>(0);
  const [cashBackTotalCost, setCashBackTotalCost] = useState<number>(0);
  const [lowInterestMonthlyPayment, setLowInterestMonthlyPayment] = useState<number>(0);
  const [lowInterestTotalInterest, setLowInterestTotalInterest] = useState<number>(0);
  const [lowInterestTotalCost, setLowInterestTotalCost] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [betterOption, setBetterOption] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    calculateComparison();
  }, [purchasePrice, cashBackAmount, lowInterestRate, standardInterestRate, loanTerm, downPayment]);

  const calculateComparison = () => {
    const newErrors: Record<string, string> = {};
    
    if (purchasePrice <= 0) newErrors.purchasePrice = "Price must be greater than 0";
    if (cashBackAmount < 0) newErrors.cashBackAmount = "Cash back cannot be negative";
    if (downPayment < 0) newErrors.downPayment = "Down payment cannot be negative";
    if (loanTerm <= 0) newErrors.loanTerm = "Loan term must be greater than 0";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    // Cash Back Option (with standard interest rate)
    const cashBackPrincipal = purchasePrice - cashBackAmount - downPayment;
    const cashBackMonthlyRate = standardInterestRate / 100 / 12;
    let cashBackPayment = 0;
    
    if (cashBackMonthlyRate === 0) {
      cashBackPayment = cashBackPrincipal / loanTerm;
    } else {
      cashBackPayment = cashBackPrincipal * (cashBackMonthlyRate * Math.pow(1 + cashBackMonthlyRate, loanTerm)) / 
                       (Math.pow(1 + cashBackMonthlyRate, loanTerm) - 1);
    }
    
    const cashBackTotal = (cashBackPayment * loanTerm) + downPayment;
    const cashBackInterest = cashBackTotal - (purchasePrice - cashBackAmount);
    
    // Low Interest Option
    const lowInterestPrincipal = purchasePrice - downPayment;
    const lowInterestMonthlyRate = lowInterestRate / 100 / 12;
    let lowInterestPayment = 0;
    
    if (lowInterestMonthlyRate === 0) {
      lowInterestPayment = lowInterestPrincipal / loanTerm;
    } else {
      lowInterestPayment = lowInterestPrincipal * (lowInterestMonthlyRate * Math.pow(1 + lowInterestMonthlyRate, loanTerm)) / 
                          (Math.pow(1 + lowInterestMonthlyRate, loanTerm) - 1);
    }
    
    const lowInterestTotal = (lowInterestPayment * loanTerm) + downPayment;
    const lowInterestInterest = lowInterestTotal - purchasePrice;
    
    setCashBackMonthlyPayment(cashBackPayment);
    setCashBackTotalInterest(cashBackInterest);
    setCashBackTotalCost(cashBackTotal);
    setLowInterestMonthlyPayment(lowInterestPayment);
    setLowInterestTotalInterest(lowInterestInterest);
    setLowInterestTotalCost(lowInterestTotal);
    
    const savingsAmount = cashBackTotal - lowInterestTotal;
    setSavings(Math.abs(savingsAmount));
    setBetterOption(savingsAmount > 0 ? 'Low Interest Rate' : 'Cash Back Rebate');
  };

  const handleReset = () => {
    setPurchasePrice(25000);
    setCashBackAmount(2000);
    setLowInterestRate(2.9);
    setStandardInterestRate(6.5);
    setLoanTerm(60);
    setDownPayment(3000);
    setErrors({});
  };

  const handleCopy = () => {
    const resultText = `Cash Back vs Low Interest Comparison:
Purchase Price: ${formatCurrency(purchasePrice)}
Down Payment: ${formatCurrency(downPayment)}

Cash Back Option:
  Rebate: ${formatCurrency(cashBackAmount)}
  Monthly Payment: ${formatCurrency(cashBackMonthlyPayment)}
  Total Interest: ${formatCurrency(cashBackTotalInterest)}
  Total Cost: ${formatCurrency(cashBackTotalCost)}

Low Interest Option:
  Monthly Payment: ${formatCurrency(lowInterestMonthlyPayment)}
  Total Interest: ${formatCurrency(lowInterestTotalInterest)}
  Total Cost: ${formatCurrency(lowInterestTotalCost)}

Better Option: ${betterOption}
Savings: ${formatCurrency(savings)}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Cash Back or Low Interest Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Compare cash back rebates vs low interest rate financing to find the best deal.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5" /> Financing Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                {errors.purchasePrice && <span className="text-sm text-red-500">{errors.purchasePrice}</span>}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="purchasePrice"
                  type="number"
                  className="pl-10"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[purchasePrice]}
                max={100000}
                min={5000}
                step={500}
                onValueChange={(values) => setPurchasePrice(values[0])}
              />
            </div>

            <div>
              <div className="flex justify-between">
                <Label htmlFor="downPayment">Down Payment</Label>
                {errors.downPayment && <span className="text-sm text-red-500">{errors.downPayment}</span>}
              </div>
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
                max={purchasePrice * 0.5}
                min={0}
                step={500}
                onValueChange={(values) => setDownPayment(values[0])}
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="cashBackAmount">Cash Back Rebate Amount</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="cashBackAmount"
                  type="number"
                  className="pl-10"
                  value={cashBackAmount}
                  onChange={(e) => setCashBackAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[cashBackAmount]}
                max={10000}
                min={0}
                step={100}
                onValueChange={(values) => setCashBackAmount(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="standardInterestRate">Standard Interest Rate (with Cash Back) %</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="standardInterestRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={standardInterestRate}
                  onChange={(e) => setStandardInterestRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[standardInterestRate]}
                max={15}
                min={0}
                step={0.1}
                onValueChange={(values) => setStandardInterestRate(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="lowInterestRate">Low Interest Rate (without Cash Back) %</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="lowInterestRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={lowInterestRate}
                  onChange={(e) => setLowInterestRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[lowInterestRate]}
                max={10}
                min={0}
                step={0.1}
                onValueChange={(values) => setLowInterestRate(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="loanTerm">Loan Term (Months)</Label>
              <Input
                id="loanTerm"
                type="number"
                className="mt-1.5"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[loanTerm]}
                max={84}
                min={12}
                step={6}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={savings}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Comparison Results
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Better Option</h3>
                  <div className="mt-1 text-2xl font-bold">{betterOption}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Saves you {formatCurrency(savings)} over the loan term
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Cash Back Option</h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm text-muted-foreground">Monthly Payment</h4>
                      <div className="text-xl font-bold">{formatCurrency(cashBackMonthlyPayment)}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm text-muted-foreground">Total Interest</h4>
                      <div className="text-xl font-bold">{formatCurrency(cashBackTotalInterest)}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm text-muted-foreground">Total Cost</h4>
                      <div className="text-xl font-bold">{formatCurrency(cashBackTotalCost)}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Low Interest Option</h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm text-muted-foreground">Monthly Payment</h4>
                      <div className="text-xl font-bold">{formatCurrency(lowInterestMonthlyPayment)}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm text-muted-foreground">Total Interest</h4>
                      <div className="text-xl font-bold">{formatCurrency(lowInterestTotalInterest)}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm text-muted-foreground">Total Cost</h4>
                      <div className="text-xl font-bold">{formatCurrency(lowInterestTotalCost)}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Making the Right Choice</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">Cash Back Benefits</h3>
                <p className="text-muted-foreground text-sm">
                  Immediate savings that reduce your principal amount. Great for shorter loan terms or when 
                  interest rates are similar.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Low Interest Benefits</h3>
                <p className="text-muted-foreground text-sm">
                  Lower monthly payments and less interest paid over time. Better for longer loan terms and 
                  when rate difference is significant.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Consider Your Budget</h3>
                <p className="text-muted-foreground text-sm">
                  Even if total cost is lower with cash back, low interest may offer more manageable monthly 
                  payments for your budget.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Long-Term Savings</h3>
                <p className="text-muted-foreground text-sm">
                  Use this calculator to see the complete financial picture, not just the upfront incentive. 
                  The best deal depends on your specific situation.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
