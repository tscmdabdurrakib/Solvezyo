import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Search, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CheckIfTextIsFake() {
  const [inputText, setInputText] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is real content mixed with placeholder text.');
  const [analysis, setAnalysis] = useState<{
    isFake: boolean;
    fakePercentage: number;
    fakeWords: string[];
    realWords: number;
    totalWords: number;
    confidence: string;
  }>({
    isFake: false,
    fakePercentage: 0,
    fakeWords: [],
    realWords: 0,
    totalWords: 0,
    confidence: 'low'
  });
  const { toast } = useToast();

  // Common fake/placeholder text patterns
  const fakePatterns = [
    // Lorem ipsum words
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'eiusmod', 'tempor', 'incididunt', 'labore', 'dolore', 'magna', 'aliqua',
    'enim', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco',
    'laboris', 'nisi', 'aliquip', 'commodo', 'consequat', 'duis', 'aute', 'irure',
    'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla',
    'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'proident',
    
    // Technical placeholders
    'foobar', 'foo', 'bar', 'baz', 'qux', 'quux', 'quuux',
    
    // Common placeholders
    'placeholder', 'sample', 'dummy', 'test', 'example', 'demo'
  ];

  useEffect(() => {
    if (!inputText.trim()) {
      setAnalysis({
        isFake: false,
        fakePercentage: 0,
        fakeWords: [],
        realWords: 0,
        totalWords: 0,
        confidence: 'low'
      });
      return;
    }
    
    const analyzeText = (): typeof analysis => {
      const words = inputText.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 0);
      
      const totalWords = words.length;
      
      // Find fake words
      const fakeWords = words.filter(word => 
        fakePatterns.some(pattern => word.includes(pattern) || pattern.includes(word))
      );
      
      const realWords = totalWords - fakeWords.length;
      const fakePercentage = totalWords > 0 ? Math.round((fakeWords.length / totalWords) * 100) : 0;
      
      // Determine if text is fake based on percentage
      const isFake = fakePercentage > 20; // More than 20% fake words
      
      // Determine confidence level
      let confidence: string;
      if (fakePercentage >= 60) {
        confidence = 'very high';
      } else if (fakePercentage >= 40) {
        confidence = 'high';
      } else if (fakePercentage >= 20) {
        confidence = 'medium';
      } else if (fakePercentage >= 10) {
        confidence = 'low';
      } else {
        confidence = 'very low';
      }
      
      return {
        isFake,
        fakePercentage,
        fakeWords: fakeWords.filter((word, index, array) => array.indexOf(word) === index), // Remove duplicates
        realWords,
        totalWords,
        confidence
      };
    };
    
    setAnalysis(analyzeText());
  }, [inputText]);

  const copyAnalysis = async () => {
    const report = `Text Analysis Report:
- Status: ${analysis.isFake ? 'FAKE/PLACEHOLDER' : 'REAL CONTENT'}
- Fake Content: ${analysis.fakePercentage}%
- Confidence: ${analysis.confidence}
- Total Words: ${analysis.totalWords}
- Real Words: ${analysis.realWords}
- Fake Words Found: ${analysis.fakeWords.join(', ')}`;

    try {
      await navigator.clipboard.writeText(report);
      toast({
        title: "Copied!",
        description: "Analysis report copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = () => {
    if (analysis.isFake) {
      return analysis.fakePercentage >= 60 ? 'text-red-600' : 'text-orange-600';
    }
    return 'text-green-600';
  };

  const getStatusIcon = () => {
    return analysis.isFake ? 
      <XCircle className="h-6 w-6 text-red-600" /> : 
      <CheckCircle className="h-6 w-6 text-green-600" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-center gap-2">
            <Search className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-2xl">Check If Text Is Fake</CardTitle>
          </div>
          <CardDescription>Analyze text to detect placeholder content and fake text patterns</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Text to Analyze:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter text to check for fake/placeholder content..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              {getStatusIcon()}
              <h3 className={`text-xl font-semibold ${getStatusColor()}`}>
                {analysis.isFake ? 'FAKE/PLACEHOLDER CONTENT DETECTED' : 'REAL CONTENT'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{analysis.fakePercentage}%</div>
                <div className="text-sm text-muted-foreground">Fake Content</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analysis.totalWords}</div>
                <div className="text-sm text-muted-foreground">Total Words</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analysis.realWords}</div>
                <div className="text-sm text-muted-foreground">Real Words</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 capitalize">{analysis.confidence}</div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
            </div>

            {analysis.fakeWords.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm font-medium">Fake/Placeholder Words Detected:</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {analysis.fakeWords.map((word, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-violet-50 dark:bg-violet-950/20 p-3 rounded-lg">
            <p className="text-sm text-violet-700 dark:text-violet-300">
              <strong>Analysis:</strong> This tool detects Lorem Ipsum, technical placeholders (foo, bar), and common dummy text patterns.
            </p>
            <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">
              Confidence levels: Very High (60%+), High (40-59%), Medium (20-39%), Low (10-19%), Very Low (0-9%)
            </p>
          </div>

          <Button
            onClick={copyAnalysis}
            data-testid="button-copy"
            className="w-full"
            disabled={analysis.totalWords === 0}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Analysis Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckIfTextIsFake;
