import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function HexToString() {
  const [inputText, setInputText] = useState<string>('48 65 6C 6C 6F 20 57 6F 72 6C 64 21');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }
    
    try {
      // Parse hex values (space-separated or continuous)
      const hexValues = inputText.trim().replace(/[^0-9a-fA-F\s]/g, '').split(/\s+/).filter(h => h.length > 0);
      const bytes: number[] = [];
      
      hexValues.forEach(hex => {
        if (hex.length % 2 === 0) {
          for (let i = 0; i < hex.length; i += 2) {
            const byte = parseInt(hex.substr(i, 2), 16);
            if (!isNaN(byte)) {
              bytes.push(byte);
            }
          }
        } else {
          const byte = parseInt(hex, 16);
          if (!isNaN(byte) && byte <= 255) {
            bytes.push(byte);
          }
        }
      });
      
      if (bytes.length > 0) {
        const uint8Array = new Uint8Array(bytes);
        const result = new TextDecoder('utf-8').decode(uint8Array);
        setOutput(result);
      } else {
        setOutput('Invalid hex input');
      }
    } catch (error) {
      setOutput('Error converting hex to string');
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Convert Hex to a String</CardTitle>
          </div>
          <CardDescription>Convert hexadecimal representation back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Hex:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter hex values separated by spaces (e.g., 48 65 6C 6C 6F) or continuous (48656C6C6F)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter hex values (00-FF) separated by spaces or continuous
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

export default HexToString;
