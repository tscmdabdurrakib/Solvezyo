import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function OctalToString() {
  const [inputText, setInputText] = useState<string>('110 145 154 154 157 040 127 157 162 154 144 041');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }
    
    try {
      // Parse octal values (space-separated or continuous)
      const octalValues = inputText.trim().split(/\s+/).filter(o => /^[0-7]+$/.test(o));
      const bytes = octalValues.map(o => parseInt(o, 8)).filter(b => !isNaN(b) && b >= 0 && b <= 255);
      
      if (bytes.length > 0) {
        const uint8Array = new Uint8Array(bytes);
        const result = new TextDecoder('utf-8').decode(uint8Array);
        setOutput(result);
      } else {
        setOutput('Invalid octal input');
      }
    } catch (error) {
      setOutput('Error converting octal to string');
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Convert Octal to a String</CardTitle>
          </div>
          <CardDescription>Convert octal representation back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Octal:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter octal values separated by spaces (e.g., 110 145 154 154 157)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter octal values (0-377) separated by spaces
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

export default OctalToString;
