import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, SortAsc } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SortLettersInWords() {
  const [inputText, setInputText] = useState<string>('hello world javascript programming typescript react');
  const [preserveCase, setPreserveCase] = useState<boolean>(false);
  const [preserveSpacing, setPreserveSpacing] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const words = inputText.split(/(\s+)/); // Split but preserve whitespace
    
    const sortedWords = words.map(word => {
      // If it's whitespace, return as is
      if (/^\s+$/.test(word)) {
        return preserveSpacing ? word : ' ';
      }
      
      // Sort letters within each word
      const letters = word.split('');
      
      if (preserveCase) {
        // Sort while preserving case
        letters.sort((a, b) => {
          const lowerA = a.toLowerCase();
          const lowerB = b.toLowerCase();
          if (lowerA === lowerB) {
            // If same letter, put lowercase first
            return a < b ? -1 : 1;
          }
          return lowerA.localeCompare(lowerB);
        });
      } else {
        // Simple sort
        letters.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      }
      
      return letters.join('');
    });
    
    setOutput(sortedWords.join(''));
  }, [inputText, preserveCase, preserveSpacing]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with sorted letters copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <SortAsc className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Sort Letters in Words</CardTitle>
          </div>
          <CardDescription>Sort letters alphabetically within each word</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with words to sort letters within..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Letters within each word will be sorted alphabetically
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="preserve-case"
                data-testid="checkbox-preserve-case"
                checked={preserveCase}
                onChange={(e) => setPreserveCase(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="preserve-case">Preserve case order</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="preserve-spacing"
                data-testid="checkbox-preserve-spacing"
                checked={preserveSpacing}
                onChange={(e) => setPreserveSpacing(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="preserve-spacing">Preserve original spacing</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Sorted Letters:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with sorted letters will appear here..."
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

export default SortLettersInWords;