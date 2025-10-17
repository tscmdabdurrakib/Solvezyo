import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FindTopWordsInText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. The fox is very quick and the dog is very lazy. This is a sample text for word frequency analysis.');
  const [topCount, setTopCount] = useState<string>('10');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [includeStopWords, setIncludeStopWords] = useState<boolean>(true);
  const [minWordLength, setMinWordLength] = useState<string>('1');
  const [sortBy, setSortBy] = useState<string>('frequency');
  const [output, setOutput] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
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
      setOutput('');
      setResults([]);
      return;
    }

    // Process text and count word frequencies
    let processedText = inputText;
    if (!caseSensitive) {
      processedText = processedText.toLowerCase();
    }

    // Extract words using regex
    const words = processedText.match(/\b\w+\b/g) || [];
    
    // Filter words based on criteria
    const filteredWords = words.filter(word => {
      // Min word length filter
      if (word.length < parseInt(minWordLength) || 1) return false;
      
      // Stop words filter
      if (!includeStopWords && stopWords.has(word.toLowerCase())) return false;
      
      return true;
    });

    // Count word frequencies
    const frequency: { [key: string]: number } = {};
    filteredWords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // Convert to array and sort
    let frequencyArray = Object.entries(frequency).map(([word, count]) => ({
      word,
      count,
      percentage: ((count / filteredWords.length) * 100).toFixed(2)
    }));

    // Sort based on selection
    if (sortBy === 'frequency') {
      frequencyArray.sort((a, b) => b.count - a.count);
    } else if (sortBy === 'alphabetical') {
      frequencyArray.sort((a, b) => a.word.localeCompare(b.word));
    } else if (sortBy === 'length') {
      frequencyArray.sort((a, b) => b.word.length - a.word.length);
    }

    // Limit to top N
    const topN = parseInt(topCount) || 10;
    const topResults = frequencyArray.slice(0, topN);
    
    setResults(topResults);

    // Generate output text
    const resultText = topResults.map((item, index) => 
      `${index + 1}. "${item.word}" - ${item.count} times (${item.percentage}%)`
    ).join('\n');

    setOutput(resultText);
  }, [inputText, topCount, caseSensitive, includeStopWords, minWordLength, sortBy]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Top words analysis copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const copyDetailed = async () => {
    if (!results.length) return;
    
    const detailedText = `Word Frequency Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Settings:
• Case Sensitive: ${caseSensitive ? 'Yes' : 'No'}
• Include Stop Words: ${includeStopWords ? 'Yes' : 'No'}
• Minimum Word Length: ${minWordLength}
• Sort By: ${sortBy}
• Top: ${topCount} words

Results:
${results.map((item, index) => 
  `${(index + 1).toString().padStart(2, ' ')}. "${item.word}" - ${item.count.toString().padStart(3, ' ')} times (${item.percentage.padStart(5, ' ')}%)`
).join('\n')}

Total words analyzed: ${inputText.match(/\b\w+\b/g)?.length || 0}
Unique words found: ${results.length}`;
    
    try {
      await navigator.clipboard.writeText(detailedText);
      toast({
        title: "Copied!",
        description: "Detailed analysis copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-2xl">Find Top Words in Text</CardTitle>
          </div>
          <CardDescription>Analyze word frequency and find the most common words in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to analyze word frequency..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {inputText.match(/\b\w+\b/g)?.length || 0} words total
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="top-count">Number of Top Words:</Label>
              <Input
                id="top-count"
                data-testid="input-count"
                type="number"
                placeholder="10"
                value={topCount}
                onChange={(e) => setTopCount(e.target.value)}
                className="mt-2"
                min="1"
                max="100"
              />
            </div>
            <div>
              <Label htmlFor="min-length">Min Word Length:</Label>
              <Input
                id="min-length"
                data-testid="input-min-length"
                type="number"
                placeholder="1"
                value={minWordLength}
                onChange={(e) => setMinWordLength(e.target.value)}
                className="mt-2"
                min="1"
                max="20"
              />
            </div>
            <div>
              <Label htmlFor="sort-by">Sort By:</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frequency">Frequency (High to Low)</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical Order</SelectItem>
                  <SelectItem value="length">Word Length</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

          {results.length > 0 && (
            <div>
              <Label className="text-lg font-semibold">📊 Top Words Results</Label>
              <div className="mt-3 space-y-2">
                {results.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold w-8 text-center text-violet-600 dark:text-violet-400">
                      {index + 1}
                    </div>
                    <div className="text-xl font-mono font-bold min-w-24 text-center bg-white dark:bg-gray-700 rounded px-3 py-1">
                      "{item.word}"
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.count} occurrences</span>
                        <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                        <div 
                          className="bg-violet-500 h-2 rounded-full" 
                          style={{ width: `${Math.min(parseFloat(item.percentage) * 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="output">Complete Results:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono text-sm"
              placeholder="Word frequency analysis will appear here..."
            />
          </div>

          <div className="bg-violet-50 dark:bg-violet-950/20 p-3 rounded-lg">
            <p className="text-sm text-violet-700 dark:text-violet-300">
              <strong>Example:</strong> Analyze which words appear most frequently in your text. Useful for content analysis, SEO research, and text optimization.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={copyToClipboard}
              data-testid="button-copy"
              className="flex-1"
              disabled={!output}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Results
            </Button>
            <Button
              onClick={copyDetailed}
              variant="outline"
              className="flex-1"
              disabled={!results.length}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Detailed
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FindTopWordsInText;