import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, DollarSign, Calendar, Percent, RefreshCw, Copy, Check, TrendingUp, Receipt } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BondCalculator Component
 * 
 * Calculate bond valuation, yield to maturity, and current yield.
 */
export function BondCalculator() {
  // State for input values
  const [faceValue, setFaceValue] = useState<number>(1000);
  const [couponRate, setCouponRate] = useState<number>(5);
  const [yearsToMaturity, setYearsToMaturity] = useState<number>(10);
  const [marketPrice, setMarketPrice] = useState<number>(950);
  const [paymentFrequency, setPaymentFrequency] = useState<string>('semiannually');
  
  // State for calculated results
  const [annualCouponPayment, setAnnualCouponPayment] = useState<number>(0);
  const [totalCouponPayments, setTotalCouponPayments] = useState<number>(0);
  const [currentYield, setCurrentYield] = useState<number>(0);
  const [yieldToMaturity, setYieldToMaturity] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    faceValue?: string;
    couponRate?: string;
    yearsToMaturity?: string;
    marketPrice?: string;
  }>({});

  // Calculate bond metrics when inputs change
  useEffect(() => {
    calculateBond();
  }, [faceValue, couponRate, yearsToMaturity, marketPrice, paymentFrequency]);

  /**
   * Calculate Bond Metrics
   * Annual Coupon Payment = Face Value × Coupon Rate
   * Current Yield = Annual Coupon Payment / Market Price
   * Approximate YTM = [C + (F - P)/n] / [(F + P)/2]
   */
  const calculateBond = () => {
    // Validate inputs
    const newErrors: {
      faceValue?: string;
      couponRate?: string;
      yearsToMaturity?: string;
      marketPrice?: string;
    } = {};
    
    if (faceValue <= 0) newErrors.faceValue = "Face value must be greater than 0";
    if (couponRate < 0) newErrors.couponRate = "Coupon rate cannot be negative";
    if (yearsToMaturity <= 0) newErrors.yearsToMaturity = "Years to maturity must be greater than 0";
    if (marketPrice <= 0) newErrors.marketPrice = "Market price must be greater than 0";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Frequency mapping
    const frequencyMap: { [key: string]: number } = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
    };
    
    const frequency = frequencyMap[paymentFrequency];
    
    // Calculate annual coupon payment
    const annualCoupon = faceValue * (couponRate / 100);
    
    // Calculate total coupon payments over bond life
    const totalCoupons = annualCoupon * yearsToMaturity;
    
    // Calculate current yield
    const currentYieldValue = (annualCoupon / marketPrice) * 100;
    
    // Approximate Yield to Maturity (YTM) formula
    // YTM ≈ [C + (F - P)/n] / [(F + P)/2]
    const C = annualCoupon;
    const F = faceValue;
    const P = marketPrice;
    const n = yearsToMaturity;
    
    const ytmApprox = ((C + (F - P) / n) / ((F + P) / 2)) * 100;
    
    // Calculate total return at maturity
    const totalReturnValue = totalCoupons + (faceValue - marketPrice);
    
    setAnnualCouponPayment(annualCoupon);
    setTotalCouponPayments(totalCoupons);
    setCurrentYield(currentYieldValue);
    setYieldToMaturity(ytmApprox);
    setTotalReturn(totalReturnValue);
  };

  // Function to reset all values
  const handleReset = () => {
    setFaceValue(1000);
    setCouponRate(5);
    setYearsToMaturity(10);
    setMarketPrice(950);
    setPaymentFrequency('semiannually');
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Bond Calculator Results:
Face Value: ${formatCurrency(faceValue)}
Coupon Rate: ${couponRate}%
Market Price: ${formatCurrency(marketPrice)}
Years to Maturity: ${yearsToMaturity}
Annual Coupon Payment: ${formatCurrency(annualCouponPayment)}
Current Yield: ${currentYield.toFixed(2)}%
Yield to Maturity: ${yieldToMaturity.toFixed(2)}%
Total Return at Maturity: ${formatCurrency(totalReturn)}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Bond Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate bond valuation, yields, and total returns for your fixed-income investments.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Receipt className="mr-2 h-5 w-5" /> Bond Details
          </h2>
          
          <div className="space-y-6">
            {/* Face Value */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="faceValue">Face Value (Par Value)</Label>
                {errors.faceValue && (
                  <span className="text-sm text-red-500">{errors.faceValue}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="faceValue"
                  type="number"
                  className="pl-10"
                  value={faceValue}
                  onChange={(e) => setFaceValue(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[faceValue]}
                max={10000}
                min={100}
                step={100}
                onValueChange={(values) => setFaceValue(values[0])}
              />
            </div>

            {/* Coupon Rate */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="couponRate">Annual Coupon Rate (%)</Label>
                {errors.couponRate && (
                  <span className="text-sm text-red-500">{errors.couponRate}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="couponRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={couponRate}
                  onChange={(e) => setCouponRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[couponRate]}
                max={15}
                min={0}
                step={0.1}
                onValueChange={(values) => setCouponRate(values[0])}
              />
            </div>

            <Separator />

            {/* Market Price */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="marketPrice">Current Market Price</Label>
                {errors.marketPrice && (
                  <span className="text-sm text-red-500">{errors.marketPrice}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="marketPrice"
                  type="number"
                  className="pl-10"
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[marketPrice]}
                max={1500}
                min={100}
                step={10}
                onValueChange={(values) => setMarketPrice(values[0])}
              />
            </div>

            {/* Years to Maturity */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="yearsToMaturity">Years to Maturity</Label>
                {errors.yearsToMaturity && (
                  <span className="text-sm text-red-500">{errors.yearsToMaturity}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="yearsToMaturity"
                  type="number"
                  className="pl-10"
                  value={yearsToMaturity}
                  onChange={(e) => setYearsToMaturity(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[yearsToMaturity]}
                max={30}
                min={1}
                step={1}
                onValueChange={(values) => setYearsToMaturity(values[0])}
              />
            </div>

            {/* Payment Frequency */}
            <div>
              <Label htmlFor="paymentFrequency">Coupon Payment Frequency</Label>
              <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="semiannually">Semi-Annually</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
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
          {/* Summary Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={yieldToMaturity}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Bond Analysis
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Annual Coupon Payment</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(annualCouponPayment)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Current Yield</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600">
                      {currentYield.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Yield to Maturity (YTM)</h3>
                    <div className="mt-1 text-3xl font-bold">
                      {yieldToMaturity.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Coupon Payments</h3>
                    <div className="mt-1 text-xl font-bold text-green-600">
                      {formatCurrency(totalCouponPayments)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Return at Maturity</h3>
                    <div className="mt-1 text-xl font-bold text-green-600">
                      {formatCurrency(totalReturn)}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Bond Status</h3>
                      <div className="mt-1 text-xl font-bold">
                        {marketPrice < faceValue ? 'Discount Bond' : marketPrice > faceValue ? 'Premium Bond' : 'Par Bond'}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {marketPrice < faceValue && 'Trading below face value'}
                        {marketPrice > faceValue && 'Trading above face value'}
                        {marketPrice === faceValue && 'Trading at face value'}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Understanding Bonds</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">What is a Bond?</h3>
                <p className="text-muted-foreground text-sm">
                  A bond is a fixed-income investment where an investor loans money to an entity (corporate or 
                  governmental) that borrows the funds for a defined period at a fixed interest rate.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Current Yield vs YTM</h3>
                <p className="text-muted-foreground text-sm">
                  Current yield measures annual income relative to market price. Yield to maturity accounts for 
                  all future coupon payments and the difference between purchase price and face value.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Bond Pricing</h3>
                <p className="text-muted-foreground text-sm">
                  Bond prices move inversely to interest rates. When market rates rise, existing bonds with 
                  lower rates become less valuable. When rates fall, existing bonds increase in value.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Coupon Payments</h3>
                <p className="text-muted-foreground text-sm">
                  Most bonds pay interest semi-annually. The coupon rate is fixed at issuance and determines 
                  your periodic interest payments regardless of market price fluctuations.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BondCalculator;
