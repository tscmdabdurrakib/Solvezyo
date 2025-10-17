import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function UrlDecodeText() {
  const [inputText, setInputText] = useState<string>('Hello%20World!%20This%20is%20a%20test%20%26%20demo.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    try {
      const decoded = decodeURIComponent(inputText);
      setOutput(decoded);
    } catch (err) {
      setOutput('Error decoding text - invalid URL encoding');
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "URL-decoded text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <Link className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">URL-decode Text</CardTitle>
          </div>
          <CardDescription>Decode URL-encoded text to readable format</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">URL-encoded Input:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter URL-encoded text to decode..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono text-sm"
            />
          </div>

          <div>
            <Label htmlFor="output">Decoded Output:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Decoded text will appear here..."
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Example:</strong> "Hello%20World%21" becomes "Hello World!" - Decode URL parameters and query strings!
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

export default UrlDecodeText;
