import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Indent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function IndentText() {
  const [inputText, setInputText] = useState<string>('Line 1\nLine 2\nLine 3\nNested content\nMore content');
  const [indentSize, setIndentSize] = useState<number>(2);
  const [useSpaces, setUseSpaces] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const indentChar = useSpaces ? ' '.repeat(indentSize) : '\t'.repeat(indentSize);
    const lines = inputText.split('\n');
    const indentedLines = lines.map(line => {
      if (line.trim() === '') {
        return line; // Keep empty lines as is
      }
      return indentChar + line;
    });
    
    setOutput(indentedLines.join('\n'));
  }, [inputText, indentSize, useSpaces]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Indented text copied to clipboard",
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
            <Indent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Indent Text</CardTitle>
          </div>
          <CardDescription>Add indentation to each line of your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to indent..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="indent-size">Indent Size: {indentSize}</Label>
              <Input
                id="indent-size"
                data-testid="input-indent-size"
                type="number"
                min="1"
                max="20"
                value={indentSize}
                onChange={(e) => setIndentSize(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Label className="mb-2">Indent Type:</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="indentType"
                    checked={useSpaces}
                    onChange={() => setUseSpaces(true)}
                    className="rounded"
                  />
                  <span>Spaces</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="indentType"
                    checked={!useSpaces}
                    onChange={() => setUseSpaces(false)}
                    className="rounded"
                  />
                  <span>Tabs</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Indented Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Indented text will appear here..."
            />
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

export default IndentText;
