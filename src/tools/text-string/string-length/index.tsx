import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function StringLength() {
  const [inputText, setInputText] = useState<string>('Hello World! Welcome to ToolNexas - Professional Tools & Solutions for Developers 🚀');
  const [output, setOutput] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [charCountNoSpaces, setCharCountNoSpaces] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [byteCount, setByteCount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      setCharCount(0);
      setCharCountNoSpaces(0);
      setWordCount(0);
      setByteCount(0);
      return;
    }
    
    // Calculate various string metrics
    const length = inputText.length;
    const lengthNoSpaces = inputText.replace(/\s/g, '').length;
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const bytes = new TextEncoder().encode(inputText).length;
    
    setCharCount(length);
    setCharCountNoSpaces(lengthNoSpaces);
    setWordCount(words);
    setByteCount(bytes);
    setOutput(length.toString());
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "String length copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Find the Length of a String</CardTitle>
          </div>
          <CardDescription>Calculate character count, word count, and byte size of your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to measure..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter any text to see detailed length information
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{charCount}</div>
              <div className="text-sm text-muted-foreground">Characters</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{charCountNoSpaces}</div>
              <div className="text-sm text-muted-foreground">No Spaces</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{wordCount}</div>
              <div className="text-sm text-muted-foreground">Words</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{byteCount}</div>
              <div className="text-sm text-muted-foreground">Bytes</div>
            </Card>
          </div>

          <div>
            <Label htmlFor="output">Character Count:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-16 mt-2 bg-gray-50 dark:bg-gray-900 font-mono text-center text-2xl font-bold"
              placeholder="0"
            />
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Character Count
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StringLength;
