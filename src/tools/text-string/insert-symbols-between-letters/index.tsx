import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function InsertSymbolsBetweenLetters() {
  const [inputText, setInputText] = useState<string>('Hello World');
  const [symbol, setSymbol] = useState<string>('-');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into characters and insert symbols between letters
    const chars = inputText.split('');
    let result = '';
    
    for (let i = 0; i < chars.length; i++) {
      result += chars[i];
      
      // Add symbol between letters (not spaces or punctuation)
      if (i < chars.length - 1) {
        const currentChar = chars[i];
        const nextChar = chars[i + 1];
        
        // Check if both current and next characters are letters
        const isCurrentLetter = /[a-zA-Z]/.test(currentChar);
        const isNextLetter = /[a-zA-Z]/.test(nextChar);
        
        if (isCurrentLetter && isNextLetter) {
          result += symbol;
        }
      }
    }
    
    setOutput(result);
  }, [inputText, symbol]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with inserted symbols copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Insert Symbols Between Letters</CardTitle>
          </div>
          <CardDescription>Insert custom symbols between letters in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to insert symbols between letters..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="symbol">Symbol to Insert:</Label>
            <Input
              id="symbol"
              data-testid="input-symbol"
              placeholder="e.g., -, *, |, ~"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Inserted Symbols:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with symbols inserted between letters will appear here..."
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>Example:</strong> Insert "-" between letters in "Hello World" → "H-e-l-l-o W-o-r-l-d"
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

export default InsertSymbolsBetweenLetters;
