import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ExtractTextFragment() {
  const [inputText, setInputText] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.');
  const [startPosition, setStartPosition] = useState<string>('0');
  const [endPosition, setEndPosition] = useState<string>('50');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const start = parseInt(startPosition) || 0;
    const end = parseInt(endPosition) || inputText.length;
    
    // Ensure valid range
    const validStart = Math.max(0, Math.min(start, inputText.length));
    const validEnd = Math.max(validStart, Math.min(end, inputText.length));
    
    const fragment = inputText.substring(validStart, validEnd);
    setOutput(fragment);
  }, [inputText, startPosition, endPosition]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text fragment copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const extractWords = (wordStart: number, wordEnd: number) => {
    const words = inputText.split(/\s+/);
    const validWordStart = Math.max(0, Math.min(wordStart, words.length));
    const validWordEnd = Math.max(validWordStart, Math.min(wordEnd, words.length));
    
    const wordFragment = words.slice(validWordStart, validWordEnd).join(' ');
    setOutput(wordFragment);
  };

  const presetRanges = [
    { name: "First 50 chars", start: 0, end: 50 },
    { name: "First 100 chars", start: 0, end: 100 },
    { name: "Middle 50%", start: Math.floor(inputText.length * 0.25), end: Math.floor(inputText.length * 0.75) },
    { name: "Last 50 chars", start: Math.max(0, inputText.length - 50), end: inputText.length },
    { name: "First 10 words", start: 0, end: 10, type: "words" },
    { name: "Last 10 words", start: Math.max(0, inputText.split(/\s+/).length - 10), end: inputText.split(/\s+/).length, type: "words" },
  ];

  const applyPreset = (preset: any) => {
    if (preset.type === "words") {
      extractWords(preset.start, preset.end);
      setStartPosition(preset.start.toString());
      setEndPosition(preset.end.toString());
    } else {
      setStartPosition(preset.start.toString());
      setEndPosition(preset.end.toString());
    }
  };

  const textLength = inputText.length;
  const wordCount = inputText.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <Scissors className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <CardTitle className="text-2xl">Extract Text Fragment</CardTitle>
          </div>
          <CardDescription>Extract a specific portion of text by character position or word range</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to extract fragment from..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {textLength} characters, {wordCount} words
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-position">Start Position:</Label>
              <Input
                id="start-position"
                data-testid="input-start"
                type="number"
                placeholder="0"
                value={startPosition}
                onChange={(e) => setStartPosition(e.target.value)}
                className="mt-2"
                min="0"
                max={textLength}
              />
            </div>
            <div>
              <Label htmlFor="end-position">End Position:</Label>
              <Input
                id="end-position"
                data-testid="input-end"
                type="number"
                placeholder="50"
                value={endPosition}
                onChange={(e) => setEndPosition(e.target.value)}
                className="mt-2"
                min="0"
                max={textLength}
              />
            </div>
          </div>

          <div>
            <Label>Quick Presets:</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {presetRanges.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="output">Extracted Fragment:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Extracted text fragment will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              {output.length} characters extracted
            </p>
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/20 p-3 rounded-lg">
            <p className="text-sm text-teal-700 dark:text-teal-300">
              <strong>Example:</strong> Extract characters from position 0 to 50 to get the first 50 characters of your text. Use word-based presets for extracting complete words.
            </p>
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Fragment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExtractTextFragment;