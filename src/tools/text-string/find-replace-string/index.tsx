import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FindReplaceString() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. The fox is quick!');
  const [findText, setFindText] = useState<string>('fox');
  const [replaceText, setReplaceText] = useState<string>('cat');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText || !findText) {
      setOutput(inputText);
      return;
    }

    let result = inputText;
    if (caseSensitive) {
      // Case-sensitive replacement
      result = inputText.split(findText).join(replaceText);
    } else {
      // Case-insensitive replacement
      const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      result = inputText.replace(regex, replaceText);
    }
    setOutput(result);
  }, [inputText, findText, replaceText, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Search className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Find and Replace a String</CardTitle>
          </div>
          <CardDescription>Search and replace text with custom options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="find-text">Find Text:</Label>
              <Input
                id="find-text"
                data-testid="input-find-text"
                placeholder="Text to find..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="replace-text">Replace With:</Label>
              <Input
                id="replace-text"
                data-testid="input-replace-text"
                placeholder="Replacement text..."
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="case-sensitive"
              data-testid="checkbox-case-sensitive"
              checked={caseSensitive}
              onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
            />
            <Label htmlFor="case-sensitive" className="text-sm cursor-pointer">
              Case Sensitive
            </Label>
          </div>

          <div>
            <Label htmlFor="output">Result:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Result will appear here..."
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

export default FindReplaceString;
