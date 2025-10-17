import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function PrintfString() {
  const [formatString, setFormatString] = useState<string>('Hello %s! You have %d new messages.');
  const [variables, setVariables] = useState<string>('John\n5');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    formatOutput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatString, variables]);

  const formatOutput = () => {
    if (!formatString) {
      setOutput('');
      return;
    }

    try {
      const vars = variables.split('\n').filter(v => v.trim());
      let result = formatString;
      let varIndex = 0;

      // Replace %s (string), %d (number), %f (float)
      result = result.replace(/%[sdf]/g, (match) => {
        if (varIndex >= vars.length) return match;
        
        const value = vars[varIndex++];
        
        if (match === '%d') {
          const num = parseInt(value);
          return isNaN(num) ? value : num.toString();
        } else if (match === '%f') {
          const num = parseFloat(value);
          return isNaN(num) ? value : num.toString();
        }
        return value; // %s
      });

      setOutput(result);
    } catch (error) {
      setOutput('Error: Invalid format');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Code2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Printf String</CardTitle>
          </div>
          <CardDescription>Format strings with printf-style placeholders (%s, %d, %f)</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="format-string">Format String:</Label>
            <Textarea
              id="format-string"
              data-testid="input-format-string"
              placeholder="e.g., Hello %s! You have %d messages."
              value={formatString}
              onChange={(e) => setFormatString(e.target.value)}
              className="min-h-24 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use %s for strings, %d for integers, %f for floats
            </p>
          </div>

          <div>
            <Label htmlFor="variables">Variables (one per line):</Label>
            <Textarea
              id="variables"
              data-testid="input-variables"
              placeholder="Enter values (one per line)..."
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
              className="min-h-24 mt-2"
            />
          </div>

          <div>
            <Label>Formatted Output:</Label>
            <div className="mt-2 relative">
              <Textarea
                value={output}
                data-testid="output-result"
                readOnly
                className="min-h-32 bg-gray-50 dark:bg-gray-900 font-mono"
                placeholder="Formatted result will appear here..."
              />
              <Button
                onClick={copyToClipboard}
                data-testid="button-copy"
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2"
                disabled={!output}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PrintfString;
