import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link2, RotateCcw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function UrlEncode() {
  const [inputText, setInputText] = useState<string>('');
  const { toast } = useToast();

  const encodeUrl = (text: string): string => {
    try {
      return encodeURIComponent(text);
    } catch (error) {
      return text;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Encoded URL copied to clipboard",
    });
  };

  const resetConverter = () => {
    setInputText('');
  };

  const encodedOutput = encodeUrl(inputText);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Link2 className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">URL Encoder</CardTitle>
            <CardDescription>
              Convert text to URL-safe encoded format
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="text-input" className="block text-sm font-medium">
              Enter text to encode
            </label>
            <Textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-32 w-full font-mono"
              rows={6}
              data-testid="input-text"
            />
            <p className="text-xs text-muted-foreground">
              Enter any text to see it encoded for use in URLs
            </p>
          </div>

          {inputText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">
                  Encoded Output
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(encodedOutput)}
                  className="gap-2"
                  data-testid="button-copy-result"
                >
                  <Copy className="h-3 w-3" />
                  Copy Result
                </Button>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="bg-background p-3 rounded border font-mono text-sm break-all" data-testid="text-encoded-output">
                  {encodedOutput || <span className="text-muted-foreground italic">No output</span>}
                </div>
              </div>
            </div>
          )}

          <div className="bg-primary/5 p-4 rounded-lg text-sm">
            <h4 className="font-medium mb-2">How URL Encoding Works:</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>• Spaces are converted to %20</p>
              <p>• Special characters are converted to % followed by hex codes</p>
              <p>• Safe characters (A-Z, a-z, 0-9, -, _, ., ~) remain unchanged</p>
              <p>• Perfect for encoding query parameters and URL paths</p>
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
          Instant URL encoding
        </div>
      </CardFooter>
    </Card>
  );
}

export default UrlEncode;
