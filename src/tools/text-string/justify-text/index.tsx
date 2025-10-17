import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, AlignJustify } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function JustifyText() {
  const [inputText, setInputText] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.');
  const [lineWidth, setLineWidth] = useState<number>(80);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const paragraphs = inputText.split('\n\n');
    const justifiedParagraphs = paragraphs.map(paragraph => {
      if (paragraph.trim() === '') return paragraph;
      
      const words = paragraph.trim().split(/\s+/);
      if (words.length === 1) return words[0];
      
      const lines: string[] = [];
      let currentLine: string[] = [];
      let currentLength = 0;
      
      for (const word of words) {
        // Check if adding this word would exceed line width
        const spaceNeeded = currentLine.length > 0 ? 1 : 0;
        if (currentLength + spaceNeeded + word.length > lineWidth && currentLine.length > 0) {
          // Justify the current line (except if it's the last line)
          lines.push(justifyLine(currentLine, lineWidth));
          currentLine = [word];
          currentLength = word.length;
        } else {
          currentLine.push(word);
          currentLength += spaceNeeded + word.length;
        }
      }
      
      // Add the last line without justification
      if (currentLine.length > 0) {
        lines.push(currentLine.join(' '));
      }
      
      return lines.join('\n');
    });
    
    setOutput(justifiedParagraphs.join('\n\n'));
  }, [inputText, lineWidth]);

  const justifyLine = (words: string[], targetWidth: number): string => {
    if (words.length === 1) return words[0];
    
    const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
    const totalSpaces = targetWidth - totalWordLength;
    const gaps = words.length - 1;
    
    if (gaps === 0) return words[0];
    
    const spacesPerGap = Math.floor(totalSpaces / gaps);
    const extraSpaces = totalSpaces % gaps;
    
    let result = '';
    for (let i = 0; i < words.length; i++) {
      result += words[i];
      if (i < words.length - 1) {
        result += ' '.repeat(spacesPerGap + (i < extraSpaces ? 1 : 0));
      }
    }
    
    return result;
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Justified text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-center gap-2">
            <AlignJustify className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Justify Text</CardTitle>
          </div>
          <CardDescription>Justify text by evenly distributing spaces between words</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to justify..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="line-width">Line Width: {lineWidth}</Label>
            <Input
              id="line-width"
              data-testid="input-line-width"
              type="number"
              min="20"
              max="200"
              value={lineWidth}
              onChange={(e) => setLineWidth(parseInt(e.target.value) || 80)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">Maximum characters per line</p>
          </div>

          <div>
            <Label htmlFor="output">Justified Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Justified text will appear here..."
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

export default JustifyText;
