import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info, DollarSign, Percent, RefreshCw, GitMerge, Copy, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

export function DebtConsolidationCalculator() {
  const [currentDebts, setCurrentDebts] = useState([
    { name: 'Credit Card 1', balance: 8000, rate: 19.99, payment: 200 },
    { name: 'Credit Card 2', balance: 5000, rate: 24.99, payment: 125 },
    { name: 'Personal Loan', balance: 12000, rate: 12.5, payment: 350 },
  ]);
  
  const [consolidatedRate, setConsolidatedRate] = useState<number>(9.5);
  const [consolidatedTerm, setConsolidatedTerm] = useState<number>(5);
  
  const [currentTotalDebt, setCurrentTotalDebt] = useState<number>(0);
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState<number>(0);
  const [currentTotalInterest, setCurrentTotalInterest] = useState<number>(0);
  const [consolidatedMonthlyPayment, setConsolidatedMonthlyPayment] = useState<number>(0);
  const [consolidatedTotalInterest, setConsolidatedTotalInterest] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateConsolidation();
  }, [currentDebts, consolidatedRate, consolidatedTerm]);

  const calculateConsolidation = () => {
    // Calculate current debt totals
    const totalDebt = currentDebts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalPayment = currentDebts.reduce((sum, debt) => sum + debt.payment, 0);
    
    // Estimate current total interest (simplified)
    let currentInterest = 0;
    currentDebts.forEach(debt => {
      const monthlyRate = (debt.rate / 100) / 12;
      if (debt.payment > 0) {
        let balance = debt.balance;
        let months = 0;
        while (balance > 0 && months < 600) {
          const interest = balance * monthlyRate;
          currentInterest += interest;
          balance = balance + interest - debt.payment;
          months++;
        }
      }
    });
    
    // Calculate consolidated loan
    const monthlyRate = (consolidatedRate / 100) / 12;
    const numPayments = consolidatedTerm * 12;
    const consolidatedPmt = totalDebt * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const consolidatedTotal = consolidatedPmt * numPayments;
    const consolidatedInt = consolidatedTotal - totalDebt;
    
    setCurrentTotalDebt(totalDebt);
    setCurrentMonthlyPayment(totalPayment);
    setCurrentTotalInterest(currentInterest);
    setConsolidatedMonthlyPayment(consolidatedPmt);
    setConsolidatedTotalInterest(consolidatedInt);
    setSavings(currentInterest - consolidatedInt);
  };

  const handleReset = () => {
    setCurrentDebts([
      { name: 'Credit Card 1', balance: 8000, rate: 19.99, payment: 200 },
      { name: 'Credit Card 2', balance: 5000, rate: 24.99, payment: 125 },
      { name: 'Personal Loan', balance: 12000, rate: 12.5, payment: 350 },
    ]);
    setConsolidatedRate(9.5);
    setConsolidatedTerm(5);
  };

  const handleCopy = () => {
    const resultText = `Debt Consolidation Results:
Current Total Debt: ${formatCurrency(currentTotalDebt)}
Current Monthly Payment: ${formatCurrency(currentMonthlyPayment)}
Consolidated Monthly Payment: ${formatCurrency(consolidatedMonthlyPayment)}
Total Interest Savings: ${formatCurrency(savings)}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const comparisonData = [
    {
      name: 'Monthly Payment',
      'Current Debts': currentMonthlyPayment,
      'Consolidated Loan': consolidatedMonthlyPayment,
    },
    {
      name: 'Total Interest',
      'Current Debts': currentTotalInterest,
      'Consolidated Loan': consolidatedTotalInterest,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Debt Consolidation Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Compare your current debts with a consolidated loan to see potential savings.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <GitMerge className="mr-2 h-5 w-5" /> Consolidation Options
          </h2>
          
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-sm">Current Debts Summary</h3>
              {currentDebts.map((debt, idx) => (
                <div key={idx} className="text-xs text-muted-foreground">
                  {debt.name}: {formatCurrency(debt.balance)} @ {debt.rate}%
                </div>
              ))}
            </div>

            <Separator />

            <div>
              <Label htmlFor="consolidatedRate">Consolidated Loan APR (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="consolidatedRate" type="number" step="0.1" className="pl-10" value={consolidatedRate} onChange={(e) => setConsolidatedRate(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[consolidatedRate]} max={20} min={3} step={0.1} onValueChange={(v) => setConsolidatedRate(v[0])} />
            </div>

            <div>
              <Label htmlFor="consolidatedTerm">Loan Term (years)</Label>
              <Input id="consolidatedTerm" type="number" className="mt-1.5" value={consolidatedTerm} onChange={(e) => setConsolidatedTerm(Number(e.target.value))} />
              <Slider className="mt-2" value={[consolidatedTerm]} max={10} min={1} step={1} onValueChange={(v) => setConsolidatedTerm(v[0])} />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div key={savings} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
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
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-blue-100/40 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Debt</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(currentTotalDebt)}</div>
                  </div>
                  
                  <div className="bg-green-100/40 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Potential Savings</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                      {savings > 0 ? formatCurrency(savings) : 'N/A'}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Current Monthly Payment</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(currentMonthlyPayment)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Consolidated Payment</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(consolidatedMonthlyPayment)}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Comparison Chart</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="Current Debts" fill="#EF4444" />
                  <Bar dataKey="Consolidated Loan" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Debt Consolidation Benefits</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">Simplified Payments</h3>
            <p className="text-muted-foreground text-sm">
              Combine multiple debt payments into one single monthly payment, making it easier to manage your finances.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Lower Interest Rate</h3>
            <p className="text-muted-foreground text-sm">
              Often you can secure a lower interest rate than your current debts, especially for credit cards with high APRs.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Faster Payoff</h3>
            <p className="text-muted-foreground text-sm">
              With lower interest and a structured plan, you can pay off debt faster and save money in the long run.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DebtConsolidationCalculator;
