import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * PValueCalculator Component
 * 
 * Calculates p-values for statistical hypothesis testing
 */
export function PValueCalculator() {
  const [testType, setTestType] = useState<string>('z-test');
  const [testStatistic, setTestStatistic] = useState<number>(1.96);
  const [degreesOfFreedom, setDegreesOfFreedom] = useState<number>(20);
  const [tailType, setTailType] = useState<string>('two-tailed');
  const [pValue, setPValue] = useState<number>(0);
  const [significance, setSignificance] = useState<string>('');
  const { toast } = useToast();

  // Calculate p-value when inputs change
  useEffect(() => {
    calculatePValue();
  }, [testType, testStatistic, degreesOfFreedom, tailType]);

  // Standard normal cumulative distribution function (approximation)
  const normalCDF = (z: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - probability : probability;
  };

  // Student's t-distribution CDF (approximation)
  const tCDF = (t: number, df: number): number => {
    // Using approximation for t-distribution
    const x = df / (df + t * t);
    const a = df / 2;
    const b = 0.5;
    
    // Simplified beta function approximation
    // For practical purposes, using normal approximation for larger df
    if (df > 30) {
      return normalCDF(t);
    }
    
    // Simple approximation for smaller df
    const factor = Math.sqrt(df * Math.PI);
    const term = Math.pow(1 + (t * t) / df, -(df + 1) / 2);
    return 0.5 + (t / factor) * term;
  };

  // Calculate p-value based on test type and tail
  const calculatePValue = () => {
    let p = 0;

    if (testType === 'z-test') {
      // Z-test p-value calculation
      const prob = normalCDF(Math.abs(testStatistic));
      
      if (tailType === 'two-tailed') {
        p = 2 * (1 - prob);
      } else if (tailType === 'left-tailed') {
        p = normalCDF(testStatistic);
      } else {
        p = 1 - prob;
      }
    } else if (testType === 't-test') {
      // T-test p-value calculation
      const prob = tCDF(Math.abs(testStatistic), degreesOfFreedom);
      
      if (tailType === 'two-tailed') {
        p = 2 * (1 - prob);
      } else if (tailType === 'left-tailed') {
        p = tCDF(testStatistic, degreesOfFreedom);
      } else {
        p = 1 - prob;
      }
    }

    setPValue(Math.max(0, Math.min(1, p)));
    
    // Determine significance
    if (p < 0.001) {
      setSignificance('Highly significant (p < 0.001)');
    } else if (p < 0.01) {
      setSignificance('Very significant (p < 0.01)');
    } else if (p < 0.05) {
      setSignificance('Significant (p < 0.05)');
    } else if (p < 0.1) {
      setSignificance('Marginally significant (p < 0.1)');
    } else {
      setSignificance('Not significant (p ≥ 0.1)');
    }
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
    setTestType('z-test');
    setTestStatistic(1.96);
    setDegreesOfFreedom(20);
    setTailType('two-tailed');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">P-Value Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate p-values for statistical hypothesis testing
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> Test Parameters
          </h2>
          
          <div className="space-y-4">
            {/* Test Type */}
            <div>
              <Label htmlFor="testType">Test Type</Label>
              <Select value={testType} onValueChange={setTestType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="z-test">Z-Test</SelectItem>
                  <SelectItem value="t-test">T-Test</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Test Statistic */}
            <div>
              <Label htmlFor="testStatistic">
                Test Statistic ({testType === 'z-test' ? 'z-score' : 't-score'})
              </Label>
              <Input
                id="testStatistic"
                type="number"
                step="0.01"
                className="mt-2"
                value={testStatistic}
                onChange={(e) => setTestStatistic(Number(e.target.value))}
              />
            </div>

            {/* Degrees of Freedom (only for t-test) */}
            {testType === 't-test' && (
              <div>
                <Label htmlFor="degreesOfFreedom">Degrees of Freedom</Label>
                <Input
                  id="degreesOfFreedom"
                  type="number"
                  min="1"
                  className="mt-2"
                  value={degreesOfFreedom}
                  onChange={(e) => setDegreesOfFreedom(Number(e.target.value))}
                />
              </div>
            )}

            {/* Tail Type */}
            <div>
              <Label htmlFor="tailType">Test Type</Label>
              <Select value={tailType} onValueChange={setTailType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="two-tailed">Two-Tailed</SelectItem>
                  <SelectItem value="left-tailed">Left-Tailed</SelectItem>
                  <SelectItem value="right-tailed">Right-Tailed</SelectItem>
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
            
            <div className="space-y-4">
              {/* P-Value */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">P-Value</h3>
                    <div className="mt-2 text-4xl font-bold">
                      {pValue.toFixed(6)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {significance}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(pValue.toFixed(6), 'P-Value')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Interpretation Guide */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Interpretation</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>p &lt; 0.001:</span>
                    <span className="font-medium">Highly significant ***</span>
                  </div>
                  <div className="flex justify-between">
                    <span>p &lt; 0.01:</span>
                    <span className="font-medium">Very significant **</span>
                  </div>
                  <div className="flex justify-between">
                    <span>p &lt; 0.05:</span>
                    <span className="font-medium">Significant *</span>
                  </div>
                  <div className="flex justify-between">
                    <span>p ≥ 0.05:</span>
                    <span className="font-medium">Not significant</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding P-Values</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is a P-Value?</h3>
              <p className="text-muted-foreground text-sm">
                The p-value is the probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is true.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">How to Interpret</h3>
              <p className="text-muted-foreground text-sm">
                A small p-value (typically ≤ 0.05) indicates strong evidence against the null hypothesis, so you reject it. A large p-value suggests weak evidence, so you fail to reject the null hypothesis.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Test Types</h3>
              <p className="text-muted-foreground text-sm">
                Two-tailed tests check for effects in both directions, while one-tailed tests check for effects in a specific direction (left or right).
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PValueCalculator;
