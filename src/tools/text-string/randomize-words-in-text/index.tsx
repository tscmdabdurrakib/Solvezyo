import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RandomizeWordsInText() {
  const [inputText, setInputText] = useState<string>('Hello world! Welcome to ToolNexas programming tools and solutions for developers.');
  const [preserveSentenceStructure, setPreserveSentenceStructure] = useState<boolean>(true);
  const [preservePunctuation, setPreservePunctuation] = useState<boolean>(true);
  const [preserveCapitalization, setPreserveCapitalization] = useState<boolean>(false);
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
    
    if (preserveSentenceStructure) {
      // Split into sentences and randomize words within each sentence
      const sentences = inputText.split(/(?<=[.!?])\s+/);
      
      const randomizedSentences = sentences.map(sentence => {
        if (!sentence.trim()) return sentence;
        
        // Extract punctuation from the end
        const match = sentence.match(/^(.*?)([.!?]*)$/);
        const mainText = match ? match[1] : sentence;
        const endPunct = match ? match[2] : '';
        
        // Split into words
        const words = mainText.split(/\s+/).filter(word => word.trim().length > 0);
        
        if (words.length <= 1) return sentence;
        
        // Process words to separate punctuation if needed
        let processedWords = words;
        if (preservePunctuation) {
          processedWords = words.map(word => {
            const punctMatch = word.match(/^(.*?)([^\w\s]*)$/);
            return punctMatch ? punctMatch[1] : word;
          });
        }
        
        // Shuffle the words
        const shuffledWords = shuffleArray(processedWords);
        
        // Handle capitalization
        if (preserveCapitalization && shuffledWords.length > 0) {
          // Ensure first word is capitalized and others are lowercase
          shuffledWords[0] = shuffledWords[0].charAt(0).toUpperCase() + shuffledWords[0].slice(1).toLowerCase();
          for (let i = 1; i < shuffledWords.length; i++) {
            shuffledWords[i] = shuffledWords[i].toLowerCase();
          }
        }
        
        // Reconstruct with original punctuation if preserved
        if (preservePunctuation) {
          const wordsWithPunct = shuffledWords.map((word, index) => {
            if (index < words.length) {
              const originalWord = words[index];
              const punctMatch = originalWord.match(/([^\w\s]*)$/);
              return word + (punctMatch ? punctMatch[1] : '');
            }
            return word;
          });
          return wordsWithPunct.join(' ') + endPunct;
        }
        
        return shuffledWords.join(' ') + endPunct;
      });
      
      setOutput(randomizedSentences.join(' '));
    } else {
      // Randomize all words globally
      const words = inputText.split(/\s+/).filter(word => word.trim().length > 0);
      
      let processedWords = words;
      if (preservePunctuation) {
        processedWords = words.map(word => {
          return word.replace(/[^\w\s]/g, '');
        });
      }
      
      const shuffledWords = shuffleArray(processedWords);
      
      // Reconstruct text
      let wordIndex = 0;
      const result = inputText.split(/(\s+)/).map(part => {
        if (/^\s+$/.test(part)) {
          return part; // Keep whitespace
        } else if (part.trim().length > 0) {
          if (wordIndex < shuffledWords.length) {
            let newWord = shuffledWords[wordIndex++];
            
            if (preservePunctuation) {
              // Try to preserve original punctuation pattern
              const punctMatch = part.match(/([^\w\s]*)$/);
              if (punctMatch) {
                newWord += punctMatch[1];
              }
            }
            
            return newWord;
          }
        }
        return part;
      }).join('');
      
      setOutput(result);
    }
  };

  useEffect(() => {
    randomizeText();
  }, [inputText, preserveSentenceStructure, preservePunctuation, preserveCapitalization]);

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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <Shuffle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Randomize Words in Text</CardTitle>
          </div>
          <CardDescription>Randomly shuffle the order of words in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to randomize word order..."
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
                  id="preserve-sentence-structure"
                  data-testid="checkbox-preserve-sentences"
                  checked={preserveSentenceStructure}
                  onChange={(e) => setPreserveSentenceStructure(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-sentence-structure">Preserve sentence boundaries</Label>
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
                  id="preserve-capitalization"
                  data-testid="checkbox-preserve-capitalization"
                  checked={preserveCapitalization}
                  onChange={(e) => setPreserveCapitalization(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserve-capitalization">Fix capitalization</Label>
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

export default RandomizeWordsInText;