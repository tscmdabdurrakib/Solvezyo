import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, CornerDownLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddLineBreaksToText() {
  const [inputText, setInputText] = useState<string>('Add line breaks to text after specific intervals. This tool helps format long text into readable chunks by adding line breaks at regular positions.');
  const [output, setOutput] = useState<string>('');
  const [breakType, setBreakType] = useState<string>('characters');
  const [breakInterval, setBreakInterval] = useState<number>(50);
  const { toast } = useToast();

  const addLineBreaks = (text: string, type: string, interval: number): string => {
    if (!text || interval <= 0) return text;

    switch (type) {
      case 'characters':
        return text.replace(new RegExp(`(.{${interval}})`, 'g'), '$1\n');
      
      case 'words':
        const words = text.split(/\s+/);
        const chunks = [];
        for (let i = 0; i < words.length; i += interval) {
          chunks.push(words.slice(i, i + interval).join(' '));
        }
        return chunks.join('\n');
      
      case 'sentences':
        const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text];
        const sentenceChunks = [];
        for (let i = 0; i < sentences.length; i += interval) {
          sentenceChunks.push(sentences.slice(i, i + interval).join(' '));
        }
        return sentenceChunks.join('\n');
      
      default:
        return text;
    }
  };

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    const textWithLineBreaks = addLineBreaks(inputText, breakType, breakInterval);
    setOutput(textWithLineBreaks);
  }, [inputText, breakType, breakInterval]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with line breaks copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <CornerDownLeft className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Add Line Breaks to Text</CardTitle>
          </div>
          <CardDescription>Insert line breaks at specific intervals in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="break-type">Break Type:</Label>
              <Select value={breakType} onValueChange={setBreakType}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select break type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="characters">Characters</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="break-interval">Break Interval:</Label>
              <Input
                id="break-interval"
                type="number"
                min={1}
                value={breakInterval}
                onChange={(e) => setBreakInterval(parseInt(e.target.value) || 1)}
                className="mt-2"
                placeholder="Enter interval..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Line Breaks:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with line breaks will appear here..."
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Example:</strong> Break every {breakInterval} {breakType} - perfect for formatting long text into readable chunks!
            </p>
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

export default AddLineBreaksToText;