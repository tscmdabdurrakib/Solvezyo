import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, DollarSign, Calendar, Percent, RefreshCw, Copy, Check, TrendingUp, PiggyBank } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

/**
 * RothIRACalculator Component
 * 
 * Calculate Roth IRA growth with tax-free withdrawals in retirement.
 * Contributions are made with after-tax dollars.
 */
export function RothIRACalculator() {
  // State for input values
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentBalance, setCurrentBalance] = useState<number>(5000);
  const [annualContribution, setAnnualContribution] = useState<number>(6500);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [contributionFrequency, setContributionFrequency] = useState<string>('annually');
  
  // State for calculated results
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [balanceAtRetirement, setBalanceAtRetirement] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    currentAge?: string;
    retirementAge?: string;
    currentBalance?: string;
    annualContribution?: string;
    expectedReturn?: string;
  }>({});

  // Calculate Roth IRA when inputs change
  useEffect(() => {
    calculateRothIRA();
  }, [currentAge, retirementAge, currentBalance, annualContribution, expectedReturn, contributionFrequency]);

  /**
   * Calculate Roth IRA Growth
   * Future Value with Regular Contributions
   * FV = PV(1 + r)^n + PMT × [((1 + r)^n - 1) / r]
   */
  const calculateRothIRA = () => {
    // Validate inputs
    const newErrors: {
      currentAge?: string;
      retirementAge?: string;
      currentBalance?: string;
      annualContribution?: string;
      expectedReturn?: string;
    } = {};
    
    if (currentAge < 18 || currentAge > 100) newErrors.currentAge = "Age must be between 18 and 100";
    if (retirementAge <= currentAge) newErrors.retirementAge = "Retirement age must be greater than current age";
    if (currentBalance < 0) newErrors.currentBalance = "Balance cannot be negative";
    if (annualContribution < 0) newErrors.annualContribution = "Contribution cannot be negative";
    if (expectedReturn < 0) newErrors.expectedReturn = "Return cannot be negative";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    const yearsToRetirement = retirementAge - currentAge;
    const rate = expectedReturn / 100;
    
    // Calculate contribution limit (2024 limit is $7,000, $8,000 if 50+)
    const contributionLimit = currentAge >= 50 ? 8000 : 7000;
    const actualContribution = Math.min(annualContribution, contributionLimit);
    
    // Future value of current balance
    const futureValueOfCurrent = currentBalance * Math.pow(1 + rate, yearsToRetirement);
    
    // Future value of annual contributions
    let futureValueOfContributions = 0;
    if (rate === 0) {
      futureValueOfContributions = actualContribution * yearsToRetirement;
    } else {
      futureValueOfContributions = actualContribution * ((Math.pow(1 + rate, yearsToRetirement) - 1) / rate);
    }
    
    const totalBalance = futureValueOfCurrent + futureValueOfContributions;
    const contributions = currentBalance + (actualContribution * yearsToRetirement);
    const earnings = totalBalance - contributions;
    
    setTotalContributions(contributions);
    setTotalEarnings(earnings);
    setBalanceAtRetirement(totalBalance);
    
    // Generate projection data
    const data = [];
    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      const yearlyFvCurrent = currentBalance * Math.pow(1 + rate, year);
      
      let yearlyFvContributions = 0;
      if (year > 0) {
        if (rate === 0) {
          yearlyFvContributions = actualContribution * year;
        } else {
          yearlyFvContributions = actualContribution * ((Math.pow(1 + rate, year) - 1) / rate);
        }
      }
      
      const yearlyTotal = yearlyFvCurrent + yearlyFvContributions;
      const yearlyContributions = currentBalance + (actualContribution * year);
      
      data.push({
        age: age,
        year: `Age ${age}`,
        'Total Balance': yearlyTotal,
        'Total Contributions': yearlyContributions,
        'Earnings': yearlyTotal - yearlyContributions,
      });
    }
    
    setProjectionData(data);
  };

  // Function to reset all values
  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(65);
    setCurrentBalance(5000);
    setAnnualContribution(6500);
    setExpectedReturn(7);
    setContributionFrequency('annually');
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Roth IRA Calculator Results:
Current Age: ${currentAge}
Retirement Age: ${retirementAge}
Years to Retirement: ${retirementAge - currentAge}
Current Balance: ${formatCurrency(currentBalance)}
Annual Contribution: ${formatCurrency(annualContribution)}
Expected Return: ${expectedReturn}%
Balance at Retirement: ${formatCurrency(balanceAtRetirement)}
Total Contributions: ${formatCurrency(totalContributions)}
Total Earnings (Tax-Free): ${formatCurrency(totalEarnings)}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Pie chart data
  const pieData = [
    { name: 'Contributions', value: totalContributions, color: '#3B82F6' },
    { name: 'Tax-Free Earnings', value: totalEarnings, color: '#10B981' }
  ];

  const contributionLimit = currentAge >= 50 ? 8000 : 7000;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Roth IRA Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Plan your tax-free retirement savings with a Roth IRA investment strategy.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PiggyBank className="mr-2 h-5 w-5" /> Roth IRA Details
          </h2>
          
          <div className="space-y-6">
            {/* Current Age */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="currentAge">Current Age</Label>
                {errors.currentAge && (
                  <span className="text-sm text-red-500">{errors.currentAge}</span>
                )}
              </div>
              <Input
                id="currentAge"
                type="number"
                className="mt-1.5"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[currentAge]}
                max={100}
                min={18}
                step={1}
                onValueChange={(values) => setCurrentAge(values[0])}
              />
            </div>

            {/* Retirement Age */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="retirementAge">Retirement Age</Label>
                {errors.retirementAge && (
                  <span className="text-sm text-red-500">{errors.retirementAge}</span>
                )}
              </div>
              <Input
                id="retirementAge"
                type="number"
                className="mt-1.5"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[retirementAge]}
                max={100}
                min={currentAge + 1}
                step={1}
                onValueChange={(values) => setRetirementAge(values[0])}
              />
            </div>

            <Separator />

            {/* Current Balance */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="currentBalance">Current Roth IRA Balance</Label>
                {errors.currentBalance && (
                  <span className="text-sm text-red-500">{errors.currentBalance}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="currentBalance"
                  type="number"
                  className="pl-10"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[currentBalance]}
                max={100000}
                min={0}
                step={500}
                onValueChange={(values) => setCurrentBalance(values[0])}
              />
            </div>

            {/* Annual Contribution */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="annualContribution">Annual Contribution</Label>
                {errors.annualContribution && (
                  <span className="text-sm text-red-500">{errors.annualContribution}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="annualContribution"
                  type="number"
                  className="pl-10"
                  value={annualContribution}
                  onChange={(e) => setAnnualContribution(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[annualContribution]}
                max={contributionLimit}
                min={0}
                step={100}
                onValueChange={(values) => setAnnualContribution(values[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {currentAge >= 50 ? '2024 limit: $8,000 (50+)' : '2024 limit: $7,000'}
              </p>
            </div>

            {/* Expected Return */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                {errors.expectedReturn && (
                  <span className="text-sm text-red-500">{errors.expectedReturn}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="expectedReturn"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[expectedReturn]}
                max={15}
                min={0}
                step={0.1}
                onValueChange={(values) => setExpectedReturn(values[0])}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          {/* Summary Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={balanceAtRetirement}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Retirement Projection
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary col-span-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Balance at Retirement (Tax-Free)</h3>
                    <div className="mt-1 text-3xl font-bold">
                      {formatCurrency(balanceAtRetirement)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">At age {retirementAge}</p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Contributions</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(totalContributions)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Tax-Free Earnings</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(totalEarnings)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Years to Retirement</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {retirementAge - currentAge}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Charts */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Growth Projection</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="Total Balance" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Total Contributions" stroke="#3B82F6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Distribution Chart */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Retirement Balance Breakdown</h2>
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

          {/* Information Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Roth IRA Benefits</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">Tax-Free Growth</h3>
                <p className="text-muted-foreground text-sm">
                  All earnings in your Roth IRA grow completely tax-free. Qualified withdrawals in retirement 
                  are not subject to federal income tax.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">No RMDs</h3>
                <p className="text-muted-foreground text-sm">
                  Unlike traditional IRAs, Roth IRAs have no Required Minimum Distributions (RMDs) during your 
                  lifetime, allowing your money to continue growing tax-free.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Contribution Limits</h3>
                <p className="text-muted-foreground text-sm">
                  For 2024, you can contribute up to $7,000 ($8,000 if age 50+). Income limits may apply 
                  based on your filing status and modified AGI.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Qualified Withdrawals</h3>
                <p className="text-muted-foreground text-sm">
                  Withdrawals are tax-free and penalty-free if you're 59½ or older and the account has been 
                  open for at least 5 years.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RothIRACalculator;
