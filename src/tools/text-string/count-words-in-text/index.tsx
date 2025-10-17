import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CountWordsInText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. This sentence contains exactly fifteen words for counting demonstration purposes.');
  const [includeStopWords, setIncludeStopWords] = useState<boolean>(true);
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [results, setResults] = useState<any>({});
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  // Common English stop words
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it',
    'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they',
    'have', 'had', 'what', 'said', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'up', 'out',
    'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'into', 'him',
    'time', 'has', 'two', 'more', 'very', 'after', 'words', 'long', 'than', 'first', 'been', 'call',
    'who', 'oil', 'sit', 'now', 'find', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'
  ]);

  useEffect(() => {
    if (!inputText.trim()) {
      setResults({});
      setOutput('');
      return;
    }

    // Extract all words
    const allWords = inputText.match(/\b\w+\b/g) || [];
    
    // Process based on case sensitivity
    const processedWords = caseSensitive ? allWords : allWords.map(word => word.toLowerCase());
    
    // Filter stop words if needed
    const filteredWords = includeStopWords 
      ? processedWords 
      : processedWords.filter(word => !stopWords.has(word.toLowerCase()));

    // Calculate various word counts
    const totalWords = allWords.length;
    const filteredWordCount = filteredWords.length;
    const uniqueWords = [...new Set(filteredWords)].length;
    const duplicateWords = filteredWordCount - uniqueWords;
    
    // Calculate word length statistics
    const wordLengths = filteredWords.map(word => word.length);
    const avgWordLength = wordLengths.length > 0 ? 
      (wordLengths.reduce((sum, len) => sum + len, 0) / wordLengths.length).toFixed(2) : '0';
    const minWordLength = wordLengths.length > 0 ? Math.min(...wordLengths) : 0;
    const maxWordLength = wordLengths.length > 0 ? Math.max(...wordLengths) : 0;

    // Count words by length
    const lengthDistribution: { [key: number]: number } = {};
    wordLengths.forEach(length => {
      lengthDistribution[length] = (lengthDistribution[length] || 0) + 1;
    });

    // Find most common word lengths
    const lengthStats = Object.entries(lengthDistribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([length, count]) => ({ length: parseInt(length), count }));

    // Calculate reading metrics
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const wordsPerSentence = sentences > 0 ? (totalWords / sentences).toFixed(2) : '0';

    const calculatedResults = {
      totalWords,
      filteredWordCount,
      uniqueWords,
      duplicateWords,
      avgWordLength,
      minWordLength,
      maxWordLength,
      lengthStats,
      sentences,
      wordsPerSentence,
      includeStopWords,
      caseSensitive
    };

    setResults(calculatedResults);

    // Generate output text
    const outputText = `Word Count Analysis Results:

Basic Counts:
- Total Words: ${totalWords}
- Filtered Words: ${filteredWordCount} ${!includeStopWords ? '(stop words excluded)' : ''}
- Unique Words: ${uniqueWords}
- Duplicate Words: ${duplicateWords}

Word Length Statistics:
- Average Word Length: ${avgWordLength} characters
- Shortest Word: ${minWordLength} character${minWordLength !== 1 ? 's' : ''}
- Longest Word: ${maxWordLength} character${maxWordLength !== 1 ? 's' : ''}

Reading Metrics:
- Total Sentences: ${sentences}
- Average Words per Sentence: ${wordsPerSentence}

Most Common Word Lengths:
${lengthStats.map((stat, index) => 
  `${index + 1}. ${stat.length} character${stat.length !== 1 ? 's' : ''}: ${stat.count} word${stat.count !== 1 ? 's' : ''}`
).join('\n')}

Analysis Settings:
- Case Sensitive: ${caseSensitive ? 'Yes' : 'No'}
- Include Stop Words: ${includeStopWords ? 'Yes' : 'No'}`;

    setOutput(outputText);
  }, [inputText, includeStopWords, caseSensitive]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Word count analysis copied to clipboard",
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
      <div className="text-2xl font-bold text-center text-green-600 dark:text-green-400">
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Count Words in Text</CardTitle>
          </div>
          <CardDescription>Count and analyze words in your text with detailed statistics</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to count words..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="case-sensitive"
                checked={caseSensitive}
                onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
              />
              <Label htmlFor="case-sensitive">Case Sensitive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-stop-words"
                checked={includeStopWords}
                onCheckedChange={(checked) => setIncludeStopWords(checked as boolean)}
              />
              <Label htmlFor="include-stop-words">Include Stop Words</Label>
            </div>
          </div>

          {Object.keys(results).length > 0 && (
            <>
              <div>
                <Label className="text-lg font-semibold">📊 Word Count Statistics</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <StatCard title="Total Words" value={results.totalWords} />
                  <StatCard title="Filtered Words" value={results.filteredWordCount} description={!results.includeStopWords ? "Stop words excluded" : ""} />
                  <StatCard title="Unique Words" value={results.uniqueWords} />
                  <StatCard title="Duplicate Words" value={results.duplicateWords} />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">📏 Length Analysis</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <StatCard title="Average Length" value={`${results.avgWordLength} chars`} />
                  <StatCard title="Shortest Word" value={`${results.minWordLength} char${results.minWordLength !== 1 ? 's' : ''}`} />
                  <StatCard title="Longest Word" value={`${results.maxWordLength} char${results.maxWordLength !== 1 ? 's' : ''}`} />
                  <StatCard title="Words/Sentence" value={results.wordsPerSentence} />
                </div>
              </div>

              {results.lengthStats && results.lengthStats.length > 0 && (
                <div>
                  <Label className="text-lg font-semibold">📈 Most Common Word Lengths</Label>
                  <div className="mt-3 space-y-2">
                    {results.lengthStats.slice(0, 5).map((stat: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-bold w-8 text-center text-green-600 dark:text-green-400">
                          {index + 1}
                        </div>
                        <div className="text-xl font-mono font-bold w-20 text-center bg-white dark:bg-gray-700 rounded px-2 py-1">
                          {stat.length} char{stat.length !== 1 ? 's' : ''}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{stat.count} word{stat.count !== 1 ? 's' : ''}</span>
                            <span className="text-sm text-muted-foreground">
                              {((stat.count / results.filteredWordCount) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(stat.count / results.filteredWordCount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <Label htmlFor="output">Detailed Results:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-40 mt-2 bg-gray-50 dark:bg-gray-900 font-mono text-sm"
              placeholder="Word count analysis will appear here..."
            />
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Example:</strong> Analyze word usage patterns, vocabulary diversity, and reading complexity. Useful for content analysis and writing assessment.
            </p>
          </div>

          <Button
            onClick={copyToClipboard}
            data-testid="button-copy"
            className="w-full"
            disabled={!output}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Analysis Results
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CountWordsInText;