import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Info, DollarSign, Calendar, Percent, RefreshCw, School, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

export function CollegeCostCalculator() {
  const [annualTuition, setAnnualTuition] = useState<number>(25000);
  const [roomBoard, setRoomBoard] = useState<number>(12000);
  const [booksSupplies, setBooksSupplies] = useState<number>(1200);
  const [otherExpenses, setOtherExpenses] = useState<number>(3000);
  const [yearsOfStudy, setYearsOfStudy] = useState<number>(4);
  const [inflationRate, setInflationRate] = useState<number>(3);
  const [scholarships, setScholarships] = useState<number>(5000);
  const [savings, setSavings] = useState<number>(10000);
  const [expectedSalary, setExpectedSalary] = useState<number>(55000);
  
  const [totalCost, setTotalCost] = useState<number>(0);
  const [yearlyBreakdown, setYearlyBreakdown] = useState<any[]>([]);
  const [outOfPocketCost, setOutOfPocketCost] = useState<number>(0);
  const [loanNeeded, setLoanNeeded] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateCollegeCost();
  }, [annualTuition, roomBoard, booksSupplies, otherExpenses, yearsOfStudy, inflationRate, scholarships, savings, expectedSalary]);

  const calculateCollegeCost = () => {
    if (yearsOfStudy <= 0) return;
    
    let total = 0;
    let savingsRemaining = savings;
    const yearData = [];
    
    for (let year = 1; year <= yearsOfStudy; year++) {
      // Apply inflation to costs
      const inflationMultiplier = Math.pow(1 + inflationRate / 100, year - 1);
      const yearTuition = annualTuition * inflationMultiplier;
      const yearRoom = roomBoard * inflationMultiplier;
      const yearBooks = booksSupplies * inflationMultiplier;
      const yearOther = otherExpenses * inflationMultiplier;
      const yearScholarship = scholarships * inflationMultiplier;
      
      const yearTotal = yearTuition + yearRoom + yearBooks + yearOther;
      const yearNet = yearTotal - yearScholarship;
      
      // Use savings first
      const savingsUsed = Math.min(savingsRemaining, yearNet);
      savingsRemaining -= savingsUsed;
      const yearLoan = yearNet - savingsUsed;
      
      total += yearNet;
      
      yearData.push({
        year: `Year ${year}`,
        'Tuition & Fees': yearTuition,
        'Room & Board': yearRoom,
        'Books & Supplies': yearBooks,
        'Other Expenses': yearOther,
        'Scholarships': -yearScholarship,
        'Net Cost': yearNet,
      });
    }
    
    const outOfPocket = total - (savings - savingsRemaining);
    const loansNeeded = Math.max(0, total - savings);
    
    // Calculate simple ROI (lifetime earnings increase / total cost)
    // Assuming college degree increases lifetime earnings
    const lifeTimeEarningsBoost = expectedSalary * 35; // 35 years career
    const roiPercent = ((lifeTimeEarningsBoost - total) / total) * 100;
    
    setTotalCost(total);
    setYearlyBreakdown(yearData);
    setOutOfPocketCost(outOfPocket);
    setLoanNeeded(loansNeeded);
    setRoi(roiPercent);
  };

  const handleReset = () => {
    setAnnualTuition(25000);
    setRoomBoard(12000);
    setBooksSupplies(1200);
    setOtherExpenses(3000);
    setYearsOfStudy(4);
    setInflationRate(3);
    setScholarships(5000);
    setSavings(10000);
    setExpectedSalary(55000);
  };

  const handleCopy = () => {
    const resultText = `College Cost Summary:
Total Cost: ${formatCurrency(totalCost)}
Scholarships: ${formatCurrency(scholarships * yearsOfStudy)}
Savings Used: ${formatCurrency(Math.min(savings, totalCost))}
Loans Needed: ${formatCurrency(loanNeeded)}
Expected Starting Salary: ${formatCurrency(expectedSalary)}`;
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">College Cost Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Estimate the total cost of college and plan your financing strategy.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <School className="mr-2 h-5 w-5" /> Annual Costs
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="annualTuition">Tuition & Fees</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="annualTuition" type="number" className="pl-10" value={annualTuition} onChange={(e) => setAnnualTuition(Number(e.target.value))} />
                </div>
                <Slider className="mt-2" value={[annualTuition]} max={80000} min={5000} step={1000} onValueChange={(v) => setAnnualTuition(v[0])} />
              </div>

              <div>
                <Label htmlFor="roomBoard">Room & Board</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="roomBoard" type="number" className="pl-10" value={roomBoard} onChange={(e) => setRoomBoard(Number(e.target.value))} />
                </div>
                <Slider className="mt-2" value={[roomBoard]} max={25000} min={5000} step={500} onValueChange={(v) => setRoomBoard(v[0])} />
              </div>

              <div>
                <Label htmlFor="booksSupplies">Books & Supplies</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="booksSupplies" type="number" className="pl-10" value={booksSupplies} onChange={(e) => setBooksSupplies(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <Label htmlFor="otherExpenses">Other Expenses</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="otherExpenses" type="number" className="pl-10" value={otherExpenses} onChange={(e) => setOtherExpenses(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Planning Details</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="yearsOfStudy">Years of Study</Label>
                <Input id="yearsOfStudy" type="number" className="mt-1.5" value={yearsOfStudy} onChange={(e) => setYearsOfStudy(Number(e.target.value))} />
                <Slider className="mt-2" value={[yearsOfStudy]} max={6} min={2} step={1} onValueChange={(v) => setYearsOfStudy(v[0])} />
              </div>

              <div>
                <Label htmlFor="inflationRate">Annual Cost Increase (%)</Label>
                <div className="relative mt-1.5">
                  <Percent className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="inflationRate" type="number" step="0.1" className="pl-10" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <Label htmlFor="scholarships">Annual Scholarships/Grants</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="scholarships" type="number" className="pl-10" value={scholarships} onChange={(e) => setScholarships(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <Label htmlFor="savings">Available Savings</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="savings" type="number" className="pl-10" value={savings} onChange={(e) => setSavings(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <Label htmlFor="expectedSalary">Expected Starting Salary</Label>
                <div className="relative mt-1.5">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="expectedSalary" type="number" className="pl-10" value={expectedSalary} onChange={(e) => setExpectedSalary(Number(e.target.value))} />
                </div>
              </div>

              <Button onClick={handleReset} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div key={totalCost} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Cost Summary
                  </h2>
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-blue-100/40 dark:bg-blue-900/20 p-4 rounded-lg col-span-2">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Total College Cost</h3>
                    <div className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(totalCost)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Scholarships</h3>
                    <div className="mt-1 text-2xl font-bold text-green-600">{formatCurrency(scholarships * yearsOfStudy)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Savings Used</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(Math.min(savings, totalCost))}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Loans Needed</h3>
                    <div className="mt-1 text-2xl font-bold text-red-600">{formatCurrency(loanNeeded)}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Investment ROI</h3>
                    <div className="mt-1 text-2xl font-bold">{roi.toFixed(0)}%</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
            
            <Tabs defaultValue="yearly">
              <TabsList className="mb-4">
                <TabsTrigger value="yearly">Yearly Costs</TabsTrigger>
                <TabsTrigger value="projection">Cost Projection</TabsTrigger>
              </TabsList>
              
              <TabsContent value="yearly" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="Tuition & Fees" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="Room & Board" stackId="a" fill="#10B981" />
                    <Bar dataKey="Books & Supplies" stackId="a" fill="#F59E0B" />
                    <Bar dataKey="Other Expenses" stackId="a" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="projection" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyBreakdown} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="Net Cost" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Scholarships" stroke="#10B981" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">College Financing Tips</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-lg mb-2">Start Early</h3>
            <p className="text-muted-foreground text-sm">
              Begin saving for college as early as possible. Even small monthly contributions can grow significantly over time with compound interest.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Maximize Scholarships</h3>
            <p className="text-muted-foreground text-sm">
              Apply for as many scholarships as possible. Free money is always better than loans. Many go unclaimed each year due to lack of applicants.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Consider All Options</h3>
            <p className="text-muted-foreground text-sm">
              Explore community colleges for the first two years, work-study programs, and in-state schools to significantly reduce total costs.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CollegeCostCalculator;
