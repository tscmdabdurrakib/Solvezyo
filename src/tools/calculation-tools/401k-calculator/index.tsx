import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export function Professional401KCalculator() {
  // User Input Section
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentAnnualSalary, setCurrentAnnualSalary] = useState<number>(75000);
  const [annualSalaryIncrease, setAnnualSalaryIncrease] = useState<number>(3);
  const [current401kBalance, setCurrent401kBalance] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10);
  const [isContributionPercent, setIsContributionPercent] = useState<boolean>(true);
  const [employerMatch, setEmployerMatch] = useState<number>(50);
  const [employerMatchUpTo, setEmployerMatchUpTo] = useState<number>(6);
  const [annualRateOfReturn, setAnnualRateOfReturn] = useState<number>(7);
  const [catchUpContribution, setCatchUpContribution] = useState<boolean>(false);

  // Advanced Options
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [planAdminFees, setPlanAdminFees] = useState<number>(0.5);

  // Results Display
  const [totalRetirementSavings, setTotalRetirementSavings] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [totalUserContribution, setTotalUserContribution] = useState<number>(0);
  const [totalEmployerContribution, setTotalEmployerContribution] = useState<number>(0);
  const [totalInterestEarned, setTotalInterestEarned] = useState<number>(0);

  const calculate401k = () => {
    let balance = current401kBalance;
    let salary = currentAnnualSalary;
    let totalUserContrib = 0;
    let totalEmployerContrib = 0;
    const yearlyData = [];

    for (let age = currentAge; age < retirementAge; age++) {
      const monthlyContributionValue = isContributionPercent ? (salary / 12) * (monthlyContribution / 100) : monthlyContribution;
      const userMonthlyContribution = monthlyContributionValue + (age >= 50 && catchUpContribution ? 625 : 0);
      const employerMonthlyMatch = Math.min(userMonthlyContribution, (salary / 12) * (employerMatchUpTo / 100)) * (employerMatch / 100);

      totalUserContrib += userMonthlyContribution * 12;
      totalEmployerContrib += employerMonthlyMatch * 12;

      let yearlyBalance = balance;
      for (let month = 0; month < 12; month++) {
        yearlyBalance += userMonthlyContribution + employerMonthlyMatch;
        yearlyBalance *= (1 + (annualRateOfReturn / 100) / 12);
      }
      
      balance = yearlyBalance * (1 - (planAdminFees / 100));
      salary *= (1 + annualSalaryIncrease / 100);

      yearlyData.push({
        age: age + 1,
        balance: Math.round(balance),
        userContribution: Math.round(totalUserContrib),
        employerContribution: Math.round(totalEmployerContrib),
        interest: Math.round(balance - current401kBalance - totalUserContrib - totalEmployerContrib),
      });
    }

    setTotalRetirementSavings(balance);
    setChartData(yearlyData);
    const finalUser = totalUserContrib;
    const finalEmployer = totalEmployerContrib;
    const finalInterest = balance - current401kBalance - finalUser - finalEmployer;

    setTotalUserContribution(finalUser);
    setTotalEmployerContribution(finalEmployer);
    setTotalInterestEarned(finalInterest);

    setPieData([
      { name: 'Your Contributions', value: finalUser, color: '#3B82F6' },
      { name: 'Employer Contributions', value: finalEmployer, color: '#10B981' },
      { name: 'Interest Earned', value: finalInterest, color: '#EF4444' },
    ]);
  };

  useEffect(() => {
    calculate401k();
  }, [currentAge, retirementAge, currentAnnualSalary, annualSalaryIncrease, current401kBalance, monthlyContribution, isContributionPercent, employerMatch, employerMatchUpTo, annualRateOfReturn, catchUpContribution, inflationRate, planAdminFees]);

  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(65);
    setCurrentAnnualSalary(75000);
    setAnnualSalaryIncrease(3);
    setCurrent401kBalance(50000);
    setMonthlyContribution(10);
    setIsContributionPercent(true);
    setEmployerMatch(50);
    setEmployerMatchUpTo(6);
    setAnnualRateOfReturn(7);
    setCatchUpContribution(false);
    setInflationRate(2.5);
    setPlanAdminFees(0.5);
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Professional 401K Calculator</h1>
        <p className="text-muted-foreground mt-2">Estimate your future 401K balance based on contributions and investment returns.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><DollarSign className="mr-2 h-5 w-5" /> Your Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="currentAge">Current Age</Label>
              <Input id="currentAge" type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
              <Slider className="mt-2" value={[currentAge]} max={100} onValueChange={(v) => setCurrentAge(v[0])} />
            </div>
            <div>
              <Label htmlFor="retirementAge">Retirement Age</Label>
              <Input id="retirementAge" type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
              <Slider className="mt-2" value={[retirementAge]} max={100} onValueChange={(v) => setRetirementAge(v[0])} />
            </div>
            <div>
              <Label htmlFor="currentAnnualSalary">Current Annual Salary</Label>
              <Input id="currentAnnualSalary" type="number" value={currentAnnualSalary} onChange={(e) => setCurrentAnnualSalary(Number(e.target.value))} />
              <Slider className="mt-2" value={[currentAnnualSalary]} max={500000} step={1000} onValueChange={(v) => setCurrentAnnualSalary(v[0])} />
            </div>
            <div>
              <Label htmlFor="annualSalaryIncrease">Annual Salary Increase (%)</Label>
              <Input id="annualSalaryIncrease" type="number" value={annualSalaryIncrease} onChange={(e) => setAnnualSalaryIncrease(Number(e.target.value))} />
              <Slider className="mt-2" value={[annualSalaryIncrease]} max={10} step={0.1} onValueChange={(v) => setAnnualSalaryIncrease(v[0])} />
            </div>
            <div>
              <Label htmlFor="current401kBalance">Current 401K Balance</Label>
              <Input id="current401kBalance" type="number" value={current401kBalance} onChange={(e) => setCurrent401kBalance(Number(e.target.value))} />
              <Slider className="mt-2" value={[current401kBalance]} max={1000000} step={1000} onValueChange={(v) => setCurrent401kBalance(v[0])} />
            </div>
            <div>
              <Label>Monthly Contribution</Label>
              <div className="flex items-center space-x-2 mt-1.5">
                <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
                <Switch checked={isContributionPercent} onCheckedChange={setIsContributionPercent} />
                <span>{isContributionPercent ? '%' : '$'}</span>
              </div>
            </div>
            <div>
              <Label>Employer Match (%)</Label>
              <Input type="number" value={employerMatch} onChange={(e) => setEmployerMatch(Number(e.target.value))} />
              <Slider className="mt-2" value={[employerMatch]} max={100} onValueChange={(v) => setEmployerMatch(v[0])} />
            </div>
            <div>
              <Label>Up to % of Salary</Label>
              <Input type="number" value={employerMatchUpTo} onChange={(e) => setEmployerMatchUpTo(Number(e.target.value))} />
              <Slider className="mt-2" value={[employerMatchUpTo]} max={15} onValueChange={(v) => setEmployerMatchUpTo(v[0])} />
            </div>
            <div>
              <Label>Estimated Annual Rate of Return (%)</Label>
              <Input type="number" value={annualRateOfReturn} onChange={(e) => setAnnualRateOfReturn(Number(e.target.value))} />
              <Slider className="mt-2" value={[annualRateOfReturn]} max={15} step={0.1} onValueChange={(v) => setAnnualRateOfReturn(v[0])} />
            </div>
            {currentAge >= 50 && (
              <div className="flex items-center space-x-2">
                <Switch id="catchUp" checked={catchUpContribution} onCheckedChange={setCatchUpContribution} />
                <Label htmlFor="catchUp">"Catch-up" Contribution</Label>
              </div>
            )}
            <Button onClick={handleReset} variant="outline" className="w-full"><RefreshCw className="mr-2 h-4 w-4" /> Reset Values</Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center"><Info className="mr-2 h-5 w-5" /> Retirement Summary</h2>
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground">Total Retirement Savings</h3>
              <div className="mt-1 text-5xl font-bold">{formatCurrency(totalRetirementSavings)}</div>
              <p className="text-muted-foreground mt-2">Estimated monthly income in retirement: {formatCurrency((totalRetirementSavings * 0.04) / 12)}</p>
            </div>
            <Separator className="my-6" />
            <div className="grid gap-4 md:grid-cols-3 text-center">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Your Contributions</h4>
                <p className="text-xl font-bold">{formatCurrency(totalUserContribution)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Employer Contributions</h4>
                <p className="text-xl font-bold">{formatCurrency(totalEmployerContribution)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Interest Earned</h4>
                <p className="text-xl font-bold">{formatCurrency(totalInterestEarned)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Growth Over Time</h2>
            <Tabs defaultValue="line">
              <TabsList className="mb-4">
                <TabsTrigger value="line">Growth Chart</TabsTrigger>
                <TabsTrigger value="pie">Breakdown</TabsTrigger>
              </TabsList>
              <TabsContent value="line" className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis tickFormatter={(value) => formatCurrency(Number(value))} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#8884d8" name="Total Balance" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="pie" className="h-96">
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
        <h2 className="text-xl font-semibold mb-4">Understanding Your 401K</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">What is a 401K?</h3>
            <p className="text-muted-foreground text-sm">A 401K is a retirement savings plan sponsored by an employer. It lets workers save and invest a piece of their paycheck before taxes are taken out.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Employer Matching</h3>
            <p className="text-muted-foreground text-sm">Many employers match a portion of your contributions, which is essentially free money. It's crucial to contribute enough to get the full match.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Power of Compounding</h3>
            <p className="text-muted-foreground text-sm">The money in your 401K grows over time through compound interest, where your earnings generate their own earnings. The earlier you start, the more it grows.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Professional401KCalculator;
