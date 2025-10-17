import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function BinaryToString() {
  const [inputText, setInputText] = useState<string>('01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100 00100001');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }
    
    try {
      // Parse binary values (space-separated or continuous)
      const binaryValues = inputText.trim().split(/\s+/).filter(b => /^[01]+$/.test(b));
      const bytes = binaryValues.map(b => parseInt(b, 2)).filter(b => !isNaN(b) && b >= 0 && b <= 255);
      
      if (bytes.length > 0) {
        const uint8Array = new Uint8Array(bytes);
        const result = new TextDecoder('utf-8').decode(uint8Array);
        setOutput(result);
      } else {
        setOutput('Invalid binary input');
      }
    } catch (error) {
      setOutput('Error converting binary to string');
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-zinc-50 to-stone-50 dark:from-zinc-950/20 dark:to-stone-950/20">
          <div className="flex items-center justify-center gap-2">
            <FileCode className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
            <CardTitle className="text-2xl">Convert Binary to a String</CardTitle>
          </div>
          <CardDescription>Convert binary representation back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Binary:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter binary values separated by spaces (e.g., 01001000 01100101 01101100 01101100 01101111)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter binary values (8-bit) separated by spaces
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

export default BinaryToString;
