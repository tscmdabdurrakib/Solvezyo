import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Baby } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addDays, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';

/**
 * ConceptionCalculator Component
 * 
 * Calculates possible conception dates based on due date or last menstrual period.
 * Helps estimate when conception occurred for pregnancy planning.
 */
export function ConceptionCalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [calculationMethod, setCalculationMethod] = useState<'dueDate' | 'lmp'>('dueDate');
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [lastPeriod, setLastPeriod] = useState<Date | undefined>(new Date());
  
  // State for calculated results
  const [conceptionDate, setConceptionDate] = useState<Date | null>(null);
  const [conceptionRangeStart, setConceptionRangeStart] = useState<Date | null>(null);
  const [conceptionRangeEnd, setConceptionRangeEnd] = useState<Date | null>(null);
  const [estimatedDueDate, setEstimatedDueDate] = useState<Date | null>(null);
  const [weeksPregnant, setWeeksPregnant] = useState<number>(0);
  const [daysPregnant, setDaysPregnant] = useState<number>(0);

  // Calculate conception when inputs change
  useEffect(() => {
    calculateConception();
  }, [calculationMethod, dueDate, lastPeriod]);

  // Function to calculate conception date
  const calculateConception = () => {
    if (calculationMethod === 'dueDate') {
      if (!dueDate) {
        resetResults();
        return;
      }
      
      // Conception typically occurs 266 days (38 weeks) before due date
      const calculatedConception = new Date(dueDate);
      calculatedConception.setDate(calculatedConception.getDate() - 266);
      
      // Conception window is typically 11-21 days after last period
      // Working backwards from conception date
      const rangeStart = new Date(calculatedConception);
      rangeStart.setDate(rangeStart.getDate() - 3);
      
      const rangeEnd = new Date(calculatedConception);
      rangeEnd.setDate(rangeEnd.getDate() + 3);
      
      // Calculate LMP from conception date (conception typically occurs 14 days after LMP)
      const calculatedLMP = new Date(calculatedConception);
      calculatedLMP.setDate(calculatedLMP.getDate() - 14);
      
      // Calculate how far along (from today to LMP)
      const today = new Date();
      const daysSinceLMP = differenceInDays(today, calculatedLMP);
      const weeks = Math.floor(daysSinceLMP / 7);
      const days = daysSinceLMP % 7;
      
      setConceptionDate(calculatedConception);
      setConceptionRangeStart(rangeStart);
      setConceptionRangeEnd(rangeEnd);
      setEstimatedDueDate(dueDate);
      setWeeksPregnant(weeks);
      setDaysPregnant(days);
      
    } else {
      // Calculate from last menstrual period
      if (!lastPeriod) {
        resetResults();
        return;
      }
      
      // Conception typically occurs 14 days after LMP
      const calculatedConception = new Date(lastPeriod);
      calculatedConception.setDate(calculatedConception.getDate() + 14);
      
      // Conception window (11-21 days after LMP)
      const rangeStart = new Date(lastPeriod);
      rangeStart.setDate(rangeStart.getDate() + 11);
      
      const rangeEnd = new Date(lastPeriod);
      rangeEnd.setDate(rangeEnd.getDate() + 21);
      
      // Calculate due date (280 days from LMP)
      const calculatedDueDate = new Date(lastPeriod);
      calculatedDueDate.setDate(calculatedDueDate.getDate() + 280);
      
      // Calculate how far along
      const today = new Date();
      const daysSinceLMP = differenceInDays(today, lastPeriod);
      const weeks = Math.floor(daysSinceLMP / 7);
      const days = daysSinceLMP % 7;
      
      setConceptionDate(calculatedConception);
      setConceptionRangeStart(rangeStart);
      setConceptionRangeEnd(rangeEnd);
      setEstimatedDueDate(calculatedDueDate);
      setWeeksPregnant(weeks);
      setDaysPregnant(days);
    }
  };

  // Function to reset results
  const resetResults = () => {
    setConceptionDate(null);
    setConceptionRangeStart(null);
    setConceptionRangeEnd(null);
    setEstimatedDueDate(null);
    setWeeksPregnant(0);
    setDaysPregnant(0);
  };

  // Function to reset all values
  const handleReset = () => {
    setCalculationMethod('dueDate');
    setDueDate(new Date());
    setLastPeriod(new Date());
  };

  // Function to copy result to clipboard
  const handleCopy = () => {
    if (!conceptionDate || !conceptionRangeStart || !conceptionRangeEnd || !estimatedDueDate) return;
    
    const resultText = `Conception Date: ${format(conceptionDate, 'MMM dd, yyyy')}\nConception Window: ${format(conceptionRangeStart, 'MMM dd')} - ${format(conceptionRangeEnd, 'MMM dd, yyyy')}\nEstimated Due Date: ${format(estimatedDueDate, 'MMM dd, yyyy')}\nWeeks Pregnant: ${weeksPregnant}w ${daysPregnant}d`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "Conception calculation results copied successfully.",
    });
  };

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Conception Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate when conception likely occurred based on due date or last period
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Baby className="mr-2 h-5 w-5" /> Pregnancy Information
          </h2>
          
          <div className="space-y-6">
            {/* Calculation Method */}
            <div>
              <Label>Calculate From</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <Button
                  variant={calculationMethod === 'dueDate' ? 'default' : 'outline'}
                  onClick={() => setCalculationMethod('dueDate')}
                  className="w-full"
                >
                  Due Date
                </Button>
                <Button
                  variant={calculationMethod === 'lmp' ? 'default' : 'outline'}
                  onClick={() => setCalculationMethod('lmp')}
                  className="w-full"
                >
                  Last Period
                </Button>
              </div>
            </div>

            {/* Due Date Input */}
            {calculationMethod === 'dueDate' && (
              <div>
                <Label>Baby's Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1.5",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Last Period Input */}
            {calculationMethod === 'lmp' && (
              <div>
                <Label>First Day of Last Period</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1.5",
                        !lastPeriod && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {lastPeriod ? format(lastPeriod, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={lastPeriod}
                      onSelect={setLastPeriod}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={conceptionDate?.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Conception Estimate</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Most Likely Conception Date</h3>
                    <div className="mt-2 text-3xl font-bold text-primary">
                      {formatDate(conceptionDate)}
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                    <h3 className="text-sm font-medium text-muted-foreground">Conception Window</h3>
                    <div className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                      {conceptionRangeStart && conceptionRangeEnd 
                        ? `${format(conceptionRangeStart, 'MMM dd')} - ${format(conceptionRangeEnd, 'MMM dd')}`
                        : 'N/A'
                      }
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Possible conception dates
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Estimated Due Date</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatDate(estimatedDueDate)}
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Progress</h3>
                    <div className="text-3xl font-bold">
                      {weeksPregnant}w {daysPregnant}d
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Weeks pregnant (from LMP)
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Timeline</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>First Trimester:</span>
                        <span className="font-semibold">Weeks 1-13</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Second Trimester:</span>
                        <span className="font-semibold">Weeks 14-27</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Third Trimester:</span>
                        <span className="font-semibold">Weeks 28-40</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleCopy} className="w-full" disabled={!conceptionDate}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Result
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-3">About Conception Dating</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Conception typically occurs within 24 hours of ovulation, which usually happens 14 days after the first day of your last period.
              </p>
              <p>
                Due dates are calculated as 280 days (40 weeks) from the first day of the last menstrual period.
              </p>
              <p>
                These are estimates. Actual conception date can vary. Consult your healthcare provider for accurate dating and prenatal care.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ConceptionCalculator;
