import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Minimize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveExtraSpaces() {
  const [inputText, setInputText] = useState<string>('This   text   has    extra     spaces');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const result = inputText.replace(/\s+/g, ' ').trim();
    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Cleaned text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
          <div className="flex items-center justify-center gap-2">
            <Minimize2 className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Remove Extra Spaces</CardTitle>
          </div>
          <CardDescription>Remove all extra whitespace and normalize spacing to single spaces</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (With Extra Spaces):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with extra spaces..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Output (Cleaned Text):</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Cleaned text will appear here..."
            />
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>Example:</strong> "a   b    c" → "a b c" (single spaces only)
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

export default RemoveExtraSpaces;
