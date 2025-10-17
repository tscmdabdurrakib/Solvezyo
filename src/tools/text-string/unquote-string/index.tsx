import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function UnquoteString() {
  const [inputText, setInputText] = useState<string>('"Hello World"\n\'Welcome to ToolNexas\'\n`Professional Tools`\n[Bracket Text]\n(Parentheses Text)\n{Curly Text}');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    const lines = inputText.split('\n');
    const unquotedLines = lines.map(line => {
      let trimmedLine = line.trim();
      
      // Remove double quotes
      if ((trimmedLine.startsWith('"') && trimmedLine.endsWith('"')) ||
          (trimmedLine.startsWith("'") && trimmedLine.endsWith("'")) ||
          (trimmedLine.startsWith('`') && trimmedLine.endsWith('`'))) {
        return trimmedLine.slice(1, -1);
      }
      
      // Remove brackets
      if ((trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) ||
          (trimmedLine.startsWith('(') && trimmedLine.endsWith(')')) ||
          (trimmedLine.startsWith('{') && trimmedLine.endsWith('}'))) {
        return trimmedLine.slice(1, -1);
      }
      
      return trimmedLine;
    });
    
    setOutput(unquotedLines.join('\n'));
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Unquoted text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-center gap-2">
            <Quote className="h-6 w-6 text-red-600 dark:text-red-400" />
            <CardTitle className="text-2xl">Unquote a String</CardTitle>
          </div>
          <CardDescription>Remove quotes and brackets from each line of your text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter quoted text to remove quotes..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supports removing: " ' ` [ ] ( ) { }
            </p>
          </div>

          <div>
            <Label htmlFor="output">Unquoted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Unquoted text will appear here..."
            />
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

export default UnquoteString;
