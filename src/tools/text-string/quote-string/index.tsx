import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function QuoteString() {
  const [inputText, setInputText] = useState<string>('Hello World\nWelcome to ToolNexas\nProfessional Tools');
  const [quoteType, setQuoteType] = useState<string>('double');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const lines = inputText.split('\n');
    let quotedLines: string[];
    
    switch (quoteType) {
      case 'single':
        quotedLines = lines.map(line => `'${line}'`);
        break;
      case 'double':
        quotedLines = lines.map(line => `"${line}"`);
        break;
      case 'backtick':
        quotedLines = lines.map(line => `\`${line}\``);
        break;
      case 'square':
        quotedLines = lines.map(line => `[${line}]`);
        break;
      case 'parentheses':
        quotedLines = lines.map(line => `(${line})`);
        break;
      case 'curly':
        quotedLines = lines.map(line => `{${line}}`);
        break;
      default:
        quotedLines = lines.map(line => `"${line}"`);
    }
    
    setOutput(quotedLines.join('\n'));
  }, [inputText, quoteType]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Quoted text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
          <div className="flex items-center justify-center gap-2">
            <Quote className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <CardTitle className="text-2xl">Quote a String</CardTitle>
          </div>
          <CardDescription>Add quotes or brackets around each line of your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="quote-type">Quote Type:</Label>
            <Select value={quoteType} onValueChange={setQuoteType}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select quote type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="double">Double Quotes (")</SelectItem>
                <SelectItem value="single">Single Quotes (')</SelectItem>
                <SelectItem value="backtick">Backticks (`)</SelectItem>
                <SelectItem value="square">Square Brackets []</SelectItem>
                <SelectItem value="parentheses">Parentheses ()</SelectItem>
                <SelectItem value="curly">Curly Braces {}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Choose the type of quotes or brackets to wrap around your text
            </p>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to quote..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Quoted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Quoted text will appear here..."
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

export default QuoteString;
