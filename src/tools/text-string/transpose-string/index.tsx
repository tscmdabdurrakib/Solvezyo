import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function TransposeString() {
  const [inputText, setInputText] = useState<string>('ABC\nDEF\nGHI');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n');
    if (lines.length === 0) {
      setOutput('');
      return;
    }

    const maxLength = Math.max(...lines.map(line => line.length));
    const transposed: string[] = [];

    for (let i = 0; i < maxLength; i++) {
      let row = '';
      for (let j = 0; j < lines.length; j++) {
        row += lines[j][i] || ' ';
      }
      transposed.push(row);
    }

    setOutput(transposed.join('\n'));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Transposed text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <ArrowLeftRight className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Transpose a String</CardTitle>
          </div>
          <CardDescription>Swap rows and columns of your text matrix</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (one row per line):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to transpose..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {inputText.split('\n').length} rows × {Math.max(...inputText.split('\n').map(l => l.length))} columns
            </p>
          </div>

          <div>
            <Label htmlFor="output">Transposed Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Transposed text will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Rows become columns, columns become rows
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

export default TransposeString;
