import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, TrendingUp, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * GDPCalculator Component
 * 
 * Calculate Gross Domestic Product using different approaches
 */
export function GDPCalculator() {
  const { toast } = useToast();

  // State for calculation method
  const [method, setMethod] = useState<string>('expenditure');
  
  // State for Expenditure Approach inputs
  const [consumption, setConsumption] = useState<number>(0);
  const [investment, setInvestment] = useState<number>(0);
  const [governmentSpending, setGovernmentSpending] = useState<number>(0);
  const [exports, setExports] = useState<number>(0);
  const [imports, setImports] = useState<number>(0);
  
  // State for Income Approach inputs
  const [wages, setWages] = useState<number>(0);
  const [rent, setRent] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [profits, setProfits] = useState<number>(0);
  
  // State for results
  const [gdp, setGdp] = useState<number>(0);
  const [netExports, setNetExports] = useState<number>(0);

  // Calculate GDP when inputs change
  useEffect(() => {
    calculateGDP();
  }, [method, consumption, investment, governmentSpending, exports, imports, wages, rent, interest, profits]);

  // Function to calculate GDP
  const calculateGDP = () => {
    let calculatedGdp = 0;
    
    if (method === 'expenditure') {
      // GDP = C + I + G + (X - M)
      // C = Consumption, I = Investment, G = Government Spending
      // X = Exports, M = Imports
      const netExp = exports - imports;
      calculatedGdp = consumption + investment + governmentSpending + netExp;
      setNetExports(netExp);
    } else {
      // Income Approach: GDP = Wages + Rent + Interest + Profits
      calculatedGdp = wages + rent + interest + profits;
    }
    
    setGdp(calculatedGdp);
  };

  // Function to reset all values
  const handleReset = () => {
    setConsumption(0);
    setInvestment(0);
    setGovernmentSpending(0);
    setExports(0);
    setImports(0);
    setWages(0);
    setRent(0);
    setInterest(0);
    setProfits(0);
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
    let result = `GDP Calculation (${method === 'expenditure' ? 'Expenditure Approach' : 'Income Approach'}):\n`;
    
    if (method === 'expenditure') {
      result += `Consumption: ${formatCurrency(consumption)}
Investment: ${formatCurrency(investment)}
Government Spending: ${formatCurrency(governmentSpending)}
Exports: ${formatCurrency(exports)}
Imports: ${formatCurrency(imports)}
Net Exports: ${formatCurrency(netExports)}
`;
    } else {
      result += `Wages: ${formatCurrency(wages)}
Rent: ${formatCurrency(rent)}
Interest: ${formatCurrency(interest)}
Profits: ${formatCurrency(profits)}
`;
    }
    
    result += `\nGDP: ${formatCurrency(gdp)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "GDP calculation copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">GDP Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate Gross Domestic Product using expenditure or income approach
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> GDP Components
          </h2>
          
          <div className="space-y-6">
            {/* Method Selection */}
            <div>
              <Label htmlFor="method">Calculation Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expenditure">Expenditure Approach</SelectItem>
                  <SelectItem value="income">Income Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {method === 'expenditure' ? (
              <>
                {/* Consumption */}
                <div>
                  <Label htmlFor="consumption">Consumption (C)</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="consumption"
                      type="number"
                      className="pl-10"
                      value={consumption}
                      onChange={(e) => setConsumption(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Investment */}
                <div>
                  <Label htmlFor="investment">Investment (I)</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="investment"
                      type="number"
                      className="pl-10"
                      value={investment}
                      onChange={(e) => setInvestment(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Government Spending */}
                <div>
                  <Label htmlFor="governmentSpending">Government Spending (G)</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="governmentSpending"
                      type="number"
                      className="pl-10"
                      value={governmentSpending}
                      onChange={(e) => setGovernmentSpending(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Exports */}
                <div>
                  <Label htmlFor="exports">Exports (X)</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="exports"
                      type="number"
                      className="pl-10"
                      value={exports}
                      onChange={(e) => setExports(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Imports */}
                <div>
                  <Label htmlFor="imports">Imports (M)</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="imports"
                      type="number"
                      className="pl-10"
                      value={imports}
                      onChange={(e) => setImports(Number(e.target.value))}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Wages */}
                <div>
                  <Label htmlFor="wages">Wages & Salaries</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="wages"
                      type="number"
                      className="pl-10"
                      value={wages}
                      onChange={(e) => setWages(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Rent */}
                <div>
                  <Label htmlFor="rent">Rent</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="rent"
                      type="number"
                      className="pl-10"
                      value={rent}
                      onChange={(e) => setRent(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Interest */}
                <div>
                  <Label htmlFor="interest">Interest</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="interest"
                      type="number"
                      className="pl-10"
                      value={interest}
                      onChange={(e) => setInterest(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Profits */}
                <div>
                  <Label htmlFor="profits">Profits</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="profits"
                      type="number"
                      className="pl-10"
                      value={profits}
                      onChange={(e) => setProfits(Number(e.target.value))}
                    />
                  </div>
                </div>
              </>
            )}

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
                  <h2 className="text-xl font-semibold">GDP Result</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                      Gross Domestic Product
                    </h3>
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(gdp)}
                    </div>
                  </div>
                  
                  {method === 'expenditure' && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Net Exports (X - M)</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {formatCurrency(netExports)}
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Formula Used
                    </h3>
                    <div className="text-sm font-mono">
                      {method === 'expenditure' 
                        ? 'GDP = C + I + G + (X - M)'
                        : 'GDP = Wages + Rent + Interest + Profits'
                      }
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About GDP</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • GDP measures the total value of goods and services produced
              </p>
              <p>
                • Expenditure approach: GDP = C + I + G + (X - M)
              </p>
              <p>
                • Income approach: Sum of all incomes earned in production
              </p>
              <p>
                • Both methods should theoretically give the same result
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GDPCalculator;
