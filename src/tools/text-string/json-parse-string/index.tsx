import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Braces } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function JsonParseString() {
  const [inputText, setInputText] = useState<string>('"Hello World!\\nWelcome to ToolNexas\\nProfessional Tools & Solutions"');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      setError('');
      return;
    }
    
    try {
      // Parse the JSON string
      const parsed = JSON.parse(inputText);
      // Convert to string if it's not already a string
      const result = typeof parsed === 'string' ? parsed : JSON.stringify(parsed, null, 2);
      setOutput(result);
      setError('');
    } catch (err) {
      setError('Invalid JSON string format. Please check your input.');
      setOutput('');
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Parsed string copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <Braces className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">JSON Parse a String</CardTitle>
          </div>
          <CardDescription>Parse JSON-escaped string back to readable format</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">JSON String:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter JSON string to parse..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter a valid JSON-escaped string
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div>
            <Label htmlFor="output">Parsed String:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Parsed string will appear here..."
            />
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

export default JsonParseString;
