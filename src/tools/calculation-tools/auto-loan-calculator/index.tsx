import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Car, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * AutoLoanCalculator Component
 * 
 * Calculate auto loan payments with trade-in, down payment, and sales tax
 */
export function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [amountOwed, setAmountOwed] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(7);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const { toast } = useToast();

  // Calculate payment when inputs change
  useEffect(() => {
    calculatePayment();
  }, [vehiclePrice, downPayment, tradeInValue, amountOwed, interestRate, loanTerm, salesTaxRate]);

  /**
   * Function to calculate auto loan payment
   * Includes sales tax, down payment, trade-in value, and amount owed on trade-in
   */
  const calculatePayment = () => {
    if (vehiclePrice <= 0 || interestRate < 0 || loanTerm <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      setLoanAmount(0);
      return;
    }

    // Calculate sales tax
    const salesTax = vehiclePrice * (salesTaxRate / 100);
    
    // Calculate total cost including tax
    const totalCost = vehiclePrice + salesTax;
    
    // Calculate net trade-in (trade-in value minus amount owed)
    const netTradeIn = tradeInValue - amountOwed;
    
    // Calculate loan amount (total cost - down payment - net trade-in)
    const principal = totalCost - downPayment - netTradeIn;
    
    setLoanAmount(principal);

    if (principal <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }

    // Convert annual interest rate to monthly rate
    const monthlyRate = (interestRate / 100) / 12;
    
    // Calculate number of payments (months)
    const numberOfPayments = loanTerm;

    // Calculate monthly payment using amortization formula
    let payment = 0;
    if (monthlyRate === 0) {
      payment = principal / numberOfPayments;
    } else {
      payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const total = payment * numberOfPayments;
    const interest = total - principal;

    setMonthlyPayment(payment);
    setTotalPayment(total);
    setTotalInterest(interest);
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
    setVehiclePrice(35000);
    setDownPayment(5000);
    setTradeInValue(0);
    setAmountOwed(0);
    setInterestRate(5.5);
    setLoanTerm(60);
    setSalesTaxRate(7);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Auto Loan Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate car loan payments with trade-in, down payment, and sales tax
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Car className="mr-2 h-5 w-5" /> Vehicle & Loan Details
          </h2>
          
          <div className="space-y-4">
            {/* Vehicle Price */}
            <div>
              <Label htmlFor="vehiclePrice">Vehicle Price ($)</Label>
              <Input
                id="vehiclePrice"
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(parseFloat(e.target.value) || 0)}
                min="0"
                step="100"
                className="mt-2"
              />
            </div>

            {/* Down Payment */}
            <div>
              <Label htmlFor="downPayment">Down Payment ($)</Label>
              <Input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
                min="0"
                step="100"
                className="mt-2"
              />
            </div>

            {/* Trade-In Value */}
            <div>
              <Label htmlFor="tradeInValue">Trade-In Value ($)</Label>
              <Input
                id="tradeInValue"
                type="number"
                value={tradeInValue}
                onChange={(e) => setTradeInValue(parseFloat(e.target.value) || 0)}
                min="0"
                step="100"
                className="mt-2"
              />
            </div>

            {/* Amount Owed on Trade-In */}
            <div>
              <Label htmlFor="amountOwed">Amount Owed on Trade-In ($)</Label>
              <Input
                id="amountOwed"
                type="number"
                value={amountOwed}
                onChange={(e) => setAmountOwed(parseFloat(e.target.value) || 0)}
                min="0"
                step="100"
                className="mt-2"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                step="0.1"
                className="mt-2"
              />
            </div>

            {/* Loan Term */}
            <div>
              <Label htmlFor="loanTerm">Loan Term (Months)</Label>
              <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(parseInt(value))}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24">24 months (2 years)</SelectItem>
                  <SelectItem value="36">36 months (3 years)</SelectItem>
                  <SelectItem value="48">48 months (4 years)</SelectItem>
                  <SelectItem value="60">60 months (5 years)</SelectItem>
                  <SelectItem value="72">72 months (6 years)</SelectItem>
                  <SelectItem value="84">84 months (7 years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sales Tax Rate */}
            <div>
              <Label htmlFor="salesTaxRate">Sales Tax Rate (%)</Label>
              <Input
                id="salesTaxRate"
                type="number"
                value={salesTaxRate}
                onChange={(e) => setSalesTaxRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
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
              <Calculator className="mr-2 h-5 w-5" /> Payment Summary
            </h2>
            
            {/* Primary Result */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Monthly Payment</h3>
                  <div className="text-4xl font-bold">
                    ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(monthlyPayment.toFixed(2), 'Monthly Payment')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Loan Amount */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(loanAmount.toFixed(2), 'Loan Amount')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Payment */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Paid</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalPayment.toFixed(2), 'Total Payment')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Interest */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalInterest.toFixed(2), 'Total Interest')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Sales Tax */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Sales Tax</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${(vehiclePrice * (salesTaxRate / 100)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((vehiclePrice * (salesTaxRate / 100)).toFixed(2), 'Sales Tax')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Net Trade-In */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Net Trade-In</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${(tradeInValue - amountOwed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((tradeInValue - amountOwed).toFixed(2), 'Net Trade-In')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Cost */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Cost (with Tax)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ${(vehiclePrice + vehiclePrice * (salesTaxRate / 100)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((vehiclePrice + vehiclePrice * (salesTaxRate / 100)).toFixed(2), 'Total Cost')}
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
          <h2 className="text-xl font-semibold mb-4">About Auto Loan Calculator</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Complete Calculation</h3>
              <p className="text-muted-foreground text-sm">
                Includes vehicle price, down payment, trade-in value, and sales tax for accurate loan estimates.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Trade-In Support</h3>
              <p className="text-muted-foreground text-sm">
                Account for your trade-in vehicle value and any remaining balance owed on it.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Tax Included</h3>
              <p className="text-muted-foreground text-sm">
                Automatically calculates sales tax to give you the true total cost of your vehicle purchase.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AutoLoanCalculator;
