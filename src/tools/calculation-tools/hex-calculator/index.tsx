import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * HexCalculator Component
 * 
 * Performs calculations in hexadecimal number system:
 * - Hex addition, subtraction, multiplication, division
 * - Hex to decimal conversion
 * - Decimal to hex conversion
 */
export function HexCalculator() {
  const [operation, setOperation] = useState<string>('add');
  const [hex1, setHex1] = useState<string>('1A');
  const [hex2, setHex2] = useState<string>('2F');
  const [result, setResult] = useState<string>('');
  const [decimal1, setDecimal1] = useState<number>(0);
  const [decimal2, setDecimal2] = useState<number>(0);
  const [decimalResult, setDecimalResult] = useState<number>(0);
  
  const { toast } = useToast();

  // Validate hex input
  const isValidHex = (hex: string): boolean => {
    return /^[0-9A-Fa-f]+$/.test(hex);
  };

  // Calculate hex operations
  useEffect(() => {
    if (!isValidHex(hex1) || !isValidHex(hex2)) {
      setResult('');
      setDecimal1(0);
      setDecimal2(0);
      setDecimalResult(0);
      return;
    }

    // Convert hex to decimal
    const dec1 = parseInt(hex1, 16);
    const dec2 = parseInt(hex2, 16);
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

    // Convert result back to hex (handle negative numbers)
    if (decResult < 0) {
      setResult('-' + Math.abs(decResult).toString(16).toUpperCase());
    } else {
      setResult(decResult.toString(16).toUpperCase());
    }
  }, [hex1, hex2, operation]);

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
    setHex1('1A');
    setHex2('2F');
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
        <h1 className="text-3xl font-bold tracking-tight">Hexadecimal Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Perform arithmetic operations on hexadecimal numbers
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Hash className="mr-2 h-5 w-5" /> Hexadecimal Operation
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
                <Label htmlFor="hex1">First Hex Number</Label>
                <Input
                  id="hex1"
                  type="text"
                  value={hex1}
                  onChange={(e) => setHex1(e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase())}
                  placeholder="Enter hex (0-9, A-F)"
                  className="mt-2 font-mono"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Decimal: {decimal1}
                </p>
              </div>
              <div>
                <Label htmlFor="hex2">Second Hex Number</Label>
                <Input
                  id="hex2"
                  type="text"
                  value={hex2}
                  onChange={(e) => setHex2(e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase())}
                  placeholder="Enter hex (0-9, A-F)"
                  className="mt-2 font-mono"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Decimal: {decimal2}
                </p>
              </div>
            </div>

            {(!isValidHex(hex1) || !isValidHex(hex2)) && (hex1 || hex2) && (
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  ⚠️ Please enter valid hexadecimal numbers (0-9, A-F)
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
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Hexadecimal Result</h3>
                    <div className="text-4xl font-bold font-mono break-all">
                      0x{result}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 font-mono">
                      0x{hex1} {getOperationSymbol()} 0x{hex2} = 0x{result}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard('0x' + result, 'Hex Result')}
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
                      <h3 className="text-sm font-medium text-muted-foreground">Binary</h3>
                      <div className="mt-1 text-lg font-bold font-mono break-all">
                        {decimalResult >= 0 ? '0b' + decimalResult.toString(2) : 'N/A'}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => decimalResult >= 0 && copyToClipboard('0b' + decimalResult.toString(2), 'Binary')}
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
          <h2 className="text-xl font-semibold mb-4">About Hexadecimal Numbers</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Hexadecimal System</h3>
              <p className="text-muted-foreground text-sm">
                Hexadecimal is a base-16 system using digits 0-9 and letters A-F (representing 10-15). Commonly used in computing.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Conversions</h3>
              <p className="text-muted-foreground text-sm">
                Hex 1A = (1×16) + (10×1) = 26 in decimal. Each hex digit represents 4 binary bits, making conversion easy.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used for memory addresses, color codes (RGB), MAC addresses, Unicode characters, and debugging.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HexCalculator;
