import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddSymbolsAroundLetters() {
  const [inputText, setInputText] = useState<string>('Hello World');
  const [leftSymbol, setLeftSymbol] = useState<string>('[');
  const [rightSymbol, setRightSymbol] = useState<string>(']');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into characters and add symbols around letters
    const chars = inputText.split('');
    let result = '';
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      // Check if character is a letter
      if (/[a-zA-Z]/.test(char)) {
        result += leftSymbol + char + rightSymbol;
      } else {
        result += char;
      }
    }
    
    setOutput(result);
  }, [inputText, leftSymbol, rightSymbol]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with symbols around letters copied to clipboard",
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
            <Sparkles className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Add Symbols Around Letters</CardTitle>
          </div>
          <CardDescription>Wrap each letter in your text with custom symbols</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to add symbols around letters..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="left-symbol">Left Symbol:</Label>
              <Input
                id="left-symbol"
                data-testid="input-left-symbol"
                placeholder="e.g., [, (, {, *"
                value={leftSymbol}
                onChange={(e) => setLeftSymbol(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="right-symbol">Right Symbol:</Label>
              <Input
                id="right-symbol"
                data-testid="input-right-symbol"
                placeholder="e.g., ], ), }, *"
                value={rightSymbol}
                onChange={(e) => setRightSymbol(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Symbols Around Letters:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with symbols around letters will appear here..."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>Example:</strong> Add "[]" around letters in "Hello World" → "[H][e][l][l][o] [W][o][r][l][d]"
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

export default AddSymbolsAroundLetters;
