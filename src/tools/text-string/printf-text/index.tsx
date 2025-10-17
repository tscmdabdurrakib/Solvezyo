import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function PrintfText() {
  const [formatString, setFormatString] = useState<string>('Hello %s! You have %d new messages.');
  const [args, setArgs] = useState<string>('John,5');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const formatText = () => {
    try {
      const argArray = args.split(',').map(arg => arg.trim());
      let result = formatString;
      let argIndex = 0;

      // Simple printf-like formatting
      result = result.replace(/%([sdifu%])/g, (match, type) => {
        if (type === '%') return '%';
        if (argIndex >= argArray.length) return match;

        const arg = argArray[argIndex++];

        switch (type) {
          case 's': // string
            return String(arg);
          case 'd': // integer
          case 'i': // integer
            return String(parseInt(arg) || 0);
          case 'f': // float
            return String(parseFloat(arg) || 0);
          case 'u': // unsigned integer
            return String(Math.abs(parseInt(arg) || 0));
          default:
            return match;
        }
      });

      setOutput(result);
    } catch (error) {
      setOutput('Error: Invalid format or arguments');
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Formatted text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
          <div className="flex items-center justify-center gap-2">
            <Code className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <CardTitle className="text-2xl">Printf Text</CardTitle>
          </div>
          <CardDescription>Format text using printf-style placeholders</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="format-string">Format String:</Label>
            <Input
              id="format-string"
              type="text"
              value={formatString}
              onChange={(e) => setFormatString(e.target.value)}
              className="mt-2 font-mono"
              placeholder="Hello %s! You have %d messages."
            />
          </div>

          <div>
            <Label htmlFor="args">Arguments (comma-separated):</Label>
            <Input
              id="args"
              type="text"
              value={args}
              onChange={(e) => setArgs(e.target.value)}
              className="mt-2"
              placeholder="John,5"
            />
          </div>

          <Button
            onClick={formatText}
            className="w-full"
          >
            Format Text
          </Button>

          <div>
            <Label htmlFor="output">Formatted Output:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Formatted text will appear here..."
            />
          </div>

          <div className="bg-pink-50 dark:bg-pink-950/20 p-3 rounded-lg">
            <p className="text-sm text-pink-700 dark:text-pink-300">
              <strong>Format specifiers:</strong> %s (string), %d/%i (integer), %f (float), %u (unsigned int), %% (literal %)
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

export default PrintfText;
