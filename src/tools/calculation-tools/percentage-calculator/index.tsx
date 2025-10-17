import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * PercentageCalculator Component
 * 
 * Calculates percentages with multiple modes:
 * - What is X% of Y?
 * - X is what % of Y?
 * - X is Y% of what?
 */
export function PercentageCalculator() {
  const [mode, setMode] = useState<string>('what-is');
  
  // Mode 1: What is X% of Y?
  const [percentage1, setPercentage1] = useState<string>('10');
  const [number1, setNumber1] = useState<string>('100');
  const [result1, setResult1] = useState<number>(0);
  
  // Mode 2: X is what % of Y?
  const [number2a, setNumber2a] = useState<string>('25');
  const [number2b, setNumber2b] = useState<string>('100');
  const [result2, setResult2] = useState<number>(0);
  
  // Mode 3: X is Y% of what?
  const [number3, setNumber3] = useState<string>('10');
  const [percentage3, setPercentage3] = useState<string>('25');
  const [result3, setResult3] = useState<number>(0);
  
  const { toast } = useToast();

  // Calculate Mode 1: What is X% of Y?
  useEffect(() => {
    const p = parseFloat(percentage1) || 0;
    const n = parseFloat(number1) || 0;
    // Result = (Percentage / 100) * Number
    setResult1((p / 100) * n);
  }, [percentage1, number1]);

  // Calculate Mode 2: X is what % of Y?
  useEffect(() => {
    const x = parseFloat(number2a) || 0;
    const y = parseFloat(number2b) || 0;
    // Result = (X / Y) * 100
    if (y !== 0) {
      setResult2((x / y) * 100);
    } else {
      setResult2(0);
    }
  }, [number2a, number2b]);

  // Calculate Mode 3: X is Y% of what?
  useEffect(() => {
    const x = parseFloat(number3) || 0;
    const p = parseFloat(percentage3) || 0;
    // Result = (X * 100) / Percentage
    if (p !== 0) {
      setResult3((x * 100) / p);
    } else {
      setResult3(0);
    }
  }, [number3, percentage3]);

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
    setPercentage1('10');
    setNumber1('100');
    setNumber2a('25');
    setNumber2b('100');
    setNumber3('10');
    setPercentage3('25');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Percentage Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate percentages with multiple calculation modes
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Percent className="mr-2 h-5 w-5" /> Percentage Calculation
          </h2>
          
          <Tabs value={mode} onValueChange={setMode} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="what-is">What is X% of Y?</TabsTrigger>
              <TabsTrigger value="x-is-what">X is what % of Y?</TabsTrigger>
              <TabsTrigger value="x-is-y">X is Y% of what?</TabsTrigger>
            </TabsList>
            
            {/* Mode 1: What is X% of Y? */}
            <TabsContent value="what-is" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="percentage1">Percentage (%)</Label>
                  <Input
                    id="percentage1"
                    type="number"
                    value={percentage1}
                    onChange={(e) => setPercentage1(e.target.value)}
                    placeholder="Enter percentage"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="number1">Of Number</Label>
                  <Input
                    id="number1"
                    type="number"
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value)}
                    placeholder="Enter number"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
                    <div className="text-4xl font-bold">
                      {result1.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {percentage1}% of {number1} = {result1.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(result1.toFixed(2), 'Result')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Mode 2: X is what % of Y? */}
            <TabsContent value="x-is-what" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="number2a">Number (X)</Label>
                  <Input
                    id="number2a"
                    type="number"
                    value={number2a}
                    onChange={(e) => setNumber2a(e.target.value)}
                    placeholder="Enter number"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="number2b">Of Number (Y)</Label>
                  <Input
                    id="number2b"
                    type="number"
                    value={number2b}
                    onChange={(e) => setNumber2b(e.target.value)}
                    placeholder="Enter number"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
                    <div className="text-4xl font-bold">
                      {result2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {number2a} is {result2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% of {number2b}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(result2.toFixed(2) + '%', 'Result')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Mode 3: X is Y% of what? */}
            <TabsContent value="x-is-y" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="number3">Number (X)</Label>
                  <Input
                    id="number3"
                    type="number"
                    value={number3}
                    onChange={(e) => setNumber3(e.target.value)}
                    placeholder="Enter number"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="percentage3">Is Percentage (%)</Label>
                  <Input
                    id="percentage3"
                    type="number"
                    value={percentage3}
                    onChange={(e) => setPercentage3(e.target.value)}
                    placeholder="Enter percentage"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
                    <div className="text-4xl font-bold">
                      {result3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {number3} is {percentage3}% of {result3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(result3.toFixed(2), 'Result')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleReset} variant="outline" className="w-full mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </Card>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Percentage Calculations</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is X% of Y?</h3>
              <p className="text-muted-foreground text-sm">
                Calculate the result of a percentage of a number. Example: What is 25% of 200? = 50
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">X is what % of Y?</h3>
              <p className="text-muted-foreground text-sm">
                Find what percentage one number is of another. Example: 50 is what % of 200? = 25%
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">X is Y% of what?</h3>
              <p className="text-muted-foreground text-sm">
                Find the total when you know a part and its percentage. Example: 50 is 25% of what? = 200
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PercentageCalculator;
