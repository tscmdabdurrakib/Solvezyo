import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Percent, Calendar, Landmark } from 'lucide-react';

const CompoundInterestCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [annualContribution, setAnnualContribution] = useState<string>('1200');
  const [interestRate, setInterestRate] = useState<string>('7');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('annually');
  const [timePeriod, setTimePeriod] = useState<string>('10');

  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    const principal = parseFloat(initialInvestment) || 0;
    const annualContrib = parseFloat(annualContribution) || 0;
    const rate = parseFloat(interestRate) / 100 || 0;
    const years = parseFloat(timePeriod) || 0;

    let n = 1;
    switch (compoundingFrequency) {
      case 'daily':
        n = 365;
        break;
      case 'monthly':
        n = 12;
        break;
      case 'quarterly':
        n = 4;
        break;
      case 'annually':
        n = 1;
        break;
    }

    // Formula for compound interest with contributions
    let futureValue = principal * Math.pow(1 + rate / n, n * years);
    let futureValueOfContributions = 0;
    if (annualContrib > 0) {
      const pmt = annualContrib / n; // contribution per compounding period
      futureValueOfContributions = pmt * ((Math.pow(1 + rate / n, n * years) - 1) / (rate / n));
    }
    
    const total = futureValue + futureValueOfContributions;
    const totalContribs = principal + (annualContrib * years);
    const interestEarned = total - totalContribs;

    setFinalAmount(total);
    setTotalContributions(totalContribs);
    setTotalInterest(interestEarned);

  }, [initialInvestment, annualContribution, interestRate, compoundingFrequency, timePeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <DollarSign className="mr-2 h-5 w-5" /> Investment Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="initialInvestment">Initial Investment</Label>
            <div className="relative mt-1.5">
              <Landmark className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="initialInvestment" type="number" className="pl-10" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} placeholder="e.g., 10000" />
            </div>
          </div>
          <div>
            <Label htmlFor="annualContribution">Annual Contribution</Label>
            <div className="relative mt-1.5">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="annualContribution" type="number" className="pl-10" value={annualContribution} onChange={(e) => setAnnualContribution(e.target.value)} placeholder="e.g., 1200" />
            </div>
          </div>
          <div>
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <div className="relative mt-1.5">
              <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="interestRate" type="number" className="pl-10" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 7" />
            </div>
          </div>
          <div>
            <Label htmlFor="timePeriod">Time Period (Years)</Label>
            <div className="relative mt-1.5">
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="timePeriod" type="number" className="pl-10" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} placeholder="e.g., 10" />
            </div>
          </div>
          <div>
            <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
            <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
              <SelectTrigger className="w-full mt-1.5">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          Results
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Final Amount</span>
            <span className="font-bold text-lg text-green-500">{formatCurrency(finalAmount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Contributions</span>
            <span className="font-bold text-lg">{formatCurrency(totalContributions)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Interest Earned</span>
            <span className="font-bold text-lg">{formatCurrency(totalInterest)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompoundInterestCalculator;
