import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RandExp from "randexp";

function GenerateTextFromRegExp() {
  const [regexPattern, setRegexPattern] = useState<string>('[A-Z][a-z]{4,8}\\d{2,4}');
  const [count, setCount] = useState<number>(5);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const generateText = () => {
    try {
      if (!regexPattern) {
        toast({
          title: "Empty pattern",
          description: "Please enter a regular expression pattern",
          variant: "destructive",
        });
        return;
      }

      const results: string[] = [];
      const generator = new RandExp(regexPattern);
      
      for (let i = 0; i < Math.min(count, 100); i++) {
        results.push(generator.gen());
      }
      
      setOutput(results.join('\n'));
    } catch (error) {
      toast({
        title: "Invalid RegExp",
        description: "Please enter a valid regular expression pattern",
        variant: "destructive",
      });
      setOutput('');
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Generated text copied to clipboard",
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
            <Wand2 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-2xl">Generate Text from RegExp</CardTitle>
          </div>
          <CardDescription>Generate random text that matches a regular expression pattern</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="regex-pattern">Regular Expression Pattern:</Label>
            <Input
              id="regex-pattern"
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              className="mt-2 font-mono"
              placeholder="[A-Z][a-z]{4,8}\d{2,4}"
            />
          </div>

          <div>
            <Label htmlFor="count">Number of Samples (max 100):</Label>
            <Input
              id="count"
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="mt-2"
            />
          </div>

          <Button
            onClick={generateText}
            className="w-full"
          >
            Generate Text
          </Button>

          <div>
            <Label htmlFor="output">Generated Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900 font-mono"
              placeholder="Generated text will appear here..."
            />
          </div>

          <div className="bg-violet-50 dark:bg-violet-950/20 p-3 rounded-lg">
            <p className="text-sm text-violet-700 dark:text-violet-300">
              <strong>Examples:</strong> <code>[A-Z][a-z]{`{5,10}`}</code> (Name), <code>\d{`{3}`}-\d{`{3}`}-\d{`{4}`}</code> (Phone), <code>[a-z0-9]{`{8}`}</code> (ID)
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

export default GenerateTextFromRegExp;
