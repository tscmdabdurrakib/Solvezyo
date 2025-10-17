import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Eraser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveAllPunctuation() {
  const [inputText, setInputText] = useState<string>('Hello, World! How are you doing? Great!');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    // Remove all punctuation marks
    const result = inputText.replace(/[^\w\s]|_/g, '');
    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text without punctuation copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20">
          <div className="flex items-center justify-center gap-2">
            <Eraser className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <CardTitle className="text-2xl">Remove All Punctuation</CardTitle>
          </div>
          <CardDescription>Remove all punctuation marks from your text instantly</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (With Punctuation):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with punctuation..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Output (No Punctuation):</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text without punctuation will appear here..."
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/20 p-3 rounded-lg">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Example:</strong> "Hello, World!" → "Hello World" (all punctuation removed)
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

export default RemoveAllPunctuation;
