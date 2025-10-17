import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveRandomLettersFromWords() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. This is a sample text with words to modify.');
  const [removalProbability, setRemovalProbability] = useState<number>(20);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    const probability = Math.max(0, Math.min(100, removalProbability)) / 100;
    
    const processText = (text: string) => {
      return text.replace(/\b\w+\b/g, (word) => {
        if (word.length <= 1) return word;
        
        return word
          .split('')
          .map((char, index) => {
            // Always keep the first and last character for readability
            if (index === 0 || index === word.length - 1) {
              return char;
            }
            // Remove letter based on probability
            return Math.random() < probability ? '' : char;
          })
          .join('');
      });
    };

    setOutput(processText(inputText));
  }, [inputText, removalProbability]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with random letters removed copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Shuffle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Remove Random Letters from Words</CardTitle>
          </div>
          <CardDescription>Randomly remove letters from words while preserving readability</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to remove random letters from words..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="removal-probability">Removal Probability (%):</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="removal-probability"
                data-testid="input-removal-probability"
                type="number"
                min="0"
                max="100"
                value={removalProbability}
                onChange={(e) => setRemovalProbability(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">% chance each letter will be removed</span>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Random Letters Removed:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with random letters removed will appear here..."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>Example:</strong> "Hello World" with 30% removal → "Helo Wold" (preserves first/last letters)
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

export default RemoveRandomLettersFromWords;
