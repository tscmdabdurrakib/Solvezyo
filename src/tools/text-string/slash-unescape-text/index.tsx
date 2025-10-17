import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Slash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SlashUnescapeText() {
  const [inputText, setInputText] = useState<string>('Hello\\nWorld\\t\\u0048\\x65\\x78');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    try {
      // Unescape the text
      let unescaped = inputText
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\r/g, '\r')
        .replace(/\\b/g, '\b')
        .replace(/\\f/g, '\f')
        .replace(/\\v/g, '\v')
        .replace(/\\0/g, '\0')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/\\u\{([0-9A-Fa-f]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));

      setOutput(unescaped);
    } catch (error) {
      setOutput('Error: Invalid escape sequence');
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Unescaped text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <Slash className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Slash Unescape Text</CardTitle>
          </div>
          <CardDescription>Convert escaped characters back to their original form</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Escaped Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter escaped text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="output">Unescaped Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Unescaped text will appear here..."
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>Supports:</strong> \n (newline), \t (tab), \r (carriage return), \\ (backslash), \' (quote), \" (double quote), \xHH (hex), \uHHHH (unicode)
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

export default SlashUnescapeText;
