import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, DollarSign, Plus, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BudgetCalculator Component
 * 
 * Create and track monthly budget with income and expense categories
 */
export function BudgetCalculator() {
  const { toast } = useToast();

  // State for income
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000);
  
  // State for expenses
  const [expenses, setExpenses] = useState<Array<{ name: string; amount: number }>>([
    { name: 'Housing', amount: 1500 },
    { name: 'Food', amount: 600 },
    { name: 'Transportation', amount: 400 },
    { name: 'Utilities', amount: 200 },
    { name: 'Entertainment', amount: 300 },
  ]);
  
  // Calculated values
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);
  const [savingsRate, setSavingsRate] = useState<number>(0);

  // Calculate totals when income or expenses change
  useEffect(() => {
    calculateBudget();
  }, [monthlyIncome, expenses]);

  // Calculate budget summary
  const calculateBudget = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remaining = monthlyIncome - total;
    const rate = monthlyIncome > 0 ? (remaining / monthlyIncome) * 100 : 0;
    
    setTotalExpenses(total);
    setRemainingBudget(remaining);
    setSavingsRate(rate);
  };

  // Add new expense
  const addExpense = () => {
    setExpenses([...expenses, { name: 'New Expense', amount: 0 }]);
  };

  // Remove expense
  const removeExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // Update expense
  const updateExpense = (index: number, field: 'name' | 'amount', value: string | number) => {
    const updated = [...expenses];
    updated[index] = { ...updated[index], [field]: value };
    setExpenses(updated);
  };

  // Reset to defaults
  const handleReset = () => {
    setMonthlyIncome(5000);
    setExpenses([
      { name: 'Housing', amount: 1500 },
      { name: 'Food', amount: 600 },
      { name: 'Transportation', amount: 400 },
      { name: 'Utilities', amount: 200 },
      { name: 'Entertainment', amount: 300 },
    ]);
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

  // Copy result to clipboard
  const copyToClipboard = () => {
    const expenseList = expenses.map(e => `${e.name}: ${formatCurrency(e.amount)}`).join('\n');
    const result = `Monthly Budget:
Income: ${formatCurrency(monthlyIncome)}
Total Expenses: ${formatCurrency(totalExpenses)}
Remaining: ${formatCurrency(remainingBudget)}
Savings Rate: ${savingsRate.toFixed(1)}%

Expenses:
${expenseList}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Budget summary copied to clipboard",
    });
  };

  // Data for pie chart
  const pieData = expenses.map((expense, index) => ({
    name: expense.name,
    value: expense.amount,
    color: `hsl(${(index * 360) / expenses.length}, 70%, 50%)`,
  }));

  // Add remaining budget to chart if positive
  if (remainingBudget > 0) {
    pieData.push({
      name: 'Remaining/Savings',
      value: remainingBudget,
      color: '#10b981',
    });
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Budget Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Plan and track your monthly income and expenses
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Budget Details
          </h2>
          
          <div className="space-y-6">
            {/* Monthly Income */}
            <div>
              <Label htmlFor="income">Monthly Income</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="income"
                  type="number"
                  className="pl-10"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Expenses List */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Monthly Expenses</Label>
                <Button onClick={addExpense} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Category"
                      value={expense.name}
                      onChange={(e) => updateExpense(index, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Amount"
                        className="pl-9"
                        value={expense.amount}
                        onChange={(e) => updateExpense(index, 'amount', Number(e.target.value))}
                      />
                    </div>
                    <Button
                      onClick={() => removeExpense(index)}
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Budget
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Budget Summary</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Monthly Income</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(monthlyIncome)}
                    </div>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Total Expenses</h3>
                    <div className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                      {formatCurrency(totalExpenses)}
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${remainingBudget >= 0 
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                    : 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'}`}>
                    <h3 className={`text-sm font-medium ${remainingBudget >= 0 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-orange-800 dark:text-orange-200'}`}>
                      {remainingBudget >= 0 ? 'Remaining/Savings' : 'Over Budget'}
                    </h3>
                    <div className={`mt-1 text-2xl font-bold ${remainingBudget >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-orange-600 dark:text-orange-400'}`}>
                      {formatCurrency(Math.abs(remainingBudget))}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Savings Rate</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {savingsRate.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Visualization */}
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

          {/* Tips */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Budgeting Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings</p>
              <p>• Track expenses regularly to stay on budget</p>
              <p>• Build an emergency fund covering 3-6 months of expenses</p>
              <p>• Review and adjust your budget monthly</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BudgetCalculator;
