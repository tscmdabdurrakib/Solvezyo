import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, AlignJustify } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function TrimString() {
  const [inputText, setInputText] = useState<string>('   Hello World!   \n   Welcome to Solvezyo   ');
  const [trimMode, setTrimMode] = useState<string>('both');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    let result = inputText;
    switch (trimMode) {
      case 'both':
        result = inputText.trim();
        break;
      case 'start':
        result = inputText.trimStart();
        break;
      case 'end':
        result = inputText.trimEnd();
        break;
      case 'all':
        // Remove all whitespace
        result = inputText.replace(/\s+/g, '');
        break;
      case 'extra':
        // Replace multiple spaces with single space
        result = inputText.replace(/\s+/g, ' ').trim();
        break;
      default:
        result = inputText;
    }
    setOutput(result);
  }, [inputText, trimMode]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Trimmed text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlignJustify className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Trim a String</CardTitle>
          </div>
          <CardDescription>Remove whitespace from text with various trim options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with whitespace..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="trim-mode">Trim Mode:</Label>
            <Select value={trimMode} onValueChange={setTrimMode}>
              <SelectTrigger id="trim-mode" data-testid="select-trim-mode" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">Trim Both Ends</SelectItem>
                <SelectItem value="start">Trim Start Only</SelectItem>
                <SelectItem value="end">Trim End Only</SelectItem>
                <SelectItem value="all">Remove All Whitespace</SelectItem>
                <SelectItem value="extra">Remove Extra Spaces</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {trimMode === 'both' && 'Removes whitespace from both start and end'}
              {trimMode === 'start' && 'Removes whitespace from the start only'}
              {trimMode === 'end' && 'Removes whitespace from the end only'}
              {trimMode === 'all' && 'Removes all whitespace characters'}
              {trimMode === 'extra' && 'Replaces multiple spaces with single space'}
            </p>
          </div>

          <div>
            <Label htmlFor="output">Trimmed Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Trimmed text will appear here..."
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

export default TrimString;
