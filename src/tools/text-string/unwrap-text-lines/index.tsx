import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function UnwrapTextLines() {
  const [inputText, setInputText] = useState<string>('This is the first line\nof wrapped text that\ncontinues on multiple lines.\n\nThis is the second\nparagraph that also\nspans multiple lines.');
  const [separator, setSeparator] = useState<string>(' ');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    // Split by double newlines to preserve paragraphs
    const paragraphs = inputText.split(/\n\s*\n/);
    
    const unwrappedParagraphs = paragraphs.map(paragraph => {
      // Remove single line breaks within paragraph but keep the text together
      const lines = paragraph.split('\n').map(line => line.trim()).filter(line => line !== '');
      return lines.join(separator || ' ');
    });

    // Join paragraphs back with double newlines
    setOutput(unwrappedParagraphs.join('\n\n'));
  }, [inputText, separator]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Unwrapped text lines copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const presetSeparators = [
    { name: "Space", value: " " },
    { name: "No Space", value: "" },
    { name: "Comma", value: ", " },
    { name: "Semicolon", value: "; " },
    { name: "Pipe", value: " | " },
    { name: "Dash", value: " - " },
    { name: "Tab", value: "\t" },
    { name: "Custom", value: "" },
  ];

  const applySeparator = (value: string) => {
    if (value !== "custom") {
      setSeparator(value);
    } else {
      setSeparator('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <Minus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Unwrap Text Lines</CardTitle>
          </div>
          <CardDescription>Remove line breaks within paragraphs and join text lines with a custom separator</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter wrapped text with line breaks..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="separator">Line Separator:</Label>
            <Input
              id="separator"
              data-testid="input-separator"
              placeholder="Space"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Quick Separators:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {presetSeparators.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applySeparator(preset.value)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="output">Unwrapped Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Unwrapped text will appear here..."
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Example:</strong> Removes line breaks within paragraphs while preserving paragraph separation (double line breaks). Perfect for unwrapping email text or formatted content.
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

export default UnwrapTextLines;