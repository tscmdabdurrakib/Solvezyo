import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, DollarSign, Calendar, Percent, RefreshCw, Copy, Check, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SimpleInterestCalculator Component
 * 
 * Calculate simple interest on a principal amount over a period of time.
 * Formula: I = P × r × t
 * Total Amount = Principal + Interest
 */
export function SimpleInterestCalculator() {
  // State for input values
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [timeUnit, setTimeUnit] = useState<string>('years');
  
  // State for calculated results
  const [interest, setInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    principal?: string;
    interestRate?: string;
    timePeriod?: string;
  }>({});

  // Calculate simple interest when inputs change
  useEffect(() => {
    calculateSimpleInterest();
  }, [principal, interestRate, timePeriod, timeUnit]);

  /**
   * Calculate Simple Interest
   * Formula: I = P × r × t
   * Where:
   * I = Interest
   * P = Principal amount
   * r = Annual interest rate (as decimal)
   * t = Time period in years
   */
  const calculateSimpleInterest = () => {
    // Validate inputs
    const newErrors: {
      principal?: string;
      interestRate?: string;
      timePeriod?: string;
    } = {};
    
    if (principal <= 0) newErrors.principal = "Principal must be greater than 0";
    if (interestRate <= 0) newErrors.interestRate = "Interest rate must be greater than 0";
    if (timePeriod <= 0) newErrors.timePeriod = "Time period must be greater than 0";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Convert time to years based on selected unit
    let timeInYears = timePeriod;
    if (timeUnit === 'months') {
      timeInYears = timePeriod / 12;
    } else if (timeUnit === 'days') {
      timeInYears = timePeriod / 365;
    }
    
    // Calculate simple interest: I = P × r × t
    const rate = interestRate / 100;
    const simpleInterest = principal * rate * timeInYears;
    const total = principal + simpleInterest;
    
    setInterest(simpleInterest);
    setTotalAmount(total);
  };

  // Function to reset all values
  const handleReset = () => {
    setPrincipal(10000);
    setInterestRate(5);
    setTimePeriod(5);
    setTimeUnit('years');
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Simple Interest Calculation Results:
Principal Amount: ${formatCurrency(principal)}
Interest Rate: ${interestRate}%
Time Period: ${timePeriod} ${timeUnit}
Interest Earned: ${formatCurrency(interest)}
Total Amount: ${formatCurrency(totalAmount)}`;
    
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
        <h1 className="text-3xl font-bold tracking-tight">Simple Interest Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate simple interest on your principal amount over time.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Loan Details
          </h2>
          
          <div className="space-y-6">
            {/* Principal Amount */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="principal">Principal Amount</Label>
                {errors.principal && (
                  <span className="text-sm text-red-500">{errors.principal}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="principal"
                  type="number"
                  className="pl-10"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[principal]}
                max={100000}
                min={100}
                step={100}
                onValueChange={(values) => setPrincipal(values[0])}
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
                max={20}
                min={0.1}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
            </div>

            <Separator />

            {/* Time Period */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="timePeriod">Time Period</Label>
                {errors.timePeriod && (
                  <span className="text-sm text-red-500">{errors.timePeriod}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="timePeriod"
                  type="number"
                  className="pl-10"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[timePeriod]}
                max={30}
                min={1}
                step={1}
                onValueChange={(values) => setTimePeriod(values[0])}
              />
            </div>

            {/* Time Unit */}
            <div>
              <Label htmlFor="timeUnit">Time Unit</Label>
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
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
              key={totalAmount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Calculation Results
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Principal Amount</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(principal)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Interest Earned</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(interest)}
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Amount</h3>
                    <div className="mt-1 text-3xl font-bold">
                      {formatCurrency(totalAmount)}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Effective Return</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {principal > 0 ? ((interest / principal) * 100).toFixed(2) : 0}%
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
            <h2 className="text-xl font-semibold mb-4">Understanding Simple Interest</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">What is Simple Interest?</h3>
                <p className="text-muted-foreground text-sm">
                  Simple interest is calculated only on the principal amount. The formula is I = P × r × t, 
                  where I is interest, P is principal, r is the annual interest rate, and t is time in years.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">When to Use?</h3>
                <p className="text-muted-foreground text-sm">
                  Simple interest is commonly used for short-term loans, auto loans, and some personal loans. 
                  It's easier to calculate than compound interest and results in lower total interest payments.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
