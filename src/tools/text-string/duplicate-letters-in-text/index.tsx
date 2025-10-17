import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Copy as CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function DuplicateLettersInText() {
  const [inputText, setInputText] = useState<string>('Duplicate letters in text!\nCreate emphasis\nStylish effects');
  const [output, setOutput] = useState<string>('');
  const [duplicateCount, setDuplicateCount] = useState<number>(2);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const count = Math.max(1, Math.min(10, duplicateCount)); // Limit between 1-10

    const duplicatedText = inputText.replace(/[a-zA-Z]/g, (char) => {
      return char.repeat(count);
    });

    setOutput(duplicatedText);
  }, [inputText, duplicateCount]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Duplicated text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <CopyIcon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-2xl">Duplicate Letters in Text</CardTitle>
          </div>
          <CardDescription>Repeat each letter multiple times for stylish effects</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="duplicate-count">Duplication Count (1-10):</Label>
            <Input
              id="duplicate-count"
              data-testid="duplicate-count"
              type="number"
              min="1"
              max="10"
              placeholder="2"
              value={duplicateCount}
              onChange={(e) => setDuplicateCount(parseInt(e.target.value) || 2)}
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
            <Label htmlFor="output">Duplicated Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Duplicated text will appear here..."
            />
          </div>

          <div className="bg-violet-50 dark:bg-violet-950/20 p-3 rounded-lg">
            <p className="text-sm text-violet-700 dark:text-violet-300">
              <strong>Example:</strong> "Hello" with count 2 → "HHeelllloo" | count 3 → "HHHeeellllllooo"
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

export default DuplicateLettersInText;
