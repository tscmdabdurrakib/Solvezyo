import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator, DollarSign, RefreshCw, Copy, Check, Info, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DebtToIncomeRatioCalculator Component
 * 
 * Calculate debt-to-income (DTI) ratio to assess financial health and
 * mortgage/loan qualification eligibility.
 */
export function DebtToIncomeRatioCalculator() {
  // State for input values
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000);
  const [mortgagePayment, setMortgagePayment] = useState<number>(1200);
  const [carPayment, setCarPayment] = useState<number>(400);
  const [creditCardPayment, setCreditCardPayment] = useState<number>(150);
  const [studentLoanPayment, setStudentLoanPayment] = useState<number>(300);
  const [otherDebts, setOtherDebts] = useState<number>(0);
  
  // State for calculated results
  const [totalMonthlyDebt, setTotalMonthlyDebt] = useState<number>(0);
  const [dtiRatio, setDtiRatio] = useState<number>(0);
  const [frontEndRatio, setFrontEndRatio] = useState<number>(0);
  const [backEndRatio, setBackEndRatio] = useState<number>(0);
  const [qualification, setQualification] = useState<string>('');
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    monthlyIncome?: string;
  }>({});

  // Calculate DTI when inputs change
  useEffect(() => {
    calculateDTI();
  }, [monthlyIncome, mortgagePayment, carPayment, creditCardPayment, studentLoanPayment, otherDebts]);

  /**
   * Calculate Debt-to-Income Ratio
   * DTI = (Total Monthly Debt Payments / Gross Monthly Income) × 100
   * Front-end ratio = (Housing costs / Income) × 100
   * Back-end ratio = (All debts / Income) × 100
   */
  const calculateDTI = () => {
    // Validate inputs
    const newErrors: {
      monthlyIncome?: string;
    } = {};
    
    if (monthlyIncome <= 0) newErrors.monthlyIncome = "Monthly income must be greater than 0";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Calculate total monthly debt
    const totalDebt = mortgagePayment + carPayment + creditCardPayment + studentLoanPayment + otherDebts;
    setTotalMonthlyDebt(totalDebt);
    
    // Calculate DTI ratio (back-end ratio)
    const dti = (totalDebt / monthlyIncome) * 100;
    setDtiRatio(dti);
    setBackEndRatio(dti);
    
    // Calculate front-end ratio (housing only)
    const frontEnd = (mortgagePayment / monthlyIncome) * 100;
    setFrontEndRatio(frontEnd);
    
    // Determine qualification status
    if (dti <= 36) {
      setQualification('Excellent - Easily qualifies for most loans');
    } else if (dti <= 43) {
      setQualification('Good - Qualifies for most conventional loans');
    } else if (dti <= 50) {
      setQualification('Fair - May qualify with compensating factors');
    } else {
      setQualification('Poor - Likely to have difficulty qualifying');
    }
  };

  // Function to reset all values
  const handleReset = () => {
    setMonthlyIncome(5000);
    setMortgagePayment(1200);
    setCarPayment(400);
    setCreditCardPayment(150);
    setStudentLoanPayment(300);
    setOtherDebts(0);
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Debt-to-Income Ratio Results:
Monthly Income: ${formatCurrency(monthlyIncome)}
Total Monthly Debt: ${formatCurrency(totalMonthlyDebt)}
DTI Ratio: ${dtiRatio.toFixed(2)}%
Front-End Ratio: ${frontEndRatio.toFixed(2)}%
Back-End Ratio: ${backEndRatio.toFixed(2)}%
Qualification: ${qualification}`;
    
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

  // Get status color
  const getStatusColor = () => {
    if (dtiRatio <= 36) return 'text-green-600';
    if (dtiRatio <= 43) return 'text-blue-600';
    if (dtiRatio <= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Debt-to-Income Ratio Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your DTI ratio to assess loan eligibility and financial health.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Income & Debts
          </h2>
          
          <div className="space-y-6">
            {/* Monthly Income */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="monthlyIncome">Gross Monthly Income</Label>
                {errors.monthlyIncome && (
                  <span className="text-sm text-red-500">{errors.monthlyIncome}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="monthlyIncome"
                  type="number"
                  className="pl-10"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[monthlyIncome]}
                max={20000}
                min={1000}
                step={100}
                onValueChange={(values) => setMonthlyIncome(values[0])}
              />
            </div>

            <Separator />
            <p className="text-sm font-medium">Monthly Debt Payments</p>

            {/* Mortgage/Rent Payment */}
            <div>
              <Label htmlFor="mortgagePayment">Mortgage/Rent Payment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="mortgagePayment"
                  type="number"
                  className="pl-10"
                  value={mortgagePayment}
                  onChange={(e) => setMortgagePayment(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Car Payment */}
            <div>
              <Label htmlFor="carPayment">Car Loan Payment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="carPayment"
                  type="number"
                  className="pl-10"
                  value={carPayment}
                  onChange={(e) => setCarPayment(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Credit Card Payment */}
            <div>
              <Label htmlFor="creditCardPayment">Credit Card Payment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="creditCardPayment"
                  type="number"
                  className="pl-10"
                  value={creditCardPayment}
                  onChange={(e) => setCreditCardPayment(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Student Loan Payment */}
            <div>
              <Label htmlFor="studentLoanPayment">Student Loan Payment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="studentLoanPayment"
                  type="number"
                  className="pl-10"
                  value={studentLoanPayment}
                  onChange={(e) => setStudentLoanPayment(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Other Debts */}
            <div>
              <Label htmlFor="otherDebts">Other Monthly Debts</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="otherDebts"
                  type="number"
                  className="pl-10"
                  value={otherDebts}
                  onChange={(e) => setOtherDebts(Number(e.target.value))}
                />
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={dtiRatio}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> DTI Analysis
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Debt-to-Income Ratio</h3>
                  <div className={`text-5xl font-bold ${getStatusColor()}`}>
                    {dtiRatio.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {qualification}
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Front-End Ratio</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {frontEndRatio.toFixed(1)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Housing costs only</p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Back-End Ratio</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {backEndRatio.toFixed(1)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">All debt payments</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Income</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(monthlyIncome)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Monthly Debt</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(totalMonthlyDebt)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* DTI Guidelines Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">DTI Ratio Guidelines</h2>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <div className="flex-1">
                  <p className="font-medium text-green-700 dark:text-green-400">36% or less</p>
                  <p className="text-sm text-muted-foreground">Excellent - Best loan terms available</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="flex-1">
                  <p className="font-medium text-blue-700 dark:text-blue-400">37% - 43%</p>
                  <p className="text-sm text-muted-foreground">Good - Qualifies for conventional loans</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <div className="flex-1">
                  <p className="font-medium text-yellow-700 dark:text-yellow-400">44% - 50%</p>
                  <p className="text-sm text-muted-foreground">Fair - Limited options, may need FHA</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                <div className="flex-1">
                  <p className="font-medium text-red-700 dark:text-red-400">Above 50%</p>
                  <p className="text-sm text-muted-foreground">Poor - Difficulty qualifying for loans</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Information Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Understanding DTI
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">What is DTI?</h3>
                <p>
                  Debt-to-Income ratio compares your total monthly debt payments to your gross monthly income. 
                  Lenders use this to assess your ability to manage monthly payments and repay debts.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Front-End vs Back-End</h3>
                <p>
                  Front-end ratio considers only housing costs (mortgage, insurance, taxes). Back-end ratio 
                  includes all monthly debt obligations. Most lenders focus on the back-end ratio.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Improving Your DTI</h3>
                <p>
                  Lower your DTI by paying off debts, increasing income, or avoiding new debt. Even small 
                  improvements can significantly impact loan approval chances and interest rates.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DebtToIncomeRatioCalculator;
