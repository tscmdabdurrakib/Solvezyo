import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * HalfLifeCalculator Component
 * 
 * Calculates remaining quantity after radioactive decay or exponential decay processes
 * Formula: N(t) = N₀ × (1/2)^(t/t½)
 * Where: N(t) = remaining quantity, N₀ = initial quantity, t = time elapsed, t½ = half-life
 */
export function HalfLifeCalculator() {
  const [initialQuantity, setInitialQuantity] = useState<string>('100');
  const [halfLife, setHalfLife] = useState<string>('5730');
  const [timeElapsed, setTimeElapsed] = useState<string>('11460');
  const [timeUnit, setTimeUnit] = useState<string>('years');
  const [remainingQuantity, setRemainingQuantity] = useState<number>(0);
  const [percentageRemaining, setPercentageRemaining] = useState<number>(0);
  const [decayedQuantity, setDecayedQuantity] = useState<number>(0);
  const [percentageDecayed, setPercentageDecayed] = useState<number>(0);
  const [numberOfHalfLives, setNumberOfHalfLives] = useState<number>(0);
  const { toast } = useToast();

  // Calculate half-life decay when inputs change
  useEffect(() => {
    calculateHalfLife();
  }, [initialQuantity, halfLife, timeElapsed, timeUnit]);

  // Function to calculate half-life decay
  const calculateHalfLife = () => {
    const N0 = parseFloat(initialQuantity) || 0;
    const t_half = parseFloat(halfLife) || 0;
    const t = parseFloat(timeElapsed) || 0;

    if (N0 <= 0 || t_half <= 0 || t < 0) {
      setRemainingQuantity(0);
      setPercentageRemaining(0);
      setDecayedQuantity(0);
      setPercentageDecayed(0);
      setNumberOfHalfLives(0);
      return;
    }

    // Calculate number of half-lives that have passed
    const n = t / t_half;
    setNumberOfHalfLives(n);

    // Calculate remaining quantity using the half-life formula: N(t) = N₀ × (1/2)^(t/t½)
    const remaining = N0 * Math.pow(0.5, n);
    setRemainingQuantity(remaining);

    // Calculate percentage remaining
    const percentRemaining = (remaining / N0) * 100;
    setPercentageRemaining(percentRemaining);

    // Calculate decayed quantity
    const decayed = N0 - remaining;
    setDecayedQuantity(decayed);

    // Calculate percentage decayed
    const percentDecayed = (decayed / N0) * 100;
    setPercentageDecayed(percentDecayed);
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
    setInitialQuantity('100');
    setHalfLife('5730');
    setTimeElapsed('11460');
    setTimeUnit('years');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Half-Life Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate radioactive decay and remaining quantity over time
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2 h-5 w-5" /> Decay Parameters
          </h2>
          
          <div className="space-y-4">
            {/* Initial Quantity */}
            <div>
              <Label htmlFor="initialQuantity">Initial Quantity (N₀)</Label>
              <Input
                id="initialQuantity"
                type="number"
                value={initialQuantity}
                onChange={(e) => setInitialQuantity(e.target.value)}
                placeholder="Enter initial quantity"
                className="mt-2"
                min="0"
                step="any"
              />
            </div>

            {/* Half-Life */}
            <div>
              <Label htmlFor="halfLife">Half-Life (t½)</Label>
              <Input
                id="halfLife"
                type="number"
                value={halfLife}
                onChange={(e) => setHalfLife(e.target.value)}
                placeholder="Enter half-life period"
                className="mt-2"
                min="0"
                step="any"
              />
            </div>

            {/* Time Elapsed */}
            <div>
              <Label htmlFor="timeElapsed">Time Elapsed (t)</Label>
              <Input
                id="timeElapsed"
                type="number"
                value={timeElapsed}
                onChange={(e) => setTimeElapsed(e.target.value)}
                placeholder="Enter time elapsed"
                className="mt-2"
                min="0"
                step="any"
              />
            </div>

            {/* Time Unit */}
            <div>
              <Label htmlFor="timeUnit">Time Unit</Label>
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seconds">Seconds</SelectItem>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
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
            <h2 className="text-xl font-semibold mb-4">Decay Results</h2>
            
            {/* Primary Result Display */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Remaining Quantity</h3>
                  <div className="text-4xl font-bold">
                    {remainingQuantity.toFixed(6)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {percentageRemaining.toFixed(2)}% of original
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(remainingQuantity.toFixed(6), 'Remaining Quantity')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Decayed Quantity */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Decayed Quantity</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {decayedQuantity.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {percentageDecayed.toFixed(2)}% decayed
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(decayedQuantity.toFixed(6), 'Decayed Quantity')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Number of Half-Lives */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Half-Lives Passed</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {numberOfHalfLives.toFixed(4)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Number of half-life periods
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(numberOfHalfLives.toFixed(4), 'Half-Lives Passed')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Initial Quantity Display */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Initial Quantity</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {parseFloat(initialQuantity) || 0}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Starting amount (N₀)
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(initialQuantity, 'Initial Quantity')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Percentage Remaining */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Percentage Remaining</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {percentageRemaining.toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Of original quantity
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${percentageRemaining.toFixed(2)}%`, 'Percentage Remaining')}
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
          <h2 className="text-xl font-semibold mb-4">About Half-Life</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is Half-Life?</h3>
              <p className="text-muted-foreground text-sm">
                Half-life is the time required for a quantity to reduce to half of its initial value. It's commonly used in radioactive decay, pharmacology, and exponential decay processes.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Formula Used</h3>
              <p className="text-muted-foreground text-sm">
                N(t) = N₀ × (1/2)^(t/t½), where N(t) is the remaining quantity, N₀ is the initial quantity, t is time elapsed, and t½ is the half-life period.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Common Examples</h3>
              <p className="text-muted-foreground text-sm">
                Carbon-14 (5,730 years), Uranium-238 (4.5 billion years), Iodine-131 (8 days), and various medications with biological half-lives.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HalfLifeCalculator;
