import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ReplaceDigitsWithWords() {
  const [inputText, setInputText] = useState<string>('I have 1 apple and 2 oranges.\nThere are 3 cats and 4 dogs.\n5 birds are flying.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const digitToWordMap: Record<string, string> = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine'
  };

  const doubleDigitToWordMap: Record<string, string> = {
    '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen', '14': 'fourteen',
    '15': 'fifteen', '16': 'sixteen', '17': 'seventeen', '18': 'eighteen', '19': 'nineteen',
    '20': 'twenty', '30': 'thirty', '40': 'forty', '50': 'fifty',
    '60': 'sixty', '70': 'seventy', '80': 'eighty', '90': 'ninety'
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    let result = inputText;

    // First, replace special two-digit numbers (10-99)
    Object.keys(doubleDigitToWordMap).forEach((num) => {
      const regex = new RegExp(`\\b${num}\\b`, 'g');
      result = result.replace(regex, doubleDigitToWordMap[num]);
    });

    // Then replace single digits
    result = result.replace(/\b(\d)\b/g, (match) => {
      return digitToWordMap[match] || match;
    });

    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Converted text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
          <div className="flex items-center justify-center gap-2">
            <Type className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-2xl">Replace Digits with Words</CardTitle>
          </div>
          <CardDescription>Convert numerical digits to written numbers</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with numbers..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Converted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Converted text will appear here..."
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg space-y-2">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Example:</strong> "I have 1 apple" → "I have one apple"
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Supports: 0-9 (single digits) and special numbers 10-19, 20-90
            </p>
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Result
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReplaceDigitsWithWords;
