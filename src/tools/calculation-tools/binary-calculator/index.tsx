import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw, Binary } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BinaryCalculator Component
 * 
 * Performs calculations in binary number system:
 * - Binary addition, subtraction, multiplication, division
 * - Binary to decimal conversion
 * - Decimal to binary conversion
 */
export function BinaryCalculator() {
  const [operation, setOperation] = useState<string>('add');
  const [binary1, setBinary1] = useState<string>('1010');
  const [binary2, setBinary2] = useState<string>('1100');
  const [result, setResult] = useState<string>('');
  const [decimal1, setDecimal1] = useState<number>(0);
  const [decimal2, setDecimal2] = useState<number>(0);
  const [decimalResult, setDecimalResult] = useState<number>(0);
  
  const { toast } = useToast();

  // Validate binary input
  const isValidBinary = (binary: string): boolean => {
    return /^[01]+$/.test(binary);
  };

  // Calculate binary operations
  useEffect(() => {
    if (!isValidBinary(binary1) || !isValidBinary(binary2)) {
      setResult('');
      setDecimal1(0);
      setDecimal2(0);
      setDecimalResult(0);
      return;
    }

    // Convert binary to decimal
    const dec1 = parseInt(binary1, 2);
    const dec2 = parseInt(binary2, 2);
    setDecimal1(dec1);
    setDecimal2(dec2);

    let decResult = 0;

    // Perform operation
    switch (operation) {
      case 'add':
        decResult = dec1 + dec2;
        break;
      case 'subtract':
        decResult = dec1 - dec2;
        break;
      case 'multiply':
        decResult = dec1 * dec2;
        break;
      case 'divide':
        decResult = dec2 !== 0 ? Math.floor(dec1 / dec2) : 0;
        break;
    }

    setDecimalResult(decResult);

    // Convert result back to binary (handle negative numbers)
    if (decResult < 0) {
      setResult('-' + Math.abs(decResult).toString(2));
    } else {
      setResult(decResult.toString(2));
    }
  }, [binary1, binary2, operation]);

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
    setBinary1('1010');
    setBinary2('1100');
    setOperation('add');
  };

  const getOperationSymbol = () => {
    switch (operation) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '+';
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Binary Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Perform arithmetic operations on binary numbers
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Binary className="mr-2 h-5 w-5" /> Binary Operation
          </h2>
          
          <div className="space-y-4">
            <Tabs value={operation} onValueChange={setOperation}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="add">Addition</TabsTrigger>
                <TabsTrigger value="subtract">Subtraction</TabsTrigger>
                <TabsTrigger value="multiply">Multiplication</TabsTrigger>
                <TabsTrigger value="divide">Division</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="binary1">First Binary Number</Label>
                <Input
                  id="binary1"
                  type="text"
                  value={binary1}
                  onChange={(e) => setBinary1(e.target.value.replace(/[^01]/g, ''))}
                  placeholder="Enter binary (0s and 1s only)"
                  className="mt-2 font-mono"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Decimal: {decimal1}
                </p>
              </div>
              <div>
                <Label htmlFor="binary2">Second Binary Number</Label>
                <Input
                  id="binary2"
                  type="text"
                  value={binary2}
                  onChange={(e) => setBinary2(e.target.value.replace(/[^01]/g, ''))}
                  placeholder="Enter binary (0s and 1s only)"
                  className="mt-2 font-mono"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Decimal: {decimal2}
                </p>
              </div>
            </div>

            {(!isValidBinary(binary1) || !isValidBinary(binary2)) && (binary1 || binary2) && (
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  ⚠️ Please enter valid binary numbers (only 0s and 1s)
                </p>
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Result</h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Binary Result</h3>
                    <div className="text-4xl font-bold font-mono break-all">
                      {result}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 font-mono">
                      {binary1} {getOperationSymbol()} {binary2} = {result}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(result, 'Binary Result')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Decimal Result</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {decimalResult}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(decimalResult.toString(), 'Decimal Result')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Hexadecimal</h3>
                      <div className="mt-1 text-2xl font-bold font-mono">
                        {decimalResult >= 0 ? '0x' + decimalResult.toString(16).toUpperCase() : 'N/A'}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => decimalResult >= 0 && copyToClipboard('0x' + decimalResult.toString(16).toUpperCase(), 'Hexadecimal')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Octal</h3>
                      <div className="mt-1 text-2xl font-bold font-mono">
                        {decimalResult >= 0 ? '0o' + decimalResult.toString(8) : 'N/A'}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => decimalResult >= 0 && copyToClipboard('0o' + decimalResult.toString(8), 'Octal')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Binary Numbers</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Binary System</h3>
              <p className="text-muted-foreground text-sm">
                Binary is a base-2 number system using only 0 and 1. Each digit represents a power of 2, from right to left.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Conversions</h3>
              <p className="text-muted-foreground text-sm">
                Binary 1010 = (1×8) + (0×4) + (1×2) + (0×1) = 10 in decimal. Essential for computer science and digital electronics.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in computing, digital circuits, data transmission, and all computer memory and processing operations.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BinaryCalculator;
