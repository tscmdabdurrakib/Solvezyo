import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calendar, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

/**
 * DayCounter Component
 * 
 * Counts the number of days between two dates
 */
export function DayCounter() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(true);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [weeks, setWeeks] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const { toast } = useToast();

  // Calculate days when dates change
  useEffect(() => {
    calculateDays();
  }, [startDate, endDate, includeEndDate]);

  /**
   * Function to calculate the number of days between two dates
   * If includeEndDate is true, adds 1 to include the end date in the count
   */
  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Reset time to midnight for accurate day calculation
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // Calculate difference in milliseconds
    const diffTime = end.getTime() - start.getTime();
    // Convert to days
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Include end date if option is selected
    if (includeEndDate && diffDays >= 0) {
      diffDays += 1;
    }

    setTotalDays(Math.abs(diffDays));
    setWeeks(Math.floor(Math.abs(diffDays) / 7));
    setMonths(Math.floor(Math.abs(diffDays) / 30.44)); // Average days per month
    setYears(Math.floor(Math.abs(diffDays) / 365.25)); // Account for leap years
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
    setStartDate(new Date());
    setEndDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    setIncludeEndDate(true);
  };

  // Function to swap dates
  const swapDates = () => {
    const temp = startDate;
    setStartDate(endDate);
    setEndDate(temp);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Day Counter</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the number of days between two dates
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Date Selection
          </h2>
          
          <div className="space-y-4">
            {/* Start Date */}
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b">
                    <div className="flex gap-2">
                      <Select
                        value={startDate.getMonth().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(startDate);
                          newDate.setMonth(parseInt(value));
                          setStartDate(newDate);
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
                        value={startDate.getFullYear().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(startDate);
                          newDate.setFullYear(parseInt(value));
                          setStartDate(newDate);
                        }}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i).map((year) => (
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
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    month={startDate}
                    onMonthChange={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b">
                    <div className="flex gap-2">
                      <Select
                        value={endDate.getMonth().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(endDate);
                          newDate.setMonth(parseInt(value));
                          setEndDate(newDate);
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
                        value={endDate.getFullYear().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(endDate);
                          newDate.setFullYear(parseInt(value));
                          setEndDate(newDate);
                        }}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i).map((year) => (
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
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    month={endDate}
                    onMonthChange={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Include End Date Option */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeEndDate"
                checked={includeEndDate}
                onChange={(e) => setIncludeEndDate(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="includeEndDate" className="cursor-pointer">
                Include end date in calculation
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={swapDates} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Swap Dates
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
              <Calculator className="mr-2 h-5 w-5" /> Results
            </h2>
            
            {/* Primary Result */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Days</h3>
                  <div className="text-4xl font-bold">
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

            <div className="grid gap-4 md:grid-cols-2">
              {/* Weeks */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Weeks</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {weeks.toLocaleString()} weeks
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(weeks.toString(), 'Weeks')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Months */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Months (Approx.)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {months.toLocaleString()} months
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(months.toString(), 'Months')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Years */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Years (Approx.)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {years.toLocaleString()} years
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(years.toString(), 'Years')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Hours</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {(totalDays * 24).toLocaleString()} hours
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((totalDays * 24).toString(), 'Hours')}
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
          <h2 className="text-xl font-semibold mb-4">About Day Counter</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Accurate Calculation</h3>
              <p className="text-muted-foreground text-sm">
                Calculate the exact number of days between any two dates with precision.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Multiple Units</h3>
              <p className="text-muted-foreground text-sm">
                View results in days, weeks, months, years, and hours for different purposes.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Flexible Options</h3>
              <p className="text-muted-foreground text-sm">
                Choose whether to include the end date in your calculation for precise planning.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DayCounter;
