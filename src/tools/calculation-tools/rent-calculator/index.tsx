import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info, DollarSign, Percent, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export function RentCalculator() {
  // State for input values
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<number>(5000);
  const [monthlyDebt, setMonthlyDebt] = useState<number>(500);
  const [rentToIncomeRatio, setRentToIncomeRatio] = useState<number>(30);

  // State for calculated results
  const [maxAffordableRent, setMaxAffordableRent] = useState<number>(0);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);

  // State for validation
  const [errors, setErrors] = useState<{
    grossMonthlyIncome?: string;
    monthlyDebt?: string;
  }>({});

  useEffect(() => {
    calculateRentAffordability();
  }, [grossMonthlyIncome, monthlyDebt, rentToIncomeRatio]);

  const calculateRentAffordability = () => {
    const newErrors: {
      grossMonthlyIncome?: string;
      monthlyDebt?: string;
    } = {};

    if (grossMonthlyIncome <= 0) newErrors.grossMonthlyIncome = "Income must be greater than 0";
    if (monthlyDebt < 0) newErrors.monthlyDebt = "Debt cannot be negative";
    if (monthlyDebt >= grossMonthlyIncome) newErrors.monthlyDebt = "Debt cannot exceed income";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
        setMaxAffordableRent(0);
        setRemainingBudget(0);
        return;
    };

    const affordableRent = grossMonthlyIncome * (rentToIncomeRatio / 100);
    setMaxAffordableRent(affordableRent);

    const remaining = grossMonthlyIncome - affordableRent - monthlyDebt;
    setRemainingBudget(remaining);
  };

  const handleReset = () => {
    setGrossMonthlyIncome(5000);
    setMonthlyDebt(500);
    setRentToIncomeRatio(30);
    setErrors({});
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const affordabilityRange = {
    comfortable: grossMonthlyIncome * 0.25,
    ideal: grossMonthlyIncome * 0.30,
    stretch: grossMonthlyIncome * 0.35,
  };

  const pieData = [
    { name: 'Rent', value: maxAffordableRent, color: '#3B82F6' },
    { name: 'Debt', value: monthlyDebt, color: '#EF4444' },
    { name: 'Remaining', value: remainingBudget > 0 ? remainingBudget : 0, color: '#10B981' },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Rent Affordability Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Determine how much rent you can comfortably afford based on your income and debts.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Your Financials
          </h2>
          
          <div className="space-y-6">
            {/* Gross Monthly Income */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="grossMonthlyIncome">Gross Monthly Income</Label>
                {errors.grossMonthlyIncome && (
                  <span className="text-sm text-red-500">{errors.grossMonthlyIncome}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="grossMonthlyIncome"
                  type="number"
                  className="pl-10"
                  value={grossMonthlyIncome}
                  onChange={(e) => setGrossMonthlyIncome(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                defaultValue={[grossMonthlyIncome]}
                max={15000}
                step={100}
                value={[grossMonthlyIncome]}
                onValueChange={(values) => setGrossMonthlyIncome(values[0])}
              />
            </div>

            {/* Total Monthly Debt */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="monthlyDebt">Total Monthly Debt Payments</Label>
                {errors.monthlyDebt && (
                  <span className="text-sm text-red-500">{errors.monthlyDebt}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="monthlyDebt"
                  type="number"
                  className="pl-10"
                  value={monthlyDebt}
                  onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                defaultValue={[monthlyDebt]}
                max={grossMonthlyIncome}
                step={50}
                value={[monthlyDebt]}
                onValueChange={(values) => setMonthlyDebt(values[0])}
              />
            </div>

            {/* Target Rent-to-Income Ratio */}
            <div>
              <Label htmlFor="rentToIncomeRatio">Target Rent-to-Income Ratio (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="rentToIncomeRatio"
                  type="number"
                  step="1"
                  className="pl-10"
                  value={rentToIncomeRatio}
                  onChange={(e) => setRentToIncomeRatio(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                defaultValue={[rentToIncomeRatio]}
                max={50}
                step={1}
                value={[rentToIncomeRatio]}
                onValueChange={(values) => setRentToIncomeRatio(values[0])}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Affordability Summary
            </h2>
            
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Maximum Affordable Monthly Rent</h3>
              <div className="mt-1 text-4xl font-bold">
                {formatCurrency(maxAffordableRent)}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-4 md:grid-cols-3 text-center">
                <div>
                    <h4 className="font-medium">Comfortable (25%)</h4>
                    <p className="text-lg font-semibold">{formatCurrency(affordabilityRange.comfortable)}</p>
                </div>
                <div>
                    <h4 className="font-medium">Ideal (30%)</h4>
                    <p className="text-lg font-semibold">{formatCurrency(affordabilityRange.ideal)}</p>
                </div>
                <div>
                    <h4 className="font-medium">Stretch (35%)</h4>
                    <p className="text-lg font-semibold">{formatCurrency(affordabilityRange.stretch)}</p>
                </div>
            </div>
            
            <Separator className="my-4" />

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Remaining Monthly Budget</h3>
              <div className="mt-1 text-2xl font-bold">
                {formatCurrency(remainingBudget)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">After rent and debt payments.</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Budget Breakdown</h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={pieData}
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RentCalculator;
