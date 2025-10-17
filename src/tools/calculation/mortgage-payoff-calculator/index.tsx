import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Calendar, Percent, Info, RefreshCw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const MortgagePayoffCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [extraPayment, setExtraPayment] = useState<number>(0);
  const [results, setResults] = useState<any>(null);

  const [errors, setErrors] = useState<{
    loanAmount?: string;
    interestRate?: string;
    loanTerm?: string;
    extraPayment?: string;
  }>({});

  useEffect(() => {
    calculateMortgagePayoff();
  }, [loanAmount, interestRate, loanTerm, extraPayment]);

  const calculateMortgagePayoff = () => {
    const newErrors: {
      loanAmount?: string;
      interestRate?: string;
      loanTerm?: string;
      extraPayment?: string;
    } = {};

    if (loanAmount <= 0) newErrors.loanAmount = "Loan amount must be greater than 0";
    if (interestRate <= 0) newErrors.interestRate = "Interest rate must be greater than 0";
    if (loanTerm <= 0) newErrors.loanTerm = "Loan term must be greater than 0";
    if (extraPayment < 0) newErrors.extraPayment = "Extra payment cannot be negative";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setResults(null);
      return;
    }

    const principal = loanAmount;
    const annualInterestRate = interestRate / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfMonths = loanTerm * 12;
    const extra = extraPayment;

    if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(numberOfMonths)) {
      setResults(null);
      return;
    }

    // Calculate monthly payment
    const monthlyPayment =
      principal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
      (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    const totalPayment = monthlyPayment * numberOfMonths;
    const totalInterest = totalPayment - principal;

    let remainingBalance = principal;
    let monthsWithExtra = 0;
    let totalInterestWithExtra = 0;
    let totalPaymentWithExtra = 0;

    if (extra > 0) {
      let currentBalance = principal;
      let currentMonths = 0;
      let currentTotalInterest = 0;
      let currentTotalPayment = 0;

      while (currentBalance > 0 && currentMonths < numberOfMonths * 2) { // Add a safety break
        const interest = currentBalance * monthlyInterestRate;
        const payment = monthlyPayment + extra;
        const principalPaid = payment - interest;

        currentBalance -= principalPaid;
        currentTotalInterest += interest;
        currentTotalPayment += payment;
        currentMonths++;

        if (currentBalance <= 0) {
          currentTotalPayment += currentBalance; // Adjust for last payment
          currentBalance = 0;
        }
      }
      monthsWithExtra = currentMonths;
      totalInterestWithExtra = currentTotalInterest;
      totalPaymentWithExtra = currentTotalPayment;
    }

    setResults({
      monthlyPayment: monthlyPayment,
      totalPayment: totalPayment,
      totalInterest: totalInterest,
      payoffTimeMonths: numberOfMonths,
      payoffTimeYears: Math.floor(numberOfMonths / 12),
      payoffTimeRemainingMonths: numberOfMonths % 12,
      totalPaymentWithExtra: extra > 0 ? totalPaymentWithExtra : null,
      totalInterestWithExtra: extra > 0 ? totalInterestWithExtra : null,
      payoffTimeWithExtraMonths: extra > 0 ? monthsWithExtra : null,
      payoffTimeWithExtraYears: extra > 0 ? Math.floor(monthsWithExtra / 12) : null,
      payoffTimeWithExtraRemainingMonths: extra > 0 ? monthsWithExtra % 12 : null,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleReset = () => {
    setLoanAmount(300000);
    setInterestRate(4.5);
    setLoanTerm(30);
    setExtraPayment(0);
    setErrors({});
    setResults(null);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Mortgage Payoff Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate how much you can save by making extra payments on your mortgage.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Loan Details
          </h2>

          <div className="space-y-6">
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                {errors.loanAmount && (
                  <span className="text-sm text-red-500">{errors.loanAmount}</span>
                )}
              </div>
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
                defaultValue={[loanAmount]}
                max={1000000}
                step={1000}
                value={[loanAmount]}
                onValueChange={(values) => setLoanAmount(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$0</span>
                <span>{formatCurrency(500000)}</span>
                <span>{formatCurrency(1000000)}</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="interestRate">Interest Rate (Annual %)</Label>
                {errors.interestRate && (
                  <span className="text-sm text-red-500">{errors.interestRate}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  className="pl-10"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                defaultValue={[interestRate]}
                max={15}
                step={0.01}
                value={[interestRate]}
                onValueChange={(values) => setInterestRate(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>7.5%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                {errors.loanTerm && (
                  <span className="text-sm text-red-500">{errors.loanTerm}</span>
                )}
              </div>
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
                defaultValue={[loanTerm]}
                max={40}
                step={1}
                value={[loanTerm]}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0y</span>
                <span>20y</span>
                <span>40y</span>
              </div>
            </div>

            {/* Extra Monthly Payment */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="extraPayment">Extra Monthly Payment (Optional)</Label>
                {errors.extraPayment && (
                  <span className="text-sm text-red-500">{errors.extraPayment}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="extraPayment"
                  type="number"
                  className="pl-10"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                defaultValue={[extraPayment]}
                max={1000}
                step={10}
                value={[extraPayment]}
                onValueChange={(values) => setExtraPayment(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$0</span>
                <span>$500</span>
                <span>$1000</span>
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          {/* Summary Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Payoff Summary
            </h2>

            {results && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Original Monthly Payment</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(results.monthlyPayment)}
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Original Total Interest</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(results.totalInterest)}
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Original Payoff Time</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {results.payoffTimeYears}y {results.payoffTimeRemainingMonths}m
                    </div>
                  </div>
                </div>

                {extraPayment > 0 && results.payoffTimeWithExtraMonths !== null && (
                  <>
                    <Separator className="my-4" />
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-primary">New Total Payments</h3>
                        <div className="mt-1 text-2xl font-bold">
                          {formatCurrency(results.totalPaymentWithExtra)}
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-primary">New Total Interest</h3>
                        <div className="mt-1 text-2xl font-bold">
                          {formatCurrency(results.totalInterestWithExtra)}
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-primary">New Payoff Time</h3>
                        <div className="mt-1 text-2xl font-bold">
                          {results.payoffTimeWithExtraYears}y {results.payoffTimeWithExtraRemainingMonths}m
                        </div>
                      </div>
                      <div className="bg-green-100/50 p-4 rounded-lg dark:bg-green-900/30">
                        <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Time Saved</h3>
                        <div className="mt-1 text-2xl font-bold">
                          {Math.floor((results.payoffTimeMonths - results.payoffTimeWithExtraMonths) / 12)}y {(results.payoffTimeMonths - results.payoffTimeWithExtraMonths) % 12}m
                        </div>
                      </div>
                      <div className="bg-green-100/50 p-4 rounded-lg dark:bg-green-900/30">
                        <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Interest Saved</h3>
                        <div className="mt-1 text-2xl font-bold">
                          {formatCurrency(results.totalInterest - results.totalInterestWithExtra)}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            {!results && (
              <div className="text-center text-muted-foreground py-8">
                Enter your loan details to see the payoff summary.
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Information Section */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Understanding Mortgage Payoff</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">How Extra Payments Help</h3>
            <p className="text-muted-foreground text-sm">
              Making extra payments directly reduces your principal balance. This means you pay less interest over the life of the loan and can pay off your mortgage faster, saving you a significant amount of money.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Benefits of Early Payoff</h3>
            <p className="text-muted-foreground text-sm">
              Paying off your mortgage early can free up cash flow, reduce financial stress, and build equity in your home faster. It's a powerful strategy for long-term financial health.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Considerations</h3>
            <p className="text-muted-foreground text-sm">
              Before making extra payments, ensure you have an emergency fund and are meeting other financial goals. Check with your lender for any prepayment penalties, though these are rare for most conventional mortgages.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MortgagePayoffCalculator;
