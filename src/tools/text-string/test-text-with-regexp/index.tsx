import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle } from "lucide-react";

function TestTextWithRegExp() {
  const [inputText, setInputText] = useState<string>('test@example.com');
  const [regexPattern, setRegexPattern] = useState<string>('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [matchDetails, setMatchDetails] = useState<string>('');

  useEffect(() => {
    if (!inputText || !regexPattern) {
      setIsMatch(null);
      setMatchDetails('');
      return;
    }

    try {
      const regex = new RegExp(regexPattern);
      const matches = inputText.match(regex);
      const testResult = regex.test(inputText);
      
      setIsMatch(testResult);
      
      if (matches) {
        const details = `✓ Pattern matches!
        
Full match: "${matches[0]}"
${matches.length > 1 ? `\nCapture groups:\n${matches.slice(1).map((g, i) => `  Group ${i + 1}: "${g}"`).join('\n')}` : ''}`;
        setMatchDetails(details);
      } else {
        setMatchDetails('✗ Pattern does not match');
      }
    } catch (error) {
      setIsMatch(null);
      setMatchDetails('Invalid regular expression');
    }
  }, [inputText, regexPattern]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            {isMatch === true && <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />}
            {isMatch === false && <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />}
            {isMatch === null && <CheckCircle2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
            <CardTitle className="text-2xl">Test Text with RegExp</CardTitle>
          </div>
          <CardDescription>Test if text matches a regular expression pattern</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to test..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-24 mt-2"
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
              placeholder="^\d{3}-\d{3}-\d{4}$"
            />
          </div>

          <div>
            <Label>Test Result:</Label>
            <div
              data-testid="output-result"
              className={`min-h-24 mt-2 p-4 border rounded-md whitespace-pre-wrap ${
                isMatch === true
                  ? 'bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800'
                  : isMatch === false
                  ? 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800'
                  : 'bg-gray-50 dark:bg-gray-900'
              }`}
            >
              {matchDetails || (
                <span className="text-muted-foreground">Test results will appear here...</span>
              )}
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Common patterns:</strong> Email: <code>^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{`{2,}`}$</code>, Phone: <code>^\d{`{3}`}-\d{`{3}`}-\d{`{4}`}$</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TestTextWithRegExp;
