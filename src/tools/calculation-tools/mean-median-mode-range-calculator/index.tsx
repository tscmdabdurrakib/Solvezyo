import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RefreshCw, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * MeanMedianModeRangeCalculator Component
 * 
 * Calculates mean, median, mode, and range from a dataset
 */
export function MeanMedianModeRangeCalculator() {
  const [dataInput, setDataInput] = useState<string>('5, 10, 15, 20, 25, 30, 35, 40, 45, 50');
  const [mean, setMean] = useState<number>(0);
  const [median, setMedian] = useState<number>(0);
  const [mode, setMode] = useState<string>('');
  const [range, setRange] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [sum, setSum] = useState<number>(0);
  const { toast } = useToast();

  // Calculate statistics when input changes
  useEffect(() => {
    calculateStatistics();
  }, [dataInput]);

  // Function to parse and validate data
  const parseData = (): number[] => {
    const numbers = dataInput
      .split(/[\s,;]+/)
      .map(str => parseFloat(str.trim()))
      .filter(num => !isNaN(num));
    return numbers;
  };

  // Function to calculate all statistics
  const calculateStatistics = () => {
    const data = parseData();
    
    if (data.length === 0) {
      resetStats();
      return;
    }

    setCount(data.length);

    // Calculate sum
    const total = data.reduce((acc, val) => acc + val, 0);
    setSum(total);

    // Calculate mean (average)
    const meanValue = total / data.length;
    setMean(meanValue);

    // Calculate median (middle value)
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const medianValue = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
    setMedian(medianValue);

    // Calculate mode (most frequent value)
    const frequency: { [key: number]: number } = {};
    data.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter(key => frequency[Number(key)] === maxFreq)
      .map(Number);
    
    if (maxFreq === 1) {
      setMode('No mode');
    } else if (modes.length === data.length) {
      setMode('All values appear equally');
    } else {
      setMode(modes.join(', '));
    }

    // Calculate range (difference between max and min)
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    setMin(minValue);
    setMax(maxValue);
    setRange(maxValue - minValue);
  };

  // Function to reset all statistics
  const resetStats = () => {
    setMean(0);
    setMedian(0);
    setMode('');
    setRange(0);
    setMin(0);
    setMax(0);
    setCount(0);
    setSum(0);
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
    setDataInput('5, 10, 15, 20, 25, 30, 35, 40, 45, 50');
  };

  // Function to copy all results
  const copyAllResults = () => {
    const results = `Mean: ${mean.toFixed(6)}
Median: ${median.toFixed(6)}
Mode: ${mode}
Range: ${range.toFixed(6)}
Min: ${min.toFixed(6)}
Max: ${max.toFixed(6)}
Count: ${count}
Sum: ${sum.toFixed(6)}`;
    navigator.clipboard.writeText(results);
    toast({
      title: "Copied!",
      description: "All results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Mean, Median, Mode, Range Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate the four basic statistical measures from your dataset
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2 h-5 w-5" /> Data Input
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="dataInput">Enter Your Numbers</Label>
              <Textarea
                id="dataInput"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                placeholder="Enter numbers separated by commas, spaces, or semicolons"
                className="mt-2 min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Example: 5, 10, 15, 20, 25 or paste from Excel/CSV
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
              <Button onClick={() => setDataInput('')} variant="outline">
                Clear
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Results</h2>
              <Button onClick={copyAllResults} variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" /> Copy All
              </Button>
            </div>
            
            {/* Primary Results Grid */}
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              {/* Mean */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Mean (Average)</h3>
                    <div className="text-4xl font-bold">
                      {mean.toFixed(6)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sum ÷ Count
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(mean.toFixed(6), 'Mean')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Median */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Median (Middle)</h3>
                    <div className="text-4xl font-bold">
                      {median.toFixed(6)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Middle value when sorted
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(median.toFixed(6), 'Median')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mode */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Mode (Most Frequent)</h3>
                    <div className="text-3xl font-bold">
                      {mode || 'N/A'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Most common value(s)
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(mode, 'Mode')}
                    disabled={!mode}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Range */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Range (Spread)</h3>
                    <div className="text-4xl font-bold">
                      {range.toFixed(6)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Max - Min
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(range.toFixed(6), 'Range')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Minimum</h3>
                <div className="mt-1 text-2xl font-bold">{min.toFixed(6)}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Maximum</h3>
                <div className="mt-1 text-2xl font-bold">{max.toFixed(6)}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Count</h3>
                <div className="mt-1 text-2xl font-bold">{count}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Sum</h3>
                <div className="mt-1 text-2xl font-bold">{sum.toFixed(6)}</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding the Measures</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-medium text-lg mb-2">Mean</h3>
              <p className="text-muted-foreground text-sm">
                The average of all numbers. Sum all values and divide by the count. Best represents typical value when data is evenly distributed.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Median</h3>
              <p className="text-muted-foreground text-sm">
                The middle value when data is sorted. Less affected by extreme values (outliers) than the mean. Best for skewed distributions.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Mode</h3>
              <p className="text-muted-foreground text-sm">
                The most frequently occurring value. A dataset can have one mode, multiple modes, or no mode. Useful for categorical data.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Range</h3>
              <p className="text-muted-foreground text-sm">
                The difference between the largest and smallest values. Shows how spread out the data is. Simple measure of variability.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MeanMedianModeRangeCalculator;
