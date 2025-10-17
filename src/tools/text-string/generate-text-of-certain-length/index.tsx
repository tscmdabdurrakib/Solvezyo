import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function GenerateTextOfCertainLength() {
  const [length, setLength] = useState<number>(100);
  const [fillChar, setFillChar] = useState<string>('A');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const generateText = () => {
    if (length <= 0 || length > 1000000) {
      toast({
        title: "Invalid length",
        description: "Please enter a length between 1 and 1,000,000",
        variant: "destructive",
      });
      return;
    }

    const char = fillChar.length > 0 ? fillChar[0] : 'A';
    const result = char.repeat(length);
    setOutput(result);
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Generated text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Generate Text of Certain Length</CardTitle>
          </div>
          <CardDescription>Generate text of a specific length using a repeating character</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="length">Text Length:</Label>
              <Input
                id="length"
                type="number"
                min="1"
                max="1000000"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value) || 0)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="fill-char">Fill Character:</Label>
              <Input
                id="fill-char"
                type="text"
                maxLength={1}
                value={fillChar}
                onChange={(e) => setFillChar(e.target.value)}
                className="mt-2"
                placeholder="A"
              />
            </div>
          </div>

          <Button
            onClick={generateText}
            className="w-full"
          >
            Generate Text
          </Button>

          <div>
            <Label htmlFor="output">Generated Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Generated text will appear here..."
            />
            {output && (
              <p className="text-sm text-muted-foreground mt-2">
                Length: {output.length} characters
              </p>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Tip:</strong> Useful for testing, creating placeholders, or generating dummy data.
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

export default GenerateTextOfCertainLength;
