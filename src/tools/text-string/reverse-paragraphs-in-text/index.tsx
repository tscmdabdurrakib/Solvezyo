import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, FlipVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ReverseParagraphsInText() {
  const [inputText, setInputText] = useState<string>('This is the first paragraph.\nIt contains multiple lines.\n\nThis is the second paragraph.\nWith its own content.\n\nAnd here is the third paragraph.\nThe final one in this example.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into paragraphs (separated by double newlines)
    const paragraphs = inputText.split('\n\n');
    
    // Filter out empty paragraphs and reverse the order
    const nonEmptyParagraphs = paragraphs.filter(p => p.trim() !== '');
    const reversedParagraphs = nonEmptyParagraphs.reverse();
    
    setOutput(reversedParagraphs.join('\n\n'));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with reversed paragraphs copied to clipboard",
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
            <FlipVertical className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Reverse Paragraphs in Text</CardTitle>
          </div>
          <CardDescription>Reverse the order of paragraphs in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with paragraphs to reverse..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Reversed Paragraphs:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with reversed paragraphs will appear here..."
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>How it works:</strong> Paragraphs are identified by double line breaks (empty lines between them).
            </p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
              The first paragraph becomes the last, the second becomes second-to-last, and so on.
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

export default ReverseParagraphsInText;
