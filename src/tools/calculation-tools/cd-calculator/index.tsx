import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, DollarSign, Calendar, Percent, RefreshCw, Copy, Check, TrendingUp, Landmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CDCalculator Component
 * 
 * Calculate returns on a Certificate of Deposit (CD) with compound interest.
 * Formula: A = P(1 + r/n)^(nt)
 */
export function CDCalculator() {
  // State for input values
  const [depositAmount, setDepositAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [termLength, setTermLength] = useState<number>(12);
  const [termUnit, setTermUnit] = useState<string>('months');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('monthly');
  
  // State for calculated results
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [apy, setApy] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    depositAmount?: string;
    interestRate?: string;
    termLength?: string;
  }>({});

  // Calculate CD returns when inputs change
  useEffect(() => {
    calculateCD();
  }, [depositAmount, interestRate, termLength, termUnit, compoundingFrequency]);

  /**
   * Calculate CD Maturity Value
   * Formula: A = P(1 + r/n)^(nt)
   * Where:
   * A = Maturity value
   * P = Principal (initial deposit)
   * r = Annual interest rate (as decimal)
   * n = Number of times interest is compounded per year
   * t = Time in years
   */
  const calculateCD = () => {
    // Validate inputs
    const newErrors: {
      depositAmount?: string;
      interestRate?: string;
      termLength?: string;
    } = {};
    
    if (depositAmount <= 0) newErrors.depositAmount = "Deposit must be greater than 0";
    if (interestRate <= 0) newErrors.interestRate = "Interest rate must be greater than 0";
    if (termLength <= 0) newErrors.termLength = "Term length must be greater than 0";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Frequency mapping
    const frequencyMap: { [key: string]: number } = {
      daily: 365,
      monthly: 12,
      quarterly: 4,
      semiannually: 2,
      annually: 1,
    };
    
    const n = frequencyMap[compoundingFrequency];
    
    // Convert term to years
    let timeInYears = termLength;
    if (termUnit === 'months') {
      timeInYears = termLength / 12;
    } else if (termUnit === 'days') {
      timeInYears = termLength / 365;
    }
    
    const rate = interestRate / 100;
    
    // Calculate maturity value: A = P(1 + r/n)^(nt)
    const maturity = depositAmount * Math.pow(1 + rate / n, n * timeInYears);
    const interest = maturity - depositAmount;
    
    // Calculate APY: (1 + r/n)^n - 1
    const annualPercentageYield = (Math.pow(1 + rate / n, n) - 1) * 100;
    
    setMaturityValue(maturity);
    setTotalInterest(interest);
    setApy(annualPercentageYield);
  };

  // Function to reset all values
  const handleReset = () => {
    setDepositAmount(10000);
    setInterestRate(3.5);
    setTermLength(12);
    setTermUnit('months');
    setCompoundingFrequency('monthly');
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `CD Calculator Results:
Deposit Amount: ${formatCurrency(depositAmount)}
Interest Rate: ${interestRate}%
Term: ${termLength} ${termUnit}
Compounding: ${compoundingFrequency}
Maturity Value: ${formatCurrency(maturityValue)}
Total Interest: ${formatCurrency(totalInterest)}
APY: ${apy.toFixed(2)}%`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">CD Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the maturity value and interest earned on your Certificate of Deposit.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Landmark className="mr-2 h-5 w-5" /> CD Details
          </h2>
          
          <div className="space-y-6">
            {/* Deposit Amount */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="depositAmount">Initial Deposit</Label>
                {errors.depositAmount && (
                  <span className="text-sm text-red-500">{errors.depositAmount}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="depositAmount"
                  type="number"
                  className="pl-10"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[depositAmount]}
                max={100000}
                min={500}
                step={100}
                onValueChange={(values) => setDepositAmount(values[0])}
              />
            </div>

            <Separator />

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                {errors.interestRate && (
                  <span className="text-sm text-red-500">{errors.interestRate}</span>
                )}
              </div>
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
                max={10}
                min={0.1}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
            </div>

            <Separator />

            {/* Term Length */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="termLength">CD Term Length</Label>
                {errors.termLength && (
                  <span className="text-sm text-red-500">{errors.termLength}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="termLength"
                  type="number"
                  className="pl-10"
                  value={termLength}
                  onChange={(e) => setTermLength(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[termLength]}
                max={60}
                min={1}
                step={1}
                onValueChange={(values) => setTermLength(values[0])}
              />
            </div>

            {/* Term Unit */}
            <div>
              <Label htmlFor="termUnit">Term Unit</Label>
              <Select value={termUnit} onValueChange={setTermUnit}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Compounding Frequency */}
            <div>
              <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
              <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="semiannually">Semi-Annually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
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
              key={maturityValue}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> CD Results
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Initial Deposit</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(depositAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Interest Earned</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(totalInterest)}
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary">
                    <h3 className="text-sm font-medium text-muted-foreground">Maturity Value</h3>
                    <div className="mt-1 text-3xl font-bold">
                      {formatCurrency(maturityValue)}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Annual Percentage Yield (APY)</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {apy.toFixed(3)}%
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Understanding CDs</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">What is a CD?</h3>
                <p className="text-muted-foreground text-sm">
                  A Certificate of Deposit (CD) is a savings product that earns interest on a lump sum for a 
                  fixed period. CDs typically offer higher interest rates than regular savings accounts in 
                  exchange for leaving the money untouched for the agreed term.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">APY vs APR</h3>
                <p className="text-muted-foreground text-sm">
                  APY (Annual Percentage Yield) accounts for compound interest and is always higher than or 
                  equal to the stated interest rate. The more frequently interest compounds, the higher the APY.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Early Withdrawal</h3>
                <p className="text-muted-foreground text-sm">
                  Withdrawing funds before the CD matures typically results in penalties. These penalties 
                  usually equal several months of interest, making CDs best for funds you won't need soon.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Compounding Effect</h3>
                <p className="text-muted-foreground text-sm">
                  More frequent compounding means your interest earns interest more often, resulting in higher 
                  returns. Daily compounding yields the highest returns for the same stated interest rate.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CDCalculator;
