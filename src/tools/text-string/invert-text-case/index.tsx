import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, FlipVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function InvertTextCase() {
  const [inputText, setInputText] = useState<string>('Invert Text Case Tool\nConvert UPPERCASE to lowercase\nAnd lowercase TO UPPERCASE');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const invertCase = (text: string): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      return char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase();
    });
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const invertedText = invertCase(inputText);
    setOutput(invertedText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Inverted text copied to clipboard",
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
            <FlipVertical className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Invert Text Case</CardTitle>
          </div>
          <CardDescription>Flip uppercase to lowercase and vice versa</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Inverted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Inverted text will appear here..."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>Example:</strong> Convert "Hello WORLD" to "hELLO world" - uppercase becomes lowercase and vice versa!
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

export default InvertTextCase;