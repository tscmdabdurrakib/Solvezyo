import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Info, DollarSign, RefreshCw, Copy, Check, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RMDCalculator Component
 * 
 * Calculate Required Minimum Distributions from retirement accounts.
 * Based on IRS Uniform Lifetime Table.
 */
export function RMDCalculator() {
  const [age, setAge] = useState<number>(73);
  const [accountBalance, setAccountBalance] = useState<number>(500000);
  const [spouseAge, setSpouseAge] = useState<number>(70);
  const [hasYoungerSpouse, setHasYoungerSpouse] = useState<boolean>(false);
  
  const [rmdAmount, setRmdAmount] = useState<number>(0);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // IRS Uniform Lifetime Table (simplified)
  const uniformLifetimeTable: { [key: number]: number } = {
    73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1,
    80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2,
    87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1,
    94: 9.5, 95: 8.9, 96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4
  };

  useEffect(() => {
    calculateRMD();
  }, [age, accountBalance, spouseAge, hasYoungerSpouse]);

  /**
   * Calculate RMD using IRS tables
   * RMD = Account Balance / Life Expectancy Factor
   */
  const calculateRMD = () => {
    const newErrors: Record<string, string> = {};
    
    if (age < 73) newErrors.age = "RMDs start at age 73";
    if (age > 100) newErrors.age = "Age must be 100 or less";
    if (accountBalance <= 0) newErrors.accountBalance = "Balance must be greater than 0";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    let lifeExpectancyFactor = uniformLifetimeTable[age] || 6.4;
    
    // If spouse is sole beneficiary and more than 10 years younger, use Joint Life Expectancy Table
    if (hasYoungerSpouse && age - spouseAge > 10) {
      // Simplified joint table calculation
      lifeExpectancyFactor = lifeExpectancyFactor + (age - spouseAge - 10) * 0.5;
    }
    
    const rmd = accountBalance / lifeExpectancyFactor;
    
    setRmdAmount(rmd);
    setLifeExpectancy(lifeExpectancyFactor);
  };

  const handleReset = () => {
    setAge(73);
    setAccountBalance(500000);
    setSpouseAge(70);
    setHasYoungerSpouse(false);
    setErrors({});
  };

  const handleCopy = () => {
    const resultText = `RMD Calculator Results:
Age: ${age}
Account Balance: ${formatCurrency(accountBalance)}
Life Expectancy Factor: ${lifeExpectancy.toFixed(1)}
Required Minimum Distribution: ${formatCurrency(rmdAmount)}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <h1 className="text-3xl font-bold tracking-tight">RMD Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your Required Minimum Distribution from retirement accounts.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" /> RMD Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between">
                <Label htmlFor="age">Your Age</Label>
                {errors.age && <span className="text-sm text-red-500">{errors.age}</span>}
              </div>
              <Input
                id="age"
                type="number"
                className="mt-1.5"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[age]}
                max={100}
                min={73}
                step={1}
                onValueChange={(values) => setAge(values[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">RMDs begin at age 73</p>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between">
                <Label htmlFor="accountBalance">Account Balance (as of Dec 31)</Label>
                {errors.accountBalance && <span className="text-sm text-red-500">{errors.accountBalance}</span>}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="accountBalance"
                  type="number"
                  className="pl-10"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[accountBalance]}
                max={2000000}
                min={10000}
                step={10000}
                onValueChange={(values) => setAccountBalance(values[0])}
              />
            </div>

            <Separator />

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  id="hasYoungerSpouse"
                  checked={hasYoungerSpouse}
                  onChange={(e) => setHasYoungerSpouse(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="hasYoungerSpouse" className="cursor-pointer">
                  Spouse is sole beneficiary & 10+ years younger
                </Label>
              </div>
              
              {hasYoungerSpouse && (
                <div>
                  <Label htmlFor="spouseAge">Spouse's Age</Label>
                  <Input
                    id="spouseAge"
                    type="number"
                    className="mt-1.5"
                    value={spouseAge}
                    onChange={(e) => setSpouseAge(Number(e.target.value))}
                  />
                  <Slider
                    className="mt-2"
                    value={[spouseAge]}
                    max={age - 10}
                    min={age - 30}
                    step={1}
                    onValueChange={(values) => setSpouseAge(values[0])}
                  />
                </div>
              )}
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={rmdAmount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Your RMD for This Year
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary">
                    <h3 className="text-sm font-medium text-muted-foreground">Required Minimum Distribution</h3>
                    <div className="mt-2 text-4xl font-bold">
                      {formatCurrency(rmdAmount)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Must be withdrawn by December 31, {new Date().getFullYear()}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Account Balance</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {formatCurrency(accountBalance)}
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Life Expectancy Factor</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {lifeExpectancy.toFixed(1)} years
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">Percentage of Balance</h3>
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {accountBalance > 0 ? ((rmdAmount / accountBalance) * 100).toFixed(2) : 0}%
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Understanding RMDs</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">When RMDs Start</h3>
                <p className="text-muted-foreground text-sm">
                  As of 2024, RMDs begin at age 73. Your first RMD can be delayed until April 1 of the 
                  following year, but subsequent RMDs must be taken by December 31.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Penalty for Missing RMDs</h3>
                <p className="text-muted-foreground text-sm">
                  If you fail to take your full RMD, the IRS imposes a 25% penalty on the amount not 
                  withdrawn. This can be reduced to 10% if corrected promptly.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Which Accounts Require RMDs</h3>
                <p className="text-muted-foreground text-sm">
                  RMDs apply to Traditional IRAs, SEP IRAs, SIMPLE IRAs, 401(k)s, 403(b)s, and other 
                  defined contribution plans. Roth IRAs do not require RMDs during the owner's lifetime.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Tax Implications</h3>
                <p className="text-muted-foreground text-sm">
                  RMD withdrawals are generally taxed as ordinary income. You can withdraw more than the 
                  RMD amount, but excess withdrawals don't count toward future years' requirements.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RMDCalculator;
