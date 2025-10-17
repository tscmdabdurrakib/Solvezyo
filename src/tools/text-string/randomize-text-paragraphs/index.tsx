import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RandomizeTextParagraphs() {
  const [inputText, setInputText] = useState<string>('This is the first paragraph. It contains multiple sentences that form a cohesive thought and idea.\n\nThis is the second paragraph. It also contains multiple sentences that discuss a different topic or aspect.\n\nThis is the third paragraph. Like the others, it presents information in a structured way with multiple sentences.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    // Split by double newlines to get paragraphs
    const paragraphs = inputText.split(/\n\s*\n/).filter(paragraph => paragraph.trim() !== '');

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array: string[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledParagraphs = shuffleArray(paragraphs);
    setOutput(shuffledParagraphs.join('\n\n'));
  }, [inputText]);

  const randomizeAgain = () => {
    if (!inputText.trim()) return;
    
    // Split by double newlines to get paragraphs
    const paragraphs = inputText.split(/\n\s*\n/).filter(paragraph => paragraph.trim() !== '');

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array: string[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledParagraphs = shuffleArray(paragraphs);
    setOutput(shuffledParagraphs.join('\n\n'));
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Randomized text paragraphs copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <Shuffle className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Randomize Text Paragraphs</CardTitle>
          </div>
          <CardDescription>Shuffle the order of paragraphs in your text randomly</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with multiple paragraphs (separate paragraphs with double line breaks)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-40 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Randomized Text Paragraphs:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-40 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Randomized text paragraphs will appear here..."
            />
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg">
            <p className="text-sm text-cyan-700 dark:text-cyan-300">
              <strong>Example:</strong> Each paragraph will be shuffled randomly while maintaining paragraph integrity. Paragraphs are separated by double line breaks.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={randomizeAgain}
              variant="outline"
              className="flex-1"
              disabled={!inputText.trim()}
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Randomize Again
            </Button>
            <Button
              onClick={copyToClipboard}
              data-testid="button-copy"
              className="flex-1"
              disabled={!output}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Result
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RandomizeTextParagraphs;