import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddPrefixToTextLines() {
  const [inputText, setInputText] = useState<string>('First line of text\nSecond line of text\nThird line of text\nFourth line of text');
  const [prefix, setPrefix] = useState<string>('> ');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n');
    const prefixValue = prefix || '';
    
    const processedLines = lines.map(line => {
      // Don't add prefix to empty lines
      if (line.trim() === '') {
        return line;
      }
      return `${prefixValue}${line}`;
    });

    setOutput(processedLines.join('\n'));
  }, [inputText, prefix]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with prefix added to lines copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const presetPrefixes = [
    { name: "Quote", value: "> " },
    { name: "Bullet", value: "• " },
    { name: "Dash", value: "- " },
    { name: "Number", value: "1. " },
    { name: "Arrow", value: "→ " },
    { name: "Star", value: "* " },
    { name: "Hash", value: "# " },
    { name: "Checkbox", value: "☐ " },
  ];

  const applyPreset = (value: string) => {
    setPrefix(value);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Add a Prefix to Text Lines</CardTitle>
          </div>
          <CardDescription>Add a prefix to the beginning of each line in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with multiple lines..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="prefix">Prefix to Add:</Label>
            <Input
              id="prefix"
              data-testid="input-prefix"
              placeholder="> "
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Quick Presets:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {presetPrefixes.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset.value)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Prefix Added to Lines:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with prefix added to lines will appear here..."
            />
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Example:</strong> Adding "&gt; " prefix to lines creates quoted text format
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

export default AddPrefixToTextLines;
