import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, XCircle, TestTube2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function TestStringWithRegex() {
  const [inputText, setInputText] = useState<string>('user@example.com');
  const [regexPattern, setRegexPattern] = useState<string>('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  const [caseInsensitive, setCaseInsensitive] = useState<boolean>(false);
  const [multiline, setMultiline] = useState<boolean>(false);
  const [result, setResult] = useState<{ matches: boolean; details: string } | null>(null);

  useEffect(() => {
    testRegex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, regexPattern, caseInsensitive, multiline]);

  const testRegex = () => {
    if (!inputText) {
      setResult(null);
      return;
    }
    
    if (!regexPattern) {
      setResult({ matches: false, details: 'Please enter a regex pattern' });
      return;
    }

    try {
      let flags = 'g';
      if (caseInsensitive) flags += 'i';
      if (multiline) flags += 'm';

      const regex = new RegExp(regexPattern, flags);
      const matches = regex.test(inputText);
      
      // Get match details
      const matchResult = inputText.match(new RegExp(regexPattern, flags));
      let details = '';
      
      if (matches && matchResult) {
        details = `✓ Pattern matches!\n\nMatches found: ${matchResult.length}\n`;
        if (matchResult.length > 0) {
          details += `\nFirst match: "${matchResult[0]}"`;
          if (matchResult.length > 1) {
            details += `\nAll matches:\n${matchResult.map((m, i) => `  ${i + 1}. "${m}"`).join('\n')}`;
          }
        }
      } else {
        details = '✗ Pattern does not match';
      }

      setResult({ matches, details });
    } catch (error) {
      setResult({ matches: false, details: `Error: Invalid regex pattern\n${error}` });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="flex items-center gap-2">
            <TestTube2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle>Test String with Regex</CardTitle>
          </div>
          <CardDescription>Validate if text matches a regex pattern</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Input Text */}
          <div className="space-y-2">
            <Label htmlFor="input">Test String:</Label>
            <Textarea
              id="input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to test..."
              className="min-h-[100px]"
              data-testid="input-test-string"
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
            <div className="flex gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="case-insensitive"
                  checked={caseInsensitive}
                  onCheckedChange={(checked) => setCaseInsensitive(checked as boolean)}
                  data-testid="checkbox-case-insensitive"
                />
                <label htmlFor="case-insensitive" className="text-sm cursor-pointer">
                  Case insensitive (i)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="multiline"
                  checked={multiline}
                  onCheckedChange={(checked) => setMultiline(checked as boolean)}
                  data-testid="checkbox-multiline"
                />
                <label htmlFor="multiline" className="text-sm cursor-pointer">
                  Multiline (m)
                </label>
              </div>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Label>Test Result:</Label>
                {result.matches ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Match
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    <XCircle className="h-4 w-4 mr-1" />
                    No Match
                  </Badge>
                )}
              </div>
              <Textarea
                value={result.details}
                readOnly
                className="font-mono text-sm min-h-[120px] bg-gray-50 dark:bg-gray-900"
                data-testid="output-test-result"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>• Enter the text you want to test in the input field</p>
          <p>• Type your regex pattern (without delimiters)</p>
          <p>• Toggle flags as needed (case insensitive, multiline)</p>
          <p>• Results update instantly as you type</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default TestStringWithRegex;
