import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, DollarSign, Percent, RefreshCw, MapPin, PlusCircle, MinusCircle, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaxComponent {
  name: string;
  rate: number | '';
}

export function SalesTaxCalculator() {
  const [calculationMode, setCalculationMode] = useState('forward');
  
  // Core Inputs
  const [originalPrice, setOriginalPrice] = useState<number | ''>(100);
  const [salesTaxRate, setSalesTaxRate] = useState<number | ''>(10);
  const [totalPrice, setTotalPrice] = useState<number | ''>('');
  
  // Outputs
  const [salesTaxAmount, setSalesTaxAmount] = useState<number | ''>('');
  const [priceAfterTaxes, setPriceAfterTaxes] = useState<number | ''>('');

  // Advanced Features
  const [location, setLocation] = useState('');
  const [taxComponents, setTaxComponents] = useState<TaxComponent[]>([{ name: 'State Tax', rate: 4.5 }, { name: 'County Tax', rate: 2.0 }]);
  const [discount, setDiscount] = useState<number | ''>('');
  const [fee, setFee] = useState<number | ''>('');
  const [discountType, setDiscountType] = useState<'percent' | 'amount'>('percent');
  const [feeType, setFeeType] = useState<'pre-tax' | 'post-tax'>('pre-tax');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  const handleAddComponent = () => {
    setTaxComponents([...taxComponents, { name: '', rate: '' }]);
  };

  const handleRemoveComponent = (index: number) => {
    const newComponents = taxComponents.filter((_, i) => i !== index);
    setTaxComponents(newComponents);
  };

  const handleComponentChange = (index: number, field: 'name' | 'rate', value: string) => {
    const newComponents = [...taxComponents];
    if (field === 'rate') {
      newComponents[index][field] = value === '' ? '' : parseFloat(value);
    } else {
      newComponents[index][field] = value;
    }
    setTaxComponents(newComponents);
  };

  const calculateTotalTaxRate = () => {
    return taxComponents.reduce((total, component) => total + (Number(component.rate) || 0), 0);
  };

  useEffect(() => {
    const totalRate = calculateTotalTaxRate();
    setSalesTaxRate(totalRate);
  }, [taxComponents]);

  useEffect(() => {
    calculate();
  }, [originalPrice, salesTaxRate, totalPrice, calculationMode, discount, fee, discountType, feeType]);

  const formatCurrency = (value: number | '') => {
    if (value === '' || isNaN(Number(value))) return `${currencySymbol}0.00`;
    return `${currencySymbol}${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const parseInput = (value: string) => {
    const number = parseFloat(value.replace(/[^0-9.-]+/g,""));
    return isNaN(number) ? '' : number;
  };

  const calculate = () => {
    let basePrice = Number(originalPrice) || 0;
    let finalTaxAmount = 0;
    let finalTotalPrice = 0;

    // Apply Discount
    let discountAmount = 0;
    if (discount !== '') {
      if (discountType === 'percent') {
        discountAmount = basePrice * (Number(discount) / 100);
      } else {
        discountAmount = Number(discount);
      }
      basePrice -= discountAmount;
    }
    
    const rate = Number(salesTaxRate) || 0;

    if (calculationMode === 'forward') {
      finalTaxAmount = basePrice * (rate / 100);
      finalTotalPrice = basePrice + finalTaxAmount;
    } else if (calculationMode === 'reverse') {
      const total = Number(totalPrice) || 0;
      basePrice = total / (1 + rate / 100);
      finalTaxAmount = total - basePrice;
      setOriginalPrice(parseFloat(basePrice.toFixed(2)));
      finalTotalPrice = total;
    } else if (calculationMode === 'rate') {
      const total = Number(totalPrice) || 0;
      if (basePrice > 0) {
        finalTaxAmount = total - basePrice;
        const calculatedRate = (finalTaxAmount / basePrice) * 100;
        setSalesTaxRate(parseFloat(calculatedRate.toFixed(2)));
        finalTotalPrice = total;
      }
    }

    // Apply Fee
    if (fee !== '') {
      if (feeType === 'pre-tax') {
        finalTaxAmount += (Number(fee) * (rate / 100));
        finalTotalPrice += Number(fee) * (1 + rate / 100);
      } else { // post-tax
        finalTotalPrice += Number(fee);
      }
    }

    setSalesTaxAmount(parseFloat(finalTaxAmount.toFixed(2)));
    setPriceAfterTaxes(parseFloat(finalTotalPrice.toFixed(2)));
  };

  const handleReset = () => {
    setOriginalPrice(100);
    setSalesTaxRate(10);
    setTotalPrice('');
    setSalesTaxAmount('');
    setPriceAfterTaxes('');
    setLocation('');
    setTaxComponents([{ name: 'State Tax', rate: 4.5 }, { name: 'County Tax', rate: 2.0 }]);
    setDiscount('');
    setFee('');
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Sales Tax Calculator</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          A highly accurate, versatile, and professional tool for all your sales tax calculation needs.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><DollarSign className="mr-2 h-5 w-5" /> Calculation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="forward" className="w-full" onValueChange={setCalculationMode}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="forward">Forward</TabsTrigger>
                  <TabsTrigger value="reverse">Reverse</TabsTrigger>
                  <TabsTrigger value="rate">Rate</TabsTrigger>
                </TabsList>
                <TabsContent value="forward" className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input id="originalPrice" value={originalPrice} onChange={e => setOriginalPrice(parseInput(e.target.value))} placeholder="e.g., 100.00" />
                  </div>
                  <div>
                    <Label htmlFor="salesTaxRate">Sales Tax Rate (%)</Label>
                    <Input id="salesTaxRate" value={salesTaxRate} onChange={e => setSalesTaxRate(parseInput(e.target.value))} placeholder="e.g., 10" />
                  </div>
                </TabsContent>
                <TabsContent value="reverse" className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="totalPrice">Total Price (Post-Tax)</Label>
                    <Input id="totalPrice" value={totalPrice} onChange={e => setTotalPrice(parseInput(e.target.value))} placeholder="e.g., 110.00" />
                  </div>
                   <div>
                    <Label htmlFor="salesTaxRateRev">Sales Tax Rate (%)</Label>
                    <Input id="salesTaxRateRev" value={salesTaxRate} onChange={e => setSalesTaxRate(parseInput(e.target.value))} placeholder="e.g., 10" />
                  </div>
                </TabsContent>
                <TabsContent value="rate" className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="originalPriceRate">Original Price</Label>
                    <Input id="originalPriceRate" value={originalPrice} onChange={e => setOriginalPrice(parseInput(e.target.value))} placeholder="e.g., 100.00" />
                  </div>
                  <div>
                    <Label htmlFor="totalPriceRate">Total Price (Post-Tax)</Label>
                    <Input id="totalPriceRate" value={totalPrice} onChange={e => setTotalPrice(parseInput(e.target.value))} placeholder="e.g., 110.00" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> Location-Based Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="location">City/State/Country or Postal Code</Label>
              <Input id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., New York, NY or 10001" />
              <p className="text-xs text-muted-foreground mt-2">
                <strong>Disclaimer:</strong> The rate is an estimate. Rates can vary by specific address.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Percent className="mr-2 h-5 w-5" /> Tax Rate Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {taxComponents.map((comp, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={comp.name} onChange={e => handleComponentChange(index, 'name', e.target.value)} placeholder="e.g., State Tax" className="flex-grow" />
                  <Input value={comp.rate} onChange={e => handleComponentChange(index, 'rate', e.target.value)} placeholder="Rate %" className="w-24" type="number" />
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveComponent(index)} disabled={taxComponents.length <= 1}>
                    <MinusCircle className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={handleAddComponent} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Component
              </Button>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Discounts & Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input value={discount} onChange={e => setDiscount(parseInput(e.target.value))} placeholder="Discount" />
                <Select value={discountType} onValueChange={(v: 'percent' | 'amount') => setDiscountType(v)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">%</SelectItem>
                    <SelectItem value="amount">{currencySymbol}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div className="flex items-center gap-2">
                <Input value={fee} onChange={e => setFee(parseInput(e.target.value))} placeholder="Fixed Fee" />
                <Select value={feeType} onValueChange={(v: 'pre-tax' | 'post-tax') => setFeeType(v)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-tax">Pre-Tax</SelectItem>
                    <SelectItem value="post-tax">Post-Tax</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleReset} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset All
          </Button>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center"><Info className="mr-2 h-5 w-5" /> Calculation Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Original Price</h3>
                  <div className="mt-1 text-3xl font-bold">
                    {calculationMode === 'reverse' ? formatCurrency(originalPrice) : formatCurrency(Number(originalPrice))}
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Tax Rate</h3>
                  <div className="mt-1 text-3xl font-bold">
                    {salesTaxRate}%
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Sales Tax Amount</h3>
                <div className="mt-1 text-4xl font-bold text-primary">
                  {formatCurrency(salesTaxAmount)}
                </div>
                {taxComponents.length > 1 && (
                  <div className="mt-3 space-y-1 text-sm">
                    {taxComponents.map((comp, index) => {
                      const base = Number(originalPrice) || 0;
                      const componentTax = base * (Number(comp.rate) / 100);
                      return (
                        <div key={index} className="flex justify-between">
                          <span>{comp.name} ({comp.rate}%)</span>
                          <span>{formatCurrency(componentTax)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="border-t my-4"></div>

              <div className="space-y-2 text-lg">
                <div className="flex justify-between font-medium">
                  <span>Original Price</span>
                  <span>{formatCurrency(Number(originalPrice))}</span>
                </div>
                {discount !== '' && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Discount</span>
                    <span>-{formatCurrency(Number(originalPrice) * (Number(discount)/100))}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium">
                  <span>+ Total Tax</span>
                  <span>{formatCurrency(salesTaxAmount)}</span>
                </div>
                {fee !== '' && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>+ Fee</span>
                    <span>{formatCurrency(Number(fee))}</span>
                  </div>
                )}
              </div>

              <div className="bg-primary text-primary-foreground p-6 rounded-lg mt-4">
                <h3 className="text-lg font-medium">Total Price (Post-Tax)</h3>
                <div className="mt-1 text-5xl font-bold tracking-tight">
                  {formatCurrency(priceAfterTaxes)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SalesTaxCalculator;
