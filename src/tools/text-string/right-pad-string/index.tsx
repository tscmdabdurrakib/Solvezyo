import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, AlignRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RightPadString() {
  const [inputText, setInputText] = useState<string>('Hello');
  const [targetLength, setTargetLength] = useState<number>(10);
  const [padCharacter, setPadCharacter] = useState<string>('.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const padChar = padCharacter || ' ';
    const result = inputText.padEnd(targetLength, padChar);
    setOutput(result);
  }, [inputText, targetLength, padCharacter]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Padded text copied to clipboard",
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
            <AlignRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Right-pad a String</CardTitle>
          </div>
          <CardDescription>Add padding characters to the right of your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to pad..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-24 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Current length: {inputText.length} characters
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target-length">Target Length: {targetLength}</Label>
              <Input
                id="target-length"
                data-testid="input-target-length"
                type="number"
                min="0"
                max="1000"
                value={targetLength}
                onChange={(e) => setTargetLength(parseInt(e.target.value) || 0)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="pad-char">Padding Character:</Label>
              <Input
                id="pad-char"
                data-testid="input-pad-character"
                maxLength={1}
                value={padCharacter}
                onChange={(e) => setPadCharacter(e.target.value)}
                className="mt-2"
                placeholder="."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="output">Right-padded Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-24 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Padded text will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Result length: {output.length} characters
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

export default RightPadString;
