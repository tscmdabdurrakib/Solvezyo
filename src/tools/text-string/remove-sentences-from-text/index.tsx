import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RemoveSentencesFromText() {
  const [inputText, setInputText] = useState<string>('This is the first sentence. Here is the second sentence! And this is the third sentence? This should be removed.');
  const [sentencesToRemove, setSentencesToRemove] = useState<string>('second, removed');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    if (!sentencesToRemove.trim()) {
      setOutput(inputText);
      return;
    }
    
    // Parse keywords for sentences to remove
    const keywords = sentencesToRemove
      .split(',')
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0);
    
    if (keywords.length === 0) {
      setOutput(inputText);
      return;
    }
    
    // Split text into paragraphs
    const paragraphs = inputText.split('\n\n');
    const processedParagraphs = paragraphs.map(paragraph => {
      if (paragraph.trim() === '') return paragraph;
      
      // Split paragraph into sentences
      const sentences = paragraph.split(/([.!?]+\s*)/).filter(Boolean);
      
      // Group sentences with their punctuation
      const groupedSentences: string[] = [];
      for (let i = 0; i < sentences.length; i += 2) {
        const sentence = sentences[i]?.trim();
        const punctuation = sentences[i + 1] || '';
        if (sentence) {
          groupedSentences.push(sentence + punctuation);
        }
      }
      
      // Filter out sentences containing keywords
      const filteredSentences = groupedSentences.filter(sentence => {
        const sentenceText = caseSensitive ? sentence : sentence.toLowerCase();
        return !keywords.some(keyword => {
          const keywordText = caseSensitive ? keyword : keyword.toLowerCase();
          return sentenceText.includes(keywordText);
        });
      });
      
      return filteredSentences.join(' ').trim();
    });
    
    setOutput(processedParagraphs.filter(p => p.trim() !== '').join('\n\n'));
  }, [inputText, sentencesToRemove, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with removed sentences copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-center gap-2">
            <Scissors className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-2xl">Remove Sentences from Text</CardTitle>
          </div>
          <CardDescription>Remove sentences containing specific keywords from your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to remove sentences from..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sentences-to-remove">Keywords to Remove Sentences (comma-separated):</Label>
              <Input
                id="sentences-to-remove"
                data-testid="input-sentences-to-remove"
                placeholder="keyword1, keyword2, keyword3"
                value={sentencesToRemove}
                onChange={(e) => setSentencesToRemove(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="case-sensitive"
                data-testid="checkbox-case-sensitive"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="case-sensitive">Case sensitive</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Text with Sentences Removed:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with removed sentences will appear here..."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>How it works:</strong> Any sentence containing the specified keywords will be removed.
            </p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              Example: Remove sentences with "bad" → "This is good. This is bad." becomes "This is good."
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

export default RemoveSentencesFromText;
