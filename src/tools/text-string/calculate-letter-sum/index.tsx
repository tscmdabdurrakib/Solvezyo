import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CalculateLetterSum() {
  const [inputText, setInputText] = useState<string>('Hello World');
  const [method, setMethod] = useState<string>('ascii');
  const [output, setOutput] = useState<string>('');
  const [breakdown, setBreakdown] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      setBreakdown('');
      return;
    }

    let sum = 0;
    let breakdownText = '';

    if (method === 'ascii') {
      const values: number[] = [];
      for (let char of inputText) {
        const value = char.charCodeAt(0);
        values.push(value);
        sum += value;
      }
      setOutput(sum.toString());
      breakdownText = inputText.split('').map((char, index) => 
        `'${char}' = ${char.charCodeAt(0)}`
      ).join('\n') + `\n\nTotal Sum: ${sum}`;
    } else if (method === 'alphabetical') {
      const values: number[] = [];
      for (let char of inputText.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
          const value = char.charCodeAt(0) - 96; // a=1, b=2, etc.
          values.push(value);
          sum += value;
        }
      }
      setOutput(sum.toString());
      breakdownText = inputText.split('').map(char => {
        const lowerChar = char.toLowerCase();
        if (lowerChar >= 'a' && lowerChar <= 'z') {
          return `'${char}' = ${lowerChar.charCodeAt(0) - 96}`;
        }
        return `'${char}' = 0 (non-alphabetic)`;
      }).join('\n') + `\n\nTotal Sum: ${sum}`;
    } else if (method === 'unicode') {
      const values: number[] = [];
      for (let char of inputText) {
        const value = char.codePointAt(0) || 0;
        values.push(value);
        sum += value;
      }
      setOutput(sum.toString());
      breakdownText = inputText.split('').map(char => 
        `'${char}' = ${char.codePointAt(0) || 0}`
      ).join('\n') + `\n\nTotal Sum: ${sum}`;
    }

    setBreakdown(breakdownText);
  }, [inputText, method]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Letter sum calculation copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const copyBreakdown = async () => {
    if (!breakdown) return;
    
    try {
      await navigator.clipboard.writeText(breakdown);
      toast({
        title: "Copied!",
        description: "Detailed breakdown copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Calculator className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Calculate Letter Sum</CardTitle>
          </div>
          <CardDescription>Calculate the sum of letter values in your text using different methods</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to calculate letter sum..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-24 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="method">Calculation Method:</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ascii">ASCII Values</SelectItem>
                <SelectItem value="alphabetical">Alphabetical Position (A=1, B=2, etc.)</SelectItem>
                <SelectItem value="unicode">Unicode Code Points</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="output">Letter Sum Result:</Label>
            <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-md border">
              <div className="text-2xl font-bold text-center" data-testid="output-result">
                {output || '0'}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="breakdown">Detailed Breakdown:</Label>
            <Textarea
              id="breakdown"
              data-testid="breakdown-result"
              value={breakdown}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Detailed breakdown will appear here..."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>Methods:</strong><br />
              • ASCII: Uses ASCII character codes (A=65, B=66, etc.)<br />
              • Alphabetical: Uses letter positions (A=1, B=2, etc., ignores non-letters)<br />
              • Unicode: Uses Unicode code points (supports all characters)
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={copyToClipboard}
              data-testid="button-copy"
              className="flex-1"
              disabled={!output}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Sum
            </Button>
            <Button
              onClick={copyBreakdown}
              variant="outline"
              className="flex-1"
              disabled={!breakdown}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Breakdown
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CalculateLetterSum;