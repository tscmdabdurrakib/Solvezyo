import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function UndoZalgoTextEffect() {
  const [inputText, setInputText] = useState<string>('H̸e̴l̰ḽo͈ ͇W̰o̓r̈ḽd̯!\nRemove Zalgo effects from corrupted text\nRestore your text to normal readability');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const removeZalgoEffect = (text: string): string => {
    if (!text) return text;
    // Remove all combining diacritical marks that create the Zalgo effect
    return text.replace(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/g, '');
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    const cleanedText = removeZalgoEffect(inputText);
    setOutput(cleanedText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "Cleaned text copied to clipboard" });
    } catch (err) {
      toast({ title: "Failed to copy", description: "Please try again", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <EyeOff className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Undo Zalgo Text Effect</CardTitle>
          </div>
          <CardDescription>Remove zalgo effects and restore normal text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Zalgo Text Input:</Label>
            <Textarea
              id="input-text"
              placeholder="Enter your zalgo text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Clean Text Output:</Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Clean text will appear here..."
            />
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg">
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              <strong>Example:</strong> Remove zalgo effects and restore your text to normal readability!
            </p>
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

export default UndoZalgoTextEffect;