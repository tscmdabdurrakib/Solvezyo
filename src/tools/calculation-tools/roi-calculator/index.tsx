import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ROICalculator Component
 * 
 * Calculate Return on Investment for any investment or business venture
 */
export function ROICalculator() {
  const { toast } = useToast();

  const [investmentCost, setInvestmentCost] = useState<number>(10000);
  const [returnAmount, setReturnAmount] = useState<number>(15000);
  const [timeHeld, setTimeHeld] = useState<number>(2);
  
  const [roi, setROI] = useState<number>(0);
  const [annualizedROI, setAnnualizedROI] = useState<number>(0);
  const [totalGain, setTotalGain] = useState<number>(0);

  useEffect(() => {
    calculateROI();
  }, [investmentCost, returnAmount, timeHeld]);

  const calculateROI = () => {
    // ROI = (Net Profit / Cost of Investment) × 100
    const gain = returnAmount - investmentCost;
    const roiPercent = investmentCost > 0 ? (gain / investmentCost) * 100 : 0;
    
    // Annualized ROI = [(1 + ROI)^(1/years) - 1] × 100
    const annualized = timeHeld > 0 
      ? (Math.pow(1 + roiPercent / 100, 1 / timeHeld) - 1) * 100 
      : roiPercent;
    
    setROI(roiPercent);
    setAnnualizedROI(annualized);
    setTotalGain(gain);
  };

  const handleReset = () => {
    setInvestmentCost(10000);
    setReturnAmount(15000);
    setTimeHeld(2);
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
    const result = `ROI Analysis:
Investment Cost: ${formatCurrency(investmentCost)}
Return Amount: ${formatCurrency(returnAmount)}
Time Held: ${timeHeld} years

Total Gain/Loss: ${formatCurrency(totalGain)}
ROI: ${roi.toFixed(2)}%
Annualized ROI: ${annualizedROI.toFixed(2)}%`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "ROI results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">ROI Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate Return on Investment for your ventures
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> Investment Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="cost">Investment Cost</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="cost"
                  type="number"
                  className="pl-10"
                  value={investmentCost}
                  onChange={(e) => setInvestmentCost(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[investmentCost]}
                max={100000}
                step={500}
                onValueChange={(values) => setInvestmentCost(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="return">Return Amount (Final Value)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="return"
                  type="number"
                  className="pl-10"
                  value={returnAmount}
                  onChange={(e) => setReturnAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[returnAmount]}
                max={200000}
                step={500}
                onValueChange={(values) => setReturnAmount(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="time">Time Held (years)</Label>
              <Input
                id="time"
                type="number"
                step="0.1"
                value={timeHeld}
                onChange={(e) => setTimeHeld(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[timeHeld]}
                max={30}
                step={0.5}
                onValueChange={(values) => setTimeHeld(values[0])}
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
                  <h2 className="text-xl font-semibold">ROI Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${totalGain >= 0
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'}`}>
                    <h3 className={`text-sm font-medium ${totalGain >= 0
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'}`}>
                      Total {totalGain >= 0 ? 'Gain' : 'Loss'}
                    </h3>
                    <div className={`mt-1 text-3xl font-bold ${totalGain >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(Math.abs(totalGain))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Return on Investment (ROI)</h3>
                    <div className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {roi.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Annualized ROI</h3>
                    <div className="mt-1 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {annualizedROI.toFixed(2)}%
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      Average yearly return
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Understanding ROI</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• ROI measures the profitability of an investment</p>
              <p>• Positive ROI means you gained money, negative means you lost</p>
              <p>• Annualized ROI helps compare investments of different time periods</p>
              <p>• Good ROI varies by industry - stock market averages ~10% annually</p>
              <p>• Consider risk, time, and opportunity cost when evaluating ROI</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ROICalculator;
