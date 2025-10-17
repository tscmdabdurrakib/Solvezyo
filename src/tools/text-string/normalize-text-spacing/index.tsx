import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, AlignJustify } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function NormalizeTextSpacing() {
  const [inputText, setInputText] = useState<string>('This   has    irregular     spacing');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    // Normalize all whitespace to single spaces and trim
    const result = inputText
      .split('\n')
      .map(line => line.replace(/\s+/g, ' ').trim())
      .join('\n');
    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Normalized text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlignJustify className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Normalize Text Spacing</CardTitle>
          </div>
          <CardDescription>Standardize all spacing to single spaces throughout the text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (Irregular Spacing):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with irregular spacing..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Output (Normalized Spacing):</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Normalized text will appear here..."
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Example:</strong> "a   b    c" → "a b c" (consistent single spacing)
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

export default NormalizeTextSpacing;
