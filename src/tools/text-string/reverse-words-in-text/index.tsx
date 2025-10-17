import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ReverseWordsInText() {
  const [inputText, setInputText] = useState<string>('Hello world! This is a sample text with multiple words to demonstrate the reverse words functionality.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into lines and process each line
    const lines = inputText.split('\n');
    const processedLines = lines.map(line => {
      if (line.trim() === '') return line;
      
      // Split by words but preserve punctuation with words
      const words = line.split(/(\s+)/);
      const reversedWords = words.map(segment => {
        // If it's a whitespace segment, keep it as is
        if (/^\s+$/.test(segment)) return segment;
        
        // If it's a word (possibly with punctuation), reverse just the word part
        return segment.split('').reverse().join('');
      });
      
      return reversedWords.join('');
    });
    
    setOutput(processedLines.join('\n'));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with reversed words copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <RotateCcw className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Reverse Words in Text</CardTitle>
          </div>
          <CardDescription>Reverse each individual word while maintaining word positions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with words to reverse..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Reversed Words:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with reversed words will appear here..."
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Example:</strong> "Hello world!" becomes "olleH !dlrow"
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

export default ReverseWordsInText;
