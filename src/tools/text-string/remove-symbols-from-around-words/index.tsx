import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveSymbolsFromAroundWords() {
  const [inputText, setInputText] = useState<string>('[The] [quick] [brown] [fox] jumps over the (lazy) dog.');
  const [leftSymbol, setLeftSymbol] = useState<string>('[');
  const [rightSymbol, setRightSymbol] = useState<string>(']');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    const left = leftSymbol || '';
    const right = rightSymbol || '';
    
    if (!left && !right) {
      setOutput(inputText);
      return;
    }

    let result = inputText;

    // If both symbols are provided, remove pairs
    if (left && right) {
      // Escape special regex characters
      const escapedLeft = left.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
      const escapedRight = right.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
      
      // Remove symbol pairs around words
      const regex = new RegExp(`${escapedLeft}(\\w+)${escapedRight}`, 'g');
      result = result.replace(regex, '$1');
    } else {
      // If only one symbol is provided, remove all instances
      const symbolToRemove = left || right;
      const escaped = symbolToRemove.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
      const regex = new RegExp(escaped, 'g');
      result = result.replace(regex, '');
    }

    setOutput(result);
  }, [inputText, leftSymbol, rightSymbol]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with symbols removed copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const presetSymbols = [
    { name: "Brackets", left: "[", right: "]" },
    { name: "Parentheses", left: "(", right: ")" },
    { name: "Quotes", left: '"', right: '"' },
    { name: "Asterisks", left: "*", right: "*" },
    { name: "Underscores", left: "_", right: "_" },
    { name: "Curly Braces", left: "{", right: "}" },
    { name: "Angle Brackets", left: "<", right: ">" },
    { name: "Hash", left: "#", right: "#" },
  ];

  const applyPreset = (left: string, right: string) => {
    setLeftSymbol(left);
    setRightSymbol(right);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-center gap-2">
            <Scissors className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Remove Symbols from Around Words</CardTitle>
          </div>
          <CardDescription>Remove specified symbols from around words in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with symbols around words to remove..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="left-symbol">Left Symbol to Remove:</Label>
              <Input
                id="left-symbol"
                data-testid="input-left-symbol"
                placeholder="["
                value={leftSymbol}
                onChange={(e) => setLeftSymbol(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="right-symbol">Right Symbol to Remove:</Label>
              <Input
                id="right-symbol"
                data-testid="input-right-symbol"
                placeholder="]"
                value={rightSymbol}
                onChange={(e) => setRightSymbol(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label>Quick Presets:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {presetSymbols.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset.left, preset.right)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Symbols Removed:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with symbols removed will appear here..."
            />
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>Example:</strong> "[Hello] [World]" with [ ] → "Hello World"
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

export default RemoveSymbolsFromAroundWords;
