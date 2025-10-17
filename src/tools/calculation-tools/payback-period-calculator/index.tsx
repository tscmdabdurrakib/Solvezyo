import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PaybackPeriodCalculator Component
 * 
 * Calculate the time required to recover an initial investment
 */
export function PaybackPeriodCalculator() {
  const { toast } = useToast();

  // State for input values
  const [initialInvestment, setInitialInvestment] = useState<number>(50000);
  const [annualCashFlow, setAnnualCashFlow] = useState<number>(12000);
  
  // State for calculated results
  const [paybackPeriod, setPaybackPeriod] = useState<number>(0);
  const [paybackYears, setPaybackYears] = useState<number>(0);
  const [paybackMonths, setPaybackMonths] = useState<number>(0);

  // Calculate payback period when inputs change
  useEffect(() => {
    calculatePaybackPeriod();
  }, [initialInvestment, annualCashFlow]);

  // Function to calculate payback period
  const calculatePaybackPeriod = () => {
    if (annualCashFlow <= 0) {
      setPaybackPeriod(0);
      setPaybackYears(0);
      setPaybackMonths(0);
      return;
    }

    // Payback Period = Initial Investment / Annual Cash Flow
    const period = initialInvestment / annualCashFlow;
    const years = Math.floor(period);
    const months = Math.round((period - years) * 12);
    
    setPaybackPeriod(period);
    setPaybackYears(years);
    setPaybackMonths(months);
  };

  // Function to reset all values
  const handleReset = () => {
    setInitialInvestment(50000);
    setAnnualCashFlow(12000);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Payback Period Analysis:
Initial Investment: ${formatCurrency(initialInvestment)}
Annual Cash Flow: ${formatCurrency(annualCashFlow)}
Payback Period: ${paybackYears} years and ${paybackMonths} months (${paybackPeriod.toFixed(2)} years)`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Payback Period Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the time required to recover your initial investment
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Investment Details
          </h2>
          
          <div className="space-y-6">
            {/* Initial Investment */}
            <div>
              <Label htmlFor="investment">Initial Investment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="investment"
                  type="number"
                  className="pl-10"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[initialInvestment]}
                max={500000}
                step={1000}
                onValueChange={(values) => setInitialInvestment(values[0])}
              />
            </div>

            {/* Annual Cash Flow */}
            <div>
              <Label htmlFor="cashflow">Annual Cash Flow</Label>
              <div className="relative mt-1.5">
                <TrendingUp className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="cashflow"
                  type="number"
                  className="pl-10"
                  value={annualCashFlow}
                  onChange={(e) => setAnnualCashFlow(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[annualCashFlow]}
                max={100000}
                step={500}
                onValueChange={(values) => setAnnualCashFlow(values[0])}
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
                  <h2 className="text-xl font-semibold">Payback Analysis</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Payback Period
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {paybackYears} years {paybackMonths} months
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {paybackPeriod.toFixed(2)} years total
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Initial Investment</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(initialInvestment)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Annual Cash Flow</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(annualCashFlow)}
                    </div>
                  </div>

                  {annualCashFlow <= 0 && (
                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200 flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Invalid Input
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        Annual cash flow must be greater than zero
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Payback Period</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • The payback period measures how long it takes to recover your initial investment
              </p>
              <p>
                • Shorter payback periods are generally preferred as they indicate faster returns
              </p>
              <p>
                • This calculation assumes constant annual cash flows
              </p>
              <p>
                • Does not account for the time value of money - consider NPV for that
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PaybackPeriodCalculator;
