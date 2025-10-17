import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Percent, TrendingUp, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * CommissionCalculator Component
 * 
 * Calculate sales commission based on sales amount and commission rate
 */
export function CommissionCalculator() {
  const { toast } = useToast();

  // State for input values
  const [salesAmount, setSalesAmount] = useState<number>(50000);
  const [commissionRate, setCommissionRate] = useState<number>(5);
  const [baseSalary, setBaseSalary] = useState<number>(0);
  
  // State for calculated results
  const [commissionEarned, setCommissionEarned] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  // Calculate commission when inputs change
  useEffect(() => {
    calculateCommission();
  }, [salesAmount, commissionRate, baseSalary]);

  // Function to calculate commission
  const calculateCommission = () => {
    // Commission = Sales Amount × (Commission Rate / 100)
    const commission = salesAmount * (commissionRate / 100);
    const total = baseSalary + commission;
    
    setCommissionEarned(commission);
    setTotalEarnings(total);
  };

  // Function to reset all values
  const handleReset = () => {
    setSalesAmount(50000);
    setCommissionRate(5);
    setBaseSalary(0);
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
    const result = `Commission Calculation:
Sales Amount: ${formatCurrency(salesAmount)}
Commission Rate: ${commissionRate}%
Base Salary: ${formatCurrency(baseSalary)}
Commission Earned: ${formatCurrency(commissionEarned)}
Total Earnings: ${formatCurrency(totalEarnings)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Commission Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your sales commission and total earnings
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Sales Information
          </h2>
          
          <div className="space-y-6">
            {/* Sales Amount */}
            <div>
              <Label htmlFor="salesAmount">Total Sales Amount</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="salesAmount"
                  type="number"
                  className="pl-10"
                  value={salesAmount}
                  onChange={(e) => setSalesAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[salesAmount]}
                max={500000}
                step={1000}
                onValueChange={(values) => setSalesAmount(values[0])}
              />
            </div>

            {/* Commission Rate */}
            <div>
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="commissionRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[commissionRate]}
                max={50}
                step={0.5}
                onValueChange={(values) => setCommissionRate(values[0])}
              />
            </div>

            {/* Base Salary */}
            <div>
              <Label htmlFor="baseSalary">Base Salary (Optional)</Label>
              <div className="relative mt-1.5">
                <Wallet className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="baseSalary"
                  type="number"
                  className="pl-10"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[baseSalary]}
                max={100000}
                step={1000}
                onValueChange={(values) => setBaseSalary(values[0])}
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
                  <h2 className="text-xl font-semibold">Earnings Breakdown</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Total Earnings
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(totalEarnings)}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Commission Earned</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(commissionEarned)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Base Salary</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(baseSalary)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-muted-foreground">Sales Amount</h3>
                      <div className="mt-1 text-lg font-bold">
                        {formatCurrency(salesAmount)}
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-muted-foreground">Commission Rate</h3>
                      <div className="mt-1 text-lg font-bold">
                        {commissionRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Sales Commission</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Commission is a percentage of your total sales
              </p>
              <p>
                • Many sales positions offer base salary plus commission
              </p>
              <p>
                • Higher commission rates motivate increased sales performance
              </p>
              <p>
                • Some structures use tiered commission rates based on performance
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CommissionCalculator;
