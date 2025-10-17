import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, AlignCenter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CenterString() {
  const [inputText, setInputText] = useState<string>('Welcome\nSolvezyo\nCenter Text');
  const [width, setWidth] = useState<number>(30);
  const [fillChar, setFillChar] = useState<string>(' ');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const fill = fillChar || ' ';
    const lines = inputText.split('\n');
    const centeredLines = lines.map(line => {
      if (line.length >= width) return line;
      
      const totalPadding = width - line.length;
      const leftPadding = Math.floor(totalPadding / 2);
      const rightPadding = totalPadding - leftPadding;
      
      return fill.repeat(leftPadding) + line + fill.repeat(rightPadding);
    });
    setOutput(centeredLines.join('\n'));
  }, [inputText, width, fillChar]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Centered text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlignCenter className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Center a String</CardTitle>
          </div>
          <CardDescription>Center text within specified width with custom fill character</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (one line per row):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to center..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Width: {width}</Label>
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
            </div>

            <div>
              <Label htmlFor="fill-char">Fill Character:</Label>
              <Input
                id="fill-char"
                data-testid="input-fill-character"
                maxLength={1}
                value={fillChar}
                onChange={(e) => setFillChar(e.target.value)}
                className="mt-2"
                placeholder="(space)"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="output">Centered Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Centered text will appear here..."
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

export default CenterString;
