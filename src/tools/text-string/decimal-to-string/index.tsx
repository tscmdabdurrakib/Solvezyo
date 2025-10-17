import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function DecimalToString() {
  const [inputText, setInputText] = useState<string>('72 101 108 108 111 32 87 111 114 108 100 33');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }
    
    try {
      // Parse decimal values (space-separated)
      const decimalValues = inputText.trim().split(/\s+/).map(d => parseInt(d, 10)).filter(d => !isNaN(d) && d >= 0 && d <= 255);
      
      if (decimalValues.length > 0) {
        const uint8Array = new Uint8Array(decimalValues);
        const result = new TextDecoder('utf-8').decode(uint8Array);
        setOutput(result);
      } else {
        setOutput('Invalid decimal input');
      }
    } catch (error) {
      setOutput('Error converting decimal to string');
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Converted string copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <div className="flex items-center justify-center gap-2">
            <Calculator className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Convert Decimal to a String</CardTitle>
          </div>
          <CardDescription>Convert decimal representation back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Decimal:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter decimal values separated by spaces (e.g., 72 101 108 108 111)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter decimal values (0-255) separated by spaces
            </p>
          </div>

          <div>
            <Label htmlFor="output">Converted String:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Converted text will appear here..."
            />
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Converted String
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default DecimalToString;
