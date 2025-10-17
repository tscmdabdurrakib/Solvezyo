import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CalculateTextEntropy() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog. This sentence contains many different letters and provides a good example for entropy calculation.');
  const [analysisType, setAnalysisType] = useState<string>('characters');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [includeSpaces, setIncludeSpaces] = useState<boolean>(true);
  const [includePunctuation, setIncludePunctuation] = useState<boolean>(true);
  const [results, setResults] = useState<any>({});
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setResults({});
      setOutput('');
      return;
    }

    let processedText = inputText;
    if (!caseSensitive) {
      processedText = processedText.toLowerCase();
    }

    let elements: string[] = [];
    
    if (analysisType === 'characters') {
      elements = processedText.split('').filter(char => {
        if (!includeSpaces && /\s/.test(char)) return false;
        if (!includePunctuation && /[^a-zA-Z0-9\s]/.test(char)) return false;
        return true;
      });
    } else if (analysisType === 'words') {
      elements = processedText.match(/\b\w+\b/g) || [];
    } else if (analysisType === 'bigrams') {
      // Character bigrams
      for (let i = 0; i < processedText.length - 1; i++) {
        const bigram = processedText.substring(i, i + 2);
        if (!includeSpaces && /\s/.test(bigram)) continue;
        if (!includePunctuation && /[^a-zA-Z0-9\s]/.test(bigram)) continue;
        elements.push(bigram);
      }
    }

    if (elements.length === 0) {
      setResults({});
      setOutput('No elements to analyze with current settings.');
      return;
    }

    // Calculate frequency distribution
    const frequency: { [key: string]: number } = {};
    elements.forEach(element => {
      frequency[element] = (frequency[element] || 0) + 1;
    });

    const totalElements = elements.length;
    const uniqueElements = Object.keys(frequency).length;

    // Calculate Shannon entropy
    let entropy = 0;
    Object.values(frequency).forEach(count => {
      const probability = count / totalElements;
      entropy -= probability * Math.log2(probability);
    });

    // Calculate maximum possible entropy (log2 of unique elements)
    const maxEntropy = Math.log2(uniqueElements);
    
    // Calculate redundancy (1 - relative entropy)
    const relativeEntropy = entropy / maxEntropy;
    const redundancy = 1 - relativeEntropy;

    // Information content per element
    const avgInformation = entropy;

    // Calculate compression ratio estimate
    const compressionRatio = redundancy * 100;

    const calculatedResults = {
      entropy: entropy.toFixed(4),
      maxEntropy: maxEntropy.toFixed(4),
      relativeEntropy: (relativeEntropy * 100).toFixed(2),
      redundancy: (redundancy * 100).toFixed(2),
      avgInformation: avgInformation.toFixed(4),
      compressionRatio: compressionRatio.toFixed(2),
      totalElements,
      uniqueElements,
      analysisType,
      frequency: Object.entries(frequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([element, count]) => ({
          element: element === ' ' ? '(space)' : element === '\t' ? '(tab)' : element === '\n' ? '(newline)' : element,
          count,
          probability: ((count / totalElements) * 100).toFixed(2)
        }))
    };

    setResults(calculatedResults);

    // Generate output text
    const outputText = `Text Entropy Analysis Results:

Shannon Entropy: ${calculatedResults.entropy} bits
Maximum Entropy: ${calculatedResults.maxEntropy} bits
Relative Entropy: ${calculatedResults.relativeEntropy}%
Redundancy: ${calculatedResults.redundancy}%
Avg Information per ${analysisType.slice(0, -1)}: ${calculatedResults.avgInformation} bits
Estimated Compression Ratio: ${calculatedResults.compressionRatio}%

Analysis Details:
- Total ${analysisType}: ${calculatedResults.totalElements}
- Unique ${analysisType}: ${calculatedResults.uniqueElements}
- Analysis Type: ${analysisType}
- Case Sensitive: ${caseSensitive ? 'Yes' : 'No'}

Top 10 Most Frequent ${analysisType}:
${calculatedResults.frequency.map((item, index) => 
  `${index + 1}. "${item.element}" - ${item.count} times (${item.probability}%)`
).join('\n')}`;

    setOutput(outputText);
  }, [inputText, analysisType, caseSensitive, includeSpaces, includePunctuation]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Text entropy analysis copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-center gap-2">
            <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Calculate Text Entropy</CardTitle>
          </div>
          <CardDescription>Measure the randomness and information content of your text using Shannon entropy</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to calculate entropy..."
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
              <Label htmlFor="analysis-type">Analysis Type:</Label>
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="characters">Characters</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                  <SelectItem value="bigrams">Character Bigrams</SelectItem>
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
                disabled={analysisType === 'words'}
              />
              <Label htmlFor="include-spaces">Include Spaces</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-punctuation"
                checked={includePunctuation}
                onCheckedChange={(checked) => setIncludePunctuation(checked as boolean)}
                disabled={analysisType === 'words'}
              />
              <Label htmlFor="include-punctuation">Include Punctuation</Label>
            </div>
          </div>

          {Object.keys(results).length > 0 && (
            <>
              <div>
                <Label className="text-lg font-semibold">📊 Entropy Metrics</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <StatCard title="Shannon Entropy" value={`${results.entropy} bits`} description="Information content" color="blue" />
                  <StatCard title="Max Entropy" value={`${results.maxEntropy} bits`} description="Theoretical maximum" color="green" />
                  <StatCard title="Relative Entropy" value={`${results.relativeEntropy}%`} description="Efficiency of encoding" color="purple" />
                  <StatCard title="Redundancy" value={`${results.redundancy}%`} description="Predictability measure" color="orange" />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">📈 Analysis Summary</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                  <StatCard title="Total Elements" value={results.totalElements} description={results.analysisType} />
                  <StatCard title="Unique Elements" value={results.uniqueElements} description="Distinct items" />
                  <StatCard title="Compression Est." value={`${results.compressionRatio}%`} description="Potential savings" />
                </div>
              </div>

              {results.frequency && results.frequency.length > 0 && (
                <div>
                  <Label className="text-lg font-semibold">🔤 Top Frequent Elements</Label>
                  <div className="mt-3 space-y-2">
                    {results.frequency.slice(0, 5).map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-bold w-8 text-center text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </div>
                        <div className="text-xl font-mono font-bold min-w-16 text-center bg-white dark:bg-gray-700 rounded px-2 py-1">
                          "{item.element}"
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{item.count} occurrences</span>
                            <span className="text-sm text-muted-foreground">{item.probability}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${Math.min(parseFloat(item.probability) * 2, 100)}%` }}
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
              placeholder="Text entropy analysis will appear here..."
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Shannon Entropy</strong> measures information content. Higher entropy = more random/unpredictable text. 
              Lower entropy = more structured/repetitive text. Useful for cryptography, compression, and text analysis.
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

export default CalculateTextEntropy;