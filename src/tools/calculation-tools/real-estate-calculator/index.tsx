import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Home, DollarSign, Percent, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RealEstateCalculator Component
 * 
 * Calculate real estate investment returns including rental income, expenses,
 * cash flow, ROI, and cap rate for property investment analysis.
 */
export function RealEstateCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [monthlyRent, setMonthlyRent] = useState<number>(2500);
  const [propertyTax, setPropertyTax] = useState<number>(300);
  const [insurance, setInsurance] = useState<number>(150);
  const [maintenance, setMaintenance] = useState<number>(200);
  const [vacancyRate, setVacancyRate] = useState<number>(5);
  
  const [monthlyMortgage, setMonthlyMortgage] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [monthlyCashFlow, setMonthlyCashFlow] = useState<number>(0);
  const [annualCashFlow, setAnnualCashFlow] = useState<number>(0);
  const [cashOnCashReturn, setCashOnCashReturn] = useState<number>(0);
  const [capRate, setCapRate] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateRealEstate();
  }, [purchasePrice, downPayment, interestRate, loanTerm, monthlyRent, propertyTax, insurance, maintenance, vacancyRate]);

  const calculateRealEstate = () => {
    const loanAmount = purchasePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    // Calculate monthly mortgage payment
    let mortgage = 0;
    if (monthlyRate === 0) {
      mortgage = loanAmount / numPayments;
    } else {
      const x = Math.pow(1 + monthlyRate, numPayments);
      mortgage = (loanAmount * monthlyRate * x) / (x - 1);
    }
    setMonthlyMortgage(mortgage);
    
    // Calculate vacancy loss
    const vacancyLoss = monthlyRent * (vacancyRate / 100);
    const effectiveRent = monthlyRent - vacancyLoss;
    
    // Total monthly expenses
    const expenses = mortgage + propertyTax + insurance + maintenance;
    setTotalExpenses(expenses);
    
    // Monthly cash flow
    const cashFlow = effectiveRent - expenses;
    setMonthlyCashFlow(cashFlow);
    
    // Annual cash flow
    const annualCash = cashFlow * 12;
    setAnnualCashFlow(annualCash);
    
    // Cash-on-cash return (annual cash flow / total cash invested)
    const cashReturn = (annualCash / downPayment) * 100;
    setCashOnCashReturn(cashReturn);
    
    // Cap rate (annual NOI / purchase price)
    const annualIncome = monthlyRent * 12;
    const annualExpenses = (propertyTax + insurance + maintenance) * 12;
    const noi = annualIncome - annualExpenses;
    const capRateCalc = (noi / purchasePrice) * 100;
    setCapRate(capRateCalc);
  };

  const handleReset = () => {
    setPurchasePrice(300000);
    setDownPayment(60000);
    setInterestRate(6.5);
    setLoanTerm(30);
    setMonthlyRent(2500);
    setPropertyTax(300);
    setInsurance(150);
    setMaintenance(200);
    setVacancyRate(5);
  };

  const handleCopy = () => {
    const resultText = `Real Estate Investment Analysis:
Purchase Price: ${formatCurrency(purchasePrice)}
Down Payment: ${formatCurrency(downPayment)}
Monthly Rent: ${formatCurrency(monthlyRent)}
Monthly Cash Flow: ${formatCurrency(monthlyCashFlow)}
Annual Cash Flow: ${formatCurrency(annualCashFlow)}
Cash-on-Cash Return: ${cashOnCashReturn.toFixed(2)}%
Cap Rate: ${capRate.toFixed(2)}%`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <h1 className="text-3xl font-bold tracking-tight">Real Estate Investment Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Analyze rental property cash flow, ROI, and investment potential.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Home className="mr-2 h-5 w-5" /> Property Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="purchasePrice"
                  type="number"
                  className="pl-10"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[purchasePrice]}
                max={1000000}
                min={50000}
                step={5000}
                onValueChange={(values) => setPurchasePrice(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="downPayment">Down Payment</Label>
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
                value={[downPayment]}
                max={purchasePrice}
                min={0}
                step={1000}
                onValueChange={(values) => setDownPayment(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
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
                max={12}
                min={2}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <Input
                id="loanTerm"
                type="number"
                className="mt-1.5"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="monthlyRent">Monthly Rent</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="monthlyRent"
                  type="number"
                  className="pl-10"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="propertyTax">Monthly Property Tax</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="propertyTax"
                  type="number"
                  className="pl-10"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="insurance">Monthly Insurance</Label>
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
              <Label htmlFor="maintenance">Monthly Maintenance</Label>
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
              <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="vacancyRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={vacancyRate}
                  onChange={(e) => setVacancyRate(Number(e.target.value))}
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
              key={monthlyCashFlow}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Investment Analysis
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Cash Flow</h3>
                    <div className={`mt-1 text-3xl font-bold ${monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(monthlyCashFlow)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Annual Cash Flow</h3>
                    <div className={`mt-1 text-3xl font-bold ${annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(annualCashFlow)}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Cash-on-Cash Return</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600">
                      {cashOnCashReturn.toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Annual ROI</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Cap Rate</h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600">
                      {capRate.toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Property yield</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Rent:</span>
                    <span className="font-semibold">{formatCurrency(monthlyRent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mortgage Payment:</span>
                    <span className="font-semibold">-{formatCurrency(monthlyMortgage)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Tax:</span>
                    <span className="font-semibold">-{formatCurrency(propertyTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance:</span>
                    <span className="font-semibold">-{formatCurrency(insurance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance:</span>
                    <span className="font-semibold">-{formatCurrency(maintenance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vacancy Loss ({vacancyRate}%):</span>
                    <span className="font-semibold">-{formatCurrency(monthlyRent * (vacancyRate / 100))}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Investment Metrics Explained
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">Cash Flow</h3>
                <p>
                  The amount of money left over after all expenses are paid. Positive cash flow means the property generates income, while negative cash flow requires you to contribute money monthly.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Cash-on-Cash Return</h3>
                <p>
                  Measures annual cash flow relative to the cash invested (down payment). A 10% return means you earn $10,000 annually for every $100,000 invested.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Cap Rate</h3>
                <p>
                  Capitalization rate shows the property's potential return based on net operating income. Higher cap rates generally indicate better investment opportunities, but also higher risk.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RealEstateCalculator;
