import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SortSymbolsInText() {
  const [inputText, setInputText] = useState<string>('Hello! @world# $programming% &typescript* (react) [javascript] {code}');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [preserveLetters, setPreserveLetters] = useState<boolean>(true);
  const [preserveNumbers, setPreserveNumbers] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Separate different types of characters
    const letters: string[] = [];
    const numbers: string[] = [];
    const symbols: string[] = [];
    const whitespace: string[] = [];
    
    for (const char of inputText) {
      if (/[a-zA-Z]/.test(char)) {
        letters.push(char);
      } else if (/\d/.test(char)) {
        numbers.push(char);
      } else if (/\s/.test(char)) {
        whitespace.push(char);
      } else {
        symbols.push(char);
      }
    }
    
    // Sort symbols
    if (sortOrder === 'desc') {
      symbols.sort((a, b) => b.localeCompare(a));
    } else {
      symbols.sort((a, b) => a.localeCompare(b));
    }
    
    // Reconstruct text based on preservation settings
    let result = '';
    let letterIndex = 0;
    let numberIndex = 0;
    let symbolIndex = 0;
    let whitespaceIndex = 0;
    
    for (const char of inputText) {
      if (/[a-zA-Z]/.test(char)) {
        result += preserveLetters ? letters[letterIndex++] : (symbolIndex < symbols.length ? symbols[symbolIndex++] : char);
      } else if (/\d/.test(char)) {
        result += preserveNumbers ? numbers[numberIndex++] : (symbolIndex < symbols.length ? symbols[symbolIndex++] : char);
      } else if (/\s/.test(char)) {
        result += whitespace[whitespaceIndex++];
      } else {
        result += symbols[symbolIndex++] || char;
      }
    }
    
    setOutput(result);
  }, [inputText, sortOrder, preserveLetters, preserveNumbers]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with sorted symbols copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <CardTitle className="text-2xl">Sort Symbols in Text</CardTitle>
          </div>
          <CardDescription>Sort special characters and symbols in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with symbols to sort..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Special characters and symbols will be sorted while preserving text structure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sort-order">Sort Order:</Label>
              <select
                id="sort-order"
                data-testid="select-sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preserve-letters"
                  data-testid="checkbox-preserve-letters"
                  checked={preserveLetters}
                  onChange={(e) => setPreserveLetters(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-letters">Preserve letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preserve-numbers"
                  data-testid="checkbox-preserve-numbers"
                  checked={preserveNumbers}
                  onChange={(e) => setPreserveNumbers(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-numbers">Preserve numbers</Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Sorted Symbols:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with sorted symbols will appear here..."
            />
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

export default SortSymbolsInText;