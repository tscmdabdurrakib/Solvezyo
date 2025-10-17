import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ConfidenceIntervalCalculator Component
 * 
 * Calculates confidence intervals for statistical analysis
 * CI = X̄ ± (Z * (σ / √n))
 */
export function ConfidenceIntervalCalculator() {
  const [sampleMean, setSampleMean] = useState<string>('100');
  const [stdDev, setStdDev] = useState<string>('15');
  const [sampleSize, setSampleSize] = useState<string>('30');
  const [confidenceLevel, setConfidenceLevel] = useState<string>('95');
  const [lowerBound, setLowerBound] = useState<number>(0);
  const [upperBound, setUpperBound] = useState<number>(0);
  const [marginOfError, setMarginOfError] = useState<number>(0);
  const { toast } = useToast();

  // Z-scores for common confidence levels
  const zScores: { [key: string]: number } = {
    '90': 1.645,
    '95': 1.96,
    '99': 2.576,
    '99.9': 3.291
  };

  // Calculate confidence interval when inputs change
  useEffect(() => {
    calculateCI();
  }, [sampleMean, stdDev, sampleSize, confidenceLevel]);

  // Function to calculate confidence interval
  const calculateCI = () => {
    const mean = parseFloat(sampleMean) || 0;
    const sigma = parseFloat(stdDev) || 0;
    const n = parseFloat(sampleSize) || 1;
    const z = zScores[confidenceLevel] || 1.96;

    if (n <= 0 || sigma < 0) {
      setLowerBound(0);
      setUpperBound(0);
      setMarginOfError(0);
      return;
    }

    // Calculate margin of error: ME = Z * (σ / √n)
    const standardError = sigma / Math.sqrt(n);
    const me = z * standardError;
    setMarginOfError(me);

    // Calculate confidence interval bounds
    const lower = mean - me;
    const upper = mean + me;
    
    setLowerBound(lower);
    setUpperBound(upper);
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
    setSampleMean('100');
    setStdDev('15');
    setSampleSize('30');
    setConfidenceLevel('95');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Confidence Interval Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate statistical confidence intervals for population estimates
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> Input Parameters
          </h2>
          
          <div className="space-y-4">
            {/* Sample Mean */}
            <div>
              <Label htmlFor="sampleMean">Sample Mean (X̄)</Label>
              <Input
                id="sampleMean"
                type="number"
                step="any"
                value={sampleMean}
                onChange={(e) => setSampleMean(e.target.value)}
                placeholder="Enter sample mean"
                className="mt-2"
              />
            </div>

            {/* Standard Deviation */}
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

            {/* Sample Size */}
            <div>
              <Label htmlFor="sampleSize">Sample Size (n)</Label>
              <Input
                id="sampleSize"
                type="number"
                step="1"
                value={sampleSize}
                onChange={(e) => setSampleSize(e.target.value)}
                placeholder="Enter sample size"
                className="mt-2"
              />
            </div>

            {/* Confidence Level */}
            <div>
              <Label htmlFor="confidenceLevel">Confidence Level</Label>
              <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90%</SelectItem>
                  <SelectItem value="95">95%</SelectItem>
                  <SelectItem value="99">99%</SelectItem>
                  <SelectItem value="99.9">99.9%</SelectItem>
                </SelectContent>
              </Select>
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
            
            {/* Confidence Interval Display */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">{confidenceLevel}% Confidence Interval</h3>
                  <div className="text-3xl font-bold">
                    ({lowerBound.toFixed(4)}, {upperBound.toFixed(4)})
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    We are {confidenceLevel}% confident the true population mean lies within this range
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(`(${lowerBound.toFixed(4)}, ${upperBound.toFixed(4)})`, 'Confidence Interval')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Lower Bound */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Lower Bound</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {lowerBound.toFixed(4)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(lowerBound.toFixed(4), 'Lower Bound')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Upper Bound */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Upper Bound</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {upperBound.toFixed(4)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(upperBound.toFixed(4), 'Upper Bound')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Margin of Error */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Margin of Error</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ±{marginOfError.toFixed(4)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(marginOfError.toFixed(4), 'Margin of Error')}
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
          <h2 className="text-xl font-semibold mb-4">About Confidence Intervals</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is it?</h3>
              <p className="text-muted-foreground text-sm">
                A confidence interval provides a range of values that likely contains the true population parameter with a specified level of confidence.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Formula</h3>
              <p className="text-muted-foreground text-sm">
                CI = X̄ ± (Z × σ/√n), where X̄ is sample mean, Z is critical value, σ is standard deviation, and n is sample size.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Interpretation</h3>
              <p className="text-muted-foreground text-sm">
                If we repeated this study 100 times, approximately 95 (for 95% CI) would contain the true population mean.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ConfidenceIntervalCalculator;
