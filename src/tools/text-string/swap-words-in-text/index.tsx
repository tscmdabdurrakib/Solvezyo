import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SwapWordsInText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. This sentence demonstrates word swapping functionality.');
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
      
      // Split line into words while preserving spaces and punctuation
      const tokens = line.split(/(\s+)/);
      const words = tokens.filter(token => !/^\s*$/.test(token)); // Filter out pure whitespace
      const spaces = tokens.filter(token => /^\s+$/.test(token)); // Get whitespace tokens
      
      // Extract only actual words (not punctuation or whitespace)
      const actualWords: string[] = [];
      const wordPositions: number[] = [];
      
      tokens.forEach((token, index) => {
        if (!/^\s+$/.test(token) && token.trim() !== '') {
          actualWords.push(token);
          wordPositions.push(index);
        }
      });
      
      // Swap adjacent pairs of words
      const swappedWords = [...actualWords];
      for (let i = 0; i < swappedWords.length - 1; i += 2) {
        [swappedWords[i], swappedWords[i + 1]] = [swappedWords[i + 1], swappedWords[i]];
      }
      
      // Reconstruct the line with original spacing
      const result = [...tokens];
      wordPositions.forEach((pos, index) => {
        result[pos] = swappedWords[index];
      });
      
      return result.join('');
    });
    
    setOutput(processedLines.join('\n'));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with swapped words copied to clipboard",
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
            <ArrowRightLeft className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Swap Words in Text</CardTitle>
          </div>
          <CardDescription>Swap adjacent words within each line while preserving spacing</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with words to swap..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Swapped Words:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with swapped words will appear here..."
            />
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/20 p-3 rounded-lg">
            <p className="text-sm text-teal-700 dark:text-teal-300">
              <strong>How it works:</strong> Adjacent words are swapped in pairs within each line.
            </p>
            <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
              Example: "The quick brown fox" becomes "quick The fox brown"
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

export default SwapWordsInText;
