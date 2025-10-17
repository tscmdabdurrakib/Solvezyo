import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Trash2, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveRandomSymbolsFromText() {
  const [inputText, setInputText] = useState<string>('Hello, World! This is a sample text with symbols: @#$%^&*()[]{}.<>?');
  const [symbolsToRemove, setSymbolsToRemove] = useState<string>('.,!?@#$%^&*()[]{}');
  const [removalProbability, setRemovalProbability] = useState<number>(50);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    const symbols = symbolsToRemove || '';
    const probability = Math.max(0, Math.min(100, removalProbability)) / 100;
    
    const processText = (text: string) => {
      return text
        .split('')
        .map(char => {
          // If character is in symbols to remove and random check passes
          if (symbols.includes(char) && Math.random() < probability) {
            return '';
          }
          return char;
        })
        .join('')
        .replace(/\s+/g, ' ') // Clean up multiple spaces
        .trim();
    };

    setOutput(processText(inputText));
  }, [inputText, symbolsToRemove, removalProbability]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with random symbols removed copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const regenerate = () => {
    // Force re-execution by slightly changing the input
    const temp = inputText;
    setInputText(temp + ' ');
    setTimeout(() => setInputText(temp), 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <Trash2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Remove Random Symbols from Text</CardTitle>
          </div>
          <CardDescription>Randomly remove specified symbols from your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with symbols to randomly remove..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="symbols-to-remove">Symbols to Remove:</Label>
              <Input
                id="symbols-to-remove"
                data-testid="input-symbols-to-remove"
                placeholder=".,!?@#$%^&*()"
                value={symbolsToRemove}
                onChange={(e) => setSymbolsToRemove(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="removal-probability">Removal Probability (%):</Label>
              <Input
                id="removal-probability"
                data-testid="input-removal-probability"
                type="number"
                min="0"
                max="100"
                value={removalProbability}
                onChange={(e) => setRemovalProbability(Number(e.target.value))}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Random Symbols Removed:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with random symbols removed will appear here..."
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>Example:</strong> "Hello, World!" with 50% removal → "Hello World" (randomly removes punctuation)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button
              onClick={regenerate}
              data-testid="button-regenerate"
              variant="outline"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
            <Button
              onClick={copyToClipboard}
              data-testid="button-copy"
              disabled={!output}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Result
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RemoveRandomSymbolsFromText;
