import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertLettersToDigits() {
  const [inputText, setInputText] = useState<string>('Convert letters to numbers!\nCreate digital codes\nUnique transformations');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const letterToDigitMap: Record<string, string> = {
    'A': '4', 'a': '4',
    'B': '8', 'b': '8',
    'E': '3', 'e': '3',
    'G': '6', 'g': '6',
    'I': '1', 'i': '1',
    'O': '0', 'o': '0',
    'S': '5', 's': '5',
    'T': '7', 't': '7',
    'Z': '2', 'z': '2',
    'L': '1', 'l': '1'
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const convertedText = inputText.replace(/./g, (char) => {
      return letterToDigitMap[char] || char;
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Convert Letters to Digits</CardTitle>
          </div>
          <CardDescription>Transform letters to their numerical lookalikes</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter your text here..."
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

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg space-y-2">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Example:</strong> "HELLO" → "H311O" | "BEST" → "835T"
            </p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400">
              Conversions: A→4, B→8, E→3, G→6, I→1, O→0, S→5, T→7, Z→2, L→1
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

export default ConvertLettersToDigits;
