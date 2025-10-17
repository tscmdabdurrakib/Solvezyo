import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, AlignLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function LeftAlignText() {
  const [inputText, setInputText] = useState<string>('Hello World!\nThis is a sample text\nfor left alignment');
  const [lineWidth, setLineWidth] = useState<number>(30);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const lines = inputText.split('\n');
    const alignedLines = lines.map(line => {
      // Trim and then pad to the right to achieve left alignment
      const trimmedLine = line.trim();
      return trimmedLine.padEnd(lineWidth, ' ');
    });
    
    setOutput(alignedLines.join('\n'));
  }, [inputText, lineWidth]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Left-aligned text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlignLeft className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Left-align Text</CardTitle>
          </div>
          <CardDescription>Align text to the left with consistent line width</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to left-align..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="line-width">Line Width: {lineWidth}</Label>
            <Input
              id="line-width"
              data-testid="input-line-width"
              type="number"
              min="1"
              max="200"
              value={lineWidth}
              onChange={(e) => setLineWidth(parseInt(e.target.value) || 1)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">Characters per line</p>
          </div>

          <div>
            <Label htmlFor="output">Left-aligned Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Left-aligned text will appear here..."
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

export default LeftAlignText;
