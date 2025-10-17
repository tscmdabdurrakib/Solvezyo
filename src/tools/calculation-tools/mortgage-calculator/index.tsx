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

/**
 * MortgageCalculator Component
 * 
 * A comprehensive mortgage calculator that helps users estimate monthly payments,
 * total interest, and visualize payment breakdowns through charts.
 */
export function MortgageCalculator() {
  // State for input values
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [downPayment, setDownPayment] = useState<number>(60000);
  
  // State for calculated results
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  // State for validation
  const [errors, setErrors] = useState<{
    loanAmount?: string;
    interestRate?: string;
    loanTerm?: string;
    downPayment?: string;
  }>({});

  // Calculate mortgage when inputs change
  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  // Function to calculate mortgage details
  const calculateMortgage = () => {
    // Validate inputs
    const newErrors: {
      loanAmount?: string;
      interestRate?: string;
      loanTerm?: string;
      downPayment?: string;
    } = {};
    
    if (loanAmount <= 0) newErrors.loanAmount = "Loan amount must be greater than 0";
    if (interestRate <= 0) newErrors.interestRate = "Interest rate must be greater than 0";
    if (loanTerm <= 0) newErrors.loanTerm = "Loan term must be greater than 0";
    if (downPayment < 0) newErrors.downPayment = "Down payment cannot be negative";
    if (downPayment >= loanAmount) newErrors.downPayment = "Down payment cannot exceed loan amount";
    
    setErrors(newErrors);
    
    // If there are validation errors, don't calculate
    if (Object.keys(newErrors).length > 0) return;
    
    // Calculate loan after down payment
    const principal = loanAmount - downPayment;
    
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Total number of payments
    const payments = loanTerm * 12;
    
    // Calculate monthly payment using the mortgage formula
    // M = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]
    if (monthlyRate === 0) {
      // If interest rate is 0, simple division
      const monthly = principal / payments;
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * payments);
      setTotalInterest(0);
    } else {
      const x = Math.pow(1 + monthlyRate, payments);
      const monthly = (principal * monthlyRate * x) / (x - 1);
      
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * payments);
      setTotalInterest((monthly * payments) - principal);
    }
  };

  // Function to reset all values
  const handleReset = () => {
    setLoanAmount(300000);
    setInterestRate(5.5);
    setLoanTerm(30);
    setDownPayment(60000);
    setErrors({});
  };

  // Data for the Pie Chart
  const pieData = [
    { name: 'Principal', value: loanAmount - downPayment, color: '#3B82F6' },
    { name: 'Interest', value: totalInterest, color: '#EF4444' }
  ];
  
  // Data for the Bar Chart - payment breakdown over time
  const generateBarData = () => {
    // Simple version - just show principal vs interest
    return [
      {
        name: 'Payment Breakdown',
        Principal: loanAmount - downPayment,
        Interest: totalInterest,
      }
    ];
  };

  // Format currency with commas and 2 decimal places
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
        <h1 className="text-3xl font-bold tracking-tight">Mortgage Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Plan your home loan and calculate your monthly payments, total interest, and more.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Loan Details
          </h2>
          
          <div className="space-y-6">
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                {errors.loanAmount && (
                  <span className="text-sm text-red-500">{errors.loanAmount}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="loanAmount"
                  type="number"
                  className="pl-10"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                defaultValue={[loanAmount]}
                max={1000000}
                step={1000}
                value={[loanAmount]}
                onValueChange={(values) => setLoanAmount(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$0</span>
                <span>$500,000</span>
                <span>$1,000,000</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="downPayment">Down Payment</Label>
                {errors.downPayment && (
                  <span className="text-sm text-red-500">{errors.downPayment}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="downPayment"
                  type="number"
                  className="pl-10"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                defaultValue={[downPayment]}
                max={loanAmount}
                step={1000}
                value={[downPayment]}
                onValueChange={(values) => setDownPayment(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$0</span>
                <span>{formatCurrency(loanAmount / 2)}</span>
                <span>{formatCurrency(loanAmount)}</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
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
                defaultValue={[interestRate]}
                max={15}
                step={0.1}
                value={[interestRate]}
                onValueChange={(values) => setInterestRate(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>7.5%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                {errors.loanTerm && (
                  <span className="text-sm text-red-500">{errors.loanTerm}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="loanTerm"
                  type="number"
                  className="pl-10"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                defaultValue={[loanTerm]}
                max={40}
                step={1}
                value={[loanTerm]}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0y</span>
                <span>20y</span>
                <span>40y</span>
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          {/* Summary Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Mortgage Summary
            </h2>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
                <div className="mt-1 text-2xl font-bold">
                  {isNaN(monthlyPayment) ? '$0' : formatCurrency(monthlyPayment)}
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Principal</h3>
                <div className="mt-1 text-2xl font-bold">
                  {formatCurrency(loanAmount - downPayment)}
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                <div className="mt-1 text-2xl font-bold">
                  {isNaN(totalInterest) ? '$0' : formatCurrency(totalInterest)}
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Total Payment Over Term</h3>
              <div className="mt-1 text-3xl font-bold">
                {isNaN(totalPayment) ? '$0' : formatCurrency(totalPayment)}
              </div>
            </div>
          </Card>

          {/* Visualization Tabs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Breakdown</h2>
            
            <Tabs defaultValue="pie">
              <TabsList className="mb-4">
                <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pie" className="h-80">
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
              
              <TabsContent value="bar" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={generateBarData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="Principal" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="Interest" stackId="a" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Information Section */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Understanding Your Mortgage</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">What is a Mortgage?</h3>
            <p className="text-muted-foreground text-sm">
              A mortgage is a loan used to purchase a home or property, where the property serves as collateral. The borrower agrees to make regular payments over time, typically including principal and interest.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">How it Works</h3>
            <p className="text-muted-foreground text-sm">
              Your monthly payment consists of principal (the amount borrowed), interest (the cost of borrowing), and often taxes and insurance. Over time, more of your payment goes toward the principal as the loan balance decreases.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Why Use This Calculator?</h3>
            <p className="text-muted-foreground text-sm">
              This calculator helps you understand the true cost of your mortgage, plan your budget accordingly, and make informed decisions about loan terms, down payment amounts, and interest rates.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MortgageCalculator;
