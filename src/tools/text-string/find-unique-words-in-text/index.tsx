import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FindUniqueWordsInText() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. The fox is very quick and the dog is very lazy. This text has repeated words like the, fox, and dog.');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [includeStopWords, setIncludeStopWords] = useState<boolean>(true);
  const [minWordLength, setMinWordLength] = useState<string>('1');
  const [results, setResults] = useState<any[]>([]);
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
      setResults([]);
      setOutput('');
      return;
    }

    // Extract words using regex
    const words = inputText.match(/\b\w+\b/g) || [];
    
    // Process based on case sensitivity
    const processedWords = caseSensitive ? words : words.map(word => word.toLowerCase());
    
    // Count word frequencies
    const frequency: { [key: string]: number } = {};
    processedWords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // Find unique words (words that appear only once)
    const uniqueWordsList = Object.entries(frequency)
      .filter(([word, count]) => {
        // Must appear only once
        if (count !== 1) return false;
        
        // Min word length filter
        if (word.length < parseInt(minWordLength) || 1) return false;
        
        // Stop words filter
        if (!includeStopWords && stopWords.has(word.toLowerCase())) return false;
        
        return true;
      })
      .map(([word, count]) => ({
        word: caseSensitive ? word : word,
        originalCase: words.find(w => (caseSensitive ? w : w.toLowerCase()) === word) || word,
        length: word.length,
        count
      }))
      .sort((a, b) => a.word.localeCompare(b.word));

    // Statistics
    const totalWords = processedWords.length;
    const totalUniqueWords = Object.keys(frequency).length;
    const uniqueWordsCount = uniqueWordsList.length;
    const repeatedWordsCount = totalUniqueWords - uniqueWordsCount;

    setResults(uniqueWordsList);

    // Generate output text
    const outputText = `Unique Words Analysis Results:

Statistics:
- Total Words: ${totalWords}
- Total Unique Words: ${totalUniqueWords}
- Words Appearing Once: ${uniqueWordsCount}
- Words Appearing Multiple Times: ${repeatedWordsCount}

Settings:
- Case Sensitive: ${caseSensitive ? 'Yes' : 'No'}
- Include Stop Words: ${includeStopWords ? 'Yes' : 'No'}
- Minimum Word Length: ${minWordLength}

Unique Words (appearing only once):
${uniqueWordsList.map((item, index) => 
  `${index + 1}. "${item.originalCase}" (${item.length} character${item.length !== 1 ? 's' : ''})`
).join('\n')}

${uniqueWordsCount === 0 ? 'No unique words found with current settings.' : ''}`;

    setOutput(outputText);
  }, [inputText, caseSensitive, includeStopWords, minWordLength]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Unique words analysis copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const copyWordsList = async () => {
    if (!results || results.length === 0) return;
    
    const wordsList = results.map(item => item.originalCase).join('\n');
    
    try {
      await navigator.clipboard.writeText(wordsList);
      toast({
        title: "Copied!",
        description: "Unique words list copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
          <div className="flex items-center justify-center gap-2">
            <Filter className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Find Unique Words in Text</CardTitle>
          </div>
          <CardDescription>Find words that appear only once in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to find unique words..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {inputText.match(/\b\w+\b/g)?.length || 0} words total
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-length">Minimum Word Length:</Label>
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
              <Label className="text-lg font-semibold">🔍 Unique Words Found</Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                {results.length} word{results.length !== 1 ? 's' : ''} appearing only once
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 max-h-96 overflow-y-auto">
                {results.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-xs text-muted-foreground w-6">
                      {index + 1}.
                    </span>
                    <span className="font-mono text-sm bg-white dark:bg-gray-700 px-2 py-1 rounded">
                      "{item.originalCase}"
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({item.length})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="output">Analysis Results:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-40 mt-2 bg-gray-50 dark:bg-gray-900 font-mono text-sm"
              placeholder="Unique words analysis will appear here..."
            />
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg">
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              <strong>Example:</strong> Find words that appear only once in your text. Useful for vocabulary analysis, 
              content uniqueness checking, and identifying rarely used terms.
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
              Copy Analysis
            </Button>
            <Button
              onClick={copyWordsList}
              variant="outline"
              className="flex-1"
              disabled={!results.length}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Words Only
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FindUniqueWordsInText;