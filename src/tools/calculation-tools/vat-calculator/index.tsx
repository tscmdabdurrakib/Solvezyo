import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, DollarSign, Percent, RefreshCw, Copy, Check, Receipt } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * VATCalculator Component
 * 
 * Calculate Value Added Tax for goods and services.
 * Supports both adding and removing VAT from prices.
 */
export function VATCalculator() {
  const [calculationType, setCalculationType] = useState<string>('add');
  const [amount, setAmount] = useState<number>(100);
  const [vatRate, setVatRate] = useState<number>(20);
  const [country, setCountry] = useState<string>('custom');
  
  const [netAmount, setNetAmount] = useState<number>(0);
  const [vatAmount, setVatAmount] = useState<number>(0);
  const [grossAmount, setGrossAmount] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Common VAT rates by country
  const vatRates: { [key: string]: number } = {
    'custom': vatRate,
    'uk': 20,
    'germany': 19,
    'france': 20,
    'spain': 21,
    'italy': 22,
    'netherlands': 21,
    'belgium': 21,
    'austria': 20,
    'poland': 23,
    'sweden': 25,
    'denmark': 25,
    'norway': 25,
    'switzerland': 7.7,
    'canada': 5,
    'australia': 10,
    'newzealand': 15,
  };

  useEffect(() => {
    if (country !== 'custom') {
      setVatRate(vatRates[country]);
    }
  }, [country]);

  useEffect(() => {
    calculateVAT();
  }, [calculationType, amount, vatRate]);

  /**
   * Calculate VAT
   * Adding VAT: Gross = Net × (1 + VAT rate)
   * Removing VAT: Net = Gross / (1 + VAT rate)
   */
  const calculateVAT = () => {
    const newErrors: Record<string, string> = {};
    
    if (amount <= 0) newErrors.amount = "Amount must be greater than 0";
    if (vatRate < 0 || vatRate > 100) newErrors.vatRate = "VAT rate must be between 0 and 100";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    const rate = vatRate / 100;
    
    if (calculationType === 'add') {
      // Add VAT to net amount
      const net = amount;
      const vat = net * rate;
      const gross = net + vat;
      
      setNetAmount(net);
      setVatAmount(vat);
      setGrossAmount(gross);
    } else {
      // Remove VAT from gross amount
      const gross = amount;
      const net = gross / (1 + rate);
      const vat = gross - net;
      
      setNetAmount(net);
      setVatAmount(vat);
      setGrossAmount(gross);
    }
  };

  const handleReset = () => {
    setCalculationType('add');
    setAmount(100);
    setVatRate(20);
    setCountry('custom');
    setErrors({});
  };

  const handleCopy = () => {
    const resultText = `VAT Calculator Results:
${calculationType === 'add' ? 'Net Amount' : 'Gross Amount'}: ${formatCurrency(amount)}
VAT Rate: ${vatRate}%
Net Amount: ${formatCurrency(netAmount)}
VAT Amount: ${formatCurrency(vatAmount)}
Gross Amount (Inc. VAT): ${formatCurrency(grossAmount)}`;
    
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
        <h1 className="text-3xl font-bold tracking-tight">VAT Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate Value Added Tax for goods and services with ease.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Receipt className="mr-2 h-5 w-5" /> VAT Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="calculationType">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add VAT to Net Amount</SelectItem>
                  <SelectItem value="remove">Remove VAT from Gross Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between">
                <Label htmlFor="amount">
                  {calculationType === 'add' ? 'Net Amount (Excl. VAT)' : 'Gross Amount (Incl. VAT)'}
                </Label>
                {errors.amount && <span className="text-sm text-red-500">{errors.amount}</span>}
              </div>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  className="pl-10"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <Slider
                className="mt-2"
                value={[amount]}
                max={10000}
                min={1}
                step={1}
                onValueChange={(values) => setAmount(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="country">Select Country / Region</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom Rate</SelectItem>
                  <SelectItem value="uk">United Kingdom (20%)</SelectItem>
                  <SelectItem value="germany">Germany (19%)</SelectItem>
                  <SelectItem value="france">France (20%)</SelectItem>
                  <SelectItem value="spain">Spain (21%)</SelectItem>
                  <SelectItem value="italy">Italy (22%)</SelectItem>
                  <SelectItem value="netherlands">Netherlands (21%)</SelectItem>
                  <SelectItem value="belgium">Belgium (21%)</SelectItem>
                  <SelectItem value="austria">Austria (20%)</SelectItem>
                  <SelectItem value="poland">Poland (23%)</SelectItem>
                  <SelectItem value="sweden">Sweden (25%)</SelectItem>
                  <SelectItem value="denmark">Denmark (25%)</SelectItem>
                  <SelectItem value="norway">Norway (25%)</SelectItem>
                  <SelectItem value="switzerland">Switzerland (7.7%)</SelectItem>
                  <SelectItem value="canada">Canada GST (5%)</SelectItem>
                  <SelectItem value="australia">Australia GST (10%)</SelectItem>
                  <SelectItem value="newzealand">New Zealand GST (15%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex justify-between">
                <Label htmlFor="vatRate">VAT Rate (%)</Label>
                {errors.vatRate && <span className="text-sm text-red-500">{errors.vatRate}</span>}
              </div>
              <div className="relative mt-1.5">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="vatRate"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  disabled={country !== 'custom'}
                />
              </div>
              <Slider
                className="mt-2"
                value={[vatRate]}
                max={30}
                min={0}
                step={0.1}
                onValueChange={(values) => setVatRate(values[0])}
                disabled={country !== 'custom'}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={grossAmount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> VAT Breakdown
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Net Amount (Excl. VAT)</h3>
                    <div className="mt-1 text-3xl font-bold">
                      {formatCurrency(netAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-amber-900 dark:text-amber-100">VAT Amount ({vatRate}%)</h3>
                    <div className="mt-1 text-3xl font-bold text-amber-600 dark:text-amber-400">
                      {formatCurrency(vatAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary">
                    <h3 className="text-sm font-medium text-muted-foreground">Gross Amount (Incl. VAT)</h3>
                    <div className="mt-1 text-3xl font-bold">
                      {formatCurrency(grossAmount)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Understanding VAT</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-lg mb-2">What is VAT?</h3>
                <p className="text-muted-foreground text-sm">
                  Value Added Tax (VAT) is a consumption tax placed on goods and services at each stage of 
                  the supply chain. It's collected by businesses on behalf of the government.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">VAT vs Sales Tax</h3>
                <p className="text-muted-foreground text-sm">
                  Unlike sales tax (used in the US), VAT is collected incrementally throughout production. 
                  It's commonly used in Europe and over 160 countries worldwide.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">B2B Transactions</h3>
                <p className="text-muted-foreground text-sm">
                  In business-to-business transactions, VAT-registered businesses can typically reclaim VAT 
                  paid on purchases, making it a pass-through tax for businesses.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Different Rates</h3>
                <p className="text-muted-foreground text-sm">
                  Most countries have multiple VAT rates: standard rate for most goods, reduced rates for 
                  essentials like food and books, and zero rate for certain items.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default VATCalculator;
