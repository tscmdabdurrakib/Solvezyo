import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveAllEmptyLines() {
  const [inputText, setInputText] = useState<string>('Line 1\n\nLine 2\n\n\nLine 3\n\nLine 4\n\n');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into lines and filter out empty lines
    const lines = inputText.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim().length > 0);
    
    setOutput(nonEmptyLines.join('\n'));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with empty lines removed copied to clipboard",
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

  const getEmptyLineCount = (text: string) => {
    if (!text) return 0;
    return text.split('\n').filter(line => line.trim().length === 0).length;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <Filter className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Remove All Empty Lines</CardTitle>
          </div>
          <CardDescription>Remove all empty lines from your text content</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with empty lines to remove..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-40 mt-2"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Original Lines</p>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{getLineCount(inputText)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Empty Lines</p>
              <p className="text-lg font-semibold text-red-600 dark:text-red-400">{getEmptyLineCount(inputText)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Result Lines</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">{getLineCount(output)}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Empty Lines Removed:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-40 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with empty lines removed will appear here..."
            />
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg">
            <p className="text-sm text-cyan-700 dark:text-cyan-300">
              <strong>Example:</strong> "Line 1\n\nLine 2\n\nLine 3" → "Line 1\nLine 2\nLine 3"
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

export default RemoveAllEmptyLines;
