import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Binary } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertBinaryToText() {
  const [inputText, setInputText] = useState<string>('01001000 01100101 01101100 01101100 01101111');
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
      const binaryArray = inputText.trim().split(/\s+/);
      const text = binaryArray
        .map(binary => {
          const decimal = parseInt(binary, 2);
          if (isNaN(decimal)) throw new Error('Invalid binary');
          return String.fromCharCode(decimal);
        })
        .join('');

      setOutput(text);
      setError('');
    } catch (err) {
      setOutput('');
      setError('Invalid binary input. Please enter binary digits (0 and 1) separated by spaces.');
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            <Binary className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Convert Binary to Text</CardTitle>
          </div>
          <CardDescription>Convert binary code back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Binary Code (space-separated):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter binary code here (e.g., 01001000 01101001)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono text-sm"
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

          <div className="bg-teal-50 dark:bg-teal-950/20 p-3 rounded-lg">
            <p className="text-sm text-teal-700 dark:text-teal-300">
              <strong>Example:</strong> "01001000 01101001" converts to "Hi" - Space-separated binary groups!
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

export default ConvertBinaryToText;
