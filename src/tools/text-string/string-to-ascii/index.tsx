import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function StringToAscii() {
  const [inputText, setInputText] = useState<string>('Hello World! Welcome to ToolNexas');
  const [output, setOutput] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      setCharCount(0);
      return;
    }
    
    try {
      // Convert string to ASCII values
      const asciiArray = [];
      for (let i = 0; i < inputText.length; i++) {
        const charCode = inputText.charCodeAt(i);
        asciiArray.push(charCode);
      }
      
      setOutput(asciiArray.join(' '));
      setCharCount(inputText.length);
    } catch (error) {
      setOutput('Error converting text to ASCII');
      setCharCount(0);
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "ASCII values copied to clipboard",
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
            <Type className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <CardTitle className="text-2xl">Convert a String to ASCII</CardTitle>
          </div>
          <CardDescription>Convert text characters to ASCII code values</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to convert to ASCII values..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter text to get ASCII character codes
            </p>
          </div>

          <div className="text-center">
            <Card className="p-4 inline-block">
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{charCount}</div>
              <div className="text-sm text-muted-foreground">Characters</div>
            </Card>
          </div>

          <div>
            <Label htmlFor="output">ASCII Values:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="ASCII values will appear here..."
            />
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy ASCII Values
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StringToAscii;
