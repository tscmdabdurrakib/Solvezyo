import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Car } from "lucide-react";
import { motion } from "framer-motion";

export default function AutoLoanCalculator() {
  const [carPrice, setCarPrice] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);

  // FORMULA: Loan Amount = Car Price - Down Payment
  // Monthly Payment = P * [r(1+r)^n] / [(1+r)^n - 1]
  // P = Principal loan amount (Car Price - Down Payment)
  // r = Monthly interest rate (annual rate / 12)
  // n = Number of monthly payments (years * 12)
  const calculateAutoLoan = () => {
    const price = parseFloat(carPrice);
    const down = parseFloat(downPayment) || 0;
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);
    
    if (isNaN(price) || isNaN(annualRate) || isNaN(years) || price <= 0 || down < 0 || annualRate < 0 || years <= 0) {
      setMonthlyPayment(null);
      setTotalPayment(null);
      setTotalInterest(null);
      setLoanAmount(null);
      return;
    }

    const principal = price - down;
    
    if (principal <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(down);
      setTotalInterest(0);
      setLoanAmount(0);
      return;
    }

    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;
    
    let monthly: number;
    
    if (monthlyRate === 0) {
      monthly = principal / numberOfPayments;
    } else {
      monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }
    
    const total = monthly * numberOfPayments;
    const interest = total - principal;
    
    setLoanAmount(principal);
    setMonthlyPayment(monthly);
    setTotalPayment(total + down);
    setTotalInterest(interest);
  };

  const resetForm = () => {
    setCarPrice('');
    setDownPayment('');
    setInterestRate('');
    setLoanTerm('');
    setMonthlyPayment(null);
    setTotalPayment(null);
    setTotalInterest(null);
    setLoanAmount(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Car className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold">Auto Loan Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate your car loan payments including down payment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="carPrice">Car Price ($)</Label>
            <Input
              id="carPrice"
              type="number"
              placeholder="Enter car price"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
              data-testid="input-car-price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="downPayment">Down Payment ($)</Label>
            <Input
              id="downPayment"
              type="number"
              placeholder="Enter down payment"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              data-testid="input-down-payment"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              placeholder="Enter interest rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              data-testid="input-interest-rate"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (Years)</Label>
            <Input
              id="loanTerm"
              type="number"
              placeholder="Enter loan term"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              data-testid="input-loan-term"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={calculateAutoLoan} 
            className="flex-1"
            data-testid="button-calculate"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate
          </Button>
          <Button 
            onClick={resetForm} 
            variant="outline"
            data-testid="button-reset"
          >
            Reset
          </Button>
        </div>

        {monthlyPayment !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-muted rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-3">Calculation Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Loan Amount:</span>
                <span className="font-semibold" data-testid="result-loan-amount">
                  ${loanAmount?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Payment:</span>
                <span className="font-bold text-lg" data-testid="result-monthly-payment">
                  ${monthlyPayment.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount Paid:</span>
                <span className="font-semibold" data-testid="result-total-payment">
                  ${totalPayment?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest:</span>
                <span className="font-semibold text-orange-600" data-testid="result-total-interest">
                  ${totalInterest?.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
