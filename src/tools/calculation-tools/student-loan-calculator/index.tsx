import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw, GraduationCap, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

export function StudentLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(35000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(10);
  const [repaymentPlan, setRepaymentPlan] = useState<string>('standard');
  const [gracePeriod, setGracePeriod] = useState<number>(6);
  
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateStudentLoan();
  }, [loanAmount, interestRate, loanTerm, repaymentPlan, gracePeriod]);

  const calculateStudentLoan = () => {
    if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) return;
    
    // Add interest accrued during grace period
    const monthlyRate = (interestRate / 100) / 12;
    const interestDuringGrace = loanAmount * monthlyRate * gracePeriod;
    const principalAfterGrace = loanAmount + interestDuringGrace;
    
    const totalPayments = loanTerm * 12;
    
    // Calculate payment based on repayment plan
    let pmt = 0;
    
    if (repaymentPlan === 'standard') {
      // Standard 10-year repayment
      pmt = monthlyRate === 0
        ? principalAfterGrace / totalPayments
        : (principalAfterGrace * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (repaymentPlan === 'graduated') {
      // Graduated starts lower and increases (simplified: use 80% of standard initially)
      const standardPmt = (principalAfterGrace * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      pmt = standardPmt * 0.8; // Simplified
    } else if (repaymentPlan === 'extended') {
      // Extended 25-year term
      const extendedPayments = 25 * 12;
      pmt = (principalAfterGrace * monthlyRate * Math.pow(1 + monthlyRate, extendedPayments)) / 
        (Math.pow(1 + monthlyRate, extendedPayments) - 1);
    }
    
    const total = pmt * totalPayments;
    const interest = total - loanAmount;
    
    setMonthlyPayment(pmt);
    setTotalPaid(total);
    setTotalInterest(interest);
    
    // Generate projection data
    const data = [];
    let balance = principalAfterGrace;
    
    for (let year = 1; year <= Math.min(loanTerm, 20); year++) {
      let yearInterest = 0;
      let yearPrincipal = 0;
      
      for (let month = 0; month < 12 && balance > 0; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = pmt - interestPayment;
        yearInterest += interestPayment;
        yearPrincipal += principalPayment;
        balance -= principalPayment;
      }
      
      data.push({
        year: `Year ${year}`,
        'Remaining Balance': Math.max(0, balance),
        'Cumulative Interest': data.reduce((sum, d) => sum + (d['Interest Paid'] || 0), 0) + yearInterest,
        'Interest Paid': yearInterest,
      });
    }
    
    setProjectionData(data);
  };

  const handleReset = () => {
    setLoanAmount(35000);
    setInterestRate(5.5);
    setLoanTerm(10);
    setRepaymentPlan('standard');
    setGracePeriod(6);
  };

  const handleCopy = () => {
    const resultText = `Student Loan Repayment Summary:
Loan Amount: ${formatCurrency(loanAmount)}
Monthly Payment: ${formatCurrency(monthlyPayment)}
Total Paid: ${formatCurrency(totalPaid)}
Total Interest: ${formatCurrency(totalInterest)}
Repayment Plan: ${repaymentPlan}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#3B82F6' },
    { name: 'Interest', value: totalInterest, color: '#EF4444' }
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Student Loan Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate student loan repayments with different repayment plans and grace periods.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" /> Loan Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="loanAmount">Total Loan Amount</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="loanAmount" type="number" className="pl-10" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[loanAmount]} max={200000} min={5000} step={1000} onValueChange={(v) => setLoanAmount(v[0])} />
            </div>

            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="interestRate" type="number" step="0.1" className="pl-10" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[interestRate]} max={12} min={2} step={0.1} onValueChange={(v) => setInterestRate(v[0])} />
            </div>

            <div>
              <Label htmlFor="loanTerm">Repayment Term (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="loanTerm" type="number" className="pl-10" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[loanTerm]} max={25} min={5} step={1} onValueChange={(v) => setLoanTerm(v[0])} />
            </div>

            <div>
              <Label htmlFor="repaymentPlan">Repayment Plan</Label>
              <Select value={repaymentPlan} onValueChange={setRepaymentPlan}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (Fixed Payment)</SelectItem>
                  <SelectItem value="graduated">Graduated (Increasing Payments)</SelectItem>
                  <SelectItem value="extended">Extended (Lower Payment, Longer Term)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="gracePeriod">Grace Period (months)</Label>
              <Input id="gracePeriod" type="number" className="mt-1.5" value={gracePeriod} onChange={(e) => setGracePeriod(Number(e.target.value))} />
              <p className="text-xs text-muted-foreground mt-1">Interest accrues during this period</p>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div key={monthlyPayment} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Repayment Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(monthlyPayment)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Repayment</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(totalPaid)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                    <div className="mt-1 text-2xl font-bold text-red-600">{formatCurrency(totalInterest)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Loan Term</h3>
                    <div className="mt-1 text-2xl font-bold">{loanTerm} years</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Repayment Projection</h2>
            
            <Tabs defaultValue="timeline">
              <TabsList className="mb-4">
                <TabsTrigger value="timeline">Balance Over Time</TabsTrigger>
                <TabsTrigger value="distribution">Cost Distribution</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timeline" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="Remaining Balance" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Cumulative Interest" stroke="#EF4444" />
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
        <h2 className="text-xl font-semibold mb-4">Student Loan Repayment Options</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">Standard Plan</h3>
            <p className="text-muted-foreground text-sm">
              Fixed monthly payments over 10 years. This is typically the fastest and cheapest way to pay off your loans.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Graduated Plan</h3>
            <p className="text-muted-foreground text-sm">
              Payments start lower and increase every two years. Good if you expect your income to grow significantly.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Income-Driven Plans</h3>
            <p className="text-muted-foreground text-sm">
              Payments based on your income and family size. Federal loans may qualify for forgiveness after 20-25 years.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default StudentLoanCalculator;
