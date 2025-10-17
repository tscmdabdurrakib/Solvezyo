import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RandomizeLetterCase() {
  const [inputText, setInputText] = useState<string>('Hello World! Welcome to ToolNexas - Professional Tools & Solutions for Developers');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const randomizeCase = (text: string) => {
    return text.split('').map(char => {
      if (char.match(/[a-zA-Z]/)) {
        return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
      }
      return char;
    }).join('');
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    setOutput(randomizeCase(inputText));
  }, [inputText]);

  const regenerateRandom = () => {
    if (inputText) {
      setOutput(randomizeCase(inputText));
    }
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <Shuffle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Randomize Letter Case in a String</CardTitle>
          </div>
          <CardDescription>Randomly convert letters to uppercase or lowercase</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to randomize letter case..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Each letter will be randomly converted to uppercase or lowercase
            </p>
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

          <div className="flex gap-2">
            <Button
              onClick={regenerateRandom}
              data-testid="button-regenerate"
              variant="outline"
              className="flex-1"
              disabled={!inputText}
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Regenerate
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

export default RandomizeLetterCase;
