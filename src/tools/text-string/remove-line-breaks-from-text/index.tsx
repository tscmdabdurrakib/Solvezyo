import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveLineBreaksFromText() {
  const [inputText, setInputText] = useState<string>(`Remove line breaks from text
This tool helps you
convert multi-line text
into single line text`);
  const [output, setOutput] = useState<string>('');
  const [replacementType, setReplacementType] = useState<string>('space');
  const { toast } = useToast();

  const removeLineBreaks = (text: string, replacement: string): string => {
    if (!text) return text;

    let replacementChar = ' ';
    switch (replacement) {
      case 'space': replacementChar = ' '; break;
      case 'none': replacementChar = ''; break;
      case 'comma': replacementChar = ', '; break;
      case 'semicolon': replacementChar = '; '; break;
      case 'pipe': replacementChar = ' | '; break;
      case 'tab': replacementChar = '\t'; break;
    }

    return text.replace(/\r?\n|\r/g, replacementChar);
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    const textWithoutBreaks = removeLineBreaks(inputText, replacementType);
    setOutput(textWithoutBreaks);
  }, [inputText, replacementType]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "Text without line breaks copied to clipboard" });
    } catch (err) {
      toast({ title: "Failed to copy", description: "Please try again", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <Minus className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Remove Line Breaks from Text</CardTitle>
          </div>
          <CardDescription>Convert multi-line text into single line text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="replacement-type">Replace With:</Label>
            <Select value={replacementType} onValueChange={setReplacementType}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select replacement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="space">Space</SelectItem>
                <SelectItem value="none">Nothing</SelectItem>
                <SelectItem value="comma">Comma</SelectItem>
                <SelectItem value="semicolon">Semicolon</SelectItem>
                <SelectItem value="pipe">Pipe</SelectItem>
                <SelectItem value="tab">Tab</SelectItem>
              </SelectContent>
            </Select>
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
            <Label htmlFor="output">Text without Line Breaks:</Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text without line breaks will appear here..."
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

export default RemoveLineBreaksFromText;