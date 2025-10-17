import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, PiggyBank, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * RetirementCalculator Component
 * 
 * Calculate retirement savings and income projections
 */
export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [employerMatch, setEmployerMatch] = useState<number>(3);
  const [retirementSavings, setRetirementSavings] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalGrowth, setTotalGrowth] = useState<number>(0);
  const [monthlyRetirementIncome, setMonthlyRetirementIncome] = useState<number>(0);
  const { toast } = useToast();

  // Calculate retirement savings when inputs change
  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflationRate, employerMatch]);

  /**
   * Function to calculate retirement savings
   * Uses future value of annuity formula with compound interest
   * FV = PV(1+r)^n + PMT[((1+r)^n - 1) / r]
   */
  const calculateRetirement = () => {
    if (currentAge >= retirementAge || retirementAge <= 0 || annualReturn < 0) {
      setRetirementSavings(0);
      setTotalContributions(0);
      setTotalGrowth(0);
      setMonthlyRetirementIncome(0);
      return;
    }

    // Years until retirement
    const yearsToRetirement = retirementAge - currentAge;
    
    // Monthly return rate
    const monthlyRate = (annualReturn / 100) / 12;
    
    // Total months until retirement
    const totalMonths = yearsToRetirement * 12;
    
    // Total monthly contribution including employer match
    const totalMonthlyContribution = monthlyContribution * (1 + employerMatch / 100);

    // Calculate future value of current savings
    const futureValueOfSavings = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
    
    // Calculate future value of monthly contributions (annuity)
    let futureValueOfContributions = 0;
    if (monthlyRate === 0) {
      futureValueOfContributions = totalMonthlyContribution * totalMonths;
    } else {
      futureValueOfContributions = totalMonthlyContribution * 
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    }
    
    // Total retirement savings
    const totalSavings = futureValueOfSavings + futureValueOfContributions;
    
    // Total contributions (personal + employer)
    const contributions = currentSavings + (totalMonthlyContribution * totalMonths);
    
    // Investment growth
    const growth = totalSavings - contributions;
    
    // Estimate monthly retirement income (4% withdrawal rule adjusted for inflation)
    const inflationAdjustedRate = ((1 + annualReturn / 100) / (1 + inflationRate / 100) - 1);
    const monthlyIncome = (totalSavings * inflationAdjustedRate) / 12;

    setRetirementSavings(totalSavings);
    setTotalContributions(contributions);
    setTotalGrowth(growth);
    setMonthlyRetirementIncome(monthlyIncome);
  };

  // Function to copy result to clipboard
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Function to reset values
  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(65);
    setCurrentSavings(50000);
    setMonthlyContribution(500);
    setAnnualReturn(7);
    setInflationRate(2.5);
    setEmployerMatch(3);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Retirement Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Plan your retirement savings and estimate future income
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PiggyBank className="mr-2 h-5 w-5" /> Retirement Planning
          </h2>
          
          <div className="space-y-4">
            {/* Current Age */}
            <div>
              <Label htmlFor="currentAge">Current Age</Label>
              <Input
                id="currentAge"
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(parseFloat(e.target.value) || 0)}
                min="18"
                max="100"
                step="1"
                className="mt-2"
              />
            </div>

            {/* Retirement Age */}
            <div>
              <Label htmlFor="retirementAge">Planned Retirement Age</Label>
              <Input
                id="retirementAge"
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(parseFloat(e.target.value) || 0)}
                min="50"
                max="100"
                step="1"
                className="mt-2"
              />
            </div>

            {/* Current Savings */}
            <div>
              <Label htmlFor="currentSavings">Current Retirement Savings ($)</Label>
              <Input
                id="currentSavings"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || 0)}
                min="0"
                step="1000"
                className="mt-2"
              />
            </div>

            {/* Monthly Contribution */}
            <div>
              <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
                min="0"
                step="50"
                className="mt-2"
              />
            </div>

            {/* Employer Match */}
            <div>
              <Label htmlFor="employerMatch">Employer Match (%)</Label>
              <Input
                id="employerMatch"
                type="number"
                value={employerMatch}
                onChange={(e) => setEmployerMatch(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                step="0.5"
                className="mt-2"
              />
            </div>

            {/* Annual Return */}
            <div>
              <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
              <Input
                id="annualReturn"
                type="number"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(parseFloat(e.target.value) || 0)}
                min="0"
                max="20"
                step="0.1"
                className="mt-2"
              />
            </div>

            {/* Inflation Rate */}
            <div>
              <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
              <Input
                id="inflationRate"
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="10"
                step="0.1"
                className="mt-2"
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" /> Retirement Projections
            </h2>
            
            {/* Primary Result */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Retirement Savings at Age {retirementAge}</h3>
                  <div className="text-4xl font-bold">
                    ${retirementSavings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(retirementSavings.toFixed(0), 'Retirement Savings')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Monthly Retirement Income */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Estimated Monthly Income</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${monthlyRetirementIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Inflation-adjusted</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(monthlyRetirementIncome.toFixed(0), 'Monthly Income')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Contributions */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Contributions</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${totalContributions.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Including employer match</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalContributions.toFixed(0), 'Total Contributions')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Investment Growth */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Investment Growth</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${totalGrowth.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Earnings from returns</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalGrowth.toFixed(0), 'Investment Growth')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Years to Retirement */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Years to Retirement</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {(retirementAge - currentAge)} years
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Time to save and grow</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((retirementAge - currentAge).toString(), 'Years to Retirement')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total with Employer Match */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Contribution Total</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${(monthlyContribution * (1 + employerMatch / 100)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">With {employerMatch}% match</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((monthlyContribution * (1 + employerMatch / 100)).toFixed(0), 'Monthly Total')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Return on Investment */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Return Percentage</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {totalContributions > 0 ? ((totalGrowth / totalContributions) * 100).toFixed(1) : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Total growth rate</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((totalContributions > 0 ? ((totalGrowth / totalContributions) * 100).toFixed(1) : '0') + '%', 'Return Percentage')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Retirement Calculator</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Compound Growth</h3>
              <p className="text-muted-foreground text-sm">
                Calculates retirement savings using compound interest with regular contributions over time.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Employer Match</h3>
              <p className="text-muted-foreground text-sm">
                Includes employer 401(k) matching contributions to show your total retirement savings potential.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Inflation Adjusted</h3>
              <p className="text-muted-foreground text-sm">
                Estimates monthly retirement income adjusted for inflation to show real purchasing power.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RetirementCalculator;
