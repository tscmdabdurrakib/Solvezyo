import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, DollarSign, Calendar, Percent, RefreshCw, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface YearData {
  year: number;
  startingAmount: number;
  contribution: number;
  interest: number;
  endingAmount: number;
}

/**
 * Investment Calculator Component
 * 
 * Calculate future value of investments with compound interest,
 * regular contributions, and different compounding frequencies.
 */
export function InvestmentCalculator() {
  // State for input values
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(20);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("monthly");
  
  // State for calculated results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [yearlyBreakdown, setYearlyBreakdown] = useState<YearData[]>([]);
  
  // State for validation
  const [errors, setErrors] = useState<{
    initialAmount?: string;
    monthlyContribution?: string;
    annualReturn?: string;
    investmentPeriod?: string;
  }>({});

  // Compounding frequency options
  const compoundingOptions = {
    "daily": { value: 365, label: "Daily" },
    "monthly": { value: 12, label: "Monthly" },
    "quarterly": { value: 4, label: "Quarterly" },
    "annually": { value: 1, label: "Annually" }
  };

  // Calculate investment when inputs change
  useEffect(() => {
    calculateInvestment();
  }, [initialAmount, monthlyContribution, annualReturn, investmentPeriod, compoundingFrequency]);

  // FORMULA GOES HERE: Compound interest with regular contributions
  const calculateInvestment = () => {
    // Validate inputs
    const newErrors: {
      initialAmount?: string;
      monthlyContribution?: string;
      annualReturn?: string;
      investmentPeriod?: string;
    } = {};
    
    if (initialAmount < 0) newErrors.initialAmount = "Initial amount cannot be negative";
    if (monthlyContribution < 0) newErrors.monthlyContribution = "Monthly contribution cannot be negative";
    if (annualReturn < -100) newErrors.annualReturn = "Annual return cannot be less than -100%";
    if (investmentPeriod <= 0) newErrors.investmentPeriod = "Investment period must be greater than 0";
    
    setErrors(newErrors);
    
    // If there are validation errors, don't calculate
    if (Object.keys(newErrors).length > 0) {
      setYearlyBreakdown([]);
      return;
    }
    
    const principal = initialAmount;
    const monthlyContrib = monthlyContribution;
    const rate = annualReturn / 100;
    const years = investmentPeriod;
    const compoundingPerYear = compoundingOptions[compoundingFrequency as keyof typeof compoundingOptions].value;
    
    // Calculate future value with compound interest and regular contributions
    // Formula: A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    // Where PMT is adjusted for compounding frequency
    
    const periodicRate = rate / compoundingPerYear;
    const totalPeriods = years * compoundingPerYear;
    const contributionFrequency = 12; // Monthly contributions
    const contributionPerPeriod = monthlyContrib * (contributionFrequency / compoundingPerYear);
    
    let futureValueFromPrincipal = 0;
    let futureValueFromContributions = 0;
    
    if (rate === 0) {
      // If no interest rate, simple addition
      futureValueFromPrincipal = principal;
      futureValueFromContributions = monthlyContrib * 12 * years;
    } else {
      // Compound interest formula
      futureValueFromPrincipal = principal * Math.pow(1 + periodicRate, totalPeriods);
      
      if (monthlyContrib > 0) {
        // Future value of annuity formula
        futureValueFromContributions = contributionPerPeriod * 
          ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
      }
    }
    
    const totalFutureValue = futureValueFromPrincipal + futureValueFromContributions;
    const totalContribs = principal + (monthlyContrib * 12 * years);
    const totalInt = totalFutureValue - totalContribs;
    
    setFutureValue(totalFutureValue);
    setTotalContributions(totalContribs);
    setTotalInterest(totalInt);
    
    // Generate yearly breakdown
    const breakdown: YearData[] = [];
    let currentAmount = principal;
    
    for (let year = 1; year <= years; year++) {
      const startingAmount = currentAmount;
      const annualContribution = monthlyContrib * 12;
      
      // Add monthly contributions throughout the year with compound interest
      for (let month = 1; month <= 12; month++) {
        currentAmount += monthlyContrib;
        const monthlyRate = rate / 12;
        currentAmount = currentAmount * (1 + monthlyRate);
      }
      
      const interestEarned = currentAmount - startingAmount - annualContribution;
      
      breakdown.push({
        year,
        startingAmount,
        contribution: annualContribution,
        interest: interestEarned,
        endingAmount: currentAmount
      });
    }
    
    setYearlyBreakdown(breakdown);
  };

  // Function to reset all values
  const handleReset = () => {
    setInitialAmount(10000);
    setMonthlyContribution(500);
    setAnnualReturn(7);
    setInvestmentPeriod(20);
    setCompoundingFrequency("monthly");
    setErrors({});
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

  // Calculate compound annual growth rate
  const calculateCAGR = () => {
    if (totalContributions === 0) return 0;
    return (Math.pow(futureValue / totalContributions, 1 / investmentPeriod) - 1) * 100;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6" data-testid="investment-calculator">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold">Investment Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the future value of your investments with compound interest and regular contributions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial-amount" className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Initial Investment</span>
                    </Label>
                    <Input
                      id="initial-amount"
                      type="number"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(parseFloat(e.target.value) || 0)}
                      placeholder="10000"
                      data-testid="input-initial-amount"
                    />
                    {errors.initialAmount && (
                      <p className="text-sm text-red-500">{errors.initialAmount}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly-contribution" className="flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>Monthly Contribution</span>
                    </Label>
                    <Input
                      id="monthly-contribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
                      placeholder="500"
                      data-testid="input-monthly-contribution"
                    />
                    {errors.monthlyContribution && (
                      <p className="text-sm text-red-500">{errors.monthlyContribution}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="annual-return" className="flex items-center space-x-2">
                      <Percent className="h-4 w-4" />
                      <span>Expected Annual Return (%)</span>
                    </Label>
                    <Input
                      id="annual-return"
                      type="number"
                      step="0.1"
                      value={annualReturn}
                      onChange={(e) => setAnnualReturn(parseFloat(e.target.value) || 0)}
                      placeholder="7"
                      data-testid="input-annual-return"
                    />
                    {errors.annualReturn && (
                      <p className="text-sm text-red-500">{errors.annualReturn}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investment-period" className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Investment Period (Years)</span>
                    </Label>
                    <Input
                      id="investment-period"
                      type="number"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(parseFloat(e.target.value) || 0)}
                      placeholder="20"
                      data-testid="input-investment-period"
                    />
                    {errors.investmentPeriod && (
                      <p className="text-sm text-red-500">{errors.investmentPeriod}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="compounding-frequency">Compounding Frequency</Label>
                    <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                      <SelectTrigger data-testid="select-compounding-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(compoundingOptions).map(([key, option]) => (
                          <SelectItem key={key} value={key}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-primary" data-testid="result-future-value">
                          {formatCurrency(futureValue)}
                        </div>
                        <p className="text-sm text-muted-foreground">Future Value</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600" data-testid="result-total-contributions">
                          {formatCurrency(totalContributions)}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Contributions</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600" data-testid="result-total-interest">
                          {formatCurrency(totalInterest)}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Interest Earned</p>
                      </CardContent>
                    </Card>
                  </div>

                  {Object.keys(errors).length === 0 && futureValue > 0 && (
                    <div className="mt-4 space-y-2">
                      <Alert>
                        <AlertDescription>
                          Your investment will grow by {formatCurrency(totalInterest)} over {investmentPeriod} years.
                          Effective compound annual growth rate: {calculateCAGR().toFixed(2)}%
                        </AlertDescription>
                      </Alert>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Initial Investment:</span>
                          <span className="font-semibold">{formatCurrency(initialAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Contributions:</span>
                          <span className="font-semibold">{formatCurrency(monthlyContribution * 12 * investmentPeriod)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Multiplier:</span>
                          <span className="font-semibold">{(futureValue / totalContributions).toFixed(2)}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Compounding:</span>
                          <span className="font-semibold">{compoundingOptions[compoundingFrequency as keyof typeof compoundingOptions].label}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              <h3 className="text-lg font-semibold">Yearly Investment Breakdown</h3>
              
              <div className="grid gap-4">
                {yearlyBreakdown.map((yearData, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Year {yearData.year}</h4>
                        <div className="text-lg font-bold text-primary">
                          {formatCurrency(yearData.endingAmount)}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Starting: </span>
                          <span className="font-medium">{formatCurrency(yearData.startingAmount)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Contributed: </span>
                          <span className="font-medium text-blue-600">{formatCurrency(yearData.contribution)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Interest: </span>
                          <span className="font-medium text-green-600">{formatCurrency(yearData.interest)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="charts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Growth Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={yearlyBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Line 
                          type="monotone" 
                          dataKey="endingAmount" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          name="Investment Value"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Contribution vs Interest Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Annual Contributions vs Interest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={yearlyBreakdown.slice(0, 10)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="contribution" fill="#3B82F6" name="Contributions" />
                        <Bar dataKey="interest" fill="#10B981" name="Interest Earned" />
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

export default InvestmentCalculator;
