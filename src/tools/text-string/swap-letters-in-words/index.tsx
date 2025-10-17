import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SwapLettersInWords() {
  const [inputText, setInputText] = useState<string>('Hello world! This is a sample text to demonstrate letter swapping within words.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const processText = (text: string): string => {
      // Split text while preserving whitespace and punctuation
      return text.replace(/\b[a-zA-Z]{2,}\b/g, (word) => {
        return swapLettersInWord(word);
      });
    };

    const swapLettersInWord = (word: string): string => {
      if (word.length < 2) return word;
      
      const letters = word.split('');
      const swapped = [...letters];
      
      // Randomly swap pairs of adjacent letters
      for (let i = 0; i < letters.length - 1; i += 2) {
        // Swap current letter with next letter
        [swapped[i], swapped[i + 1]] = [swapped[i + 1], swapped[i]];
      }
      
      return swapped.join('');
    };
    
    setOutput(processText(inputText));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with swapped letters copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
          <div className="flex items-center justify-center gap-2">
            <Shuffle className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <CardTitle className="text-2xl">Swap Letters in Words</CardTitle>
          </div>
          <CardDescription>Swap adjacent letters within each word to create a scrambled effect</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with words to swap letters..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Swapped Letters:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with swapped letters will appear here..."
            />
          </div>

          <div className="bg-pink-50 dark:bg-pink-950/20 p-3 rounded-lg">
            <p className="text-sm text-pink-700 dark:text-pink-300">
              <strong>How it works:</strong> Adjacent letters in each word are swapped in pairs.
            </p>
            <p className="text-xs text-pink-600 dark:text-pink-400 mt-1">
              Example: "Hello" becomes "eHllo" (H↔e, l↔l, o remains)
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

export default SwapLettersInWords;
