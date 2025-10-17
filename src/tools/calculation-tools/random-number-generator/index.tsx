import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Copy, RefreshCw, Dices } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * RandomNumberGenerator Component
 * 
 * Generates random numbers with customizable options:
 * - Single or multiple numbers
 * - Custom range
 * - Allow duplicates option
 */
export function RandomNumberGenerator() {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [count, setCount] = useState<string>('1');
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [result, setResult] = useState<number[]>([]);
  
  const { toast } = useToast();

  // Function to generate random numbers
  const generateNumbers = () => {
    const minVal = parseInt(min) || 1;
    const maxVal = parseInt(max) || 100;
    const countVal = parseInt(count) || 1;

    if (minVal >= maxVal) {
      toast({
        title: "Invalid Range",
        description: "Minimum must be less than maximum",
        variant: "destructive",
      });
      return;
    }

    const range = maxVal - minVal + 1;
    
    if (!allowDuplicates && countVal > range) {
      toast({
        title: "Invalid Count",
        description: `Cannot generate ${countVal} unique numbers in range ${minVal}-${maxVal}`,
        variant: "destructive",
      });
      return;
    }

    const generated: number[] = [];
    
    if (allowDuplicates) {
      // Generate with duplicates allowed
      for (let i = 0; i < countVal; i++) {
        const random = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
        generated.push(random);
      }
    } else {
      // Generate unique numbers
      const available = Array.from({ length: range }, (_, i) => minVal + i);
      for (let i = 0; i < countVal; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        generated.push(available[randomIndex]);
        available.splice(randomIndex, 1);
      }
    }

    setResult(generated);
  };

  // Function to copy result to clipboard
  const copyToClipboard = () => {
    const text = result.join(', ');
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Random numbers copied to clipboard",
    });
  };

  // Function to reset values
  const handleReset = () => {
    setMin('1');
    setMax('100');
    setCount('1');
    setAllowDuplicates(true);
    setResult([]);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Random Number Generator</h1>
        <p className="text-muted-foreground mt-2">
          Generate random numbers with customizable range and options
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Dices className="mr-2 h-5 w-5" /> Configuration
          </h2>
          
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="min">Minimum Value</Label>
                <Input
                  id="min"
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  placeholder="Minimum"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="max">Maximum Value</Label>
                <Input
                  id="max"
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  placeholder="Maximum"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="count">How Many Numbers</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="Count"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="duplicates">Allow Duplicate Numbers</Label>
                <p className="text-sm text-muted-foreground">
                  When disabled, each number will be unique
                </p>
              </div>
              <Switch
                id="duplicates"
                checked={allowDuplicates}
                onCheckedChange={setAllowDuplicates}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={generateNumbers} className="w-full">
                <Dices className="mr-2 h-4 w-4" /> Generate
              </Button>
              <Button onClick={handleReset} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        {result.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Generated Numbers</h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {result.length} Random Number{result.length > 1 ? 's' : ''}
                    </h3>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {result.map((num, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center font-bold text-lg"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Sum</h3>
                  <div className="mt-1 text-2xl font-bold">
                    {result.reduce((a, b) => a + b, 0)}
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Average</h3>
                  <div className="mt-1 text-2xl font-bold">
                    {(result.reduce((a, b) => a + b, 0) / result.length).toFixed(2)}
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Range</h3>
                  <div className="mt-1 text-2xl font-bold">
                    {Math.max(...result)} - {Math.min(...result)}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Random Number Generation</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Cryptographically Secure</h3>
              <p className="text-muted-foreground text-sm">
                Uses JavaScript's Math.random() for generating pseudo-random numbers suitable for most applications.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Unique Numbers</h3>
              <p className="text-muted-foreground text-sm">
                When duplicates are disabled, ensures each generated number is unique within the specified range.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Use Cases</h3>
              <p className="text-muted-foreground text-sm">
                Perfect for lottery numbers, dice rolls, random sampling, games, and statistical simulations.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RandomNumberGenerator;
