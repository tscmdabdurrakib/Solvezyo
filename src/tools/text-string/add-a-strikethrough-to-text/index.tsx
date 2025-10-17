import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Strikethrough } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddaStrikethroughtoText() {
  const [inputText, setInputText] = useState<string>('Strikethrough your completed tasks!\nPerfect for to-do lists\nGreat for showing removed content');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    // Add strikethrough using Unicode combining character
    const strikethroughText = inputText.replace(/./g, (char) => {
      // Skip adding strikethrough to newlines and spaces for better readability
      if (char === '\n' || char === '\r') {
        return char;
      }
      return char + '\u0336'; // Combining long stroke overlay
    });

    setOutput(strikethroughText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Strikethrough text copied to clipboard",
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
            <Strikethrough className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Add a Strikethrough to Text</CardTitle>
          </div>
          <CardDescription>Convert your text to strikethrough Unicode characters</CardDescription>
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
            <Label htmlFor="output">S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ ̶T̶e̶x̶t̶:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ ̶t̶e̶x̶t̶ ̶w̶i̶l̶l̶ ̶a̶p̶p̶e̶a̶r̶ ̶h̶e̶r̶e̶.̶.̶.̶"
            />
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>E̶x̶a̶m̶p̶l̶e̶:</strong> Convert "Completed Task" to "C̶o̶m̶p̶l̶e̶t̶e̶d̶ ̶T̶a̶s̶k̶" - perfect for to-do lists!
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

export default AddaStrikethroughtoText;