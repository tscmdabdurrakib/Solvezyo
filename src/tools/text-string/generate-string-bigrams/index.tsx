import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function GenerateStringBigrams() {
  const [inputText, setInputText] = useState<string>('Hello world! Welcome to ToolNexas - Professional Tools & Solutions for developers and analysts.');
  const [preserveCase, setPreserveCase] = useState<boolean>(false);
  const [includePunctuation, setIncludePunctuation] = useState<boolean>(false);
  const [showCounts, setShowCounts] = useState<boolean>(true);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }
    
    let processedText = inputText;
    
    // Apply processing options
    if (!preserveCase) {
      processedText = processedText.toLowerCase();
    }
    
    if (!includePunctuation) {
      processedText = processedText.replace(/[^\w\s]/g, ' ');
    }
    
    // Split into words and create bigrams
    const words = processedText
      .split(/\s+/)
      .filter(word => word.trim().length > 0);
    
    if (words.length < 2) {
      setOutput('Need at least 2 words to generate bigrams');
      return;
    }
    
    // Generate bigrams (pairs of consecutive words)
    const bigrams: string[] = [];
    for (let i = 0; i < words.length - 1; i++) {
      bigrams.push(`${words[i]} ${words[i + 1]}`);
    }
    
    if (showCounts) {
      // Count frequency of each bigram
      const bigramCounts: { [key: string]: number } = {};
      
      bigrams.forEach(bigram => {
        bigramCounts[bigram] = (bigramCounts[bigram] || 0) + 1;
      });
      
      // Sort by frequency (descending) then alphabetically
      const sortedBigrams = Object.entries(bigramCounts)
        .sort(([a, countA], [b, countB]) => {
          if (countB !== countA) return countB - countA;
          return a.localeCompare(b);
        });
      
      const result = sortedBigrams
        .map(([bigram, count]) => `${bigram}: ${count}`)
        .join('\n');
      
      setOutput(result);
    } else {
      // Just list unique bigrams
      const uniqueBigrams = Array.from(new Set(bigrams)).sort();
      setOutput(uniqueBigrams.join('\n'));
    }
  }, [inputText, preserveCase, includePunctuation, showCounts]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Bigrams copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
          <div className="flex items-center justify-center gap-2">
            <Layers className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <CardTitle className="text-2xl">Generate String Bigrams</CardTitle>
          </div>
          <CardDescription>Extract word pairs (bigrams) from text with frequency analysis</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="preserve-case"
                checked={preserveCase}
                onCheckedChange={setPreserveCase}
                data-testid="switch-preserve-case"
              />
              <Label htmlFor="preserve-case" className="text-sm">Preserve Case</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="include-punctuation"
                checked={includePunctuation}
                onCheckedChange={setIncludePunctuation}
                data-testid="switch-include-punctuation"
              />
              <Label htmlFor="include-punctuation" className="text-sm">Include Punctuation</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-counts"
                checked={showCounts}
                onCheckedChange={setShowCounts}
                data-testid="switch-show-counts"
              />
              <Label htmlFor="show-counts" className="text-sm">Show Counts</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to generate bigrams..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Text will be split into consecutive word pairs (bigrams)
            </p>
          </div>

          <div>
            <Label htmlFor="output">Generated Bigrams:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Bigrams will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              {showCounts ? 'Showing bigram frequencies sorted by count' : 'Showing unique bigrams alphabetically'}
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

export default GenerateStringBigrams;
