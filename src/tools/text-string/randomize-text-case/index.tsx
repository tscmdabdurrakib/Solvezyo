import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RandomizeTextCase() {
  const [inputText, setInputText] = useState<string>('Randomize text case tool\nCreates random uppercase and lowercase letters\nPerfect for creating unique text styles');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const randomizeCase = (text: string): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
    });
  };

  const generateRandomizedText = () => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const randomizedText = randomizeCase(inputText);
    setOutput(randomizedText);
  };

  useEffect(() => {
    generateRandomizedText();
  }, [inputText]);

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
            <CardTitle className="text-2xl">Randomize Text Case</CardTitle>
          </div>
          <CardDescription>Randomly mix uppercase and lowercase letters</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Randomized Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Randomized text will appear here..."
            />
          </div>

          <div className="bg-pink-50 dark:bg-pink-950/20 p-3 rounded-lg">
            <p className="text-sm text-pink-700 dark:text-pink-300">
              <strong>Example:</strong> Convert "Hello World" to "hElLo WoRlD" - each letter is randomly capitalized!
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={generateRandomizedText}
              data-testid="button-randomize"
              className="flex-1"
              disabled={!inputText}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Randomize Again
            </Button>
            <Button
              onClick={copyToClipboard}
              data-testid="button-copy"
              className="flex-1"
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

export default RandomizeTextCase;