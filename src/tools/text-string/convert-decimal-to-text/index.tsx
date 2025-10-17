import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertDecimalToText() {
  const [inputText, setInputText] = useState<string>('72 101 108 108 111');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const decimalArray = inputText.trim().split(/\s+/);
      const text = decimalArray
        .map(decimal => {
          const num = parseInt(decimal, 10);
          if (isNaN(num) || num < 0 || num > 1114111) throw new Error('Invalid decimal');
          return String.fromCharCode(num);
        })
        .join('');

      setOutput(text);
      setError('');
    } catch (err) {
      setOutput('');
      setError('Invalid decimal input. Please enter valid decimal numbers separated by spaces.');
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Decoded text copied to clipboard",
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
            <Calculator className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Convert Decimal to Text</CardTitle>
          </div>
          <CardDescription>Convert decimal ASCII values back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Decimal Values (space-separated):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter decimal values here (e.g., 72 105)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="output">Decoded Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Decoded text will appear here..."
            />
            {error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Example:</strong> "72 105" converts to "Hi" - Space-separated ASCII codes!
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

export default ConvertDecimalToText;
