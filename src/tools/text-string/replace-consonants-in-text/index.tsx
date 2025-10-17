import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Replace } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ReplaceConsonantsInText() {
  const [inputText, setInputText] = useState<string>('Hello World\nReplace all consonants\nMake text unique');
  const [replacement, setReplacement] = useState<string>('#');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const consonants = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g;
    const result = inputText.replace(consonants, replacement || '#');

    setOutput(result);
  }, [inputText, replacement]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with replaced consonants copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
          <div className="flex items-center justify-center gap-2">
            <Replace className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-2xl">Replace Consonants in Text</CardTitle>
          </div>
          <CardDescription>Replace all consonants with a character of your choice</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="replacement">Replacement Character:</Label>
            <Input
              id="replacement"
              data-testid="replacement"
              placeholder="Enter replacement character (e.g., #)"
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              className="mt-2"
              maxLength={1}
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
              placeholder="Text with replaced consonants will appear here..."
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Example:</strong> Replace consonants in "Hello World" with "#" to get "#e##o #o###"
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

export default ReplaceConsonantsInText;
