import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, CaseSensitive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertTextToTitleCase() {
  const [inputText, setInputText] = useState<string>('hello world! this is a test.\nwelcome to the title case converter\njavascript programming language');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    // Words that should typically remain lowercase in title case
    const lowercaseWords = new Set([
      'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'
    ]);

    const titleCaseText = inputText.replace(/\w\S*/g, (word, index) => {
      const lowerWord = word.toLowerCase();
      
      // Always capitalize the first word of each sentence
      const isFirstWord = index === 0 || inputText.charAt(index - 1).match(/[.!?]\s*$/);
      
      if (isFirstWord || !lowercaseWords.has(lowerWord)) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      }
      
      return lowerWord;
    });

    setOutput(titleCaseText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Title case text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <CaseSensitive className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Convert Text to Title Case</CardTitle>
          </div>
          <CardDescription>Convert your text to proper title case with smart capitalization rules</CardDescription>
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
            <Label htmlFor="output">Title Case Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Title case text will appear here..."
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Example:</strong> Convert "hello world! this is a test" to "Hello World! This Is a Test"
              <br />
              <span className="text-xs">Smart rules: Articles, conjunctions, and prepositions remain lowercase (except at the beginning)</span>
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

export default ConvertTextToTitleCase;