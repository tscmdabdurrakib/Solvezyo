import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ROT47String() {
  const [inputText, setInputText] = useState<string>('Hello World! 123');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const rot47 = (str: string): string => {
      return str.replace(/[!-~]/g, (char) => {
        const code = char.charCodeAt(0);
        return String.fromCharCode(33 + ((code - 33 + 47) % 94));
      });
    };

    setOutput(rot47(inputText));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "ROT47 text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
          <div className="flex items-center justify-center gap-2">
            <Lock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-2xl">ROT47 a String</CardTitle>
          </div>
          <CardDescription>Apply ROT47 cipher to encode/decode ASCII printable characters</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to encode/decode..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              ROT47 encodes all printable ASCII characters including numbers and symbols
            </p>
          </div>

          <div>
            <Label htmlFor="output">ROT47 Result:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="ROT47 text will appear here..."
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

export default ROT47String;
