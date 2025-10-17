import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function IntroduceErrorsInText() {
  const [inputText, setInputText] = useState<string>('This is a perfectly written text without any errors. It should be clear and easy to read.');
  const [errorRate, setErrorRate] = useState<number>(10); // Percentage
  const [errorTypes, setErrorTypes] = useState<{
    typos: boolean;
    missingLetters: boolean;
    extraLetters: boolean;
    swappedLetters: boolean;
  }>({
    typos: true,
    missingLetters: true,
    extraLetters: false,
    swappedLetters: false,
  });
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (errorRate <= 0) {
      setOutput(inputText);
      return;
    }
    
    const introduceErrors = (text: string): string => {
      const words = text.split(/(\s+)/);
      
      return words.map(word => {
        // Skip whitespace and punctuation-only segments
        if (!/[a-zA-Z]/.test(word)) {
          return word;
        }
        
        // Decide whether to introduce error based on error rate
        if (Math.random() * 100 > errorRate) {
          return word;
        }
        
        // Choose random error type from enabled types
        const enabledTypes = Object.entries(errorTypes)
          .filter(([_, enabled]) => enabled)
          .map(([type, _]) => type);
        
        if (enabledTypes.length === 0) {
          return word;
        }
        
        const errorType = enabledTypes[Math.floor(Math.random() * enabledTypes.length)];
        
        return applyError(word, errorType);
      }).join('');
    };
    
    const applyError = (word: string, errorType: string): string => {
      const letters = word.split('');
      const letterIndices = letters
        .map((char, index) => /[a-zA-Z]/.test(char) ? index : -1)
        .filter(index => index !== -1);
      
      if (letterIndices.length === 0) return word;
      
      const randomIndex = letterIndices[Math.floor(Math.random() * letterIndices.length)];
      
      switch (errorType) {
        case 'typos':
          // Replace with a similar looking letter
          const typoMap: { [key: string]: string[] } = {
            'a': ['s', 'q'], 'b': ['v', 'n'], 'c': ['x', 'v'], 'd': ['s', 'f'],
            'e': ['w', 'r'], 'f': ['d', 'g'], 'g': ['f', 'h'], 'h': ['g', 'j'],
            'i': ['u', 'o'], 'j': ['h', 'k'], 'k': ['j', 'l'], 'l': ['k', 'o'],
            'm': ['n', 'b'], 'n': ['b', 'm'], 'o': ['i', 'p'], 'p': ['o', 'l'],
            'q': ['w', 'a'], 'r': ['e', 't'], 's': ['a', 'd'], 't': ['r', 'y'],
            'u': ['y', 'i'], 'v': ['c', 'b'], 'w': ['q', 'e'], 'x': ['z', 'c'],
            'y': ['t', 'u'], 'z': ['x', 's']
          };
          const originalChar = letters[randomIndex].toLowerCase();
          const replacements = typoMap[originalChar];
          if (replacements) {
            const replacement = replacements[Math.floor(Math.random() * replacements.length)];
            letters[randomIndex] = letters[randomIndex] === letters[randomIndex].toUpperCase() 
              ? replacement.toUpperCase() 
              : replacement;
          }
          break;
          
        case 'missingLetters':
          // Remove a random letter
          letters.splice(randomIndex, 1);
          break;
          
        case 'extraLetters':
          // Add a random letter
          const randomLetter = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
          const insertLetter = letters[randomIndex] === letters[randomIndex].toUpperCase() 
            ? randomLetter.toUpperCase() 
            : randomLetter;
          letters.splice(randomIndex, 0, insertLetter);
          break;
          
        case 'swappedLetters':
          // Swap adjacent letters
          if (randomIndex < letters.length - 1 && /[a-zA-Z]/.test(letters[randomIndex + 1])) {
            [letters[randomIndex], letters[randomIndex + 1]] = [letters[randomIndex + 1], letters[randomIndex]];
          }
          break;
      }
      
      return letters.join('');
    };
    
    setOutput(introduceErrors(inputText));
  }, [inputText, errorRate, errorTypes]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with introduced errors copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const regenerate = () => {
    // Force re-render by updating a dependency
    setErrorRate(prev => prev);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <CardTitle className="text-2xl">Introduce Errors in Text</CardTitle>
          </div>
          <CardDescription>Add realistic typing errors to your text for testing purposes</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter clean text to introduce errors..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="error-rate">Error Rate: {errorRate}%</Label>
            <Input
              id="error-rate"
              data-testid="input-error-rate"
              type="number"
              min="0"
              max="100"
              value={errorRate}
              onChange={(e) => setErrorRate(parseInt(e.target.value) || 0)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">Percentage of words that will have errors</p>
          </div>

          <div>
            <Label className="mb-2 block">Error Types:</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(errorTypes).map(([type, enabled]) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setErrorTypes(prev => ({
                      ...prev,
                      [type]: e.target.checked
                    }))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Introduced Errors:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with errors will appear here..."
            />
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>Use cases:</strong> Testing spell checkers, creating practice texts, simulating real typing errors.
            </p>
            <Button
              onClick={regenerate}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Generate New Errors
            </Button>
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

export default IntroduceErrorsInText;
