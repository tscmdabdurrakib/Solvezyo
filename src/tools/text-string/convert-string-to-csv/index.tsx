import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertStringToCsv() {
  const [inputText, setInputText] = useState<string>('Name Age City\nJohn Doe 30 New York\nJane Smith 25 London\nMike Johnson 35 Toronto');
  const [delimiter, setDelimiter] = useState<string>('space');
  const [quoteStyle, setQuoteStyle] = useState<string>('minimal');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }
    
    try {
      const lines = inputText.split('\n').filter(line => line.trim());
      const delim = delimiter === 'space' ? ' ' : delimiter === 'tab' ? '\t' : delimiter;
      
      const csvLines = lines.map(line => {
        const fields = line.split(delim === ' ' ? /\s+/ : delim);
        
        return fields.map(field => {
          const trimmedField = field.trim();
          
          if (quoteStyle === 'all') {
            return `"${trimmedField.replace(/"/g, '""')}"`;
          } else if (quoteStyle === 'minimal' && (trimmedField.includes(',') || trimmedField.includes('"') || trimmedField.includes('\n'))) {
            return `"${trimmedField.replace(/"/g, '""')}"`;
          } else {
            return trimmedField;
          }
        }).join(',');
      });
      
      setOutput(csvLines.join('\n'));
    } catch (err) {
      setOutput('Error processing text to CSV format');
    }
  }, [inputText, delimiter, quoteStyle]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "CSV data copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Convert a String to CSV</CardTitle>
          </div>
          <CardDescription>Convert structured text data to CSV format with proper escaping</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="delimiter">Input Delimiter:</Label>
              <Select value={delimiter} onValueChange={setDelimiter}>
                <SelectTrigger id="delimiter" data-testid="select-delimiter" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="space">Space</SelectItem>
                  <SelectItem value="tab">Tab</SelectItem>
                  <SelectItem value="|">Pipe (|)</SelectItem>
                  <SelectItem value=";">Semicolon (;)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="quote-style">Quote Style:</Label>
              <Select value={quoteStyle} onValueChange={setQuoteStyle}>
                <SelectTrigger id="quote-style" data-testid="select-quote-style" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal (when needed)</SelectItem>
                  <SelectItem value="all">Quote All Fields</SelectItem>
                  <SelectItem value="none">No Quotes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter structured text to convert to CSV..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter structured data with consistent delimiters
            </p>
          </div>

          <div>
            <Label htmlFor="output">CSV Output:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="CSV formatted data will appear here..."
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

export default ConvertStringToCsv;
