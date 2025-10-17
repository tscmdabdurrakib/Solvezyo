import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, DollarSign, Percent, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AverageReturnCalculator Component
 * 
 * Calculate the average annual return on an investment based on initial value,
 * final value, and time period. Supports both absolute and annualized returns.
 */
export function AverageReturnCalculator() {
  // State for input values
  const [initialValue, setInitialValue] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(15000);
  const [years, setYears] = useState<number>(5);
  const [returnType, setReturnType] = useState<string>('annualized'); // 'absolute' or 'annualized'
  
  // State for calculated results
  const [averageReturn, setAverageReturn] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [totalGain, setTotalGain] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    initialValue?: string;
    finalValue?: string;
    years?: string;
  }>({});

  // Calculate returns when inputs change
  useEffect(() => {
    calculateReturns();
  }, [initialValue, finalValue, years, returnType]);

  /**
   * Calculate average return
   * Absolute Return = ((Final Value - Initial Value) / Initial Value) × 100
   * Annualized Return = ((Final Value / Initial Value)^(1/Years) - 1) × 100
   */
  const calculateReturns = () => {
    // Validate inputs
    const newErrors: {
      initialValue?: string;
      finalValue?: string;
      years?: string;
    } = {};
    
    if (initialValue <= 0) newErrors.initialValue = "Initial value must be greater than 0";
    if (finalValue <= 0) newErrors.finalValue = "Final value must be greater than 0";
    if (years <= 0) newErrors.years = "Years must be greater than 0";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Calculate total return percentage
    const totalReturnPct = ((finalValue - initialValue) / initialValue) * 100;
    setTotalReturn(totalReturnPct);
    
    // Calculate total gain in dollars
    const gain = finalValue - initialValue;
    setTotalGain(gain);
    
    // Calculate average return based on type
    let avgReturn = 0;
    if (returnType === 'absolute') {
      // Simple average return per year
      avgReturn = totalReturnPct / years;
    } else {
      // Annualized (compound) return using CAGR formula
      // CAGR = (Final Value / Initial Value)^(1/Years) - 1
      avgReturn = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
    }
    
    setAverageReturn(avgReturn);
  };

  // Function to reset all values
  const handleReset = () => {
    setInitialValue(10000);
    setFinalValue(15000);
    setYears(5);
    setReturnType('annualized');
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Investment Return Results:
Initial Value: ${formatCurrency(initialValue)}
Final Value: ${formatCurrency(finalValue)}
Time Period: ${years} years
Total Return: ${totalReturn.toFixed(2)}%
Total Gain: ${formatCurrency(totalGain)}
Average ${returnType === 'annualized' ? 'Annualized' : 'Absolute'} Return: ${averageReturn.toFixed(2)}% per year`;
    
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

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Average Return Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the average annual return on your investments over time.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Investment Details
          </h2>
          
          <div className="space-y-6">
            {/* Initial Value */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="initialValue">Initial Investment Value</Label>
                {errors.initialValue && (
                  <span className="text-sm text-red-500">{errors.initialValue}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="initialValue"
                  type="number"
                  className="pl-10"
                  value={initialValue}
                  onChange={(e) => setInitialValue(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[initialValue]}
                max={100000}
                min={100}
                step={100}
                onValueChange={(values) => setInitialValue(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$100</span>
                <span>$50,000</span>
                <span>$100,000</span>
              </div>
            </div>

            {/* Final Value */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="finalValue">Final Investment Value</Label>
                {errors.finalValue && (
                  <span className="text-sm text-red-500">{errors.finalValue}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="finalValue"
                  type="number"
                  className="pl-10"
                  value={finalValue}
                  onChange={(e) => setFinalValue(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[finalValue]}
                max={200000}
                min={100}
                step={100}
                onValueChange={(values) => setFinalValue(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$100</span>
                <span>$100,000</span>
                <span>$200,000</span>
              </div>
            </div>

            {/* Years */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="years">Investment Period (Years)</Label>
                {errors.years && (
                  <span className="text-sm text-red-500">{errors.years}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[years]}
                max={30}
                min={1}
                step={1}
                onValueChange={(values) => setYears(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1y</span>
                <span>15y</span>
                <span>30y</span>
              </div>
            </div>

            <Separator />

            {/* Return Type */}
            <div>
              <Label htmlFor="returnType">Return Calculation Type</Label>
              <Select value={returnType} onValueChange={setReturnType}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annualized">Annualized (CAGR)</SelectItem>
                  <SelectItem value="absolute">Absolute (Simple Average)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1.5">
                {returnType === 'annualized' 
                  ? 'Compound Annual Growth Rate - accounts for compounding' 
                  : 'Simple average - total return divided by years'}
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
              key={averageReturn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" /> Return Analysis
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Average Annual Return</h3>
                    <div className="mt-1 text-3xl font-bold text-blue-600">
                      {averageReturn.toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {returnType === 'annualized' ? 'Annualized (CAGR)' : 'Simple Average'}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Return</h3>
                    <div className={`mt-1 text-3xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Over {years} {years === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Initial Value</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(initialValue)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Final Value</h3>
                    <div className="mt-1 text-xl font-bold">
                      {formatCurrency(finalValue)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Gain</h3>
                    <div className={`mt-1 text-xl font-bold ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(totalGain)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Understanding Returns
            </h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">Annualized Return (CAGR)</h3>
                <p>
                  The Compound Annual Growth Rate shows the average yearly growth rate assuming the investment 
                  grew at a steady rate. This is more accurate for long-term investments as it accounts for 
                  compounding effects.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Absolute Return</h3>
                <p>
                  The simple average return divides the total return by the number of years. This method doesn't 
                  account for compounding and is best used for quick, rough estimates.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1">Total Return</h3>
                <p>
                  The total percentage gain or loss on your investment over the entire period, calculated as 
                  the difference between final and initial values relative to the initial investment.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AverageReturnCalculator;
