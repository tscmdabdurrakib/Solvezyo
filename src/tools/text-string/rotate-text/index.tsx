import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RotateText() {
  const [inputText, setInputText] = useState<string>('Hello World!');
  const [rotateAmount, setRotateAmount] = useState<number>(5);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const rotate = rotateAmount % inputText.length;
    const rotated = inputText.slice(rotate) + inputText.slice(0, rotate);
    setOutput(rotated);
  }, [inputText, rotateAmount]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Rotated text copied to clipboard",
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
            <RotateCw className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Rotate Text</CardTitle>
          </div>
          <CardDescription>Rotate text by moving characters from the beginning to the end</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to rotate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="rotate-amount">Rotate Amount (characters):</Label>
            <Input
              id="rotate-amount"
              type="number"
              value={rotateAmount}
              onChange={(e) => setRotateAmount(parseInt(e.target.value) || 0)}
              className="mt-2"
              placeholder="5"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Positive values rotate right, negative values rotate left
            </p>
          </div>

          <div>
            <Label htmlFor="output">Rotated Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Rotated text will appear here..."
            />
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg">
            <p className="text-sm text-cyan-700 dark:text-cyan-300">
              <strong>Example:</strong> "Hello World!" rotated by 5 becomes "World!Hello " (moves first 5 characters to the end)
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

export default RotateText;
