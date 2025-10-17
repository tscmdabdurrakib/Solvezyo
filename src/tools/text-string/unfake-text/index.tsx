import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Eraser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function UnfakeText() {
  const [inputText, setInputText] = useState<string>('Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  // Common fake text patterns and their replacements
  const fakePatterns = [
    // Lorem ipsum
    { pattern: /lorem\s+ipsum/gi, replacement: 'sample text' },
    { pattern: /dolor\s+sit\s+amet/gi, replacement: 'placeholder content' },
    { pattern: /consectetur\s+adipiscing/gi, replacement: 'example text' },
    { pattern: /eiusmod\s+tempor/gi, replacement: 'demo content' },
    { pattern: /incididunt\s+ut\s+labore/gi, replacement: 'sample content' },
    
    // Common placeholder words
    { pattern: /\blorem\b/gi, replacement: 'sample' },
    { pattern: /\bipsum\b/gi, replacement: 'text' },
    { pattern: /\bdolor\b/gi, replacement: 'content' },
    { pattern: /\bamet\b/gi, replacement: 'here' },
    { pattern: /\bconsectetur\b/gi, replacement: 'example' },
    { pattern: /\badipiscing\b/gi, replacement: 'demo' },
    { pattern: /\belit\b/gi, replacement: 'text' },
    { pattern: /\bsed\b/gi, replacement: 'and' },
    { pattern: /\beiusmod\b/gi, replacement: 'sample' },
    { pattern: /\btempor\b/gi, replacement: 'content' },
    { pattern: /\bincididunt\b/gi, replacement: 'example' },
    { pattern: /\blabore\b/gi, replacement: 'work' },
    { pattern: /\bet\b/gi, replacement: 'and' },
    { pattern: /\bdolore\b/gi, replacement: 'text' },
    { pattern: /\bmagna\b/gi, replacement: 'great' },
    { pattern: /\baliqua\b/gi, replacement: 'content' },
    { pattern: /\benim\b/gi, replacement: 'now' },
    { pattern: /\bminim\b/gi, replacement: 'small' },
    { pattern: /\bveniam\b/gi, replacement: 'access' },
    { pattern: /\bquis\b/gi, replacement: 'which' },
    { pattern: /\bnostrud\b/gi, replacement: 'our' },
    { pattern: /\bexercitation\b/gi, replacement: 'activity' },
    { pattern: /\bullamco\b/gi, replacement: 'example' },
    { pattern: /\blaboris\b/gi, replacement: 'work' },
    { pattern: /\bnisi\b/gi, replacement: 'only' },
    { pattern: /\baliquip\b/gi, replacement: 'some' },
    { pattern: /\bcommodo\b/gi, replacement: 'common' },
    { pattern: /\bconsequat\b/gi, replacement: 'result' },
    { pattern: /\bduis\b/gi, replacement: 'you' },
    { pattern: /\baute\b/gi, replacement: 'or' },
    { pattern: /\birure\b/gi, replacement: 'sure' },
    { pattern: /\breprehenderit\b/gi, replacement: 'understand' },
    { pattern: /\bvoluptate\b/gi, replacement: 'pleasure' },
    { pattern: /\bvelit\b/gi, replacement: 'want' },
    { pattern: /\besse\b/gi, replacement: 'be' },
    { pattern: /\bcillum\b/gi, replacement: 'will' },
    { pattern: /\bfugiat\b/gi, replacement: 'avoid' },
    { pattern: /\bnulla\b/gi, replacement: 'no' },
    { pattern: /\bpariatur\b/gi, replacement: 'similar' },
    { pattern: /\bexcepteur\b/gi, replacement: 'except' },
    { pattern: /\bsint\b/gi, replacement: 'are' },
    { pattern: /\boccaecat\b/gi, replacement: 'hidden' },
    { pattern: /\bcupidatat\b/gi, replacement: 'desired' },
    { pattern: /\bproident\b/gi, replacement: 'provided' },
    
    // Technical placeholder words
    { pattern: /\bfoobar\b/gi, replacement: 'example' },
    { pattern: /\bfoo\b/gi, replacement: 'item' },
    { pattern: /\bbar\b/gi, replacement: 'data' },
    { pattern: /\bbaz\b/gi, replacement: 'value' },
    { pattern: /\bqux\b/gi, replacement: 'element' },
    { pattern: /\btest\s+data\b/gi, replacement: 'sample information' },
    { pattern: /\bplaceholder\b/gi, replacement: 'example' },
    { pattern: /\bdummy\s+text\b/gi, replacement: 'sample content' },
  ];

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    let result = inputText;
    
    // Apply all pattern replacements
    fakePatterns.forEach(({ pattern, replacement }) => {
      result = result.replace(pattern, replacement);
    });
    
    // Clean up extra spaces
    result = result.replace(/\s+/g, ' ').trim();
    
    // Improve capitalization
    result = result.replace(/(^|\. )([a-z])/g, (match, prefix, letter) => {
      return prefix + letter.toUpperCase();
    });
    
    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Unfaked text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Calculate how much of the text was "fake"
  const calculateFakePercentage = (): number => {
    if (!inputText || !output) return 0;
    
    const originalWords = inputText.toLowerCase().split(/\s+/).length;
    const changedWords = inputText.toLowerCase().split(/\s+/).filter(word => {
      return fakePatterns.some(({ pattern }) => pattern.test(word));
    }).length;
    
    return Math.round((changedWords / originalWords) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center gap-2">
            <Eraser className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-2xl">Unfake Text</CardTitle>
          </div>
          <CardDescription>Convert fake placeholder text (Lorem Ipsum, etc.) to meaningful content</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text (with fake/placeholder content):</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter fake text like Lorem Ipsum to convert..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Unfaked Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Meaningful text will appear here..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Converted {calculateFakePercentage()}% fake content to meaningful text
            </p>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg">
            <p className="text-sm text-cyan-700 dark:text-cyan-300">
              <strong>How it works:</strong> Recognizes common placeholder text patterns and replaces them with meaningful alternatives.
            </p>
            <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">
              Supports Lorem Ipsum, technical placeholders (foo, bar), and common dummy text patterns.
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

export default UnfakeText;
