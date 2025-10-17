import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Copy, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ExtractSubstring() {
  const [inputText, setInputText] = useState<string>('Hello World! This is a sample text for substring extraction.');
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(11);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    extractSubstring();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, startIndex, endIndex]);

  const extractSubstring = () => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const textLength = inputText.length;
    const safeStart = Math.max(0, Math.min(startIndex, textLength));
    const safeEnd = Math.max(safeStart, Math.min(endIndex, textLength));
    
    const substring = inputText.substring(safeStart, safeEnd);
    setOutput(substring);
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Substring copied to clipboard",
      });
    }
  };

  const handleReset = () => {
    setStartIndex(0);
    setEndIndex(inputText.length || 10);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle>Extract Substring</CardTitle>
          </div>
          <CardDescription>Extract a portion of text using start and end indices</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Input Text */}
          <div className="space-y-2">
            <Label htmlFor="input">Input Text:</Label>
            <Textarea
              id="input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
              className="min-h-[120px]"
              data-testid="input-text"
            />
            {inputText && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Text length: {inputText.length} characters
              </p>
            )}
          </div>

          {/* Index Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start Index:</Label>
              <Input
                id="start"
                type="number"
                min="0"
                max={inputText.length}
                value={startIndex}
                onChange={(e) => setStartIndex(Number(e.target.value))}
                data-testid="input-start-index"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End Index:</Label>
              <Input
                id="end"
                type="number"
                min="0"
                max={inputText.length}
                value={endIndex}
                onChange={(e) => setEndIndex(Number(e.target.value))}
                data-testid="input-end-index"
              />
            </div>
          </div>

          {/* Visual Range Indicator */}
          {inputText && (
            <div className="space-y-2">
              <Label>Range Preview:</Label>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md font-mono text-sm break-all">
                <span className="text-gray-400">{inputText.substring(0, startIndex)}</span>
                <span className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-1">
                  {inputText.substring(startIndex, endIndex)}
                </span>
                <span className="text-gray-400">{inputText.substring(endIndex)}</span>
              </div>
            </div>
          )}

          {/* Output */}
          <div className="space-y-2">
            <Label>Extracted Substring:</Label>
            <Textarea
              value={output}
              readOnly
              className="font-mono text-sm min-h-[100px] bg-gray-50 dark:bg-gray-900"
              placeholder="Extracted substring will appear here..."
              data-testid="output-substring"
            />
            {output && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Extracted length: {output.length} characters
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1"
              data-testid="button-reset"
            >
              Reset Indices
            </Button>
            <Button
              onClick={copyToClipboard}
              className="flex-1"
              disabled={!output}
              data-testid="button-copy"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Result
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How It Works:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>• Start index: Position where extraction begins (0-based)</p>
          <p>• End index: Position where extraction ends (exclusive)</p>
          <p>• The highlighted preview shows what will be extracted</p>
          <p>• Indices are automatically adjusted if out of range</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExtractSubstring;
