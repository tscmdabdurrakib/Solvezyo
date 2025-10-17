import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw, Calculator, Copy, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

export function RepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(20000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [paymentFrequency, setPaymentFrequency] = useState<string>('monthly');
  
  const [payment, setPayment] = useState<number>(0);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateRepayment();
  }, [loanAmount, interestRate, loanTerm, paymentFrequency]);

  const calculateRepayment = () => {
    if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) return;
    
    const frequencyMap: { [key: string]: number } = {
      weekly: 52,
      biweekly: 26,
      monthly: 12,
      quarterly: 4,
      annually: 1,
    };
    
    const paymentsPerYear = frequencyMap[paymentFrequency];
    const periodicRate = (interestRate / 100) / paymentsPerYear;
    const totalPayments = loanTerm * paymentsPerYear;
    
    // Calculate payment amount
    const pmt = periodicRate === 0
      ? loanAmount / totalPayments
      : (loanAmount * periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
        (Math.pow(1 + periodicRate, totalPayments) - 1);
    
    const total = pmt * totalPayments;
    const interest = total - loanAmount;
    
    setPayment(pmt);
    setTotalPaid(total);
    setTotalInterest(interest);
    
    // Generate amortization schedule
    const data = [];
    let balance = loanAmount;
    
    for (let year = 1; year <= loanTerm; year++) {
      const paymentsThisYear = paymentsPerYear;
      let yearInterest = 0;
      let yearPrincipal = 0;
      
      for (let i = 0; i < paymentsThisYear && balance > 0; i++) {
        const interestPayment = balance * periodicRate;
        const principalPayment = pmt - interestPayment;
        yearInterest += interestPayment;
        yearPrincipal += principalPayment;
        balance -= principalPayment;
      }
      
      data.push({
        year: `Year ${year}`,
        'Remaining Balance': Math.max(0, balance),
        'Principal Paid': yearPrincipal,
        'Interest Paid': yearInterest,
      });
    }
    
    setProjectionData(data);
  };

  const handleReset = () => {
    setLoanAmount(20000);
    setInterestRate(8);
    setLoanTerm(5);
    setPaymentFrequency('monthly');
  };

  const handleCopy = () => {
    const freq = paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1);
    const resultText = `Loan Repayment Summary:
Loan Amount: ${formatCurrency(loanAmount)}
${freq} Payment: ${formatCurrency(payment)}
Total Paid: ${formatCurrency(totalPaid)}
Total Interest: ${formatCurrency(totalInterest)}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Repayment Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate loan repayment schedules for any type of installment loan.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Loan Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="loanAmount" type="number" className="pl-10" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[loanAmount]} max={500000} min={1000} step={1000} onValueChange={(v) => setLoanAmount(v[0])} />
            </div>

            <div>
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="interestRate" type="number" step="0.1" className="pl-10" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[interestRate]} max={25} min={0} step={0.1} onValueChange={(v) => setInterestRate(v[0])} />
            </div>

            <div>
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="loanTerm" type="number" className="pl-10" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[loanTerm]} max={30} min={1} step={1} onValueChange={(v) => setLoanTerm(v[0])} />
            </div>

            <div>
              <Label htmlFor="paymentFrequency">Payment Frequency</Label>
              <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div key={payment} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Payment Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Payment
                    </h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(payment)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Paid</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(totalPaid)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                    <div className="mt-1 text-2xl font-bold text-red-600">{formatCurrency(totalInterest)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Interest %</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {loanAmount > 0 ? ((totalInterest / loanAmount) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Amortization Schedule</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="Remaining Balance" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Principal Paid" stroke="#10B981" />
                  <Line type="monotone" dataKey="Interest Paid" stroke="#EF4444" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">About Loan Repayment</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">How Amortization Works</h3>
            <p className="text-muted-foreground text-sm">
              Early payments consist mostly of interest. As the principal decreases, more of each payment goes toward principal reduction.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Payment Frequency Impact</h3>
            <p className="text-muted-foreground text-sm">
              More frequent payments (like bi-weekly) can reduce total interest because principal is paid down faster.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Prepayment Benefits</h3>
            <p className="text-muted-foreground text-sm">
              Making extra payments toward principal can significantly reduce the loan term and total interest paid.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RepaymentCalculator;
