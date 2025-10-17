import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, DollarSign, RefreshCw, TrendingUp, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate relative to USD (1 USD = rate units)
}

interface ConversionHistory {
  id: string;
  from: Currency;
  to: Currency;
  amount: number;
  result: number;
  timestamp: Date;
}

/**
 * Currency Calculator Component
 * 
 * Convert between different currencies using predefined exchange rates.
 * Includes popular currency pairs and conversion history.
 */
export function CurrencyCalculator() {
  // State for input values
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  
  // State for calculated results
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [conversionHistory, setConversionHistory] = useState<ConversionHistory[]>([]);
  
  // State for validation
  const [errors, setErrors] = useState<{
    amount?: string;
  }>({});

  // FORMULA GOES HERE: Currency conversion with predefined rates
  // Predefined exchange rates (as of example date - in real app, would fetch from API)
  const currencies: Currency[] = [
    { code: "USD", name: "US Dollar", symbol: "$", rate: 1.0 },
    { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
    { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 },
    { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 110.0 },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.25 },
    { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.35 },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF", rate: 0.92 },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥", rate: 6.45 },
    { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 74.50 },
    { code: "BRL", name: "Brazilian Real", symbol: "R$", rate: 5.20 },
    { code: "RUB", name: "Russian Ruble", symbol: "₽", rate: 75.0 },
    { code: "KRW", name: "South Korean Won", symbol: "₩", rate: 1180.0 },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$", rate: 1.35 },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", rate: 7.80 },
    { code: "SEK", name: "Swedish Krona", symbol: "kr", rate: 8.60 },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr", rate: 8.50 },
    { code: "MXN", name: "Mexican Peso", symbol: "$", rate: 20.0 },
    { code: "ZAR", name: "South African Rand", symbol: "R", rate: 14.50 },
    { code: "TRY", name: "Turkish Lira", symbol: "₺", rate: 8.50 },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", rate: 1.42 }
  ];

  // Popular currency pairs
  const popularPairs = [
    { from: "USD", to: "EUR" },
    { from: "USD", to: "GBP" },
    { from: "USD", to: "JPY" },
    { from: "USD", to: "CAD" },
    { from: "EUR", to: "GBP" },
    { from: "EUR", to: "USD" },
    { from: "GBP", to: "USD" },
    { from: "GBP", to: "EUR" }
  ];

  // Get currency by code
  const getCurrency = (code: string): Currency => {
    return currencies.find(c => c.code === code) || currencies[0];
  };

  // Calculate conversion when inputs change
  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  const calculateConversion = () => {
    // Validate inputs
    const newErrors: {
      amount?: string;
    } = {};
    
    if (amount < 0) newErrors.amount = "Amount cannot be negative";
    
    setErrors(newErrors);
    
    // If there are validation errors, don't calculate
    if (Object.keys(newErrors).length > 0) return;
    
    const fromCurr = getCurrency(fromCurrency);
    const toCurr = getCurrency(toCurrency);
    
    // Convert to USD first, then to target currency
    // Formula: amount * (1/fromRate) * toRate
    const usdAmount = amount / fromCurr.rate;
    const converted = usdAmount * toCurr.rate;
    const rate = toCurr.rate / fromCurr.rate;
    
    setConvertedAmount(converted);
    setExchangeRate(rate);
  };

  // Add conversion to history
  const addToHistory = () => {
    if (amount <= 0 || Object.keys(errors).length > 0) return;
    
    const fromCurr = getCurrency(fromCurrency);
    const toCurr = getCurrency(toCurrency);
    
    const conversion: ConversionHistory = {
      id: Date.now().toString(),
      from: fromCurr,
      to: toCurr,
      amount,
      result: convertedAmount,
      timestamp: new Date()
    };
    
    setConversionHistory(prev => [conversion, ...prev.slice(0, 9)]); // Keep last 10
  };

  // Swap currencies
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Set popular pair
  const setPopularPair = (pair: { from: string; to: string }) => {
    setFromCurrency(pair.from);
    setToCurrency(pair.to);
  };

  // Function to reset all values
  const handleReset = () => {
    setAmount(1000);
    setFromCurrency("USD");
    setToCurrency("EUR");
    setConversionHistory([]);
    setErrors({});
  };

  // Format currency
  const formatCurrency = (value: number, currencyCode: string) => {
    const currency = getCurrency(currencyCode);
    
    // Handle different decimal places for different currencies
    let decimals = 2;
    if (currencyCode === "JPY" || currencyCode === "KRW") {
      decimals = 0;
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  // Format simple number with currency symbol
  const formatSimple = (value: number, currencyCode: string) => {
    const currency = getCurrency(currencyCode);
    let decimals = 2;
    if (currencyCode === "JPY" || currencyCode === "KRW") {
      decimals = 0;
    }
    
    return `${currency.symbol}${value.toFixed(decimals)}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6" data-testid="currency-calculator">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Globe className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold">Currency Calculator</CardTitle>
          </div>
          <CardDescription>
            Convert between different world currencies using current exchange rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="converter" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="converter">Converter</TabsTrigger>
              <TabsTrigger value="rates">Exchange Rates</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="converter" className="space-y-6">
              {/* Popular Pairs */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Popular Currency Pairs</Label>
                <div className="flex flex-wrap gap-2">
                  {popularPairs.map((pair, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setPopularPair(pair)}
                    >
                      {pair.from}/{pair.to}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Amount</span>
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                      placeholder="1000"
                      data-testid="input-amount"
                    />
                    {errors.amount && (
                      <p className="text-sm text-red-500">{errors.amount}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from-currency">From Currency</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger data-testid="select-from-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={swapCurrencies}
                      className="rounded-full"
                      data-testid="button-swap"
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to-currency">To Currency</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger data-testid="select-to-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      onClick={addToHistory} 
                      className="w-full"
                      data-testid="button-convert"
                    >
                      Add to History
                    </Button>
                    <Button 
                      onClick={handleReset} 
                      variant="outline" 
                      className="w-full"
                      data-testid="button-reset"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Results Section */}
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="text-3xl font-bold text-primary" data-testid="result-converted-amount">
                          {formatSimple(convertedAmount, toCurrency)}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {formatSimple(amount, fromCurrency)} = {formatSimple(convertedAmount, toCurrency)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          1 {toCurrency} = {(1/exchangeRate).toFixed(4)} {fromCurrency}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {Object.keys(errors).length === 0 && amount > 0 && (
                    <Alert className="mt-4">
                      <TrendingUp className="h-4 w-4" />
                      <AlertDescription>
                        Exchange rate: 1 {getCurrency(fromCurrency).name} = {exchangeRate.toFixed(4)} {getCurrency(toCurrency).name}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          * Rates are for demonstration purposes only. Use real-time rates for actual transactions.
                        </span>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rates" className="space-y-4">
              <h3 className="text-lg font-semibold">Current Exchange Rates</h3>
              <p className="text-sm text-muted-foreground">All rates shown relative to 1 USD</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currencies.filter(c => c.code !== "USD").map((currency) => (
                  <Card key={currency.code}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{currency.code}</div>
                          <div className="text-sm text-muted-foreground">{currency.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{currency.symbol}{currency.rate.toFixed(currency.code === "JPY" || currency.code === "KRW" ? 0 : 2)}</div>
                          <div className="text-sm text-muted-foreground">per 1 USD</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Conversion History</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setConversionHistory([])}
                >
                  Clear History
                </Button>
              </div>
              
              {conversionHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No conversions yet. Use the converter to add to history.
                </div>
              ) : (
                <div className="space-y-3">
                  {conversionHistory.map((conversion) => (
                    <Card key={conversion.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="text-lg font-semibold">
                              {formatSimple(conversion.amount, conversion.from.code)}
                            </div>
                            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                            <div className="text-lg font-semibold text-primary">
                              {formatSimple(conversion.result, conversion.to.code)}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {conversion.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {conversion.from.code} to {conversion.to.code} • Rate: {(conversion.result / conversion.amount).toFixed(4)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default CurrencyCalculator;
