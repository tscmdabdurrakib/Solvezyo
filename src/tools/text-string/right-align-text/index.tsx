import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, AlignRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RightAlignText() {
  const [inputText, setInputText] = useState<string>('Hello World!\nThis is a sample text\nfor right alignment');
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
      // Trim and then pad to the left to achieve right alignment
      const trimmedLine = line.trim();
      return trimmedLine.padStart(lineWidth, ' ');
    });
    
    setOutput(alignedLines.join('\n'));
  }, [inputText, lineWidth]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Right-aligned text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlignRight className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <CardTitle className="text-2xl">Right-align Text</CardTitle>
          </div>
          <CardDescription>Align text to the right with consistent line width</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to right-align..."
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
            <Label htmlFor="output">Right-aligned Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Right-aligned text will appear here..."
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

export default RightAlignText;
