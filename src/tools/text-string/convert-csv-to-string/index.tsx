import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertCsvToString() {
  const [inputText, setInputText] = useState<string>('Name,Age,City,Country\nJohn Doe,30,New York,USA\nJane Smith,25,London,UK\nMike Johnson,35,Toronto,Canada');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Convert CSV to string representation by escaping special characters
    const csvToString = inputText
      .replace(/"/g, '""') // Escape existing quotes
      .split('\n')
      .map(line => {
        // If line contains commas, quotes, or newlines, wrap in quotes
        if (line.includes(',') || line.includes('"') || line.includes('\n')) {
          return `"${line}"`;
        }
        return line;
      })
      .join('\\n'); // Use literal \n for string representation
    
    setOutput(csvToString);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "CSV string copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Convert CSV to a String</CardTitle>
          </div>
          <CardDescription>Convert CSV data to escaped string format</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input CSV:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter CSV data to convert to string..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              CSV data will be converted to a properly escaped string format
            </p>
          </div>

          <div>
            <Label htmlFor="output">String Output:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="CSV string will appear here..."
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

export default ConvertCsvToString;
