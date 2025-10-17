import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, DollarSign, Plus, Trash2, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * IRRCalculator Component
 * 
 * Calculate Internal Rate of Return for investment cash flows
 */
export function IRRCalculator() {
  const { toast } = useToast();

  const [cashFlows, setCashFlows] = useState<Array<{ year: number; amount: number }>>([
    { year: 0, amount: -100000 },
    { year: 1, amount: 25000 },
    { year: 2, amount: 30000 },
    { year: 3, amount: 35000 },
    { year: 4, amount: 40000 },
  ]);
  
  const [irr, setIRR] = useState<number>(0);
  const [npv, setNPV] = useState<number>(0);

  // Calculate IRR using Newton-Raphson method
  const calculateIRR = (flows: Array<{ year: number; amount: number }>) => {
    let guess = 0.1; // Initial guess 10%
    let maxIterations = 1000;
    let tolerance = 0.00001;
    
    for (let i = 0; i < maxIterations; i++) {
      let npvValue = 0;
      let derivative = 0;
      
      flows.forEach(flow => {
        npvValue += flow.amount / Math.pow(1 + guess, flow.year);
        derivative -= (flow.year * flow.amount) / Math.pow(1 + guess, flow.year + 1);
      });
      
      const newGuess = guess - npvValue / derivative;
      
      if (Math.abs(newGuess - guess) < tolerance) {
        setIRR(newGuess * 100);
        
        // Calculate NPV at 10% discount rate for reference
        const npvAt10 = flows.reduce((sum, flow) => 
          sum + flow.amount / Math.pow(1.1, flow.year), 0);
        setNPV(npvAt10);
        return;
      }
      
      guess = newGuess;
    }
    
    setIRR(guess * 100);
  };

  const addCashFlow = () => {
    const lastYear = cashFlows.length > 0 ? Math.max(...cashFlows.map(cf => cf.year)) : -1;
    setCashFlows([...cashFlows, { year: lastYear + 1, amount: 0 }]);
  };

  const removeCashFlow = (index: number) => {
    const updated = cashFlows.filter((_, i) => i !== index);
    setCashFlows(updated);
    calculateIRR(updated);
  };

  const updateCashFlow = (index: number, field: 'year' | 'amount', value: number) => {
    const updated = [...cashFlows];
    updated[index] = { ...updated[index], [field]: value };
    setCashFlows(updated);
    calculateIRR(updated);
  };

  const handleReset = () => {
    const defaultFlows = [
      { year: 0, amount: -100000 },
      { year: 1, amount: 25000 },
      { year: 2, amount: 30000 },
      { year: 3, amount: 35000 },
      { year: 4, amount: 40000 },
    ];
    setCashFlows(defaultFlows);
    calculateIRR(defaultFlows);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const copyToClipboard = () => {
    const flowsList = cashFlows.map(cf => `Year ${cf.year}: ${formatCurrency(cf.amount)}`).join('\n');
    const result = `IRR Analysis:
${flowsList}

Internal Rate of Return (IRR): ${irr.toFixed(2)}%
NPV at 10%: ${formatCurrency(npv)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "IRR results copied to clipboard",
    });
  };

  // Calculate on mount
  React.useEffect(() => {
    calculateIRR(cashFlows);
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">IRR Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate Internal Rate of Return for your investments
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Cash Flows</h2>
            <Button onClick={addCashFlow} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add Year
            </Button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
            {cashFlows.map((flow, index) => (
              <div key={index} className="flex gap-2 items-center">
                <div className="flex-1">
                  <Label className="text-xs">Year</Label>
                  <Input
                    type="number"
                    value={flow.year}
                    onChange={(e) => updateCashFlow(index, 'year', Number(e.target.value))}
                  />
                </div>
                <div className="flex-[2]">
                  <Label className="text-xs">Cash Flow</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      className="pl-9"
                      value={flow.amount}
                      onChange={(e) => updateCashFlow(index, 'amount', Number(e.target.value))}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => removeCashFlow(index)}
                  variant="outline"
                  size="icon"
                  className="mt-5"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </Card>

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
                  <h2 className="text-xl font-semibold">Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Internal Rate of Return</h3>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {irr.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">NPV at 10% Discount</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(npv)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Understanding IRR</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• IRR is the discount rate that makes NPV equal to zero</p>
              <p>• Higher IRR indicates a more profitable investment</p>
              <p>• Compare IRR to your required rate of return</p>
              <p>• Negative initial cash flow represents investment cost</p>
              <p>• Positive cash flows represent returns over time</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default IRRCalculator;
