import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet, DollarSign, Percent, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

/**
 * TakeHomePaycheckCalculator Component
 * 
 * Calculate net take-home pay after federal taxes, state taxes, FICA,
 * and other deductions from gross salary.
 */
export function TakeHomePaycheckCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(75000);
  const [payFrequency, setPayFrequency] = useState<string>('biweekly');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [federalTaxRate, setFederalTaxRate] = useState<number>(22);
  const [stateTaxRate, setStateTaxRate] = useState<number>(5);
  const [retirement401k, setRetirement401k] = useState<number>(6);
  const [healthInsurance, setHealthInsurance] = useState<number>(200);
  
  const [grossPerPeriod, setGrossPerPeriod] = useState<number>(0);
  const [federalTax, setFederalTax] = useState<number>(0);
  const [stateTax, setStateTax] = useState<number>(0);
  const [socialSecurity, setSocialSecurity] = useState<number>(0);
  const [medicare, setMedicare] = useState<number>(0);
  const [totalDeductions, setTotalDeductions] = useState<number>(0);
  const [netPayPerPeriod, setNetPayPerPeriod] = useState<number>(0);
  const [annualNetPay, setAnnualNetPay] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateTakeHome();
  }, [grossSalary, payFrequency, federalTaxRate, stateTaxRate, retirement401k, healthInsurance]);

  const calculateTakeHome = () => {
    const frequencyMap: { [key: string]: number } = {
      weekly: 52,
      biweekly: 26,
      semimonthly: 24,
      monthly: 12,
    };
    
    const periodsPerYear = frequencyMap[payFrequency];
    const grossPay = grossSalary / periodsPerYear;
    setGrossPerPeriod(grossPay);
    
    // Calculate 401k contribution
    const retirement401kAmount = (grossPay * retirement401k) / 100;
    
    // Calculate taxable income (after 401k)
    const taxableIncome = grossPay - retirement401kAmount;
    
    // Calculate federal tax
    const fedTax = (taxableIncome * federalTaxRate) / 100;
    setFederalTax(fedTax);
    
    // Calculate state tax
    const stTax = (taxableIncome * stateTaxRate) / 100;
    setStateTax(stTax);
    
    // Calculate FICA taxes (Social Security: 6.2%, Medicare: 1.45%)
    const ssTax = grossPay * 0.062;
    setSocialSecurity(ssTax);
    
    const medTax = grossPay * 0.0145;
    setMedicare(medTax);
    
    // Total deductions
    const deductions = fedTax + stTax + ssTax + medTax + retirement401kAmount + healthInsurance;
    setTotalDeductions(deductions);
    
    // Net pay per period
    const netPay = grossPay - deductions;
    setNetPayPerPeriod(netPay);
    
    // Annual net pay
    const annualNet = netPay * periodsPerYear;
    setAnnualNetPay(annualNet);
  };

  const handleReset = () => {
    setGrossSalary(75000);
    setPayFrequency('biweekly');
    setFederalTaxRate(22);
    setStateTaxRate(5);
    setRetirement401k(6);
    setHealthInsurance(200);
  };

  const handleCopy = () => {
    const resultText = `Take-Home Pay Results:
Gross Annual Salary: ${formatCurrency(grossSalary)}
Gross Per Paycheck: ${formatCurrency(grossPerPeriod)}
Total Deductions: ${formatCurrency(totalDeductions)}
Net Per Paycheck: ${formatCurrency(netPayPerPeriod)}
Annual Take-Home: ${formatCurrency(annualNetPay)}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const pieData = [
    { name: 'Take-Home', value: netPayPerPeriod, color: '#10B981' },
    { name: 'Federal Tax', value: federalTax, color: '#EF4444' },
    { name: 'State Tax', value: stateTax, color: '#F59E0B' },
    { name: 'Social Security', value: socialSecurity, color: '#3B82F6' },
    { name: 'Medicare', value: medicare, color: '#8B5CF6' },
    { name: '401(k)', value: (grossPerPeriod * retirement401k) / 100, color: '#06B6D4' },
    { name: 'Health Ins.', value: healthInsurance, color: '#EC4899' },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Take-Home Paycheck Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your net pay after taxes and deductions from gross salary.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wallet className="mr-2 h-5 w-5" /> Income & Deductions
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="grossSalary">Annual Gross Salary</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="grossSalary"
                  type="number"
                  className="pl-10"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[grossSalary]}
                max={200000}
                min={20000}
                step={1000}
                onValueChange={(values) => setGrossSalary(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="payFrequency">Pay Frequency</Label>
              <Select value={payFrequency} onValueChange={setPayFrequency}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly (52 paychecks)</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly (26 paychecks)</SelectItem>
                  <SelectItem value="semimonthly">Semi-Monthly (24 paychecks)</SelectItem>
                  <SelectItem value="monthly">Monthly (12 paychecks)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div>
              <Label htmlFor="federalTaxRate">Federal Tax Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="federalTaxRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={federalTaxRate}
                  onChange={(e) => setFederalTaxRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[federalTaxRate]}
                max={37}
                min={10}
                step={1}
                onValueChange={(values) => setFederalTaxRate(values[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">Estimated marginal tax rate</p>
            </div>

            <div>
              <Label htmlFor="stateTaxRate">State Tax Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="stateTaxRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={stateTaxRate}
                  onChange={(e) => setStateTaxRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[stateTaxRate]}
                max={13}
                min={0}
                step={0.5}
                onValueChange={(values) => setStateTaxRate(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="retirement401k">401(k) Contribution (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="retirement401k"
                  type="number"
                  step="0.5"
                  className="pl-10"
                  value={retirement401k}
                  onChange={(e) => setRetirement401k(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[retirement401k]}
                max={25}
                min={0}
                step={0.5}
                onValueChange={(values) => setRetirement401k(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="healthInsurance">Health Insurance (per paycheck)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="healthInsurance"
                  type="number"
                  className="pl-10"
                  value={healthInsurance}
                  onChange={(e) => setHealthInsurance(Number(e.target.value))}
                />
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
              key={netPayPerPeriod}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Paycheck Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Net Pay Per Paycheck</h3>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(netPayPerPeriod)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {payFrequency.charAt(0).toUpperCase() + payFrequency.slice(1)} take-home
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Gross Per Paycheck</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(grossPerPeriod)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Annual Take-Home</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(annualNetPay)}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gross Pay:</span>
                    <span className="font-semibold">{formatCurrency(grossPerPeriod)}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Federal Tax:</span>
                    <span className="font-semibold">-{formatCurrency(federalTax)}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>State Tax:</span>
                    <span className="font-semibold">-{formatCurrency(stateTax)}</span>
                  </div>
                  <div className="flex justify-between text-blue-600">
                    <span>Social Security:</span>
                    <span className="font-semibold">-{formatCurrency(socialSecurity)}</span>
                  </div>
                  <div className="flex justify-between text-blue-600">
                    <span>Medicare:</span>
                    <span className="font-semibold">-{formatCurrency(medicare)}</span>
                  </div>
                  <div className="flex justify-between text-purple-600">
                    <span>401(k) ({retirement401k}%):</span>
                    <span className="font-semibold">-{formatCurrency((grossPerPeriod * retirement401k) / 100)}</span>
                  </div>
                  <div className="flex justify-between text-pink-600">
                    <span>Health Insurance:</span>
                    <span className="font-semibold">-{formatCurrency(healthInsurance)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="font-semibold">Net Take-Home:</span>
                    <span className="text-xl font-bold text-green-600">{formatCurrency(netPayPerPeriod)}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Paycheck Breakdown</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={100}
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
              <Info className="mr-2 h-5 w-5" /> Understanding Paycheck Deductions
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">FICA Taxes</h3>
                <p>
                  Social Security (6.2%) and Medicare (1.45%) are mandatory federal taxes that fund these programs. 
                  These are calculated on gross income before other deductions.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Pre-Tax Deductions</h3>
                <p>
                  401(k) contributions and health insurance premiums are typically deducted before taxes, 
                  which reduces your taxable income and saves you money on taxes.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Tax Rates</h3>
                <p>
                  This calculator uses simplified tax rates. Actual taxes may vary based on deductions, 
                  credits, and your specific tax situation. Consult a tax professional for precise calculations.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TakeHomePaycheckCalculator;
