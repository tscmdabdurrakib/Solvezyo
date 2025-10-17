import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function DecrementLetters() {
  const [inputText, setInputText] = useState<string>('Hello World');
  const [shift, setShift] = useState<number>(1);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const decrementLetter = (char: string, shiftAmount: number): string => {
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? 65 : 97; // 'A' or 'a'
      const charCode = char.charCodeAt(0);
      
      if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        const position = charCode - base;
        const newPosition = (position - shiftAmount) % 26;
        const finalPosition = newPosition < 0 ? newPosition + 26 : newPosition;
        return String.fromCharCode(base + finalPosition);
      }
      
      return char;
    };

    const result = inputText
      .split('')
      .map(char => decrementLetter(char, shift))
      .join('');
    
    setOutput(result);
  }, [inputText, shift]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Decremented text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20">
          <div className="flex items-center justify-center gap-2">
            <ChevronDown className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <CardTitle className="text-2xl">Decrement Letters in Text</CardTitle>
          </div>
          <CardDescription>Shift letters backward in the alphabet (Reverse Caesar cipher)</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="shift-amount">Shift Amount:</Label>
            <Input
              id="shift-amount"
              type="number"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value) || 0)}
              className="mt-2"
              min="-25"
              max="25"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter a number (e.g., 1 shifts B→A, 2 shifts C→A)
            </p>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to decrement..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Output (Decremented):</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Decremented text will appear here..."
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/20 p-3 rounded-lg">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Example:</strong> "BCD" with shift 1 → "ABC" (each letter shifted backward)
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

export default DecrementLetters;
