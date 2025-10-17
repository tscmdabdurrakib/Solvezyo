import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Beaker } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * MolarityCalculator Component
 * 
 * Calculates molarity (concentration) of a solution: M = moles / liters
 */
export function MolarityCalculator() {
  const [moles, setMoles] = useState<string>('2');
  const [volume, setVolume] = useState<string>('1');
  const [molarity, setMolarity] = useState<number>(0);
  const { toast } = useToast();

  // Calculate molarity when inputs change
  useEffect(() => {
    calculateMolarity();
  }, [moles, volume]);

  // Function to calculate molarity
  const calculateMolarity = () => {
    const n = parseFloat(moles);
    const v = parseFloat(volume);

    if (isNaN(n) || isNaN(v) || v === 0) {
      setMolarity(0);
      return;
    }

    // Calculate molarity: M = n / V (moles per liter)
    const m = n / v;
    setMolarity(m);
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
    setMoles('2');
    setVolume('1');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Molarity Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate molarity (concentration) of a solution (M = moles / liters)
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Beaker className="mr-2 h-5 w-5" /> Solution Details
          </h2>
          
          <div className="space-y-4">
            {/* Moles */}
            <div>
              <Label htmlFor="moles">Number of Moles (mol)</Label>
              <Input
                id="moles"
                type="number"
                value={moles}
                onChange={(e) => setMoles(e.target.value)}
                placeholder="Enter number of moles"
                className="mt-2"
                min="0"
                step="0.001"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Amount of substance in moles
              </p>
            </div>

            {/* Volume */}
            <div>
              <Label htmlFor="volume">Volume (L)</Label>
              <Input
                id="volume"
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="Enter volume in liters"
                className="mt-2"
                min="0"
                step="0.001"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Volume of solution in liters
              </p>
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
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Beaker className="mr-2 h-5 w-5" /> Calculation Result
            </h2>
            
            {/* Molarity Result */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Molarity (M)</h3>
                  <div className="text-4xl font-bold">
                    {molarity.toFixed(4)} M
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Formula: M = n / V
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Also written as: {molarity.toFixed(4)} mol/L
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(molarity.toFixed(4), 'Molarity')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {/* Input Summary */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Moles</h3>
                <div className="text-xl font-bold">
                  {moles} mol
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Volume</h3>
                <div className="text-xl font-bold">
                  {volume} L
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Millimolar (mM)</h3>
                <div className="text-xl font-bold">
                  {(molarity * 1000).toFixed(2)} mM
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Micromolar (μM)</h3>
                <div className="text-xl font-bold">
                  {(molarity * 1000000).toFixed(0)} μM
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Molarity</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Definition</h3>
              <p className="text-muted-foreground text-sm">
                Molarity (M) is the number of moles of solute per liter of solution. It's the most common unit of concentration in chemistry.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Formula</h3>
              <p className="text-muted-foreground text-sm">
                M = n / V, where M is molarity in mol/L, n is moles of solute, and V is volume of solution in liters.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in chemistry labs for preparing solutions, titrations, stoichiometry calculations, and analytical chemistry.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MolarityCalculator;
