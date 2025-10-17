import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PercentErrorCalculator Component
 * 
 * Calculates percent error between experimental and theoretical values
 * Formula: |Experimental - Theoretical| / Theoretical × 100
 */
export function PercentErrorCalculator() {
  const [experimental, setExperimental] = useState<string>('95');
  const [theoretical, setTheoretical] = useState<string>('100');
  const [percentError, setPercentError] = useState<number>(0);
  const [absoluteError, setAbsoluteError] = useState<number>(0);
  const [relativeError, setRelativeError] = useState<number>(0);
  
  const { toast } = useToast();

  // Calculate percent error
  useEffect(() => {
    const exp = parseFloat(experimental) || 0;
    const theo = parseFloat(theoretical) || 0;

    if (theo === 0) {
      setPercentError(0);
      setAbsoluteError(0);
      setRelativeError(0);
      return;
    }

    // Absolute Error = |Experimental - Theoretical|
    const absError = Math.abs(exp - theo);
    setAbsoluteError(absError);

    // Relative Error = Absolute Error / Theoretical
    const relError = absError / Math.abs(theo);
    setRelativeError(relError);

    // Percent Error = Relative Error × 100
    const pctError = relError * 100;
    setPercentError(pctError);
  }, [experimental, theoretical]);

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
    setExperimental('95');
    setTheoretical('100');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Percent Error Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate percent error between experimental and theoretical values
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" /> Input Values
          </h2>
          
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="experimental">Experimental Value</Label>
                <Input
                  id="experimental"
                  type="number"
                  step="0.01"
                  value={experimental}
                  onChange={(e) => setExperimental(e.target.value)}
                  placeholder="Measured/observed value"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="theoretical">Theoretical Value</Label>
                <Input
                  id="theoretical"
                  type="number"
                  step="0.01"
                  value={theoretical}
                  onChange={(e) => setTheoretical(e.target.value)}
                  placeholder="Expected/true value"
                  className="mt-2"
                />
              </div>
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
            <h2 className="text-xl font-semibold mb-4">Error Analysis</h2>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Percent Error</h3>
                  <div className="text-4xl font-bold">
                    {percentError.toFixed(4)}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Formula: |({experimental} - {theoretical}) / {theoretical}| × 100
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(percentError.toFixed(4) + '%', 'Percent Error')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Absolute Error</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {absoluteError.toFixed(4)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(absoluteError.toFixed(4), 'Absolute Error')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Relative Error</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {relativeError.toFixed(6)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(relativeError.toFixed(6), 'Relative Error')}
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
          <h2 className="text-xl font-semibold mb-4">About Percent Error</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Percent Error</h3>
              <p className="text-muted-foreground text-sm">
                Measures the accuracy of an experimental value compared to a theoretical or accepted value, expressed as a percentage.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Absolute Error</h3>
              <p className="text-muted-foreground text-sm">
                The magnitude of difference between the experimental and theoretical values, always positive.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Commonly used in scientific experiments, quality control, measurements, and statistical analysis.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PercentErrorCalculator;
