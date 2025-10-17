import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingDown, DollarSign, Calendar, Percent, RefreshCw, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface YearlyInflationData {
  year: number;
  currentValue: number;
  inflationAdjustedValue: number;
  purchasing_power: number;
  cumulative_inflation: number;
}

/**
 * Inflation Calculator Component
 * 
 * Calculate the impact of inflation on purchasing power over time.
 * Shows how the value of money changes due to inflation.
 */
export function InflationCalculator() {
  // State for input values
  const [currentAmount, setCurrentAmount] = useState<number>(10000);
  const [inflationRate, setInflationRate] = useState<number>(3.0);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [startYear, setStartYear] = useState<number>(2024);
  
  // State for calculated results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalInflation, setTotalInflation] = useState<number>(0);
  const [purchasingPower, setPurchasingPower] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<YearlyInflationData[]>([]);
  
  // State for validation
  const [errors, setErrors] = useState<{
    currentAmount?: string;
    inflationRate?: string;
    timePeriod?: string;
    startYear?: string;
  }>({});

  // Historical inflation data for comparison
  const historicalInflation = [
    { period: "1980s", rate: 5.5 },
    { period: "1990s", rate: 3.0 },
    { period: "2000s", rate: 2.5 },
    { period: "2010s", rate: 1.8 },
    { period: "2020s", rate: 4.2 }
  ];

  // Calculate inflation impact when inputs change
  useEffect(() => {
    calculateInflation();
  }, [currentAmount, inflationRate, timePeriod, startYear]);

  // FORMULA GOES HERE: Inflation calculation
  const calculateInflation = () => {
    // Validate inputs
    const newErrors: {
      currentAmount?: string;
      inflationRate?: string;
      timePeriod?: string;
      startYear?: string;
    } = {};
    
    if (currentAmount <= 0) newErrors.currentAmount = "Amount must be greater than 0";
    if (inflationRate < -50) newErrors.inflationRate = "Inflation rate too low";
    if (inflationRate > 50) newErrors.inflationRate = "Inflation rate too high";
    if (timePeriod <= 0) newErrors.timePeriod = "Time period must be greater than 0";
    if (timePeriod > 100) newErrors.timePeriod = "Time period too long";
    if (startYear < 1900 || startYear > 2100) newErrors.startYear = "Year must be between 1900 and 2100";
    
    setErrors(newErrors);
    
    // If there are validation errors, don't calculate
    if (Object.keys(newErrors).length > 0) {
      setYearlyData([]);
      return;
    }
    
    const principal = currentAmount;
    const rate = inflationRate / 100;
    const years = timePeriod;
    
    // Calculate compound inflation effect
    // Formula: Future Value = Present Value × (1 + inflation_rate)^years
    const inflatedValue = principal * Math.pow(1 + rate, years);
    
    // Calculate purchasing power (what the money can buy in today's terms)
    // Formula: Purchasing Power = Current Amount / (1 + inflation_rate)^years
    const realPurchasingPower = principal / Math.pow(1 + rate, years);
    
    // Total inflation effect
    const totalInflationEffect = ((inflatedValue - principal) / principal) * 100;
    
    setFutureValue(inflatedValue);
    setTotalInflation(totalInflationEffect);
    setPurchasingPower(realPurchasingPower);
    
    // Generate yearly breakdown
    const breakdown: YearlyInflationData[] = [];
    
    for (let year = 0; year <= years; year++) {
      const inflationFactor = Math.pow(1 + rate, year);
      const inflatedAmount = principal * inflationFactor;
      const purchasingPowerAtYear = principal / inflationFactor;
      const cumulativeInflation = (inflationFactor - 1) * 100;
      
      breakdown.push({
        year: startYear + year,
        currentValue: principal,
        inflationAdjustedValue: inflatedAmount,
        purchasing_power: purchasingPowerAtYear,
        cumulative_inflation: cumulativeInflation
      });
    }
    
    setYearlyData(breakdown);
  };

  // Function to reset all values
  const handleReset = () => {
    setCurrentAmount(10000);
    setInflationRate(3.0);
    setTimePeriod(10);
    setStartYear(2024);
    setErrors({});
  };

  // Set historical inflation rate
  const setHistoricalRate = (rate: number) => {
    setInflationRate(rate);
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

  // Calculate what you could buy examples
  const getBuyingPowerExamples = () => {
    const ratio = currentAmount / purchasingPower;
    return [
      { item: "Cup of Coffee", current: "$4.50", future: `$${(4.50 * ratio).toFixed(2)}` },
      { item: "Gallon of Gas", current: "$3.50", future: `$${(3.50 * ratio).toFixed(2)}` },
      { item: "Movie Ticket", current: "$12.00", future: `$${(12.00 * ratio).toFixed(2)}` },
      { item: "Fast Food Meal", current: "$8.00", future: `$${(8.00 * ratio).toFixed(2)}` }
    ];
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6" data-testid="inflation-calculator">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TrendingDown className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold">Inflation Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate how inflation affects the purchasing power of your money over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="space-y-6">
              {/* Historical Inflation Rates */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Historical Average Inflation Rates</Label>
                <div className="flex flex-wrap gap-2">
                  {historicalInflation.map((period, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setHistoricalRate(period.rate)}
                      className="text-xs"
                    >
                      {period.period}: {period.rate}%
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-amount" className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Current Amount</span>
                    </Label>
                    <Input
                      id="current-amount"
                      type="number"
                      value={currentAmount}
                      onChange={(e) => setCurrentAmount(parseFloat(e.target.value) || 0)}
                      placeholder="10000"
                      data-testid="input-current-amount"
                    />
                    {errors.currentAmount && (
                      <p className="text-sm text-red-500">{errors.currentAmount}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inflation-rate" className="flex items-center space-x-2">
                      <Percent className="h-4 w-4" />
                      <span>Annual Inflation Rate (%)</span>
                    </Label>
                    <Input
                      id="inflation-rate"
                      type="number"
                      step="0.1"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(parseFloat(e.target.value) || 0)}
                      placeholder="3.0"
                      data-testid="input-inflation-rate"
                    />
                    <Slider
                      value={[inflationRate]}
                      onValueChange={(value) => setInflationRate(value[0])}
                      max={15}
                      min={0}
                      step={0.1}
                      className="py-2"
                    />
                    {errors.inflationRate && (
                      <p className="text-sm text-red-500">{errors.inflationRate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time-period" className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Time Period (Years)</span>
                    </Label>
                    <Input
                      id="time-period"
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(parseFloat(e.target.value) || 0)}
                      placeholder="10"
                      data-testid="input-time-period"
                    />
                    <Slider
                      value={[timePeriod]}
                      onValueChange={(value) => setTimePeriod(value[0])}
                      max={50}
                      min={1}
                      step={1}
                      className="py-2"
                    />
                    {errors.timePeriod && (
                      <p className="text-sm text-red-500">{errors.timePeriod}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start-year">Starting Year</Label>
                    <Input
                      id="start-year"
                      type="number"
                      value={startYear}
                      onChange={(e) => setStartYear(parseFloat(e.target.value) || 2024)}
                      placeholder="2024"
                      data-testid="input-start-year"
                    />
                    {errors.startYear && (
                      <p className="text-sm text-red-500">{errors.startYear}</p>
                    )}
                  </div>

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

                {/* Results Section */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600" data-testid="result-future-value">
                          {formatCurrency(futureValue)}
                        </div>
                        <p className="text-sm text-muted-foreground">Inflated Value</p>
                        <p className="text-xs text-muted-foreground">What {formatCurrency(currentAmount)} costs in {startYear + timePeriod}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600" data-testid="result-purchasing-power">
                          {formatCurrency(purchasingPower)}
                        </div>
                        <p className="text-sm text-muted-foreground">Purchasing Power</p>
                        <p className="text-xs text-muted-foreground">What {formatCurrency(currentAmount)} can buy in {startYear + timePeriod}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600" data-testid="result-total-inflation">
                          {totalInflation.toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Total Inflation</p>
                        <p className="text-xs text-muted-foreground">Cumulative effect over {timePeriod} years</p>
                      </CardContent>
                    </Card>
                  </div>

                  {Object.keys(errors).length === 0 && currentAmount > 0 && (
                    <Alert className="mt-4">
                      <TrendingDown className="h-4 w-4" />
                      <AlertDescription>
                        After {timePeriod} years of {inflationRate}% inflation, {formatCurrency(currentAmount)} will have the purchasing power of {formatCurrency(purchasingPower)} in today's money. 
                        You'll need {formatCurrency(futureValue)} to maintain the same purchasing power.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Insights</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Money loses {((1 - purchasingPower/currentAmount) * 100).toFixed(1)}% of its purchasing power</li>
                      <li>• Annual inflation compounds, meaning effects accelerate over time</li>
                      <li>• Higher inflation rates dramatically reduce long-term purchasing power</li>
                      <li>• Investments should aim to beat inflation to preserve wealth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              <h3 className="text-lg font-semibold">Yearly Inflation Impact</h3>
              
              <div className="grid gap-3">
                {yearlyData.map((data, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Year {data.year}</h4>
                        <div className="text-sm text-muted-foreground">
                          +{data.cumulative_inflation.toFixed(1)}% cumulative inflation
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Inflated Cost: </span>
                          <span className="font-medium text-red-600">{formatCurrency(data.inflationAdjustedValue)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Purchasing Power: </span>
                          <span className="font-medium text-orange-600">{formatCurrency(data.purchasing_power)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="charts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Purchasing Power Decline Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Purchasing Power Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Line 
                          type="monotone" 
                          dataKey="purchasing_power" 
                          stroke="#F97316" 
                          strokeWidth={2}
                          name="Purchasing Power"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Inflation Effect Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Value vs Future Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={yearlyData.filter((_, i) => i % Math.ceil(yearlyData.length / 10) === 0)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="currentValue" fill="#3B82F6" name="Current Value" />
                        <Bar dataKey="inflationAdjustedValue" fill="#EF4444" name="Future Cost" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <h3 className="text-lg font-semibold">What Things Will Cost</h3>
              <p className="text-sm text-muted-foreground">
                Based on {inflationRate}% annual inflation over {timePeriod} years
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getBuyingPowerExamples().map((example, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="font-semibold">{example.item}</div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Today: {example.current}</span>
                            <span className="font-medium text-red-600">{startYear + timePeriod}: {example.future}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Alert className="mt-4">
                <AlertDescription>
                  <strong>Inflation Impact:</strong> If inflation averages {inflationRate}% annually, everyday items will cost significantly more in the future. 
                  This is why it's important to invest money rather than keeping it in low-yield savings accounts.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default InflationCalculator;
