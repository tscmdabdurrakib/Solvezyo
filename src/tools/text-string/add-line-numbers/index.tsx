import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ListOrdered } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddLineNumbers() {
  const [inputText, setInputText] = useState<string>('First line of text\nSecond line of text\nThird line of text\nFourth line of text');
  const [startNumber, setStartNumber] = useState<string>('1');
  const [numberStyle, setNumberStyle] = useState<string>('number');
  const [separator, setSeparator] = useState<string>(': ');
  const [includeEmpty, setIncludeEmpty] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n');
    const startNum = parseInt(startNumber) || 1;
    let lineNumber = startNum;

    const numberedLines = lines.map(line => {
      if (!includeEmpty && line.trim() === '') {
        return line; // Don't number empty lines if option is disabled
      }

      let prefix = '';
      switch (numberStyle) {
        case 'number':
          prefix = lineNumber.toString();
          break;
        case 'padded':
          const totalLines = includeEmpty ? lines.length : lines.filter(l => l.trim() !== '').length;
          const padding = (startNum + totalLines - 1).toString().length;
          prefix = lineNumber.toString().padStart(padding, '0');
          break;
        case 'roman':
          prefix = toRoman(lineNumber);
          break;
        case 'alpha':
          prefix = toAlpha(lineNumber);
          break;
        case 'hex':
          prefix = lineNumber.toString(16).toUpperCase();
          break;
        case 'binary':
          prefix = lineNumber.toString(2);
          break;
        default:
          prefix = lineNumber.toString();
      }

      if (includeEmpty || line.trim() !== '') {
        lineNumber++;
      }

      return `${prefix}${separator}${line}`;
    });

    setOutput(numberedLines.join('\n'));
  }, [inputText, startNumber, numberStyle, separator, includeEmpty]);

  // Convert number to Roman numerals
  const toRoman = (num: number): string => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let result = '';
    
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += numerals[i];
        num -= values[i];
      }
    }
    return result;
  };

  // Convert number to alphabetic (A, B, C, ...)
  const toAlpha = (num: number): string => {
    let result = '';
    while (num > 0) {
      num--;
      result = String.fromCharCode(65 + (num % 26)) + result;
      num = Math.floor(num / 26);
    }
    return result;
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with line numbers copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const presetSeparators = [
    { name: "Colon + Space", value: ": " },
    { name: "Dot + Space", value: ". " },
    { name: "Dash + Space", value: "- " },
    { name: "Parenthesis", value: ") " },
    { name: "Bracket", value: "] " },
    { name: "Tab", value: "\t" },
    { name: "Space Only", value: " " },
    { name: "No Space", value: "" },
  ];

  const applySeparator = (value: string) => {
    setSeparator(value);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <ListOrdered className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Add Line Numbers</CardTitle>
          </div>
          <CardDescription>Add line numbers to your text with customizable formatting</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to add line numbers..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {inputText.split('\n').length} lines total
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="start-number">Start Number:</Label>
              <Input
                id="start-number"
                data-testid="input-start"
                type="number"
                placeholder="1"
                value={startNumber}
                onChange={(e) => setStartNumber(e.target.value)}
                className="mt-2"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="number-style">Number Style:</Label>
              <Select value={numberStyle} onValueChange={setNumberStyle}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="number">Numbers (1, 2, 3)</SelectItem>
                  <SelectItem value="padded">Padded Numbers (01, 02, 03)</SelectItem>
                  <SelectItem value="roman">Roman Numerals (I, II, III)</SelectItem>
                  <SelectItem value="alpha">Alphabetic (A, B, C)</SelectItem>
                  <SelectItem value="hex">Hexadecimal (1, 2, 3...A, B, C)</SelectItem>
                  <SelectItem value="binary">Binary (1, 10, 11)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="separator">Separator:</Label>
              <Input
                id="separator"
                data-testid="input-separator"
                placeholder=": "
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="include-empty"
                checked={includeEmpty}
                onChange={(e) => setIncludeEmpty(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="include-empty">Number empty lines</Label>
            </div>
          </div>

          <div>
            <Label>Quick Separators:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {presetSeparators.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applySeparator(preset.value)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Line Numbers:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono text-sm"
              placeholder="Text with line numbers will appear here..."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>Example:</strong> Add sequential numbers to each line. Useful for code snippets, 
              lists, references, and document organization. Choose from various numbering styles.
            </p>
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Numbered Text
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddLineNumbers;