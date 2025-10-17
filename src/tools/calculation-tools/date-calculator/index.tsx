import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calendar, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * DateCalculator Component
 * 
 * Calculates date differences and adds/subtracts time from dates
 */
export function DateCalculator() {
  const [mode, setMode] = useState<string>('difference');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [baseDate, setBaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [operation, setOperation] = useState<string>('add');
  const [yearsDelta, setYearsDelta] = useState<number>(0);
  const [monthsDelta, setMonthsDelta] = useState<number>(0);
  const [daysDelta, setDaysDelta] = useState<number>(1);
  const [diffYears, setDiffYears] = useState<number>(0);
  const [diffMonths, setDiffMonths] = useState<number>(0);
  const [diffDays, setDiffDays] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [resultDate, setResultDate] = useState<string>('');
  const { toast } = useToast();

  // Calculate when inputs change
  useEffect(() => {
    if (mode === 'difference') {
      calculateDifference();
    } else {
      calculateNewDate();
    }
  }, [mode, startDate, endDate, baseDate, operation, yearsDelta, monthsDelta, daysDelta]);

  // Calculate difference between two dates
  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setDiffYears(0);
      setDiffMonths(0);
      setDiffDays(0);
      setTotalDays(0);
      return;
    }

    // Calculate years, months, and days
    let y = end.getFullYear() - start.getFullYear();
    let m = end.getMonth() - start.getMonth();
    let d = end.getDate() - start.getDate();

    // Adjust for negative days
    if (d < 0) {
      m--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      d += prevMonth.getDate();
    }

    // Adjust for negative months
    if (m < 0) {
      y--;
      m += 12;
    }

    setDiffYears(y);
    setDiffMonths(m);
    setDiffDays(d);

    // Calculate total days
    const diffTime = end.getTime() - start.getTime();
    const diffDaysTotal = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setTotalDays(diffDaysTotal);
  };

  // Calculate new date by adding/subtracting time
  const calculateNewDate = () => {
    const base = new Date(baseDate);
    const result = new Date(base);

    if (operation === 'add') {
      result.setFullYear(result.getFullYear() + yearsDelta);
      result.setMonth(result.getMonth() + monthsDelta);
      result.setDate(result.getDate() + daysDelta);
    } else {
      result.setFullYear(result.getFullYear() - yearsDelta);
      result.setMonth(result.getMonth() - monthsDelta);
      result.setDate(result.getDate() - daysDelta);
    }

    setResultDate(result.toISOString().split('T')[0]);
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
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
    setBaseDate(today);
    setYearsDelta(0);
    setMonthsDelta(0);
    setDaysDelta(1);
    setOperation('add');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Date Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate date differences or add/subtract time from dates
        </p>
      </div>

      <div className="grid gap-6">
        {/* Mode Selection */}
        <Card className="p-6">
          <Label htmlFor="mode">Calculation Mode</Label>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="difference">Date Difference</SelectItem>
              <SelectItem value="addsubtract">Add/Subtract Time</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Date Difference Mode */}
        {mode === 'difference' && (
          <>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Select Dates
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    className="mt-2"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    className="mt-2"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <Button onClick={handleReset} variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Difference</h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg mb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Time Difference</h3>
                      <div className="text-3xl font-bold">
                        {diffYears} years, {diffMonths} months, {diffDays} days
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(`${diffYears} years, ${diffMonths} months, ${diffDays} days`, 'Difference')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Total Days</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {totalDays.toLocaleString()} days
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(totalDays.toString(), 'Total Days')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}

        {/* Add/Subtract Mode */}
        {mode === 'addsubtract' && (
          <>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Calculate New Date
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="baseDate">Base Date</Label>
                  <Input
                    id="baseDate"
                    type="date"
                    className="mt-2"
                    value={baseDate}
                    onChange={(e) => setBaseDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="operation">Operation</Label>
                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Add Time</SelectItem>
                      <SelectItem value="subtract">Subtract Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="years">Years</Label>
                  <Input
                    id="years"
                    type="number"
                    min="0"
                    className="mt-2"
                    value={yearsDelta}
                    onChange={(e) => setYearsDelta(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="months">Months</Label>
                  <Input
                    id="months"
                    type="number"
                    min="0"
                    className="mt-2"
                    value={monthsDelta}
                    onChange={(e) => setMonthsDelta(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="days">Days</Label>
                  <Input
                    id="days"
                    type="number"
                    min="0"
                    className="mt-2"
                    value={daysDelta}
                    onChange={(e) => setDaysDelta(Number(e.target.value))}
                  />
                </div>

                <Button onClick={handleReset} variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Result</h2>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">New Date</h3>
                      <div className="text-4xl font-bold">
                        {new Date(resultDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-lg text-muted-foreground mt-2">
                        {resultDate}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(resultDate, 'Result Date')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">How to Use</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium text-lg mb-2">Date Difference</h3>
              <p className="text-muted-foreground text-sm">
                Calculate the exact time between two dates. Perfect for finding age, project duration, or time until an event.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Add/Subtract Time</h3>
              <p className="text-muted-foreground text-sm">
                Add or subtract years, months, and days from any date to find future or past dates. Useful for planning and scheduling.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DateCalculator;
