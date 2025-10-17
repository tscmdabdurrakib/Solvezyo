import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calendar, Cake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

/**
 * AgeCalculator Component
 * 
 * Calculates exact age in years, months, days, and other units
 */
export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date>(new Date('1990-01-01'));
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [totalWeeks, setTotalWeeks] = useState<number>(0);
  const [totalMonths, setTotalMonths] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [nextBirthday, setNextBirthday] = useState<string>('');
  const { toast } = useToast();

  // Calculate age when dates change
  useEffect(() => {
    calculateAge();
  }, [birthDate, targetDate]);

  // Function to calculate age
  const calculateAge = () => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      setYears(0);
      setMonths(0);
      setDays(0);
      setTotalDays(0);
      setTotalWeeks(0);
      setTotalMonths(0);
      setTotalHours(0);
      setTotalMinutes(0);
      setNextBirthday('');
      return;
    }

    // Calculate years, months, and days
    let y = target.getFullYear() - birth.getFullYear();
    let m = target.getMonth() - birth.getMonth();
    let d = target.getDate() - birth.getDate();

    // Adjust for negative days
    if (d < 0) {
      m--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      d += prevMonth.getDate();
    }

    // Adjust for negative months
    if (m < 0) {
      y--;
      m += 12;
    }

    setYears(y);
    setMonths(m);
    setDays(d);

    // Calculate total units
    const diffTime = target.getTime() - birth.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    setTotalDays(diffDays);
    setTotalWeeks(Math.floor(diffDays / 7));
    setTotalMonths(y * 12 + m);
    setTotalHours(diffDays * 24);
    setTotalMinutes(diffDays * 24 * 60);

    // Calculate next birthday
    const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }
    const daysUntilBday = Math.floor((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    setNextBirthday(`${daysUntilBday} days (${nextBday.toLocaleDateString()})`);
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
    setBirthDate(new Date('1990-01-01'));
    setTargetDate(new Date());
  };

  // Function to set target to today
  const setToToday = () => {
    setTargetDate(new Date());
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Age Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate exact age in years, months, days, and more
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Date Selection
          </h2>
          
          <div className="space-y-4">
            {/* Birth Date */}
            <div>
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b">
                    <div className="flex gap-2">
                      <Select
                        value={birthDate.getMonth().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(birthDate);
                          newDate.setMonth(parseInt(value));
                          setBirthDate(newDate);
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
                        value={birthDate.getFullYear().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(birthDate);
                          newDate.setFullYear(parseInt(value));
                          setBirthDate(newDate);
                        }}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i).map((year) => (
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
                    selected={birthDate}
                    onSelect={(date) => date && setBirthDate(date)}
                    month={birthDate}
                    onMonthChange={setBirthDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Target Date */}
            <div>
              <Label htmlFor="targetDate">Calculate Age On</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {targetDate ? format(targetDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b">
                    <div className="flex gap-2">
                      <Select
                        value={targetDate.getMonth().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(targetDate);
                          newDate.setMonth(parseInt(value));
                          setTargetDate(newDate);
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
                        value={targetDate.getFullYear().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(targetDate);
                          newDate.setFullYear(parseInt(value));
                          setTargetDate(newDate);
                        }}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i).map((year) => (
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
                    selected={targetDate}
                    onSelect={(date) => date && setTargetDate(date)}
                    month={targetDate}
                    onMonthChange={setTargetDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={setToToday} variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Today
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
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
              <Cake className="mr-2 h-5 w-5" /> Age Details
            </h2>
            
            {/* Primary Age Display */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Age</h3>
                  <div className="text-4xl font-bold">
                    {years} years, {months} months, {days} days
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(`${years} years, ${months} months, ${days} days`, 'Age')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Total Years */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Months</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {totalMonths.toLocaleString()} months
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalMonths.toString(), 'Total Months')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Weeks */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Weeks</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {totalWeeks.toLocaleString()} weeks
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalWeeks.toString(), 'Total Weeks')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Days */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Days</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {totalDays.toLocaleString()} days
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalDays.toString(), 'Total Days')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Hours */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Hours</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {totalHours.toLocaleString()} hours
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalHours.toString(), 'Total Hours')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Minutes */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Minutes</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {totalMinutes.toLocaleString()} minutes
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

              {/* Next Birthday */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Next Birthday</h3>
                    <div className="mt-1 text-lg font-bold">
                      {nextBirthday || 'N/A'}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(nextBirthday, 'Next Birthday')}
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
          <h2 className="text-xl font-semibold mb-4">About Age Calculation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Accurate Calculation</h3>
              <p className="text-muted-foreground text-sm">
                Our calculator provides precise age down to the day, accounting for leap years and varying month lengths.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Multiple Units</h3>
              <p className="text-muted-foreground text-sm">
                View your age in different units including years, months, weeks, days, hours, and minutes for various purposes.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Next Birthday</h3>
              <p className="text-muted-foreground text-sm">
                Automatically calculates when your next birthday will be and how many days until that special day.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AgeCalculator;
