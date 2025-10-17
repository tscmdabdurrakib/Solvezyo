import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * LogCalculator Component
 * 
 * Calculates logarithms with different bases
 * Formula: log_b(x) = ln(x) / ln(b)
 * Also supports natural log (ln) and common log (log₁₀)
 */
export function LogCalculator() {
  const [number, setNumber] = useState<string>('100');
  const [base, setBase] = useState<string>('10');
  const [logType, setLogType] = useState<string>('custom');
  const [result, setResult] = useState<number>(0);
  const [naturalLog, setNaturalLog] = useState<number>(0);
  const [commonLog, setCommonLog] = useState<number>(0);
  const [binaryLog, setBinaryLog] = useState<number>(0);
  const { toast } = useToast();

  // Calculate logarithm when inputs change
  useEffect(() => {
    calculateLog();
  }, [number, base, logType]);

  // Function to calculate logarithm
  const calculateLog = () => {
    const num = parseFloat(number) || 0;
    const baseVal = parseFloat(base) || 10;

    if (num <= 0) {
      setResult(NaN);
      setNaturalLog(NaN);
      setCommonLog(NaN);
      setBinaryLog(NaN);
      return;
    }

    // Calculate natural logarithm (base e)
    const ln = Math.log(num);
    setNaturalLog(ln);

    // Calculate common logarithm (base 10)
    const log10 = Math.log10(num);
    setCommonLog(log10);

    // Calculate binary logarithm (base 2)
    const log2 = Math.log2(num);
    setBinaryLog(log2);

    // Calculate logarithm with custom base
    // Formula: log_b(x) = ln(x) / ln(b)
    if (logType === 'natural') {
      setResult(ln);
    } else if (logType === 'common') {
      setResult(log10);
    } else if (logType === 'binary') {
      setResult(log2);
    } else {
      if (baseVal <= 0 || baseVal === 1) {
        setResult(NaN);
        return;
      }
      const customLog = ln / Math.log(baseVal);
      setResult(customLog);
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
    setNumber('100');
    setBase('10');
    setLogType('custom');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Log Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate logarithms with any base including natural, common, and binary logs
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Logarithm Parameters
          </h2>
          
          <div className="space-y-4">
            {/* Number */}
            <div>
              <Label htmlFor="number">Number (x)</Label>
              <Input
                id="number"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter number"
                className="mt-2"
                min="0"
                step="any"
              />
              <p className="text-xs text-muted-foreground mt-1">Must be positive</p>
            </div>

            {/* Logarithm Type */}
            <div>
              <Label htmlFor="logType">Logarithm Type</Label>
              <Select value={logType} onValueChange={setLogType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom Base</SelectItem>
                  <SelectItem value="natural">Natural Log (ln, base e)</SelectItem>
                  <SelectItem value="common">Common Log (log₁₀, base 10)</SelectItem>
                  <SelectItem value="binary">Binary Log (log₂, base 2)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Base (only show for custom) */}
            {logType === 'custom' && (
              <div>
                <Label htmlFor="base">Base (b)</Label>
                <Input
                  id="base"
                  type="number"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  placeholder="Enter base"
                  className="mt-2"
                  min="0"
                  step="any"
                />
                <p className="text-xs text-muted-foreground mt-1">Must be positive and not equal to 1</p>
              </div>
            )}

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
            
            {/* Primary Result */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {logType === 'natural' && 'ln(' + number + ')'}
                    {logType === 'common' && 'log₁₀(' + number + ')'}
                    {logType === 'binary' && 'log₂(' + number + ')'}
                    {logType === 'custom' && `log${base}(${number})`}
                  </h3>
                  <div className="text-4xl font-bold">
                    {isNaN(result) ? 'Undefined' : result.toFixed(10)}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(result.toFixed(10), 'Result')}
                  disabled={isNaN(result)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* All Logarithm Types */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Natural Log */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Natural Log (ln)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {isNaN(naturalLog) ? 'Undefined' : naturalLog.toFixed(10)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Base e ≈ 2.71828
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(naturalLog.toFixed(10), 'Natural Log')}
                    disabled={isNaN(naturalLog)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Common Log */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Common Log (log₁₀)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {isNaN(commonLog) ? 'Undefined' : commonLog.toFixed(10)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Base 10
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(commonLog.toFixed(10), 'Common Log')}
                    disabled={isNaN(commonLog)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Binary Log */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Binary Log (log₂)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {isNaN(binaryLog) ? 'Undefined' : binaryLog.toFixed(10)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Base 2
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(binaryLog.toFixed(10), 'Binary Log')}
                    disabled={isNaN(binaryLog)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Antilog */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Antilog (10^result)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {isNaN(result) ? 'Undefined' : Math.pow(10, result).toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Inverse of common log
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(Math.pow(10, result).toFixed(6), 'Antilog')}
                    disabled={isNaN(result)}
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
          <h2 className="text-xl font-semibold mb-4">About Logarithms</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is a Logarithm?</h3>
              <p className="text-muted-foreground text-sm">
                A logarithm answers "to what exponent must we raise the base to get this number?" For example, log₁₀(100) = 2 because 10² = 100.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Common Types</h3>
              <p className="text-muted-foreground text-sm">
                Natural log (ln) uses base e, common log uses base 10, binary log uses base 2. Any positive number (except 1) can be a base.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in science for pH calculations, Richter scale, decibels in sound, compound interest, population growth, and data compression.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LogCalculator;
