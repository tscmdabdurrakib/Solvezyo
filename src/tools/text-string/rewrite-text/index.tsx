import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function RewriteText() {
  const [inputText, setInputText] = useState<string>('Transform your text!\nChoose different styles\nMake it unique');
  const [output, setOutput] = useState<string>('');
  const [style, setStyle] = useState<string>('reverse');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    let rewrittenText = '';

    switch (style) {
      case 'reverse':
        rewrittenText = inputText.split('').reverse().join('');
        break;
      case 'alternating':
        rewrittenText = inputText
          .split('')
          .map((char, i) => (i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
          .join('');
        break;
      case 'mirror':
        rewrittenText = inputText.split('\n').map(line => line.split('').reverse().join('')).join('\n');
        break;
      case 'reverse-words':
        rewrittenText = inputText.split(' ').reverse().join(' ');
        break;
      case 'scramble':
        rewrittenText = inputText
          .split(' ')
          .map(word => {
            if (word.length <= 3) return word;
            const first = word[0];
            const last = word[word.length - 1];
            const middle = word.slice(1, -1).split('').sort(() => Math.random() - 0.5).join('');
            return first + middle + last;
          })
          .join(' ');
        break;
      default:
        rewrittenText = inputText;
    }

    setOutput(rewrittenText);
  }, [inputText, style]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Rewritten text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="h-6 w-6 text-green-600 dark:text-green-400" />
            <CardTitle className="text-2xl">Rewrite Text</CardTitle>
          </div>
          <CardDescription>Transform your text with different rewriting styles</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="style-select">Rewrite Style:</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style-select" className="mt-2">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reverse">Reverse Characters</SelectItem>
                <SelectItem value="alternating">Alternating Case</SelectItem>
                <SelectItem value="mirror">Mirror Lines</SelectItem>
                <SelectItem value="reverse-words">Reverse Words</SelectItem>
                <SelectItem value="scramble">Scramble Words</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="output">Rewritten Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Rewritten text will appear here..."
            />
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Example:</strong> "Hello World" → Reverse: "dlroW olleH" | Alternating: "HeLlO wOrLd"
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

export default RewriteText;
