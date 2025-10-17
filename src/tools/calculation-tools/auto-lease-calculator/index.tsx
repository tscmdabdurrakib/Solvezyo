import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Info, DollarSign, Percent, RefreshCw, Copy, Check, Car } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AutoLeaseCalculator Component
 * 
 * Calculate monthly auto lease payments and total lease cost.
 */
export function AutoLeaseCalculator() {
  const [msrp, setMsrp] = useState<number>(35000);
  const [negotiatedPrice, setNegotiatedPrice] = useState<number>(33000);
  const [residualValue, setResidualValue] = useState<number>(20000);
  const [leaseTerm, setLeaseTerm] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [downPayment, setDownPayment] = useState<number>(2000);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(7);
  const [acquisitionFee, setAcquisitionFee] = useState<number>(650);
  
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalLeaseCost, setTotalLeaseCost] = useState<number>(0);
  const [totalDepreciation, setTotalDepreciation] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    calculateLease();
  }, [msrp, negotiatedPrice, residualValue, leaseTerm, interestRate, downPayment, tradeInValue, salesTaxRate, acquisitionFee]);

  const calculateLease = () => {
    const newErrors: Record<string, string> = {};
    
    if (negotiatedPrice <= 0) newErrors.negotiatedPrice = "Price must be greater than 0";
    if (residualValue < 0) newErrors.residualValue = "Residual value cannot be negative";
    if (leaseTerm <= 0) newErrors.leaseTerm = "Lease term must be greater than 0";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    // Calculate net capitalized cost
    const netCapCost = negotiatedPrice - downPayment - tradeInValue + acquisitionFee;
    
    // Calculate depreciation
    const depreciation = netCapCost - residualValue;
    const monthlyDepreciation = depreciation / leaseTerm;
    
    // Calculate finance charge (money factor method)
    const moneyFactor = (interestRate / 100) / 24;
    const monthlyFinanceCharge = (netCapCost + residualValue) * moneyFactor;
    
    // Base monthly payment (before tax)
    const baseMonthlyPayment = monthlyDepreciation + monthlyFinanceCharge;
    
    // Add sales tax
    const taxAmount = baseMonthlyPayment * (salesTaxRate / 100);
    const monthlyPaymentWithTax = baseMonthlyPayment + taxAmount;
    
    // Total lease cost
    const totalCost = (monthlyPaymentWithTax * leaseTerm) + downPayment;
    
    setMonthlyPayment(monthlyPaymentWithTax);
    setTotalLeaseCost(totalCost);
    setTotalDepreciation(depreciation);
  };

  const handleReset = () => {
    setMsrp(35000);
    setNegotiatedPrice(33000);
    setResidualValue(20000);
    setLeaseTerm(36);
    setInterestRate(4.5);
    setDownPayment(2000);
    setTradeInValue(0);
    setSalesTaxRate(7);
    setAcquisitionFee(650);
    setErrors({});
  };

  const handleCopy = () => {
    const resultText = `Auto Lease Calculator Results:
MSRP: ${formatCurrency(msrp)}
Negotiated Price: ${formatCurrency(negotiatedPrice)}
Down Payment: ${formatCurrency(downPayment)}
Lease Term: ${leaseTerm} months
Monthly Payment: ${formatCurrency(monthlyPayment)}
Total Lease Cost: ${formatCurrency(totalLeaseCost)}`;
    
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
        <h1 className="text-3xl font-bold tracking-tight">Auto Lease Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your monthly auto lease payments and total lease costs.
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
              <div className="flex justify-between">
                <Label htmlFor="negotiatedPrice">Negotiated Selling Price</Label>
                {errors.negotiatedPrice && <span className="text-sm text-red-500">{errors.negotiatedPrice}</span>}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="negotiatedPrice"
                  type="number"
                  className="pl-10"
                  value={negotiatedPrice}
                  onChange={(e) => setNegotiatedPrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[negotiatedPrice]}
                max={msrp}
                min={10000}
                step={500}
                onValueChange={(values) => setNegotiatedPrice(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="residualValue">Residual Value (End of Lease)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="residualValue"
                  type="number"
                  className="pl-10"
                  value={residualValue}
                  onChange={(e) => setResidualValue(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[residualValue]}
                max={negotiatedPrice}
                min={5000}
                step={500}
                onValueChange={(values) => setResidualValue(values[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Typically {((residualValue / msrp) * 100).toFixed(0)}% of MSRP
              </p>
            </div>

            <Separator />

            <div>
              <Label htmlFor="leaseTerm">Lease Term (Months)</Label>
              <Input
                id="leaseTerm"
                type="number"
                className="mt-1.5"
                value={leaseTerm}
                onChange={(e) => setLeaseTerm(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[leaseTerm]}
                max={60}
                min={24}
                step={6}
                onValueChange={(values) => setLeaseTerm(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="interestRate">Interest Rate (APR) %</Label>
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
                min={0}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
            </div>

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
              <Slider
                className="mt-2"
                value={[downPayment]}
                max={10000}
                min={0}
                step={500}
                onValueChange={(values) => setDownPayment(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="tradeInValue">Trade-In Value</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="tradeInValue"
                  type="number"
                  className="pl-10"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[tradeInValue]}
                max={20000}
                min={0}
                step={500}
                onValueChange={(values) => setTradeInValue(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="salesTaxRate">Sales Tax Rate %</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="salesTaxRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={salesTaxRate}
                  onChange={(e) => setSalesTaxRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[salesTaxRate]}
                max={12}
                min={0}
                step={0.1}
                onValueChange={(values) => setSalesTaxRate(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="acquisitionFee">Acquisition Fee</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="acquisitionFee"
                  type="number"
                  className="pl-10"
                  value={acquisitionFee}
                  onChange={(e) => setAcquisitionFee(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[acquisitionFee]}
                max={1500}
                min={0}
                step={50}
                onValueChange={(values) => setAcquisitionFee(values[0])}
              />
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
                    <Info className="mr-2 h-5 w-5" /> Lease Payment
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary">
                    <h3 className="text-sm font-medium text-muted-foreground">Estimated Monthly Payment</h3>
                    <div className="mt-2 text-4xl font-bold">
                      {formatCurrency(monthlyPayment)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      For {leaseTerm} months
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Total Lease Cost</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {formatCurrency(totalLeaseCost)}
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Total Depreciation</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {formatCurrency(totalDepreciation)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Leasing Guide</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">What is Residual Value?</h3>
                <p className="text-muted-foreground text-sm">
                  The estimated value of the vehicle at the end of the lease term. Higher residual values 
                  result in lower monthly payments since you're paying for less depreciation.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Money Factor vs APR</h3>
                <p className="text-muted-foreground text-sm">
                  Lease interest rates are expressed as "money factor." To convert APR to money factor, 
                  divide by 2400. Example: 4.8% APR = 0.002 money factor.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Capitalized Cost Reduction</h3>
                <p className="text-muted-foreground text-sm">
                  Any down payment or trade-in value reduces your capitalized cost (the amount being 
                  financed). This lowers your monthly payment.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Mileage Allowance</h3>
                <p className="text-muted-foreground text-sm">
                  Most leases include 10,000-15,000 miles per year. Exceeding this limit results in 
                  additional charges (typically $0.15-$0.30 per mile) at lease end.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AutoLeaseCalculator;
