import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function TruncateText() {
  const [inputText, setInputText] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
  const [maxLength, setMaxLength] = useState<number>(50);
  const [addEllipsis, setAddEllipsis] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (inputText.length <= maxLength) {
      setOutput(inputText);
      return;
    }
    
    let truncated = inputText.substring(0, maxLength);
    if (addEllipsis) {
      truncated += '...';
    }
    setOutput(truncated);
  }, [inputText, maxLength, addEllipsis]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Truncated text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Scissors className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Truncate Text</CardTitle>
          </div>
          <CardDescription>Shorten your text to a specific character limit</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to truncate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max-length">Max Length: {maxLength}</Label>
              <Input
                id="max-length"
                data-testid="input-max-length"
                type="number"
                min="1"
                max="10000"
                value={maxLength}
                onChange={(e) => setMaxLength(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="add-ellipsis"
                data-testid="checkbox-ellipsis"
                checked={addEllipsis}
                onChange={(e) => setAddEllipsis(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="add-ellipsis">Add ellipsis (...)</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Truncated Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Truncated text will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Output length: {output.length} characters
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

export default TruncateText;
