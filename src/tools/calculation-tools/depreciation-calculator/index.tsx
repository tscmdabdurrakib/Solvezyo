import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, DollarSign, Calendar, RefreshCw, Copy, Check, TrendingDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * DepreciationCalculator Component
 * 
 * Calculate asset depreciation using different methods:
 * - Straight Line
 * - Declining Balance
 * - Double Declining Balance
 * - Sum of Years' Digits
 */
export function DepreciationCalculator() {
  const [assetCost, setAssetCost] = useState<number>(50000);
  const [salvageValue, setSalvageValue] = useState<number>(5000);
  const [usefulLife, setUsefulLife] = useState<number>(10);
  const [depreciationMethod, setDepreciationMethod] = useState<string>('straight-line');
  
  const [annualDepreciation, setAnnualDepreciation] = useState<number>(0);
  const [totalDepreciation, setTotalDepreciation] = useState<number>(0);
  const [bookValue, setBookValue] = useState<number>(0);
  const [depreciationSchedule, setDepreciationSchedule] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    calculateDepreciation();
  }, [assetCost, salvageValue, usefulLife, depreciationMethod]);

  /**
   * Calculate Depreciation based on selected method
   */
  const calculateDepreciation = () => {
    const newErrors: Record<string, string> = {};
    
    if (assetCost <= 0) newErrors.assetCost = "Asset cost must be greater than 0";
    if (salvageValue < 0) newErrors.salvageValue = "Salvage value cannot be negative";
    if (salvageValue >= assetCost) newErrors.salvageValue = "Salvage value must be less than asset cost";
    if (usefulLife <= 0) newErrors.usefulLife = "Useful life must be greater than 0";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    const depreciableAmount = assetCost - salvageValue;
    const schedule: any[] = [];
    let cumulativeDepreciation = 0;
    
    switch (depreciationMethod) {
      case 'straight-line':
        // Straight Line: (Cost - Salvage) / Useful Life
        const slAnnualDepreciation = depreciableAmount / usefulLife;
        
        for (let year = 1; year <= usefulLife; year++) {
          cumulativeDepreciation += slAnnualDepreciation;
          const currentBookValue = assetCost - cumulativeDepreciation;
          
          schedule.push({
            year: `Year ${year}`,
            'Annual Depreciation': slAnnualDepreciation,
            'Cumulative Depreciation': cumulativeDepreciation,
            'Book Value': Math.max(currentBookValue, salvageValue),
          });
        }
        
        setAnnualDepreciation(slAnnualDepreciation);
        break;
        
      case 'declining-balance':
        // Declining Balance: Book Value × Depreciation Rate
        const dbRate = 1 / usefulLife;
        let dbBookValue = assetCost;
        
        for (let year = 1; year <= usefulLife; year++) {
          const yearlyDepreciation = dbBookValue * dbRate;
          cumulativeDepreciation += yearlyDepreciation;
          dbBookValue -= yearlyDepreciation;
          
          // Ensure book value doesn't go below salvage value
          if (dbBookValue < salvageValue) {
            const adjustment = salvageValue - dbBookValue;
            dbBookValue = salvageValue;
            cumulativeDepreciation -= adjustment;
          }
          
          schedule.push({
            year: `Year ${year}`,
            'Annual Depreciation': yearlyDepreciation,
            'Cumulative Depreciation': cumulativeDepreciation,
            'Book Value': dbBookValue,
          });
        }
        
        setAnnualDepreciation(assetCost * dbRate);
        break;
        
      case 'double-declining':
        // Double Declining Balance: Book Value × (2 / Useful Life)
        const ddbRate = 2 / usefulLife;
        let ddbBookValue = assetCost;
        
        for (let year = 1; year <= usefulLife; year++) {
          const yearlyDepreciation = ddbBookValue * ddbRate;
          const newBookValue = ddbBookValue - yearlyDepreciation;
          
          // Switch to straight-line if it gives higher depreciation
          const straightLineAmount = (ddbBookValue - salvageValue) / (usefulLife - year + 1);
          const actualDepreciation = Math.max(yearlyDepreciation, straightLineAmount);
          
          cumulativeDepreciation += actualDepreciation;
          ddbBookValue = Math.max(newBookValue, salvageValue);
          
          schedule.push({
            year: `Year ${year}`,
            'Annual Depreciation': actualDepreciation,
            'Cumulative Depreciation': cumulativeDepreciation,
            'Book Value': ddbBookValue,
          });
        }
        
        setAnnualDepreciation(assetCost * ddbRate);
        break;
        
      case 'sum-of-years':
        // Sum of Years' Digits: (Remaining Life / Sum of Years) × Depreciable Amount
        const sumOfYears = (usefulLife * (usefulLife + 1)) / 2;
        
        for (let year = 1; year <= usefulLife; year++) {
          const remainingLife = usefulLife - year + 1;
          const yearlyDepreciation = (remainingLife / sumOfYears) * depreciableAmount;
          cumulativeDepreciation += yearlyDepreciation;
          const currentBookValue = assetCost - cumulativeDepreciation;
          
          schedule.push({
            year: `Year ${year}`,
            'Annual Depreciation': yearlyDepreciation,
            'Cumulative Depreciation': cumulativeDepreciation,
            'Book Value': Math.max(currentBookValue, salvageValue),
          });
        }
        
        // First year depreciation for sum-of-years
        setAnnualDepreciation((usefulLife / sumOfYears) * depreciableAmount);
        break;
    }
    
    setTotalDepreciation(depreciableAmount);
    setBookValue(salvageValue);
    setDepreciationSchedule(schedule);
  };

  const handleReset = () => {
    setAssetCost(50000);
    setSalvageValue(5000);
    setUsefulLife(10);
    setDepreciationMethod('straight-line');
    setErrors({});
  };

  const handleCopy = () => {
    const methodNames: Record<string, string> = {
      'straight-line': 'Straight Line',
      'declining-balance': 'Declining Balance',
      'double-declining': 'Double Declining Balance',
      'sum-of-years': 'Sum of Years\' Digits',
    };
    
    const resultText = `Depreciation Calculator Results:
Method: ${methodNames[depreciationMethod]}
Asset Cost: ${formatCurrency(assetCost)}
Salvage Value: ${formatCurrency(salvageValue)}
Useful Life: ${usefulLife} years
First Year Depreciation: ${formatCurrency(annualDepreciation)}
Total Depreciation: ${formatCurrency(totalDepreciation)}
Final Book Value: ${formatCurrency(bookValue)}`;
    
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
        <h1 className="text-3xl font-bold tracking-tight">Depreciation Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate asset depreciation using various accounting methods.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingDown className="mr-2 h-5 w-5" /> Asset Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between">
                <Label htmlFor="assetCost">Asset Cost</Label>
                {errors.assetCost && <span className="text-sm text-red-500">{errors.assetCost}</span>}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="assetCost"
                  type="number"
                  className="pl-10"
                  value={assetCost}
                  onChange={(e) => setAssetCost(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[assetCost]}
                max={500000}
                min={1000}
                step={1000}
                onValueChange={(values) => setAssetCost(values[0])}
              />
            </div>

            <div>
              <div className="flex justify-between">
                <Label htmlFor="salvageValue">Salvage Value (Residual)</Label>
                {errors.salvageValue && <span className="text-sm text-red-500">{errors.salvageValue}</span>}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="salvageValue"
                  type="number"
                  className="pl-10"
                  value={salvageValue}
                  onChange={(e) => setSalvageValue(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[salvageValue]}
                max={assetCost * 0.5}
                min={0}
                step={500}
                onValueChange={(values) => setSalvageValue(values[0])}
              />
            </div>

            <div>
              <div className="flex justify-between">
                <Label htmlFor="usefulLife">Useful Life (Years)</Label>
                {errors.usefulLife && <span className="text-sm text-red-500">{errors.usefulLife}</span>}
              </div>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="usefulLife"
                  type="number"
                  className="pl-10"
                  value={usefulLife}
                  onChange={(e) => setUsefulLife(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[usefulLife]}
                max={30}
                min={1}
                step={1}
                onValueChange={(values) => setUsefulLife(values[0])}
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="depreciationMethod">Depreciation Method</Label>
              <Select value={depreciationMethod} onValueChange={setDepreciationMethod}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straight-line">Straight Line</SelectItem>
                  <SelectItem value="declining-balance">Declining Balance</SelectItem>
                  <SelectItem value="double-declining">Double Declining Balance</SelectItem>
                  <SelectItem value="sum-of-years">Sum of Years' Digits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={annualDepreciation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Depreciation Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">First Year Depreciation</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(annualDepreciation)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Depreciation</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(totalDepreciation)}
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary">
                    <h3 className="text-sm font-medium text-muted-foreground">Final Book Value</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(bookValue)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Depreciable Amount</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(assetCost - salvageValue)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Depreciation Schedule</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={depreciationSchedule} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="Book Value" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Cumulative Depreciation" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Depreciation Methods</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">Straight Line</h3>
                <p className="text-muted-foreground text-sm">
                  Equal depreciation expense each year. Simple and commonly used. Best for assets that 
                  provide consistent value over time.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Declining Balance</h3>
                <p className="text-muted-foreground text-sm">
                  Higher depreciation in early years, decreasing over time. Good for assets that lose 
                  value quickly when new.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Double Declining Balance</h3>
                <p className="text-muted-foreground text-sm">
                  Accelerated method with twice the straight-line rate. Maximum tax benefits in early 
                  years. Common for technology and vehicles.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Sum of Years' Digits</h3>
                <p className="text-muted-foreground text-sm">
                  Accelerated method based on sum of useful life years. Provides more depreciation early 
                  on but less extreme than double declining.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DepreciationCalculator;
