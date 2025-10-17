import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Copy as CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function DuplicateWordsInText() {
  const [inputText, setInputText] = useState<string>('Hello world! This is a simple text example for demonstration purposes.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into lines and process each line
    const lines = inputText.split('\n');
    const processedLines = lines.map(line => {
      if (line.trim() === '') return line;
      
      // Use regex to find words and replace them with duplicated versions
      return line.replace(/\b[a-zA-Z]+\b/g, (word) => {
        return `${word} ${word}`;
      });
    });
    
    setOutput(processedLines.join('\n'));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with duplicated words copied to clipboard",
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
            <CopyIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-2xl">Duplicate Words in Text</CardTitle>
          </div>
          <CardDescription>Duplicate each word in the text, creating a repeated effect</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with words to duplicate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Duplicated Words:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with duplicated words will appear here..."
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>How it works:</strong> Each word is immediately followed by a duplicate of itself.
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              Example: "Hello world!" becomes "Hello Hello world world!"
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

export default DuplicateWordsInText;
