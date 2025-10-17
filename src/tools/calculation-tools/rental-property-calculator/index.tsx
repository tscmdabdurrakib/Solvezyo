import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Percent, TrendingUp, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * RentalPropertyCalculator Component
 * 
 * Calculate cash flow and ROI for rental property investments
 */
export function RentalPropertyCalculator() {
  const { toast } = useToast();

  // Input states
  const [propertyPrice, setPropertyPrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [monthlyRent, setMonthlyRent] = useState<number>(2500);
  const [vacancy, setVacancy] = useState<number>(5);
  const [propertyTax, setPropertyTax] = useState<number>(3000);
  const [insurance, setInsurance] = useState<number>(1200);
  const [maintenance, setMaintenance] = useState<number>(2400);
  const [propertyManagement, setPropertyManagement] = useState<number>(10);

  // Calculated results
  const [monthlyMortgage, setMonthlyMortgage] = useState<number>(0);
  const [monthlyCashFlow, setMonthlyCashFlow] = useState<number>(0);
  const [annualCashFlow, setAnnualCashFlow] = useState<number>(0);
  const [cashOnCashReturn, setCashOnCashReturn] = useState<number>(0);
  const [capRate, setCapRate] = useState<number>(0);

  useEffect(() => {
    calculateRentalProperty();
  }, [propertyPrice, downPayment, interestRate, loanTerm, monthlyRent, vacancy, propertyTax, insurance, maintenance, propertyManagement]);

  const calculateRentalProperty = () => {
    // Calculate mortgage payment
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    
    let mortgage = 0;
    if (monthlyRate === 0) {
      mortgage = principal / payments;
    } else {
      const x = Math.pow(1 + monthlyRate, payments);
      mortgage = (principal * monthlyRate * x) / (x - 1);
    }

    // Calculate monthly income (accounting for vacancy)
    const effectiveMonthlyRent = monthlyRent * (1 - vacancy / 100);
    
    // Calculate monthly expenses
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyMaintenance = maintenance / 12;
    const monthlyPropertyMgmt = effectiveMonthlyRent * (propertyManagement / 100);
    const totalMonthlyExpenses = mortgage + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + monthlyPropertyMgmt;
    
    // Calculate cash flow
    const cashFlow = effectiveMonthlyRent - totalMonthlyExpenses;
    const annualFlow = cashFlow * 12;
    
    // Calculate Cash-on-Cash Return: (Annual Cash Flow / Total Cash Invested) * 100
    const totalCashInvested = downPayment;
    const cocReturn = totalCashInvested > 0 ? (annualFlow / totalCashInvested) * 100 : 0;
    
    // Calculate Cap Rate: (Net Operating Income / Property Price) * 100
    const annualIncome = monthlyRent * 12 * (1 - vacancy / 100);
    const annualExpenses = (propertyTax + insurance + maintenance + (annualIncome * propertyManagement / 100));
    const noi = annualIncome - annualExpenses;
    const capRateCalc = (noi / propertyPrice) * 100;
    
    setMonthlyMortgage(mortgage);
    setMonthlyCashFlow(cashFlow);
    setAnnualCashFlow(annualFlow);
    setCashOnCashReturn(cocReturn);
    setCapRate(capRateCalc);
  };

  const handleReset = () => {
    setPropertyPrice(300000);
    setDownPayment(60000);
    setInterestRate(5.5);
    setLoanTerm(30);
    setMonthlyRent(2500);
    setVacancy(5);
    setPropertyTax(3000);
    setInsurance(1200);
    setMaintenance(2400);
    setPropertyManagement(10);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const copyToClipboard = () => {
    const result = `Rental Property Analysis:
Property Price: ${formatCurrency(propertyPrice)}
Down Payment: ${formatCurrency(downPayment)}
Monthly Rent: ${formatCurrency(monthlyRent)}
Monthly Cash Flow: ${formatCurrency(monthlyCashFlow)}
Annual Cash Flow: ${formatCurrency(annualCashFlow)}
Cash-on-Cash Return: ${cashOnCashReturn.toFixed(2)}%
Cap Rate: ${capRate.toFixed(2)}%`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Rental Property Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Analyze rental property cash flow and return on investment
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Home className="mr-2 h-5 w-5" /> Property Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="price">Property Price</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  className="pl-10"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[propertyPrice]}
                max={1000000}
                step={5000}
                onValueChange={(values) => setPropertyPrice(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="down">Down Payment</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="down"
                  type="number"
                  className="pl-10"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[downPayment]}
                max={propertyPrice}
                step={1000}
                onValueChange={(values) => setDownPayment(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="rate"
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
                max={12}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="term">Loan Term (years)</Label>
              <Input
                id="term"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="rent">Monthly Rent</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="rent"
                  type="number"
                  className="pl-10"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="vacancy">Vacancy Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="vacancy"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={vacancy}
                  onChange={(e) => setVacancy(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tax">Annual Property Tax</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="tax"
                  type="number"
                  className="pl-10"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="insurance">Annual Insurance</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="insurance"
                  type="number"
                  className="pl-10"
                  value={insurance}
                  onChange={(e) => setInsurance(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="maintenance">Annual Maintenance</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="maintenance"
                  type="number"
                  className="pl-10"
                  value={maintenance}
                  onChange={(e) => setMaintenance(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="mgmt">Property Management (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="mgmt"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={propertyManagement}
                  onChange={(e) => setPropertyManagement(Number(e.target.value))}
                />
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Investment Analysis</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Mortgage</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(monthlyMortgage)}
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${monthlyCashFlow >= 0 
                    ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'}`}>
                    <h3 className={`text-sm font-medium ${monthlyCashFlow >= 0 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'}`}>
                      Monthly Cash Flow
                    </h3>
                    <div className={`mt-1 text-2xl font-bold ${monthlyCashFlow >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(monthlyCashFlow)}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Annual Cash Flow</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(annualCashFlow)}
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Cash-on-Cash Return</h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {cashOnCashReturn.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800 md:col-span-2">
                    <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">Capitalization Rate (Cap Rate)</h3>
                    <div className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {capRate.toFixed(2)}%
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      Net Operating Income / Property Value
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Investment Insights</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• A good cash-on-cash return is typically 8-12% for rental properties</p>
              <p>• Cap rates vary by location; 4-10% is common for residential rentals</p>
              <p>• The "1% rule": monthly rent should be at least 1% of purchase price</p>
              <p>• Factor in appreciation, tax benefits, and loan paydown for total ROI</p>
              <p>• Consider vacancy rates - 5-10% is typical for most markets</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RentalPropertyCalculator;
