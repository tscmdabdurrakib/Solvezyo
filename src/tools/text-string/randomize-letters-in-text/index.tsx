import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RandomizeLettersInText() {
  const [inputText, setInputText] = useState<string>('Hello World! Welcome to ToolNexas Programming Tools');
  const [preserveSpaces, setPreserveSpaces] = useState<boolean>(true);
  const [preserveCase, setPreserveCase] = useState<boolean>(false);
  const [preservePunctuation, setPreservePunctuation] = useState<boolean>(true);
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

  const randomizeText = () => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (preserveSpaces) {
      // Process word by word to preserve spaces
      const words = inputText.split(/(\s+)/);
      const randomizedWords = words.map(word => {
        if (/^\s+$/.test(word)) return word; // Return whitespace as is
        
        let letters = word.split('');
        
        if (preservePunctuation) {
          // Separate letters from punctuation
          const letterPositions: { char: string; index: number; isLetter: boolean }[] = [];
          letters.forEach((char, index) => {
            letterPositions.push({
              char,
              index,
              isLetter: /[a-zA-Z]/.test(char)
            });
          });
          
          const onlyLetters = letterPositions.filter(item => item.isLetter).map(item => item.char);
          const shuffledLetters = shuffleArray(onlyLetters);
          
          let letterIndex = 0;
          return letterPositions.map(item => {
            if (item.isLetter) {
              return shuffledLetters[letterIndex++];
            }
            return item.char;
          }).join('');
        } else {
          return shuffleArray(letters).join('');
        }
      });
      
      setOutput(randomizedWords.join(''));
    } else {
      // Randomize all letters globally
      let letters = inputText.split('').filter(char => /[a-zA-Z]/.test(char));
      
      if (preserveCase) {
        const upperCase = letters.filter(char => char === char.toUpperCase());
        const lowerCase = letters.filter(char => char === char.toLowerCase());
        const shuffledUpper = shuffleArray(upperCase);
        const shuffledLower = shuffleArray(lowerCase);
        
        let upperIndex = 0;
        let lowerIndex = 0;
        
        const result = inputText.split('').map(char => {
          if (/[A-Z]/.test(char)) {
            return shuffledUpper[upperIndex++] || char;
          } else if (/[a-z]/.test(char)) {
            return shuffledLower[lowerIndex++] || char;
          }
          return char;
        });
        
        setOutput(result.join(''));
      } else {
        const shuffledLetters = shuffleArray(letters);
        let letterIndex = 0;
        
        const result = inputText.split('').map(char => {
          if (/[a-zA-Z]/.test(char)) {
            return shuffledLetters[letterIndex++] || char;
          }
          return char;
        });
        
        setOutput(result.join(''));
      }
    }
  };

  useEffect(() => {
    randomizeText();
  }, [inputText, preserveSpaces, preserveCase, preservePunctuation]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Randomized text copied to clipboard",
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
            <Shuffle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-2xl">Randomize Letters in Text</CardTitle>
          </div>
          <CardDescription>Randomly shuffle letters in your text with various options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to randomize letters..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preserve-spaces"
                  data-testid="checkbox-preserve-spaces"
                  checked={preserveSpaces}
                  onChange={(e) => setPreserveSpaces(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-spaces">Preserve word boundaries</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preserve-punctuation"
                  data-testid="checkbox-preserve-punctuation"
                  checked={preservePunctuation}
                  onChange={(e) => setPreservePunctuation(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-punctuation">Preserve punctuation</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preserve-case"
                  data-testid="checkbox-preserve-case"
                  checked={preserveCase}
                  onChange={(e) => setPreserveCase(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-case">Preserve case distribution</Label>
              </div>
              <Button
                onClick={randomizeText}
                data-testid="button-randomize"
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Shuffle className="mr-2 h-3 w-3" />
                Randomize Again
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Randomized Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Randomized text will appear here..."
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

export default RandomizeLettersInText;