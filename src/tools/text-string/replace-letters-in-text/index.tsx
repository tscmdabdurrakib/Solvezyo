import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Replace } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

function ReplaceLettersInText() {
  const [inputText, setInputText] = useState<string>('Replace letters in your text!\nFind and replace made easy\nCustomize your content');
  const [output, setOutput] = useState<string>('');
  const [findLetter, setFindLetter] = useState<string>('e');
  const [replaceLetter, setReplaceLetter] = useState<string>('3');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    if (!findLetter) {
      setOutput(inputText);
      return;
    }

    let result = inputText;
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(findLetter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    result = inputText.replace(regex, replaceLetter);

    setOutput(result);
  }, [inputText, findLetter, replaceLetter, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Modified text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <Replace className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Replace Letters in Text</CardTitle>
          </div>
          <CardDescription>Find and replace specific letters or characters in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="find-letter">Find Letter/Character:</Label>
              <Input
                id="find-letter"
                data-testid="find-input"
                placeholder="e.g., e"
                value={findLetter}
                onChange={(e) => setFindLetter(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="replace-letter">Replace With:</Label>
              <Input
                id="replace-letter"
                data-testid="replace-input"
                placeholder="e.g., 3"
                value={replaceLetter}
                onChange={(e) => setReplaceLetter(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <Label htmlFor="case-sensitive" className="cursor-pointer">Case Sensitive</Label>
            <Switch
              id="case-sensitive"
              checked={caseSensitive}
              onCheckedChange={setCaseSensitive}
            />
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Modified Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Modified text will appear here..."
            />
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg">
            <p className="text-sm text-cyan-700 dark:text-cyan-300">
              <strong>Example:</strong> Find "e" and replace with "3" → "H3llo World" becomes "H3llo World"
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

export default ReplaceLettersInText;
