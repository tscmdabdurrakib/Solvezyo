import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AsciiToString() {
  const [inputText, setInputText] = useState<string>('72 101 108 108 111 32 87 111 114 108 100 33');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }
    
    try {
      // Parse ASCII values (space-separated)
      const asciiValues = inputText.trim().split(/\s+/).map(a => parseInt(a, 10)).filter(a => !isNaN(a) && a >= 0 && a <= 1114111);
      
      if (asciiValues.length > 0) {
        const result = asciiValues.map(code => String.fromCharCode(code)).join('');
        setOutput(result);
      } else {
        setOutput('Invalid ASCII input');
      }
    } catch (error) {
      setOutput('Error converting ASCII to string');
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <FileText className="h-6 w-6 text-lime-600 dark:text-lime-400" />
            <CardTitle className="text-2xl">Convert ASCII to a String</CardTitle>
          </div>
          <CardDescription>Convert ASCII code values back to readable text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input ASCII Values:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter ASCII values separated by spaces (e.g., 72 101 108 108 111)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter ASCII character codes separated by spaces
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

export default AsciiToString;
