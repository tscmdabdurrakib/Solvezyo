import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RotateString() {
  const [inputText, setInputText] = useState<string>('Hello World');
  const [rotationAmount, setRotationAmount] = useState<number>(3);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const rotate = (str: string, amount: number): string => {
      if (str.length === 0) return str;
      
      const normalizedAmount = ((amount % str.length) + str.length) % str.length;
      return str.slice(-normalizedAmount) + str.slice(0, -normalizedAmount);
    };

    const result = rotate(inputText, rotationAmount);
    setOutput(result);
  }, [inputText, rotationAmount]);

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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <RotateCw className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <CardTitle className="text-2xl">Rotate a String</CardTitle>
          </div>
          <CardDescription>Shift characters in your text by specified positions</CardDescription>
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
              className="min-h-24 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {inputText.length} characters
            </p>
          </div>

          <div>
            <Label htmlFor="rotation-amount">Rotation Amount: {rotationAmount}</Label>
            <Input
              id="rotation-amount"
              data-testid="input-rotation-amount"
              type="number"
              value={rotationAmount}
              onChange={(e) => setRotationAmount(parseInt(e.target.value) || 0)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Positive: rotate right, Negative: rotate left
            </p>
          </div>

          <div>
            <Label htmlFor="output">Rotated Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-24 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Rotated text will appear here..."
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

export default RotateString;
