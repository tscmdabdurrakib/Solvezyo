import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw, TrendingUp, PiggyBank } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

/**
 * SavingsCalculator Component
 * 
 * A powerful and user-friendly savings and compound interest calculator that helps users
 * project the future value of their investments, total returns, and the impact of inflation.
 */
export function SavingsCalculator() {
  // --- STATE MANAGEMENT ---

  // Core Input Fields
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [regularContribution, setRegularContribution] = useState<number>(500);
  const [contributionFrequency, setContributionFrequency] = useState<string>('monthly'); // 'monthly', 'quarterly', 'annually'
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('annually'); // 'daily', 'monthly', 'quarterly', 'semi-annually', 'annually'
  const [timeHorizon, setTimeHorizon] = useState<number>(10);

  // Advanced Feature Inputs
  const [annualInflationRate, setAnnualInflationRate] = useState<number>(2.5);
  const [contributionAtBeginning, setContributionAtBeginning] = useState<boolean>(true);

  // Calculated Results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalPrincipal, setTotalPrincipal] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [realFutureValue, setRealFutureValue] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);

  // Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // --- CALCULATION LOGIC ---

  const frequencyMap: { [key: string]: number } = {
    daily: 365,
    monthly: 12,
    quarterly: 4,
    'semi-annually': 2,
    annually: 1,
  };

  const calculateSavings = () => {
    // --- Input Validation ---
    const newErrors: { [key: string]: string } = {};
    if (initialDeposit < 0) newErrors.initialDeposit = "Cannot be negative";
    if (regularContribution < 0) newErrors.regularContribution = "Cannot be negative";
    if (annualInterestRate <= 0) newErrors.annualInterestRate = "Must be positive";
    if (timeHorizon <= 0) newErrors.timeHorizon = "Must be positive";
    if (annualInflationRate < 0) newErrors.annualInflationRate = "Cannot be negative";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Reset results if there are errors
      setFutureValue(0);
      setTotalPrincipal(0);
      setTotalInterest(0);
      setRealFutureValue(0);
      setProjectionData([]);
      return;
    }

    // --- Core Calculation ---
    const r = annualInterestRate / 100;
    const n = frequencyMap[compoundingFrequency];
    const t = timeHorizon;
    const pmt = regularContribution;
    const pmtFreq = frequencyMap[contributionFrequency];

    // 1. Future Value of Initial Deposit
    const fvInitial = initialDeposit * Math.pow(1 + r / n, n * t);

    // 2. Future Value of Annuity (Regular Contributions)
    // This is more complex because contribution frequency can differ from compounding frequency
    // For simplicity, we'll align them for now, but a more precise formula would be needed for full accuracy.
    // Let's assume contribution timing aligns with compounding for this version.
    // A more advanced implementation would use a more complex formula.
    const effectiveRatePerPayment = Math.pow(1 + r / n, n / pmtFreq) - 1;
    const totalPayments = pmtFreq * t;
    
    let fvAnnuity = 0;
    if (effectiveRatePerPayment > 0) {
      fvAnnuity = pmt * ((Math.pow(1 + effectiveRatePerPayment, totalPayments) - 1) / effectiveRatePerPayment);
      if (contributionAtBeginning) {
        fvAnnuity *= (1 + effectiveRatePerPayment);
      }
    } else {
      fvAnnuity = pmt * totalPayments;
    }

    const totalFv = fvInitial + fvAnnuity;
    const principal = initialDeposit + (pmt * totalPayments);
    const interest = totalFv - principal;

    setFutureValue(totalFv);
    setTotalPrincipal(principal);
    setTotalInterest(interest);

    // 3. Inflation Adjustment (Real Future Value)
    const realFv = totalFv / Math.pow(1 + annualInflationRate / 100, t);
    setRealFutureValue(realFv);

    // 4. Generate Projection Data for Graph
    const data = [];
    for (let year = 1; year <= t; year++) {
      const yearlyT = year;
      const yearlyPayments = pmtFreq * yearlyT;
      const fvInitialYear = initialDeposit * Math.pow(1 + r / n, n * yearlyT);
      let fvAnnuityYear = 0;
      if (effectiveRatePerPayment > 0) {
        fvAnnuityYear = pmt * ((Math.pow(1 + effectiveRatePerPayment, yearlyPayments) - 1) / effectiveRatePerPayment);
        if (contributionAtBeginning) {
          fvAnnuityYear *= (1 + effectiveRatePerPayment);
        }
      } else {
        fvAnnuityYear = pmt * yearlyPayments;
      }
      const totalValue = fvInitialYear + fvAnnuityYear;
      const principalValue = initialDeposit + (pmt * yearlyPayments);
      data.push({
        year: `Year ${year}`,
        'Total Value': totalValue,
        'Total Principal': principalValue,
        'Interest Earned': totalValue - principalValue,
      });
    }
    setProjectionData(data);
  };

  // Recalculate whenever a dependency changes
  useEffect(() => {
    calculateSavings();
  }, [
    initialDeposit,
    regularContribution,
    contributionFrequency,
    annualInterestRate,
    compoundingFrequency,
    timeHorizon,
    annualInflationRate,
    contributionAtBeginning,
  ]);

  // --- UTILITY FUNCTIONS ---

  const handleReset = () => {
    setInitialDeposit(10000);
    setRegularContribution(500);
    setContributionFrequency('monthly');
    setAnnualInterestRate(7);
    setCompoundingFrequency('annually');
    setTimeHorizon(10);
    setAnnualInflationRate(2.5);
    setContributionAtBeginning(true);
    setErrors({});
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // --- CHART DATA ---

  const pieData = [
    { name: 'Total Principal', value: totalPrincipal, color: '#3B82F6' },
    { name: 'Total Interest', value: totalInterest, color: '#10B981' }
  ];

  // --- RENDER ---

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Savings & Compound Interest Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Project your investment growth and see the power of compounding in action.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PiggyBank className="mr-2 h-5 w-5" /> Investment Details
          </h2>
          
          <div className="space-y-6">
            {/* Initial Deposit */}
            <div>
              <Label htmlFor="initialDeposit">Initial Deposit</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="initialDeposit" type="number" className="pl-10" value={initialDeposit} onChange={(e) => setInitialDeposit(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[initialDeposit]} max={100000} step={1000} onValueChange={(v) => setInitialDeposit(v[0])} />
            </div>

            {/* Regular Contribution */}
            <div>
              <Label htmlFor="regularContribution">Regular Contribution</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="regularContribution" type="number" className="pl-10" value={regularContribution} onChange={(e) => setRegularContribution(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[regularContribution]} max={5000} step={100} onValueChange={(v) => setRegularContribution(v[0])} />
            </div>

            {/* Contribution Frequency */}
            <div>
              <Label htmlFor="contributionFrequency">Contribution Frequency</Label>
              <Select value={contributionFrequency} onValueChange={setContributionFrequency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Annual Interest Rate */}
            <div>
              <Label htmlFor="annualInterestRate">Annual Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="annualInterestRate" type="number" step="0.1" className="pl-10" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[annualInterestRate]} max={20} step={0.1} onValueChange={(v) => setAnnualInterestRate(v[0])} />
            </div>

            {/* Compounding Frequency */}
            <div>
              <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
              <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Horizon */}
            <div>
              <Label htmlFor="timeHorizon">Time Horizon (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="timeHorizon" type="number" className="pl-10" value={timeHorizon} onChange={(e) => setTimeHorizon(Number(e.target.value))} />
              </div>
              <Slider className="mt-2" value={[timeHorizon]} max={50} step={1} onValueChange={(v) => setTimeHorizon(v[0])} />
            </div>
            
            <Separator />

            {/* Advanced Options */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Advanced Options</h3>
                {/* Inflation Rate */}
                <div>
                    <Label htmlFor="annualInflationRate">Annual Inflation Rate (%)</Label>
                    <Input id="annualInflationRate" type="number" step="0.1" value={annualInflationRate} onChange={(e) => setAnnualInflationRate(Number(e.target.value))} />
                </div>
                {/* Contribution Timing */}
                <div className="flex items-center justify-between">
                    <Label htmlFor="contributionTiming">Contribute at the beginning of period?</Label>
                    <Switch id="contributionTiming" checked={contributionAtBeginning} onCheckedChange={setContributionAtBeginning} />
                </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          {/* Summary Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" /> Investment Projection
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Future Value</h3>
                <div className="mt-1 text-2xl font-bold">{formatCurrency(futureValue)}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Principal</h3>
                <div className="mt-1 text-2xl font-bold">{formatCurrency(totalPrincipal)}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                <div className="mt-1 text-2xl font-bold text-green-600">{formatCurrency(totalInterest)}</div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="bg-blue-100/40 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Real Future Value (After Inflation)</h3>
              <div className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(realFutureValue)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This is the estimated purchasing power of your savings in today's money.</p>
            </div>
          </Card>

          {/* Visualization Tabs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Visual Breakdown</h2>
            <Tabs defaultValue="projection">
              <TabsList className="mb-4">
                <TabsTrigger value="projection">Projection Graph</TabsTrigger>
                <TabsTrigger value="distribution">Distribution Chart</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projection" className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="Total Value" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="Total Principal" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="distribution" className="h-96">
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
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SavingsCalculator;
