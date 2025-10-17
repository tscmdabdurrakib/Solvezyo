import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Outdent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function UnindentText() {
  const [inputText, setInputText] = useState<string>('    Line 1\n    Line 2\n        Nested content\n    Line 3');
  const [removeSpaces, setRemoveSpaces] = useState<number>(4);
  const [removeTabs, setRemoveTabs] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const lines = inputText.split('\n');
    const unindentedLines = lines.map(line => {
      if (line.trim() === '') {
        return line; // Keep empty lines as is
      }
      
      let processedLine = line;
      
      // Remove tabs if enabled
      if (removeTabs) {
        processedLine = processedLine.replace(/^\t+/, '');
      }
      
      // Remove specified number of leading spaces
      if (removeSpaces > 0) {
        const spacesToRemove = Math.min(removeSpaces, processedLine.search(/[^ ]/));
        if (spacesToRemove > 0) {
          processedLine = processedLine.substring(spacesToRemove);
        }
      }
      
      return processedLine;
    });
    
    setOutput(unindentedLines.join('\n'));
  }, [inputText, removeSpaces, removeTabs]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Unindented text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-center gap-2">
            <Outdent className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Unindent Text</CardTitle>
          </div>
          <CardDescription>Remove indentation from each line of your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter indented text to unindent..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="remove-spaces">Remove Spaces: {removeSpaces}</Label>
              <Input
                id="remove-spaces"
                data-testid="input-remove-spaces"
                type="number"
                min="0"
                max="20"
                value={removeSpaces}
                onChange={(e) => setRemoveSpaces(parseInt(e.target.value) || 0)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Number of leading spaces to remove</p>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="remove-tabs"
                data-testid="checkbox-remove-tabs"
                checked={removeTabs}
                onChange={(e) => setRemoveTabs(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="remove-tabs">Remove leading tabs</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Unindented Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Unindented text will appear here..."
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

export default UnindentText;
