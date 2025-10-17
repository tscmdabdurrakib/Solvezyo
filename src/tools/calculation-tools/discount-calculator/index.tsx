import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Percent, RefreshCw, Copy, Check, Info, Tag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DiscountCalculator Component
 * 
 * Calculate discounted prices, savings amounts, and final costs after applying
 * percentage-based or fixed amount discounts.
 */
export function DiscountCalculator() {
  // State for input values
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  
  // State for calculated results
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    originalPrice?: string;
    discountPercent?: string;
    taxPercent?: string;
  }>({});

  // Calculate discount when inputs change
  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, discountPercent, taxPercent]);

  /**
   * Calculate discount and final price
   * Discount Amount = Original Price × (Discount % / 100)
   * Discounted Price = Original Price - Discount Amount
   * Tax Amount = Discounted Price × (Tax % / 100)
   * Final Price = Discounted Price + Tax Amount
   */
  const calculateDiscount = () => {
    // Validate inputs
    const newErrors: {
      originalPrice?: string;
      discountPercent?: string;
      taxPercent?: string;
    } = {};
    
    if (originalPrice <= 0) newErrors.originalPrice = "Price must be greater than 0";
    if (discountPercent < 0 || discountPercent > 100) {
      newErrors.discountPercent = "Discount must be between 0 and 100";
    }
    if (taxPercent < 0 || taxPercent > 100) {
      newErrors.taxPercent = "Tax must be between 0 and 100";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Calculate discount amount
    const discount = originalPrice * (discountPercent / 100);
    setDiscountAmount(discount);
    
    // Calculate discounted price
    const priceAfterDiscount = originalPrice - discount;
    setDiscountedPrice(priceAfterDiscount);
    
    // Calculate savings
    setSavings(discount);
    
    // Calculate tax on discounted price
    const tax = priceAfterDiscount * (taxPercent / 100);
    setTaxAmount(tax);
    
    // Calculate final price (discounted price + tax)
    const final = priceAfterDiscount + tax;
    setFinalPrice(final);
  };

  // Function to reset all values
  const handleReset = () => {
    setOriginalPrice(100);
    setDiscountPercent(20);
    setTaxPercent(0);
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Discount Calculation Results:
Original Price: ${formatCurrency(originalPrice)}
Discount (${discountPercent}%): ${formatCurrency(discountAmount)}
Discounted Price: ${formatCurrency(discountedPrice)}
Tax (${taxPercent}%): ${formatCurrency(taxAmount)}
Final Price: ${formatCurrency(finalPrice)}
Total Savings: ${formatCurrency(savings)}`;
    
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
        <h1 className="text-3xl font-bold tracking-tight">Discount Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate discounted prices, savings, and final costs with taxes.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Tag className="mr-2 h-5 w-5" /> Discount Details
          </h2>
          
          <div className="space-y-6">
            {/* Original Price */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="originalPrice">Original Price</Label>
                {errors.originalPrice && (
                  <span className="text-sm text-red-500">{errors.originalPrice}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  className="pl-10"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[originalPrice]}
                max={1000}
                min={1}
                step={1}
                onValueChange={(values) => setOriginalPrice(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$1</span>
                <span>$500</span>
                <span>$1,000</span>
              </div>
            </div>

            {/* Discount Percent */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="discountPercent">Discount Percentage</Label>
                {errors.discountPercent && (
                  <span className="text-sm text-red-500">{errors.discountPercent}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="discountPercent"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[discountPercent]}
                max={100}
                min={0}
                step={0.5}
                onValueChange={(values) => setDiscountPercent(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <Separator />

            {/* Tax Percent */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="taxPercent">Sales Tax (%) - Optional</Label>
                {errors.taxPercent && (
                  <span className="text-sm text-red-500">{errors.taxPercent}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="taxPercent"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[taxPercent]}
                max={20}
                min={0}
                step={0.1}
                onValueChange={(values) => setTaxPercent(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>10%</span>
                <span>20%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Tax is applied after discount
              </p>
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
              key={finalPrice}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" /> Price Breakdown
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Final Price</h3>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(finalPrice)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {taxPercent > 0 ? 'After discount and tax' : 'After discount'}
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Original Price</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(originalPrice)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">You Save</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(savings)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {discountPercent}% discount
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Original Price:</span>
                    <span className="font-semibold">{formatCurrency(originalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Discount ({discountPercent}%):</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(discountAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Discounted Price:</span>
                    <span className="font-semibold">{formatCurrency(discountedPrice)}</span>
                  </div>
                  {taxPercent > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Sales Tax ({taxPercent}%):</span>
                      <span className="font-semibold">+{formatCurrency(taxAmount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Final Price:</span>
                    <span className="text-xl font-bold text-blue-600">{formatCurrency(finalPrice)}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> How Discounts Work
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">Discount Calculation</h3>
                <p>
                  The discount amount is calculated by multiplying the original price by the discount percentage. 
                  For example, a 20% discount on $100 saves you $20.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Tax Application</h3>
                <p>
                  Sales tax is typically applied after the discount is deducted. This calculator follows this 
                  standard practice, calculating tax on the discounted price rather than the original price.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Shopping Tips</h3>
                <p>
                  Compare discounts between stores by looking at the final price, not just the discount percentage. 
                  A 30% discount on a higher-priced item might still be more expensive than a 20% discount on a 
                  lower-priced alternative.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DiscountCalculator;
