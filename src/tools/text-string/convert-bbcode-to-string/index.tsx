import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ConvertBbcodeToString() {
  const [inputText, setInputText] = useState<string>('[b]Welcome to ToolNexas[/b]\n[i]Professional Tools & Solutions[/i]\n[url=https://toolnexas.com]Visit Website[/url]\n[color=red]Important Notice[/color]\n[size=14]Large Text[/size]');
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }
    
    let result = inputText;
    
    // Convert BBCode tags to plain text
    const bbcodeMap: { [key: string]: (match: string, ...args: string[]) => string } = {
      // Simple tags
      '\\[b\\](.*?)\\[/b\\]': (match, content) => content,
      '\\[i\\](.*?)\\[/i\\]': (match, content) => content,
      '\\[u\\](.*?)\\[/u\\]': (match, content) => content,
      '\\[s\\](.*?)\\[/s\\]': (match, content) => content,
      
      // URL tags
      '\\[url\\](.*?)\\[/url\\]': (match, url) => url,
      '\\[url=(.*?)\\](.*?)\\[/url\\]': (match, url, text) => `${text} (${url})`,
      
      // Image tags
      '\\[img\\](.*?)\\[/img\\]': (match, url) => `[Image: ${url}]`,
      
      // Color tags
      '\\[color=(.*?)\\](.*?)\\[/color\\]': (match, color, text) => text,
      
      // Size tags
      '\\[size=(.*?)\\](.*?)\\[/size\\]': (match, size, text) => text,
      
      // Quote tags
      '\\[quote\\](.*?)\\[/quote\\]': (match, content) => `"${content}"`,
      '\\[quote=(.*?)\\](.*?)\\[/quote\\]': (match, author, content) => `"${content}" - ${author}`,
      
      // Code tags
      '\\[code\\](.*?)\\[/code\\]': (match, code) => code,
      
      // List tags
      '\\[list\\](.*?)\\[/list\\]': (match, content) => content.replace(/\\[\\*\\]/g, '• '),
      '\\[\\*\\]': () => '• ',
      
      // Center tags
      '\\[center\\](.*?)\\[/center\\]': (match, content) => content,
      
      // Font tags
      '\\[font=(.*?)\\](.*?)\\[/font\\]': (match, font, text) => text,
    };
    
    // Apply all transformations
    Object.entries(bbcodeMap).forEach(([pattern, replacement]) => {
      const regex = new RegExp(pattern, 'gi');
      result = result.replace(regex, replacement);
    });
    
    // Clean up any remaining BBCode tags
    result = result.replace(/\\[\\/?[^\\]]+\\]/g, '');
    
    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Converted text copied to clipboard",
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
        <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-center gap-2">
            <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl">Convert BBCode to a String</CardTitle>
          </div>
          <CardDescription>Convert BBCode markup to plain text by removing formatting tags</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">Input BBCode:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Enter BBCode markup to convert to plain text..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              BBCode tags will be removed or converted to plain text equivalents
            </p>
          </div>

          <div>
            <Label htmlFor="output">Plain Text Output:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Converted plain text will appear here..."
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

export default ConvertBbcodeToString;
