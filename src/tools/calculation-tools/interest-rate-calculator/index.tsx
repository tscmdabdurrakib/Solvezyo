import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export function InterestRateCalculator() {
  // State for active tab
  const [activeTab, setActiveTab] = useState('loan');

  // Loan Payment Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(10);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalLoanPayment, setTotalLoanPayment] = useState<number>(0);
  const [totalLoanInterest, setTotalLoanInterest] = useState<number>(0);

  // Simple Interest Calculator State
  const [simplePrincipal, setSimplePrincipal] = useState<number>(10000);
  const [simpleInterestRate, setSimpleInterestRate] = useState<number>(3);
  const [simpleTerm, setSimpleTerm] = useState<number>(5);
  const [simpleInterest, setSimpleInterest] = useState<number>(0);
  const [totalSimpleValue, setTotalSimpleValue] = useState<number>(0);

  // Compound Interest Calculator State
  const [compoundPrincipal, setCompoundPrincipal] = useState<number>(10000);
  const [compoundInterestRate, setCompoundInterestRate] = useState<number>(5);
  const [compoundTerm, setCompoundTerm] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('annually');
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalCompoundInterest, setTotalCompoundInterest] = useState<number>(0);

  // Calculate on input change
  useEffect(() => {
    if (activeTab === 'loan') {
      calculateLoanPayment();
    } else if (activeTab === 'simple') {
      calculateSimpleInterest();
    } else if (activeTab === 'compound') {
      calculateCompoundInterest();
    }
  }, [
    loanAmount, loanInterestRate, loanTerm,
    simplePrincipal, simpleInterestRate, simpleTerm,
    compoundPrincipal, compoundInterestRate, compoundTerm, compoundingFrequency,
    activeTab
  ]);

  const calculateLoanPayment = () => {
    const principal = loanAmount;
    const monthlyRate = loanInterestRate / 100 / 12;
    const payments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0 && payments > 0) {
      const x = Math.pow(1 + monthlyRate, payments);
      const monthly = (principal * monthlyRate * x) / (x - 1);
      const totalPayment = monthly * payments;
      const totalInterest = totalPayment - principal;

      setMonthlyPayment(monthly);
      setTotalLoanPayment(totalPayment);
      setTotalLoanInterest(totalInterest);
    } else {
      setMonthlyPayment(0);
      setTotalLoanPayment(0);
      setTotalLoanInterest(0);
    }
  };

  const calculateSimpleInterest = () => {
    const interest = simplePrincipal * (simpleInterestRate / 100) * simpleTerm;
    setSimpleInterest(interest);
    setTotalSimpleValue(simplePrincipal + interest);
  };

  const calculateCompoundInterest = () => {
    const n = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      daily: 365
    }[compoundingFrequency] || 1;

    const principal = compoundPrincipal;
    const rate = compoundInterestRate / 100;
    const term = compoundTerm;

    const amount = principal * Math.pow(1 + rate / n, n * term);
    const interest = amount - principal;

    setFutureValue(amount);
    setTotalCompoundInterest(interest);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleReset = () => {
    if (activeTab === 'loan') {
      setLoanAmount(100000);
      setLoanInterestRate(5);
      setLoanTerm(10);
    } else if (activeTab === 'simple') {
      setSimplePrincipal(10000);
      setSimpleInterestRate(3);
      setSimpleTerm(5);
    } else if (activeTab === 'compound') {
      setCompoundPrincipal(10000);
      setCompoundInterestRate(5);
      setCompoundTerm(10);
      setCompoundingFrequency('annually');
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Interest Rate Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate loan payments, simple interest, and compound interest with ease.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="loan">Loan Payment</TabsTrigger>
          <TabsTrigger value="simple">Simple Interest</TabsTrigger>
          <TabsTrigger value="compound">Compound Interest</TabsTrigger>
        </TabsList>

        <TabsContent value="loan">
          <div className="grid gap-8 md:grid-cols-12">
            <Card className="p-6 md:col-span-5">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <DollarSign className="mr-2 h-5 w-5" /> Loan Details
              </h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input id="loanAmount" type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="loanInterestRate">Annual Interest Rate (%)</Label>
                  <Input id="loanInterestRate" type="number" value={loanInterestRate} onChange={(e) => setLoanInterestRate(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <Input id="loanTerm" type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
                </div>
                <Button onClick={handleReset} variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </Card>
            <div className="md:col-span-7 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
                <div className="grid gap-4 md:grid-cols-1">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(monthlyPayment)}</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest Paid</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(totalLoanInterest)}</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Repayment</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(totalLoanPayment)}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="simple">
          <div className="grid gap-8 md:grid-cols-12">
            <Card className="p-6 md:col-span-5">
              <h2 className="text-xl font-semibold mb-4">Simple Interest Details</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="simplePrincipal">Principal Amount</Label>
                  <Input id="simplePrincipal" type="number" value={simplePrincipal} onChange={(e) => setSimplePrincipal(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="simpleInterestRate">Annual Interest Rate (%)</Label>
                  <Input id="simpleInterestRate" type="number" value={simpleInterestRate} onChange={(e) => setSimpleInterestRate(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="simpleTerm">Time/Term (years)</Label>
                  <Input id="simpleTerm" type="number" value={simpleTerm} onChange={(e) => setSimpleTerm(Number(e.target.value))} />
                </div>
                <Button onClick={handleReset} variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </Card>
            <div className="md:col-span-7 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Simple Interest Summary</h2>
                <div className="grid gap-4 md:grid-cols-1">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Simple Interest Earned</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(simpleInterest)}</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Maturity Value</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(totalSimpleValue)}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compound">
          <div className="grid gap-8 md:grid-cols-12">
            <Card className="p-6 md:col-span-5">
              <h2 className="text-xl font-semibold mb-4">Compound Interest Details</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="compoundPrincipal">Initial Principal Amount</Label>
                  <Input id="compoundPrincipal" type="number" value={compoundPrincipal} onChange={(e) => setCompoundPrincipal(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="compoundInterestRate">Annual Interest Rate (%)</Label>
                  <Input id="compoundInterestRate" type="number" value={compoundInterestRate} onChange={(e) => setCompoundInterestRate(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="compoundTerm">Time/Term (years)</Label>
                  <Input id="compoundTerm" type="number" value={compoundTerm} onChange={(e) => setCompoundTerm(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
                  <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="semiannually">Semi-Annually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleReset} variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </Card>
            <div className="md:col-span-7 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Compound Interest Summary</h2>
                <div className="grid gap-4 md:grid-cols-1">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Future Value (FV)</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(futureValue)}</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest Earned</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(totalCompoundInterest)}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default InterestRateCalculator;
