import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slash, RotateCcw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SlashUnescape() {
  const [inputText, setInputText] = useState<string>('');
  const { toast } = useToast();

  const unescapeSlashes = (text: string): string => {
    try {
      return text
        .replace(/\\n/g, '\n')     // Unescape newlines
        .replace(/\\r/g, '\r')     // Unescape carriage returns
        .replace(/\\t/g, '\t')     // Unescape tabs
        .replace(/\\"/g, '"')      // Unescape double quotes
        .replace(/\\'/g, "'")      // Unescape single quotes
        .replace(/\\\\/g, '\\');   // Unescape backslashes (must be last)
    } catch (error) {
      return "Error unescaping text";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Unescaped text copied to clipboard",
    });
  };

  const resetConverter = () => {
    setInputText('');
  };

  const unescapedOutput = unescapeSlashes(inputText);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Slash className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Slash Unescape</CardTitle>
            <CardDescription>
              Remove escape slashes from text
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="text-input" className="block text-sm font-medium">
              Enter escaped text to unescape
            </label>
            <Textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste escaped text here..."
              className="min-h-32 w-full font-mono"
              rows={6}
              data-testid="input-text"
            />
            <p className="text-xs text-muted-foreground">
              Enter escaped text to convert back to normal format
            </p>
          </div>

          {inputText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">
                  Unescaped Output
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(unescapedOutput)}
                  className="gap-2"
                  data-testid="button-copy-result"
                >
                  <Copy className="h-3 w-3" />
                  Copy Result
                </Button>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="bg-background p-3 rounded border font-mono text-sm break-all whitespace-pre-wrap" data-testid="text-unescaped-output">
                  {unescapedOutput || <span className="text-muted-foreground italic">No output</span>}
                </div>
              </div>
            </div>
          )}

          <div className="bg-primary/5 p-4 rounded-lg text-sm">
            <h4 className="font-medium mb-2">Characters that get unescaped:</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>• \n → Newline</p>
              <p>• \r → Carriage return</p>
              <p>• \t → Tab</p>
              <p>• \" → Double quote (")</p>
              <p>• \' → Single quote (')</p>
              <p>• \\ → Backslash (\)</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
          data-testid="button-reset"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Instant slash unescaping
        </div>
      </CardFooter>
    </Card>
  );
}

export default SlashUnescape;
