import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * FutureValueCalculator Component
 * 
 * Calculate the future value of an investment with compound interest
 */
export function FutureValueCalculator() {
  const { toast } = useToast();

  // State for input values
  const [presentValue, setPresentValue] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  
  // State for calculated results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Calculate future value when inputs change
  useEffect(() => {
    calculateFutureValue();
  }, [presentValue, interestRate, timePeriod, monthlyContribution]);

  // Function to calculate future value
  const calculateFutureValue = () => {
    // FV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
    // Where: FV = Future Value, PV = Present Value, r = rate per period, n = number of periods, PMT = payment per period
    const monthlyRate = interestRate / 100 / 12;
    const months = timePeriod * 12;
    
    // Future value of initial investment
    const fvInitial = presentValue * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly contributions (annuity)
    let fvContributions = 0;
    if (monthlyRate > 0) {
      fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      fvContributions = monthlyContribution * months;
    }
    
    const totalFV = fvInitial + fvContributions;
    const contributions = presentValue + (monthlyContribution * months);
    const interest = totalFV - contributions;
    
    setFutureValue(totalFV);
    setTotalContributions(contributions);
    setTotalInterest(interest);
  };

  // Function to reset all values
  const handleReset = () => {
    setPresentValue(10000);
    setInterestRate(7);
    setTimePeriod(10);
    setMonthlyContribution(200);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Future Value Analysis:
Initial Investment: ${formatCurrency(presentValue)}
Monthly Contribution: ${formatCurrency(monthlyContribution)}
Interest Rate: ${interestRate}%
Time Period: ${timePeriod} years
Future Value: ${formatCurrency(futureValue)}
Total Contributions: ${formatCurrency(totalContributions)}
Total Interest Earned: ${formatCurrency(totalInterest)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Future Value Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the future value of your investment with compound interest
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Investment Parameters
          </h2>
          
          <div className="space-y-6">
            {/* Initial Investment */}
            <div>
              <Label htmlFor="presentValue">Initial Investment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="presentValue"
                  type="number"
                  className="pl-10"
                  value={presentValue}
                  onChange={(e) => setPresentValue(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[presentValue]}
                max={100000}
                step={500}
                onValueChange={(values) => setPresentValue(values[0])}
              />
            </div>

            {/* Monthly Contribution */}
            <div>
              <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="monthlyContribution"
                  type="number"
                  className="pl-10"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[monthlyContribution]}
                max={2000}
                step={50}
                onValueChange={(values) => setMonthlyContribution(values[0])}
              />
            </div>

            {/* Interest Rate */}
            <div>
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
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
                max={20}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
            </div>

            {/* Time Period */}
            <div>
              <Label htmlFor="timePeriod">Time Period (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="timePeriod"
                  type="number"
                  className="pl-10"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[timePeriod]}
                max={40}
                step={1}
                onValueChange={(values) => setTimePeriod(values[0])}
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
                  <h2 className="text-xl font-semibold">Future Value Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Future Value
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(futureValue)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Contributions</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(totalContributions)}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Total Interest Earned</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(totalInterest)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-muted-foreground">Interest Rate</h3>
                      <div className="mt-1 text-lg font-bold">
                        {interestRate}%
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-muted-foreground">Time Period</h3>
                      <div className="mt-1 text-lg font-bold">
                        {timePeriod} years
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Understanding Future Value</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Future Value shows what your investment will be worth over time
              </p>
              <p>
                • Compound interest means you earn interest on your interest
              </p>
              <p>
                • Regular contributions significantly increase your final balance
              </p>
              <p>
                • Starting early and being consistent are keys to investment growth
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FutureValueCalculator;
