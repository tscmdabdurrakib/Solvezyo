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
 * RoundingCalculator Component
 * 
 * Rounds numbers to specified decimal places or significant figures
 */
export function RoundingCalculator() {
  const [number, setNumber] = useState<string>('123.456789');
  const [decimalPlaces, setDecimalPlaces] = useState<string>('2');
  const [roundingMode, setRoundingMode] = useState<'decimal' | 'significant'>('decimal');
  const [roundedValue, setRoundedValue] = useState<string>('');
  const [roundUpValue, setRoundUpValue] = useState<string>('');
  const [roundDownValue, setRoundDownValue] = useState<string>('');
  const { toast } = useToast();

  // Calculate rounded values whenever inputs change
  useEffect(() => {
    calculateRounding();
  }, [number, decimalPlaces, roundingMode]);

  // Round number based on mode
  const calculateRounding = () => {
    const num = parseFloat(number);
    const places = parseInt(decimalPlaces);
    
    if (isNaN(num) || isNaN(places) || places < 0) {
      setRoundedValue('');
      setRoundUpValue('');
      setRoundDownValue('');
      return;
    }

    if (roundingMode === 'decimal') {
      // Round to decimal places
      const multiplier = Math.pow(10, places);
      
      // Standard rounding (half up)
      const rounded = Math.round(num * multiplier) / multiplier;
      setRoundedValue(rounded.toFixed(places));
      
      // Round up (ceiling)
      const roundUp = Math.ceil(num * multiplier) / multiplier;
      setRoundUpValue(roundUp.toFixed(places));
      
      // Round down (floor)
      const roundDown = Math.floor(num * multiplier) / multiplier;
      setRoundDownValue(roundDown.toFixed(places));
      
    } else {
      // Round to significant figures
      if (num === 0) {
        setRoundedValue('0');
        setRoundUpValue('0');
        setRoundDownValue('0');
        return;
      }
      
      const magnitude = Math.floor(Math.log10(Math.abs(num)));
      const multiplier = Math.pow(10, places - magnitude - 1);
      
      // Standard rounding (half up)
      const rounded = Math.round(num * multiplier) / multiplier;
      setRoundedValue(rounded.toPrecision(places));
      
      // Round up
      const roundUp = Math.ceil(num * multiplier) / multiplier;
      setRoundUpValue(roundUp.toPrecision(places));
      
      // Round down
      const roundDown = Math.floor(num * multiplier) / multiplier;
      setRoundDownValue(roundDown.toPrecision(places));
    }
  };

  // Copy result to clipboard
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Reset calculator
  const handleReset = () => {
    setNumber('123.456789');
    setDecimalPlaces('2');
    setRoundingMode('decimal');
  };

  const isValidInput = !isNaN(parseFloat(number)) && !isNaN(parseInt(decimalPlaces));

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Rounding Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Round numbers to decimal places or significant figures
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Enter Values
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="number">Number to Round</Label>
              <Input
                id="number"
                type="number"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a number"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="roundingMode">Rounding Mode</Label>
              <Select value={roundingMode} onValueChange={(value: 'decimal' | 'significant') => setRoundingMode(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decimal">Decimal Places</SelectItem>
                  <SelectItem value="significant">Significant Figures</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="decimalPlaces">
                {roundingMode === 'decimal' ? 'Decimal Places' : 'Significant Figures'}
              </Label>
              <Input
                id="decimalPlaces"
                type="number"
                min="0"
                max="15"
                step="1"
                value={decimalPlaces}
                onChange={(e) => setDecimalPlaces(e.target.value)}
                placeholder="Enter number of places"
                className="mt-2"
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {isValidInput && roundedValue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              {/* Standard Rounding */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Rounded (Half Up)
                    </h3>
                    <div className="text-4xl font-bold">{roundedValue}</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Original: {number}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(roundedValue, 'Rounded Value')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Round Up */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Round Up (Ceiling)</h3>
                      <div className="mt-1 text-2xl font-bold">{roundUpValue}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(roundUpValue, 'Round Up Value')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Round Down */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Round Down (Floor)</h3>
                      <div className="mt-1 text-2xl font-bold">{roundDownValue}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(roundDownValue, 'Round Down Value')}
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
          <h2 className="text-xl font-semibold mb-4">Rounding Methods</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Half Up Rounding</h3>
              <p className="text-muted-foreground text-sm">
                Standard rounding where 0.5 and above rounds up, and below 0.5 rounds down.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Round Up (Ceiling)</h3>
              <p className="text-muted-foreground text-sm">
                Always rounds up to the next value, regardless of the decimal portion.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Round Down (Floor)</h3>
              <p className="text-muted-foreground text-sm">
                Always rounds down to the previous value, truncating the decimal portion.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RoundingCalculator;
