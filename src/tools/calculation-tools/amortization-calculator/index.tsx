import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Calculator, DollarSign, Calendar, Percent, RefreshCw, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AmortizationPayment {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  month: number;
  year: number;
}

/**
 * Amortization Calculator Component
 * 
 * Calculate monthly payments and generate a complete amortization schedule
 * showing the breakdown of principal and interest for each payment.
 */
export function AmortizationCalculator() {
  // State for input values
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  
  // State for calculated results
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationPayment[]>([]);
  
  // State for validation
  const [errors, setErrors] = useState<{
    loanAmount?: string;
    interestRate?: string;
    loanTerm?: string;
  }>({});

  // Calculate amortization when inputs change
  useEffect(() => {
    calculateAmortization();
  }, [loanAmount, interestRate, loanTerm]);

  // FORMULA GOES HERE: Amortization calculation
  const calculateAmortization = () => {
    // Validate inputs
    const newErrors: {
      loanAmount?: string;
      interestRate?: string;
      loanTerm?: string;
    } = {};
    
    if (loanAmount <= 0) newErrors.loanAmount = "Loan amount must be greater than 0";
    if (interestRate < 0) newErrors.interestRate = "Interest rate cannot be negative";
    if (loanTerm <= 0) newErrors.loanTerm = "Loan term must be greater than 0";
    
    setErrors(newErrors);
    
    // If there are validation errors, don't calculate
    if (Object.keys(newErrors).length > 0) {
      setAmortizationSchedule([]);
      return;
    }
    
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment using amortization formula
    // M = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]
    let monthly: number;
    
    if (monthlyRate === 0) {
      // If interest rate is 0, simple division
      monthly = principal / numberOfPayments;
    } else {
      const x = Math.pow(1 + monthlyRate, numberOfPayments);
      monthly = (principal * monthlyRate * x) / (x - 1);
    }
    
    setMonthlyPayment(monthly);
    setTotalPayment(monthly * numberOfPayments);
    setTotalInterest((monthly * numberOfPayments) - principal);
    
    // Generate amortization schedule
    const schedule: AmortizationPayment[] = [];
    let remainingBalance = principal;
    
    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthly - interestPayment;
      remainingBalance = remainingBalance - principalPayment;
      
      // Ensure the last payment doesn't result in negative balance
      if (i === numberOfPayments && remainingBalance < 0) {
        remainingBalance = 0;
      }
      
      schedule.push({
        payment: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
        month: ((i - 1) % 12) + 1,
        year: Math.floor((i - 1) / 12) + 1
      });
    }
    
    setAmortizationSchedule(schedule);
  };

  // Function to reset all values
  const handleReset = () => {
    setLoanAmount(250000);
    setInterestRate(4.5);
    setLoanTerm(30);
    setErrors({});
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

  // Data for charts
  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#3B82F6' },
    { name: 'Interest', value: totalInterest, color: '#EF4444' }
  ];

  // Yearly summary for bar chart
  const getYearlySummary = () => {
    const yearlyData: { [key: number]: { year: number; principal: number; interest: number } } = {};
    
    amortizationSchedule.forEach(payment => {
      if (!yearlyData[payment.year]) {
        yearlyData[payment.year] = { year: payment.year, principal: 0, interest: 0 };
      }
      yearlyData[payment.year].principal += payment.principal;
      yearlyData[payment.year].interest += payment.interest;
    });
    
    return Object.values(yearlyData).slice(0, 10); // Show first 10 years
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6" data-testid="amortization-calculator">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Calculator className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold">Amortization Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate monthly payments and view a complete amortization schedule showing principal and interest breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loan-amount" className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Loan Amount</span>
                    </Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                      placeholder="250000"
                      data-testid="input-loan-amount"
                    />
                    {errors.loanAmount && (
                      <p className="text-sm text-red-500">{errors.loanAmount}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest-rate" className="flex items-center space-x-2">
                      <Percent className="h-4 w-4" />
                      <span>Annual Interest Rate (%)</span>
                    </Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                      placeholder="4.5"
                      data-testid="input-interest-rate"
                    />
                    {errors.interestRate && (
                      <p className="text-sm text-red-500">{errors.interestRate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan-term" className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Loan Term (Years)</span>
                    </Label>
                    <Input
                      id="loan-term"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(parseFloat(e.target.value) || 0)}
                      placeholder="30"
                      data-testid="input-loan-term"
                    />
                    {errors.loanTerm && (
                      <p className="text-sm text-red-500">{errors.loanTerm}</p>
                    )}
                  </div>

                  <Button 
                    onClick={handleReset} 
                    variant="outline" 
                    className="w-full"
                    data-testid="button-reset"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Results Section */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-primary" data-testid="result-monthly-payment">
                          {formatCurrency(monthlyPayment)}
                        </div>
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600" data-testid="result-total-payment">
                          {formatCurrency(totalPayment)}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Payment</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600" data-testid="result-total-interest">
                          {formatCurrency(totalInterest)}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Interest</p>
                      </CardContent>
                    </Card>
                  </div>

                  {Object.keys(errors).length === 0 && amortizationSchedule.length > 0 && (
                    <Alert className="mt-4">
                      <AlertDescription>
                        Over {loanTerm} years, you'll pay {formatCurrency(totalInterest)} in interest 
                        ({((totalInterest / loanAmount) * 100).toFixed(1)}% of the loan amount).
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Amortization Schedule</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <ScrollArea className="h-96 w-full border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {amortizationSchedule.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.payment}</TableCell>
                        <TableCell>
                          {payment.month}/{payment.year}
                        </TableCell>
                        <TableCell>{formatCurrency(payment.principal + payment.interest)}</TableCell>
                        <TableCell className="text-blue-600">
                          {formatCurrency(payment.principal)}
                        </TableCell>
                        <TableCell className="text-red-600">
                          {formatCurrency(payment.interest)}
                        </TableCell>
                        <TableCell>{formatCurrency(payment.balance)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="charts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Principal vs Interest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
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
                  </CardContent>
                </Card>

                {/* Bar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Yearly Payment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getYearlySummary()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="principal" stackId="a" fill="#3B82F6" name="Principal" />
                        <Bar dataKey="interest" stackId="a" fill="#EF4444" name="Interest" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default AmortizationCalculator;
