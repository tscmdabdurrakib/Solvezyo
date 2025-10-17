import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddRandomWordsToText() {
  const [inputText, setInputText] = useState<string>('The cat sat on the mat. It was a sunny day.');
  const [randomWords, setRandomWords] = useState<string>('amazing, beautiful, wonderful, fantastic, incredible');
  const [wordsToAdd, setWordsToAdd] = useState<number>(3);
  const [addPosition, setAddPosition] = useState<string>('random'); // 'random', 'end', 'start'
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (!randomWords.trim() || wordsToAdd <= 0) {
      setOutput(inputText);
      return;
    }
    
    // Parse random words
    const wordsArray = randomWords
      .split(',')
      .map(word => word.trim())
      .filter(word => word.length > 0);
    
    if (wordsArray.length === 0) {
      setOutput(inputText);
      return;
    }
    
    // Select random words to add
    const selectedWords: string[] = [];
    for (let i = 0; i < wordsToAdd; i++) {
      const randomIndex = Math.floor(Math.random() * wordsArray.length);
      selectedWords.push(wordsArray[randomIndex]);
    }
    
    let result = inputText;
    
    if (addPosition === 'start') {
      result = selectedWords.join(' ') + ' ' + result;
    } else if (addPosition === 'end') {
      result = result + ' ' + selectedWords.join(' ');
    } else {
      // Random positions - insert words at random positions
      const words = result.split(' ');
      
      selectedWords.forEach(wordToAdd => {
        const randomPos = Math.floor(Math.random() * (words.length + 1));
        words.splice(randomPos, 0, wordToAdd);
      });
      
      result = words.join(' ');
    }
    
    setOutput(result);
  }, [inputText, randomWords, wordsToAdd, addPosition]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with added random words copied to clipboard",
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
    setWordsToAdd(prev => prev);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Add Random Words to Text</CardTitle>
          </div>
          <CardDescription>Insert random words into your text at specified positions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to add random words to..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="random-words">Random Words Pool (comma-separated):</Label>
            <Input
              id="random-words"
              data-testid="input-random-words"
              placeholder="word1, word2, word3, ..."
              value={randomWords}
              onChange={(e) => setRandomWords(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="words-to-add">Number of Words to Add: {wordsToAdd}</Label>
              <Input
                id="words-to-add"
                data-testid="input-words-to-add"
                type="number"
                min="1"
                max="20"
                value={wordsToAdd}
                onChange={(e) => setWordsToAdd(parseInt(e.target.value) || 1)}
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
                <option value="random">Random positions</option>
                <option value="start">At the beginning</option>
                <option value="end">At the end</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Added Random Words:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with added random words will appear here..."
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>How it works:</strong> Random words are selected from your pool and inserted at the chosen position.
            </p>
            <Button
              onClick={regenerate}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Regenerate Random Words
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

export default AddRandomWordsToText;
