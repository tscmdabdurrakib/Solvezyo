import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SliceString() {
  const [inputText, setInputText] = useState<string>('Hello World');
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(5);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const result = inputText.slice(startIndex, endIndex || undefined);
    setOutput(result);
  }, [inputText, startIndex, endIndex]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Sliced text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            <Scissors className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            <CardTitle className="text-2xl">Slice a String</CardTitle>
          </div>
          <CardDescription>Extract a portion of text using start and end indices</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to slice..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-24 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Total length: {inputText.length} characters
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-index">Start Index: {startIndex}</Label>
              <Input
                id="start-index"
                data-testid="input-start-index"
                type="number"
                value={startIndex}
                onChange={(e) => setStartIndex(parseInt(e.target.value) || 0)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                0-based index (negative counts from end)
              </p>
            </div>

            <div>
              <Label htmlFor="end-index">End Index: {endIndex || 'end'}</Label>
              <Input
                id="end-index"
                data-testid="input-end-index"
                type="number"
                value={endIndex}
                onChange={(e) => setEndIndex(parseInt(e.target.value) || 0)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave 0 or empty for end of string
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Sliced Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-24 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Sliced text will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Result length: {output.length} characters
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

export default SliceString;
