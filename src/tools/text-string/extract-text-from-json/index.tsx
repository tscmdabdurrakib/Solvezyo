import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Braces } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ExtractTextFromJSON() {
  const [inputText, setInputText] = useState<string>(`{
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "gaming", "traveling"],
  "bio": "A passionate developer who loves coding"
}`);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    try {
      // Parse JSON
      const jsonData = JSON.parse(inputText);
      
      // Extract all text values recursively
      const extractText = (obj: any): string[] => {
        const results: string[] = [];
        
        if (typeof obj === 'string') {
          results.push(obj);
        } else if (Array.isArray(obj)) {
          obj.forEach(item => {
            results.push(...extractText(item));
          });
        } else if (typeof obj === 'object' && obj !== null) {
          Object.values(obj).forEach(value => {
            results.push(...extractText(value));
          });
        } else if (obj !== null && obj !== undefined) {
          results.push(String(obj));
        }
        
        return results;
      };
      
      const textValues = extractText(jsonData);
      const result = textValues.join('\n');
      
      setOutput(result);
    } catch (error) {
      setOutput('Error: Invalid JSON format');
    }
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Extracted text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            <Braces className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Extract Text from JSON</CardTitle>
          </div>
          <CardDescription>Extract all text values from JSON data</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">JSON Input:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Paste your JSON data here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="output">Extracted Text Values:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Extracted text will appear here..."
            />
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/20 p-3 rounded-lg">
            <p className="text-sm text-teal-700 dark:text-teal-300">
              <strong>Note:</strong> All string values are extracted recursively from the JSON structure, one per line.
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

export default ExtractTextFromJSON;
