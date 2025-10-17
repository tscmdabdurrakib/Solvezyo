import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw, TrendingUp, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AnnuityCalculator Component
 * 
 * Calculate the future value of an annuity based on regular contributions,
 * interest rate, and time period. Supports both ordinary annuity and annuity due.
 */
export function AnnuityCalculator() {
  // State for input values
  const [paymentAmount, setPaymentAmount] = useState<number>(500);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [numberOfYears, setNumberOfYears] = useState<number>(20);
  const [paymentFrequency, setPaymentFrequency] = useState<string>('monthly');
  const [annuityType, setAnnuityType] = useState<string>('ordinary'); // 'ordinary' or 'due'
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('monthly');
  
  // State for calculated results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterestEarned, setTotalInterestEarned] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    paymentAmount?: string;
    interestRate?: string;
    numberOfYears?: string;
  }>({});

  // Calculate annuity when inputs change
  useEffect(() => {
    calculateAnnuity();
  }, [paymentAmount, interestRate, numberOfYears, paymentFrequency, annuityType, compoundingFrequency]);

  /**
   * Calculate annuity future value
   * FV = PMT × [((1 + r)^n - 1) / r]
   * For annuity due: FV = FV_ordinary × (1 + r)
   */
  const calculateAnnuity = () => {
    // Validate inputs
    const newErrors: {
      paymentAmount?: string;
      interestRate?: string;
      numberOfYears?: string;
    } = {};
    
    if (paymentAmount <= 0) newErrors.paymentAmount = "Payment must be greater than 0";
    if (interestRate <= 0) newErrors.interestRate = "Interest rate must be greater than 0";
    if (numberOfYears <= 0) newErrors.numberOfYears = "Years must be greater than 0";
    
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
    
    const paymentsPerYear = frequencyMap[paymentFrequency];
    const compoundingsPerYear = frequencyMap[compoundingFrequency];
    
    // Calculate periodic interest rate
    const annualRate = interestRate / 100;
    const periodicRate = annualRate / paymentsPerYear;
    
    // Total number of payments
    const totalPayments = paymentsPerYear * numberOfYears;
    
    // Calculate future value of ordinary annuity
    // FV = PMT × [((1 + r)^n - 1) / r]
    let fv = 0;
    if (periodicRate === 0) {
      fv = paymentAmount * totalPayments;
    } else {
      fv = paymentAmount * (Math.pow(1 + periodicRate, totalPayments) - 1) / periodicRate;
    }
    
    // Adjust for annuity due (payments at beginning of period)
    if (annuityType === 'due') {
      fv *= (1 + periodicRate);
    }
    
    const contributions = paymentAmount * totalPayments;
    const interest = fv - contributions;
    
    setFutureValue(fv);
    setTotalContributions(contributions);
    setTotalInterestEarned(interest);
    
    // Generate projection data
    const data = [];
    for (let year = 1; year <= numberOfYears; year++) {
      const paymentsToDate = paymentsPerYear * year;
      let yearlyFv = 0;
      
      if (periodicRate === 0) {
        yearlyFv = paymentAmount * paymentsToDate;
      } else {
        yearlyFv = paymentAmount * (Math.pow(1 + periodicRate, paymentsToDate) - 1) / periodicRate;
      }
      
      if (annuityType === 'due') {
        yearlyFv *= (1 + periodicRate);
      }
      
      const yearlyContributions = paymentAmount * paymentsToDate;
      
      data.push({
        year: `Year ${year}`,
        'Total Value': yearlyFv,
        'Total Contributions': yearlyContributions,
        'Interest Earned': yearlyFv - yearlyContributions,
      });
    }
    
    setProjectionData(data);
  };

  // Function to reset all values
  const handleReset = () => {
    setPaymentAmount(500);
    setInterestRate(6);
    setNumberOfYears(20);
    setPaymentFrequency('monthly');
    setAnnuityType('ordinary');
    setCompoundingFrequency('monthly');
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Annuity Calculation Results:
Future Value: ${formatCurrency(futureValue)}
Total Contributions: ${formatCurrency(totalContributions)}
Total Interest Earned: ${formatCurrency(totalInterestEarned)}`;
    
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
    { name: 'Interest Earned', value: totalInterestEarned, color: '#10B981' }
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Annuity Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the future value of your annuity investments with regular contributions.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Annuity Details
          </h2>
          
          <div className="space-y-6">
            {/* Payment Amount */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="paymentAmount">Payment Amount</Label>
                {errors.paymentAmount && (
                  <span className="text-sm text-red-500">{errors.paymentAmount}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="paymentAmount"
                  type="number"
                  className="pl-10"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[paymentAmount]}
                max={5000}
                min={10}
                step={10}
                onValueChange={(values) => setPaymentAmount(values[0])}
              />
            </div>

            {/* Payment Frequency */}
            <div>
              <Label htmlFor="paymentFrequency">Payment Frequency</Label>
              <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
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

            {/* Annuity Type */}
            <div>
              <Label htmlFor="annuityType">Annuity Type</Label>
              <Select value={annuityType} onValueChange={setAnnuityType}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ordinary">Ordinary Annuity (End of Period)</SelectItem>
                  <SelectItem value="due">Annuity Due (Beginning of Period)</SelectItem>
                </SelectContent>
              </Select>
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

            {/* Compounding Frequency */}
            <div>
              <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
              <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="semiannually">Semi-Annually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Years */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="numberOfYears">Number of Years</Label>
                {errors.numberOfYears && (
                  <span className="text-sm text-red-500">{errors.numberOfYears}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="numberOfYears"
                  type="number"
                  className="pl-10"
                  value={numberOfYears}
                  onChange={(e) => setNumberOfYears(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[numberOfYears]}
                max={40}
                min={1}
                step={1}
                onValueChange={(values) => setNumberOfYears(values[0])}
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
              key={futureValue}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Annuity Results
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Future Value</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(futureValue)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Contributions</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(totalContributions)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Interest Earned</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(totalInterestEarned)}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Return on Investment</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {totalContributions > 0 ? ((totalInterestEarned / totalContributions) * 100).toFixed(2) : 0}%
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Visualization Tabs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Growth Visualization</h2>
            
            <Tabs defaultValue="projection">
              <TabsList className="mb-4">
                <TabsTrigger value="projection">Growth Projection</TabsTrigger>
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projection" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="Total Value" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Total Contributions" stroke="#3B82F6" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="distribution" className="h-80">
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

      {/* Information Section */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Understanding Annuities</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">What is an Annuity?</h3>
            <p className="text-muted-foreground text-sm">
              An annuity is a series of equal payments made at regular intervals. It's commonly used for retirement 
              planning, loan payments, and investment strategies.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Ordinary vs. Due</h3>
            <p className="text-muted-foreground text-sm">
              Ordinary annuities make payments at the end of each period. Annuity due makes payments at the 
              beginning, resulting in slightly higher future value due to extra compounding time.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Power of Compounding</h3>
            <p className="text-muted-foreground text-sm">
              The future value grows exponentially thanks to compound interest. Each payment earns interest, 
              and that interest earns more interest over time, significantly boosting your total returns.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AnnuityCalculator;
