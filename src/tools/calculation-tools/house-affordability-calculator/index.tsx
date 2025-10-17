import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { DollarSign, Percent, Calendar, Home, Settings, Wallet, Shield } from 'lucide-react';

export function HouseAffordabilityCalculator() {
  // --- Core Input States ---
  const [grossAnnualIncome, setGrossAnnualIncome] = useState<number>(80000);
  const [totalMonthlyDebt, setTotalMonthlyDebt] = useState<number>(500);
  const [downPayment, setDownPayment] = useState<number>(20000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);

  // --- Advanced Input States ---
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [homeInsurance, setHomeInsurance] = useState<number>(100);
  const [hoaFees, setHoaFees] = useState<number>(0);
  const [pmiRate, setPmiRate] = useState<number>(0.5);

  // --- UI State ---
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // --- Output States ---
  const [maxAffordablePrice, setMaxAffordablePrice] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [dtiRatio, setDtiRatio] = useState<number>(0);

  // --- Calculation Logic ---
  useEffect(() => {
    calculateAffordability();
  }, [
    grossAnnualIncome,
    totalMonthlyDebt,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    homeInsurance,
    hoaFees,
    pmiRate,
  ]);

  const calculateAffordability = () => {
    // --- Constants ---
    const DTI_LIMIT = 0.36; // 36% DTI rule

    // --- Calculations ---
    const monthlyIncome = grossAnnualIncome / 12;
    if (monthlyIncome <= 0) {
      // Reset outputs if income is invalid
      setMaxAffordablePrice(0);
      setMonthlyPayment(0);
      setDtiRatio(0);
      return;
    }

    // Max affordable monthly housing payment based on DTI
    const maxHousingPayment = monthlyIncome * DTI_LIMIT - totalMonthlyDebt;

    if (maxHousingPayment <= 0) {
      setMaxAffordablePrice(0);
      setMonthlyPayment(0);
      setDtiRatio((totalMonthlyDebt / monthlyIncome) * 100);
      return;
    }

    // Other monthly costs (taxes, insurance, etc.)
    // These are percentages of the *future* home price, which we are trying to find.
    // This creates a circular reference, so we need to solve for the home price algebraically.
    
    const monthlyPropertyTaxRate = propertyTaxRate / 100 / 12;
    const monthlyPmiRate = pmiRate / 100 / 12;

    // Monthly interest rate from annual rate
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // This is the tricky part. Let H = Home Price.
    // Loan Amount (P) = H - downPayment
    // Monthly P&I = P * [r(1+r)^n] / [(1+r)^n - 1]
    // Monthly Taxes = H * monthlyPropertyTaxRate
    // Monthly PMI = P * monthlyPmiRate (if down payment < 20%)
    // Total Monthly Payment = P&I + Taxes + Insurance + HOA + PMI
    // We know the max total payment, so we solve for H.

    // Let's simplify by iterating to find the price. It's easier to implement.
    let affordableHomePrice = 0;
    let step = 50000; // Start with large steps
    let maxIterations = 100;

    while (step > 0.01 && maxIterations > 0) {
        let found = false;
        while (!found) {
            const tempPrice = affordableHomePrice + step;
            const loanAmount = tempPrice - downPayment;

            if (loanAmount <= 0) {
                affordableHomePrice = downPayment;
                break;
            }

            const pAndI = calculatePandI(loanAmount, monthlyInterestRate, numberOfPayments);
            const taxes = tempPrice * monthlyPropertyTaxRate;
            const pmi = (downPayment / tempPrice < 0.2) ? loanAmount * monthlyPmiRate : 0;
            
            const totalPayment = pAndI + taxes + homeInsurance + hoaFees + pmi;

            if (totalPayment > maxHousingPayment) {
                found = true; // We've overshot, stop increasing by this step
            } else {
                affordableHomePrice = tempPrice;
            }
        }
        step /= 10; // Decrease step for more precision
        maxIterations--;
    }

    const finalLoanAmount = affordableHomePrice - downPayment;
    const finalPandI = calculatePandI(finalLoanAmount, monthlyInterestRate, numberOfPayments);
    const finalTaxes = affordableHomePrice * monthlyPropertyTaxRate;
    const finalPmi = (downPayment / affordableHomePrice < 0.2 && affordableHomePrice > 0) ? finalLoanAmount * monthlyPmiRate : 0;
    const finalTotalMonthlyPayment = finalPandI + finalTaxes + homeInsurance + hoaFees + finalPmi;

    setMaxAffordablePrice(affordableHomePrice > 0 ? affordableHomePrice : 0);
    setMonthlyPayment(finalTotalMonthlyPayment > 0 ? finalTotalMonthlyPayment : 0);
    setDtiRatio(monthlyIncome > 0 ? ((totalMonthlyDebt + finalTotalMonthlyPayment) / monthlyIncome) * 100 : 0);
  };

  const calculatePandI = (principal: number, monthlyRate: number, payments: number) => {
    if (principal <= 0) return 0;
    if (monthlyRate === 0) return principal / payments;
    
    const x = Math.pow(1 + monthlyRate, payments);
    return (principal * monthlyRate * x) / (x - 1);
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
        <h1 className="text-3xl font-bold tracking-tight">House Affordability Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Estimate the home price you can afford based on your income, debt, and down payment.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Wallet className="mr-2 h-5 w-5" /> Financial Details
            </h2>
            <div className="flex items-center space-x-2">
              <Label htmlFor="advanced-toggle">Advanced</Label>
              <Switch
                id="advanced-toggle"
                checked={showAdvanced}
                onCheckedChange={setShowAdvanced}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Gross Annual Income */}
            <div>
              <Label htmlFor="grossAnnualIncome">Gross Annual Income</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="grossAnnualIncome" type="number" className="pl-10" value={grossAnnualIncome} onChange={(e) => setGrossAnnualIncome(Number(e.target.value))} />
              </div>
            </div>

            {/* Total Monthly Debt */}
            <div>
              <Label htmlFor="totalMonthlyDebt">Total Monthly Debt Payments</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="totalMonthlyDebt" type="number" className="pl-10" value={totalMonthlyDebt} onChange={(e) => setTotalMonthlyDebt(Number(e.target.value))} />
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <Label htmlFor="downPayment">Down Payment Amount</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="downPayment" type="number" className="pl-10" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <Label htmlFor="interestRate">Estimated Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="interestRate" type="number" step="0.1" className="pl-10" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="loanTerm" type="number" className="pl-10" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
              </div>
            </div>

            {/* --- Advanced Fields --- */}
            {showAdvanced && (
              <div className="space-y-6 pt-4 border-t">
                <h3 className="text-lg font-medium flex items-center"><Settings className="mr-2 h-5 w-5" /> Additional Expenses</h3>
                
                {/* Property Tax Rate */}
                <div>
                  <Label htmlFor="propertyTaxRate">Annual Property Tax Rate (%)</Label>
                  <div className="relative mt-1.5">
                    <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="propertyTaxRate" type="number" step="0.01" className="pl-10" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(Number(e.target.value))} />
                  </div>
                </div>

                {/* Homeowner's Insurance */}
                <div>
                  <Label htmlFor="homeInsurance">Monthly Homeowner’s Insurance</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="homeInsurance" type="number" className="pl-10" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} />
                  </div>
                </div>

                {/* HOA Fees */}
                <div>
                  <Label htmlFor="hoaFees">Monthly HOA/Condo Fees</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="hoaFees" type="number" className="pl-10" value={hoaFees} onChange={(e) => setHoaFees(Number(e.target.value))} />
                  </div>
                </div>
                
                {/* PMI Rate */}
                <div>
                  <Label htmlFor="pmiRate">Private Mortgage Insurance (PMI) (% of loan)</Label>
                  <div className="relative mt-1.5">
                    <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="pmiRate" type="number" step="0.01" className="pl-10" value={pmiRate} onChange={(e) => setPmiRate(Number(e.target.value))} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Home className="mr-2 h-5 w-5" /> Affordability Summary
            </h2>
            <div className="text-center bg-muted/30 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-muted-foreground">Maximum Affordable Home Price</h3>
              <div className="mt-2 text-5xl font-bold text-primary">
                {formatCurrency(maxAffordablePrice)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Based on a 36% Debt-to-Income (DTI) ratio.</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Estimated Monthly Payment (PITI)</h3>
                <div className="mt-1 text-2xl font-bold">
                  {formatCurrency(monthlyPayment)}
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Your DTI Ratio</h3>
                <div className="mt-1 text-2xl font-bold">
                  {dtiRatio.toFixed(1)}%
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HouseAffordabilityCalculator;
