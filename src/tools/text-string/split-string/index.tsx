import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Split } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SplitString() {
  const [inputText, setInputText] = useState<string>('apple,banana,orange,grape,mango');
  const [delimiter, setDelimiter] = useState<string>(',');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    splitText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, delimiter]);

  const splitText = () => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const del = delimiter || ',';
    const parts = inputText.split(del);
    const result = parts
      .map((part, index) => `${index + 1}. ${part}`)
      .join('\n');
    
    setOutput(`Split into ${parts.length} parts:\n\n${result}`);
  };

  const copyToClipboard = () => {
    if (output) {
      const parts = inputText.split(delimiter || ',');
      navigator.clipboard.writeText(parts.join('\n'));
      toast({
        title: "Copied!",
        description: "Split parts copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <Split className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Split String</CardTitle>
          </div>
          <CardDescription>Split text into parts using a custom delimiter</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to split..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="delimiter">Delimiter:</Label>
            <Input
              id="delimiter"
              data-testid="input-delimiter"
              placeholder="Enter delimiter (e.g., comma, space, |)"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Common delimiters: , (comma), | (pipe), ; (semicolon), \n (newline)
            </p>
          </div>

          <div>
            <Label>Split Result:</Label>
            <div className="mt-2 relative">
              <Textarea
                value={output}
                data-testid="output-result"
                readOnly
                className="min-h-40 bg-gray-50 dark:bg-gray-900"
                placeholder="Split results will appear here..."
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

export default SplitString;
