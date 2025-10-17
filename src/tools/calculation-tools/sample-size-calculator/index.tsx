import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * SampleSizeCalculator Component
 * 
 * Calculates required sample size for statistical surveys and experiments
 * Formula: n = (Z² × p × (1-p)) / E²
 * Where: Z = Z-score, p = population proportion, E = margin of error
 */
export function SampleSizeCalculator() {
  const [populationSize, setPopulationSize] = useState<string>('10000');
  const [confidenceLevel, setConfidenceLevel] = useState<string>('95');
  const [marginOfError, setMarginOfError] = useState<string>('5');
  const [proportion, setProportion] = useState<string>('50');
  const [sampleSize, setSampleSize] = useState<number>(0);
  const [adjustedSampleSize, setAdjustedSampleSize] = useState<number>(0);
  const [zScore, setZScore] = useState<number>(1.96);
  const { toast } = useToast();

  // Calculate sample size when inputs change
  useEffect(() => {
    calculateSampleSize();
  }, [populationSize, confidenceLevel, marginOfError, proportion]);

  // Get Z-score based on confidence level
  const getZScore = (confidence: string): number => {
    const confMap: { [key: string]: number } = {
      '90': 1.645,
      '95': 1.96,
      '99': 2.576,
      '99.9': 3.291,
    };
    return confMap[confidence] || 1.96;
  };

  // Function to calculate sample size
  const calculateSampleSize = () => {
    const N = parseFloat(populationSize) || 0;
    const p = (parseFloat(proportion) || 50) / 100; // Convert percentage to decimal
    const E = (parseFloat(marginOfError) || 5) / 100; // Convert percentage to decimal
    const Z = getZScore(confidenceLevel);
    
    setZScore(Z);

    if (N <= 0 || E <= 0) {
      setSampleSize(0);
      setAdjustedSampleSize(0);
      return;
    }

    // Calculate sample size for infinite population
    // Formula: n = (Z² × p × (1-p)) / E²
    const n = (Z * Z * p * (1 - p)) / (E * E);
    setSampleSize(Math.ceil(n));

    // Adjust for finite population
    // Formula: n_adjusted = n / (1 + ((n - 1) / N))
    const nAdjusted = n / (1 + ((n - 1) / N));
    setAdjustedSampleSize(Math.ceil(nAdjusted));
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
    setPopulationSize('10000');
    setConfidenceLevel('95');
    setMarginOfError('5');
    setProportion('50');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Sample Size Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate required sample size for statistical surveys and research
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5" /> Survey Parameters
          </h2>
          
          <div className="space-y-4">
            {/* Population Size */}
            <div>
              <Label htmlFor="populationSize">Population Size (N)</Label>
              <Input
                id="populationSize"
                type="number"
                value={populationSize}
                onChange={(e) => setPopulationSize(e.target.value)}
                placeholder="Enter total population size"
                className="mt-2"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Total number of individuals in the population</p>
            </div>

            {/* Confidence Level */}
            <div>
              <Label htmlFor="confidenceLevel">Confidence Level</Label>
              <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90% (Z = 1.645)</SelectItem>
                  <SelectItem value="95">95% (Z = 1.96)</SelectItem>
                  <SelectItem value="99">99% (Z = 2.576)</SelectItem>
                  <SelectItem value="99.9">99.9% (Z = 3.291)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">How confident you want to be in your results</p>
            </div>

            {/* Margin of Error */}
            <div>
              <Label htmlFor="marginOfError">Margin of Error (%)</Label>
              <Input
                id="marginOfError"
                type="number"
                value={marginOfError}
                onChange={(e) => setMarginOfError(e.target.value)}
                placeholder="Enter margin of error"
                className="mt-2"
                min="0.1"
                max="50"
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">Acceptable range of error (typically 3-5%)</p>
            </div>

            {/* Population Proportion */}
            <div>
              <Label htmlFor="proportion">Expected Proportion (%)</Label>
              <Input
                id="proportion"
                type="number"
                value={proportion}
                onChange={(e) => setProportion(e.target.value)}
                placeholder="Enter expected proportion"
                className="mt-2"
                min="1"
                max="99"
                step="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Expected percentage with characteristic (use 50% if unknown for max sample size)</p>
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
            <h2 className="text-xl font-semibold mb-4">Required Sample Size</h2>
            
            {/* Primary Result */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Adjusted Sample Size</h3>
                  <div className="text-4xl font-bold">
                    {adjustedSampleSize.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended number of respondents
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(adjustedSampleSize.toString(), 'Adjusted Sample Size')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Unadjusted Sample Size */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Infinite Population Sample</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {sampleSize.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Without population adjustment
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(sampleSize.toString(), 'Unadjusted Sample Size')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Z-Score */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Z-Score</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {zScore}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      For {confidenceLevel}% confidence
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(zScore.toString(), 'Z-Score')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Response Rate Needed */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Sample as % of Population</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {((adjustedSampleSize / (parseFloat(populationSize) || 1)) * 100).toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Proportion of total population
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(((adjustedSampleSize / (parseFloat(populationSize) || 1)) * 100).toFixed(2), 'Percentage')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Parameters Summary */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Margin of Error</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ±{marginOfError}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      At {confidenceLevel}% confidence level
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Sample Size Calculation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Why Sample Size Matters</h3>
              <p className="text-muted-foreground text-sm">
                A proper sample size ensures your survey results are statistically significant and representative of the entire population with minimal error.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Key Factors</h3>
              <p className="text-muted-foreground text-sm">
                Confidence level (how sure you are), margin of error (acceptable deviation), and population proportion (expected response distribution) all affect sample size.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in market research, political polling, academic studies, customer satisfaction surveys, and any statistical research requiring representative sampling.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SampleSizeCalculator;
