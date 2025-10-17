import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calendar, Baby } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * DueDateCalculator Component
 * 
 * Calculate estimated due date from LMP or conception date
 */
export function DueDateCalculator() {
  const { toast } = useToast();

  const [calculationMethod, setCalculationMethod] = useState<string>('lmp');
  const [lmpDate, setLmpDate] = useState<string>('');
  const [conceptionDate, setConceptionDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [weeksPregnant, setWeeksPregnant] = useState<number>(0);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);

  useEffect(() => {
    if (calculationMethod === 'lmp' && lmpDate) {
      calculateFromLMP();
    } else if (calculationMethod === 'conception' && conceptionDate) {
      calculateFromConception();
    }
  }, [calculationMethod, lmpDate, conceptionDate]);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 70);
    setLmpDate(today.toISOString().split('T')[0]);
  }, []);

  const calculateFromLMP = () => {
    const lmp = new Date(lmpDate);
    const today = new Date();
    
    // Due date = LMP + 280 days (40 weeks)
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);
    
    setDueDate(due.toLocaleDateString());
    
    // Calculate weeks pregnant
    const daysDiff = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(daysDiff / 7);
    setWeeksPregnant(weeks);
    
    // Calculate days remaining
    const remaining = Math.max(0, Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    setDaysRemaining(remaining);
  };

  const calculateFromConception = () => {
    const conception = new Date(conceptionDate);
    const today = new Date();
    
    // Due date = Conception + 266 days (38 weeks)
    const due = new Date(conception);
    due.setDate(due.getDate() + 266);
    
    setDueDate(due.toLocaleDateString());
    
    // Calculate weeks pregnant (add 2 weeks to conception age)
    const daysDiff = Math.floor((today.getTime() - conception.getTime()) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(daysDiff / 7) + 2;
    setWeeksPregnant(weeks);
    
    // Calculate days remaining
    const remaining = Math.max(0, Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    setDaysRemaining(remaining);
  };

  const handleReset = () => {
    const today = new Date();
    today.setDate(today.getDate() - 70);
    setLmpDate(today.toISOString().split('T')[0]);
    setConceptionDate('');
    setCalculationMethod('lmp');
  };

  const copyToClipboard = () => {
    const result = `Due Date Calculation:
Estimated Due Date: ${dueDate}
Weeks Pregnant: ${weeksPregnant}
Days Until Due Date: ${daysRemaining}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Due Date Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your estimated due date from LMP or conception date
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Calculation Method
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="method">Calculate From</Label>
              <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lmp">Last Menstrual Period</SelectItem>
                  <SelectItem value="conception">Conception Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {calculationMethod === 'lmp' ? (
              <div>
                <Label htmlFor="lmp">Last Menstrual Period (LMP)</Label>
                <Input
                  id="lmp"
                  type="date"
                  className="mt-1.5"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  First day of your last period
                </p>
              </div>
            ) : (
              <div>
                <Label htmlFor="conception">Conception Date</Label>
                <Input
                  id="conception"
                  type="date"
                  className="mt-1.5"
                  value={conceptionDate}
                  onChange={(e) => setConceptionDate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated date of conception
                </p>
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Your Due Date</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 flex items-center">
                      <Baby className="mr-2 h-4 w-4" />
                      Estimated Due Date
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {dueDate || 'Enter a date'}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Weeks Pregnant</h3>
                    <div className="mt-1 text-3xl font-bold">
                      {weeksPregnant} weeks
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Days Until Due Date
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {daysRemaining}
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {Math.floor(daysRemaining / 7)} weeks remaining
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Due Date Calculation</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Due date is calculated as 280 days from LMP</p>
              <p>• Or 266 days from conception date</p>
              <p>• Only 5% of babies arrive on their due date</p>
              <p>• Most babies arrive within 2 weeks of due date</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DueDateCalculator;
