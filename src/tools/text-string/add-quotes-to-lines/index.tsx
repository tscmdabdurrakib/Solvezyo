import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddQuotesToLines() {
  const [inputText, setInputText] = useState<string>('First line\nSecond line\nThird line');
  const [quoteType, setQuoteType] = useState<string>('double');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const lines = inputText.split('\n');
    
    const result = lines.map(line => {
      if (line.trim() === '') return line; // Preserve empty lines
      
      switch (quoteType) {
        case 'double':
          return `"${line}"`;
        case 'single':
          return `'${line}'`;
        case 'backtick':
          return `\`${line}\``;
        case 'angle':
          return `«${line}»`;
        default:
          return line;
      }
    }).join('\n');
    
    setOutput(result);
  }, [inputText, quoteType]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with quoted lines copied to clipboard",
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
            <Quote className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <CardTitle className="text-2xl">Add Quotes to Lines</CardTitle>
          </div>
          <CardDescription>Wrap each line with quotation marks</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="quote-type">Quote Type:</Label>
            <Select value={quoteType} onValueChange={setQuoteType}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select quote type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="double">Double Quotes (" ")</SelectItem>
                <SelectItem value="single">Single Quotes (' ')</SelectItem>
                <SelectItem value="backtick">Backticks (` `)</SelectItem>
                <SelectItem value="angle">Angle Quotes (« »)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to add quotes to each line..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Output (Lines With Quotes):</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with quoted lines will appear here..."
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/20 p-3 rounded-lg">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Example:</strong> Line 1{'\n'}Line 2 → "Line 1"{'\n'}"Line 2" (each line wrapped in quotes)
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

export default AddQuotesToLines;
