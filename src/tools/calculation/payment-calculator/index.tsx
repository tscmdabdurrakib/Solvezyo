import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentCalculator() {
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [paymentFreq, setPaymentFreq] = useState<string>('monthly');
  const [timePeriod, setTimePeriod] = useState<string>('');
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [totalPayments, setTotalPayments] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  // FORMULA: Payment Amount = P * [r(1+r)^n] / [(1+r)^n - 1]
  // P = Principal amount
  // r = Interest rate per payment period
  // n = Total number of payments
  const calculatePayment = () => {
    const principal = parseFloat(totalAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(timePeriod);
    
    if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate < 0 || years <= 0) {
      setPaymentAmount(null);
      setTotalPayments(null);
      setTotalInterest(null);
      return;
    }

    let periodsPerYear: number;
    switch (paymentFreq) {
      case 'weekly':
        periodsPerYear = 52;
        break;
      case 'bi-weekly':
        periodsPerYear = 26;
        break;
      case 'monthly':
        periodsPerYear = 12;
        break;
      case 'quarterly':
        periodsPerYear = 4;
        break;
      case 'annually':
        periodsPerYear = 1;
        break;
      default:
        periodsPerYear = 12;
    }

    const periodRate = annualRate / periodsPerYear;
    const numberOfPayments = years * periodsPerYear;
    
    let payment: number;
    
    if (periodRate === 0) {
      payment = principal / numberOfPayments;
    } else {
      payment = principal * (periodRate * Math.pow(1 + periodRate, numberOfPayments)) / 
                (Math.pow(1 + periodRate, numberOfPayments) - 1);
    }
    
    const totalPaid = payment * numberOfPayments;
    const interest = totalPaid - principal;
    
    setPaymentAmount(payment);
    setTotalPayments(totalPaid);
    setTotalInterest(interest);
  };

  const resetForm = () => {
    setTotalAmount('');
    setInterestRate('');
    setPaymentFreq('monthly');
    setTimePeriod('');
    setPaymentAmount(null);
    setTotalPayments(null);
    setTotalInterest(null);
  };

  const getPaymentLabel = () => {
    switch (paymentFreq) {
      case 'weekly': return 'Weekly Payment';
      case 'bi-weekly': return 'Bi-Weekly Payment';
      case 'monthly': return 'Monthly Payment';
      case 'quarterly': return 'Quarterly Payment';
      case 'annually': return 'Annual Payment';
      default: return 'Payment Amount';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold">Payment Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate payment schedules for loans and debts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Amount ($)</Label>
            <Input
              id="totalAmount"
              type="number"
              placeholder="Enter total amount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              data-testid="input-total-amount"
            />
          </div>
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paymentFreq">Payment Frequency</Label>
            <Select value={paymentFreq} onValueChange={setPaymentFreq}>
              <SelectTrigger data-testid="select-payment-freq">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timePeriod">Time Period (Years)</Label>
            <Input
              id="timePeriod"
              type="number"
              placeholder="Enter time period"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              data-testid="input-time-period"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={calculatePayment} 
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

        {paymentAmount !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-muted rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-3">Calculation Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{getPaymentLabel()}:</span>
                <span className="font-bold text-lg" data-testid="result-payment-amount">
                  ${paymentAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount Paid:</span>
                <span className="font-semibold" data-testid="result-total-payments">
                  ${totalPayments?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest:</span>
                <span className="font-semibold text-orange-600" data-testid="result-total-interest">
                  ${totalInterest?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Payment Frequency:</span>
                <span>{paymentFreq.charAt(0).toUpperCase() + paymentFreq.slice(1)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
