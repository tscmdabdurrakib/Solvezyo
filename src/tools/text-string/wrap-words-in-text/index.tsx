import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, WrapText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function WrapWordsInText() {
  const [inputText, setInputText] = useState<string>('This is a long sentence that will be wrapped at a specified line width to demonstrate the word wrapping functionality.');
  const [lineWidth, setLineWidth] = useState<number>(30);
  const [breakLongWords, setBreakLongWords] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const paragraphs = inputText.split('\n\n');
    const wrappedParagraphs = paragraphs.map(paragraph => {
      if (paragraph.trim() === '') return paragraph;
      
      const words = paragraph.trim().split(/\s+/);
      const lines: string[] = [];
      let currentLine = '';
      
      for (const word of words) {
        // Handle long words
        let wordToProcess = word;
        
        if (breakLongWords && word.length > lineWidth) {
          // Break long words into chunks
          const chunks = [];
          for (let i = 0; i < word.length; i += lineWidth) {
            chunks.push(word.substring(i, i + lineWidth));
          }
          
          // Process all chunks except the last one
          for (let i = 0; i < chunks.length - 1; i++) {
            if (currentLine) {
              lines.push(currentLine);
              currentLine = '';
            }
            lines.push(chunks[i]);
          }
          wordToProcess = chunks[chunks.length - 1];
        }
        
        // Check if adding this word would exceed line width
        const testLine = currentLine ? `${currentLine} ${wordToProcess}` : wordToProcess;
        
        if (testLine.length <= lineWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            lines.push(currentLine);
          }
          currentLine = wordToProcess;
        }
      }
      
      // Add the last line if it has content
      if (currentLine) {
        lines.push(currentLine);
      }
      
      return lines.join('\n');
    });
    
    setOutput(wrappedParagraphs.join('\n\n'));
  }, [inputText, lineWidth, breakLongWords]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Wrapped text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <div className="flex items-center justify-center gap-2">
            <WrapText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-2xl">Wrap Words in Text</CardTitle>
          </div>
          <CardDescription>Wrap text at a specified line width by breaking between words</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to wrap..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="line-width">Line Width: {lineWidth}</Label>
              <Input
                id="line-width"
                data-testid="input-line-width"
                type="number"
                min="10"
                max="200"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value) || 30)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Maximum characters per line</p>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="break-long-words"
                data-testid="checkbox-break-words"
                checked={breakLongWords}
                onChange={(e) => setBreakLongWords(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="break-long-words">Break long words</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Wrapped Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Wrapped text will appear here..."
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

export default WrapWordsInText;
