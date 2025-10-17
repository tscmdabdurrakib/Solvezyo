import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calendar, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

/**
 * DayOfWeekCalculator Component
 * 
 * Determines the day of the week for any given date
 */
export function DayOfWeekCalculator() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dayOfWeek, setDayOfWeek] = useState<string>('');
  const [dayNumber, setDayNumber] = useState<number>(0);
  const [weekOfYear, setWeekOfYear] = useState<number>(0);
  const [dayOfYear, setDayOfYear] = useState<number>(0);
  const { toast } = useToast();

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Calculate day of week when date changes
  useEffect(() => {
    calculateDayOfWeek();
  }, [selectedDate]);

  /**
   * Function to calculate day of week and related information
   */
  const calculateDayOfWeek = () => {
    const date = new Date(selectedDate);
    
    // Get day of week (0-6, Sunday = 0)
    const day = date.getDay();
    setDayNumber(day);
    setDayOfWeek(dayNames[day]);

    // Calculate week of year (ISO week)
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    setWeekOfYear(weekNum);

    // Calculate day of year
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day_of_year = Math.floor(diff / oneDay);
    setDayOfYear(day_of_year);
  };

  // Function to copy result to clipboard
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Function to reset to today
  const handleReset = () => {
    setSelectedDate(new Date());
  };

  // Function to set to a specific day
  const setToNextDay = (targetDay: number) => {
    const current = new Date(selectedDate);
    const currentDay = current.getDay();
    const daysToAdd = (targetDay - currentDay + 7) % 7 || 7;
    current.setDate(current.getDate() + daysToAdd);
    setSelectedDate(current);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Day of the Week Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Find out what day of the week any date falls on
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Select Date
          </h2>
          
          <div className="space-y-4">
            {/* Date Picker */}
            <div>
              <Label htmlFor="selectedDate">Choose a Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b">
                    <div className="flex gap-2">
                      <Select
                        value={selectedDate.getMonth().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(selectedDate);
                          newDate.setMonth(parseInt(value));
                          setSelectedDate(newDate);
                        }}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">January</SelectItem>
                          <SelectItem value="1">February</SelectItem>
                          <SelectItem value="2">March</SelectItem>
                          <SelectItem value="3">April</SelectItem>
                          <SelectItem value="4">May</SelectItem>
                          <SelectItem value="5">June</SelectItem>
                          <SelectItem value="6">July</SelectItem>
                          <SelectItem value="7">August</SelectItem>
                          <SelectItem value="8">September</SelectItem>
                          <SelectItem value="9">October</SelectItem>
                          <SelectItem value="10">November</SelectItem>
                          <SelectItem value="11">December</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={selectedDate.getFullYear().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(selectedDate);
                          newDate.setFullYear(parseInt(value));
                          setSelectedDate(newDate);
                        }}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 200 }, (_, i) => 1900 + i).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    month={selectedDate}
                    onMonthChange={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleReset} variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Today
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>

            {/* Quick Day Selection */}
            <div>
              <Label className="mb-2 block">Jump to Next:</Label>
              <div className="grid grid-cols-4 gap-2">
                <Button size="sm" variant="outline" onClick={() => setToNextDay(1)}>Mon</Button>
                <Button size="sm" variant="outline" onClick={() => setToNextDay(2)}>Tue</Button>
                <Button size="sm" variant="outline" onClick={() => setToNextDay(3)}>Wed</Button>
                <Button size="sm" variant="outline" onClick={() => setToNextDay(4)}>Thu</Button>
                <Button size="sm" variant="outline" onClick={() => setToNextDay(5)}>Fri</Button>
                <Button size="sm" variant="outline" onClick={() => setToNextDay(6)}>Sat</Button>
                <Button size="sm" variant="outline" onClick={() => setToNextDay(0)}>Sun</Button>
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
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Result
            </h2>
            
            {/* Primary Result */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Day of the Week</h3>
                  <div className="text-4xl font-bold">
                    {dayOfWeek}
                  </div>
                  <p className="text-muted-foreground mt-2">
                    {format(selectedDate, "MMMM d, yyyy")}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(dayOfWeek, 'Day of Week')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Day Number */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Day Number</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {dayNumber} ({dayNumber === 0 ? 'Sunday' : dayNumber === 1 ? 'Monday' : dayNumber === 2 ? 'Tuesday' : dayNumber === 3 ? 'Wednesday' : dayNumber === 4 ? 'Thursday' : dayNumber === 5 ? 'Friday' : 'Saturday'})
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">0 = Sunday, 6 = Saturday</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(dayNumber.toString(), 'Day Number')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Week of Year */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Week of Year</h3>
                    <div className="mt-1 text-2xl font-bold">
                      Week {weekOfYear}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Out of 52 weeks</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(weekOfYear.toString(), 'Week of Year')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Day of Year */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Day of Year</h3>
                    <div className="mt-1 text-2xl font-bold">
                      Day {dayOfYear}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Out of 365/366 days</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(dayOfYear.toString(), 'Day of Year')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Days Remaining */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Days Remaining in Year</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {(selectedDate.getFullYear() % 4 === 0 ? 366 : 365) - dayOfYear} days
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Until end of year</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(((selectedDate.getFullYear() % 4 === 0 ? 366 : 365) - dayOfYear).toString(), 'Days Remaining')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Day of Week Calculator</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Historical Dates</h3>
              <p className="text-muted-foreground text-sm">
                Find the day of the week for any historical date from 1900 onwards.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Quick Navigation</h3>
              <p className="text-muted-foreground text-sm">
                Jump to the next occurrence of any specific day of the week instantly.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Additional Info</h3>
              <p className="text-muted-foreground text-sm">
                View week number, day of year, and remaining days for comprehensive date information.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DayOfWeekCalculator;
