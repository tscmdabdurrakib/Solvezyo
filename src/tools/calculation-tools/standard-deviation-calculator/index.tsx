import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RefreshCw, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * StandardDeviationCalculator Component
 * 
 * Calculates statistical measures:
 * - Mean, Median, Mode
 * - Variance, Standard Deviation
 * - Range, Count
 */
export function StandardDeviationCalculator() {
  const [numbersInput, setNumbersInput] = useState<string>('2, 4, 6, 8, 10, 12, 14');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [mean, setMean] = useState<number>(0);
  const [median, setMedian] = useState<number>(0);
  const [mode, setMode] = useState<string>('');
  const [variance, setVariance] = useState<number>(0);
  const [stdDev, setStdDev] = useState<number>(0);
  const [range, setRange] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [sum, setSum] = useState<number>(0);
  
  const { toast } = useToast();

  // Parse and calculate statistics
  useEffect(() => {
    // Parse numbers from input (comma or space separated)
    const parsed = numbersInput
      .split(/[,\s]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));
    
    setNumbers(parsed);
    setCount(parsed.length);

    if (parsed.length === 0) {
      setMean(0);
      setMedian(0);
      setMode('');
      setVariance(0);
      setStdDev(0);
      setRange(0);
      setSum(0);
      return;
    }

    // Calculate sum
    const total = parsed.reduce((acc, val) => acc + val, 0);
    setSum(total);

    // Calculate mean
    const avg = total / parsed.length;
    setMean(avg);

    // Calculate median
    const sorted = [...parsed].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const med = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
    setMedian(med);

    // Calculate mode
    const frequency: { [key: number]: number } = {};
    parsed.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter(key => frequency[parseFloat(key)] === maxFreq)
      .map(key => parseFloat(key));
    
    if (maxFreq === 1) {
      setMode('No mode');
    } else {
      setMode(modes.join(', '));
    }

    // Calculate variance and standard deviation
    const squaredDiffs = parsed.map(num => Math.pow(num - avg, 2));
    const varianceValue = squaredDiffs.reduce((acc, val) => acc + val, 0) / parsed.length;
    setVariance(varianceValue);
    setStdDev(Math.sqrt(varianceValue));

    // Calculate range
    const min = Math.min(...parsed);
    const max = Math.max(...parsed);
    setRange(max - min);
  }, [numbersInput]);

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
    setNumbersInput('2, 4, 6, 8, 10, 12, 14');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Standard Deviation Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate mean, median, mode, variance, and standard deviation
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" /> Enter Numbers
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="numbers">Numbers (comma or space separated)</Label>
              <Textarea
                id="numbers"
                value={numbersInput}
                onChange={(e) => setNumbersInput(e.target.value)}
                placeholder="Enter numbers separated by commas or spaces"
                className="mt-2 min-h-[100px]"
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
              <h2 className="text-xl font-semibold mb-4">Statistical Results</h2>
              
              {/* Primary Results */}
              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Standard Deviation (σ)</h3>
                      <div className="text-4xl font-bold">
                        {stdDev.toFixed(4)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(stdDev.toFixed(4), 'Standard Deviation')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Variance (σ²)</h3>
                      <div className="text-4xl font-bold">
                        {variance.toFixed(4)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(variance.toFixed(4), 'Variance')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Statistics */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Mean (Average)</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {mean.toFixed(4)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(mean.toFixed(4), 'Mean')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Median</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {median.toFixed(4)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(median.toFixed(4), 'Median')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

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

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Range</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {range.toFixed(4)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(range.toFixed(4), 'Range')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Sum</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {sum.toFixed(4)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(sum.toFixed(4), 'Sum')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

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
          <h2 className="text-xl font-semibold mb-4">About Standard Deviation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Standard Deviation</h3>
              <p className="text-muted-foreground text-sm">
                Measures the amount of variation or dispersion in a set of values. A low standard deviation indicates values are close to the mean.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Variance</h3>
              <p className="text-muted-foreground text-sm">
                The average of the squared differences from the mean. It's the square of the standard deviation.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Mean, Median, Mode</h3>
              <p className="text-muted-foreground text-sm">
                Mean is the average, median is the middle value, and mode is the most frequent value in the dataset.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StandardDeviationCalculator;
