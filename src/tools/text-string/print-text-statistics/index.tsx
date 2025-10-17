import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function PrintTextStatistics() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. This is a comprehensive text analysis example with multiple sentences, words, and characters for statistical demonstration purposes.');
  const [results, setResults] = useState<any>({});
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setResults({});
      setOutput('');
      return;
    }

    // Character analysis
    const totalCharacters = inputText.length;
    const charactersWithoutSpaces = inputText.replace(/\s/g, '').length;
    const charactersWithoutWhitespace = inputText.replace(/\s+/g, '').length;
    
    // Word analysis
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const uniqueWords = [...new Set(words.map(w => w.toLowerCase()))].length;
    const averageWordLength = wordCount > 0 ? (charactersWithoutSpaces / wordCount).toFixed(2) : 0;
    
    // Line analysis
    const lines = inputText.split('\n');
    const lineCount = lines.length;
    const nonEmptyLines = lines.filter(line => line.trim().length > 0).length;
    const averageWordsPerLine = nonEmptyLines > 0 ? (wordCount / nonEmptyLines).toFixed(2) : 0;
    
    // Sentence analysis
    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const sentenceCount = sentences.length;
    const averageWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(2) : 0;
    
    // Paragraph analysis
    const paragraphs = inputText.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    const paragraphCount = paragraphs.length;
    const averageWordsPerParagraph = paragraphCount > 0 ? (wordCount / paragraphCount).toFixed(2) : 0;
    
    // Character type analysis
    const alphabeticChars = (inputText.match(/[a-zA-Z]/g) || []).length;
    const numericChars = (inputText.match(/[0-9]/g) || []).length;
    const specialChars = (inputText.match(/[^a-zA-Z0-9\s]/g) || []).length;
    const spaces = (inputText.match(/\s/g) || []).length;
    const uppercaseChars = (inputText.match(/[A-Z]/g) || []).length;
    const lowercaseChars = (inputText.match(/[a-z]/g) || []).length;
    
    // Whitespace analysis
    const tabs = (inputText.match(/\t/g) || []).length;
    const newlines = (inputText.match(/\n/g) || []).length;
    
    // Reading metrics
    const estimatedReadingTime = Math.ceil(wordCount / 200); // 200 words per minute average
    const estimatedSpeakingTime = Math.ceil(wordCount / 130); // 130 words per minute average
    
    // Complexity metrics
    const lexicalDiversity = wordCount > 0 ? (uniqueWords / wordCount * 100).toFixed(2) : 0;
    const avgSentenceLength = sentenceCount > 0 ? (totalCharacters / sentenceCount).toFixed(2) : 0;

    // Word length distribution
    const wordLengths = words.map(word => word.replace(/[^a-zA-Z0-9]/g, '').length);
    const avgWordLengthClean = wordLengths.length > 0 ? (wordLengths.reduce((sum, len) => sum + len, 0) / wordLengths.length).toFixed(2) : 0;
    const longestWordLength = wordLengths.length > 0 ? Math.max(...wordLengths) : 0;
    const shortestWordLength = wordLengths.length > 0 ? Math.min(...wordLengths.filter(len => len > 0)) : 0;

    const calculatedResults = {
      totalCharacters,
      charactersWithoutSpaces,
      charactersWithoutWhitespace,
      wordCount,
      uniqueWords,
      averageWordLength: parseFloat(averageWordLength),
      lineCount,
      nonEmptyLines,
      averageWordsPerLine: parseFloat(averageWordsPerLine),
      sentenceCount,
      averageWordsPerSentence: parseFloat(averageWordsPerSentence),
      paragraphCount,
      averageWordsPerParagraph: parseFloat(averageWordsPerParagraph),
      alphabeticChars,
      numericChars,
      specialChars,
      spaces,
      uppercaseChars,
      lowercaseChars,
      tabs,
      newlines,
      estimatedReadingTime,
      estimatedSpeakingTime,
      lexicalDiversity: parseFloat(lexicalDiversity),
      avgSentenceLength: parseFloat(avgSentenceLength),
      avgWordLengthClean: parseFloat(avgWordLengthClean),
      longestWordLength,
      shortestWordLength
    };

    setResults(calculatedResults);

    // Generate comprehensive output
    const outputText = `COMPREHENSIVE TEXT STATISTICS
${'='.repeat(50)}

📊 BASIC COUNTS
• Total Characters: ${totalCharacters}
• Characters (no spaces): ${charactersWithoutSpaces}
• Characters (no whitespace): ${charactersWithoutWhitespace}
• Words: ${wordCount}
• Unique Words: ${uniqueWords}
• Lines: ${lineCount}
• Non-empty Lines: ${nonEmptyLines}
• Sentences: ${sentenceCount}
• Paragraphs: ${paragraphCount}

📈 AVERAGES & RATIOS
• Average Word Length: ${averageWordLength} characters
• Average Words per Line: ${averageWordsPerLine}
• Average Words per Sentence: ${averageWordsPerSentence}
• Average Words per Paragraph: ${averageWordsPerParagraph}
• Average Sentence Length: ${avgSentenceLength} characters
• Lexical Diversity: ${lexicalDiversity}% (unique/total words)

🔤 CHARACTER BREAKDOWN
• Alphabetic Characters: ${alphabeticChars}
• Uppercase Letters: ${uppercaseChars}
• Lowercase Letters: ${lowercaseChars}
• Numeric Characters: ${numericChars}
• Special Characters: ${specialChars}
• Spaces: ${spaces}
• Tabs: ${tabs}
• Line Breaks: ${newlines}

📏 WORD LENGTH ANALYSIS
• Clean Average Word Length: ${avgWordLengthClean} characters
• Longest Word: ${longestWordLength} characters
• Shortest Word: ${shortestWordLength} character${shortestWordLength !== 1 ? 's' : ''}

⏱️ READING METRICS
• Estimated Reading Time: ${estimatedReadingTime} minute${estimatedReadingTime !== 1 ? 's' : ''} (200 WPM)
• Estimated Speaking Time: ${estimatedSpeakingTime} minute${estimatedSpeakingTime !== 1 ? 's' : ''} (130 WPM)

📋 DOCUMENT STRUCTURE
• Character Density: ${(totalCharacters / Math.max(lineCount, 1)).toFixed(1)} chars/line
• Word Density: ${(wordCount / Math.max(nonEmptyLines, 1)).toFixed(1)} words/line
• Sentence Density: ${(sentenceCount / Math.max(paragraphCount, 1)).toFixed(1)} sentences/paragraph

Generated on: ${new Date().toLocaleString()}`;

    setOutput(outputText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text statistics copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const StatCard = ({ title, value, description, color = "blue" }: { title: string; value: any; description?: string; color?: string }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
      <div className={`text-2xl font-bold text-center text-${color}-600 dark:text-${color}-400`}>
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <BarChart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-2xl">Print Text Statistics</CardTitle>
          </div>
          <CardDescription>Generate comprehensive statistical analysis of your text content</CardDescription>
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
                <Label className="text-lg font-semibold">📊 Basic Counts</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <StatCard title="Total Characters" value={results.totalCharacters} color="blue" />
                  <StatCard title="Words" value={results.wordCount} color="green" />
                  <StatCard title="Sentences" value={results.sentenceCount} color="purple" />
                  <StatCard title="Paragraphs" value={results.paragraphCount} color="orange" />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">📈 Analysis Metrics</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <StatCard title="Unique Words" value={results.uniqueWords} color="teal" />
                  <StatCard title="Lexical Diversity" value={`${results.lexicalDiversity}%`} description="Vocabulary richness" color="pink" />
                  <StatCard title="Avg Word Length" value={`${results.averageWordLength} chars`} color="cyan" />
                  <StatCard title="Words/Sentence" value={results.averageWordsPerSentence} color="yellow" />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">⏱️ Reading Metrics</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <StatCard title="Reading Time" value={`${results.estimatedReadingTime} min`} description="200 WPM" color="green" />
                  <StatCard title="Speaking Time" value={`${results.estimatedSpeakingTime} min`} description="130 WPM" color="blue" />
                  <StatCard title="Character Density" value={`${(results.totalCharacters / Math.max(results.lineCount, 1)).toFixed(1)}`} description="chars/line" color="purple" />
                  <StatCard title="Word Density" value={`${(results.wordCount / Math.max(results.nonEmptyLines, 1)).toFixed(1)}`} description="words/line" color="orange" />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">🔤 Character Analysis</Label>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-3">
                  <StatCard title="Alphabetic" value={results.alphabeticChars} color="green" />
                  <StatCard title="Uppercase" value={results.uppercaseChars} color="blue" />
                  <StatCard title="Lowercase" value={results.lowercaseChars} color="indigo" />
                  <StatCard title="Numeric" value={results.numericChars} color="yellow" />
                  <StatCard title="Special" value={results.specialChars} color="red" />
                  <StatCard title="Spaces" value={results.spaces} color="gray" />
                </div>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="output">Complete Statistics Report:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-96 mt-2 bg-gray-50 dark:bg-gray-900 font-mono text-xs"
              placeholder="Comprehensive text statistics will appear here..."
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Complete Analysis:</strong> Comprehensive statistical breakdown including character counts, reading metrics, 
              complexity analysis, and document structure insights.
            </p>
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Statistics Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PrintTextStatistics;