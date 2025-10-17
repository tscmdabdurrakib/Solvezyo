import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Copy as CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function DuplicateSentencesInText() {
  const [inputText, setInputText] = useState<string>('This is the first sentence. Here is the second sentence! And this is the third sentence?');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    // Split text into paragraphs
    const paragraphs = inputText.split('\n\n');
    const processedParagraphs = paragraphs.map(paragraph => {
      if (paragraph.trim() === '') return paragraph;
      
      // Split paragraph into sentences using multiple delimiters
      const sentences = paragraph.split(/([.!?]+\s*)/).filter(Boolean);
      
      // Group sentences with their punctuation and duplicate them
      const duplicatedSentences: string[] = [];
      for (let i = 0; i < sentences.length; i += 2) {
        const sentence = sentences[i]?.trim();
        const punctuation = sentences[i + 1] || '';
        if (sentence) {
          const fullSentence = sentence + punctuation;
          duplicatedSentences.push(fullSentence);
          duplicatedSentences.push(fullSentence); // Duplicate
        }
      }
      
      return duplicatedSentences.join(' ').trim();
    });
    
    setOutput(processedParagraphs.join('\n\n'));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text with duplicated sentences copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            <CopyIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Duplicate Sentences in Text</CardTitle>
          </div>
          <CardDescription>Duplicate each sentence in your text for emphasis</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text with sentences to duplicate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Text with Duplicated Sentences:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Text with duplicated sentences will appear here..."
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Example:</strong> "Hello world. How are you?" becomes "Hello world. Hello world. How are you? How are you?"
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Sentences are detected by periods (.), exclamation marks (!), and question marks (?)
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

export default DuplicateSentencesInText;
