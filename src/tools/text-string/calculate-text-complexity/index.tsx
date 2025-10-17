import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComplexityMetrics {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  avgWordLength: number;
  avgSentenceLength: number;
  readingTime: number;
  complexityScore: number;
  readabilityLevel: string;
}

function CalculateTextComplexity() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. This is a sample text to analyze complexity. It contains multiple sentences and paragraphs.\n\nText complexity analysis helps understand readability.');
  const [metrics, setMetrics] = useState<ComplexityMetrics | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setMetrics(null);
      return;
    }

    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    const words = inputText.trim().split(/\s+/).filter(w => w.length > 0).length;
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = inputText.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    
    const avgWordLength = charactersNoSpaces / (words || 1);
    const avgSentenceLength = words / (sentences || 1);
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words/min
    
    // Simplified Flesch-Kincaid complexity
    const complexityScore = Math.round(
      0.39 * avgSentenceLength + 11.8 * (avgWordLength / 5) - 15.59
    );
    
    let readabilityLevel = 'Very Easy';
    if (complexityScore < 30) readabilityLevel = 'Very Easy';
    else if (complexityScore < 50) readabilityLevel = 'Easy';
    else if (complexityScore < 60) readabilityLevel = 'Fairly Easy';
    else if (complexityScore < 70) readabilityLevel = 'Standard';
    else if (complexityScore < 80) readabilityLevel = 'Fairly Difficult';
    else if (complexityScore < 90) readabilityLevel = 'Difficult';
    else readabilityLevel = 'Very Difficult';

    setMetrics({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      avgWordLength: Math.round(avgWordLength * 10) / 10,
      avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
      readingTime,
      complexityScore: Math.max(0, complexityScore),
      readabilityLevel
    });
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!metrics) return;
    
    const result = `Text Complexity Analysis:
Characters: ${metrics.characters}
Characters (no spaces): ${metrics.charactersNoSpaces}
Words: ${metrics.words}
Sentences: ${metrics.sentences}
Paragraphs: ${metrics.paragraphs}
Average Word Length: ${metrics.avgWordLength}
Average Sentence Length: ${metrics.avgSentenceLength}
Reading Time: ${metrics.readingTime} min
Complexity Score: ${metrics.complexityScore}
Readability Level: ${metrics.readabilityLevel}`;
    
    try {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Complexity analysis copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Calculate Text Complexity</CardTitle>
          </div>
          <CardDescription>Analyze readability and complexity metrics of your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter or paste your text here to analyze..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-40 mt-2"
            />
          </div>

          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-50 dark:bg-gray-900">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Characters:</span>
                      <span className="text-sm font-bold">{metrics.characters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Characters (no spaces):</span>
                      <span className="text-sm font-bold">{metrics.charactersNoSpaces}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Words:</span>
                      <span className="text-sm font-bold">{metrics.words}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Sentences:</span>
                      <span className="text-sm font-bold">{metrics.sentences}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Paragraphs:</span>
                      <span className="text-sm font-bold">{metrics.paragraphs}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 dark:bg-gray-900">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Avg Word Length:</span>
                      <span className="text-sm font-bold">{metrics.avgWordLength}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Avg Sentence Length:</span>
                      <span className="text-sm font-bold">{metrics.avgSentenceLength}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Reading Time:</span>
                      <span className="text-sm font-bold">{metrics.readingTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Complexity Score:</span>
                      <span className="text-sm font-bold">{metrics.complexityScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Readability:</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{metrics.readabilityLevel}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Tip:</strong> Lower complexity scores indicate easier readability. Ideal for content optimization and SEO!
            </p>
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!metrics}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CalculateTextComplexity;
