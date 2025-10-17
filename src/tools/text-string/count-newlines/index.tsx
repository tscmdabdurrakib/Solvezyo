import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CountNewlines() {
  const [inputText, setInputText] = useState<string>('Hello World\nWelcome to ToolNexas\nProfessional Tools\n\nCount Newlines\nIn Your Text\n\nThis tool counts\nAll line breaks\nInstantly!');
  const [output, setOutput] = useState<string>('');
  const [newlineCount, setNewlineCount] = useState<number>(0);
  const [lineCount, setLineCount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      setNewlineCount(0);
      setLineCount(0);
      return;
    }
    
    // Count newline characters
    const newlines = (inputText.match(/\n/g) || []).length;
    // Count total lines (newlines + 1, or 0 if empty)
    const lines = inputText.trim() === '' ? 0 : inputText.split('\n').length;
    
    setNewlineCount(newlines);
    setLineCount(lines);
    setOutput(newlines.toString());
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Newline count copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Count Newlines in a String</CardTitle>
          </div>
          <CardDescription>Count the number of newline characters and total lines in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with newlines..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter text with line breaks to count newline characters
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{newlineCount}</div>
              <div className="text-sm text-muted-foreground">Newline Characters</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{lineCount}</div>
              <div className="text-sm text-muted-foreground">Total Lines</div>
            </Card>
          </div>

          <div>
            <Label htmlFor="output">Newline Count:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-16 mt-2 bg-gray-50 dark:bg-gray-900 font-mono text-center text-2xl font-bold"
              placeholder="0"
            />
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Newline Count
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CountNewlines;
