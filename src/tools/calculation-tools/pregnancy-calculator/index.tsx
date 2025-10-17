import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calendar, Baby, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PregnancyCalculator Component
 * 
 * Calculate pregnancy milestones and trimester information
 */
export function PregnancyCalculator() {
  const { toast } = useToast();

  // State for input values
  const [lmpDate, setLmpDate] = useState<string>('');
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>('');
  const [trimester, setTrimester] = useState<number>(0);
  const [daysPregnant, setDaysPregnant] = useState<number>(0);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);

  // Calculate pregnancy details when LMP changes
  useEffect(() => {
    if (lmpDate) {
      calculatePregnancy();
    }
  }, [lmpDate]);

  // Initialize with today's date minus 10 weeks
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 70); // ~10 weeks ago
    setLmpDate(today.toISOString().split('T')[0]);
  }, []);

  // Function to calculate pregnancy details
  const calculatePregnancy = () => {
    const lmp = new Date(lmpDate);
    const today = new Date();
    
    // Calculate days pregnant
    const daysDiff = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
    setDaysPregnant(daysDiff);
    
    // Calculate weeks and days
    const weeks = Math.floor(daysDiff / 7);
    const days = daysDiff % 7;
    setCurrentWeek(weeks);
    setCurrentDay(days);
    
    // Calculate due date (280 days / 40 weeks from LMP)
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);
    setDueDate(due.toLocaleDateString());
    
    // Calculate days remaining
    const remaining = Math.max(0, Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    setDaysRemaining(remaining);
    
    // Determine trimester
    if (weeks < 13) {
      setTrimester(1);
    } else if (weeks < 27) {
      setTrimester(2);
    } else {
      setTrimester(3);
    }
  };

  // Function to reset all values
  const handleReset = () => {
    const today = new Date();
    today.setDate(today.getDate() - 70);
    setLmpDate(today.toISOString().split('T')[0]);
  };

  // Get trimester info
  const getTrimesterInfo = (tri: number): { name: string; weeks: string; color: string } => {
    const info = {
      1: { name: '1st Trimester', weeks: 'Weeks 1-12', color: 'blue' },
      2: { name: '2nd Trimester', weeks: 'Weeks 13-26', color: 'green' },
      3: { name: '3rd Trimester', weeks: 'Weeks 27-40', color: 'purple' }
    };
    return info[tri as keyof typeof info] || info[1];
  };

  const trimesterInfo = getTrimesterInfo(trimester);

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Pregnancy Calculation:
Last Menstrual Period: ${new Date(lmpDate).toLocaleDateString()}
Current Progress: ${currentWeek} weeks, ${currentDay} days
Days Pregnant: ${daysPregnant}
Trimester: ${trimesterInfo.name} (${trimesterInfo.weeks})
Due Date: ${dueDate}
Days Remaining: ${daysRemaining}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pregnancy Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Track your pregnancy week by week with trimester information
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Pregnancy Details
          </h2>
          
          <div className="space-y-6">
            {/* LMP Date */}
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
                First day of your last menstrual period
              </p>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Your Pregnancy</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                    <h3 className="text-sm font-medium text-pink-800 dark:text-pink-200 flex items-center">
                      <Baby className="mr-2 h-4 w-4" />
                      Current Progress
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-pink-600 dark:text-pink-400">
                      {currentWeek}w {currentDay}d
                    </div>
                    <p className="text-sm text-pink-600 dark:text-pink-400 mt-1">
                      {daysPregnant} days pregnant
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    trimesterInfo.color === 'blue' ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' :
                    trimesterInfo.color === 'green' ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' :
                    'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800'
                  }`}>
                    <h3 className="text-sm font-medium">Current Trimester</h3>
                    <div className={`mt-1 text-2xl font-bold ${
                      trimesterInfo.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      trimesterInfo.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      'text-purple-600 dark:text-purple-400'
                    }`}>
                      {trimesterInfo.name}
                    </div>
                    <p className="text-sm mt-1 opacity-80">{trimesterInfo.weeks}</p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {dueDate}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      Days Remaining
                    </h3>
                    <div className="mt-1 text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {daysRemaining}
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      {Math.floor(daysRemaining / 7)} weeks remaining
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Pregnancy Trimesters</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-blue-600 dark:text-blue-400">1st Trimester (Weeks 1-12)</p>
                <p>• Early development and major organs form</p>
              </div>
              <div>
                <p className="font-medium text-green-600 dark:text-green-400">2nd Trimester (Weeks 13-26)</p>
                <p>• Rapid growth and movement begins</p>
              </div>
              <div>
                <p className="font-medium text-purple-600 dark:text-purple-400">3rd Trimester (Weeks 27-40)</p>
                <p>• Final development and preparation for birth</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PregnancyCalculator;
