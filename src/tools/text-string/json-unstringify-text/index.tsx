import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Unplug } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function JSONUnstringifyText() {
  const [inputText, setInputText] = useState<string>(`"Hello World!\\nThis is a test.\\nSpecial characters: \\"quotes\\", 'apostrophes', \\\\backslashes\\\\\\nLine breaks and tabs are preserved."`);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    try {
      // JSON.parse the stringified text to unescape characters
      const unstringified = JSON.parse(inputText);
      
      if (typeof unstringified === 'string') {
        setOutput(unstringified);
      } else {
        setOutput(JSON.stringify(unstringified, null, 2));
      }
    } catch (error) {
      setOutput('Error: Invalid JSON string format');
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Unstringified text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <Unplug className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-2xl">JSON Unstringify Text</CardTitle>
          </div>
          <CardDescription>Convert JSON string format back to plain text with unescaped characters</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">JSON String Input:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder='Enter your JSON stringified text here (e.g., "Hello\\nWorld")'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="output">Unstringified Output:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Unstringified text will appear here..."
            />
          </div>

          <div className="bg-violet-50 dark:bg-violet-950/20 p-3 rounded-lg">
            <p className="text-sm text-violet-700 dark:text-violet-300">
              <strong>Example:</strong> <code className="bg-white dark:bg-gray-800 px-1 rounded">"Hello\\nWorld"</code> becomes "Hello\nWorld" - all escaped characters are converted back.
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

export default JSONUnstringifyText;
