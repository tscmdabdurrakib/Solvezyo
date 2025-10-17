import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Highlighter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function HighlightPatternsInText() {
  const [inputText, setInputText] = useState<string>('Email: john@example.com\nPhone: 123-456-7890\nURL: https://example.com');
  const [pattern, setPattern] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    if (!pattern) {
      setOutput(inputText);
      return;
    }

    try {
      const regex = new RegExp(pattern, 'g');
      const result = inputText.replace(regex, (match) => `⟦${match}⟧`);
      setOutput(result);
    } catch (error) {
      setOutput(inputText + '\n\n❌ Invalid regex pattern');
    }
  }, [inputText, pattern]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with highlighted patterns copied to clipboard",
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
            <Highlighter className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Highlight Patterns in Text</CardTitle>
          </div>
          <CardDescription>Highlight text patterns using regular expressions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="pattern">Regular Expression Pattern:</Label>
            <Input
              id="pattern"
              data-testid="pattern"
              placeholder="Enter regex pattern (e.g., \\d+ for numbers)"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="mt-2 font-mono"
            />
          </div>

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
            <Label htmlFor="output">Result:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with highlighted patterns will appear here..."
            />
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg">
            <p className="text-sm text-cyan-700 dark:text-cyan-300">
              <strong>Examples:</strong><br />
              • Email: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{"{2,}"}<br />
              • Phone: \d{"{3}"}-\d{"{3}"}-\d{"{4}"}<br />
              • Numbers: \d+
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

export default HighlightPatternsInText;
