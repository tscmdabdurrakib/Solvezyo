import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, AlignVerticalSpaceAround } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FixDistanceBetweenParagraphsAndLines() {
  const [inputText, setInputText] = useState<string>('Paragraph one with some text.\n\n\n\nParagraph two with too much spacing.\n\n\n\nParagraph three here.');
  const [lineSpacing, setLineSpacing] = useState<string>('1');
  const [paragraphSpacing, setParagraphSpacing] = useState<string>('2');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const lines = parseInt(lineSpacing) || 1;
    const paragraphs = parseInt(paragraphSpacing) || 2;

    // Split by multiple newlines to identify paragraphs
    const paragraphsArray = inputText.split(/\n\s*\n+/);
    
    // Join paragraphs with specified spacing
    const result = paragraphsArray
      .map(para => para.replace(/\n/g, '\n'.repeat(lines)))
      .join('\n'.repeat(paragraphs));
    
    setOutput(result);
  }, [inputText, lineSpacing, paragraphSpacing]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Formatted text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlignVerticalSpaceAround className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Fix Distance Between Paragraphs and Lines</CardTitle>
          </div>
          <CardDescription>Adjust spacing between lines and paragraphs in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="line-spacing">Lines Between Text (in paragraph):</Label>
              <Input
                id="line-spacing"
                type="number"
                min="1"
                max="10"
                value={lineSpacing}
                onChange={(e) => setLineSpacing(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="paragraph-spacing">Lines Between Paragraphs:</Label>
              <Input
                id="paragraph-spacing"
                type="number"
                min="1"
                max="10"
                value={paragraphSpacing}
                onChange={(e) => setParagraphSpacing(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with paragraphs..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Formatted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Formatted text will appear here..."
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Tip:</strong> Adjust line spacing within paragraphs and spacing between paragraphs independently.
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

export default FixDistanceBetweenParagraphsAndLines;
