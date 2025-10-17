import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Binary, RotateCcw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function Base64Encode() {
  const [inputText, setInputText] = useState<string>('');
  const { toast } = useToast();

  const encodeBase64 = (text: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
      return "Error encoding text";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Base64 encoded text copied to clipboard",
    });
  };

  const resetConverter = () => {
    setInputText('');
  };

  const encodedOutput = encodeBase64(inputText);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Binary className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Base64 Encoder</CardTitle>
            <CardDescription>
              Convert text to Base64 encoded format
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="text-input" className="block text-sm font-medium">
              Enter text to Base64 encode
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
              Enter any text to convert to Base64 format
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
            <h4 className="font-medium mb-2">How Base64 Encoding Works:</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>• Converts text to ASCII-safe format using A-Z, a-z, 0-9, +, /</p>
              <p>• Each 3 bytes of data becomes 4 Base64 characters</p>
              <p>• Uses padding character = when needed</p>
              <p>• Perfect for embedding binary data in text formats</p>
              <p>• Commonly used in emails, JSON, and data URIs</p>
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
          Instant Base64 encoding
        </div>
      </CardFooter>
    </Card>
  );
}

export default Base64Encode;
