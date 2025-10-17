import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveSuffixFromWords() {
  const [inputText, setInputText] = useState<string>('apple-suffix banana-suffix cherry-suffix date-suffix');
  const [suffix, setSuffix] = useState<string>('-suffix');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (!suffix.trim()) {
      setOutput(inputText);
      return;
    }
    
    // Split text into words
    const words = inputText.split(/(\s+)/); // Keep whitespace
    
    // Remove suffix from each word
    const processedWords = words.map(word => {
      if (/\s/.test(word)) return word; // Keep whitespace as is
      
      const suffixToMatch = caseSensitive ? suffix : suffix.toLowerCase();
      const wordToCheck = caseSensitive ? word : word.toLowerCase();
      
      if (wordToCheck.endsWith(suffixToMatch)) {
        return word.substring(0, word.length - suffix.length);
      }
      
      return word;
    });
    
    setOutput(processedWords.join(''));
  }, [inputText, suffix, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with removed suffixes copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <Scissors className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Remove Suffix from Words</CardTitle>
          </div>
          <CardDescription>Remove a specified suffix from all words in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with words containing suffixes..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="suffix">Suffix to Remove:</Label>
              <Input
                id="suffix"
                data-testid="input-suffix"
                placeholder="e.g., -suffix, -ing, -ed"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
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
            <Label htmlFor="output">Text with Suffixes Removed:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with removed suffixes will appear here..."
            />
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Example:</strong> Remove "-ing" from "running walking jumping" → "runn walk jump"
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

export default RemoveSuffixFromWords;
