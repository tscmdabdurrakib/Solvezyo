import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [compoundFreq, setCompoundFreq] = useState<string>('1');
  const [interestType, setInterestType] = useState<string>('simple');
  const [simpleInterest, setSimpleInterest] = useState<number | null>(null);
  const [compoundInterest, setCompoundInterest] = useState<number | null>(null);
  const [finalAmount, setFinalAmount] = useState<number | null>(null);

  // FORMULA: 
  // Simple Interest = P * r * t
  // Compound Interest = P * (1 + r/n)^(n*t) - P
  // P = Principal amount
  // r = Annual interest rate (decimal)
  // t = Time in years
  // n = Compound frequency per year
  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100; // Convert percentage to decimal
    const t = parseFloat(time);
    const n = parseFloat(compoundFreq);
    
    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r < 0 || t <= 0) {
      setSimpleInterest(null);
      setCompoundInterest(null);
      setFinalAmount(null);
      return;
    }

    if (interestType === 'simple') {
      // Simple Interest calculation
      const interest = p * r * t;
      const total = p + interest;
      
      setSimpleInterest(interest);
      setCompoundInterest(null);
      setFinalAmount(total);
    } else {
      // Compound Interest calculation
      const amount = p * Math.pow(1 + (r / n), n * t);
      const interest = amount - p;
      
      setCompoundInterest(interest);
      setSimpleInterest(null);
      setFinalAmount(amount);
    }
  };

  const resetForm = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompoundFreq('1');
    setInterestType('simple');
    setSimpleInterest(null);
    setCompoundInterest(null);
    setFinalAmount(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold">Interest Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate simple or compound interest on your investments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="interestType">Interest Type</Label>
          <Select value={interestType} onValueChange={setInterestType}>
            <SelectTrigger data-testid="select-interest-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple Interest</SelectItem>
              <SelectItem value="compound">Compound Interest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="principal">Principal Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              placeholder="Enter principal amount"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              data-testid="input-principal"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate (% per year)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              placeholder="Enter interest rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              data-testid="input-rate"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time">Time Period (Years)</Label>
            <Input
              id="time"
              type="number"
              placeholder="Enter time in years"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              data-testid="input-time"
            />
          </div>
          {interestType === 'compound' && (
            <div className="space-y-2">
              <Label htmlFor="compoundFreq">Compound Frequency</Label>
              <Select value={compoundFreq} onValueChange={setCompoundFreq}>
                <SelectTrigger data-testid="select-compound-freq">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually (1/year)</SelectItem>
                  <SelectItem value="2">Semi-annually (2/year)</SelectItem>
                  <SelectItem value="4">Quarterly (4/year)</SelectItem>
                  <SelectItem value="12">Monthly (12/year)</SelectItem>
                  <SelectItem value="365">Daily (365/year)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={calculateInterest} 
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

        {(simpleInterest !== null || compoundInterest !== null) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-muted rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-3">Calculation Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Principal Amount:</span>
                <span className="font-semibold" data-testid="result-principal">
                  ${parseFloat(principal).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{interestType === 'simple' ? 'Simple' : 'Compound'} Interest:</span>
                <span className="font-bold text-lg text-green-600" data-testid="result-interest">
                  ${(simpleInterest || compoundInterest)?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Final Amount:</span>
                <span className="font-bold text-lg" data-testid="result-final-amount">
                  ${finalAmount?.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
