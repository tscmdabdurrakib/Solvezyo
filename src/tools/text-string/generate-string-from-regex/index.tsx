import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function GenerateStringFromRegex() {
  const [regexPattern, setRegexPattern] = useState<string>('[A-Z]{3}-[0-9]{4}');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const generateFromRegex = (pattern: string) => {
    try {
      // Simple regex string generator (supports basic patterns)
      let result = '';
      let i = 0;
      
      while (i < pattern.length) {
        if (pattern[i] === '[' && pattern.indexOf(']', i) > i) {
          const closingBracket = pattern.indexOf(']', i);
          const charClass = pattern.substring(i + 1, closingBracket);
          
          // Check for quantifier
          let count = 1;
          if (pattern[closingBracket + 1] === '{') {
            const closingBrace = pattern.indexOf('}', closingBracket);
            if (closingBrace > closingBracket) {
              const quantifier = pattern.substring(closingBracket + 2, closingBrace);
              count = parseInt(quantifier) || 1;
              i = closingBrace + 1;
            } else {
              i = closingBracket + 1;
            }
          } else if (pattern[closingBracket + 1] === '+') {
            count = Math.floor(Math.random() * 5) + 1;
            i = closingBracket + 2;
          } else if (pattern[closingBracket + 1] === '*') {
            count = Math.floor(Math.random() * 5);
            i = closingBracket + 2;
          } else {
            i = closingBracket + 1;
          }
          
          // Generate characters from class
          for (let j = 0; j < count; j++) {
            result += generateCharFromClass(charClass);
          }
        } else if (pattern[i] === '\\' && i + 1 < pattern.length) {
          // Escape sequences
          const nextChar = pattern[i + 1];
          if (nextChar === 'd') result += Math.floor(Math.random() * 10);
          else if (nextChar === 'w') result += generateCharFromClass('a-zA-Z0-9_');
          else if (nextChar === 's') result += ' ';
          else result += nextChar;
          i += 2;
        } else if (pattern[i] === '.') {
          result += generateCharFromClass('a-zA-Z0-9');
          i++;
        } else {
          result += pattern[i];
          i++;
        }
      }
      
      setOutput(result);
    } catch (error) {
      setOutput('Error: Invalid regex pattern');
    }
  };

  const generateCharFromClass = (charClass: string): string => {
    // Handle ranges like a-z, A-Z, 0-9
    const ranges: string[] = [];
    let i = 0;
    
    while (i < charClass.length) {
      if (charClass[i + 1] === '-' && i + 2 < charClass.length) {
        const start = charClass.charCodeAt(i);
        const end = charClass.charCodeAt(i + 2);
        for (let code = start; code <= end; code++) {
          ranges.push(String.fromCharCode(code));
        }
        i += 3;
      } else {
        ranges.push(charClass[i]);
        i++;
      }
    }
    
    return ranges[Math.floor(Math.random() * ranges.length)] || '';
  };

  const handleGenerate = () => {
    generateFromRegex(regexPattern);
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Generated string copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle>Generate String from Regex</CardTitle>
          </div>
          <CardDescription>Create sample strings matching regex patterns</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Regex Input */}
          <div className="space-y-2">
            <Label htmlFor="regex">Regex Pattern:</Label>
            <Input
              id="regex"
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              placeholder="Enter regex pattern (e.g., [A-Z]{3}-[0-9]{4})"
              className="font-mono"
              data-testid="input-regex-pattern"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Examples: [A-Z]{`{3}`}-[0-9]{`{4}`}, \d{`{3}`}-\d{`{4}`}, [a-z]+@[a-z]+\.[a-z]{`{2,3}`}
            </p>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <Label>Generated String:</Label>
            <Textarea
              value={output}
              readOnly
              className="font-mono text-sm min-h-[100px] bg-gray-50 dark:bg-gray-900"
              placeholder="Generated string will appear here..."
              data-testid="output-generated-string"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              variant="outline"
              className="flex-1"
              data-testid="button-generate"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate
            </Button>
            <Button
              onClick={copyToClipboard}
              className="flex-1"
              disabled={!output || output.startsWith('Error')}
              data-testid="button-copy"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Result
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supported Patterns:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>• Character classes: [a-z], [A-Z], [0-9]</p>
          <p>• Quantifiers: {`{n}`} (exact), + (one or more), * (zero or more)</p>
          <p>• Special: \d (digit), \w (word char), \s (space), . (any char)</p>
          <p>• Literal characters are preserved as-is</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default GenerateStringFromRegex;
