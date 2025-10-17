import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ExtractRegexMatches() {
  const [inputText, setInputText] = useState<string>('Contact us at support@example.com or sales@company.org for help');
  const [regexPattern, setRegexPattern] = useState<string>('\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b');
  const [caseInsensitive, setCaseInsensitive] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    extractMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, regexPattern, caseInsensitive]);

  const extractMatches = () => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (!regexPattern) {
      setOutput('Please enter a regex pattern');
      return;
    }

    try {
      const flags = caseInsensitive ? 'gi' : 'g';
      const regex = new RegExp(regexPattern, flags);
      const matches = inputText.match(regex);

      if (matches && matches.length > 0) {
        setOutput(`Found ${matches.length} match(es):\n\n${matches.join('\n')}`);
      } else {
        setOutput('No matches found');
      }
    } catch (error) {
      setOutput('Error: Invalid regex pattern');
    }
  };

  const copyToClipboard = () => {
    if (output && !output.startsWith('Error')) {
      const matchesOnly = output.split('\n\n')[1] || output;
      navigator.clipboard.writeText(matchesOnly);
      toast({
        title: "Copied!",
        description: "Matches copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center gap-2">
            <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle>Extract Regex Matches</CardTitle>
          </div>
          <CardDescription>Find and extract all regex pattern matches from text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Input Text */}
          <div className="space-y-2">
            <Label htmlFor="input">Input Text:</Label>
            <Textarea
              id="input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here to extract matches..."
              className="min-h-[120px]"
              data-testid="input-text"
            />
          </div>

          {/* Regex Pattern */}
          <div className="space-y-2">
            <Label htmlFor="pattern">Regex Pattern:</Label>
            <Input
              id="pattern"
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              placeholder="Enter regex pattern"
              className="font-mono"
              data-testid="input-regex-pattern"
            />
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="case-insensitive"
                checked={caseInsensitive}
                onCheckedChange={(checked) => setCaseInsensitive(checked as boolean)}
                data-testid="checkbox-case-insensitive"
              />
              <label htmlFor="case-insensitive" className="text-sm cursor-pointer">
                Case insensitive
              </label>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <Label>Extracted Matches:</Label>
            <Textarea
              value={output}
              readOnly
              className="font-mono text-sm min-h-[150px] bg-gray-50 dark:bg-gray-900"
              placeholder="Matches will appear here..."
              data-testid="output-matches"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <Button
              onClick={copyToClipboard}
              disabled={!output || output.startsWith('Error') || output === 'No matches found'}
              data-testid="button-copy"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Matches
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Patterns:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>• Email: \b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{`{2,}`}\b</p>
          <p>• URL: https?://[^\s]+</p>
          <p>• Phone: \d{`{3}`}-\d{`{3}`}-\d{`{4}`}</p>
          <p>• IP Address: \b\d{`{1,3}`}\.\d{`{1,3}`}\.\d{`{1,3}`}\.\d{`{1,3}`}\b</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExtractRegexMatches;
