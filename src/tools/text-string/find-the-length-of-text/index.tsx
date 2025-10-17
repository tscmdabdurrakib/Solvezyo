import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Ruler } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FindTheLengthOfText() {
  const [inputText, setInputText] = useState<string>('Hello, World! This is a sample text to analyze. It contains multiple sentences, words, and characters.');
  const [results, setResults] = useState<any>({});
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setResults({});
      return;
    }

    // Character analysis
    const totalCharacters = inputText.length;
    const charactersWithoutSpaces = inputText.replace(/\s/g, '').length;
    const charactersWithoutWhitespace = inputText.replace(/\s+/g, '').length;
    
    // Word analysis
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const averageWordLength = wordCount > 0 ? (charactersWithoutSpaces / wordCount).toFixed(2) : 0;
    
    // Line analysis
    const lines = inputText.split('\n');
    const lineCount = lines.length;
    const nonEmptyLines = lines.filter(line => line.trim().length > 0).length;
    
    // Sentence analysis
    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const sentenceCount = sentences.length;
    
    // Paragraph analysis
    const paragraphs = inputText.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    const paragraphCount = paragraphs.length;
    
    // Character type analysis
    const alphabeticChars = (inputText.match(/[a-zA-Z]/g) || []).length;
    const numericChars = (inputText.match(/[0-9]/g) || []).length;
    const specialChars = (inputText.match(/[^a-zA-Z0-9\s]/g) || []).length;
    const spaces = (inputText.match(/\s/g) || []).length;
    
    // Whitespace analysis
    const tabs = (inputText.match(/\t/g) || []).length;
    const newlines = (inputText.match(/\n/g) || []).length;
    
    setResults({
      totalCharacters,
      charactersWithoutSpaces,
      charactersWithoutWhitespace,
      wordCount,
      averageWordLength,
      lineCount,
      nonEmptyLines,
      sentenceCount,
      paragraphCount,
      alphabeticChars,
      numericChars,
      specialChars,
      spaces,
      tabs,
      newlines,
    });
  }, [inputText]);

  const copyResults = async () => {
    if (!Object.keys(results).length) return;
    
    const resultText = `Text Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━

📊 General Statistics:
• Total Characters: ${results.totalCharacters}
• Characters (no spaces): ${results.charactersWithoutSpaces}
• Characters (no whitespace): ${results.charactersWithoutWhitespace}

📝 Content Analysis:
• Words: ${results.wordCount}
• Average Word Length: ${results.averageWordLength} characters
• Sentences: ${results.sentenceCount}
• Paragraphs: ${results.paragraphCount}
• Lines: ${results.lineCount}
• Non-empty Lines: ${results.nonEmptyLines}

🔤 Character Breakdown:
• Alphabetic Characters: ${results.alphabeticChars}
• Numeric Characters: ${results.numericChars}
• Special Characters: ${results.specialChars}
• Spaces: ${results.spaces}
• Tabs: ${results.tabs}
• Line Breaks: ${results.newlines}`;
    
    try {
      await navigator.clipboard.writeText(resultText);
      toast({
        title: "Copied!",
        description: "Text analysis results copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const StatCard = ({ title, value, description }: { title: string; value: any; description?: string }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
      <div className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
        {value}
      </div>
      <div className="text-sm font-medium text-center mt-1">{title}</div>
      {description && (
        <div className="text-xs text-muted-foreground text-center mt-1">{description}</div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <Ruler className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Find the Length of Text</CardTitle>
          </div>
          <CardDescription>Comprehensive text analysis including character, word, sentence, and paragraph counts</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to analyze..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          {Object.keys(results).length > 0 && (
            <>
              <div>
                <Label className="text-lg font-semibold">📊 General Statistics</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                  <StatCard title="Total Characters" value={results.totalCharacters} />
                  <StatCard title="Characters (no spaces)" value={results.charactersWithoutSpaces} />
                  <StatCard title="Characters (no whitespace)" value={results.charactersWithoutWhitespace} />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">📝 Content Analysis</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <StatCard title="Words" value={results.wordCount} />
                  <StatCard title="Average Word Length" value={results.averageWordLength} description="characters" />
                  <StatCard title="Sentences" value={results.sentenceCount} />
                  <StatCard title="Paragraphs" value={results.paragraphCount} />
                  <StatCard title="Lines" value={results.lineCount} />
                  <StatCard title="Non-empty Lines" value={results.nonEmptyLines} />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">🔤 Character Breakdown</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                  <StatCard title="Alphabetic" value={results.alphabeticChars} description="A-Z, a-z" />
                  <StatCard title="Numeric" value={results.numericChars} description="0-9" />
                  <StatCard title="Special Characters" value={results.specialChars} description="Punctuation, symbols" />
                  <StatCard title="Spaces" value={results.spaces} />
                  <StatCard title="Tabs" value={results.tabs} />
                  <StatCard title="Line Breaks" value={results.newlines} />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Analysis Complete:</strong> Detailed breakdown of your text including all character types, word statistics, and structural elements.
                </p>
              </div>

              <Button
                onClick={copyResults}
                data-testid="button-copy"
                className="w-full"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Analysis Results
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default FindTheLengthOfText;