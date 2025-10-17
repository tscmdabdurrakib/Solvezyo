import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ReplaceWordsWithDigits() {
  const [inputText, setInputText] = useState<string>('I have one apple and two oranges.\nThere are three cats and four dogs.\nFive birds are flying.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const wordToDigitMap: Record<string, string> = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
    'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13', 'fourteen': '14',
    'fifteen': '15', 'sixteen': '16', 'seventeen': '17', 'eighteen': '18', 'nineteen': '19',
    'twenty': '20', 'thirty': '30', 'forty': '40', 'fifty': '50',
    'sixty': '60', 'seventy': '70', 'eighty': '80', 'ninety': '90',
    'hundred': '100', 'thousand': '1000', 'million': '1000000'
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    let result = inputText;

    // Replace words with digits (case-insensitive)
    Object.keys(wordToDigitMap).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, (match) => {
        // Preserve original case for the first letter if it was uppercase
        const isCapitalized = match[0] === match[0].toUpperCase();
        const digit = wordToDigitMap[word.toLowerCase()];
        return isCapitalized && result.indexOf(match) === 0 ? digit : digit;
      });
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Replace Words with Digits</CardTitle>
          </div>
          <CardDescription>Convert written numbers to numerical digits</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with written numbers..."
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

          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg space-y-2">
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              <strong>Example:</strong> "I have one apple" → "I have 1 apple"
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              Supports: zero-nineteen, twenty-ninety, hundred, thousand, million
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

export default ReplaceWordsWithDigits;
