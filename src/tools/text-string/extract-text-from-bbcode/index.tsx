import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ExtractTextFromBBCode() {
  const [inputText, setInputText] = useState<string>(`[b]Welcome to our forum![/b]

This is a [i]sample[/i] post with [u]BBCode[/u] formatting.

[quote]This is a quoted text[/quote]

[url=https://example.com]Visit our website[/url]

[list]
[*]First item
[*]Second item
[*]Third item
[/list]

[color=red]Red text[/color] and [size=20]large text[/size]`);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!inputText) {
      setOutput('');
      return;
    }

    let result = inputText;

    // Remove BBCode tags (pattern: [tag]...[/tag] or [tag=value]...[/tag])
    // Common BBCode tags
    const bbcodeTags = [
      /\[b\](.*?)\[\/b\]/gi,
      /\[i\](.*?)\[\/i\]/gi,
      /\[u\](.*?)\[\/u\]/gi,
      /\[s\](.*?)\[\/s\]/gi,
      /\[quote.*?\](.*?)\[\/quote\]/gi,
      /\[code.*?\](.*?)\[\/code\]/gi,
      /\[url.*?\](.*?)\[\/url\]/gi,
      /\[img.*?\](.*?)\[\/img\]/gi,
      /\[color=.*?\](.*?)\[\/color\]/gi,
      /\[size=.*?\](.*?)\[\/size\]/gi,
      /\[font=.*?\](.*?)\[\/font\]/gi,
      /\[center\](.*?)\[\/center\]/gi,
      /\[left\](.*?)\[\/left\]/gi,
      /\[right\](.*?)\[\/right\]/gi,
      /\[list.*?\](.*?)\[\/list\]/gi,
      /\[\*\]/gi,
    ];

    // Replace all BBCode tags with their content
    bbcodeTags.forEach(tag => {
      result = result.replace(tag, '$1');
    });

    // Remove any remaining BBCode tags (catch-all)
    result = result.replace(/\[\/?\w+(?:=.+?)?\]/gi, '');

    // Clean up excessive whitespace
    result = result
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n');

    setOutput(result);
  }, [inputText]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Extracted text copied to clipboard",
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
            <MessageSquare className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <CardTitle className="text-2xl">Extract Text from BBCode</CardTitle>
          </div>
          <CardDescription>Remove all BBCode formatting and extract plain text</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="input-text">BBCode Input:</Label>
            <Textarea
              id="input-text"
              data-testid="input-text"
              placeholder="Paste your BBCode formatted text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mt-2 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="output">Extracted Text:</Label>
            <Textarea
              id="output"
              data-testid="output-result"
              value={output}
              readOnly
              className="min-h-32 mt-2 bg-gray-50 dark:bg-gray-900"
              placeholder="Plain text will appear here..."
            />
          </div>

          <div className="bg-pink-50 dark:bg-pink-950/20 p-3 rounded-lg">
            <p className="text-sm text-pink-700 dark:text-pink-300">
              <strong>Supported:</strong> [b], [i], [u], [s], [quote], [code], [url], [img], [color], [size], [list], and more BBCode tags.
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

export default ExtractTextFromBBCode;
