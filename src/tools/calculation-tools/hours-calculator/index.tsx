import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * HoursCalculator Component
 * 
 * Calculates hours between times and dates with overtime support
 */
export function HoursCalculator() {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endTime, setEndTime] = useState<string>('17:00');
  const [breakMinutes, setBreakMinutes] = useState<number>(30);
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [overtimeRate, setOvertimeRate] = useState<number>(37.5);
  const [regularHoursLimit, setRegularHoursLimit] = useState<number>(40);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [regularHours, setRegularHours] = useState<number>(0);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [totalPay, setTotalPay] = useState<number>(0);
  const { toast } = useToast();

  // Calculate hours when inputs change
  useEffect(() => {
    calculateHours();
  }, [startDate, startTime, endDate, endTime, breakMinutes, hourlyRate, overtimeRate, regularHoursLimit]);

  // Function to calculate total hours and pay
  const calculateHours = () => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (start >= end) {
      setTotalHours(0);
      setTotalMinutes(0);
      setRegularHours(0);
      setOvertimeHours(0);
      setTotalPay(0);
      return;
    }

    // Calculate total time in milliseconds
    const diffMs = end.getTime() - start.getTime();
    const totalMins = Math.floor(diffMs / (1000 * 60)) - breakMinutes;
    const hours = totalMins / 60;

    setTotalHours(hours);
    setTotalMinutes(totalMins);

    // Calculate regular and overtime hours
    let regular = 0;
    let overtime = 0;

    if (hours <= regularHoursLimit) {
      regular = hours;
      overtime = 0;
    } else {
      regular = regularHoursLimit;
      overtime = hours - regularHoursLimit;
    }

    setRegularHours(regular);
    setOvertimeHours(overtime);

    // Calculate total pay
    const pay = (regular * hourlyRate) + (overtime * overtimeRate);
    setTotalPay(pay);
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
    setStartTime('09:00');
    setEndTime('17:00');
    setBreakMinutes(30);
    setHourlyRate(25);
    setOvertimeRate(37.5);
    setRegularHoursLimit(40);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Hours Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate work hours, breaks, overtime, and total pay
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5" /> Time Entry
          </h2>
          
          <div className="space-y-4">
            {/* Start Date and Time */}
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  className="mt-2"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>

            {/* End Date and Time */}
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  className="mt-2"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {/* Break Minutes */}
            <div>
              <Label htmlFor="breakMinutes">Break Time (minutes)</Label>
              <Input
                id="breakMinutes"
                type="number"
                min="0"
                className="mt-2"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        {/* Pay Rate Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Pay Rates (Optional)</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-2"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="overtimeRate">Overtime Rate ($)</Label>
                <Input
                  id="overtimeRate"
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-2"
                  value={overtimeRate}
                  onChange={(e) => setOvertimeRate(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="regularHoursLimit">Regular Hours Limit (per week)</Label>
              <Input
                id="regularHoursLimit"
                type="number"
                min="0"
                className="mt-2"
                value={regularHoursLimit}
                onChange={(e) => setRegularHoursLimit(Number(e.target.value))}
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {totalHours > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              {/* Total Hours */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Hours Worked</h3>
                    <div className="text-4xl font-bold">
                      {totalHours.toFixed(2)} hours
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.floor(totalHours)} hours {Math.round((totalHours % 1) * 60)} minutes
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalHours.toFixed(2), 'Total Hours')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Regular Hours */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Regular Hours</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {regularHours.toFixed(2)} hrs
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        @ {formatCurrency(hourlyRate)}/hr
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(regularHours.toFixed(2), 'Regular Hours')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Overtime Hours */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Overtime Hours</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {overtimeHours.toFixed(2)} hrs
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        @ {formatCurrency(overtimeRate)}/hr
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(overtimeHours.toFixed(2), 'Overtime Hours')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Total Pay */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mt-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Pay</h3>
                    <div className="text-4xl font-bold">
                      {formatCurrency(totalPay)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(formatCurrency(totalPay), 'Total Pay')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">How to Use</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Track Hours</h3>
              <p className="text-muted-foreground text-sm">
                Enter start and end dates/times to calculate total hours worked, including multi-day shifts.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Include Breaks</h3>
              <p className="text-muted-foreground text-sm">
                Subtract break time from total hours to get accurate work time calculations.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Calculate Pay</h3>
              <p className="text-muted-foreground text-sm">
                Add hourly rates to calculate total pay, including overtime compensation at a higher rate.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HoursCalculator;
