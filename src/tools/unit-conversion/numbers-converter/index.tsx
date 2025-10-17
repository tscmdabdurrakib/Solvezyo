import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Hash, RotateCcw, Info, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Number system types
type NumberSystem = "binary" | "decimal" | "octal" | "hexadecimal";

// Number system display labels
const systemLabels: Record<NumberSystem, string> = {
  binary: "Binary (Base 2)",
  decimal: "Decimal (Base 10)",
  octal: "Octal (Base 8)",
  hexadecimal: "Hexadecimal (Base 16)",
};

// Validation patterns for each number system
const validationPatterns: Record<NumberSystem, RegExp> = {
  binary: /^[01]+$/,
  decimal: /^[0-9]+$/,
  octal: /^[0-7]+$/,
  hexadecimal: /^[0-9A-Fa-f]+$/,
};

function NumbersConverter() {
  // State for each number system
  const [binaryValue, setBinaryValue] = useState<string>('');
  const [decimalValue, setDecimalValue] = useState<string>('');
  const [octalValue, setOctalValue] = useState<string>('');
  const [hexValue, setHexValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [activeInput, setActiveInput] = useState<NumberSystem | null>(null);
  const { toast } = useToast();

  /**
   * Convert from decimal to all other number systems
   */
  const convertFromDecimal = (decValue: number) => {
    try {
      setBinaryValue(decValue.toString(2));
      setOctalValue(decValue.toString(8));
      setHexValue(decValue.toString(16).toUpperCase());
      setError(null);
    } catch (err) {
      setError('Conversion error occurred');
    }
  };

  /**
   * Handle input change for any number system
   */
  const handleInputChange = (value: string, system: NumberSystem) => {
    setActiveInput(system);
    setError(null);

    // Clear other fields if input is empty
    if (!value) {
      setBinaryValue('');
      setDecimalValue('');
      setOctalValue('');
      setHexValue('');
      return;
    }

    // Validate input based on number system
    if (!validationPatterns[system].test(value)) {
      setError(`Invalid ${system} number format`);
      return;
    }

    // Set the current input value
    switch (system) {
      case "binary":
        setBinaryValue(value);
        break;
      case "decimal":
        setDecimalValue(value);
        break;
      case "octal":
        setOctalValue(value);
        break;
      case "hexadecimal":
        setHexValue(value.toUpperCase());
        break;
    }

    // Convert to decimal first, then to all other systems
    let decimalNumber: number;
    try {
      switch (system) {
        case "binary":
          decimalNumber = parseInt(value, 2);
          setDecimalValue(decimalNumber.toString());
          setOctalValue(decimalNumber.toString(8));
          setHexValue(decimalNumber.toString(16).toUpperCase());
          break;
        case "decimal":
          decimalNumber = parseInt(value, 10);
          setBinaryValue(decimalNumber.toString(2));
          setOctalValue(decimalNumber.toString(8));
          setHexValue(decimalNumber.toString(16).toUpperCase());
          break;
        case "octal":
          decimalNumber = parseInt(value, 8);
          setDecimalValue(decimalNumber.toString());
          setBinaryValue(decimalNumber.toString(2));
          setHexValue(decimalNumber.toString(16).toUpperCase());
          break;
        case "hexadecimal":
          decimalNumber = parseInt(value, 16);
          setDecimalValue(decimalNumber.toString());
          setBinaryValue(decimalNumber.toString(2));
          setOctalValue(decimalNumber.toString(8));
          break;
      }
    } catch (err) {
      setError('Invalid number format');
    }
  };

  /**
   * Copy value to clipboard
   */
  const copyToClipboard = (value: string, system: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${system} value copied to clipboard`,
    });
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setBinaryValue('');
    setDecimalValue('');
    setOctalValue('');
    setHexValue('');
    setError(null);
    setActiveInput(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Hash className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Numbers Converter</CardTitle>
            <CardDescription>
              Convert between binary, decimal, octal, and hexadecimal number systems
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Binary Input */}
          <div className="space-y-2">
            <label htmlFor="binary-input" className="block text-sm font-medium">
              Binary (Base 2) - Only 0s and 1s
            </label>
            <div className="flex gap-2">
              <Input
                id="binary-input"
                type="text"
                value={binaryValue}
                onChange={(e) => handleInputChange(e.target.value, "binary")}
                placeholder="Enter binary number (e.g., 1010)"
                className="font-mono"
              />
              {binaryValue && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(binaryValue, "Binary")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Decimal Input */}
          <div className="space-y-2">
            <label htmlFor="decimal-input" className="block text-sm font-medium">
              Decimal (Base 10) - Regular numbers
            </label>
            <div className="flex gap-2">
              <Input
                id="decimal-input"
                type="text"
                value={decimalValue}
                onChange={(e) => handleInputChange(e.target.value, "decimal")}
                placeholder="Enter decimal number (e.g., 42)"
                className="font-mono"
              />
              {decimalValue && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(decimalValue, "Decimal")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Octal Input */}
          <div className="space-y-2">
            <label htmlFor="octal-input" className="block text-sm font-medium">
              Octal (Base 8) - Numbers 0-7
            </label>
            <div className="flex gap-2">
              <Input
                id="octal-input"
                type="text"
                value={octalValue}
                onChange={(e) => handleInputChange(e.target.value, "octal")}
                placeholder="Enter octal number (e.g., 52)"
                className="font-mono"
              />
              {octalValue && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(octalValue, "Octal")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Hexadecimal Input */}
          <div className="space-y-2">
            <label htmlFor="hex-input" className="block text-sm font-medium">
              Hexadecimal (Base 16) - Numbers 0-9 and letters A-F
            </label>
            <div className="flex gap-2">
              <Input
                id="hex-input"
                type="text"
                value={hexValue}
                onChange={(e) => handleInputChange(e.target.value, "hexadecimal")}
                placeholder="Enter hex number (e.g., 2A)"
                className="font-mono"
              />
              {hexValue && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(hexValue, "Hexadecimal")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Conversion Info */}
          {(binaryValue || decimalValue || octalValue || hexValue) && !error && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="space-y-2">
                  <span className="font-medium">All Representations:</span>
                  <div className="grid gap-1 text-muted-foreground font-mono">
                    <div className="flex items-center justify-between">
                      <span>Binary (2):</span>
                      <span>{binaryValue || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Decimal (10):</span>
                      <span>{decimalValue || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Octal (8):</span>
                      <span>{octalValue || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Hexadecimal (16):</span>
                      <span>{hexValue || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Number System Reference */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-2">Number System Quick Reference:</h4>
            <div className="grid gap-1 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Binary (Base 2):</span>
                <span>Uses digits 0, 1</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Octal (Base 8):</span>
                <span>Uses digits 0-7</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Decimal (Base 10):</span>
                <span>Uses digits 0-9</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hexadecimal (Base 16):</span>
                <span>Uses digits 0-9, A-F</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Real-time conversion between number systems
        </div>
      </CardFooter>
    </Card>
  );
}

export default NumbersConverter;
