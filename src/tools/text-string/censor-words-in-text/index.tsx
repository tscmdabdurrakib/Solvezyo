import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CensorWordsInText() {
  const [inputText, setInputText] = useState<string>('This damn product is bloody amazing!\nWhat the hell is going on here?\nThis is a crap situation.');
  const [wordsToCenter, setWordsToCenter] = useState<string>('damn, hell, crap, bloody');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    let result = inputText;
    
    if (wordsToCenter.trim()) {
      const words = wordsToCenter.split(',').map(w => w.trim()).filter(w => w);
      
      words.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        result = result.replace(regex, (match) => {
          // Replace all characters except first with asterisks
          if (match.length <= 1) return '*';
          return match[0] + '*'.repeat(match.length - 1);
        });
      });
    }

    setOutput(result);
  }, [inputText, wordsToCenter]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Censored text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <EyeOff className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Censor Words in Text</CardTitle>
          </div>
          <CardDescription>Automatically censor specified words in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="words-to-censor">Words to Censor (comma-separated):</Label>
            <Input
              id="words-to-censor"
              placeholder="e.g., word1, word2, word3"
              value={wordsToCenter}
              onChange={(e) => setWordsToCenter(e.target.value)}
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
            <Label htmlFor="output">Censored Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Censored text will appear here..."
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>Example:</strong> "damn" becomes "d***", "hello" becomes "h****" - keeps the first letter visible.
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

export default CensorWordsInText;
