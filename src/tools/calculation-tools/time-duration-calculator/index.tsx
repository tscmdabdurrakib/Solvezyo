import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * TimeDurationCalculator Component
 * 
 * Calculates time duration between two times or adds/subtracts time
 */
export function TimeDurationCalculator() {
  // Start time
  const [startHours, setStartHours] = useState<string>('9');
  const [startMinutes, setStartMinutes] = useState<string>('30');
  const [startSeconds, setStartSeconds] = useState<string>('0');
  const [startPeriod, setStartPeriod] = useState<string>('AM');

  // End time
  const [endHours, setEndHours] = useState<string>('5');
  const [endMinutes, setEndMinutes] = useState<string>('45');
  const [endSeconds, setEndSeconds] = useState<string>('0');
  const [endPeriod, setEndPeriod] = useState<string>('PM');

  // Results
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [formattedDuration, setFormattedDuration] = useState<string>('');
  const [decimalHours, setDecimalHours] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    calculateDuration();
  }, [startHours, startMinutes, startSeconds, startPeriod, endHours, endMinutes, endSeconds, endPeriod]);

  const convertTo24Hour = (hours: number, period: string): number => {
    if (period === 'AM') {
      return hours === 12 ? 0 : hours;
    } else {
      return hours === 12 ? 12 : hours + 12;
    }
  };

  const calculateDuration = () => {
    const sHours = parseInt(startHours) || 0;
    const sMinutes = parseInt(startMinutes) || 0;
    const sSeconds = parseInt(startSeconds) || 0;

    const eHours = parseInt(endHours) || 0;
    const eMinutes = parseInt(endMinutes) || 0;
    const eSeconds = parseInt(endSeconds) || 0;

    // Convert to 24-hour format
    const start24 = convertTo24Hour(sHours, startPeriod);
    const end24 = convertTo24Hour(eHours, endPeriod);

    // Calculate total seconds
    const startTotalSeconds = start24 * 3600 + sMinutes * 60 + sSeconds;
    let endTotalSeconds = end24 * 3600 + eMinutes * 60 + eSeconds;

    // If end time is before start time, assume it's the next day
    if (endTotalSeconds < startTotalSeconds) {
      endTotalSeconds += 24 * 3600;
    }

    const durationSeconds = endTotalSeconds - startTotalSeconds;

    // Break down into hours, minutes, seconds
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    setTotalHours(hours);
    setTotalMinutes(minutes);
    setTotalSeconds(seconds);

    // Format duration
    const formatted = `${hours}h ${minutes}m ${seconds}s`;
    setFormattedDuration(formatted);

    // Calculate decimal hours
    const decHours = durationSeconds / 3600;
    setDecimalHours(decHours);
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Time Duration Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the duration between two times
        </p>
      </div>

      <div className="grid gap-6">
        {/* Start Time */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5" /> Start Time
          </h2>
          
          <div className="grid gap-4 grid-cols-4">
            <div>
              <Label htmlFor="startHours">Hours</Label>
              <Input
                id="startHours"
                type="number"
                value={startHours}
                onChange={(e) => setStartHours(e.target.value)}
                placeholder="9"
                min="1"
                max="12"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="startMinutes">Minutes</Label>
              <Input
                id="startMinutes"
                type="number"
                value={startMinutes}
                onChange={(e) => setStartMinutes(e.target.value)}
                placeholder="30"
                min="0"
                max="59"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="startSeconds">Seconds</Label>
              <Input
                id="startSeconds"
                type="number"
                value={startSeconds}
                onChange={(e) => setStartSeconds(e.target.value)}
                placeholder="0"
                min="0"
                max="59"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="startPeriod">Period</Label>
              <div className="mt-2 flex gap-2">
                <Button
                  variant={startPeriod === 'AM' ? 'default' : 'outline'}
                  onClick={() => setStartPeriod('AM')}
                  className="flex-1"
                >
                  AM
                </Button>
                <Button
                  variant={startPeriod === 'PM' ? 'default' : 'outline'}
                  onClick={() => setStartPeriod('PM')}
                  className="flex-1"
                >
                  PM
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* End Time */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> End Time
          </h2>
          
          <div className="grid gap-4 grid-cols-4">
            <div>
              <Label htmlFor="endHours">Hours</Label>
              <Input
                id="endHours"
                type="number"
                value={endHours}
                onChange={(e) => setEndHours(e.target.value)}
                placeholder="5"
                min="1"
                max="12"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="endMinutes">Minutes</Label>
              <Input
                id="endMinutes"
                type="number"
                value={endMinutes}
                onChange={(e) => setEndMinutes(e.target.value)}
                placeholder="45"
                min="0"
                max="59"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="endSeconds">Seconds</Label>
              <Input
                id="endSeconds"
                type="number"
                value={endSeconds}
                onChange={(e) => setEndSeconds(e.target.value)}
                placeholder="0"
                min="0"
                max="59"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="endPeriod">Period</Label>
              <div className="mt-2 flex gap-2">
                <Button
                  variant={endPeriod === 'AM' ? 'default' : 'outline'}
                  onClick={() => setEndPeriod('AM')}
                  className="flex-1"
                >
                  AM
                </Button>
                <Button
                  variant={endPeriod === 'PM' ? 'default' : 'outline'}
                  onClick={() => setEndPeriod('PM')}
                  className="flex-1"
                >
                  PM
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Duration</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg md:col-span-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Duration</h3>
                    <div className="text-5xl font-bold">
                      {formattedDuration}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      From {startHours}:{startMinutes.padStart(2, '0')} {startPeriod} to {endHours}:{endMinutes.padStart(2, '0')} {endPeriod}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(formattedDuration, 'Duration')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Hours</h3>
                    <div className="text-2xl font-bold">
                      {totalHours} hours
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {decimalHours.toFixed(2)} decimal hours
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${totalHours} hours`, 'Total Hours')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Minutes</h3>
                    <div className="text-2xl font-bold">
                      {totalHours * 60 + totalMinutes} min
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Including hours
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${totalHours * 60 + totalMinutes} minutes`, 'Total Minutes')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Common Use Cases</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Work Hours</h3>
              <p className="text-muted-foreground text-sm">
                Calculate total working hours for timesheets, payroll, and productivity tracking.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Event Planning</h3>
              <p className="text-muted-foreground text-sm">
                Determine duration of meetings, events, or activities for better scheduling.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Travel Time</h3>
              <p className="text-muted-foreground text-sm">
                Calculate flight duration, driving time, or any time-based intervals.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TimeDurationCalculator;
