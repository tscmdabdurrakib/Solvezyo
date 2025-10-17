import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertOctalToText() {
  const [inputText, setInputText] = useState<string>('110 145 154 154 157');
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
      const octalArray = inputText.trim().split(/\s+/);
      const text = octalArray
        .map(octal => {
          const decimal = parseInt(octal, 8);
          if (isNaN(decimal)) throw new Error('Invalid octal');
          return String.fromCharCode(decimal);
        })
        .join('');

      setOutput(text);
      setError('');
    } catch (err) {
      setOutput('');
      setError('Invalid octal input. Please enter octal digits (0-7) separated by spaces.');
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <CardTitle className="text-2xl">Convert Octal to Text</CardTitle>
          </div>
          <CardDescription>Convert octal code back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Octal Code (space-separated):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter octal code here (e.g., 110 151)..."
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

          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>Example:</strong> "110 151" converts to "Hi" - Space-separated octal values!
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

export default ConvertOctalToText;
