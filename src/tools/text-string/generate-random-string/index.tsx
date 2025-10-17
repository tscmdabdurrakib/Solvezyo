import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function GenerateRandomString() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const generateRandomString = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setOutput('Please select at least one character type');
      return;
    }

    let result = '';
    const charsetLength = charset.length;
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charsetLength));
    }
    setOutput(result);
  };

  useEffect(() => {
    generateRandomString();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Random string copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle>Generate Random String</CardTitle>
          </div>
          <CardDescription>Create secure random strings with custom options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Length Control */}
          <div className="space-y-2">
            <Label htmlFor="length">String Length: {length}</Label>
            <Input
              id="length"
              type="range"
              min="1"
              max="128"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
              data-testid="input-string-length"
            />
          </div>

          {/* Character Options */}
          <div className="space-y-3">
            <Label>Character Types:</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                  data-testid="checkbox-uppercase"
                />
                <label htmlFor="uppercase" className="text-sm cursor-pointer">
                  Uppercase (A-Z)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                  data-testid="checkbox-lowercase"
                />
                <label htmlFor="lowercase" className="text-sm cursor-pointer">
                  Lowercase (a-z)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                  data-testid="checkbox-numbers"
                />
                <label htmlFor="numbers" className="text-sm cursor-pointer">
                  Numbers (0-9)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                  data-testid="checkbox-symbols"
                />
                <label htmlFor="symbols" className="text-sm cursor-pointer">
                  Symbols (!@#$...)
                </label>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <Label>Generated String:</Label>
            <Textarea
              value={output}
              readOnly
              className="font-mono text-sm min-h-[100px] bg-gray-50 dark:bg-gray-900"
              data-testid="output-random-string"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={generateRandomString}
              variant="outline"
              className="flex-1"
              data-testid="button-regenerate"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
            <Button
              onClick={copyToClipboard}
              className="flex-1"
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
          <CardTitle className="text-lg">How It Works:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>• Adjust the length slider to set your desired string length</p>
          <p>• Select character types to include in the random string</p>
          <p>• The string generates automatically as you change options</p>
          <p>• Use for passwords, API keys, tokens, or unique identifiers</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default GenerateRandomString;
