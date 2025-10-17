import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calendar, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PregnancyConceptionCalculator Component
 * 
 * Estimate conception date from due date or LMP
 */
export function PregnancyConceptionCalculator() {
  const { toast } = useToast();

  const [calculationMethod, setCalculationMethod] = useState<string>('lmp');
  const [lmpDate, setLmpDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [conceptionDate, setConceptionDate] = useState<string>('');
  const [conceptionRangeStart, setConceptionRangeStart] = useState<string>('');
  const [conceptionRangeEnd, setConceptionRangeEnd] = useState<string>('');

  useEffect(() => {
    if (calculationMethod === 'lmp' && lmpDate) {
      calculateFromLMP();
    } else if (calculationMethod === 'due' && dueDate) {
      calculateFromDueDate();
    }
  }, [calculationMethod, lmpDate, dueDate]);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 70);
    setLmpDate(today.toISOString().split('T')[0]);
  }, []);

  const calculateFromLMP = () => {
    const lmp = new Date(lmpDate);
    
    // Conception typically occurs 11-21 days after LMP (ovulation)
    const conceptionStart = new Date(lmp);
    conceptionStart.setDate(conceptionStart.getDate() + 11);
    
    const conceptionEnd = new Date(lmp);
    conceptionEnd.setDate(conceptionEnd.getDate() + 21);
    
    const conceptionMid = new Date(lmp);
    conceptionMid.setDate(conceptionMid.getDate() + 14); // Average ovulation day
    
    setConceptionDate(conceptionMid.toLocaleDateString());
    setConceptionRangeStart(conceptionStart.toLocaleDateString());
    setConceptionRangeEnd(conceptionEnd.toLocaleDateString());
  };

  const calculateFromDueDate = () => {
    const due = new Date(dueDate);
    
    // Work backwards: due date - 266 days (38 weeks)
    const conception = new Date(due);
    conception.setDate(conception.getDate() - 266);
    
    const conceptionStart = new Date(conception);
    conceptionStart.setDate(conceptionStart.getDate() - 5);
    
    const conceptionEnd = new Date(conception);
    conceptionEnd.setDate(conceptionEnd.getDate() + 5);
    
    setConceptionDate(conception.toLocaleDateString());
    setConceptionRangeStart(conceptionStart.toLocaleDateString());
    setConceptionRangeEnd(conceptionEnd.toLocaleDateString());
  };

  const handleReset = () => {
    const today = new Date();
    today.setDate(today.getDate() - 70);
    setLmpDate(today.toISOString().split('T')[0]);
    setDueDate('');
    setCalculationMethod('lmp');
  };

  const copyToClipboard = () => {
    const result = `Conception Date Estimate:
Estimated Conception: ${conceptionDate}
Conception Window: ${conceptionRangeStart} - ${conceptionRangeEnd}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pregnancy Conception Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Estimate your conception date from due date or last menstrual period
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
                  <SelectItem value="due">Due Date</SelectItem>
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
              </div>
            ) : (
              <div>
                <Label htmlFor="due">Due Date</Label>
                <Input
                  id="due"
                  type="date"
                  className="mt-1.5"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
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
                  <h2 className="text-xl font-semibold">Conception Estimate</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                    <h3 className="text-sm font-medium text-pink-800 dark:text-pink-200 flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      Estimated Conception Date
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-pink-600 dark:text-pink-400">
                      {conceptionDate || 'Enter a date'}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Conception Window</h3>
                    <div className="mt-2 text-lg font-semibold">
                      {conceptionRangeStart || '---'}
                    </div>
                    <div className="text-sm text-muted-foreground my-1">to</div>
                    <div className="text-lg font-semibold">
                      {conceptionRangeEnd || '---'}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Conception Dating</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Conception typically occurs during ovulation</p>
              <p>• Ovulation usually happens 11-21 days after LMP</p>
              <p>• Sperm can survive up to 5 days</p>
              <p>• These are estimates - exact timing varies</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PregnancyConceptionCalculator;
