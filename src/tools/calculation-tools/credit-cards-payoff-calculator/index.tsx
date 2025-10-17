import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Info, DollarSign, Percent, RefreshCw, CreditCard, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

interface CreditCard {
  id: number;
  name: string;
  balance: number;
  apr: number;
  minimumPayment: number;
}

/**
 * CreditCardsPayoffCalculator Component
 * 
 * Calculate optimal payoff strategy for multiple credit cards using 
 * avalanche (highest APR first) or snowball (lowest balance first) methods.
 */
export function CreditCardsPayoffCalculator() {
  // State for credit cards
  const [cards, setCards] = useState<CreditCard[]>([
    { id: 1, name: 'Card 1', balance: 5000, apr: 18.99, minimumPayment: 100 },
    { id: 2, name: 'Card 2', balance: 3000, apr: 22.99, minimumPayment: 60 },
  ]);
  
  // State for strategy
  const [payoffStrategy, setPayoffStrategy] = useState<string>('avalanche'); // 'avalanche' or 'snowball'
  const [monthlyBudget, setMonthlyBudget] = useState<number>(300);
  
  // State for calculated results
  const [totalDebt, setTotalDebt] = useState<number>(0);
  const [monthsToPayoff, setMonthsToPayoff] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  // Calculate payoff when inputs change
  useEffect(() => {
    calculatePayoff();
  }, [cards, payoffStrategy, monthlyBudget]);

  /**
   * Calculate optimal payoff using selected strategy
   */
  const calculatePayoff = () => {
    if (cards.length === 0 || monthlyBudget <= 0) return;
    
    // Calculate total minimum payments
    const totalMinimum = cards.reduce((sum, card) => sum + card.minimumPayment, 0);
    
    if (monthlyBudget < totalMinimum) {
      setMonthsToPayoff(999);
      setTotalInterest(999999);
      return;
    }
    
    // Create a copy of cards for simulation
    let remainingCards = cards.map(card => ({ ...card }));
    const debt = cards.reduce((sum, card) => sum + card.balance, 0);
    setTotalDebt(debt);
    
    // Sort cards based on strategy
    if (payoffStrategy === 'avalanche') {
      // Highest APR first
      remainingCards.sort((a, b) => b.apr - a.apr);
    } else {
      // Lowest balance first (snowball)
      remainingCards.sort((a, b) => a.balance - b.balance);
    }
    
    let months = 0;
    let totalInterestPaid = 0;
    const maxMonths = 600;
    const data = [];
    
    while (remainingCards.length > 0 && months < maxMonths) {
      months++;
      let budgetRemaining = monthlyBudget;
      
      // Pay minimum on all cards first
      remainingCards.forEach(card => {
        const monthlyRate = (card.apr / 100) / 12;
        const interest = card.balance * monthlyRate;
        totalInterestPaid += interest;
        
        const payment = Math.min(card.minimumPayment, card.balance + interest);
        card.balance = card.balance + interest - payment;
        budgetRemaining -= payment;
      });
      
      // Apply extra payment to target card (first in sorted list)
      if (budgetRemaining > 0 && remainingCards.length > 0) {
        const targetCard = remainingCards[0];
        const extraPayment = Math.min(budgetRemaining, targetCard.balance);
        targetCard.balance -= extraPayment;
      }
      
      // Remove paid-off cards
      remainingCards = remainingCards.filter(card => card.balance > 0.01);
      
      // Store data for chart (every 3 months)
      if (months % 3 === 0 || remainingCards.length === 0) {
        const totalRemaining = remainingCards.reduce((sum, card) => sum + card.balance, 0);
        data.push({
          month: `Month ${months}`,
          'Total Remaining': totalRemaining,
          'Total Interest': totalInterestPaid,
          'Cards Remaining': remainingCards.length,
        });
      }
    }
    
    setMonthsToPayoff(months);
    setTotalInterest(totalInterestPaid);
    setProjectionData(data);
  };

  // Add new card
  const handleAddCard = () => {
    const newCard: CreditCard = {
      id: Date.now(),
      name: `Card ${cards.length + 1}`,
      balance: 1000,
      apr: 18.99,
      minimumPayment: 25,
    };
    setCards([...cards, newCard]);
  };

  // Remove card
  const handleRemoveCard = (id: number) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  // Update card
  const handleUpdateCard = (id: number, field: keyof CreditCard, value: string | number) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  // Reset
  const handleReset = () => {
    setCards([
      { id: 1, name: 'Card 1', balance: 5000, apr: 18.99, minimumPayment: 100 },
      { id: 2, name: 'Card 2', balance: 3000, apr: 22.99, minimumPayment: 60 },
    ]);
    setPayoffStrategy('avalanche');
    setMonthlyBudget(300);
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const resultText = `Credit Cards Payoff Results (${payoffStrategy === 'avalanche' ? 'Avalanche Method' : 'Snowball Method'}):
Total Debt: ${formatCurrency(totalDebt)}
Monthly Budget: ${formatCurrency(monthlyBudget)}
Months to Payoff: ${monthsToPayoff} months
Total Interest Paid: ${formatCurrency(totalInterest)}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalMinimum = cards.reduce((sum, card) => sum + card.minimumPayment, 0);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Credit Cards Payoff Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Compare payoff strategies and optimize your debt repayment across multiple credit cards.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Section */}
        <div className="md:col-span-5 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2 h-5 w-5" /> Your Credit Cards
            </h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {cards.map((card, index) => (
                <Card key={card.id} className="p-4 bg-muted/30">
                  <div className="flex justify-between items-center mb-3">
                    <Input
                      value={card.name}
                      onChange={(e) => handleUpdateCard(card.id, 'name', e.target.value)}
                      className="font-semibold max-w-[150px]"
                    />
                    {cards.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCard(card.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Balance</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          className="pl-7 h-8"
                          value={card.balance}
                          onChange={(e) => handleUpdateCard(card.id, 'balance', Number(e.target.value))}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">APR (%)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          className="h-8 mt-1"
                          value={card.apr}
                          onChange={(e) => handleUpdateCard(card.id, 'apr', Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Min. Payment</Label>
                        <Input
                          type="number"
                          className="h-8 mt-1"
                          value={card.minimumPayment}
                          onChange={(e) => handleUpdateCard(card.id, 'minimumPayment', Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <Button onClick={handleAddCard} variant="outline" className="w-full mt-4">
              <Plus className="mr-2 h-4 w-4" /> Add Another Card
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payoff Strategy</h2>
            
            <div className="space-y-4">
              <div>
                <Label>Payment Strategy</Label>
                <Select value={payoffStrategy} onValueChange={setPayoffStrategy}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="avalanche">Avalanche (Highest APR First)</SelectItem>
                    <SelectItem value="snowball">Snowball (Lowest Balance First)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {payoffStrategy === 'avalanche' 
                    ? 'Saves the most money on interest' 
                    : 'Provides psychological wins by paying off cards faster'}
                </p>
              </div>
              
              <div>
                <Label htmlFor="monthlyBudget">Total Monthly Budget</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="monthlyBudget"
                    type="number"
                    className="pl-10"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum required: {formatCurrency(totalMinimum)}
                </p>
              </div>
              
              <Button onClick={handleReset} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={monthsToPayoff}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Payoff Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Debt</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(totalDebt)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Number of Cards</h3>
                    <div className="mt-1 text-2xl font-bold">{cards.length}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Time to Debt-Free</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {monthsToPayoff >= 999 ? 'N/A' : `${monthsToPayoff} months`}
                    </div>
                    {monthsToPayoff < 999 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.floor(monthsToPayoff / 12)} years, {monthsToPayoff % 12} months
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                    <div className="mt-1 text-2xl font-bold text-red-600">
                      {monthsToPayoff >= 999 ? 'N/A' : formatCurrency(totalInterest)}
                    </div>
                  </div>
                </div>
                
                {monthlyBudget < totalMinimum && (
                  <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      ⚠️ Your monthly budget is less than the minimum payments. 
                      Increase to at least {formatCurrency(totalMinimum)}.
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payoff Visualization</h2>
            
            <Tabs defaultValue="timeline">
              <TabsList className="mb-4">
                <TabsTrigger value="timeline">Debt Reduction</TabsTrigger>
                <TabsTrigger value="comparison">Strategy Comparison</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timeline" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="Total Remaining" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Total Interest" stroke="#EF4444" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="comparison" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={cards.sort((a, b) => payoffStrategy === 'avalanche' ? b.apr - a.apr : a.balance - b.balance)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `$${value}`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="balance" fill="#3B82F6" name="Balance" />
                    <Bar yAxisId="right" dataKey="apr" fill="#10B981" name="APR %" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Information Section */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Debt Payoff Strategies</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-lg mb-2">🏔️ Avalanche Method</h3>
            <p className="text-muted-foreground text-sm">
              Pay minimum on all cards, then put extra money toward the card with the highest APR. 
              This method saves the most money on interest but may take longer to see results.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">⛄ Snowball Method</h3>
            <p className="text-muted-foreground text-sm">
              Pay minimum on all cards, then put extra money toward the card with the lowest balance. 
              This provides quick wins and motivation but may cost more in interest overall.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CreditCardsPayoffCalculator;
