import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RandomizeTextSentences() {
  const [inputText, setInputText] = useState<string>('This is the first sentence. This is the second sentence. This is the third sentence. This is the fourth sentence.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    // Split by sentence delimiters (., !, ?)
    const sentences = inputText.split(/([.!?]+)/).filter(part => part.trim() !== '');
    
    // Group sentences with their punctuation
    const sentenceGroups: string[] = [];
    for (let i = 0; i < sentences.length; i += 2) {
      if (sentences[i] && sentences[i + 1]) {
        sentenceGroups.push((sentences[i] + sentences[i + 1]).trim());
      } else if (sentences[i]) {
        sentenceGroups.push(sentences[i].trim());
      }
    }

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array: string[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledSentences = shuffleArray(sentenceGroups);
    setOutput(shuffledSentences.join(' '));
  }, [inputText]);

  const randomizeAgain = () => {
    if (!inputText.trim()) return;
    
    // Split by sentence delimiters (., !, ?)
    const sentences = inputText.split(/([.!?]+)/).filter(part => part.trim() !== '');
    
    // Group sentences with their punctuation
    const sentenceGroups: string[] = [];
    for (let i = 0; i < sentences.length; i += 2) {
      if (sentences[i] && sentences[i + 1]) {
        sentenceGroups.push((sentences[i] + sentences[i + 1]).trim());
      } else if (sentences[i]) {
        sentenceGroups.push(sentences[i].trim());
      }
    }

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array: string[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledSentences = shuffleArray(sentenceGroups);
    setOutput(shuffledSentences.join(' '));
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Randomized text sentences copied to clipboard",
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
            <Shuffle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Randomize Text Sentences</CardTitle>
          </div>
          <CardDescription>Shuffle the order of sentences in your text randomly</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with multiple sentences..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Randomized Text Sentences:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Randomized text sentences will appear here..."
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Example:</strong> Each sentence will be shuffled randomly while preserving punctuation. Works with periods, exclamation marks, and question marks.
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

export default RandomizeTextSentences;