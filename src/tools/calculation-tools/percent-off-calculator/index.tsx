import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Percent, Tag, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PercentOffCalculator Component
 * 
 * Calculate discount prices and savings from percentage off
 */
export function PercentOffCalculator() {
  const { toast } = useToast();

  // State for input values
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [percentOff, setPercentOff] = useState<number>(25);
  
  // State for calculated results
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  // Calculate discount when inputs change
  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, percentOff]);

  // Function to calculate discount
  const calculateDiscount = () => {
    // Discount Amount = Original Price × (Percent Off / 100)
    const discount = originalPrice * (percentOff / 100);
    const final = originalPrice - discount;
    
    setDiscountAmount(discount);
    setFinalPrice(final);
  };

  // Function to reset all values
  const handleReset = () => {
    setOriginalPrice(100);
    setPercentOff(25);
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

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Discount Calculation:
Original Price: ${formatCurrency(originalPrice)}
Percent Off: ${percentOff}%
Discount Amount: ${formatCurrency(discountAmount)}
Final Price: ${formatCurrency(finalPrice)}
You Save: ${formatCurrency(discountAmount)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Percent Off Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate discount prices and savings from percentage off
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Tag className="mr-2 h-5 w-5" /> Discount Details
          </h2>
          
          <div className="space-y-6">
            {/* Original Price */}
            <div>
              <Label htmlFor="originalPrice">Original Price</Label>
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
                max={10000}
                step={1}
                onValueChange={(values) => setOriginalPrice(values[0])}
              />
            </div>

            {/* Percent Off */}
            <div>
              <Label htmlFor="percentOff">Percent Off (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="percentOff"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={percentOff}
                  onChange={(e) => setPercentOff(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[percentOff]}
                max={100}
                step={1}
                onValueChange={(values) => setPercentOff(values[0])}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Discount Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200 flex items-center">
                      <TrendingDown className="mr-2 h-4 w-4" />
                      Final Price
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(finalPrice)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Original Price</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(originalPrice)}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">You Save</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(discountAmount)}
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {percentOff}% discount
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">Savings Percentage</h3>
                        <div className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {percentOff}%
                        </div>
                      </div>
                      <Tag className="h-12 w-12 text-orange-400 dark:text-orange-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Percent Off</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Percent off shows the discount as a percentage of the original price
              </p>
              <p>
                • Common sale percentages: 10%, 20%, 25%, 50% off
              </p>
              <p>
                • Multiple discounts should be applied sequentially, not added together
              </p>
              <p>
                • Final price = Original price × (1 - Percent off / 100)
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PercentOffCalculator;
