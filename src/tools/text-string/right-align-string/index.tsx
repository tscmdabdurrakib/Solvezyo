import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, AlignHorizontalJustifyEnd } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RightAlignString() {
  const [inputText, setInputText] = useState<string>('Hello World\nWelcome\nText');
  const [width, setWidth] = useState<number>(20);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n');
    const alignedLines = lines.map(line => line.padStart(width, ' '));
    setOutput(alignedLines.join('\n'));
  }, [inputText, width]);

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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlignHorizontalJustifyEnd className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Right-align a String</CardTitle>
          </div>
          <CardDescription>Align text to the right with specified width</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (one line per row):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to align..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="width">Alignment Width: {width}</Label>
            <Input
              id="width"
              data-testid="input-width"
              type="number"
              min="1"
              max="200"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value) || 1)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Each line will be padded to this width
            </p>
          </div>

          <div>
            <Label htmlFor="output">Right-aligned Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Aligned text will appear here..."
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

export default RightAlignString;
