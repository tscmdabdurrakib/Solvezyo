import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, DollarSign, Calendar, Percent, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

/**
 * BusinessLoanCalculator Component
 * 
 * Calculate business loan payments, total interest, and analyze repayment schedules
 * for commercial lending scenarios.
 */
export function BusinessLoanCalculator() {
  // State for input values
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanTerm, setLoanTerm] = useState<number>(10);
  const [paymentFrequency, setPaymentFrequency] = useState<string>('monthly');
  
  // State for calculated results
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    loanAmount?: string;
    interestRate?: string;
    loanTerm?: string;
  }>({});

  // Calculate loan when inputs change
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, paymentFrequency]);

  /**
   * Calculate business loan payment using amortization formula
   * Payment = P × [r(1+r)^n] / [(1+r)^n - 1]
   * Where: P = principal, r = periodic rate, n = number of payments
   */
  const calculateLoan = () => {
    // Validate inputs
    const newErrors: {
      loanAmount?: string;
      interestRate?: string;
      loanTerm?: string;
    } = {};
    
    if (loanAmount <= 0) newErrors.loanAmount = "Loan amount must be greater than 0";
    if (interestRate <= 0) newErrors.interestRate = "Interest rate must be greater than 0";
    if (loanTerm <= 0) newErrors.loanTerm = "Loan term must be greater than 0";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Frequency mapping
    const frequencyMap: { [key: string]: number } = {
      weekly: 52,
      biweekly: 26,
      monthly: 12,
      quarterly: 4,
      annually: 1,
    };
    
    const paymentsPerYear = frequencyMap[paymentFrequency];
    
    // Calculate periodic interest rate
    const periodicRate = (interestRate / 100) / paymentsPerYear;
    
    // Total number of payments
    const numPayments = loanTerm * paymentsPerYear;
    setTotalPayments(numPayments);
    
    // Calculate payment using amortization formula
    let payment = 0;
    if (periodicRate === 0) {
      payment = loanAmount / numPayments;
    } else {
      const x = Math.pow(1 + periodicRate, numPayments);
      payment = loanAmount * (periodicRate * x) / (x - 1);
    }
    
    setPaymentAmount(payment);
    
    // Calculate total payment and interest
    const total = payment * numPayments;
    setTotalPayment(total);
    setTotalInterest(total - loanAmount);
  };

  // Function to reset all values
  const handleReset = () => {
    setLoanAmount(100000);
    setInterestRate(7.5);
    setLoanTerm(10);
    setPaymentFrequency('monthly');
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const frequencyLabel = paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1);
    const resultText = `Business Loan Results:
Loan Amount: ${formatCurrency(loanAmount)}
Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years
${frequencyLabel} Payment: ${formatCurrency(paymentAmount)}
Total Payments: ${totalPayments}
Total Amount Paid: ${formatCurrency(totalPayment)}
Total Interest: ${formatCurrency(totalInterest)}`;
    
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
    { name: 'Principal', value: loanAmount, color: '#3B82F6' },
    { name: 'Interest', value: totalInterest, color: '#EF4444' }
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Business Loan Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate payments and total costs for business loans and commercial financing.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Building2 className="mr-2 h-5 w-5" /> Loan Details
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
                value={[loanAmount]}
                max={500000}
                min={1000}
                step={1000}
                onValueChange={(values) => setLoanAmount(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$1K</span>
                <span>$250K</span>
                <span>$500K</span>
              </div>
            </div>

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
                min={1}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1%</span>
                <span>10%</span>
                <span>20%</span>
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
                value={[loanTerm]}
                max={25}
                min={1}
                step={1}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1y</span>
                <span>12y</span>
                <span>25y</span>
              </div>
            </div>

            <Separator />

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
                    <Info className="mr-2 h-5 w-5" /> Loan Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Payment
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(paymentAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {totalPayments} total payments
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Principal</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(loanAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                    <div className="mt-1 text-xl font-bold text-red-600">
                      {formatCurrency(totalInterest)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Paid</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(totalPayment)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Pie Chart */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Breakdown</h2>
            <div className="h-80">
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
            </div>
          </Card>

          {/* Information Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Business Loan Guide
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">What is a Business Loan?</h3>
                <p>
                  A business loan provides capital for commercial purposes such as expansion, equipment purchases, 
                  inventory, or working capital. Terms and rates vary based on business credit and loan type.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Interest Rates</h3>
                <p>
                  Business loan rates typically range from 3% to 20% depending on creditworthiness, collateral, 
                  loan amount, and term length. SBA loans often offer lower rates than traditional bank loans.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Planning Tips</h3>
                <p>
                  Consider cash flow carefully before committing to a loan. Ensure your business can comfortably 
                  afford the payments while maintaining operations and emergency reserves.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BusinessLoanCalculator;
