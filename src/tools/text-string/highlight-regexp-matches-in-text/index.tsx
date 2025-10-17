import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Highlighter } from "lucide-react";

function HighlightRegExpMatchesInText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog.\nContact: email@example.com, phone: 555-1234');
  const [regexPattern, setRegexPattern] = useState<string>('\\b\\w{5}\\b');
  const [highlightedOutput, setHighlightedOutput] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (!inputText || !regexPattern) {
      setHighlightedOutput(null);
      return;
    }

    try {
      const regex = new RegExp(regexPattern, 'g');
      const parts: JSX.Element[] = [];
      let lastIndex = 0;
      let match;
      let key = 0;

      while ((match = regex.exec(inputText)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(
            <span key={`text-${key++}`}>
              {inputText.substring(lastIndex, match.index)}
            </span>
          );
        }

        // Add highlighted match
        parts.push(
          <mark
            key={`match-${key++}`}
            className="bg-yellow-200 dark:bg-yellow-900 rounded px-1"
          >
            {match[0]}
          </mark>
        );

        lastIndex = regex.lastIndex;
      }

      // Add remaining text
      if (lastIndex < inputText.length) {
        parts.push(
          <span key={`text-${key++}`}>
            {inputText.substring(lastIndex)}
          </span>
        );
      }

      setHighlightedOutput(<>{parts.length > 0 ? parts : <span>{inputText}</span>}</>);
    } catch (error) {
      setHighlightedOutput(<span className="text-red-500">Invalid regular expression</span>);
    }
  }, [inputText, regexPattern]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
          <div className="flex items-center justify-center gap-2">
            <Highlighter className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <CardTitle className="text-2xl">Highlight RegExp Matches in Text</CardTitle>
          </div>
          <CardDescription>Visually highlight all text that matches a regular expression pattern</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to highlight..."
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
              placeholder="\b\w{5}\b"
            />
          </div>

          <div>
            <Label htmlFor="output">Highlighted Output:</Label>
            <div
              id="output"
              data-testid="output-result"
              className="min-h-32 mt-2 p-3 border rounded-md bg-gray-50 dark:bg-gray-900 whitespace-pre-wrap"
            >
              {highlightedOutput || (
                <span className="text-muted-foreground">Highlighted text will appear here...</span>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>Tip:</strong> Matched portions will be highlighted in <mark className="bg-yellow-200 dark:bg-yellow-900 rounded px-1">yellow</mark>. Useful for pattern validation and debugging regex.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default HighlightRegExpMatchesInText;
