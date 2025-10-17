import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, Copy, RefreshCw, Heart, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PeriodCalculator Component
 * 
 * Calculate next period date, ovulation date, and fertile window
 */
export function PeriodCalculator() {
  const { toast } = useToast();

  // State for input values
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  
  // State for calculated results
  const [nextPeriodDate, setNextPeriodDate] = useState<string>('');
  const [ovulationDate, setOvulationDate] = useState<string>('');
  const [fertileWindowStart, setFertileWindowStart] = useState<string>('');
  const [fertileWindowEnd, setFertileWindowEnd] = useState<string>('');
  const [daysUntilNextPeriod, setDaysUntilNextPeriod] = useState<number>(0);

  // Calculate dates when inputs change
  useEffect(() => {
    if (lastPeriodDate) {
      calculateDates();
    }
  }, [lastPeriodDate, cycleLength, periodLength]);

  // Function to format date as readable string
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Function to add days to a date
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Function to calculate all dates
  const calculateDates = () => {
    const startDate = new Date(lastPeriodDate);
    
    // Calculate next period date (add cycle length)
    const nextPeriod = addDays(startDate, cycleLength);
    setNextPeriodDate(formatDate(nextPeriod));
    
    // Calculate ovulation date (14 days before next period)
    const ovulation = addDays(nextPeriod, -14);
    setOvulationDate(formatDate(ovulation));
    
    // Fertile window: 5 days before ovulation to 1 day after
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    setFertileWindowStart(formatDate(fertileStart));
    setFertileWindowEnd(formatDate(fertileEnd));
    
    // Calculate days until next period
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    nextPeriod.setHours(0, 0, 0, 0);
    const diffTime = nextPeriod.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilNextPeriod(diffDays);
  };

  // Function to reset all values
  const handleReset = () => {
    setLastPeriodDate('');
    setCycleLength(28);
    setPeriodLength(5);
    setNextPeriodDate('');
    setOvulationDate('');
    setFertileWindowStart('');
    setFertileWindowEnd('');
    setDaysUntilNextPeriod(0);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Period Calendar:
Last Period: ${lastPeriodDate}
Cycle Length: ${cycleLength} days
Period Length: ${periodLength} days

Next Period: ${nextPeriodDate}
Days Until Next Period: ${daysUntilNextPeriod}
Ovulation Date: ${ovulationDate}
Fertile Window: ${fertileWindowStart} - ${fertileWindowEnd}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Period calendar copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Period Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Track your menstrual cycle and predict your next period and fertile window
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Cycle Information
          </h2>
          
          <div className="space-y-6">
            {/* Last Period Date */}
            <div>
              <Label htmlFor="lastPeriodDate">First Day of Last Period</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="lastPeriodDate"
                  type="date"
                  className="pl-10"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                />
              </div>
            </div>

            {/* Cycle Length */}
            <div>
              <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
              <div className="relative mt-1.5">
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="cycleLength"
                  type="number"
                  className="pl-10"
                  value={cycleLength}
                  min={21}
                  max={35}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Typical range: 21-35 days (average is 28 days)
              </p>
            </div>

            {/* Period Length */}
            <div>
              <Label htmlFor="periodLength">Period Length (days)</Label>
              <div className="relative mt-1.5">
                <Heart className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="periodLength"
                  type="number"
                  className="pl-10"
                  value={periodLength}
                  min={2}
                  max={10}
                  onChange={(e) => setPeriodLength(Number(e.target.value))}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Typical range: 2-7 days (average is 5 days)
              </p>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {lastPeriodDate && (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Your Calendar</h2>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                      <h3 className="text-sm font-medium text-pink-800 dark:text-pink-200">
                        Next Period Date
                      </h3>
                      <div className="mt-2 text-2xl font-bold text-pink-600 dark:text-pink-400">
                        {nextPeriodDate}
                      </div>
                      <p className="text-sm text-pink-700 dark:text-pink-300 mt-1">
                        {daysUntilNextPeriod > 0 
                          ? `In ${daysUntilNextPeriod} days` 
                          : daysUntilNextPeriod === 0 
                            ? 'Today' 
                            : `${Math.abs(daysUntilNextPeriod)} days ago`}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                        Ovulation Date
                      </h3>
                      <div className="mt-1 text-xl font-bold text-purple-600 dark:text-purple-400">
                        {ovulationDate}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Fertile Window
                      </h3>
                      <div className="mt-1 text-lg font-bold text-blue-600 dark:text-blue-400">
                        {fertileWindowStart}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">to</div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {fertileWindowEnd}
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Your Cycle Summary
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Cycle Length:</span>
                          <span className="font-semibold">{cycleLength} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Period Length:</span>
                          <span className="font-semibold">{periodLength} days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Period Tracking</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • The average menstrual cycle is 28 days, but can vary from 21-35 days
              </p>
              <p>
                • Ovulation typically occurs 14 days before the next period
              </p>
              <p>
                • The fertile window is approximately 6 days ending on ovulation day
              </p>
              <p>
                • This calculator provides estimates based on average cycles
              </p>
              <p>
                • Actual dates may vary - consult healthcare provider for accuracy
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PeriodCalculator;
