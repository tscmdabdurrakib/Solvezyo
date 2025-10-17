import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function TruncateString() {
  const [inputText, setInputText] = useState<string>('This is a very long text that needs to be truncated for display purposes.');
  const [maxLength, setMaxLength] = useState<number>(30);
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

    const truncated = inputText.slice(0, maxLength);
    setOutput(addEllipsis ? truncated + '...' : truncated);
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-center gap-2">
            <Scissors className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Truncate a String</CardTitle>
          </div>
          <CardDescription>Shorten text to a specified length with optional ellipsis</CardDescription>
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
            <p className="text-xs text-muted-foreground mt-1">
              Current length: {inputText.length} characters
            </p>
          </div>

          <div>
            <Label htmlFor="max-length">Maximum Length: {maxLength}</Label>
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="add-ellipsis"
              data-testid="checkbox-add-ellipsis"
              checked={addEllipsis}
              onCheckedChange={(checked) => setAddEllipsis(checked as boolean)}
            />
            <Label htmlFor="add-ellipsis" className="text-sm cursor-pointer">
              Add Ellipsis (...) at the end
            </Label>
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

export default TruncateString;
