import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw, TrendingUp, Users, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SocialSecurityCalculator Component
 * 
 * Calculate projected Social Security retirement benefits based on earnings history,
 * retirement age, and various scenarios.
 */
export function SocialSecurityCalculator() {
  // State for input values
  const [currentAge, setCurrentAge] = useState<number>(40);
  const [retirementAge, setRetirementAge] = useState<number>(67);
  const [annualEarnings, setAnnualEarnings] = useState<number>(60000);
  const [yearsWorked, setYearsWorked] = useState<number>(20);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  
  // State for calculated results
  const [monthlyBenefit, setMonthlyBenefit] = useState<number>(0);
  const [annualBenefit, setAnnualBenefit] = useState<number>(0);
  const [lifetimeBenefit, setLifetimeBenefit] = useState<number>(0);
  const [breakEvenAge, setBreakEvenAge] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  
  // State for validation
  const [errors, setErrors] = useState<{
    currentAge?: string;
    retirementAge?: string;
    annualEarnings?: string;
    yearsWorked?: string;
  }>({});

  // Calculate Social Security when inputs change
  useEffect(() => {
    calculateSocialSecurity();
  }, [currentAge, retirementAge, annualEarnings, yearsWorked, inflationRate]);

  /**
   * Calculate Social Security benefits
   * Formula based on Primary Insurance Amount (PIA) calculation
   * Simplified version using bend points and AIME
   */
  const calculateSocialSecurity = () => {
    // Validate inputs
    const newErrors: {
      currentAge?: string;
      retirementAge?: string;
      annualEarnings?: string;
      yearsWorked?: string;
    } = {};
    
    if (currentAge < 18 || currentAge > 70) newErrors.currentAge = "Age must be between 18 and 70";
    if (retirementAge < 62 || retirementAge > 70) newErrors.retirementAge = "Retirement age must be between 62 and 70";
    if (retirementAge <= currentAge) newErrors.retirementAge = "Must be after current age";
    if (annualEarnings <= 0) newErrors.annualEarnings = "Earnings must be greater than 0";
    if (yearsWorked < 0) newErrors.yearsWorked = "Years worked cannot be negative";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;
    
    // Calculate Average Indexed Monthly Earnings (AIME)
    const monthlyEarnings = annualEarnings / 12;
    
    // 2024 Social Security bend points (simplified)
    // First $1,174: 90%
    // $1,174 to $7,078: 32%
    // Over $7,078: 15%
    const bendPoint1 = 1174;
    const bendPoint2 = 7078;
    
    let pia = 0; // Primary Insurance Amount
    
    if (monthlyEarnings <= bendPoint1) {
      pia = monthlyEarnings * 0.90;
    } else if (monthlyEarnings <= bendPoint2) {
      pia = (bendPoint1 * 0.90) + ((monthlyEarnings - bendPoint1) * 0.32);
    } else {
      pia = (bendPoint1 * 0.90) + ((bendPoint2 - bendPoint1) * 0.32) + ((monthlyEarnings - bendPoint2) * 0.15);
    }
    
    // Adjust for retirement age (Full Retirement Age is 67)
    const fullRetirementAge = 67;
    let adjustmentFactor = 1.0;
    
    if (retirementAge < fullRetirementAge) {
      // Early retirement reduction: ~6.67% per year before FRA
      const monthsEarly = (fullRetirementAge - retirementAge) * 12;
      adjustmentFactor = 1 - (monthsEarly * 0.00556); // ~6.67% annual reduction
    } else if (retirementAge > fullRetirementAge) {
      // Delayed retirement credits: 8% per year after FRA
      const yearsDelayed = retirementAge - fullRetirementAge;
      adjustmentFactor = 1 + (yearsDelayed * 0.08);
    }
    
    const adjustedMonthlyBenefit = pia * adjustmentFactor;
    const adjustedAnnualBenefit = adjustedMonthlyBenefit * 12;
    
    // Calculate lifetime benefit (assume life expectancy of 85)
    const lifeExpectancy = 85;
    const yearsReceiving = Math.max(0, lifeExpectancy - retirementAge);
    const totalLifetime = adjustedAnnualBenefit * yearsReceiving;
    
    // Calculate break-even age for early vs full retirement
    const breakEven = fullRetirementAge + 12; // Simplified calculation
    
    setMonthlyBenefit(adjustedMonthlyBenefit);
    setAnnualBenefit(adjustedAnnualBenefit);
    setLifetimeBenefit(totalLifetime);
    setBreakEvenAge(breakEven);
  };

  // Function to reset all values
  const handleReset = () => {
    setCurrentAge(40);
    setRetirementAge(67);
    setAnnualEarnings(60000);
    setYearsWorked(20);
    setInflationRate(2.5);
    setErrors({});
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Social Security Benefit Estimate:
Monthly Benefit: ${formatCurrency(monthlyBenefit)}
Annual Benefit: ${formatCurrency(annualBenefit)}
Lifetime Benefit: ${formatCurrency(lifetimeBenefit)}
Break-Even Age: ${breakEvenAge} years`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format currency with commas and 2 decimal places
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Data for age comparison chart
  const ageComparisonData = [62, 65, 67, 70].map(age => {
    const fullRetirementAge = 67;
    let factor = 1.0;
    if (age < fullRetirementAge) {
      const monthsEarly = (fullRetirementAge - age) * 12;
      factor = 1 - (monthsEarly * 0.00556);
    } else if (age > fullRetirementAge) {
      const yearsDelayed = age - fullRetirementAge;
      factor = 1 + (yearsDelayed * 0.08);
    }
    const monthlyEarnings = annualEarnings / 12;
    let pia = 0;
    if (monthlyEarnings <= 1174) {
      pia = monthlyEarnings * 0.90;
    } else if (monthlyEarnings <= 7078) {
      pia = (1174 * 0.90) + ((monthlyEarnings - 1174) * 0.32);
    } else {
      pia = (1174 * 0.90) + ((7078 - 1174) * 0.32) + ((monthlyEarnings - 7078) * 0.15);
    }
    return {
      age: `Age ${age}`,
      'Monthly Benefit': pia * factor,
    };
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Social Security Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Estimate your Social Security retirement benefits based on your earnings and retirement age.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5" /> Your Information
          </h2>
          
          <div className="space-y-6">
            {/* Current Age */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="currentAge">Current Age</Label>
                {errors.currentAge && (
                  <span className="text-sm text-red-500">{errors.currentAge}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="currentAge"
                  type="number"
                  className="pl-10"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[currentAge]}
                max={70}
                min={18}
                step={1}
                onValueChange={(values) => setCurrentAge(values[0])}
              />
            </div>

            {/* Retirement Age */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="retirementAge">Planned Retirement Age</Label>
                {errors.retirementAge && (
                  <span className="text-sm text-red-500">{errors.retirementAge}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="retirementAge"
                  type="number"
                  className="pl-10"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[retirementAge]}
                max={70}
                min={62}
                step={1}
                onValueChange={(values) => setRetirementAge(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>62 (Early)</span>
                <span>67 (Full)</span>
                <span>70 (Max)</span>
              </div>
            </div>

            {/* Annual Earnings */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="annualEarnings">Average Annual Earnings</Label>
                {errors.annualEarnings && (
                  <span className="text-sm text-red-500">{errors.annualEarnings}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="annualEarnings"
                  type="number"
                  className="pl-10"
                  value={annualEarnings}
                  onChange={(e) => setAnnualEarnings(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[annualEarnings]}
                max={200000}
                min={10000}
                step={1000}
                onValueChange={(values) => setAnnualEarnings(values[0])}
              />
            </div>

            {/* Years Worked */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="yearsWorked">Years Worked</Label>
                {errors.yearsWorked && (
                  <span className="text-sm text-red-500">{errors.yearsWorked}</span>
                )}
              </div>
              <div className="relative mt-1.5">
                <TrendingUp className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="yearsWorked"
                  type="number"
                  className="pl-10"
                  value={yearsWorked}
                  onChange={(e) => setYearsWorked(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[yearsWorked]}
                max={50}
                min={0}
                step={1}
                onValueChange={(values) => setYearsWorked(values[0])}
              />
            </div>

            {/* Inflation Rate */}
            <div>
              <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="inflationRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[inflationRate]}
                max={10}
                min={0}
                step={0.1}
                onValueChange={(values) => setInflationRate(values[0])}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          {/* Summary Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={monthlyBenefit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Estimated Benefits
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Benefit</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(monthlyBenefit)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Annual Benefit</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatCurrency(annualBenefit)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Lifetime Benefit (to age 85)</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(lifetimeBenefit)}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Break-Even Age</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {breakEvenAge} years
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Visualization Tabs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Benefit Analysis</h2>
            
            <Tabs defaultValue="comparison">
              <TabsList className="mb-4">
                <TabsTrigger value="comparison">Age Comparison</TabsTrigger>
                <TabsTrigger value="info">Key Information</TabsTrigger>
              </TabsList>
              
              <TabsContent value="comparison" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ageComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis tickFormatter={(value) => `$${Math.round(Number(value))}`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="Monthly Benefit" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="info" className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Full Retirement Age (FRA)</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    For most people, FRA is 67. Claiming before FRA reduces benefits by ~6.67% per year. 
                    Delaying past FRA increases benefits by 8% per year until age 70.
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">Bend Points</h3>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Social Security uses "bend points" to calculate your benefit: 90% of first $1,174/month, 
                    32% of earnings $1,174-$7,078, and 15% over $7,078 (2024 values).
                  </p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Important Note</h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    This is an estimate only. Your actual benefit will depend on your complete earnings history 
                    and future Social Security policy changes. Visit SSA.gov for your official estimate.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Information Section */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Understanding Social Security Benefits</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">How It Works</h3>
            <p className="text-muted-foreground text-sm">
              Social Security retirement benefits are based on your highest 35 years of earnings. 
              The Social Security Administration indexes your earnings to account for changes in average wages.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">When to Claim</h3>
            <p className="text-muted-foreground text-sm">
              You can claim as early as 62, but benefits are reduced. Full retirement age is 67 for most people. 
              Delaying until 70 maximizes your monthly benefit with 8% annual increases.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Planning Tips</h3>
            <p className="text-muted-foreground text-sm">
              Consider your health, life expectancy, and financial needs. If you're married, coordinate with your spouse. 
              Social Security is designed to replace about 40% of pre-retirement income.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SocialSecurityCalculator;
