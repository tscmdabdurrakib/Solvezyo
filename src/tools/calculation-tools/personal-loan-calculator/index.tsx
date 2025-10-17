import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Calendar, Percent, RefreshCw, Copy, Check, Info, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(15000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [loanTerm, setLoanTerm] = useState<number>(3);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    let payment = 0;
    if (monthlyRate === 0) {
      payment = loanAmount / numPayments;
    } else {
      const x = Math.pow(1 + monthlyRate, numPayments);
      payment = (loanAmount * monthlyRate * x) / (x - 1);
    }
    
    setMonthlyPayment(payment);
    const total = payment * numPayments;
    setTotalPayment(total);
    setTotalInterest(total - loanAmount);
  };

  const handleReset = () => {
    setLoanAmount(15000);
    setInterestRate(10.5);
    setLoanTerm(3);
  };

  const handleCopy = () => {
    const resultText = `Personal Loan Results:
Loan Amount: ${formatCurrency(loanAmount)}
Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years
Monthly Payment: ${formatCurrency(monthlyPayment)}
Total Payment: ${formatCurrency(totalPayment)}
Total Interest: ${formatCurrency(totalInterest)}`;
    
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
    { name: 'Principal', value: loanAmount, color: '#3B82F6' },
    { name: 'Interest', value: totalInterest, color: '#EF4444' }
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Personal Loan Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate monthly payments and total costs for personal loans.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5" /> Loan Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="loanAmount">Loan Amount</Label>
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
                value={[loanAmount]}
                max={50000}
                min={1000}
                step={500}
                onValueChange={(values) => setLoanAmount(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$1K</span>
                <span>$25K</span>
                <span>$50K</span>
              </div>
            </div>

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
                max={36}
                min={3}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>3%</span>
                <span>18%</span>
                <span>36%</span>
              </div>
            </div>

            <div>
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
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
                value={[loanTerm]}
                max={10}
                min={1}
                step={1}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1y</span>
                <span>5y</span>
                <span>10y</span>
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={monthlyPayment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Loan Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Monthly Payment</h3>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(monthlyPayment)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    For {loanTerm * 12} months
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Principal</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(loanAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                    <div className="mt-1 text-xl font-bold text-red-600">
                      {formatCurrency(totalInterest)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Paid</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(totalPayment)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Breakdown</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Personal Loan Guide
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">What is a Personal Loan?</h3>
                <p>
                  A personal loan is an unsecured loan that can be used for various purposes like debt consolidation, 
                  home improvements, or major purchases. No collateral is required, but rates are typically higher than secured loans.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Interest Rates</h3>
                <p>
                  Personal loan rates typically range from 6% to 36% based on your credit score, income, and lender. 
                  Excellent credit scores can qualify for rates below 10%, while poor credit may see rates above 25%.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Borrowing Tips</h3>
                <p>
                  Only borrow what you need and can afford to repay. Compare offers from multiple lenders, check for 
                  origination fees, and consider the total cost, not just the monthly payment.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PersonalLoanCalculator;
