import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Eraser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

function RemoveLettersFromText() {
  const [inputText, setInputText] = useState<string>('Remove specific letters!\nClean your text\nCustomize content');
  const [output, setOutput] = useState<string>('');
  const [lettersToRemove, setLettersToRemove] = useState<string>('aeiou');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    if (!lettersToRemove) {
      setOutput(inputText);
      return;
    }

    let result = inputText;
    const escapedLetters = lettersToRemove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(`[${escapedLetters}]`, flags);
    result = inputText.replace(regex, '');

    setOutput(result);
  }, [inputText, lettersToRemove, caseSensitive]);

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

  const removeVowels = () => {
    setLettersToRemove('aeiouAEIOU');
    setCaseSensitive(false);
  };

  const removeConsonants = () => {
    setLettersToRemove('bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ');
    setCaseSensitive(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Eraser className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <CardTitle className="text-2xl">Remove Letters from Text</CardTitle>
          </div>
          <CardDescription>Remove specific letters or characters from your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="letters-to-remove">Letters to Remove:</Label>
            <Input
              id="letters-to-remove"
              data-testid="letters-input"
              placeholder="e.g., aeiou"
              value={lettersToRemove}
              onChange={(e) => setLettersToRemove(e.target.value)}
              className="mt-2"
            />
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={removeVowels}
                className="text-xs"
              >
                Remove Vowels
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={removeConsonants}
                className="text-xs"
              >
                Remove Consonants
              </Button>
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

          <div className="bg-rose-50 dark:bg-rose-950/20 p-3 rounded-lg">
            <p className="text-sm text-rose-700 dark:text-rose-300">
              <strong>Example:</strong> Remove "aeiou" from "Hello World" → "Hll Wrld"
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

export default RemoveLettersFromText;
