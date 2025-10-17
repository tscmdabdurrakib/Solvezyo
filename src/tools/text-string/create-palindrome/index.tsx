import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CreatePalindrome() {
  const [inputText, setInputText] = useState<string>('Hello World');
  const [method, setMethod] = useState<string>('append');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }
    
    const cleanText = inputText.trim();
    let result = '';
    
    switch (method) {
      case 'append':
        // Append reverse (excluding the last character to avoid duplication)
        result = cleanText + cleanText.slice(0, -1).split('').reverse().join('');
        break;
      case 'prepend':
        // Prepend reverse (excluding the first character to avoid duplication)
        result = cleanText.slice(1).split('').reverse().join('') + cleanText;
        break;
      case 'mirror':
        // Mirror the text exactly
        result = cleanText + cleanText.split('').reverse().join('');
        break;
      case 'center':
        // Place original text in center with mirrored sides
        const reversed = cleanText.split('').reverse().join('');
        result = reversed + cleanText + reversed;
        break;
      default:
        result = cleanText;
    }
    
    setOutput(result);
  }, [inputText, method]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Palindrome copied to clipboard",
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
            <RotateCcw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Create a Palindrome</CardTitle>
          </div>
          <CardDescription>Generate palindromes from your text using different methods</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="method">Palindrome Method:</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="method" data-testid="select-method" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="append">Append Reverse (text + reverse)</SelectItem>
                <SelectItem value="prepend">Prepend Reverse (reverse + text)</SelectItem>
                <SelectItem value="mirror">Mirror Exactly (text + full reverse)</SelectItem>
                <SelectItem value="center">Center Text (reverse + text + reverse)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Choose how to create the palindrome from your text
            </p>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to create palindrome..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Generated Palindrome:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Generated palindrome will appear here..."
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

export default CreatePalindrome;
