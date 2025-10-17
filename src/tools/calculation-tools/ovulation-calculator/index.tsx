import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

/**
 * OvulationCalculator Component
 * 
 * Calculates ovulation date and fertile window based on last menstrual period
 * and average cycle length using standard fertility tracking methods.
 */
export function OvulationCalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [lastPeriod, setLastPeriod] = useState<Date | undefined>(new Date());
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  
  // State for calculated results
  const [ovulationDate, setOvulationDate] = useState<Date | null>(null);
  const [fertileWindowStart, setFertileWindowStart] = useState<Date | null>(null);
  const [fertileWindowEnd, setFertileWindowEnd] = useState<Date | null>(null);
  const [nextPeriod, setNextPeriod] = useState<Date | null>(null);

  // Calculate ovulation when inputs change
  useEffect(() => {
    calculateOvulation();
  }, [lastPeriod, cycleLength, periodLength]);

  // Function to calculate ovulation and fertile window
  const calculateOvulation = () => {
    if (!lastPeriod || cycleLength < 21 || cycleLength > 35) {
      setOvulationDate(null);
      setFertileWindowStart(null);
      setFertileWindowEnd(null);
      setNextPeriod(null);
      return;
    }
    
    // Ovulation typically occurs 14 days before the next period
    const daysUntilOvulation = cycleLength - 14;
    
    // Calculate ovulation date
    const calculatedOvulation = new Date(lastPeriod);
    calculatedOvulation.setDate(calculatedOvulation.getDate() + daysUntilOvulation);
    
    // Fertile window is typically 5 days before ovulation and the day of ovulation
    const calculatedFertileStart = new Date(calculatedOvulation);
    calculatedFertileStart.setDate(calculatedFertileStart.getDate() - 5);
    
    const calculatedFertileEnd = new Date(calculatedOvulation);
    calculatedFertileEnd.setDate(calculatedFertileEnd.getDate() + 1);
    
    // Calculate next period
    const calculatedNextPeriod = new Date(lastPeriod);
    calculatedNextPeriod.setDate(calculatedNextPeriod.getDate() + cycleLength);
    
    setOvulationDate(calculatedOvulation);
    setFertileWindowStart(calculatedFertileStart);
    setFertileWindowEnd(calculatedFertileEnd);
    setNextPeriod(calculatedNextPeriod);
  };

  // Function to reset all values
  const handleReset = () => {
    setLastPeriod(new Date());
    setCycleLength(28);
    setPeriodLength(5);
  };

  // Function to copy result to clipboard
  const handleCopy = () => {
    if (!ovulationDate || !fertileWindowStart || !fertileWindowEnd || !nextPeriod) return;
    
    const resultText = `Ovulation Date: ${format(ovulationDate, 'MMM dd, yyyy')}\nFertile Window: ${format(fertileWindowStart, 'MMM dd')} - ${format(fertileWindowEnd, 'MMM dd, yyyy')}\nNext Period: ${format(nextPeriod, 'MMM dd, yyyy')}`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "Ovulation calculation results copied successfully.",
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
        <h1 className="text-3xl font-bold tracking-tight">Ovulation Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your ovulation date and fertile window for family planning
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" /> Cycle Information
          </h2>
          
          <div className="space-y-6">
            {/* Last Period Date */}
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

            {/* Cycle Length */}
            <div>
              <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
              <Input
                id="cycleLength"
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="mt-1.5"
                min={21}
                max={35}
              />
              <Slider
                className="mt-2"
                defaultValue={[cycleLength]}
                max={35}
                min={21}
                step={1}
                value={[cycleLength]}
                onValueChange={(values) => setCycleLength(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>21 days</span>
                <span>28 days</span>
                <span>35 days</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Average menstrual cycle is 28 days
              </p>
            </div>

            {/* Period Length */}
            <div>
              <Label htmlFor="periodLength">Period Length (days)</Label>
              <Input
                id="periodLength"
                type="number"
                value={periodLength}
                onChange={(e) => setPeriodLength(Number(e.target.value))}
                className="mt-1.5"
                min={2}
                max={8}
              />
              <Slider
                className="mt-2"
                defaultValue={[periodLength]}
                max={8}
                min={2}
                step={1}
                value={[periodLength]}
                onValueChange={(values) => setPeriodLength(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>2 days</span>
                <span>5 days</span>
                <span>8 days</span>
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={ovulationDate?.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Fertile Window</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Ovulation Date</h3>
                    <div className="mt-2 text-3xl font-bold text-primary">
                      {formatDate(ovulationDate)}
                    </div>
                  </div>
                  
                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                    <h3 className="text-sm font-medium text-muted-foreground">Fertile Window</h3>
                    <div className="mt-2 text-xl font-bold text-green-600 dark:text-green-400">
                      {fertileWindowStart && fertileWindowEnd 
                        ? `${format(fertileWindowStart, 'MMM dd')} - ${format(fertileWindowEnd, 'MMM dd')}`
                        : 'N/A'
                      }
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Best time for conception
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Next Period Expected</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {formatDate(nextPeriod)}
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Cycle Breakdown</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Follicular Phase:</span>
                        <span className="font-semibold">Days 1-{cycleLength - 14}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ovulation:</span>
                        <span className="font-semibold">Day {cycleLength - 14}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Luteal Phase:</span>
                        <span className="font-semibold">Days {cycleLength - 13}-{cycleLength}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleCopy} className="w-full" disabled={!ovulationDate}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Result
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-3">Understanding Ovulation</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Ovulation typically occurs 14 days before your next period, regardless of cycle length.
              </p>
              <p>
                Your fertile window includes the 5 days before ovulation and the day of ovulation itself.
              </p>
              <p>
                This calculator provides estimates. For accurate fertility tracking, consider using ovulation tests or tracking basal body temperature.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OvulationCalculator;
