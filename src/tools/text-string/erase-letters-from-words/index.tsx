import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Eraser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function EraseLettersFromWords() {
  const [inputText, setInputText] = useState<string>('Hello World\nRemove specific letters\nMake text unique');
  const [lettersToRemove, setLettersToRemove] = useState<string>('lo');
  const [output, setOutput] = useState<string>('');
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

    const letterSet = new Set(lettersToRemove.toLowerCase().split(''));
    const result = inputText.split('').filter(char => {
      return !letterSet.has(char.toLowerCase());
    }).join('');

    setOutput(result);
  }, [inputText, lettersToRemove]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with erased letters copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <Eraser className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Erase Letters from Words</CardTitle>
          </div>
          <CardDescription>Remove specific letters from your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="letters-to-remove">Letters to Remove:</Label>
            <Input
              id="letters-to-remove"
              data-testid="letters-to-remove"
              placeholder="Enter letters to remove (e.g., abc)"
              value={lettersToRemove}
              onChange={(e) => setLettersToRemove(e.target.value)}
              className="mt-2"
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
            <Label htmlFor="output">Result:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with letters removed will appear here..."
            />
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>Example:</strong> Remove letters "lo" from "Hello World" to get "He Wrd"
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

export default EraseLettersFromWords;
