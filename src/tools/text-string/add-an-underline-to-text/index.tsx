import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Underline } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddanUnderlinetoText() {
  const [inputText, setInputText] = useState<string>('Underline your important text!\nPerfect for emphasizing key points\nGreat for headings and titles');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const addUnderline = (text: string): string => {
    return text.replace(/./g, (char) => {
      // Skip adding underline to newlines and carriage returns
      if (char === '\n' || char === '\r') {
        return char;
      }
      // Add combining underline (U+0332) to each character
      return char + '\u0332';
    });
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const underlinedText = addUnderline(inputText);
    setOutput(underlinedText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Underlined text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <Underline className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Add an Underline to Text</CardTitle>
          </div>
          <CardDescription>Convert your text to underlined Unicode characters</CardDescription>
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

          <div>
            <Label htmlFor="output">U̲n̲d̲e̲r̲l̲i̲n̲e̲d̲ ̲T̲e̲x̲t̲:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="U̲n̲d̲e̲r̲l̲i̲n̲e̲d̲ ̲t̲e̲x̲t̲ ̲w̲i̲l̲l̲ ̲a̲p̲p̲e̲a̲r̲ ̲h̲e̲r̲e̲.̲.̲.̲"
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>E̲x̲a̲m̲p̲l̲e̲:</strong> Convert "Hello World" to "H̲e̲l̲l̲o̲ ̲W̲o̲r̲l̲d̲" - perfect for emphasizing key points!
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

export default AddanUnderlinetoText;