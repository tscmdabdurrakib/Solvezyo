import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Replace } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ReplaceCommasInText() {
  const [inputText, setInputText] = useState<string>('apple, banana, cherry, date, elderberry');
  const [replacement, setReplacement] = useState<string>(' | ');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const result = inputText.replace(/,/g, replacement);
    setOutput(result);
  }, [inputText, replacement]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Modified text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="flex items-center justify-center gap-2">
            <Replace className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Replace Commas in Text</CardTitle>
          </div>
          <CardDescription>Replace all commas with your custom character or text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="replacement">Replace Commas With:</Label>
            <Input
              id="replacement"
              type="text"
              placeholder="Enter replacement character..."
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="input-text">Input Text (With Commas):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with commas..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Output (Modified Text):</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Modified text will appear here..."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>Example:</strong> Replace "," with " | " → "a, b, c" becomes "a | b | c"
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

export default ReplaceCommasInText;
