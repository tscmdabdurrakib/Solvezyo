import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Plus, Minus, RefreshCw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * AverageCalculator Component
 * 
 * Calculates various averages (mean, median, mode) from a list of numbers
 */
export function AverageCalculator() {
  const [numbers, setNumbers] = useState<string>('10, 20, 30, 40, 50');
  const [mean, setMean] = useState<number>(0);
  const [median, setMedian] = useState<number>(0);
  const [mode, setMode] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [sum, setSum] = useState<number>(0);
  const [range, setRange] = useState<number>(0);
  const { toast } = useToast();

  // Calculate all statistics when numbers change
  useEffect(() => {
    calculateStatistics();
  }, [numbers]);

  // Function to parse numbers from input
  const parseNumbers = (input: string): number[] => {
    return input
      .split(/[\s,;]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));
  };

  // Function to calculate all statistics
  const calculateStatistics = () => {
    const nums = parseNumbers(numbers);
    
    if (nums.length === 0) {
      setMean(0);
      setMedian(0);
      setMode('');
      setCount(0);
      setSum(0);
      setRange(0);
      return;
    }

    // Calculate Mean (Average)
    const total = nums.reduce((acc, num) => acc + num, 0);
    const average = total / nums.length;
    setMean(average);
    setSum(total);
    setCount(nums.length);

    // Calculate Median
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const medianValue = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
    setMedian(medianValue);

    // Calculate Mode
    const frequency: { [key: number]: number } = {};
    nums.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter(key => frequency[Number(key)] === maxFreq)
      .map(Number);
    
    if (maxFreq === 1) {
      setMode('No mode');
    } else {
      setMode(modes.join(', '));
    }

    // Calculate Range
    const rangeValue = Math.max(...nums) - Math.min(...nums);
    setRange(rangeValue);
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
    setNumbers('10, 20, 30, 40, 50');
  };

  // Format number with 2 decimal places
  const formatNumber = (num: number) => {
    return num.toFixed(2);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Average Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate mean, median, mode, and other statistics from a list of numbers
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Enter Numbers
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="numbers">
                Numbers (separated by commas, spaces, or semicolons)
              </Label>
              <Textarea
                id="numbers"
                className="mt-2 min-h-[120px] font-mono"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="Enter numbers: 10, 20, 30, 40, 50"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Count: {count} numbers
              </p>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {count > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                {/* Mean */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Mean (Average)</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {formatNumber(mean)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(formatNumber(mean), 'Mean')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Median */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Median</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {formatNumber(median)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(formatNumber(median), 'Median')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mode */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Mode</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {mode}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(mode, 'Mode')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Sum */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Sum</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {formatNumber(sum)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(formatNumber(sum), 'Sum')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Range */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Range</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {formatNumber(range)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(formatNumber(range), 'Range')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Count */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Count</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {count}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(count.toString(), 'Count')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding Averages</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Mean</h3>
              <p className="text-muted-foreground text-sm">
                The arithmetic average calculated by adding all numbers and dividing by the count. Most commonly used measure of central tendency.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Median</h3>
              <p className="text-muted-foreground text-sm">
                The middle value when numbers are sorted. Less affected by outliers than the mean, making it useful for skewed data.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Mode</h3>
              <p className="text-muted-foreground text-sm">
                The most frequently occurring value in the dataset. A dataset can have multiple modes or no mode at all.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AverageCalculator;
