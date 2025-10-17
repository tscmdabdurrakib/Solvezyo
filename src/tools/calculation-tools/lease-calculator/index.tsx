import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Car, DollarSign, Calendar, Percent, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

export function LeaseCalculator() {
  const [msrp, setMsrp] = useState<number>(35000);
  const [sellingPrice, setSellingPrice] = useState<number>(33000);
  const [residualValue, setResidualValue] = useState<number>(55);
  const [moneyFactor, setMoneyFactor] = useState<number>(0.0025);
  const [leaseTerm, setLeaseTerm] = useState<number>(36);
  const [downPayment, setDownPayment] = useState<number>(3000);
  const [salesTax, setSalesTax] = useState<number>(6.5);
  const [fees, setFees] = useState<number>(595);
  
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [depreciation, setDepreciation] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateLease();
  }, [msrp, sellingPrice, residualValue, moneyFactor, leaseTerm, downPayment, salesTax, fees]);

  const calculateLease = () => {
    // Calculate residual value in dollars
    const residualValueDollars = msrp * (residualValue / 100);
    
    // Calculate depreciation
    const depreciationAmount = sellingPrice - residualValueDollars;
    setDepreciation(depreciationAmount);
    
    // Monthly depreciation
    const monthlyDepreciation = depreciationAmount / leaseTerm;
    
    // Monthly finance charge (interest)
    const monthlyFinanceCharge = (sellingPrice + residualValueDollars) * moneyFactor;
    
    // Base monthly payment (before tax)
    const baseMonthlyPayment = monthlyDepreciation + monthlyFinanceCharge;
    
    // Monthly tax
    const monthlyTax = baseMonthlyPayment * (salesTax / 100);
    
    // Total monthly payment
    const totalMonthlyPayment = baseMonthlyPayment + monthlyTax;
    setMonthlyPayment(totalMonthlyPayment);
    
    // Total lease cost
    const totalLeaseCost = (totalMonthlyPayment * leaseTerm) + downPayment + fees;
    setTotalCost(totalLeaseCost);
  };

  const handleReset = () => {
    setMsrp(35000);
    setSellingPrice(33000);
    setResidualValue(55);
    setMoneyFactor(0.0025);
    setLeaseTerm(36);
    setDownPayment(3000);
    setSalesTax(6.5);
    setFees(595);
  };

  const handleCopy = () => {
    const apr = moneyFactor * 2400;
    const resultText = `Lease Calculator Results:
MSRP: ${formatCurrency(msrp)}
Selling Price: ${formatCurrency(sellingPrice)}
Monthly Payment: ${formatCurrency(monthlyPayment)}
Down Payment: ${formatCurrency(downPayment)}
Lease Term: ${leaseTerm} months
Total Lease Cost: ${formatCurrency(totalCost)}
Residual Value: ${residualValue}%
APR: ${apr.toFixed(2)}%`;
    
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

  // Convert money factor to APR for display
  const aprFromMoneyFactor = moneyFactor * 2400;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Lease Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate monthly lease payments for cars and vehicles.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Car className="mr-2 h-5 w-5" /> Lease Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="msrp">MSRP (Sticker Price)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="msrp"
                  type="number"
                  className="pl-10"
                  value={msrp}
                  onChange={(e) => setMsrp(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[msrp]}
                max={100000}
                min={15000}
                step={1000}
                onValueChange={(values) => setMsrp(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="sellingPrice">Negotiated Selling Price</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="sellingPrice"
                  type="number"
                  className="pl-10"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[sellingPrice]}
                max={msrp}
                min={msrp * 0.7}
                step={500}
                onValueChange={(values) => setSellingPrice(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="residualValue">Residual Value (% of MSRP)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="residualValue"
                  type="number"
                  step="1"
                  className="pl-10"
                  value={residualValue}
                  onChange={(e) => setResidualValue(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[residualValue]}
                max={70}
                min={40}
                step={1}
                onValueChange={(values) => setResidualValue(values[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">
                = {formatCurrency(msrp * (residualValue / 100))}
              </p>
            </div>

            <div>
              <Label htmlFor="moneyFactor">Money Factor</Label>
              <div className="relative mt-1.5">
                <Input
                  id="moneyFactor"
                  type="number"
                  step="0.00001"
                  value={moneyFactor}
                  onChange={(e) => setMoneyFactor(Number(e.target.value))}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Equivalent APR: {aprFromMoneyFactor.toFixed(2)}%
              </p>
            </div>

            <div>
              <Label htmlFor="leaseTerm">Lease Term (months)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="leaseTerm"
                  type="number"
                  className="pl-10"
                  value={leaseTerm}
                  onChange={(e) => setLeaseTerm(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[leaseTerm]}
                max={48}
                min={24}
                step={6}
                onValueChange={(values) => setLeaseTerm(values[0])}
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="downPayment">Down Payment / Cap Reduction</Label>
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
            </div>

            <div>
              <Label htmlFor="salesTax">Sales Tax (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="salesTax"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={salesTax}
                  onChange={(e) => setSalesTax(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="fees">Acquisition & Other Fees</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fees"
                  type="number"
                  className="pl-10"
                  value={fees}
                  onChange={(e) => setFees(Number(e.target.value))}
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
              key={monthlyPayment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Lease Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Monthly Lease Payment</h3>
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(monthlyPayment)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    For {leaseTerm} months
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Due at Signing</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(downPayment + fees)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Down payment + fees</p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Lease Cost</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(totalCost)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">All payments + down</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MSRP:</span>
                    <span className="font-semibold">{formatCurrency(msrp)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Negotiated Price:</span>
                    <span className="font-semibold">{formatCurrency(sellingPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Residual Value ({residualValue}%):</span>
                    <span className="font-semibold">{formatCurrency(msrp * (residualValue / 100))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Depreciation:</span>
                    <span className="font-semibold text-red-600">{formatCurrency(depreciation)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Money Factor (APR {aprFromMoneyFactor.toFixed(2)}%):</span>
                    <span className="font-semibold">{moneyFactor.toFixed(5)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sales Tax ({salesTax}%):</span>
                    <span className="font-semibold">Applied monthly</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Leasing Guide
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">How Leasing Works</h3>
                <p>
                  A lease is essentially renting a vehicle for a set period. You pay for the depreciation during the lease term, 
                  plus interest (money factor) and fees. At lease end, you return the car or buy it at the residual value.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Money Factor vs APR</h3>
                <p>
                  Money factor is how lease interest is expressed. To convert to APR, multiply by 2,400. 
                  For example, a money factor of 0.0025 equals 6% APR. Lower is better.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Residual Value</h3>
                <p>
                  The residual value is the projected worth of the car at lease end. Higher residual values mean lower 
                  monthly payments since you're paying for less depreciation. Luxury brands often have better residuals.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Important Considerations</h3>
                <p>
                  Watch for mileage limits (typically 10-15k miles/year), excess wear charges, and early termination fees. 
                  Consider gap insurance to cover the difference between insurance payout and lease balance if the car is totaled.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LeaseCalculator;
