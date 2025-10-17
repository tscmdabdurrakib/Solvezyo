import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, DollarSign, Percent, RefreshCw, Copy, Check, TrendingUp, Wallet } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * IRACalculator Component
 * 
 * Calculate Traditional IRA growth with tax-deferred contributions.
 * Contributions may be tax-deductible depending on income and other factors.
 */
export function IRACalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentBalance, setCurrentBalance] = useState<number>(10000);
  const [annualContribution, setAnnualContribution] = useState<number>(6500);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [taxRate, setTaxRate] = useState<number>(22);
  
  const [balanceAtRetirement, setBalanceAtRetirement] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [taxSavings, setTaxSavings] = useState<number>(0);
  const [afterTaxBalance, setAfterTaxBalance] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    calculateIRA();
  }, [currentAge, retirementAge, currentBalance, annualContribution, expectedReturn, taxRate]);

  const calculateIRA = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentAge < 18 || currentAge > 100) newErrors.currentAge = "Age must be between 18 and 100";
    if (retirementAge <= currentAge) newErrors.retirementAge = "Retirement age must be greater than current age";
    if (currentBalance < 0) newErrors.currentBalance = "Balance cannot be negative";
    if (annualContribution < 0) newErrors.annualContribution = "Contribution cannot be negative";
    if (expectedReturn < 0) newErrors.expectedReturn = "Return cannot be negative";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    const yearsToRetirement = retirementAge - currentAge;
    const rate = expectedReturn / 100;
    const contributionLimit = currentAge >= 50 ? 8000 : 7000;
    const actualContribution = Math.min(annualContribution, contributionLimit);
    
    // Future value calculations
    const futureValueOfCurrent = currentBalance * Math.pow(1 + rate, yearsToRetirement);
    let futureValueOfContributions = 0;
    
    if (rate === 0) {
      futureValueOfContributions = actualContribution * yearsToRetirement;
    } else {
      futureValueOfContributions = actualContribution * ((Math.pow(1 + rate, yearsToRetirement) - 1) / rate);
    }
    
    const totalBalance = futureValueOfCurrent + futureValueOfContributions;
    const contributions = currentBalance + (actualContribution * yearsToRetirement);
    const earnings = totalBalance - contributions;
    
    // Tax calculations
    const totalTaxSavings = (actualContribution * yearsToRetirement) * (taxRate / 100);
    const afterTax = totalBalance * (1 - taxRate / 100);
    
    setBalanceAtRetirement(totalBalance);
    setTotalContributions(contributions);
    setTotalEarnings(earnings);
    setTaxSavings(totalTaxSavings);
    setAfterTaxBalance(afterTax);
    
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
      
      data.push({
        age: age,
        year: `Age ${age}`,
        'Pre-Tax Balance': yearlyTotal,
        'After-Tax Balance': yearlyTotal * (1 - taxRate / 100),
      });
    }
    
    setProjectionData(data);
  };

  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(65);
    setCurrentBalance(10000);
    setAnnualContribution(6500);
    setExpectedReturn(7);
    setTaxRate(22);
    setErrors({});
  };

  const handleCopy = () => {
    const resultText = `Traditional IRA Calculator Results:
Current Age: ${currentAge}
Retirement Age: ${retirementAge}
Pre-Tax Balance at Retirement: ${formatCurrency(balanceAtRetirement)}
Total Contributions: ${formatCurrency(totalContributions)}
Total Earnings: ${formatCurrency(totalEarnings)}
Estimated Tax Savings: ${formatCurrency(taxSavings)}
After-Tax Balance: ${formatCurrency(afterTaxBalance)}`;
    
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

  const contributionLimit = currentAge >= 50 ? 8000 : 7000;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">IRA Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your Traditional IRA growth with tax-deferred savings.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wallet className="mr-2 h-5 w-5" /> IRA Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between">
                <Label htmlFor="currentAge">Current Age</Label>
                {errors.currentAge && <span className="text-sm text-red-500">{errors.currentAge}</span>}
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

            <div>
              <div className="flex justify-between">
                <Label htmlFor="retirementAge">Retirement Age</Label>
                {errors.retirementAge && <span className="text-sm text-red-500">{errors.retirementAge}</span>}
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

            <div>
              <div className="flex justify-between">
                <Label htmlFor="currentBalance">Current IRA Balance</Label>
                {errors.currentBalance && <span className="text-sm text-red-500">{errors.currentBalance}</span>}
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

            <div>
              <div className="flex justify-between">
                <Label htmlFor="annualContribution">Annual Contribution</Label>
                {errors.annualContribution && <span className="text-sm text-red-500">{errors.annualContribution}</span>}
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

            <div>
              <div className="flex justify-between">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                {errors.expectedReturn && <span className="text-sm text-red-500">{errors.expectedReturn}</span>}
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

            <div>
              <Label htmlFor="taxRate">Estimated Tax Rate at Withdrawal (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="taxRate"
                  type="number"
                  step="1"
                  className="pl-10"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[taxRate]}
                max={37}
                min={10}
                step={1}
                onValueChange={(values) => setTaxRate(values[0])}
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
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary">
                    <h3 className="text-sm font-medium text-muted-foreground">Pre-Tax Balance</h3>
                    <div className="mt-1 text-3xl font-bold">
                      {formatCurrency(balanceAtRetirement)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">After-Tax Balance</h3>
                    <div className="mt-1 text-3xl font-bold text-green-600">
                      {formatCurrency(afterTaxBalance)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Contributions</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(totalContributions)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Tax Savings (Contributions)</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(taxSavings)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

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
                  <Line type="monotone" dataKey="Pre-Tax Balance" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="After-Tax Balance" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Traditional IRA Overview</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">Tax-Deductible Contributions</h3>
                <p className="text-muted-foreground text-sm">
                  Contributions may be tax-deductible depending on your income, filing status, and whether 
                  you're covered by a workplace retirement plan.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Tax-Deferred Growth</h3>
                <p className="text-muted-foreground text-sm">
                  Your investments grow tax-deferred, meaning you won't pay taxes on earnings until you 
                  withdraw the money in retirement.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Required Minimum Distributions</h3>
                <p className="text-muted-foreground text-sm">
                  You must start taking RMDs by age 73 (as of 2024). The amount is based on your account 
                  balance and life expectancy.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Early Withdrawal Penalty</h3>
                <p className="text-muted-foreground text-sm">
                  Withdrawals before age 59½ may be subject to a 10% penalty plus income taxes, with some 
                  exceptions for hardship situations.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default IRACalculator;
