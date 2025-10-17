import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Columns } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertColumnToComma() {
  const [inputText, setInputText] = useState<string>('apple\nbanana\ncherry\ndate\nelderberry');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    // Split by newlines and join with commas
    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    const converted = lines.join(', ');
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <Columns className="h-6 w-6 text-lime-600 dark:text-lime-400" />
            <CardTitle className="text-2xl">Convert Column to Comma</CardTitle>
          </div>
          <CardDescription>Convert columnar data (one item per line) to comma-separated format</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (Column Format):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter items in column format (one per line)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Comma-Separated Output:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Comma-separated text will appear here..."
            />
          </div>

          <div className="bg-lime-50 dark:bg-lime-950/20 p-3 rounded-lg">
            <p className="text-sm text-lime-700 dark:text-lime-300">
              <strong>Example:</strong> Column format becomes: "apple, banana, cherry, date"
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

export default ConvertColumnToComma;
