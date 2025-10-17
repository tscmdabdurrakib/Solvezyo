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
 * PresentValueCalculator Component
 * 
 * Calculate the present value of future cash flows
 */
export function PresentValueCalculator() {
  const { toast } = useToast();

  // State for input values
  const [futureValue, setFutureValue] = useState<number>(100000);
  const [discountRate, setDiscountRate] = useState<number>(5);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  
  // State for calculated results
  const [presentValue, setPresentValue] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);

  // Calculate present value when inputs change
  useEffect(() => {
    calculatePresentValue();
  }, [futureValue, discountRate, timePeriod]);

  // Function to calculate present value
  const calculatePresentValue = () => {
    // PV = FV / (1 + r)^n
    // Where: PV = Present Value, FV = Future Value, r = discount rate, n = number of periods
    const rate = discountRate / 100;
    const pv = futureValue / Math.pow(1 + rate, timePeriod);
    const discount = futureValue - pv;
    
    setPresentValue(pv);
    setTotalDiscount(discount);
  };

  // Function to reset all values
  const handleReset = () => {
    setFutureValue(100000);
    setDiscountRate(5);
    setTimePeriod(10);
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
    const result = `Present Value Analysis:
Future Value: ${formatCurrency(futureValue)}
Discount Rate: ${discountRate}%
Time Period: ${timePeriod} years
Present Value: ${formatCurrency(presentValue)}
Total Discount: ${formatCurrency(totalDiscount)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Present Value Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the present value of future cash flows
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Investment Parameters
          </h2>
          
          <div className="space-y-6">
            {/* Future Value */}
            <div>
              <Label htmlFor="futureValue">Future Value</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="futureValue"
                  type="number"
                  className="pl-10"
                  value={futureValue}
                  onChange={(e) => setFutureValue(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[futureValue]}
                max={1000000}
                step={1000}
                onValueChange={(values) => setFutureValue(values[0])}
              />
            </div>

            {/* Discount Rate */}
            <div>
              <Label htmlFor="discountRate">Discount Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="discountRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[discountRate]}
                max={20}
                step={0.1}
                onValueChange={(values) => setDiscountRate(values[0])}
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
                max={50}
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
                  <h2 className="text-xl font-semibold">Present Value Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200 flex items-center">
                      <TrendingDown className="mr-2 h-4 w-4" />
                      Present Value
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(presentValue)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Future Value</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(futureValue)}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Discount</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(totalDiscount)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-muted-foreground">Discount Rate</h3>
                      <div className="mt-1 text-lg font-bold">
                        {discountRate}%
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
            <h3 className="font-semibold text-lg mb-3">Understanding Present Value</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Present Value (PV) is the current worth of a future sum of money
              </p>
              <p>
                • It accounts for the time value of money - money now is worth more than the same amount in the future
              </p>
              <p>
                • Higher discount rates result in lower present values
              </p>
              <p>
                • Used for investment analysis, bond pricing, and financial planning
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PresentValueCalculator;
