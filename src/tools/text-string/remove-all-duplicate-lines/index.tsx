import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveAllDuplicateLines() {
  const [inputText, setInputText] = useState<string>('Line 1\nLine 2\nLine 1\nLine 3\nLine 2\nLine 4\nLine 1');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into lines
    const lines = inputText.split('\n');
    const uniqueLines: string[] = [];
    const seen = new Set<string>();
    
    for (const line of lines) {
      const keyLine = caseSensitive ? line : line.toLowerCase();
      
      if (!seen.has(keyLine)) {
        seen.add(keyLine);
        uniqueLines.push(line);
      }
    }
    
    setOutput(uniqueLines.join('\n'));
  }, [inputText, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with duplicate lines removed copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const getLineCount = (text: string) => {
    if (!text) return 0;
    return text.split('\n').length;
  };

  const getDuplicateCount = (text: string) => {
    if (!text) return 0;
    const lines = text.split('\n');
    const uniqueLines = new Set(caseSensitive ? lines : lines.map(l => l.toLowerCase()));
    return lines.length - uniqueLines.size;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <Layers className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Remove All Duplicate Lines</CardTitle>
          </div>
          <CardDescription>Remove duplicate lines from your text while preserving order</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with duplicate lines to remove..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-40 mt-2"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="case-sensitive"
              data-testid="checkbox-case-sensitive"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="case-sensitive">Case sensitive comparison</Label>
          </div>

          <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Original Lines</p>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{getLineCount(inputText)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Duplicates</p>
              <p className="text-lg font-semibold text-red-600 dark:text-red-400">{getDuplicateCount(inputText)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Unique Lines</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">{getLineCount(output)}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Duplicate Lines Removed:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-40 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with duplicate lines removed will appear here..."
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Example:</strong> "Line 1\nLine 2\nLine 1\nLine 3" → "Line 1\nLine 2\nLine 3"
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

export default RemoveAllDuplicateLines;
