import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Percent, RefreshCw, Copy, Check, Info, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MarginCalculator Component
 * 
 * Calculate profit margin, markup, and break-even point for products or services.
 * Supports gross margin, markup percentage, and revenue calculations.
 */
export function MarginCalculator() {
  // State for input values
  const [cost, setCost] = useState<number>(50);
  const [sellingPrice, setSellingPrice] = useState<number>(100);
  const [calculationMode, setCalculationMode] = useState<string>('price'); // 'price', 'margin', 'markup'
  const [targetMargin, setTargetMargin] = useState<number>(50);
  const [targetMarkup, setTargetMarkup] = useState<number>(100);
  
  // State for calculated results
  const [profit, setProfit] = useState<number>(0);
  const [marginPercent, setMarginPercent] = useState<number>(0);
  const [markupPercent, setMarkupPercent] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    cost?: string;
    sellingPrice?: string;
    targetMargin?: string;
    targetMarkup?: string;
  }>({});

  // Calculate margins when inputs change
  useEffect(() => {
    calculateMargins();
  }, [cost, sellingPrice, calculationMode, targetMargin, targetMarkup]);

  /**
   * Calculate profit margin and markup
   * Profit = Selling Price - Cost
   * Margin % = (Profit / Selling Price) × 100
   * Markup % = (Profit / Cost) × 100
   */
  const calculateMargins = () => {
    // Validate inputs
    const newErrors: {
      cost?: string;
      sellingPrice?: string;
      targetMargin?: string;
      targetMarkup?: string;
    } = {};
    
    if (cost <= 0) newErrors.cost = "Cost must be greater than 0";
    if (calculationMode === 'price' && sellingPrice <= 0) {
      newErrors.sellingPrice = "Selling price must be greater than 0";
    }
    if (calculationMode === 'margin' && (targetMargin < 0 || targetMargin >= 100)) {
      newErrors.targetMargin = "Margin must be between 0 and 100";
    }
    if (calculationMode === 'markup' && targetMarkup < 0) {
      newErrors.targetMarkup = "Markup must be greater than 0";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    let finalSellingPrice = sellingPrice;
    
    // Calculate selling price based on mode
    if (calculationMode === 'margin') {
      // Selling Price = Cost / (1 - Margin%)
      finalSellingPrice = cost / (1 - targetMargin / 100);
      setSellingPrice(finalSellingPrice);
    } else if (calculationMode === 'markup') {
      // Selling Price = Cost × (1 + Markup%)
      finalSellingPrice = cost * (1 + targetMarkup / 100);
      setSellingPrice(finalSellingPrice);
    }
    
    // Calculate profit
    const profitAmount = finalSellingPrice - cost;
    setProfit(profitAmount);
    
    // Calculate margin percentage
    // Margin = (Profit / Selling Price) × 100
    const margin = (profitAmount / finalSellingPrice) * 100;
    setMarginPercent(margin);
    
    // Calculate markup percentage
    // Markup = (Profit / Cost) × 100
    const markup = (profitAmount / cost) * 100;
    setMarkupPercent(markup);
  };

  // Function to reset all values
  const handleReset = () => {
    setCost(50);
    setSellingPrice(100);
    setCalculationMode('price');
    setTargetMargin(50);
    setTargetMarkup(100);
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Margin Calculation Results:
Cost: ${formatCurrency(cost)}
Selling Price: ${formatCurrency(sellingPrice)}
Profit: ${formatCurrency(profit)}
Profit Margin: ${marginPercent.toFixed(2)}%
Markup: ${markupPercent.toFixed(2)}%`;
    
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
        <h1 className="text-3xl font-bold tracking-tight">Margin Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate profit margins, markup percentages, and optimize your pricing strategy.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Pricing Details
          </h2>
          
          <div className="space-y-6">
            {/* Calculation Mode */}
            <div>
              <Label htmlFor="calculationMode">Calculation Mode</Label>
              <Select value={calculationMode} onValueChange={setCalculationMode}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Find Margin from Price</SelectItem>
                  <SelectItem value="margin">Find Price from Margin</SelectItem>
                  <SelectItem value="markup">Find Price from Markup</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Cost */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="cost">Cost (COGS)</Label>
                {errors.cost && (
                  <span className="text-sm text-red-500">{errors.cost}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  className="pl-10"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[cost]}
                max={1000}
                min={1}
                step={1}
                onValueChange={(values) => setCost(values[0])}
              />
            </div>

            {/* Conditional inputs based on mode */}
            {calculationMode === 'price' && (
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="sellingPrice">Selling Price</Label>
                  {errors.sellingPrice && (
                    <span className="text-sm text-red-500">{errors.sellingPrice}</span>
                  )}
                </div>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    className="pl-10"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                  />
                </div>
                <Slider
                  className="mt-2"
                  value={[sellingPrice]}
                  max={2000}
                  min={1}
                  step={1}
                  onValueChange={(values) => setSellingPrice(values[0])}
                />
              </div>
            )}

            {calculationMode === 'margin' && (
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="targetMargin">Target Profit Margin (%)</Label>
                  {errors.targetMargin && (
                    <span className="text-sm text-red-500">{errors.targetMargin}</span>
                  )}
                </div>
                <div className="relative mt-1.5">
                  <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="targetMargin"
                    type="number"
                    step="0.1"
                    className="pl-10"
                    value={targetMargin}
                    onChange={(e) => setTargetMargin(Number(e.target.value))}
                  />
                </div>
                <Slider
                  className="mt-2"
                  value={[targetMargin]}
                  max={90}
                  min={0}
                  step={0.5}
                  onValueChange={(values) => setTargetMargin(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>45%</span>
                  <span>90%</span>
                </div>
              </div>
            )}

            {calculationMode === 'markup' && (
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="targetMarkup">Target Markup (%)</Label>
                  {errors.targetMarkup && (
                    <span className="text-sm text-red-500">{errors.targetMarkup}</span>
                  )}
                </div>
                <div className="relative mt-1.5">
                  <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="targetMarkup"
                    type="number"
                    step="0.1"
                    className="pl-10"
                    value={targetMarkup}
                    onChange={(e) => setTargetMarkup(Number(e.target.value))}
                  />
                </div>
                <Slider
                  className="mt-2"
                  value={[targetMarkup]}
                  max={300}
                  min={0}
                  step={1}
                  onValueChange={(values) => setTargetMarkup(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>150%</span>
                  <span>300%</span>
                </div>
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${marginPercent}-${markupPercent}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" /> Margin Analysis
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Profit Margin</h3>
                    <div className="mt-1 text-3xl font-bold text-blue-600">
                      {marginPercent.toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Profit as % of selling price
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Markup</h3>
                    <div className="mt-1 text-3xl font-bold text-green-600">
                      {markupPercent.toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Profit as % of cost
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Cost</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(cost)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Selling Price</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(sellingPrice)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Profit</h3>
                    <div className="mt-1 text-xl font-bold text-green-600">
                      {formatCurrency(profit)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Understanding Margins & Markup
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">Profit Margin</h3>
                <p>
                  Profit margin shows what percentage of your selling price is profit. Formula: (Selling Price - Cost) / Selling Price × 100. 
                  A 50% margin means half of your selling price is profit.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Markup</h3>
                <p>
                  Markup shows how much you've increased the price above cost. Formula: (Selling Price - Cost) / Cost × 100. 
                  A 100% markup means you've doubled the cost price.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Key Difference</h3>
                <p>
                  Margin and markup are different! A 50% margin equals a 100% markup. Margin is always lower than markup 
                  when calculated on the same transaction. Use margin for profitability analysis and markup for pricing strategy.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MarginCalculator;
