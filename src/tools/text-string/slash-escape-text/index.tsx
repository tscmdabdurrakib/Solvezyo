import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Slash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SlashEscapeText() {
  const [inputText, setInputText] = useState<string>(`Hello "World"!
This is a test with 'quotes'.
Backslash: \\ and forward slash: /
New line and tab characters.`);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    let result = inputText;

    // Escape backslashes first (must be done before other escapes)
    result = result.replace(/\\/g, '\\\\');

    // Escape double quotes
    result = result.replace(/"/g, '\\"');

    // Escape single quotes
    result = result.replace(/'/g, "\\'");

    // Escape newlines
    result = result.replace(/\n/g, '\\n');

    // Escape tabs
    result = result.replace(/\t/g, '\\t');

    // Escape carriage returns
    result = result.replace(/\r/g, '\\r');

    // Escape forward slashes (optional, for JSON compatibility)
    result = result.replace(/\//g, '\\/');

    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Escaped text copied to clipboard",
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
            <Slash className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-2xl">Slash-Escape Text</CardTitle>
          </div>
          <CardDescription>Add backslash escapes to special characters in your text</CardDescription>
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
            <Label htmlFor="output">Escaped Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Escaped text will appear here..."
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Escaped characters:</strong> Backslashes (\\), quotes ("), apostrophes ('), newlines (\n), tabs (\t), and forward slashes (/).
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

export default SlashEscapeText;
