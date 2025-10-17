import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Highlighter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function HighlightWordsInText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog\nHighlight important words\nMake them visible');
  const [wordsToHighlight, setWordsToHighlight] = useState<string>('quick, fox');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    if (!wordsToHighlight) {
      setOutput(inputText);
      return;
    }

    const wordList = wordsToHighlight.split(',').map(w => w.trim().toLowerCase()).filter(w => w);
    const wordSet = new Set(wordList);

    const result = inputText.split(/\b/).map(segment => {
      if (wordSet.has(segment.toLowerCase())) {
        return `⟪${segment}⟫`;
      }
      return segment;
    }).join('');

    setOutput(result);
  }, [inputText, wordsToHighlight]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with highlighted words copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-center gap-2">
            <Highlighter className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Highlight Words in Text</CardTitle>
          </div>
          <CardDescription>Highlight specific words in your text with brackets</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="words-to-highlight">Words to Highlight (comma-separated):</Label>
            <Input
              id="words-to-highlight"
              data-testid="words-to-highlight"
              placeholder="Enter words to highlight (e.g., quick, fox)"
              value={wordsToHighlight}
              onChange={(e) => setWordsToHighlight(e.target.value)}
              className="mt-2"
            />
          </div>

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
            <Label htmlFor="output">Result:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with highlighted words will appear here..."
            />
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Example:</strong> Highlight words "quick, fox" in "The quick brown fox" to get "The ⟪quick⟫ brown ⟪fox⟫"
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

export default HighlightWordsInText;
