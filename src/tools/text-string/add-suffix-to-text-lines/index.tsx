import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddSuffixToTextLines() {
  const [inputText, setInputText] = useState<string>('First line of text\nSecond line of text\nThird line of text\nFourth line of text');
  const [suffix, setSuffix] = useState<string>(' →');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n');
    const suffixValue = suffix || '';
    
    const processedLines = lines.map(line => {
      // Don't add suffix to empty lines
      if (line.trim() === '') {
        return line;
      }
      return `${line}${suffixValue}`;
    });

    setOutput(processedLines.join('\n'));
  }, [inputText, suffix]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with suffix added to lines copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const presetSuffixes = [
    { name: "Arrow", value: " →" },
    { name: "Dot", value: "." },
    { name: "Exclamation", value: "!" },
    { name: "Question", value: "?" },
    { name: "Comma", value: "," },
    { name: "Semicolon", value: ";" },
    { name: "Star", value: " ★" },
    { name: "Check", value: " ✓" },
  ];

  const applyPreset = (value: string) => {
    setSuffix(value);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Add a Suffix to Text Lines</CardTitle>
          </div>
          <CardDescription>Add a suffix to the end of each line in your text</CardDescription>
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
            <Label htmlFor="suffix">Suffix to Add:</Label>
            <Input
              id="suffix"
              data-testid="input-suffix"
              placeholder=" →"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Quick Presets:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {presetSuffixes.map((preset) => (
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
            <Label htmlFor="output">Text with Suffix Added to Lines:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with suffix added to lines will appear here..."
            />
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/20 p-3 rounded-lg">
            <p className="text-sm text-teal-700 dark:text-teal-300">
              <strong>Example:</strong> Adding " →" suffix to lines creates arrow-pointed text
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

export default AddSuffixToTextLines;
