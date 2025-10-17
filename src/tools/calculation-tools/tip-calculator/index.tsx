import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * TipCalculator Component
 * 
 * Calculates tip amount, total bill, and per-person splits
 */
export function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>('100');
  const [tipPercentage, setTipPercentage] = useState<string>('15');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');
  const [customTip, setCustomTip] = useState<string>('');
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [perPersonAmount, setPerPersonAmount] = useState<number>(0);
  const [perPersonTip, setPerPersonTip] = useState<number>(0);
  const { toast } = useToast();

  // Calculate tip when inputs change
  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople, customTip]);

  // Function to calculate tip and totals
  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tipPercent = customTip ? parseFloat(customTip) : parseFloat(tipPercentage) || 0;
    const people = parseInt(numberOfPeople) || 1;

    // Calculate tip amount: bill * (tipPercent / 100)
    const tip = bill * (tipPercent / 100);
    const total = bill + tip;
    const perPerson = total / people;
    const tipPerPerson = tip / people;

    setTipAmount(tip);
    setTotalAmount(total);
    setPerPersonAmount(perPerson);
    setPerPersonTip(tipPerPerson);
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
    setBillAmount('100');
    setTipPercentage('15');
    setNumberOfPeople('1');
    setCustomTip('');
  };

  // Function to select preset tip
  const selectPresetTip = (percent: string) => {
    setTipPercentage(percent);
    setCustomTip('');
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Tip Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate tip amount, total bill, and split between people
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Bill Details
          </h2>
          
          <div className="space-y-4">
            {/* Bill Amount */}
            <div>
              <Label htmlFor="billAmount">Bill Amount ($)</Label>
              <Input
                id="billAmount"
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="Enter bill amount"
                className="mt-2"
                min="0"
                step="0.01"
              />
            </div>

            {/* Tip Percentage Presets */}
            <div>
              <Label>Tip Percentage</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {['10', '15', '18', '20'].map((percent) => (
                  <Button
                    key={percent}
                    variant={tipPercentage === percent && !customTip ? 'default' : 'outline'}
                    onClick={() => selectPresetTip(percent)}
                    className="w-full"
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Tip */}
            <div>
              <Label htmlFor="customTip">Custom Tip (%)</Label>
              <Input
                id="customTip"
                type="number"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Enter custom tip percentage"
                className="mt-2"
                min="0"
                step="0.1"
              />
            </div>

            {/* Number of People */}
            <div>
              <Label htmlFor="numberOfPeople">Number of People</Label>
              <Input
                id="numberOfPeople"
                type="number"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                placeholder="Enter number of people"
                className="mt-2"
                min="1"
                step="1"
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
              <DollarSign className="mr-2 h-5 w-5" /> Calculation Results
            </h2>
            
            <div className="grid gap-4">
              {/* Tip Amount */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Tip Amount</h3>
                    <div className="text-4xl font-bold">
                      {formatCurrency(tipAmount)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(tipAmount.toFixed(2), 'Tip Amount')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Bill</h3>
                    <div className="text-4xl font-bold">
                      {formatCurrency(totalAmount)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalAmount.toFixed(2), 'Total Amount')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Per Person Section */}
              {parseInt(numberOfPeople) > 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                          <Users className="mr-1 h-4 w-4" /> Per Person Total
                        </h3>
                        <div className="mt-1 text-2xl font-bold">
                          {formatCurrency(perPersonAmount)}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(perPersonAmount.toFixed(2), 'Per Person Amount')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                          <Users className="mr-1 h-4 w-4" /> Per Person Tip
                        </h3>
                        <div className="mt-1 text-2xl font-bold">
                          {formatCurrency(perPersonTip)}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(perPersonTip.toFixed(2), 'Per Person Tip')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Tip Calculator</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Quick Presets</h3>
              <p className="text-muted-foreground text-sm">
                Choose from common tip percentages (10%, 15%, 18%, 20%) or enter your own custom amount.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Split Bills</h3>
              <p className="text-muted-foreground text-sm">
                Easily divide the total bill and tip among multiple people for group dining.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Instant Calculation</h3>
              <p className="text-muted-foreground text-sm">
                Real-time updates as you type, so you can quickly see the tip and total amounts.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TipCalculator;
