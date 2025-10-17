import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * TimeCalculator Component
 * 
 * Calculates time differences and adds/subtracts time
 */
export function TimeCalculator() {
  const [mode, setMode] = useState<string>('difference');
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [baseTime, setBaseTime] = useState<string>('12:00');
  const [operation, setOperation] = useState<string>('add');
  const [hoursDelta, setHoursDelta] = useState<number>(2);
  const [minutesDelta, setMinutesDelta] = useState<number>(30);
  const [secondsDelta, setSecondsDelta] = useState<number>(0);
  const [diffHours, setDiffHours] = useState<number>(0);
  const [diffMinutes, setDiffMinutes] = useState<number>(0);
  const [diffSeconds, setDiffSeconds] = useState<number>(0);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [resultTime, setResultTime] = useState<string>('');
  const { toast } = useToast();

  // Calculate when inputs change
  useEffect(() => {
    if (mode === 'difference') {
      calculateDifference();
    } else {
      calculateNewTime();
    }
  }, [mode, startTime, endTime, baseTime, operation, hoursDelta, minutesDelta, secondsDelta]);

  // Parse time string to total seconds
  const timeToSeconds = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60;
  };

  // Convert seconds to time string
  const secondsToTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  // Calculate difference between two times
  const calculateDifference = () => {
    const start = timeToSeconds(startTime);
    const end = timeToSeconds(endTime);

    let diff = end - start;
    if (diff < 0) {
      diff += 24 * 3600; // Add 24 hours if end is before start (next day)
    }

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    setDiffHours(hours);
    setDiffMinutes(minutes);
    setDiffSeconds(seconds);
    setTotalMinutes(Math.floor(diff / 60));
    setTotalSeconds(diff);
  };

  // Calculate new time by adding/subtracting
  const calculateNewTime = () => {
    const base = timeToSeconds(baseTime);
    const deltaSeconds = hoursDelta * 3600 + minutesDelta * 60 + secondsDelta;

    let result = operation === 'add' ? base + deltaSeconds : base - deltaSeconds;

    // Handle wrap around (keep within 24-hour format)
    while (result < 0) result += 24 * 3600;
    while (result >= 24 * 3600) result -= 24 * 3600;

    setResultTime(secondsToTime(result));
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
    setStartTime('09:00');
    setEndTime('17:00');
    setBaseTime('12:00');
    setHoursDelta(2);
    setMinutesDelta(30);
    setSecondsDelta(0);
    setOperation('add');
  };

  // Set current time
  const setToCurrentTime = () => {
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (mode === 'difference') {
      setStartTime(timeString);
    } else {
      setBaseTime(timeString);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Time Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate time differences or add/subtract time durations
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
              <SelectItem value="difference">Time Difference</SelectItem>
              <SelectItem value="addsubtract">Add/Subtract Time</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Time Difference Mode */}
        {mode === 'difference' && (
          <>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5" /> Select Times
              </h2>
              
              <div className="space-y-4">
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

                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={setToCurrentTime} variant="outline">
                    <Clock className="mr-2 h-4 w-4" /> Now
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Time Difference</h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg mb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Duration</h3>
                      <div className="text-4xl font-bold">
                        {diffHours}h {diffMinutes}m {diffSeconds}s
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(`${diffHours}h ${diffMinutes}m ${diffSeconds}s`, 'Duration')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Minutes</h3>
                        <div className="mt-1 text-2xl font-bold">
                          {totalMinutes.toLocaleString()} min
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(totalMinutes.toString(), 'Total Minutes')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Seconds</h3>
                        <div className="mt-1 text-2xl font-bold">
                          {totalSeconds.toLocaleString()} sec
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(totalSeconds.toString(), 'Total Seconds')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
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
                <Clock className="mr-2 h-5 w-5" /> Calculate New Time
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="baseTime">Base Time</Label>
                  <Input
                    id="baseTime"
                    type="time"
                    className="mt-2"
                    value={baseTime}
                    onChange={(e) => setBaseTime(e.target.value)}
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
                  <Label htmlFor="hours">Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    className="mt-2"
                    value={hoursDelta}
                    onChange={(e) => setHoursDelta(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="minutes">Minutes</Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    className="mt-2"
                    value={minutesDelta}
                    onChange={(e) => setMinutesDelta(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="seconds">Seconds</Label>
                  <Input
                    id="seconds"
                    type="number"
                    min="0"
                    max="59"
                    className="mt-2"
                    value={secondsDelta}
                    onChange={(e) => setSecondsDelta(Number(e.target.value))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={setToCurrentTime} variant="outline">
                    <Clock className="mr-2 h-4 w-4" /> Now
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
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
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">New Time</h3>
                      <div className="text-5xl font-bold">
                        {resultTime}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(resultTime, 'Result Time')}
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
              <h3 className="font-medium text-lg mb-2">Time Difference</h3>
              <p className="text-muted-foreground text-sm">
                Calculate the duration between two times. Useful for tracking work hours, event durations, or time elapsed.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Add/Subtract Time</h3>
              <p className="text-muted-foreground text-sm">
                Add or subtract hours, minutes, and seconds from any time. Perfect for scheduling, planning, or time zone conversions.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TimeCalculator;
