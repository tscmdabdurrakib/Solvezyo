import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, GitBranch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CountTextLines() {
  const [inputText, setInputText] = useState<string>('Line 1: This is the first line\nLine 2: This is the second line\nLine 3: This is the third line\n\nLine 5: This line has an empty line above\nLine 6: Final line for counting');
  const [results, setResults] = useState<any>({});
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (inputText === '') {
      setResults({});
      setOutput('0');
      return;
    }

    const lines = inputText.split('\n');
    const totalLines = lines.length;
    const nonEmptyLines = lines.filter(line => line.trim().length > 0).length;
    const emptyLines = totalLines - nonEmptyLines;
    
    // Calculate line length statistics
    const lineLengths = lines.map(line => line.length);
    const nonEmptyLineLengths = lines.filter(line => line.trim().length > 0).map(line => line.length);
    
    const avgLineLength = lineLengths.length > 0 ? 
      (lineLengths.reduce((sum, len) => sum + len, 0) / lineLengths.length).toFixed(2) : '0';
    
    const avgNonEmptyLineLength = nonEmptyLineLengths.length > 0 ? 
      (nonEmptyLineLengths.reduce((sum, len) => sum + len, 0) / nonEmptyLineLengths.length).toFixed(2) : '0';
    
    const longestLineLength = lineLengths.length > 0 ? Math.max(...lineLengths) : 0;
    const shortestLineLength = nonEmptyLineLengths.length > 0 ? Math.min(...nonEmptyLineLengths) : 0;
    
    // Calculate character and word totals
    const totalCharacters = inputText.length;
    const totalWords = (inputText.match(/\b\w+\b/g) || []).length;
    
    // Line distribution analysis
    const lengthDistribution: { [key: string]: number } = {
      'empty': emptyLines,
      '1-10': 0,
      '11-50': 0,
      '51-100': 0,
      '100+': 0
    };
    
    lines.forEach(line => {
      const len = line.length;
      if (len === 0) return; // Already counted as empty
      if (len >= 1 && len <= 10) lengthDistribution['1-10']++;
      else if (len >= 11 && len <= 50) lengthDistribution['11-50']++;
      else if (len >= 51 && len <= 100) lengthDistribution['51-100']++;
      else if (len > 100) lengthDistribution['100+']++;
    });

    const calculatedResults = {
      totalLines,
      nonEmptyLines,
      emptyLines,
      avgLineLength: parseFloat(avgLineLength),
      avgNonEmptyLineLength: parseFloat(avgNonEmptyLineLength),
      longestLineLength,
      shortestLineLength,
      totalCharacters,
      totalWords,
      lengthDistribution
    };

    setResults(calculatedResults);

    // Generate output text
    const outputText = `Line Count Analysis Results:

Basic Line Counts:
- Total Lines: ${totalLines}
- Non-Empty Lines: ${nonEmptyLines}
- Empty Lines: ${emptyLines}

Line Length Statistics:
- Average Line Length: ${avgLineLength} characters
- Average Non-Empty Line Length: ${avgNonEmptyLineLength} characters
- Longest Line: ${longestLineLength} characters
- Shortest Non-Empty Line: ${shortestLineLength} characters

Content Totals:
- Total Characters: ${totalCharacters}
- Total Words: ${totalWords}
- Characters per Line: ${(totalCharacters / totalLines).toFixed(2)}
- Words per Line: ${(totalWords / totalLines).toFixed(2)}

Line Length Distribution:
- Empty Lines: ${lengthDistribution.empty}
- 1-10 characters: ${lengthDistribution['1-10']} lines
- 11-50 characters: ${lengthDistribution['11-50']} lines
- 51-100 characters: ${lengthDistribution['51-100']} lines
- 100+ characters: ${lengthDistribution['100+']} lines

Analysis Date: ${new Date().toLocaleString()}`;

    setOutput(outputText);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Line count analysis copied to clipboard",
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
            <GitBranch className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Count Text Lines</CardTitle>
          </div>
          <CardDescription>Count and analyze lines in your text with detailed statistics</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to count lines..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          {Object.keys(results).length > 0 && (
            <>
              <div>
                <Label className="text-lg font-semibold">📊 Line Count Statistics</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <StatCard title="Total Lines" value={results.totalLines} />
                  <StatCard title="Non-Empty Lines" value={results.nonEmptyLines} />
                  <StatCard title="Empty Lines" value={results.emptyLines} />
                  <StatCard title="Avg Line Length" value={`${results.avgLineLength} chars`} />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">📏 Length Analysis</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <StatCard title="Longest Line" value={`${results.longestLineLength} chars`} />
                  <StatCard title="Shortest Line" value={`${results.shortestLineLength} chars`} description="Non-empty only" />
                  <StatCard title="Total Characters" value={results.totalCharacters} />
                  <StatCard title="Total Words" value={results.totalWords} />
                </div>
              </div>

              {results.lengthDistribution && (
                <div>
                  <Label className="text-lg font-semibold">📈 Line Length Distribution</Label>
                  <div className="mt-3 space-y-2">
                    {Object.entries(results.lengthDistribution).map(([range, count]: [string, any]) => (
                      <div key={range} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-bold w-20 text-center bg-white dark:bg-gray-700 rounded px-2 py-1">
                          {range === 'empty' ? 'Empty' : `${range} chars`}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{count} line{count !== 1 ? 's' : ''}</span>
                            <span className="text-sm text-muted-foreground">
                              {((count / results.totalLines) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(count / results.totalLines) * 100}%` }}
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
              placeholder="Line count analysis will appear here..."
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Example:</strong> Analyze document structure, code files, and text formatting. 
              Useful for content organization and file analysis.
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

export default CountTextLines;