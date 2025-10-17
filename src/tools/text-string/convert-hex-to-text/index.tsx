import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertHexToText() {
  const [inputText, setInputText] = useState<string>('48 65 6C 6C 6F');
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
      const hexArray = inputText.trim().split(/\s+/);
      const text = hexArray
        .map(hex => {
          const decimal = parseInt(hex, 16);
          if (isNaN(decimal)) throw new Error('Invalid hex');
          return String.fromCharCode(decimal);
        })
        .join('');

      setOutput(text);
      setError('');
    } catch (err) {
      setOutput('');
      setError('Invalid hexadecimal input. Please enter hex digits (0-9, A-F) separated by spaces.');
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <CardTitle className="text-2xl">Convert Hex to Text</CardTitle>
          </div>
          <CardDescription>Convert hexadecimal code back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Hexadecimal Code (space-separated):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter hex code here (e.g., 48 69)..."
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

          <div className="bg-rose-50 dark:bg-rose-950/20 p-3 rounded-lg">
            <p className="text-sm text-rose-700 dark:text-rose-300">
              <strong>Example:</strong> "48 69" converts to "Hi" - Space-separated hex values!
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

export default ConvertHexToText;
