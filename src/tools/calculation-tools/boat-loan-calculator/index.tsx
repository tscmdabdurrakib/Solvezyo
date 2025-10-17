import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Anchor, DollarSign, Calendar, Percent, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export function BoatLoanCalculator() {
  const [boatPrice, setBoatPrice] = useState<number>(75000);
  const [downPayment, setDownPayment] = useState<number>(15000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(15);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [salesTax, setSalesTax] = useState<number>(6);
  
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateBoatLoan();
  }, [boatPrice, downPayment, interestRate, loanTerm, tradeInValue, salesTax]);

  const calculateBoatLoan = () => {
    // Calculate sales tax amount
    const taxAmount = boatPrice * (salesTax / 100);
    
    // Calculate total amount to finance
    const totalBoatCost = boatPrice + taxAmount;
    const loanAmt = totalBoatCost - downPayment - tradeInValue;
    setLoanAmount(Math.max(0, loanAmt));
    
    if (loanAmt <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      setTotalCost(totalBoatCost);
      return;
    }
    
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    let payment = 0;
    if (monthlyRate === 0) {
      payment = loanAmt / numPayments;
    } else {
      const x = Math.pow(1 + monthlyRate, numPayments);
      payment = (loanAmt * monthlyRate * x) / (x - 1);
    }
    
    setMonthlyPayment(payment);
    const total = payment * numPayments;
    setTotalPayment(total);
    setTotalInterest(total - loanAmt);
    setTotalCost(total + downPayment + tradeInValue);
  };

  const handleReset = () => {
    setBoatPrice(75000);
    setDownPayment(15000);
    setInterestRate(6.5);
    setLoanTerm(15);
    setTradeInValue(0);
    setSalesTax(6);
  };

  const handleCopy = () => {
    const resultText = `Boat Loan Results:
Boat Price: ${formatCurrency(boatPrice)}
Down Payment: ${formatCurrency(downPayment)}
Trade-In Value: ${formatCurrency(tradeInValue)}
Loan Amount: ${formatCurrency(loanAmount)}
Monthly Payment: ${formatCurrency(monthlyPayment)}
Total Cost: ${formatCurrency(totalCost)}`;
    
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
    { name: 'Interest', value: totalInterest, color: '#EF4444' },
    { name: 'Down Payment', value: downPayment, color: '#10B981' },
    { name: 'Trade-In', value: tradeInValue, color: '#8B5CF6' }
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Boat Loan Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate monthly payments and total costs for your boat purchase.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Anchor className="mr-2 h-5 w-5" /> Boat Purchase Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="boatPrice">Boat Price</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="boatPrice"
                  type="number"
                  className="pl-10"
                  value={boatPrice}
                  onChange={(e) => setBoatPrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[boatPrice]}
                max={500000}
                min={10000}
                step={5000}
                onValueChange={(values) => setBoatPrice(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="downPayment">Down Payment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="downPayment"
                  type="number"
                  className="pl-10"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[downPayment]}
                max={boatPrice}
                min={0}
                step={1000}
                onValueChange={(values) => setDownPayment(values[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {boatPrice > 0 ? ((downPayment / boatPrice) * 100).toFixed(1) : 0}% of boat price
              </p>
            </div>

            <div>
              <Label htmlFor="tradeInValue">Trade-In Value (Optional)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="tradeInValue"
                  type="number"
                  className="pl-10"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="salesTax">Sales Tax (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="salesTax"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={salesTax}
                  onChange={(e) => setSalesTax(Number(e.target.value))}
                />
              </div>
            </div>

            <Separator />

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
                max={15}
                min={3}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
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
                max={20}
                min={1}
                step={1}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
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
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Monthly Payment</h3>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(monthlyPayment)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    For {loanTerm * 12} months
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(loanAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                    <div className="mt-1 text-2xl font-bold text-red-600">
                      {formatCurrency(totalInterest)}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Boat Price:</span>
                    <span className="font-semibold">{formatCurrency(boatPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sales Tax ({salesTax}%):</span>
                    <span className="font-semibold">+{formatCurrency(boatPrice * (salesTax / 100))}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Down Payment:</span>
                    <span className="font-semibold">-{formatCurrency(downPayment)}</span>
                  </div>
                  {tradeInValue > 0 && (
                    <div className="flex justify-between text-purple-600">
                      <span>Trade-In Credit:</span>
                      <span className="font-semibold">-{formatCurrency(tradeInValue)}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="font-semibold">Amount Financed:</span>
                    <span className="text-lg font-bold">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Total Cost:</span>
                    <span className="text-lg font-bold text-blue-600">{formatCurrency(totalCost)}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData.filter(d => d.value > 0)}
                    innerRadius={70}
                    outerRadius={110}
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
              <Info className="mr-2 h-5 w-5" /> Boat Financing Guide
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">Loan Terms</h3>
                <p>
                  Boat loans typically range from 5-20 years. New boats qualify for longer terms, while used boats 
                  may have shorter maximum terms. Loan amounts usually don't exceed 80-90% of the boat's value.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Interest Rates</h3>
                <p>
                  Boat loan rates vary from 4% to 12% depending on credit score, loan amount, and boat age. 
                  New boats typically get better rates than used boats. Consider the total interest cost, not just the monthly payment.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Additional Costs</h3>
                <p>
                  Don't forget ongoing costs like insurance, maintenance, storage, fuel, and registration fees. 
                  These can add up to 10-20% of the boat's value annually.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BoatLoanCalculator;
