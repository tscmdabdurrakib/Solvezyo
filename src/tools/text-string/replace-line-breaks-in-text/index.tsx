import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Replace } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ReplaceLineBreaksInText() {
  const [inputText, setInputText] = useState<string>(`Replace line breaks in text
With custom replacement text
Perfect for formatting`);
  const [output, setOutput] = useState<string>('');
  const [replacementText, setReplacementText] = useState<string>(' - ');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    const replacedText = inputText.replace(/\r?\n|\r/g, replacementText);
    setOutput(replacedText);
  }, [inputText, replacementText]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "Text with replaced line breaks copied to clipboard" });
    } catch (err) {
      toast({ title: "Failed to copy", description: "Please try again", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-center gap-2">
            <Replace className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <CardTitle className="text-2xl">Replace Line Breaks in Text</CardTitle>
          </div>
          <CardDescription>Replace line breaks with custom text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="replacement-text">Replacement Text:</Label>
            <Input
              id="replacement-text"
              value={replacementText}
              onChange={(e) => setReplacementText(e.target.value)}
              className="mt-2"
              placeholder="Enter replacement text..."
            />
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              placeholder="Enter your multi-line text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Replaced Line Breaks:</Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with replaced line breaks will appear here..."
            />
          </div>

          <Button onClick={copyToClipboard} className="w-full" disabled={!output}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Result
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReplaceLineBreaksInText;