import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddSuffixString() {
  const [inputText, setInputText] = useState<string>('Hello World\nWelcome to ToolNexas\nProfessional Tools');
  const [suffix, setSuffix] = useState<string>(' <<<');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const lines = inputText.split('\n');
    const suffixedLines = lines.map(line => line + suffix);
    setOutput(suffixedLines.join('\n'));
  }, [inputText, suffix]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with suffix copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Add a Suffix to a String</CardTitle>
          </div>
          <CardDescription>Add a suffix to the end of each line of your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="suffix-input">Suffix Text:</Label>
            <Input
              id="suffix-input"
              data-testid="suffix-input"
              placeholder="Enter suffix..."
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This text will be added to the end of each line
            </p>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to add suffix to..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Suffix:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with suffix will appear here..."
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

export default AddSuffixString;
