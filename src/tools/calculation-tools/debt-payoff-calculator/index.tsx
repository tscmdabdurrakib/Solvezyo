import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Info, DollarSign, Percent, RefreshCw, TrendingDown, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DebtPayoffCalculator Component
 * 
 * Calculate debt payoff timeline and total interest for any type of debt
 * with fixed or variable interest rates.
 */
export function DebtPayoffCalculator() {
  const [totalDebt, setTotalDebt] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(500);
  const [extraPayment, setExtraPayment] = useState<number>(0);
  
  const [monthsToPayoff, setMonthsToPayoff] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    calculateDebtPayoff();
  }, [totalDebt, interestRate, monthlyPayment, extraPayment]);

  const calculateDebtPayoff = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (totalDebt <= 0) newErrors.totalDebt = "Debt must be greater than 0";
    if (interestRate < 0) newErrors.interestRate = "Rate cannot be negative";
    if (monthlyPayment <= 0) newErrors.monthlyPayment = "Payment must be greater than 0";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    const monthlyRate = (interestRate / 100) / 12;
    const effectivePayment = monthlyPayment + extraPayment;
    const minimumInterest = totalDebt * monthlyRate;
    
    if (effectivePayment <= minimumInterest) {
      setMonthsToPayoff(999);
      setTotalInterest(999999);
      setTotalPaid(999999);
      setProjectionData([]);
      return;
    }
    
    let balance = totalDebt;
    let months = 0;
    let totalInterestPaid = 0;
    const data = [];
    const maxMonths = 600;
    
    while (balance > 0.01 && months < maxMonths) {
      months++;
      const interest = balance * monthlyRate;
      totalInterestPaid += interest;
      const principalPayment = effectivePayment - interest;
      balance -= principalPayment;
      
      if (months % 6 === 0 || balance <= 0) {
        data.push({
          month: `Month ${months}`,
          'Remaining Balance': Math.max(0, balance),
          'Total Interest': totalInterestPaid,
          'Principal Paid': totalDebt - Math.max(0, balance),
        });
      }
    }
    
    setMonthsToPayoff(months);
    setTotalInterest(totalInterestPaid);
    setTotalPaid(totalDebt + totalInterestPaid);
    setProjectionData(data);
  };

  const handleReset = () => {
    setTotalDebt(25000);
    setInterestRate(12);
    setMonthlyPayment(500);
    setExtraPayment(0);
    setErrors({});
  };

  const handleCopy = () => {
    const resultText = `Debt Payoff Results:
Total Debt: ${formatCurrency(totalDebt)}
Monthly Payment: ${formatCurrency(monthlyPayment + extraPayment)}
Months to Payoff: ${monthsToPayoff} months
Total Interest: ${formatCurrency(totalInterest)}
Total Paid: ${formatCurrency(totalPaid)}`;
    
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

  const pieData = [
    { name: 'Principal', value: totalDebt, color: '#3B82F6' },
    { name: 'Interest', value: totalInterest, color: '#EF4444' }
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Debt Payoff Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate how quickly you can pay off your debt and see the impact of extra payments.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingDown className="mr-2 h-5 w-5" /> Debt Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between">
                <Label htmlFor="totalDebt">Total Debt</Label>
                {errors.totalDebt && <span className="text-sm text-red-500">{errors.totalDebt}</span>}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="totalDebt" type="number" className="pl-10" value={totalDebt} onChange={(e) => setTotalDebt(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[totalDebt]} max={100000} min={100} step={100} onValueChange={(v) => setTotalDebt(v[0])} />
            </div>

            <div>
              <div className="flex justify-between">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                {errors.interestRate && <span className="text-sm text-red-500">{errors.interestRate}</span>}
              </div>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="interestRate" type="number" step="0.1" className="pl-10" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[interestRate]} max={30} min={0} step={0.1} onValueChange={(v) => setInterestRate(v[0])} />
            </div>

            <div>
              <div className="flex justify-between">
                <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                {errors.monthlyPayment && <span className="text-sm text-red-500">{errors.monthlyPayment}</span>}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="monthlyPayment" type="number" className="pl-10" value={monthlyPayment} onChange={(e) => setMonthlyPayment(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[monthlyPayment]} max={5000} min={25} step={25} onValueChange={(v) => setMonthlyPayment(v[0])} />
            </div>

            <div>
              <Label htmlFor="extraPayment">Extra Monthly Payment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="extraPayment" type="number" className="pl-10" value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[extraPayment]} max={2000} min={0} step={25} onValueChange={(v) => setExtraPayment(v[0])} />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div key={monthsToPayoff} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Payoff Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Time to Debt-Free</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {monthsToPayoff >= 999 ? 'Never' : `${monthsToPayoff} months`}
                    </div>
                    {monthsToPayoff < 999 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.floor(monthsToPayoff / 12)} years, {monthsToPayoff % 12} months
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Effective Payment</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(monthlyPayment + extraPayment)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                    <div className="mt-1 text-2xl font-bold text-red-600">
                      {monthsToPayoff >= 999 ? 'N/A' : formatCurrency(totalInterest)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Paid</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {monthsToPayoff >= 999 ? 'N/A' : formatCurrency(totalPaid)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payoff Visualization</h2>
            
            <Tabs defaultValue="timeline">
              <TabsList className="mb-4">
                <TabsTrigger value="timeline">Payment Timeline</TabsTrigger>
                <TabsTrigger value="distribution">Cost Distribution</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timeline" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="Remaining Balance" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Principal Paid" stroke="#10B981" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="distribution" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={80} outerRadius={120} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Debt Payoff Tips</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">Make Extra Payments</h3>
            <p className="text-muted-foreground text-sm">
              Even small extra payments can significantly reduce your payoff time and total interest. 
              Try to pay more than the minimum whenever possible.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Prioritize High-Interest Debt</h3>
            <p className="text-muted-foreground text-sm">
              Focus on paying off debt with the highest interest rates first to minimize total interest costs. 
              This is known as the avalanche method.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Consider Debt Consolidation</h3>
            <p className="text-muted-foreground text-sm">
              If you have multiple debts, consolidating them into a single loan with a lower interest rate 
              can simplify payments and save money.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DebtPayoffCalculator;
