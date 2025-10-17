import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Clock, Plus, Trash2, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface TimeEntry {
  id: string;
  day: string;
  timeIn: string;
  timeOut: string;
  breakMinutes: number;
}

/**
 * TimeCardCalculator Component
 * 
 * Calculate work hours and pay from time card entries
 */
export function TimeCardCalculator() {
  const { toast } = useToast();

  // State for time entries
  const [entries, setEntries] = useState<TimeEntry[]>([
    { id: '1', day: 'Monday', timeIn: '09:00', timeOut: '17:00', breakMinutes: 30 },
  ]);
  
  // State for pay rate
  const [hourlyRate, setHourlyRate] = useState<number>(15);
  const [overtimeRate, setOvertimeRate] = useState<number>(22.5);
  const [overtimeThreshold, setOvertimeThreshold] = useState<number>(40);

  // Add new entry
  const addEntry = () => {
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      day: 'Day ' + (entries.length + 1),
      timeIn: '09:00',
      timeOut: '17:00',
      breakMinutes: 30,
    };
    setEntries([...entries, newEntry]);
  };

  // Remove entry
  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  // Update entry
  const updateEntry = (id: string, field: keyof TimeEntry, value: string | number) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Calculate hours for single entry
  const calculateHours = (timeIn: string, timeOut: string, breakMinutes: number): number => {
    const [inHour, inMin] = timeIn.split(':').map(Number);
    const [outHour, outMin] = timeOut.split(':').map(Number);
    
    const inMinutes = inHour * 60 + inMin;
    const outMinutes = outHour * 60 + outMin;
    
    let totalMinutes = outMinutes - inMinutes;
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle overnight shifts
    
    totalMinutes -= breakMinutes;
    
    return totalMinutes / 60;
  };

  // Calculate totals
  const calculateTotals = () => {
    let totalHours = 0;
    
    entries.forEach(entry => {
      const hours = calculateHours(entry.timeIn, entry.timeOut, entry.breakMinutes);
      totalHours += hours;
    });

    // Calculate regular and overtime hours
    let regularHours = Math.min(totalHours, overtimeThreshold);
    let overtimeHours = Math.max(0, totalHours - overtimeThreshold);

    // Calculate pay
    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * overtimeRate;
    const totalPay = regularPay + overtimePay;

    return {
      totalHours: totalHours.toFixed(2),
      regularHours: regularHours.toFixed(2),
      overtimeHours: overtimeHours.toFixed(2),
      regularPay: regularPay.toFixed(2),
      overtimePay: overtimePay.toFixed(2),
      totalPay: totalPay.toFixed(2),
    };
  };

  const totals = calculateTotals();

  // Reset all values
  const handleReset = () => {
    setEntries([
      { id: '1', day: 'Monday', timeIn: '09:00', timeOut: '17:00', breakMinutes: 30 },
    ]);
    setHourlyRate(15);
    setOvertimeRate(22.5);
    setOvertimeThreshold(40);
  };

  // Copy results to clipboard
  const copyToClipboard = () => {
    let result = `Time Card Summary:\n\n`;
    
    entries.forEach((entry, index) => {
      const hours = calculateHours(entry.timeIn, entry.timeOut, entry.breakMinutes);
      result += `${entry.day}: ${entry.timeIn} - ${entry.timeOut} (${hours.toFixed(2)} hours)\n`;
    });
    
    result += `\nTotals:
Total Hours: ${totals.totalHours}
Regular Hours: ${totals.regularHours} @ $${hourlyRate}/hr = $${totals.regularPay}
Overtime Hours: ${totals.overtimeHours} @ $${overtimeRate}/hr = $${totals.overtimePay}
Total Pay: $${totals.totalPay}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Time card summary copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Time Card Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Track work hours and calculate pay with overtime
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Time Entries Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Clock className="mr-2 h-5 w-5" /> Time Entries
              </h2>
              <Button onClick={addEntry} size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Entry
              </Button>
            </div>

            <div className="space-y-4">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-muted/30 p-4 rounded-lg"
                >
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                      <Label className="text-xs">Day</Label>
                      <Input
                        type="text"
                        value={entry.day}
                        onChange={(e) => updateEntry(entry.id, 'day', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label className="text-xs">Time In</Label>
                      <Input
                        type="time"
                        value={entry.timeIn}
                        onChange={(e) => updateEntry(entry.id, 'timeIn', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label className="text-xs">Time Out</Label>
                      <Input
                        type="time"
                        value={entry.timeOut}
                        onChange={(e) => updateEntry(entry.id, 'timeOut', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">Break (min)</Label>
                      <Input
                        type="number"
                        value={entry.breakMinutes}
                        onChange={(e) => updateEntry(entry.id, 'breakMinutes', Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-1 flex items-end">
                      {entries.length > 1 && (
                        <Button
                          onClick={() => removeEntry(entry.id)}
                          variant="ghost"
                          size="sm"
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Hours: {calculateHours(entry.timeIn, entry.timeOut, entry.breakMinutes).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Pay Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DollarSign className="mr-2 h-5 w-5" /> Pay Settings
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  step="0.01"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="overtimeRate">Overtime Rate ($)</Label>
                <Input
                  id="overtimeRate"
                  type="number"
                  step="0.01"
                  value={overtimeRate}
                  onChange={(e) => setOvertimeRate(Number(e.target.value))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="overtimeThreshold">OT Threshold (hrs)</Label>
                <Input
                  id="overtimeThreshold"
                  type="number"
                  step="1"
                  value={overtimeThreshold}
                  onChange={(e) => setOvertimeThreshold(Number(e.target.value))}
                  className="mt-1.5"
                />
              </div>
            </div>
          </Card>
        </div>

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
                  <h2 className="text-xl font-semibold">Summary</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Total Pay
                    </h3>
                    <div className="mt-2 text-5xl font-bold text-green-600 dark:text-green-400">
                      ${totals.totalPay}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Hours Breakdown
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Hours:</span>
                        <span className="font-bold">{totals.totalHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Regular Hours:</span>
                        <span className="font-bold">{totals.regularHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overtime Hours:</span>
                        <span className="font-bold">{totals.overtimeHours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                      Pay Breakdown
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Regular Pay:</span>
                        <span className="font-bold">${totals.regularPay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Overtime Pay:</span>
                        <span className="font-bold">${totals.overtimePay}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Average per Day
                    </h3>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {entries.length > 0 ? (parseFloat(totals.totalHours) / entries.length).toFixed(2) : '0.00'} hrs
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Overtime is typically 1.5x regular pay
              </p>
              <p>
                • Most US states use 40 hours/week for OT
              </p>
              <p>
                • Don't forget to deduct break times
              </p>
              <p>
                • Double-check time entries for accuracy
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TimeCardCalculator;
