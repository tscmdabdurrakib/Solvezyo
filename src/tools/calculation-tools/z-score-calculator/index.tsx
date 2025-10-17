import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ZScoreCalculator Component
 * 
 * Calculates Z-score (standard score) for statistical analysis
 * Z = (X - μ) / σ
 * Where X = value, μ = mean, σ = standard deviation
 */
export function ZScoreCalculator() {
  const [value, setValue] = useState<string>('75');
  const [mean, setMean] = useState<string>('70');
  const [stdDev, setStdDev] = useState<string>('5');
  const [zScore, setZScore] = useState<number>(0);
  const [percentile, setPercentile] = useState<number>(0);
  const { toast } = useToast();

  // Calculate Z-score when inputs change
  useEffect(() => {
    calculateZScore();
  }, [value, mean, stdDev]);

  // Function to calculate Z-score
  const calculateZScore = () => {
    const x = parseFloat(value) || 0;
    const mu = parseFloat(mean) || 0;
    const sigma = parseFloat(stdDev) || 1;

    if (sigma === 0) {
      setZScore(0);
      setPercentile(0);
      return;
    }

    // Calculate Z-score: Z = (X - μ) / σ
    const z = (x - mu) / sigma;
    setZScore(z);

    // Approximate percentile using error function approximation
    const percentileValue = normalCDF(z) * 100;
    setPercentile(percentileValue);
  };

  // Cumulative Distribution Function for standard normal distribution
  const normalCDF = (z: number): number => {
    // Approximation using Taylor series
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - prob : prob;
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
    setValue('75');
    setMean('70');
    setStdDev('5');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Z-Score Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate standard scores and percentiles for statistical analysis
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Input Values
          </h2>
          
          <div className="space-y-4">
            {/* Value (X) */}
            <div>
              <Label htmlFor="value">Value (X)</Label>
              <Input
                id="value"
                type="number"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="mt-2"
              />
            </div>

            {/* Mean (μ) */}
            <div>
              <Label htmlFor="mean">Mean (μ)</Label>
              <Input
                id="mean"
                type="number"
                step="any"
                value={mean}
                onChange={(e) => setMean(e.target.value)}
                placeholder="Enter mean"
                className="mt-2"
              />
            </div>

            {/* Standard Deviation (σ) */}
            <div>
              <Label htmlFor="stdDev">Standard Deviation (σ)</Label>
              <Input
                id="stdDev"
                type="number"
                step="any"
                value={stdDev}
                onChange={(e) => setStdDev(e.target.value)}
                placeholder="Enter standard deviation"
                className="mt-2"
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            {/* Z-Score Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Z-Score</h3>
                  <div className="text-4xl font-bold">
                    {zScore.toFixed(4)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {zScore > 0 ? `${Math.abs(zScore).toFixed(2)} standard deviations above the mean` : 
                     zScore < 0 ? `${Math.abs(zScore).toFixed(2)} standard deviations below the mean` :
                     'At the mean'}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(zScore.toFixed(4), 'Z-Score')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Percentile */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Percentile</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {percentile.toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Percentage of values below this score
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(percentile.toFixed(2), 'Percentile')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Interpretation */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Interpretation</h3>
                <div className="mt-1 text-lg font-bold">
                  {Math.abs(zScore) < 1 ? 'Within 1σ (68%)' :
                   Math.abs(zScore) < 2 ? 'Within 2σ (95%)' :
                   Math.abs(zScore) < 3 ? 'Within 3σ (99.7%)' :
                   'Outlier (>3σ)'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.abs(zScore) < 1 ? 'Common value' :
                   Math.abs(zScore) < 2 ? 'Somewhat unusual' :
                   Math.abs(zScore) < 3 ? 'Unusual value' :
                   'Very unusual/outlier'}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Z-Score</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is Z-Score?</h3>
              <p className="text-muted-foreground text-sm">
                Z-score measures how many standard deviations a value is from the mean. It's used to standardize values for comparison across different datasets.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Formula</h3>
              <p className="text-muted-foreground text-sm">
                Z = (X - μ) / σ, where X is the value, μ is the mean, and σ is the standard deviation.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in hypothesis testing, quality control, standardized testing, and identifying outliers in data analysis.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ZScoreCalculator;
