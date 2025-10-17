import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RandomizeTextSpacing() {
  const [inputText, setInputText] = useState<string>('Add random spacing to this text');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const words = inputText.split(/\s+/).filter(word => word);
    const result = words.map((word, index) => {
      if (index === words.length - 1) return word;
      const randomSpaces = ' '.repeat(Math.floor(Math.random() * 5) + 1);
      return word + randomSpaces;
    }).join('');
    
    setOutput(result);
  }, [inputText]);

  const regenerate = () => {
    setInputText(inputText + ' '); // Trigger re-render with different random values
    setTimeout(() => setInputText(inputText.trim()), 0);
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Randomized text copied to clipboard",
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
            <CardTitle className="text-2xl">Randomize Text Spacing</CardTitle>
          </div>
          <CardDescription>Add random spacing between words for creative effects</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to randomize spacing..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Output (Random Spacing):</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with random spacing will appear here..."
            />
          </div>

          <div className="bg-pink-50 dark:bg-pink-950/20 p-3 rounded-lg">
            <p className="text-sm text-pink-700 dark:text-pink-300">
              <strong>Example:</strong> "a b c" → "a  b    c" (1-5 random spaces between words)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={regenerate}
              variant="outline"
              className="w-full"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
            <Button
              onClick={copyToClipboard}
              data-testid="button-copy"
              className="w-full"
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

export default RandomizeTextSpacing;
