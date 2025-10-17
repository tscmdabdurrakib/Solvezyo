import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertDigitsToLetters() {
  const [inputText, setInputText] = useState<string>('Transform numbers to text!\n1337 5p34k\nDigital to alphabetic');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const digitToLetterMap: Record<string, string> = {
    '0': 'O',
    '1': 'I',
    '2': 'Z',
    '3': 'E',
    '4': 'A',
    '5': 'S',
    '6': 'G',
    '7': 'T',
    '8': 'B',
    '9': 'g'
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const convertedText = inputText.replace(/./g, (char) => {
      return digitToLetterMap[char] || char;
    });

    setOutput(convertedText);
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
          <div className="flex items-center justify-center gap-2">
            <Type className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <CardTitle className="text-2xl">Convert Digits to Letters</CardTitle>
          </div>
          <CardDescription>Transform numbers to their letter lookalikes</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter your text with numbers..."
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

          <div className="bg-pink-50 dark:bg-pink-950/20 p-3 rounded-lg space-y-2">
            <p className="text-sm text-pink-700 dark:text-pink-300">
              <strong>Example:</strong> "H3110" → "HELLO" | "1337" → "IEET"
            </p>
            <p className="text-xs text-pink-600 dark:text-pink-400">
              Conversions: 0→O, 1→I, 2→Z, 3→E, 4→A, 5→S, 6→G, 7→T, 8→B, 9→g
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

export default ConvertDigitsToLetters;
