import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Combine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertNewlineToComma() {
  const [inputText, setInputText] = useState<string>('apple\nbanana\ncherry\ndate\nelderberry\nfig\ngrape');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    // Replace all newlines with commas
    const converted = inputText.replace(/\n/g, ',');
    setOutput(converted);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Converted text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <Combine className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            <CardTitle className="text-2xl">Convert Newline to Comma</CardTitle>
          </div>
          <CardDescription>Replace all line breaks with commas in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with newlines..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Converted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Converted text will appear here..."
            />
          </div>

          <div className="bg-sky-50 dark:bg-sky-950/20 p-3 rounded-lg">
            <p className="text-sm text-sky-700 dark:text-sky-300">
              <strong>Example:</strong> Three lines of text become a comma-separated list on one line
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

export default ConvertNewlineToComma;
