import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw, CreditCard, Copy, Check, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CreditCardCalculator Component
 * 
 * Calculate how long it will take to pay off credit card debt and total interest paid
 * based on balance, APR, and monthly payment.
 */
export function CreditCardCalculator() {
  // State for input values
  const [cardBalance, setCardBalance] = useState<number>(5000);
  const [annualAPR, setAnnualAPR] = useState<number>(18.99);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(150);
  const [annualFee, setAnnualFee] = useState<number>(0);
  
  // State for calculated results
  const [monthsToPayoff, setMonthsToPayoff] = useState<number>(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState<number>(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState<number>(0);
  const [payoffDate, setPayoffDate] = useState<string>('');
  const [minimumPayment, setMinimumPayment] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    cardBalance?: string;
    annualAPR?: string;
    monthlyPayment?: string;
  }>({});

  // Calculate credit card payoff when inputs change
  useEffect(() => {
    calculatePayoff();
  }, [cardBalance, annualAPR, monthlyPayment, annualFee]);

  /**
   * Calculate credit card payoff details
   * Uses amortization formula accounting for compound interest
   */
  const calculatePayoff = () => {
    // Validate inputs
    const newErrors: {
      cardBalance?: string;
      annualAPR?: string;
      monthlyPayment?: string;
    } = {};
    
    if (cardBalance <= 0) newErrors.cardBalance = "Balance must be greater than 0";
    if (annualAPR < 0) newErrors.annualAPR = "APR cannot be negative";
    if (monthlyPayment <= 0) newErrors.monthlyPayment = "Payment must be greater than 0";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Calculate monthly interest rate
    const monthlyRate = (annualAPR / 100) / 12;
    
    // Calculate minimum payment (typically 1-3% of balance or $25, whichever is greater)
    const calculatedMinimum = Math.max(cardBalance * 0.02, 25);
    setMinimumPayment(calculatedMinimum);
    
    // Check if monthly payment is enough to cover interest
    const monthlyInterest = cardBalance * monthlyRate;
    if (monthlyPayment <= monthlyInterest) {
      setMonthsToPayoff(999); // Indicates never paid off
      setTotalInterestPaid(999999);
      setTotalAmountPaid(999999);
      setPayoffDate('Never (payment too low)');
      setProjectionData([]);
      return;
    }
    
    // Calculate payoff using amortization
    let balance = cardBalance;
    let totalInterest = 0;
    let months = 0;
    const maxMonths = 600; // 50 years max to prevent infinite loops
    const data = [];
    
    while (balance > 0.01 && months < maxMonths) {
      months++;
      
      // Calculate interest for this month
      const interest = balance * monthlyRate;
      totalInterest += interest;
      
      // Add annual fee if applicable (once per 12 months)
      const feeThisMonth = (annualFee > 0 && months % 12 === 1) ? annualFee / 12 : 0;
      
      // Calculate principal payment
      const principalPayment = monthlyPayment - interest - feeThisMonth;
      
      // Update balance
      balance -= principalPayment;
      
      // Store data for chart (every 3 months for first 2 years, then every 6 months)
      if (months <= 24 && months % 3 === 0) {
        data.push({
          month: `Month ${months}`,
          'Remaining Balance': Math.max(0, balance),
          'Total Interest Paid': totalInterest,
        });
      } else if (months > 24 && months % 6 === 0) {
        data.push({
          month: `Month ${months}`,
          'Remaining Balance': Math.max(0, balance),
          'Total Interest Paid': totalInterest,
        });
      }
    }
    
    // Calculate payoff date
    const today = new Date();
    const payoffDateCalc = new Date(today);
    payoffDateCalc.setMonth(payoffDateCalc.getMonth() + months);
    const payoffString = payoffDateCalc.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const totalPaid = cardBalance + totalInterest + (annualFee * (months / 12));
    
    setMonthsToPayoff(months);
    setTotalInterestPaid(totalInterest);
    setTotalAmountPaid(totalPaid);
    setPayoffDate(payoffString);
    setProjectionData(data);
  };

  // Function to reset all values
  const handleReset = () => {
    setCardBalance(5000);
    setAnnualAPR(18.99);
    setMonthlyPayment(150);
    setAnnualFee(0);
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Credit Card Payoff Results:
Current Balance: ${formatCurrency(cardBalance)}
Monthly Payment: ${formatCurrency(monthlyPayment)}
Months to Payoff: ${monthsToPayoff} months
Payoff Date: ${payoffDate}
Total Interest Paid: ${formatCurrency(totalInterestPaid)}
Total Amount Paid: ${formatCurrency(totalAmountPaid)}`;
    
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
    { name: 'Principal', value: cardBalance, color: '#3B82F6' },
    { name: 'Interest', value: totalInterestPaid, color: '#EF4444' }
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Credit Card Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate how long it will take to pay off your credit card debt and see total interest costs.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5" /> Card Details
          </h2>
          
          <div className="space-y-6">
            {/* Card Balance */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="cardBalance">Current Balance</Label>
                {errors.cardBalance && (
                  <span className="text-sm text-red-500">{errors.cardBalance}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="cardBalance"
                  type="number"
                  className="pl-10"
                  value={cardBalance}
                  onChange={(e) => setCardBalance(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[cardBalance]}
                max={50000}
                min={100}
                step={100}
                onValueChange={(values) => setCardBalance(values[0])}
              />
            </div>

            {/* Annual APR */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="annualAPR">Annual APR (%)</Label>
                {errors.annualAPR && (
                  <span className="text-sm text-red-500">{errors.annualAPR}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="annualAPR"
                  type="number"
                  step="0.01"
                  className="pl-10"
                  value={annualAPR}
                  onChange={(e) => setAnnualAPR(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[annualAPR]}
                max={35}
                min={0}
                step={0.1}
                onValueChange={(values) => setAnnualAPR(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>18% (Avg)</span>
                <span>35%</span>
              </div>
            </div>

            {/* Monthly Payment */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                {errors.monthlyPayment && (
                  <span className="text-sm text-red-500">{errors.monthlyPayment}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="monthlyPayment"
                  type="number"
                  className="pl-10"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[monthlyPayment]}
                max={2000}
                min={25}
                step={5}
                onValueChange={(values) => setMonthlyPayment(values[0])}
              />
              <div className="text-xs text-muted-foreground mt-1">
                Minimum payment: {formatCurrency(minimumPayment)}
              </div>
            </div>

            <Separator />

            {/* Annual Fee */}
            <div>
              <Label htmlFor="annualFee">Annual Fee (optional)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="annualFee"
                  type="number"
                  className="pl-10"
                  value={annualFee}
                  onChange={(e) => setAnnualFee(Number(e.target.value))}
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
          {/* Summary Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={monthsToPayoff}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Payoff Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                {monthsToPayoff >= 999 ? (
                  <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-900 dark:text-red-100">Payment Too Low!</h3>
                      <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                        Your monthly payment is less than or equal to the monthly interest charge. 
                        You need to pay at least {formatCurrency(cardBalance * (annualAPR / 100 / 12) + 1)} per month 
                        to start reducing your balance.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">Time to Payoff</h3>
                        <div className="mt-1 text-2xl font-bold">
                          {monthsToPayoff} months
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {Math.floor(monthsToPayoff / 12)} years, {monthsToPayoff % 12} months
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">Payoff Date</h3>
                        <div className="mt-1 text-lg font-bold">
                          {payoffDate}
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                        <div className="mt-1 text-2xl font-bold text-red-600">
                          {formatCurrency(totalInterestPaid)}
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Amount Paid</h3>
                        <div className="mt-1 text-2xl font-bold">
                          {formatCurrency(totalAmountPaid)}
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="bg-amber-100/40 dark:bg-amber-900/20 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                        Interest as % of Principal
                      </h3>
                      <div className="mt-1 text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {cardBalance > 0 ? ((totalInterestPaid / cardBalance) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Visualization Tabs */}
          {monthsToPayoff < 999 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Payoff Projection</h2>
              
              <Tabs defaultValue="timeline">
                <TabsList className="mb-4">
                  <TabsTrigger value="timeline">Payment Timeline</TabsTrigger>
                  <TabsTrigger value="distribution">Cost Distribution</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line type="monotone" dataKey="Remaining Balance" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Total Interest Paid" stroke="#EF4444" />
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
          )}
        </div>
      </div>

      {/* Information Section */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Credit Card Debt Tips</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">Pay More Than Minimum</h3>
            <p className="text-muted-foreground text-sm">
              Minimum payments keep you in debt longer and cost significantly more in interest. 
              Even small increases in your monthly payment can save thousands of dollars.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Understand APR Impact</h3>
            <p className="text-muted-foreground text-sm">
              Credit card APR is typically much higher than other loans. The average credit card APR 
              is around 19-20%, making it expensive to carry a balance month-to-month.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Consider Balance Transfer</h3>
            <p className="text-muted-foreground text-sm">
              If you have good credit, consider transferring to a 0% APR card. This can help you 
              pay down principal faster without accruing interest during the promotional period.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CreditCardCalculator;
