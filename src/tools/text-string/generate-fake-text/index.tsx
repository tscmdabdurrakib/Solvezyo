import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function GenerateFakeText() {
  const [sentenceCount, setSentenceCount] = useState<number>(5);
  const [wordsPerSentence, setWordsPerSentence] = useState<number>(8);
  const [textStyle, setTextStyle] = useState<string>('lorem'); // 'lorem', 'technical', 'casual', 'formal'
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  // Word pools for different styles
  const wordPools = {
    lorem: [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
      'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
      'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
      'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint'
    ],
    technical: [
      'algorithm', 'database', 'framework', 'implementation', 'architecture', 'optimization',
      'performance', 'scalability', 'integration', 'deployment', 'configuration', 'protocol',
      'interface', 'methodology', 'infrastructure', 'authentication', 'authorization',
      'encryption', 'synchronization', 'validation', 'compilation', 'debugging', 'testing',
      'documentation', 'analysis', 'processing', 'execution', 'initialization', 'termination'
    ],
    casual: [
      'basically', 'actually', 'totally', 'really', 'pretty', 'quite', 'maybe', 'probably',
      'definitely', 'obviously', 'honestly', 'literally', 'seriously', 'absolutely',
      'completely', 'exactly', 'perfectly', 'incredibly', 'amazing', 'awesome', 'cool',
      'nice', 'great', 'fantastic', 'wonderful', 'excellent', 'brilliant', 'outstanding'
    ],
    formal: [
      'therefore', 'however', 'moreover', 'furthermore', 'consequently', 'nevertheless',
      'accordingly', 'subsequently', 'alternatively', 'specifically', 'particularly',
      'essentially', 'fundamentally', 'significantly', 'substantially', 'considerably',
      'comprehensively', 'systematically', 'methodically', 'strategically', 'effectively',
      'efficiently', 'precisely', 'accurately', 'thoroughly', 'extensively', 'appropriately'
    ]
  };

  useEffect(() => {
    if (sentenceCount <= 0 || wordsPerSentence <= 0) {
      setOutput('');
      return;
    }
    
    const generateText = (): string => {
      const words = wordPools[textStyle as keyof typeof wordPools] || wordPools.lorem;
      const sentences: string[] = [];
      
      for (let i = 0; i < sentenceCount; i++) {
        const sentence: string[] = [];
        
        for (let j = 0; j < wordsPerSentence; j++) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          sentence.push(randomWord);
        }
        
        // Capitalize first word and add punctuation
        let sentenceText = sentence.join(' ');
        sentenceText = sentenceText.charAt(0).toUpperCase() + sentenceText.slice(1);
        
        // Add random punctuation
        const punctuation = Math.random() > 0.8 ? (Math.random() > 0.5 ? '!' : '?') : '.';
        sentenceText += punctuation;
        
        sentences.push(sentenceText);
      }
      
      return sentences.join(' ');
    };
    
    setOutput(generateText());
  }, [sentenceCount, wordsPerSentence, textStyle]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Generated fake text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const regenerate = () => {
    // Force re-render by updating a dependency
    setSentenceCount(prev => prev);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Generate Fake Text</CardTitle>
          </div>
          <CardDescription>Generate placeholder text in various styles for testing and design</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sentence-count">Number of Sentences: {sentenceCount}</Label>
              <Input
                id="sentence-count"
                data-testid="input-sentence-count"
                type="number"
                min="1"
                max="50"
                value={sentenceCount}
                onChange={(e) => setSentenceCount(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="words-per-sentence">Words per Sentence: {wordsPerSentence}</Label>
              <Input
                id="words-per-sentence"
                data-testid="input-words-per-sentence"
                type="number"
                min="3"
                max="30"
                value={wordsPerSentence}
                onChange={(e) => setWordsPerSentence(parseInt(e.target.value) || 3)}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="mb-2 block">Text Style:</Label>
              <select
                value={textStyle}
                onChange={(e) => setTextStyle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="lorem">Lorem Ipsum</option>
                <option value="technical">Technical</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="output">Generated Fake Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Generated text will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              {output.split(' ').length} words, {output.split('.').length - 1} sentences
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Perfect for:</strong> Website mockups, design layouts, content testing, and placeholder text.
            </p>
            <Button
              onClick={regenerate}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Generate New Text
            </Button>
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

export default GenerateFakeText;
