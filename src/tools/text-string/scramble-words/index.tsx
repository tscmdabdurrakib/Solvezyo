import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ScrambleWords() {
  const [inputText, setInputText] = useState<string>('Hello World! Welcome to ToolNexas Programming Tools and Solutions');
  const [preserveFirstLetter, setPreserveFirstLetter] = useState<boolean>(true);
  const [preserveLastLetter, setPreserveLastLetter] = useState<boolean>(true);
  const [minWordLength, setMinWordLength] = useState<number>(4);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const scrambleWord = (word: string) => {
    // Don't scramble short words or words with only letters and no alphabetic characters
    if (word.length < minWordLength || !/[a-zA-Z]/.test(word)) {
      return word;
    }
    
    // Extract letters and their positions
    const chars = word.split('');
    const letters: { char: string; index: number }[] = [];
    
    chars.forEach((char, index) => {
      if (/[a-zA-Z]/.test(char)) {
        letters.push({ char, index });
      }
    });
    
    if (letters.length < 3) return word; // Need at least 3 letters to scramble meaningfully
    
    // Determine which letters to scramble
    let lettersToScramble = letters.map(l => l.char);
    let startIndex = 0;
    let endIndex = lettersToScramble.length;
    
    if (preserveFirstLetter && lettersToScramble.length > 1) {
      startIndex = 1;
    }
    
    if (preserveLastLetter && lettersToScramble.length > 1) {
      endIndex = lettersToScramble.length - 1;
    }
    
    // Only scramble the middle portion
    if (startIndex < endIndex) {
      const middleLetters = lettersToScramble.slice(startIndex, endIndex);
      const scrambledMiddle = shuffleArray(middleLetters);
      
      // Reconstruct the letters array
      lettersToScramble = [
        ...lettersToScramble.slice(0, startIndex),
        ...scrambledMiddle,
        ...lettersToScramble.slice(endIndex)
      ];
    }
    
    // Rebuild the word with scrambled letters
    let letterIndex = 0;
    return chars.map(char => {
      if (/[a-zA-Z]/.test(char)) {
        return lettersToScramble[letterIndex++];
      }
      return char;
    }).join('');
  };

  const scrambleText = () => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split by whitespace but preserve the whitespace
    const parts = inputText.split(/(\s+)/);
    
    const scrambledParts = parts.map(part => {
      if (/^\s+$/.test(part)) {
        return part; // Return whitespace as is
      }
      return scrambleWord(part);
    });
    
    setOutput(scrambledParts.join(''));
  };

  useEffect(() => {
    scrambleText();
  }, [inputText, preserveFirstLetter, preserveLastLetter, minWordLength]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Scrambled words copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <Shuffle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-2xl">Scramble Words</CardTitle>
          </div>
          <CardDescription>Scramble letters within each word while keeping words readable</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to scramble words..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Words will be scrambled while potentially keeping first and last letters intact for readability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preserve-first-letter"
                  data-testid="checkbox-preserve-first"
                  checked={preserveFirstLetter}
                  onChange={(e) => setPreserveFirstLetter(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-first-letter">Preserve first letter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preserve-last-letter"
                  data-testid="checkbox-preserve-last"
                  checked={preserveLastLetter}
                  onChange={(e) => setPreserveLastLetter(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-last-letter">Preserve last letter</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor="min-word-length">Min word length: {minWordLength}</Label>
                <input
                  type="range"
                  id="min-word-length"
                  data-testid="slider-min-length"
                  min="3"
                  max="10"
                  value={minWordLength}
                  onChange={(e) => setMinWordLength(parseInt(e.target.value))}
                  className="w-full mt-1"
                />
                <p className="text-xs text-muted-foreground">Words shorter than this won't be scrambled</p>
              </div>
              <Button
                onClick={scrambleText}
                data-testid="button-scramble"
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Shuffle className="mr-2 h-3 w-3" />
                Scramble Again
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Scrambled Words:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Scrambled words will appear here..."
            />
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

export default ScrambleWords;