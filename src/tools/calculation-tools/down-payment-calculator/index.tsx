import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export function DownPaymentCalculator() {
  const { toast } = useToast();

  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [needsPMI, setNeedsPMI] = useState<boolean>(false);

  useEffect(() => {
    calculate();
  }, [homePrice, downPaymentPercent]);

  const calculate = () => {
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loan = homePrice - downPayment;
    const pmi = downPaymentPercent < 20;
    
    setDownPaymentAmount(downPayment);
    setLoanAmount(loan);
    setNeedsPMI(pmi);
  };

  const handleReset = () => {
    setHomePrice(300000);
    setDownPaymentPercent(20);
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
    const result = `Down Payment Analysis:
Home Price: ${formatCurrency(homePrice)}
Down Payment: ${downPaymentPercent}% (${formatCurrency(downPaymentAmount)})
Loan Amount: ${formatCurrency(loanAmount)}
PMI Required: ${needsPMI ? 'Yes' : 'No'}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Down Payment Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate required down payment for your home purchase
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Purchase Details</h2>
          
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
              <Label htmlFor="percent">Down Payment Percentage</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="percent"
                  type="number"
                  step="0.5"
                  className="pl-10"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[downPaymentPercent]}
                max={50}
                step={0.5}
                onValueChange={(values) => setDownPaymentPercent(values[0])}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Down Payment Amount</h3>
                    <div className="mt-1 text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(downPaymentAmount)}
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {downPaymentPercent}% of {formatCurrency(homePrice)}
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Loan Amount</h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(loanAmount)}
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${needsPMI
                    ? 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
                    : 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'}`}>
                    <h3 className={`text-sm font-medium ${needsPMI
                      ? 'text-orange-800 dark:text-orange-200'
                      : 'text-green-800 dark:text-green-200'}`}>
                      PMI Requirement
                    </h3>
                    <div className={`mt-1 text-xl font-bold ${needsPMI
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-green-600 dark:text-green-400'}`}>
                      {needsPMI ? 'Required' : 'Not Required'}
                    </div>
                    <p className={`text-xs mt-1 ${needsPMI
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-green-600 dark:text-green-400'}`}>
                      {needsPMI ? '< 20% down payment' : '≥ 20% down payment'}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Down Payment Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• 20% down payment avoids PMI (Private Mortgage Insurance)</p>
              <p>• Larger down payment = lower monthly payments</p>
              <p>• FHA loans allow as little as 3.5% down</p>
              <p>• VA loans offer 0% down for eligible veterans</p>
              <p>• Save for closing costs (2-5% of home price) separately</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DownPaymentCalculator;
