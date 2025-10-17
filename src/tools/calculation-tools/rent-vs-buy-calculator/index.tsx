import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw, DollarSign, Home, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export function RentVsBuyCalculator() {
  const { toast } = useToast();

  // Buying inputs
  const [homePrice, setHomePrice] = useState<number>(350000);
  const [downPayment, setDownPayment] = useState<number>(70000);
  const [mortgageRate, setMortgageRate] = useState<number>(6.0);
  const [propertyTax, setPropertyTax] = useState<number>(4000);
  const [homeInsurance, setHomeInsurance] = useState<number>(1200);
  const [hoaFees, setHOAFees] = useState<number>(0);
  const [maintenance, setMaintenance] = useState<number>(3000);
  
  // Renting inputs
  const [monthlyRent, setMonthlyRent] = useState<number>(2200);
  const [rentersInsurance, setRentersInsurance] = useState<number>(200);
  const [rentIncrease, setRentIncrease] = useState<number>(3);
  
  // Common inputs
  const [years, setYears] = useState<number>(7);
  const [homeAppreciation, setHomeAppreciation] = useState<number>(3);
  
  // Results
  const [buyingCost, setBuyingCost] = useState<number>(0);
  const [rentingCost, setRentingCost] = useState<number>(0);
  const [monthlyBuyCost, setMonthlyBuyCost] = useState<number>(0);

  useEffect(() => {
    calculate();
  }, [homePrice, downPayment, mortgageRate, propertyTax, homeInsurance, hoaFees, maintenance, monthlyRent, rentersInsurance, rentIncrease, years, homeAppreciation]);

  const calculate = () => {
    // Calculate monthly mortgage
    const loanAmount = homePrice - downPayment;
    const monthlyRate = mortgageRate / 100 / 12;
    const payments = 30 * 12;
    
    let mortgage = 0;
    if (monthlyRate === 0) {
      mortgage = loanAmount / payments;
    } else {
      const x = Math.pow(1 + monthlyRate, payments);
      mortgage = (loanAmount * monthlyRate * x) / (x - 1);
    }
    
    // Monthly buying costs
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyHOA = hoaFees / 12;
    const monthlyMaintenance = maintenance / 12;
    const totalMonthlyBuying = mortgage + monthlyPropertyTax + monthlyInsurance + monthlyHOA + monthlyMaintenance;
    
    // Total buying cost over years
    let totalBuying = downPayment + (totalMonthlyBuying * 12 * years);
    
    // Subtract home appreciation
    const futureHomeValue = homePrice * Math.pow(1 + homeAppreciation / 100, years);
    const remainingLoan = loanAmount; // Simplified
    const equity = futureHomeValue - remainingLoan;
    totalBuying -= equity;
    
    // Total renting cost over years
    let totalRenting = rentersInsurance;
    let currentRent = monthlyRent;
    for (let i = 0; i < years; i++) {
      totalRenting += currentRent * 12;
      currentRent *= (1 + rentIncrease / 100);
    }
    
    setBuyingCost(totalBuying);
    setRentingCost(totalRenting);
    setMonthlyBuyCost(totalMonthlyBuying);
  };

  const handleReset = () => {
    setHomePrice(350000);
    setDownPayment(70000);
    setMortgageRate(6.0);
    setPropertyTax(4000);
    setHomeInsurance(1200);
    setHOAFees(0);
    setMaintenance(3000);
    setMonthlyRent(2200);
    setRentersInsurance(200);
    setRentIncrease(3);
    setYears(7);
    setHomeAppreciation(3);
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
    const savings = rentingCost - buyingCost;
    const recommendation = buyingCost < rentingCost ? 'Buying' : 'Renting';
    const result = `Rent vs Buy Analysis (${years} years):

BUYING:
Total Cost: ${formatCurrency(buyingCost)}
Monthly Payment: ${formatCurrency(monthlyBuyCost)}

RENTING:
Total Cost: ${formatCurrency(rentingCost)}
Current Monthly Rent: ${formatCurrency(monthlyRent)}

Savings: ${formatCurrency(Math.abs(savings))}
Recommendation: ${recommendation} is ${Math.abs(savings)} cheaper`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Analysis copied to clipboard",
    });
  };

  const savings = rentingCost - buyingCost;
  const isBuyingCheaper = buyingCost < rentingCost;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Rent vs. Buy Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Compare the costs of renting vs buying a home
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-7">
          <Tabs defaultValue="buy">
            <TabsList className="mb-4">
              <TabsTrigger value="buy">Buying</TabsTrigger>
              <TabsTrigger value="rent">Renting</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buy" className="space-y-4">
              <div>
                <Label htmlFor="price">Home Price</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="price" type="number" className="pl-10" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
                </div>
                <Slider className="mt-2" value={[homePrice]} max={1000000} step={10000} onValueChange={(v) => setHomePrice(v[0])} />
              </div>
              
              <div>
                <Label>Down Payment</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input type="number" className="pl-10" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
                </div>
              </div>
              
              <div>
                <Label>Mortgage Rate (%)</Label>
                <Input type="number" step="0.1" value={mortgageRate} onChange={(e) => setMortgageRate(Number(e.target.value))} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Annual Property Tax</Label>
                  <Input type="number" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Home Insurance</Label>
                  <Input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Monthly HOA</Label>
                  <Input type="number" value={hoaFees} onChange={(e) => setHOAFees(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Annual Maintenance</Label>
                  <Input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rent" className="space-y-4">
              <div>
                <Label>Monthly Rent</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input type="number" className="pl-10" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
                </div>
                <Slider className="mt-2" value={[monthlyRent]} max={5000} step={50} onValueChange={(v) => setMonthlyRent(v[0])} />
              </div>
              
              <div>
                <Label>Annual Renters Insurance</Label>
                <Input type="number" value={rentersInsurance} onChange={(e) => setRentersInsurance(Number(e.target.value))} />
              </div>
              
              <div>
                <Label>Annual Rent Increase (%)</Label>
                <Input type="number" step="0.1" value={rentIncrease} onChange={(e) => setRentIncrease(Number(e.target.value))} />
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div>
                <Label>Time Period (years)</Label>
                <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <Slider className="mt-2" value={[years]} max={30} step={1} onValueChange={(v) => setYears(v[0])} />
              </div>
              
              <div>
                <Label>Home Appreciation Rate (%)</Label>
                <Input type="number" step="0.1" value={homeAppreciation} onChange={(e) => setHomeAppreciation(Number(e.target.value))} />
              </div>
              
              <Button onClick={handleReset} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset All
              </Button>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="md:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{years}-Year Comparison</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Cost of Buying</h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(buyingCost)}
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Cost of Renting</h3>
                    <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(rentingCost)}
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-lg border ${isBuyingCheaper
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                    : 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className={`h-5 w-5 ${isBuyingCheaper ? 'text-green-600' : 'text-orange-600'}`} />
                      <h3 className={`text-sm font-medium ${isBuyingCheaper 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-orange-800 dark:text-orange-200'}`}>
                        {isBuyingCheaper ? 'Buying Saves' : 'Renting Saves'}
                      </h3>
                    </div>
                    <div className={`text-3xl font-bold ${isBuyingCheaper 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-orange-600 dark:text-orange-400'}`}>
                      {formatCurrency(Math.abs(savings))}
                    </div>
                    <p className={`text-xs mt-1 ${isBuyingCheaper 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-orange-600 dark:text-orange-400'}`}>
                      Over {years} years
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Key Considerations</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Results vary based on time period and location</p>
              <p>• Buying builds equity, renting offers flexibility</p>
              <p>• Consider career stability and lifestyle needs</p>
              <p>• Break-even typically occurs after 5-7 years</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RentVsBuyCalculator;
