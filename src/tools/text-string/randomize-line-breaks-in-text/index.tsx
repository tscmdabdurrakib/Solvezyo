import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RandomizeLineBreaksInText() {
  const [inputText, setInputText] = useState<string>('Randomize line breaks in your text. This tool will randomly place line breaks at different positions creating a unique text layout.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const randomizeLineBreaks = (text: string): string => {
    if (!text) return text;

    // Remove existing line breaks first
    const cleanText = text.replace(/\r?\n|\r/g, ' ');
    const words = cleanText.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 0) return text;

    const result = [];
    let currentLine = [];
    
    for (let i = 0; i < words.length; i++) {
      currentLine.push(words[i]);
      
      // Randomly decide whether to break the line
      // Higher chance for longer lines, lower chance for short lines
      const lineLength = currentLine.length;
      const breakChance = Math.min(0.3, lineLength * 0.05);
      
      if (Math.random() < breakChance && lineLength > 2) {
        result.push(currentLine.join(' '));
        currentLine = [];
      }
    }
    
    // Add remaining words
    if (currentLine.length > 0) {
      result.push(currentLine.join(' '));
    }
    
    return result.join('\n');
  };

  const generateRandomizedText = () => {
    if (!inputText) {
      setOutput('');
      return;
    }
    const randomizedText = randomizeLineBreaks(inputText);
    setOutput(randomizedText);
  };

  useEffect(() => {
    generateRandomizedText();
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "Randomized text copied to clipboard" });
    } catch (err) {
      toast({ title: "Failed to copy", description: "Please try again", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <Shuffle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Randomize Line Breaks in Text</CardTitle>
          </div>
          <CardDescription>Randomly distribute line breaks throughout your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Randomized Text:</Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Randomized text will appear here..."
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={generateRandomizedText} className="flex-1" disabled={!inputText}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Randomize Again
            </Button>
            <Button onClick={copyToClipboard} className="flex-1" disabled={!output}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Result
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RandomizeLineBreaksInText;