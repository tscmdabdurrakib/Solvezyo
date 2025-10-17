import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddRandomLettersToWords() {
  const [inputText, setInputText] = useState<string>('Hello world! This is a sample text for demonstration.');
  const [lettersToAdd, setLettersToAdd] = useState<number>(2);
  const [letterPool, setLetterPool] = useState<string>('abcdefghijklmnopqrstuvwxyz');
  const [addPosition, setAddPosition] = useState<string>('random'); // 'random', 'end', 'start'
  const [minWordLength, setMinWordLength] = useState<number>(3);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (lettersToAdd <= 0 || !letterPool.trim()) {
      setOutput(inputText);
      return;
    }
    
    const letters = letterPool.toLowerCase();
    
    const processText = (text: string): string => {
      return text.replace(/\b[a-zA-Z]+\b/g, (word) => {
        // Only process words that meet minimum length requirement
        if (word.length < minWordLength) {
          return word;
        }
        
        let modifiedWord = word;
        
        for (let i = 0; i < lettersToAdd; i++) {
          const randomLetter = letters[Math.floor(Math.random() * letters.length)];
          
          if (addPosition === 'start') {
            modifiedWord = randomLetter + modifiedWord;
          } else if (addPosition === 'end') {
            modifiedWord = modifiedWord + randomLetter;
          } else {
            // Random position within the word
            const randomPos = Math.floor(Math.random() * (modifiedWord.length + 1));
            modifiedWord = modifiedWord.slice(0, randomPos) + randomLetter + modifiedWord.slice(randomPos);
          }
        }
        
        return modifiedWord;
      });
    };
    
    setOutput(processText(inputText));
  }, [inputText, lettersToAdd, letterPool, addPosition, minWordLength]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with added random letters copied to clipboard",
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
    setLettersToAdd(prev => prev);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <Type className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Add Random Letters to Words</CardTitle>
          </div>
          <CardDescription>Insert random letters into words to create variations</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to add random letters to words..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="letter-pool">Letter Pool:</Label>
            <Input
              id="letter-pool"
              data-testid="input-letter-pool"
              placeholder="abcdefghijklmnopqrstuvwxyz"
              value={letterPool}
              onChange={(e) => setLetterPool(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="letters-to-add">Letters to Add per Word: {lettersToAdd}</Label>
              <Input
                id="letters-to-add"
                data-testid="input-letters-to-add"
                type="number"
                min="1"
                max="10"
                value={lettersToAdd}
                onChange={(e) => setLettersToAdd(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="min-word-length">Min Word Length: {minWordLength}</Label>
              <Input
                id="min-word-length"
                data-testid="input-min-word-length"
                type="number"
                min="1"
                max="20"
                value={minWordLength}
                onChange={(e) => setMinWordLength(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="mb-2 block">Add Position:</Label>
              <select
                value={addPosition}
                onChange={(e) => setAddPosition(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="random">Random in word</option>
                <option value="start">At word start</option>
                <option value="end">At word end</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Added Random Letters:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with added random letters will appear here..."
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Example:</strong> "Hello" might become "Helrablo" (adding 'r', 'a', 'b')
            </p>
            <Button
              onClick={regenerate}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Regenerate Random Letters
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

export default AddRandomLettersToWords;
