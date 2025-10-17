import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Type } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * RomanNumeralConverter Component
 * 
 * Converts between Roman numerals and Arabic numbers (1-3999)
 */
export function RomanNumeralConverter() {
  const [conversionType, setConversionType] = useState<string>('toRoman');
  const [arabicNumber, setArabicNumber] = useState<string>('2024');
  const [romanNumeral, setRomanNumeral] = useState<string>('MMXXIV');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  // Convert when inputs change
  useEffect(() => {
    if (conversionType === 'toRoman') {
      convertToRoman();
    } else {
      convertToArabic();
    }
  }, [arabicNumber, romanNumeral, conversionType]);

  // Function to convert Arabic to Roman
  const convertToRoman = () => {
    const num = parseInt(arabicNumber);
    
    if (isNaN(num) || num < 1 || num > 3999) {
      setResult('Invalid number (must be 1-3999)');
      return;
    }

    const romanNumerals = [
      { value: 1000, numeral: 'M' },
      { value: 900, numeral: 'CM' },
      { value: 500, numeral: 'D' },
      { value: 400, numeral: 'CD' },
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' },
    ];

    let remaining = num;
    let roman = '';

    for (const { value, numeral } of romanNumerals) {
      while (remaining >= value) {
        roman += numeral;
        remaining -= value;
      }
    }

    setResult(roman);
  };

  // Function to convert Roman to Arabic
  const convertToArabic = () => {
    const roman = romanNumeral.toUpperCase().trim();
    
    if (!roman || !/^[MDCLXVI]+$/.test(roman)) {
      setResult('Invalid Roman numeral');
      return;
    }

    const romanValues: { [key: string]: number } = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000,
    };

    let total = 0;
    let prevValue = 0;

    // Process from right to left
    for (let i = roman.length - 1; i >= 0; i--) {
      const currentValue = romanValues[roman[i]];
      
      if (currentValue < prevValue) {
        // Subtraction case (e.g., IV, IX, XL, XC, CD, CM)
        total -= currentValue;
      } else {
        total += currentValue;
      }
      
      prevValue = currentValue;
    }

    setResult(total.toString());
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
    setArabicNumber('2024');
    setRomanNumeral('MMXXIV');
    setConversionType('toRoman');
  };

  // Common numbers preset
  const commonNumbers = [
    { arabic: '1', roman: 'I' },
    { arabic: '5', roman: 'V' },
    { arabic: '10', roman: 'X' },
    { arabic: '50', roman: 'L' },
    { arabic: '100', roman: 'C' },
    { arabic: '500', roman: 'D' },
    { arabic: '1000', roman: 'M' },
    { arabic: '2024', roman: 'MMXXIV' },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Roman Numeral Converter</h1>
        <p className="text-muted-foreground mt-2">
          Convert between Roman numerals and Arabic numbers (1-3999)
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Type className="mr-2 h-5 w-5" /> Conversion Settings
          </h2>
          
          <div className="space-y-4">
            {/* Conversion Type */}
            <div>
              <Label htmlFor="conversionType">Conversion Type</Label>
              <Select value={conversionType} onValueChange={setConversionType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toRoman">Number to Roman</SelectItem>
                  <SelectItem value="toArabic">Roman to Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number to Roman */}
            {conversionType === 'toRoman' && (
              <div>
                <Label htmlFor="arabicNumber">Arabic Number (1-3999)</Label>
                <Input
                  id="arabicNumber"
                  type="number"
                  value={arabicNumber}
                  onChange={(e) => setArabicNumber(e.target.value)}
                  placeholder="Enter number (1-3999)"
                  className="mt-2"
                  min="1"
                  max="3999"
                />
              </div>
            )}

            {/* Roman to Number */}
            {conversionType === 'toArabic' && (
              <div>
                <Label htmlFor="romanNumeral">Roman Numeral</Label>
                <Input
                  id="romanNumeral"
                  type="text"
                  value={romanNumeral}
                  onChange={(e) => setRomanNumeral(e.target.value.toUpperCase())}
                  placeholder="Enter Roman numeral (e.g., MMXXIV)"
                  className="mt-2 uppercase font-mono"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Use: I, V, X, L, C, D, M
                </p>
              </div>
            )}

            {/* Quick Select */}
            <div>
              <Label>Quick Examples</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {commonNumbers.map((num) => (
                  <Button
                    key={num.arabic}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setArabicNumber(num.arabic);
                      setRomanNumeral(num.roman);
                    }}
                    className="text-xs"
                  >
                    {num.arabic} = {num.roman}
                  </Button>
                ))}
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
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Type className="mr-2 h-5 w-5" /> Conversion Result
            </h2>
            
            {/* Result */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {conversionType === 'toRoman' ? 'Roman Numeral' : 'Arabic Number'}
                  </h3>
                  <div className="text-4xl font-bold font-mono">
                    {result || 'N/A'}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(result, 'Result')}
                  disabled={!result || result.includes('Invalid')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Conversion Summary */}
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Input</h3>
                <div className="text-xl font-bold font-mono">
                  {conversionType === 'toRoman' ? arabicNumber : romanNumeral}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Output</h3>
                <div className="text-xl font-bold font-mono">
                  {result || 'N/A'}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Roman Numerals</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Basic Symbols</h3>
              <p className="text-muted-foreground text-sm">
                I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. Combine these to form any number 1-3999.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Rules</h3>
              <p className="text-muted-foreground text-sm">
                When a smaller value precedes a larger one, subtract (IV = 4). When equal or larger follows, add (VI = 6).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Uses</h3>
              <p className="text-muted-foreground text-sm">
                Used in book chapters, movie sequels, clock faces, building cornerstones, and formal documents.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RomanNumeralConverter;
