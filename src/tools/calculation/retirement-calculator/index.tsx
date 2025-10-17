import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('');
  const [retirementAge, setRetirementAge] = useState<string>('');
  const [currentSavings, setCurrentSavings] = useState<string>('');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('');
  const [annualReturn, setAnnualReturn] = useState<string>('');
  const [retirementSavings, setRetirementSavings] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [interestEarned, setInterestEarned] = useState<number | null>(null);

  // FORMULA: Future Value of Annuity + Future Value of Present Value
  // FV = PV(1+r)^n + PMT[((1+r)^n - 1) / r]
  // PV = Present Value (current savings)
  // PMT = Payment (monthly contribution)
  // r = Monthly interest rate (annual rate / 12)
  // n = Number of months until retirement
  const calculateRetirement = () => {
    const currentAgeNum = parseFloat(currentAge);
    const retirementAgeNum = parseFloat(retirementAge);
    const presentValue = parseFloat(currentSavings) || 0;
    const monthlyPmt = parseFloat(monthlyContribution) || 0;
    const annualRate = parseFloat(annualReturn) / 100;
    
    if (isNaN(currentAgeNum) || isNaN(retirementAgeNum) || isNaN(annualRate) || 
        currentAgeNum < 0 || retirementAgeNum <= currentAgeNum || annualRate < 0) {
      setRetirementSavings(null);
      setTotalContributions(null);
      setInterestEarned(null);
      return;
    }

    const yearsToRetirement = retirementAgeNum - currentAgeNum;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyRate = annualRate / 12;
    
    // Future value of current savings
    const futureValueOfSavings = presentValue * Math.pow(1 + monthlyRate, monthsToRetirement);
    
    // Future value of monthly contributions (annuity)
    let futureValueOfContributions = 0;
    if (monthlyPmt > 0 && monthlyRate > 0) {
      futureValueOfContributions = monthlyPmt * ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate);
    } else if (monthlyPmt > 0 && monthlyRate === 0) {
      futureValueOfContributions = monthlyPmt * monthsToRetirement;
    }
    
    const totalSavings = futureValueOfSavings + futureValueOfContributions;
    const totalContrib = presentValue + (monthlyPmt * monthsToRetirement);
    const interestEarned = totalSavings - totalContrib;
    
    setRetirementSavings(totalSavings);
    setTotalContributions(totalContrib);
    setInterestEarned(interestEarned);
  };

  const resetForm = () => {
    setCurrentAge('');
    setRetirementAge('');
    setCurrentSavings('');
    setMonthlyContribution('');
    setAnnualReturn('');
    setRetirementSavings(null);
    setTotalContributions(null);
    setInterestEarned(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <PiggyBank className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold">Retirement Calculator</CardTitle>
        </div>
        <CardDescription>
          Estimate your retirement savings based on contributions and growth
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentAge">Current Age</Label>
            <Input
              id="currentAge"
              type="number"
              placeholder="Enter your current age"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              data-testid="input-current-age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="retirementAge">Retirement Age</Label>
            <Input
              id="retirementAge"
              type="number"
              placeholder="Enter retirement age"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              data-testid="input-retirement-age"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentSavings">Current Savings ($)</Label>
            <Input
              id="currentSavings"
              type="number"
              placeholder="Enter current savings"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              data-testid="input-current-savings"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              placeholder="Enter monthly contribution"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              data-testid="input-monthly-contribution"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
          <Input
            id="annualReturn"
            type="number"
            step="0.01"
            placeholder="Enter expected annual return"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            data-testid="input-annual-return"
          />
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={calculateRetirement} 
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

        {retirementSavings !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-muted rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-3">Retirement Projection</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Retirement Savings:</span>
                <span className="font-bold text-lg text-green-600" data-testid="result-retirement-savings">
                  ${retirementSavings.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Contributions:</span>
                <span className="font-semibold" data-testid="result-total-contributions">
                  ${totalContributions?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Interest Earned:</span>
                <span className="font-semibold text-blue-600" data-testid="result-interest-earned">
                  ${interestEarned?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-3 pt-2 border-t">
                <span>Years to Retirement:</span>
                <span>{parseFloat(retirementAge) - parseFloat(currentAge)} years</span>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
