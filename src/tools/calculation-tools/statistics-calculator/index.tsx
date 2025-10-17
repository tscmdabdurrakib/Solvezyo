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
 * StatisticsCalculator Component
 * 
 * Calculates comprehensive statistical measures from a dataset
 */
export function StatisticsCalculator() {
  const [dataInput, setDataInput] = useState<string>('10, 20, 30, 40, 50, 60, 70, 80, 90, 100');
  const [mean, setMean] = useState<number>(0);
  const [median, setMedian] = useState<number>(0);
  const [mode, setMode] = useState<string>('');
  const [range, setRange] = useState<number>(0);
  const [variance, setVariance] = useState<number>(0);
  const [stdDev, setStdDev] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [sum, setSum] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
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

    // Calculate mean
    const meanValue = total / data.length;
    setMean(meanValue);

    // Calculate median
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const medianValue = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
    setMedian(medianValue);

    // Calculate mode
    const frequency: { [key: number]: number } = {};
    data.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter(key => frequency[Number(key)] === maxFreq)
      .map(Number);
    
    if (maxFreq === 1) {
      setMode('No mode (all values unique)');
    } else {
      setMode(modes.join(', '));
    }

    // Calculate range
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    setMin(minValue);
    setMax(maxValue);
    setRange(maxValue - minValue);

    // Calculate variance (population variance)
    const varianceValue = data.reduce((acc, val) => acc + Math.pow(val - meanValue, 2), 0) / data.length;
    setVariance(varianceValue);

    // Calculate standard deviation
    setStdDev(Math.sqrt(varianceValue));
  };

  // Function to reset all statistics
  const resetStats = () => {
    setMean(0);
    setMedian(0);
    setMode('');
    setRange(0);
    setVariance(0);
    setStdDev(0);
    setCount(0);
    setSum(0);
    setMin(0);
    setMax(0);
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
    setDataInput('10, 20, 30, 40, 50, 60, 70, 80, 90, 100');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Statistics Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate comprehensive statistical measures for your dataset
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" /> Data Input
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="dataInput">Enter Numbers (comma, space, or semicolon separated)</Label>
              <Textarea
                id="dataInput"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                placeholder="Enter your data set (e.g., 10, 20, 30, 40, 50)"
                className="mt-2 min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can paste data from Excel or separate with commas, spaces, or semicolons
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleReset} variant="outline" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
              <Button 
                onClick={() => setDataInput('')} 
                variant="outline" 
                className="flex-1"
              >
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
            <h2 className="text-xl font-semibold mb-4">Statistical Results</h2>
            
            {/* Count and Sum */}
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Count (n)</h3>
                    <div className="text-4xl font-bold">
                      {count}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Number of values</p>
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

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Sum (Σ)</h3>
                    <div className="text-4xl font-bold">
                      {sum.toFixed(6)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Total of all values</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(sum.toFixed(6), 'Sum')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Mean */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Mean (μ / x̄)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {mean.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Average value</p>
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
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Median</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {median.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Middle value</p>
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
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Mode</h3>
                    <div className="mt-1 text-xl font-bold">
                      {mode || 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Most frequent value(s)</p>
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
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Range</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {range.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Max - Min</p>
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

              {/* Min */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Minimum</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {min.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Smallest value</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(min.toFixed(6), 'Minimum')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Max */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Maximum</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {max.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Largest value</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(max.toFixed(6), 'Maximum')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Variance */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Variance (σ²)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {variance.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Population variance</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(variance.toFixed(6), 'Variance')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Standard Deviation */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Std Deviation (σ)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {stdDev.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Population std dev</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(stdDev.toFixed(6), 'Standard Deviation')}
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
          <h2 className="text-xl font-semibold mb-4">About Statistical Measures</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Central Tendency</h3>
              <p className="text-muted-foreground text-sm">
                Mean (average), Median (middle value), and Mode (most frequent) describe the center of your data distribution.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Variability</h3>
              <p className="text-muted-foreground text-sm">
                Range, Variance, and Standard Deviation measure how spread out your data is from the mean value.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in data analysis, research, quality control, finance, sports analytics, and scientific studies to summarize datasets.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StatisticsCalculator;
