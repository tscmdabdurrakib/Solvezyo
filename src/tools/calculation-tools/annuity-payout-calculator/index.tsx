import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw, Wallet, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AnnuityPayoutCalculator Component
 * 
 * Calculate periodic payouts from an annuity based on principal amount,
 * interest rate, and payout duration. Useful for retirement planning.
 */
export function AnnuityPayoutCalculator() {
  // State for input values
  const [principalAmount, setPrincipalAmount] = useState<number>(500000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(5);
  const [payoutYears, setPayoutYears] = useState<number>(25);
  const [payoutFrequency, setPayoutFrequency] = useState<string>('monthly');
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  
  // State for calculated results
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [totalPayouts, setTotalPayouts] = useState<number>(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState<number>(0);
  const [firstYearPayouts, setFirstYearPayouts] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    principalAmount?: string;
    annualInterestRate?: string;
    payoutYears?: string;
  }>({});

  // Calculate payout when inputs change
  useEffect(() => {
    calculatePayout();
  }, [principalAmount, annualInterestRate, payoutYears, payoutFrequency, inflationRate]);

  /**
   * Calculate annuity payout using present value of annuity formula
   * PMT = PV × [r(1 + r)^n] / [(1 + r)^n - 1]
   */
  const calculatePayout = () => {
    // Validate inputs
    const newErrors: {
      principalAmount?: string;
      annualInterestRate?: string;
      payoutYears?: string;
    } = {};
    
    if (principalAmount <= 0) newErrors.principalAmount = "Principal must be greater than 0";
    if (annualInterestRate < 0) newErrors.annualInterestRate = "Interest rate cannot be negative";
    if (payoutYears <= 0) newErrors.payoutYears = "Years must be greater than 0";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Frequency mapping
    const frequencyMap: { [key: string]: number } = {
      weekly: 52,
      biweekly: 26,
      monthly: 12,
      quarterly: 4,
      semiannually: 2,
      annually: 1,
    };
    
    const paymentsPerYear = frequencyMap[payoutFrequency];
    
    // Calculate periodic interest rate
    const annualRate = annualInterestRate / 100;
    const periodicRate = annualRate / paymentsPerYear;
    
    // Total number of payments
    const totalPayments = paymentsPerYear * payoutYears;
    
    // Calculate payment amount using present value of annuity formula
    // PMT = PV × [r(1 + r)^n] / [(1 + r)^n - 1]
    let pmt = 0;
    if (periodicRate === 0) {
      // If no interest, simple division
      pmt = principalAmount / totalPayments;
    } else {
      const pvFactor = Math.pow(1 + periodicRate, totalPayments);
      pmt = principalAmount * (periodicRate * pvFactor) / (pvFactor - 1);
    }
    
    const totalPayout = pmt * totalPayments;
    const interestPaid = totalPayout - principalAmount;
    const yearOnePayouts = pmt * paymentsPerYear;
    
    setPaymentAmount(pmt);
    setTotalPayouts(totalPayout);
    setTotalInterestPaid(interestPaid);
    setFirstYearPayouts(yearOnePayouts);
    
    // Generate projection data showing balance over time
    const data = [];
    let remainingBalance = principalAmount;
    
    for (let year = 1; year <= Math.min(payoutYears, 30); year++) {
      const paymentsThisYear = paymentsPerYear;
      let yearPayments = 0;
      let yearInterest = 0;
      
      for (let i = 0; i < paymentsThisYear && remainingBalance > 0; i++) {
        const interestForPeriod = remainingBalance * periodicRate;
        const principalForPeriod = pmt - interestForPeriod;
        
        yearPayments += pmt;
        yearInterest += interestForPeriod;
        remainingBalance -= principalForPeriod;
      }
      
      // Adjust for inflation to show real purchasing power
      const inflationAdjustment = Math.pow(1 + inflationRate / 100, year);
      const realPaymentValue = pmt / inflationAdjustment;
      
      data.push({
        year: `Year ${year}`,
        'Remaining Balance': Math.max(0, remainingBalance),
        'Annual Payout': yearPayments,
        'Real Value (Inflation-Adjusted)': realPaymentValue * paymentsPerYear,
      });
      
      if (remainingBalance <= 0) break;
    }
    
    setProjectionData(data);
  };

  // Function to reset all values
  const handleReset = () => {
    setPrincipalAmount(500000);
    setAnnualInterestRate(5);
    setPayoutYears(25);
    setPayoutFrequency('monthly');
    setInflationRate(2.5);
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const frequency = payoutFrequency.charAt(0).toUpperCase() + payoutFrequency.slice(1);
    const resultText = `Annuity Payout Results:
${frequency} Payment: ${formatCurrency(paymentAmount)}
First Year Payouts: ${formatCurrency(firstYearPayouts)}
Total Payouts: ${formatCurrency(totalPayouts)}
Total Interest Paid: ${formatCurrency(totalInterestPaid)}`;
    
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

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Annuity Payout Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate how much you can withdraw from your annuity at regular intervals.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wallet className="mr-2 h-5 w-5" /> Annuity Details
          </h2>
          
          <div className="space-y-6">
            {/* Principal Amount */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="principalAmount">Principal Amount</Label>
                {errors.principalAmount && (
                  <span className="text-sm text-red-500">{errors.principalAmount}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="principalAmount"
                  type="number"
                  className="pl-10"
                  value={principalAmount}
                  onChange={(e) => setPrincipalAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[principalAmount]}
                max={2000000}
                min={10000}
                step={10000}
                onValueChange={(values) => setPrincipalAmount(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$10k</span>
                <span>$1M</span>
                <span>$2M</span>
              </div>
            </div>

            {/* Annual Interest Rate */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="annualInterestRate">Annual Interest Rate (%)</Label>
                {errors.annualInterestRate && (
                  <span className="text-sm text-red-500">{errors.annualInterestRate}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="annualInterestRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={annualInterestRate}
                  onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[annualInterestRate]}
                max={15}
                min={0}
                step={0.1}
                onValueChange={(values) => setAnnualInterestRate(values[0])}
              />
            </div>

            {/* Payout Years */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="payoutYears">Payout Period (years)</Label>
                {errors.payoutYears && (
                  <span className="text-sm text-red-500">{errors.payoutYears}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="payoutYears"
                  type="number"
                  className="pl-10"
                  value={payoutYears}
                  onChange={(e) => setPayoutYears(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[payoutYears]}
                max={40}
                min={1}
                step={1}
                onValueChange={(values) => setPayoutYears(values[0])}
              />
            </div>

            {/* Payout Frequency */}
            <div>
              <Label htmlFor="payoutFrequency">Payout Frequency</Label>
              <Select value={payoutFrequency} onValueChange={setPayoutFrequency}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="semiannually">Semi-Annually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Inflation Rate */}
            <div>
              <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="inflationRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[inflationRate]}
                max={10}
                min={0}
                step={0.1}
                onValueChange={(values) => setInflationRate(values[0])}
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
              key={paymentAmount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Payout Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {payoutFrequency.charAt(0).toUpperCase() + payoutFrequency.slice(1)} Payment
                    </h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(paymentAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">First Year Payouts</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(firstYearPayouts)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Payouts</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(totalPayouts)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Interest Earned</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(totalInterestPaid)}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="bg-blue-100/40 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Initial Principal</h3>
                  <div className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(principalAmount)}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Visualization Tabs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payout Projection</h2>
            
            <Tabs defaultValue="balance">
              <TabsList className="mb-4">
                <TabsTrigger value="balance">Balance Over Time</TabsTrigger>
                <TabsTrigger value="inflation">Inflation Impact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="balance" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="Remaining Balance" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Annual Payout" stroke="#10B981" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="inflation" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectionData.slice(0, 10)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="Annual Payout" fill="#3B82F6" />
                    <Bar dataKey="Real Value (Inflation-Adjusted)" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Information Section */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Understanding Annuity Payouts</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">How Payouts Work</h3>
            <p className="text-muted-foreground text-sm">
              Annuity payouts are calculated to ensure your principal is distributed evenly over the payout period, 
              with interest earned on the remaining balance helping to fund later payments.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Inflation Impact</h3>
            <p className="text-muted-foreground text-sm">
              While your nominal payment stays the same, inflation reduces purchasing power over time. 
              This calculator shows both actual and inflation-adjusted values to help you plan.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Planning Tip</h3>
            <p className="text-muted-foreground text-sm">
              Consider your expected lifespan and expenses when choosing a payout period. Longer periods 
              provide smaller payments but greater longevity protection.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AnnuityPayoutCalculator;
