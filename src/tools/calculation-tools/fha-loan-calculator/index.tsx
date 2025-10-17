import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, DollarSign, Percent, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * FHALoanCalculator Component
 * 
 * Calculate FHA loan payments with required mortgage insurance
 */
export function FHALoanCalculator() {
  const { toast } = useToast();

  const [homePrice, setHomePrice] = useState<number>(250000);
  const [downPayment, setDownPayment] = useState<number>(8750); // 3.5% minimum
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [upfrontMIP, setUpfrontMIP] = useState<number>(0);
  const [monthlyMIP, setMonthlyMIP] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  useEffect(() => {
    calculateFHA();
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const calculateFHA = () => {
    const loanAmount = homePrice - downPayment;
    
    // FHA Upfront Mortgage Insurance Premium (UFMIP) = 1.75% of base loan amount
    const ufmip = loanAmount * 0.0175;
    
    // Total financed amount (loan + UFMIP)
    const totalFinanced = loanAmount + ufmip;
    
    // Calculate base monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    
    let basePayment = 0;
    if (monthlyRate === 0) {
      basePayment = totalFinanced / payments;
    } else {
      const x = Math.pow(1 + monthlyRate, payments);
      basePayment = (totalFinanced * monthlyRate * x) / (x - 1);
    }
    
    // Monthly Mortgage Insurance Premium (MIP)
    // For loans > 15 years with LTV > 95%: 0.85% annual
    // For loans > 15 years with LTV <= 95%: 0.80% annual
    const ltv = (loanAmount / homePrice) * 100;
    const annualMIPRate = ltv > 95 ? 0.0085 : 0.0080;
    const mip = (loanAmount * annualMIPRate) / 12;
    
    // Total monthly payment
    const total = basePayment + mip;
    const totalCost = (total * payments) + ufmip;
    
    setMonthlyPayment(basePayment);
    setUpfrontMIP(ufmip);
    setMonthlyMIP(mip);
    setTotalPayment(total);
  };

  const handleReset = () => {
    setHomePrice(250000);
    setDownPayment(8750);
    setInterestRate(5.5);
    setLoanTerm(30);
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
    const result = `FHA Loan Analysis:
Home Price: ${formatCurrency(homePrice)}
Down Payment: ${formatCurrency(downPayment)} (${((downPayment/homePrice)*100).toFixed(1)}%)
Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years

Upfront MIP: ${formatCurrency(upfrontMIP)}
Monthly Payment: ${formatCurrency(monthlyPayment)}
Monthly MIP: ${formatCurrency(monthlyMIP)}
Total Monthly Payment: ${formatCurrency(totalPayment)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "FHA loan results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">FHA Loan Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate FHA loan payments with mortgage insurance premiums
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Home className="mr-2 h-5 w-5" /> FHA Loan Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="price">Home Price</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  className="pl-10"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[homePrice]}
                max={1000000}
                step={5000}
                onValueChange={(values) => setHomePrice(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="down">Down Payment (min 3.5%)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="down"
                  type="number"
                  className="pl-10"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[downPayment]}
                max={homePrice * 0.2}
                step={500}
                onValueChange={(values) => setDownPayment(values[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((downPayment/homePrice)*100).toFixed(1)}% of home price
              </p>
            </div>

            <div>
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="rate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[interestRate]}
                max={10}
                step={0.1}
                onValueChange={(values) => setInterestRate(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="term">Loan Term (years)</Label>
              <Input
                id="term"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[loanTerm]}
                max={30}
                step={5}
                onValueChange={(values) => setLoanTerm(values[0])}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
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
                  <h2 className="text-xl font-semibold">Payment Summary</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">Upfront MIP (1.75%)</h3>
                    <div className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {formatCurrency(upfrontMIP)}
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      Added to loan amount
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Base Monthly Payment</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(monthlyPayment)}
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Monthly MIP</h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(monthlyMIP)}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Total Monthly Payment</h3>
                    <div className="mt-1 text-4xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(totalPayment)}
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Principal + Interest + MIP
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">FHA Loan Benefits</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Low down payment: as little as 3.5%</p>
              <p>• More flexible credit requirements</p>
              <p>• Upfront MIP is 1.75% of base loan amount</p>
              <p>• Monthly MIP is required for most FHA loans</p>
              <p>• Competitive interest rates for first-time buyers</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FHALoanCalculator;
