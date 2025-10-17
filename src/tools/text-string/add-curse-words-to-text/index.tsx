import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, MessageSquareWarning } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddCurseWordsToText() {
  const [inputText, setInputText] = useState<string>('This is a test sentence.\nI really love this product.\nWhat a beautiful day!');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const curseWords = ['damn', 'hell', 'crap', 'bloody', 'freaking'];

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const words = inputText.split(' ');
    const result = words.map((word, index) => {
      // Add curse word before every 5th word (randomly distributed)
      if (index > 0 && index % 5 === 0) {
        const randomCurse = curseWords[Math.floor(Math.random() * curseWords.length)];
        return `${randomCurse} ${word}`;
      }
      return word;
    }).join(' ');

    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with curse words copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-center gap-2">
            <MessageSquareWarning className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Add Curse Words To Text</CardTitle>
          </div>
          <CardDescription>Automatically add curse words to your text for emphasis or humor</CardDescription>
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
            <Label htmlFor="output">Text with Curse Words:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Modified text will appear here..."
            />
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>Warning:</strong> This tool adds mild curse words to your text. Use responsibly and consider your audience.
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

export default AddCurseWordsToText;
