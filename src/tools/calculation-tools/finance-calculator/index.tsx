import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Calculator, DollarSign, TrendingUp, Percent, RefreshCw, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FinancialRatio {
  name: string;
  value: number;
  interpretation: string;
  category: string;
}

/**
 * Finance Calculator Component
 * 
 * A comprehensive financial calculator for various calculations including
 * ROI, break-even analysis, financial ratios, and investment returns.
 */
export function FinanceCalculator() {
  // State for different calculation types
  const [calculationType, setCalculationType] = useState<string>("roi");
  
  // ROI Calculator states
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(12000);
  const [roi, setRoi] = useState<number>(0);
  
  // Break-even Calculator states
  const [fixedCosts, setFixedCosts] = useState<number>(50000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(20);
  const [pricePerUnit, setPricePerUnit] = useState<number>(50);
  const [breakEvenUnits, setBreakEvenUnits] = useState<number>(0);
  const [breakEvenRevenue, setBreakEvenRevenue] = useState<number>(0);
  
  // Financial Ratios states
  const [revenue, setRevenue] = useState<number>(500000);
  const [netIncome, setNetIncome] = useState<number>(50000);
  const [totalAssets, setTotalAssets] = useState<number>(200000);
  const [totalEquity, setTotalEquity] = useState<number>(120000);
  const [currentAssets, setCurrentAssets] = useState<number>(80000);
  const [currentLiabilities, setCurrentLiabilities] = useState<number>(40000);
  const [ratios, setRatios] = useState<FinancialRatio[]>([]);
  
  // Compound Interest states
  const [principal, setPrincipal] = useState<number>(5000);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [compoundPeriods, setCompoundPeriods] = useState<number>(12);
  const [years, setYears] = useState<number>(5);
  const [compoundResult, setCompoundResult] = useState<number>(0);
  
  // State for validation
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Calculate based on selected type
  useEffect(() => {
    calculateFinancials();
  }, [calculationType, initialInvestment, finalValue, fixedCosts, variableCostPerUnit, pricePerUnit, 
      revenue, netIncome, totalAssets, totalEquity, currentAssets, currentLiabilities,
      principal, annualRate, compoundPeriods, years]);

  // FORMULA GOES HERE: Various financial calculations
  const calculateFinancials = () => {
    setErrors({});
    
    switch (calculationType) {
      case "roi":
        calculateROI();
        break;
      case "breakeven":
        calculateBreakEven();
        break;
      case "ratios":
        calculateRatios();
        break;
      case "compound":
        calculateCompoundInterest();
        break;
      default:
        break;
    }
  };

  const calculateROI = () => {
    if (initialInvestment <= 0) {
      setErrors({ roi: "Initial investment must be greater than 0" });
      return;
    }
    
    // ROI Formula: (Final Value - Initial Investment) / Initial Investment * 100
    const roiPercentage = ((finalValue - initialInvestment) / initialInvestment) * 100;
    setRoi(roiPercentage);
  };

  const calculateBreakEven = () => {
    const contributionMargin = pricePerUnit - variableCostPerUnit;
    
    if (contributionMargin <= 0) {
      setErrors({ breakeven: "Price per unit must be greater than variable cost per unit" });
      return;
    }
    
    // Break-even Formula: Fixed Costs / (Price per unit - Variable cost per unit)
    const breakEvenUnitsCalc = fixedCosts / contributionMargin;
    const breakEvenRevenueCalc = breakEvenUnitsCalc * pricePerUnit;
    
    setBreakEvenUnits(breakEvenUnitsCalc);
    setBreakEvenRevenue(breakEvenRevenueCalc);
  };

  const calculateRatios = () => {
    const calculatedRatios: FinancialRatio[] = [];
    
    // Profitability Ratios
    if (revenue > 0) {
      calculatedRatios.push({
        name: "Net Profit Margin",
        value: (netIncome / revenue) * 100,
        interpretation: netIncome / revenue > 0.1 ? "Good" : netIncome / revenue > 0.05 ? "Average" : "Poor",
        category: "Profitability"
      });
    }
    
    if (totalAssets > 0) {
      calculatedRatios.push({
        name: "Return on Assets (ROA)",
        value: (netIncome / totalAssets) * 100,
        interpretation: netIncome / totalAssets > 0.05 ? "Good" : netIncome / totalAssets > 0.02 ? "Average" : "Poor",
        category: "Profitability"
      });
    }
    
    if (totalEquity > 0) {
      calculatedRatios.push({
        name: "Return on Equity (ROE)",
        value: (netIncome / totalEquity) * 100,
        interpretation: netIncome / totalEquity > 0.15 ? "Excellent" : netIncome / totalEquity > 0.10 ? "Good" : "Average",
        category: "Profitability"
      });
    }
    
    // Liquidity Ratios
    if (currentLiabilities > 0) {
      const currentRatio = currentAssets / currentLiabilities;
      calculatedRatios.push({
        name: "Current Ratio",
        value: currentRatio,
        interpretation: currentRatio > 2 ? "Strong" : currentRatio > 1 ? "Adequate" : "Weak",
        category: "Liquidity"
      });
    }
    
    // Leverage Ratios
    if (totalAssets > 0) {
      const debtToAssets = ((totalAssets - totalEquity) / totalAssets) * 100;
      calculatedRatios.push({
        name: "Debt-to-Assets Ratio",
        value: debtToAssets,
        interpretation: debtToAssets < 30 ? "Conservative" : debtToAssets < 60 ? "Moderate" : "High Risk",
        category: "Leverage"
      });
    }
    
    setRatios(calculatedRatios);
  };

  const calculateCompoundInterest = () => {
    if (principal <= 0 || annualRate < 0 || years <= 0) {
      setErrors({ compound: "Please enter valid positive values" });
      return;
    }
    
    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const rate = annualRate / 100;
    const amount = principal * Math.pow(1 + rate / compoundPeriods, compoundPeriods * years);
    setCompoundResult(amount);
  };

  // Function to reset all values
  const handleReset = () => {
    setInitialInvestment(10000);
    setFinalValue(12000);
    setFixedCosts(50000);
    setVariableCostPerUnit(20);
    setPricePerUnit(50);
    setRevenue(500000);
    setNetIncome(50000);
    setTotalAssets(200000);
    setTotalEquity(120000);
    setCurrentAssets(80000);
    setCurrentLiabilities(40000);
    setPrincipal(5000);
    setAnnualRate(8);
    setCompoundPeriods(12);
    setYears(5);
    setErrors({});
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

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Get interpretation color
  const getInterpretationColor = (interpretation: string) => {
    switch (interpretation.toLowerCase()) {
      case "excellent": return "bg-green-100 text-green-800";
      case "good": case "strong": case "conservative": return "bg-blue-100 text-blue-800";
      case "average": case "adequate": case "moderate": return "bg-yellow-100 text-yellow-800";
      case "poor": case "weak": case "high risk": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Chart data for ratios
  const ratioChartData = ratios.map(ratio => ({
    name: ratio.name,
    value: Math.abs(ratio.value)
  }));

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6" data-testid="finance-calculator">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold">Finance Calculator</CardTitle>
          </div>
          <CardDescription>
            Comprehensive financial calculator for ROI, break-even analysis, ratios, and compound interest
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Calculator Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="calculation-type">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger data-testid="select-calculation-type">
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roi">Return on Investment (ROI)</SelectItem>
                  <SelectItem value="breakeven">Break-Even Analysis</SelectItem>
                  <SelectItem value="ratios">Financial Ratios</SelectItem>
                  <SelectItem value="compound">Compound Interest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={calculationType} onValueChange={setCalculationType} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="roi">ROI</TabsTrigger>
                <TabsTrigger value="breakeven">Break-Even</TabsTrigger>
                <TabsTrigger value="ratios">Ratios</TabsTrigger>
                <TabsTrigger value="compound">Compound</TabsTrigger>
              </TabsList>
              
              {/* ROI Calculator */}
              <TabsContent value="roi" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="initial-investment" className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Initial Investment</span>
                      </Label>
                      <Input
                        id="initial-investment"
                        type="number"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(parseFloat(e.target.value) || 0)}
                        placeholder="10000"
                        data-testid="input-initial-investment"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="final-value">Final Value</Label>
                      <Input
                        id="final-value"
                        type="number"
                        value={finalValue}
                        onChange={(e) => setFinalValue(parseFloat(e.target.value) || 0)}
                        placeholder="12000"
                        data-testid="input-final-value"
                      />
                    </div>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary" data-testid="result-roi">
                          {formatPercentage(roi)}
                        </div>
                        <p className="text-sm text-muted-foreground">Return on Investment</p>
                        <div className="mt-2 text-sm">
                          <p>Gain/Loss: {formatCurrency(finalValue - initialInvestment)}</p>
                          <p className={roi > 0 ? "text-green-600" : "text-red-600"}>
                            {roi > 0 ? "Profitable" : "Loss"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {errors.roi && <Alert><AlertDescription className="text-red-600">{errors.roi}</AlertDescription></Alert>}
              </TabsContent>

              {/* Break-Even Calculator */}
              <TabsContent value="breakeven" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fixed-costs">Fixed Costs</Label>
                      <Input
                        id="fixed-costs"
                        type="number"
                        value={fixedCosts}
                        onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
                        placeholder="50000"
                        data-testid="input-fixed-costs"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="variable-cost">Variable Cost per Unit</Label>
                      <Input
                        id="variable-cost"
                        type="number"
                        value={variableCostPerUnit}
                        onChange={(e) => setVariableCostPerUnit(parseFloat(e.target.value) || 0)}
                        placeholder="20"
                        data-testid="input-variable-cost"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price-per-unit">Price per Unit</Label>
                      <Input
                        id="price-per-unit"
                        type="number"
                        value={pricePerUnit}
                        onChange={(e) => setPricePerUnit(parseFloat(e.target.value) || 0)}
                        placeholder="50"
                        data-testid="input-price-per-unit"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-primary" data-testid="result-breakeven-units">
                          {Math.ceil(breakEvenUnits).toLocaleString()} units
                        </div>
                        <p className="text-sm text-muted-foreground">Break-Even Units</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600" data-testid="result-breakeven-revenue">
                          {formatCurrency(breakEvenRevenue)}
                        </div>
                        <p className="text-sm text-muted-foreground">Break-Even Revenue</p>
                      </CardContent>
                    </Card>

                    <div className="text-sm space-y-1">
                      <p><strong>Contribution Margin:</strong> {formatCurrency(pricePerUnit - variableCostPerUnit)}</p>
                      <p><strong>Contribution Margin %:</strong> {formatPercentage(((pricePerUnit - variableCostPerUnit) / pricePerUnit) * 100)}</p>
                    </div>
                  </div>
                </div>
                {errors.breakeven && <Alert><AlertDescription className="text-red-600">{errors.breakeven}</AlertDescription></Alert>}
              </TabsContent>

              {/* Financial Ratios */}
              <TabsContent value="ratios" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="revenue">Revenue</Label>
                        <Input
                          id="revenue"
                          type="number"
                          value={revenue}
                          onChange={(e) => setRevenue(parseFloat(e.target.value) || 0)}
                          placeholder="500000"
                          data-testid="input-revenue"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="net-income">Net Income</Label>
                        <Input
                          id="net-income"
                          type="number"
                          value={netIncome}
                          onChange={(e) => setNetIncome(parseFloat(e.target.value) || 0)}
                          placeholder="50000"
                          data-testid="input-net-income"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="total-assets">Total Assets</Label>
                        <Input
                          id="total-assets"
                          type="number"
                          value={totalAssets}
                          onChange={(e) => setTotalAssets(parseFloat(e.target.value) || 0)}
                          placeholder="200000"
                          data-testid="input-total-assets"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="total-equity">Total Equity</Label>
                        <Input
                          id="total-equity"
                          type="number"
                          value={totalEquity}
                          onChange={(e) => setTotalEquity(parseFloat(e.target.value) || 0)}
                          placeholder="120000"
                          data-testid="input-total-equity"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="current-assets">Current Assets</Label>
                        <Input
                          id="current-assets"
                          type="number"
                          value={currentAssets}
                          onChange={(e) => setCurrentAssets(parseFloat(e.target.value) || 0)}
                          placeholder="80000"
                          data-testid="input-current-assets"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="current-liabilities">Current Liabilities</Label>
                        <Input
                          id="current-liabilities"
                          type="number"
                          value={currentLiabilities}
                          onChange={(e) => setCurrentLiabilities(parseFloat(e.target.value) || 0)}
                          placeholder="40000"
                          data-testid="input-current-liabilities"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Financial Ratios</h4>
                    {ratios.map((ratio, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold">{ratio.name}</div>
                              <div className="text-sm text-muted-foreground">{ratio.category}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">
                                {ratio.name.includes("Ratio") ? ratio.value.toFixed(2) : formatPercentage(ratio.value)}
                              </div>
                              <Badge className={getInterpretationColor(ratio.interpretation)}>
                                {ratio.interpretation}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Compound Interest */}
              <TabsContent value="compound" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="principal">Principal Amount</Label>
                      <Input
                        id="principal"
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                        placeholder="5000"
                        data-testid="input-principal"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annual-rate">Annual Interest Rate (%)</Label>
                      <Input
                        id="annual-rate"
                        type="number"
                        step="0.1"
                        value={annualRate}
                        onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                        placeholder="8"
                        data-testid="input-annual-rate"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="compound-periods">Compounding Periods per Year</Label>
                      <Select value={compoundPeriods.toString()} onValueChange={(value) => setCompoundPeriods(parseInt(value))}>
                        <SelectTrigger data-testid="select-compound-periods">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Annually</SelectItem>
                          <SelectItem value="4">Quarterly</SelectItem>
                          <SelectItem value="12">Monthly</SelectItem>
                          <SelectItem value="365">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="years">Number of Years</Label>
                      <Input
                        id="years"
                        type="number"
                        value={years}
                        onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
                        placeholder="5"
                        data-testid="input-years"
                      />
                    </div>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="text-3xl font-bold text-primary" data-testid="result-compound">
                          {formatCurrency(compoundResult)}
                        </div>
                        <p className="text-sm text-muted-foreground">Final Amount</p>
                        <div className="space-y-2 text-sm">
                          <p><strong>Interest Earned:</strong> {formatCurrency(compoundResult - principal)}</p>
                          <p><strong>Growth Factor:</strong> {(compoundResult / principal).toFixed(2)}x</p>
                          <p><strong>Effective Annual Rate:</strong> {formatPercentage(Math.pow(compoundResult / principal, 1 / years) * 100 - 100)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {errors.compound && <Alert><AlertDescription className="text-red-600">{errors.compound}</AlertDescription></Alert>}
              </TabsContent>
            </Tabs>

            {/* Reset Button */}
            <div className="flex justify-center">
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="min-w-32"
                data-testid="button-reset"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FinanceCalculator;
