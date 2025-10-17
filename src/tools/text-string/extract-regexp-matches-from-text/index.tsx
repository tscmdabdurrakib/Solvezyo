import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ExtractRegExpMatchesFromText() {
  const [inputText, setInputText] = useState<string>('Email: john@example.com, jane@test.org\nPhone: 555-1234, 555-5678');
  const [regexPattern, setRegexPattern] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText || !regexPattern) {
      setOutput('');
      return;
    }

    try {
      const regex = new RegExp(regexPattern, 'g');
      const matches = inputText.match(regex);
      
      if (matches && matches.length > 0) {
        setOutput(matches.join('\n'));
      } else {
        setOutput('No matches found');
      }
    } catch (error) {
      setOutput('Invalid regular expression');
    }
  }, [inputText, regexPattern]);

  const copyToClipboard = async () => {
    if (!output || output === 'No matches found' || output === 'Invalid regular expression') return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Extracted matches copied to clipboard",
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
            <Search className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Extract RegExp Matches from Text</CardTitle>
          </div>
          <CardDescription>Extract all text that matches a regular expression pattern</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to search..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="regex-pattern">Regular Expression Pattern:</Label>
            <Input
              id="regex-pattern"
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              className="mt-2 font-mono"
              placeholder="\d+"
            />
          </div>

          <div>
            <Label htmlFor="output">Extracted Matches:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Matches will appear here..."
            />
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/20 p-3 rounded-lg">
            <p className="text-sm text-teal-700 dark:text-teal-300">
              <strong>Examples:</strong> Emails: <code>[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{`{2,}`}</code>, URLs: <code>https?://[^\s]+</code>, Numbers: <code>\d+</code>
            </p>
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output || output === 'No matches found' || output === 'Invalid regular expression'}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Result
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExtractRegExpMatchesFromText;
