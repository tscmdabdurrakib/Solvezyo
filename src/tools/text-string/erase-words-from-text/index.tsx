import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Eraser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function EraseWordsFromText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog\nRemove specific words from your text\nMake your content cleaner');
  const [wordsToRemove, setWordsToRemove] = useState<string>('the, quick');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    if (!wordsToRemove) {
      setOutput(inputText);
      return;
    }

    const wordList = wordsToRemove.split(',').map(w => w.trim().toLowerCase()).filter(w => w);
    const wordSet = new Set(wordList);

    const result = inputText.split(/\s+/).filter(word => {
      return !wordSet.has(word.toLowerCase());
    }).join(' ');

    setOutput(result);
  }, [inputText, wordsToRemove]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with erased words copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Eraser className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Erase Words from Text</CardTitle>
          </div>
          <CardDescription>Remove specific words from your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="words-to-remove">Words to Remove (comma-separated):</Label>
            <Input
              id="words-to-remove"
              data-testid="words-to-remove"
              placeholder="Enter words to remove (e.g., the, quick)"
              value={wordsToRemove}
              onChange={(e) => setWordsToRemove(e.target.value)}
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
              placeholder="Text with words removed will appear here..."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>Example:</strong> Remove words "the, quick" from "The quick brown fox" to get "brown fox"
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

export default EraseWordsFromText;
