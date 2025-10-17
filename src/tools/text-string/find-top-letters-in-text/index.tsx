import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function FindTopLettersInText() {
  const [inputText, setInputText] = useState<string>('Hello World! This is a sample text to analyze character frequency. The quick brown fox jumps over the lazy dog.');
  const [topCount, setTopCount] = useState<string>('10');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [includeSpaces, setIncludeSpaces] = useState<boolean>(false);
  const [includePunctuation, setIncludePunctuation] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('frequency');
  const [output, setOutput] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      setResults([]);
      return;
    }

    // Character frequency analysis
    const frequency: { [key: string]: number } = {};
    let processedText = inputText;
    
    if (!caseSensitive) {
      processedText = processedText.toLowerCase();
    }

    for (let char of processedText) {
      // Filter based on options
      if (!includeSpaces && /\s/.test(char)) continue;
      if (!includePunctuation && /[^a-zA-Z0-9\s]/.test(char)) continue;
      
      frequency[char] = (frequency[char] || 0) + 1;
    }

    // Convert to array and sort
    let frequencyArray = Object.entries(frequency).map(([char, count]) => ({
      char: char === ' ' ? '(space)' : char === '\t' ? '(tab)' : char === '\n' ? '(newline)' : char,
      originalChar: char,
      count,
      percentage: ((count / processedText.length) * 100).toFixed(2)
    }));

    // Sort based on selection
    if (sortBy === 'frequency') {
      frequencyArray.sort((a, b) => b.count - a.count);
    } else if (sortBy === 'alphabetical') {
      frequencyArray.sort((a, b) => a.originalChar.localeCompare(b.originalChar));
    }

    // Limit to top N
    const topN = parseInt(topCount) || 10;
    const topResults = frequencyArray.slice(0, topN);
    
    setResults(topResults);

    // Generate output text
    const resultText = topResults.map((item, index) => 
      `${index + 1}. '${item.char}' - ${item.count} times (${item.percentage}%)`
    ).join('\n');

    setOutput(resultText);
  }, [inputText, topCount, caseSensitive, includeSpaces, includePunctuation, sortBy]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Top letters analysis copied to clipboard",
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
    
    const detailedText = `Character Frequency Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Settings:
• Case Sensitive: ${caseSensitive ? 'Yes' : 'No'}
• Include Spaces: ${includeSpaces ? 'Yes' : 'No'}
• Include Punctuation: ${includePunctuation ? 'Yes' : 'No'}
• Sort By: ${sortBy}
• Top: ${topCount} characters

Results:
${results.map((item, index) => 
  `${(index + 1).toString().padStart(2, ' ')}. '${item.char}' - ${item.count.toString().padStart(3, ' ')} times (${item.percentage.padStart(5, ' ')}%)`
).join('\n')}

Total characters analyzed: ${inputText.length}`;
    
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Find Top Letters in Text</CardTitle>
          </div>
          <CardDescription>Analyze character frequency and find the most common letters in your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to analyze character frequency..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {inputText.length} characters total
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="top-count">Number of Top Characters:</Label>
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
              <Label htmlFor="sort-by">Sort By:</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frequency">Frequency (High to Low)</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical Order</SelectItem>
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
                id="include-spaces"
                checked={includeSpaces}
                onCheckedChange={(checked) => setIncludeSpaces(checked as boolean)}
              />
              <Label htmlFor="include-spaces">Include Spaces</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-punctuation"
                checked={includePunctuation}
                onCheckedChange={(checked) => setIncludePunctuation(checked as boolean)}
              />
              <Label htmlFor="include-punctuation">Include Punctuation</Label>
            </div>
          </div>

          {results.length > 0 && (
            <div>
              <Label className="text-lg font-semibold">📊 Character Frequency Results</Label>
              <div className="mt-3 space-y-2">
                {results.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold w-8 text-center text-emerald-600 dark:text-emerald-400">
                      {index + 1}
                    </div>
                    <div className="text-2xl font-mono font-bold w-16 text-center bg-white dark:bg-gray-700 rounded px-2 py-1">
                      '{item.char}'
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.count} occurrences</span>
                        <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full" 
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
              placeholder="Character frequency analysis will appear here..."
            />
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg">
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              <strong>Example:</strong> Analyze which letters appear most frequently in your text. Useful for cryptography, linguistics, and text analysis.
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

export default FindTopLettersInText;