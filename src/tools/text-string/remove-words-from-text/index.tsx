import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveWordsFromText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. This is a sample text with words to remove.');
  const [wordsToRemove, setWordsToRemove] = useState<string>('the, is, a');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (!wordsToRemove.trim()) {
      setOutput(inputText);
      return;
    }
    
    // Parse words to remove
    const wordsArray = wordsToRemove
      .split(',')
      .map(word => word.trim())
      .filter(word => word.length > 0);
    
    if (wordsArray.length === 0) {
      setOutput(inputText);
      return;
    }
    
    // Remove words from text
    let result = inputText;
    
    wordsArray.forEach(wordToRemove => {
      const flags = caseSensitive ? 'g' : 'gi';
      // Use word boundaries to match whole words only
      const regex = new RegExp(`\\b${wordToRemove.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\b`, flags);
      result = result.replace(regex, '');
    });
    
    // Clean up multiple spaces and trim
    result = result.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    
    setOutput(result);
  }, [inputText, wordsToRemove, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with removed words copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Remove Words from Text</CardTitle>
          </div>
          <CardDescription>Remove specific words from your text with customizable options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to remove words from..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="words-to-remove">Words to Remove (comma-separated):</Label>
              <Input
                id="words-to-remove"
                data-testid="input-words-to-remove"
                placeholder="word1, word2, word3"
                value={wordsToRemove}
                onChange={(e) => setWordsToRemove(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="case-sensitive"
                data-testid="checkbox-case-sensitive"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="case-sensitive">Case sensitive</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Words Removed:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with removed words will appear here..."
            />
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>Example:</strong> Remove "the, is" from "The cat is sleeping" → "cat sleeping"
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

export default RemoveWordsFromText;
